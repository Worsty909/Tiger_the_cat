/* =========================================================
   TIGER — Cesta domů
   engine.js — jádro hry: stav, scény, ukládání, registr misí.

   Engine je záměrně datový: mise je pole scén, scéna je objekt.
   Přidat další misi = přidat další soubor js/missions/mission-XX.js
   a zaregistrovat ji přes Tiger.registerMission().
   ========================================================= */
(function (global) {
  'use strict';

  var SAVE_KEY = 'tiger.save.v1';
  // Vlastní klíč: „Nová hra" smaže rozehranou pozici, ale ne odemčené kapitoly.
  var PROGRESS_KEY = 'tiger.progress.v1';

  /* ---------- pomocné funkce ---------- */

  // Normalizace odpovědi: bez diakritiky, malá písmena, bez interpunkce.
  function normalize(str) {
    return String(str == null ? '' : str)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /* ---------- registr misí ---------- */

  var missions = {};
  var missionOrder = [];

  function registerMission(mission) {
    if (!mission || !mission.id) throw new Error('Mise musí mít id.');
    missions[mission.id] = mission;
    if (missionOrder.indexOf(mission.id) === -1) missionOrder.push(mission.id);
    return mission;
  }

  function getMission(id) { return missions[id] || null; }
  function firstMissionId() { return missionOrder[0] || null; }
  function nextMissionId(id) {
    var i = missionOrder.indexOf(id);
    return (i > -1 && missionOrder[i + 1]) ? missionOrder[i + 1] : null;
  }

  /* ---------- uložený postup napříč misemi ---------- */

  function readProgress() {
    var data = null;
    try { data = JSON.parse(localStorage.getItem(PROGRESS_KEY)); } catch (e) {}
    if (!data || typeof data !== 'object') data = {};
    return {
      version: 1,
      done: Array.isArray(data.done) ? data.done : [],
      choices: (data.choices && typeof data.choices === 'object') ? data.choices : {},
      // deník každé dohrané mise — aby ho měl i hráč, který další kapitolu
      // spustí z výběru kapitol, ne přes „Pokračovat" na konci mise
      journal: (data.journal && typeof data.journal === 'object') ? data.journal : {}
    };
  }

  function writeProgress(store) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(store)); }
    catch (e) { /* privátní režim — postup se prostě neuloží */ }
  }

  /* ---------- stav hry ---------- */

  function freshState(missionId) {
    var m = getMission(missionId) || getMission(firstMissionId());
    return {
      version: 1,
      missionId: m ? m.id : null,
      sceneId: m ? m.start : null,
      flags: {},
      inventory: [],
      journal: [],
      solved: [],
      attempts: 0,
      hintsUsed: 0,
      playMs: 0,
      finished: false
    };
  }

  // Deník si hráč nese z misí, které leží před tou, kterou začíná.
  function earlierJournal(missionId) {
    var store = readProgress();
    var out = [];
    for (var i = 0; i < missionOrder.length && missionOrder[i] !== missionId; i++) {
      (store.journal[missionOrder[i]] || []).forEach(function (id) {
        if (out.indexOf(id) === -1) out.push(id);
      });
    }
    return out;
  }

  // Zápis do deníku se hledá ve všech misích — deník se nese dál.
  function journalEntry(id) {
    for (var i = 0; i < missionOrder.length; i++) {
      var lib = missions[missionOrder[i]].journal || {};
      if (lib[id]) return { id: id, missionId: missionOrder[i], title: lib[id].title, text: lib[id].text };
    }
    return null;
  }

  // Čas hraní se počítá jen za aktivitu: mezera delší než IDLE_MS mezi dvěma
  // akcemi (zavřený prohlížeč, oběd) se započítá jako IDLE_MS.
  var IDLE_MS = 3 * 60 * 1000;
  var lastTick = Date.now();

  var Game = {
    state: null,
    mission: null,
    listeners: {},

    /* --- události (jednoduchý pub/sub, aby UI zůstalo oddělené) --- */
    on: function (name, fn) {
      (this.listeners[name] = this.listeners[name] || []).push(fn);
      return this;
    },
    emit: function (name, payload) {
      (this.listeners[name] || []).forEach(function (fn) {
        try { fn(payload); } catch (e) { console.error('[Tiger] listener', name, e); }
      });
    },

    /* --- životní cyklus --- */
    start: function (missionId) {
      this.state = freshState(missionId || firstMissionId());
      this.state.journal = earlierJournal(this.state.missionId);
      this.mission = getMission(this.state.missionId);
      lastTick = Date.now();
      this.save();
      this.emit('start', this.state);
      this.goto(this.mission.start);
    },

    resume: function () {
      var saved = this.load();
      if (!saved) return false;
      this.state = saved;
      this.mission = getMission(saved.missionId);
      if (!this.mission) return false;
      var scene = this.scene(saved.sceneId);
      if (!scene) return false;
      if (typeof saved.playMs !== 'number') saved.playMs = 0;   // starší uložená hra
      lastTick = Date.now();
      this.emit('start', this.state);
      this.goto(saved.sceneId);
      return true;
    },

    /* --- scény --- */
    scene: function (id) {
      if (!this.mission) return null;
      var list = this.mission.scenes || [];
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },

    goto: function (sceneId) {
      var scene = this.scene(sceneId);
      if (!scene) { console.error('[Tiger] neznámá scéna:', sceneId); return; }
      this.state.sceneId = sceneId;

      if (typeof scene.onEnter === 'function') scene.onEnter(this);
      if (scene.set) this.setFlags(scene.set);
      if (scene.remember) this.remember(scene.remember);
      if (scene.give) this.give(scene.give);
      if (scene.journal) this.addJournal(scene.journal);

      this.save();
      this.emit('scene', scene);
    },

    /* --- příznaky, inventář, deník --- */
    setFlags: function (obj) {
      var self = this;
      Object.keys(obj || {}).forEach(function (k) { self.state.flags[k] = obj[k]; });
      this.save();
    },
    flag: function (k) { return this.state.flags[k]; },

    give: function (items) {
      var self = this, list = [].concat(items || []);
      list.forEach(function (item) {
        var id = typeof item === 'string' ? item : item.id;
        if (self.state.inventory.indexOf(id) === -1) {
          self.state.inventory.push(id);
          self.emit('item', id);
        }
      });
      this.save();
      this.emit('inventory', this.state.inventory);
    },
    has: function (id) { return this.state.inventory.indexOf(id) > -1; },

    addJournal: function (ids) {
      var self = this, list = [].concat(ids || []);
      list.forEach(function (id) {
        if (self.state.journal.indexOf(id) === -1) {
          self.state.journal.push(id);
          self.emit('journal', id);
        }
      });
      this.save();
    },
    journalEntries: function () {
      return this.state.journal.map(journalEntry).filter(Boolean);
    },

    markSolved: function (id) {
      if (id && this.state.solved.indexOf(id) === -1) this.state.solved.push(id);
      this.save();
    },
    isSolved: function (id) { return this.state.solved.indexOf(id) > -1; },

    countAttempt: function () { this.state.attempts++; this.save(); },
    countHint: function () { this.state.hintsUsed++; this.save(); },

    /* --- přechod na další misi ---
       Deník si hráč nese dál; předměty, příznaky a statistiky zůstávají
       v misi, ve které je nasbíral. */
    advance: function () {
      var nextId = nextMissionId(this.state.missionId);
      if (!nextId) return false;
      var carriedJournal = this.state.journal.slice();
      this.start(nextId);
      // start() vezme deník z uloženého postupu; tenhle je ale přesnější —
      // obsahuje i zápisy z mise, kterou hráč právě dohrál.
      var self = this;
      carriedJournal.forEach(function (id) {
        if (self.state.journal.indexOf(id) === -1) self.state.journal.push(id);
      });
      this.save();
      this.emit('journal');
      return true;
    },

    restart: function () {
      this.wipe();
      this.start(this.state ? this.state.missionId : firstMissionId());
    },

    /* --- konec mise --- */
    finish: function () {
      this.state.finished = true;
      this.markCompleted(this.state.missionId);
      this.save();
      var self = this;
      var mine = this.state.journal.filter(function (id) {
        var e = journalEntry(id);
        return e && e.missionId === self.state.missionId;
      });
      var store = readProgress();
      store.journal[this.state.missionId] = mine;
      writeProgress(store);
      this.emit('finish', {
        mission: this.mission,
        state: this.state,
        next: nextMissionId(this.state.missionId)
      });
    },

    /* --- postup napříč misemi ---
       Drží se mimo uloženou pozici, aby výběr kapitol i rozhodnutí
       z předchozích dílů přežily novou hru. */
    completed: function () { return readProgress().done; },
    isCompleted: function (id) { return this.completed().indexOf(id) > -1; },
    markCompleted: function (id) {
      var store = readProgress();
      if (store.done.indexOf(id) > -1) return;
      store.done.push(id);
      writeProgress(store);
    },

    // Rozhodnutí, na které se má ptát až některá z dalších misí.
    // Příznaky v `state.flags` to neumí — ty končí s misí.
    remember: function (obj) {
      var store = readProgress();
      Object.keys(obj || {}).forEach(function (k) { store.choices[k] = obj[k]; });
      writeProgress(store);
    },
    recall: function (key) { return readProgress().choices[key]; },

    // Odemčená je první kapitola, každá dohraná a ta hned po dohrané.
    isUnlocked: function (id) {
      if (id === firstMissionId() || this.isCompleted(id)) return true;
      var i = missionOrder.indexOf(id);
      return i > 0 && this.isCompleted(missionOrder[i - 1]);
    },

    /* --- ukládání --- */
    save: function () {
      if (!this.state) return;
      var now = Date.now();
      if (!this.state.finished) this.state.playMs = (this.state.playMs || 0) + Math.min(now - lastTick, IDLE_MS);
      lastTick = now;
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.state)); }
      catch (e) { /* privátní režim prohlížeče — hra běží dál, jen bez uložení */ }
    },
    load: function () {
      try {
        var raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;
        var data = JSON.parse(raw);
        return (data && data.version === 1 && data.missionId) ? data : null;
      } catch (e) { return null; }
    },
    hasSave: function () {
      var s = this.load();
      return !!(s && !s.finished);
    },
    wipe: function () {
      try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    },

    /* --- pomůcka pro podmínky v datech mise --- */
    check: function (cond) {
      if (cond == null) return true;
      if (typeof cond === 'function') return !!cond(this);
      if (typeof cond === 'string') return !!this.state.flags[cond];
      return true;
    }
  };

  /* ---------- export ---------- */
  global.Tiger = {
    Game: Game,
    registerMission: registerMission,
    getMission: getMission,
    firstMissionId: firstMissionId,
    nextMissionId: nextMissionId,
    missionIds: function () { return missionOrder.slice(); },
    normalize: normalize,
    clone: clone,
    SAVE_KEY: SAVE_KEY
  };

})(window);
