/* =========================================================
   TIGER — Cesta domů
   ui.js — vykreslování scén, dialogů, hádanek a obrazovek.
   ========================================================= */
(function (global) {
  'use strict';

  var Game = global.Tiger.Game;

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var SPEAKERS = {
    tiger:    'Tiger',
    bertik:   'Bertík',
    vilem:    'Vilém',
    sousedka: 'Sousedka',
    klara:    'Klára',
    ema:      'Ema',
    hlas:     'Hlas'
  };

  var UI = {
    revealQueue: [],
    currentScene: null,
    revealing: false,

    /* ---------- obrazovky ---------- */
    show: function (name) {
      ['title', 'game', 'end'].forEach(function (n) {
        var s = $('screen-' + n);
        if (s) s.classList.toggle('is-active', n === name);
      });
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    },

    /* ---------- scéna ---------- */
    renderScene: function (scene) {
      this.currentScene = scene;
      this.show('game');

      $('hudChapter').textContent = Game.mission.shortTitle || Game.mission.title;
      $('hudPlace').textContent = scene.place || '';
      $('sceneTitle').textContent = scene.title || '';

      this.setArt(scene.bg, scene.title || scene.place || '');

      $('dialogue').innerHTML = '';
      $('puzzleSlot').innerHTML = '';
      $('puzzleSlot').hidden = true;
      $('actions').innerHTML = '';
      $('actions').hidden = true;

      this.revealQueue = normalizeText(scene.text).slice();
      this.revealing = true;
      this.revealNext();
      this.renderInventory();
      this.renderJournalBadge();
    },

    // Obrázek se hledá postupně ve všech zdrojích (lokálně, pak vzdáleně).
    // Když nevyjde ani jeden, zůstane stylovaný náhradní panel.
    setArt: function (bg, altText) {
      var img = $('sceneImg');
      var fb = $('sceneFallback');
      $('sceneFallbackText').textContent = altText || '';
      img.classList.remove('is-loaded');
      img.alt = altText || '';
      fb.hidden = false;

      var list = global.Tiger.Assets.sources(bg);
      if (!list.length) { img.removeAttribute('src'); return; }

      var i = 0;
      img.onload = function () { img.classList.add('is-loaded'); fb.hidden = true; };
      img.onerror = function () {
        i++;
        if (i < list.length) { img.src = list[i]; return; }
        img.classList.remove('is-loaded');
        fb.hidden = false;
      };
      img.src = list[0];
    },

    /* ---------- postupné odkrývání textu ---------- */
    revealNext: function () {
      if (!this.revealing) return;
      var box = $('dialogue');

      if (!this.revealQueue.length) {
        this.revealing = false;
        $('advanceHint').hidden = true;
        this.afterText();
        return;
      }
      var line = this.revealQueue.shift();
      box.appendChild(renderLine(line));
      $('advanceHint').hidden = this.revealQueue.length === 0;
      if (!this.revealQueue.length) {
        this.revealing = false;
        var self = this;
        setTimeout(function () { self.afterText(); }, 220);
      }
    },

    revealAll: function () {
      while (this.revealQueue.length) {
        $('dialogue').appendChild(renderLine(this.revealQueue.shift()));
      }
      this.revealing = false;
      $('advanceHint').hidden = true;
      this.afterText();
    },

    /* ---------- co přijde po textu: hádanka nebo volby ---------- */
    afterText: function () {
      var scene = this.currentScene;
      if (!scene) return;
      if ($('puzzleSlot').childNodes.length || $('actions').childNodes.length) return;

      if (scene.puzzle && !Game.isSolved(scene.puzzle.id)) {
        this.renderPuzzle(scene.puzzle);
      } else {
        this.renderActions(scene);
      }
    },

    renderActions: function (scene) {
      var host = $('actions');
      host.innerHTML = '';
      var list = (scene.actions || []).filter(function (a) { return Game.check(a.if); });

      if (!list.length && scene.goto) list = [{ label: scene.nextLabel || 'Dál', goto: scene.goto }];
      if (!list.length && scene.end) list = [{ label: scene.nextLabel || 'Dál', end: true }];
      if (!list.length) return;

      list.forEach(function (a) {
        var b = el('button', 'action', a.label);
        b.addEventListener('click', function () {
          if (a.set) Game.setFlags(a.set);
          if (a.give) Game.give(a.give);
          if (a.journal) Game.addJournal(a.journal);
          if (a.end) { Game.finish(); return; }
          if (a.goto) Game.goto(a.goto);
        });
        host.appendChild(b);
      });
      host.hidden = false;
    },

    /* ---------- hádanka ---------- */
    renderPuzzle: function (p) {
      var slot = $('puzzleSlot');
      slot.innerHTML = '';
      slot.hidden = false;

      var box = el('div', 'puzzle');
      box.appendChild(el('div', 'puzzle-head', p.head || 'Hádanka'));
      if (p.prompt) box.appendChild(el('div', 'puzzle-prompt', p.prompt));

      var body = el('div', 'puzzle-body');
      box.appendChild(body);

      var feedback = el('div', 'puzzle-feedback');
      box.appendChild(feedback);

      var tools = el('div', 'puzzle-tools');
      var hintIdx = 0;
      var hints = p.hints || [];
      var hintBtn = el('button', 'link-btn', 'Potřebuju napovědět');
      if (hints.length) {
        hintBtn.addEventListener('click', function () { giveHint(); });
        tools.appendChild(hintBtn);
      }
      box.appendChild(tools);
      slot.appendChild(box);

      var self = this;
      var wrongCount = 0;

      function say(text, kind) {
        feedback.className = 'puzzle-feedback' + (kind ? ' is-' + kind : '');
        feedback.textContent = text || '';
      }

      function giveHint() {
        if (hintIdx >= hints.length) {
          say(p.lastHint || 'Víc už ti neporadím. Věř si.', 'hint');
          return;
        }
        Game.countHint();
        say('💡 ' + hints[hintIdx], 'hint');
        hintIdx++;
        if (hintIdx >= hints.length) hintBtn.textContent = 'Došly mi nápady';
      }

      var api = {
        game: Game,
        say: say,
        hint: giveHint,
        fail: function (msg) {
          Game.countAttempt();
          wrongCount++;
          say(msg || 'To není ono.', 'bad');
          box.classList.remove('shake');
          void box.offsetWidth;
          box.classList.add('shake');
          if (wrongCount === 3 && hints.length && hintIdx === 0) {
            setTimeout(function () { giveHint(); }, 1100);
          }
        },
        solve: function () {
          Game.markSolved(p.id);
          say(p.success || 'Cvak. Sedí to.', 'good');
          tools.innerHTML = '';
          setTimeout(function () {
            if (p.set) Game.setFlags(p.set);
            if (p.give) Game.give(p.give);
            if (p.journal) Game.addJournal(p.journal);
            if (p.goto) Game.goto(p.goto);
            else { slot.hidden = true; self.renderActions(self.currentScene); }
          }, p.delay || 900);
        }
      };

      var type = global.Tiger.Puzzles.get(p.kind);
      if (!type) { say('Chyba: neznámý typ hádanky „' + p.kind + '".', 'bad'); return; }
      type.render(body, p, api);
    },

    /* ---------- inventář ---------- */
    renderInventory: function () {
      var bar = $('inventoryBar');
      var host = $('invItems');
      var items = Game.state.inventory;
      if (!items.length) { bar.hidden = true; return; }
      var lib = (Game.mission && Game.mission.items) || {};
      host.innerHTML = '';
      items.forEach(function (id) {
        var def = lib[id] || { name: id, emo: '•' };
        var chip = el('span', 'inv-item');
        chip.appendChild(el('span', 'emo', def.emo || '•'));
        chip.appendChild(document.createTextNode(def.name || id));
        if (def.desc) chip.title = def.desc;
        host.appendChild(chip);
      });
      bar.hidden = false;
    },

    renderJournalBadge: function () {
      var n = Game.state.journal.length;
      var b = $('journalBadge');
      b.textContent = String(n);
      b.hidden = n === 0;
    },

    /* ---------- modály ---------- */
    openModal: function (title, buildBody) {
      $('modalTitle').textContent = title;
      var body = $('modalBody');
      body.innerHTML = '';
      buildBody(body);
      $('modal').hidden = false;
    },
    closeModal: function () { $('modal').hidden = true; },

    openJournal: function () {
      this.openModal('Deník vzpomínek', function (body) {
        var entries = Game.state && Game.mission ? Game.journalEntries() : [];
        if (!entries.length) {
          body.appendChild(el('p', 'journal-empty',
            'Zatím prázdný. Tiger si zapíše všechno, co ho zastaví a donutí přemýšlet.'));
          return;
        }
        entries.forEach(function (e) {
          var d = el('div', 'journal-entry');
          var t = document.createElement('b');
          t.textContent = e.title;
          d.appendChild(t);
          d.appendChild(document.createTextNode(e.text));
          body.appendChild(d);
        });
      });
    },

    /* ---------- konec mise ---------- */
    renderEnd: function (payload) {
      var m = payload.mission, s = payload.state;
      var ep = m.epilogue || {};
      $('endKicker').textContent = 'Konec mise ' + (m.number || 1);
      $('endTitle').textContent = ep.title || m.title;

      var text = $('endText');
      text.innerHTML = '';
      normalizeText(ep.text).forEach(function (line) { text.appendChild(renderLine(line)); });

      var mins = Math.max(1, Math.round((Date.now() - s.startedAt) / 60000));
      var stats = [
        ['Vyřešené hádanky', s.solved.length],
        ['Slepé uličky', s.attempts],
        ['Nápovědy', s.hintsUsed],
        ['Minut ve tmě', mins]
      ];
      var host = $('endStats');
      host.innerHTML = '';
      stats.forEach(function (row) {
        var d = el('div', 'stat');
        d.appendChild(el('span', 'stat-num', String(row[1])));
        d.appendChild(el('span', 'stat-lbl', row[0]));
        host.appendChild(d);
      });

      $('endNext').textContent = payload.next
        ? (ep.nextTeaser || 'Příběh pokračuje.')
        : (ep.next || 'Pokračování příště.');

      var btn = $('btnEndNext');
      if (payload.next) {
        var nextMission = Tiger.getMission(payload.next);
        btn.textContent = 'Pokračovat: ' + (nextMission ? nextMission.title : 'další mise');
        btn.hidden = false;
      } else {
        btn.hidden = true;
      }

      this.show('end');
    }
  };

  /* ---------- převod textu na řádky ---------- */
  function normalizeText(text) {
    return [].concat(text || []).map(function (line) {
      if (typeof line === 'string') return { s: 'nar', t: line };
      if (line && line.s) return line;
      // zkratka: { tiger:'…' }
      var key = Object.keys(line || {})[0];
      return key ? { s: key, t: line[key] } : { s: 'nar', t: '' };
    });
  }

  function renderLine(line) {
    if (line.s === 'beat') return el('hr', 'line line-beat');

    if (line.s === 'nar') {
      var p = el('div', 'line line-nar');
      p.innerHTML = escapeHtml(line.t).replace(/\*(.+?)\*/g, '<em>$1</em>');
      return p;
    }
    if (line.s === 'note') {
      var n = el('div', 'line line-note');
      n.textContent = line.t;
      return n;
    }
    if (line.s === 'sys') return el('div', 'line line-sys', line.t);

    var wrap = el('div', 'line line-say line-' + line.s);
    wrap.appendChild(el('span', 'say-who', SPEAKERS[line.s] || line.s));
    var t = el('span', 'say-text');
    t.innerHTML = escapeHtml(line.t).replace(/\*(.+?)\*/g, '<em>$1</em>');
    wrap.appendChild(t);
    return wrap;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  global.Tiger.UI = UI;

})(window);
