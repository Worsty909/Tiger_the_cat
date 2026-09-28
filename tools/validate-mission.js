/* Kontrola integrity misí: existují všechny cíle, dají se hádanky vyřešit,
   je scéna dosažitelná a nevede příběh do slepé uličky?
   Spouští se i při každém deployi — s chybou se hra nenasadí.
   Spuštění:  node tools/validate-mission.js            */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
// Skripty hry počítají s prohlížečem: globální objekt je zároveň `window`.
const sandbox = { console };
sandbox.window = sandbox;
vm.createContext(sandbox);

const missionFiles = fs.readdirSync(path.join(root, 'js/missions'))
  .filter(f => f.endsWith('.js')).sort().map(f => 'js/missions/' + f);

for (const f of ['js/engine.js', 'js/assets.js', 'js/puzzles.js', ...missionFiles]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}

const Tiger = sandbox.Tiger;

let errors = 0;
const fail = (m) => { errors++; console.error('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

const images = sandbox.Tiger.Assets.images;
const kinds = new Set(Tiger.Puzzles.kinds());
const seenJournal = new Map();   // deník se hledá napříč misemi → id musí být jedinečná
const usedImages = new Set();

function checkMission(mission) {
const errorsBefore = errors;
const ids = new Set(mission.scenes.map(s => s.id));
if (ids.size !== mission.scenes.length) fail('některá scéna má stejné id jako jiná');
if (!ids.has(mission.start)) fail(`startovní scéna "${mission.start}" neexistuje`);
Object.keys(mission.journal || {}).forEach(j => {
  if (seenJournal.has(j)) fail(`zápis do deníku "${j}" už má mise ${seenJournal.get(j)}`);
  seenJournal.set(j, mission.id);
});
const items = new Set(Object.keys(mission.items || {}));
const journal = new Set(Object.keys(mission.journal || {}));

// 1) všechny cíle přechodů existují
const targets = [];
for (const s of mission.scenes) {
  const push = (t, where) => { if (t) targets.push([t, `${s.id} → ${where}`]); };
  push(s.goto, 'goto');
  (s.actions || []).forEach((a, i) => push(a.goto, `actions[${i}] "${a.label}"`));
  if (s.puzzle) push(s.puzzle.goto, `puzzle ${s.puzzle.id}`);
}
const badTargets = errors;
targets.forEach(([t, where]) => { if (!ids.has(t)) fail(`neexistující scéna "${t}" (${where})`); });
if (errors === badTargets) ok(`${targets.length} přechodů míří na existující scény`);

// 2) každá scéna má obrázek, který manifest zná
for (const s of mission.scenes) {
  if (!s.bg) fail(`scéna ${s.id}: chybí obrázek (bg)`);
  else if (!images[s.bg]) fail(`scéna ${s.id}: obrázek "${s.bg}" není v js/assets.js`);
  else usedImages.add(s.bg);
}

// 3) předměty a zápisky v deníku jsou definované
for (const s of mission.scenes) {
  [].concat(s.give || [], s.puzzle?.give || []).forEach(i => {
    if (!items.has(i)) fail(`scéna ${s.id}: neznámý předmět "${i}"`);
  });
  [].concat(s.journal || [], s.puzzle?.journal || []).forEach(j => {
    if (!journal.has(j)) fail(`scéna ${s.id}: neznámý zápis do deníku "${j}"`);
  });
}

// 4) hádanky dávají smysl
let puzzles = 0;
for (const s of mission.scenes) {
  const p = s.puzzle;
  if (!p) continue;
  puzzles++;
  if (!p.id) fail(`scéna ${s.id}: hádanka bez id`);
  if (!kinds.has(p.kind)) fail(`hádanka ${p.id}: neznámý typ "${p.kind}"`);
  if (!p.goto) fail(`hádanka ${p.id}: chybí goto — hráč by uvízl`);
  if (!(p.hints || []).length) fail(`hádanka ${p.id}: bez nápovědy`);

  if (p.kind === 'input') {
    if (!(p.answers || []).length) fail(`hádanka ${p.id}: bez správné odpovědi`);
    // odpovědi musí být po normalizaci jedinečné a neprázdné
    const norm = p.answers.map(a => Tiger.normalize(a));
    norm.forEach(a => { if (!a) fail(`hádanka ${p.id}: prázdná odpověď`); });
    (p.nearMiss || []).forEach(nm => {
      [].concat(nm.when).forEach(w => {
        if (norm.includes(Tiger.normalize(w))) {
          fail(`hádanka ${p.id}: "${w}" je zároveň správná i "skoro"`);
        }
      });
    });
  }

  if (p.kind === 'sequence') {
    const opts = new Map((p.options || []).map(o => [o.id, o]));
    if (!(p.solution || []).length) fail(`hádanka ${p.id}: bez řešení`);
    p.solution.forEach(id => {
      if (!opts.has(id)) fail(`hádanka ${p.id}: řešení odkazuje na neznámou volbu "${id}"`);
      else if (opts.get(id).trap) fail(`hádanka ${p.id}: past "${id}" je součástí řešení`);
    });
  }

  if (p.kind === 'choice') {
    const right = (p.options || []).filter(o => o.correct === true);
    if (right.length !== 1) fail(`hádanka ${p.id}: musí mít právě jednu správnou volbu, má ${right.length}`);
    (p.options || []).forEach(o => {
      if (o.correct !== true && !o.say) fail(`hádanka ${p.id}: špatná volba "${o.id}" nemá vysvětlení`);
    });
  }

  if (p.kind === 'recall') {
    const qs = p.questions || [];
    if (!qs.length) fail(`hádanka ${p.id}: žádné otázky`);
    qs.forEach((q, i) => {
      const n = (q.options || []).length;
      if (n < 2) fail(`hádanka ${p.id}: otázka ${i + 1} má míň než dvě možnosti`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= n) {
        fail(`hádanka ${p.id}: otázka ${i + 1} má neplatný index správné odpovědi`);
      }
      if (!q.say) fail(`hádanka ${p.id}: otázka ${i + 1} nemá reakci na špatnou odpověď`);
      if (new Set(q.options).size !== n) fail(`hádanka ${p.id}: otázka ${i + 1} má duplicitní možnosti`);
    });
  }

  if (p.kind === 'dial') {
    const wheels = p.wheels || [];
    if (!wheels.length) fail(`hádanka ${p.id}: žádná kolečka`);
    wheels.forEach((w, i) => {
      const n = (w.options || []).length;
      if (n < 2) fail(`hádanka ${p.id}: kolečko ${i + 1} má míň než dvě slova`);
      if (new Set(w.options).size !== n) fail(`hádanka ${p.id}: kolečko ${i + 1} má slovo dvakrát`);
      if (!Number.isInteger(w.answer) || w.answer < 0 || w.answer >= n) {
        fail(`hádanka ${p.id}: kolečko ${i + 1} má neplatný index řešení`);
      }
      const start = w.start || 0;
      if (!Number.isInteger(start) || start < 0 || start >= n) {
        fail(`hádanka ${p.id}: kolečko ${i + 1} má neplatnou výchozí pozici`);
      }
    });
    if (wheels.length && wheels.every(w => (w.start || 0) === w.answer)) {
      fail(`hádanka ${p.id}: zadání je rovnou vyřešené`);
    }
  }

  if (p.kind === 'pairs') {
    const L = new Set((p.left || []).map(o => o.id));
    const R = new Set((p.right || []).map(o => o.id));
    const sol = p.solution || {};
    if (Object.keys(sol).length !== L.size) fail(`hádanka ${p.id}: řešení nepokrývá všechny položky vlevo`);
    const used = new Set();
    Object.keys(sol).forEach(k => {
      if (!L.has(k)) fail(`hádanka ${p.id}: řešení zmiňuje neznámou levou položku "${k}"`);
      if (!R.has(sol[k])) fail(`hádanka ${p.id}: řešení zmiňuje neznámou pravou položku "${sol[k]}"`);
      if (used.has(sol[k])) fail(`hádanka ${p.id}: pravá položka "${sol[k]}" je použitá dvakrát`);
      used.add(sol[k]);
    });
  }

  if (p.kind === 'rings') {
    const start = p.start || [];
    const size = p.size || (p.symbols || []).length;
    if (!start.length) fail(`hádanka ${p.id}: chybí výchozí stav`);
    if (start.every(v => v === 0)) fail(`hádanka ${p.id}: začíná už vyřešená`);
    // kliknutí otočí kruh i ten hned pod ním; řeší se odvenku dovnitř
    const st = start.slice();
    let turns = 0;
    for (let i = 0; i < st.length; i++) {
      const need = (size - st[i]) % size;
      for (let k = 0; k < need; k++) {
        for (let j = i; j < Math.min(i + 2, st.length); j++) st[j] = (st[j] + 1) % size;
        turns++;
      }
    }
    if (!st.every(v => v === 0)) fail(`hádanka ${p.id}: nemá řešení!`);
    else ok(`hádanka ${p.id}: řešitelná (${turns} otočení, odvenku dovnitř)`);
  }

  if (p.kind === 'lights') {
    const init = p.initial || [];
    if (!init.length) fail(`hádanka ${p.id}: chybí výchozí stav`);
    if (init.every(v => v === 1)) fail(`hádanka ${p.id}: začíná už vyřešená`);
    // řešitelnost hrubou silou: každá páčka se mačká 0× nebo 1×
    const n = init.length;
    let solvable = false, best = null;
    for (let mask = 0; mask < (1 << n); mask++) {
      const st = init.slice();
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) [i - 1, i, i + 1].forEach(j => { if (j >= 0 && j < n) st[j] ^= 1; });
      }
      if (st.every(v => v === 1)) {
        solvable = true;
        const moves = mask.toString(2).split('').filter(c => c === '1').length;
        if (best === null || moves < best) best = moves;
      }
    }
    if (!solvable) fail(`hádanka ${p.id}: nemá řešení!`);
    else ok(`hádanka ${p.id}: řešitelná (nejkratší cesta: ${best} přepnutí)`);
  }
}

// 5) dosažitelnost: projdi graf od startu a ověř, že se dá dojít do konce
const reachable = new Set();
const stack = [mission.start];
while (stack.length) {
  const id = stack.pop();
  if (reachable.has(id) || !ids.has(id)) continue;
  reachable.add(id);
  const s = mission.scenes.find(x => x.id === id);
  const outs = [s.goto, s.puzzle?.goto].concat((s.actions || []).map(a => a.goto));
  outs.filter(Boolean).forEach(t => stack.push(t));
}
[...ids].filter(id => !reachable.has(id)).forEach(id => fail(`scéna "${id}" je nedosažitelná`));
if (reachable.size === ids.size) ok(`všech ${ids.size} scén je dosažitelných ze startu`);

const ends = mission.scenes.filter(s => (s.actions || []).some(a => a.end));
if (!ends.length) fail('mise nemá konec (žádná akce s end:true)');
else ok(`mise má konec: ${ends.map(s => s.id).join(', ')}`);

// 6) žádný zákys: projdi všechny stavy (scéna + příznaky + batoh), do kterých
//    se hráč může dostat, a z každého musí vést cesta ke konci. Podmínky `if`
//    se vyhodnocují doopravdy, pro každou hodnotu rozhodnutí z minulé mise.
checkSoftlocks(mission);

ok(`${puzzles} hádanek, ${items.size} předmětů, ${journal.size} zápisů v deníku`);
if (errors === errorsBefore) ok('bez chyb');
}

function checkSoftlocks(mission) {
  const byId = new Map(mission.scenes.map(s => [s.id, s]));
  const choiceKeys = new Set();
  mission.scenes.forEach(s => {
    (s.actions || []).forEach(a => { if (a.if) String(a.if).replace(/recall\(['"]([\w-]+)['"]\)/g, (_, k) => choiceKeys.add(k)); });
  });
  // každá kombinace hodnot true / false / undefined pro klíče, na které se mise ptá
  let worlds = [{}];
  choiceKeys.forEach(k => {
    worlds = worlds.flatMap(w => [true, false, undefined].map(v => Object.assign({}, w, { [k]: v })));
  });

  let states = 0;
  for (const choices of worlds) {
    const key = st => JSON.stringify([st.scene, st.flags, st.inv.slice().sort(), st.solved.slice().sort()]);
    const mock = st => ({
      state: { flags: st.flags, inventory: st.inv },
      flag: k => st.flags[k],
      has: id => st.inv.includes(id),
      isSolved: id => st.solved.includes(id),
      recall: k => choices[k],
      check(cond) {
        if (cond == null) return true;
        if (typeof cond === 'function') return !!cond(this);
        if (typeof cond === 'string') return !!st.flags[cond];
        return true;
      }
    });
    const apply = (st, x) => {
      Object.assign(st.flags, x.set || {});
      [].concat(x.give || []).forEach(i => { if (!st.inv.includes(i)) st.inv.push(i); });
    };
    const enter = (from, id) => {
      const st = { scene: id, flags: Object.assign({}, from.flags), inv: from.inv.slice(), solved: from.solved.slice() };
      apply(st, byId.get(id) || {});
      return st;
    };
    // přechody ze stavu: 'END', nebo seznam nových stavů
    const next = st => {
      const s = byId.get(st.scene);
      if (s.puzzle && !st.solved.includes(s.puzzle.id)) {
        const p = s.puzzle;
        const solvedSt = { scene: st.scene, flags: Object.assign({}, st.flags), inv: st.inv.slice(), solved: st.solved.concat(p.id) };
        const right = p.kind === 'choice' && (p.options || []).find(o => o.correct === true);
        if (right) apply(solvedSt, right);
        apply(solvedSt, p);
        return p.goto ? [enter(solvedSt, p.goto)] : [solvedSt];
      }
      let acts = (s.actions || []).filter(a => mock(st).check(a.if));
      if (!acts.length && s.goto) acts = [{ goto: s.goto }];
      if (!acts.length && s.end) return 'END';
      const out = [];
      for (const a of acts) {
        if (a.end) return 'END';
        const t = { scene: st.scene, flags: Object.assign({}, st.flags), inv: st.inv.slice(), solved: st.solved.slice() };
        apply(t, a);
        if (a.goto) out.push(enter(t, a.goto));
      }
      return out;
    };

    const seen = new Map();          // klíč -> { st, outs }
    const queue = [enter({ flags: {}, inv: [], solved: [] }, mission.start)];
    while (queue.length) {
      const st = queue.shift();
      const k = key(st);
      if (seen.has(k) || !byId.has(st.scene)) continue;
      const outs = next(st);
      seen.set(k, { st, outs: outs === 'END' ? 'END' : outs.map(key) });
      if (outs !== 'END') outs.forEach(o => queue.push(o));
      if (seen.size > 20000) { fail('příliš mnoho stavů — kontrola zákysů vzdána'); return; }
    }
    // zpětně: které stavy vedou ke konci
    const good = new Set([...seen].filter(([, v]) => v.outs === 'END').map(([k]) => k));
    let grew = true;
    while (grew) {
      grew = false;
      for (const [k, v] of seen) {
        if (!good.has(k) && v.outs !== 'END' && v.outs.some(o => good.has(o))) { good.add(k); grew = true; }
      }
    }
    const where = Object.keys(choices).length
      ? ` (rozhodnutí z minula: ${Object.keys(choices).map(k => k + '=' + choices[k]).join(', ')})` : '';
    const stuck = [...seen].filter(([k]) => !good.has(k));
    // Hlásí se hlavně skutečné slepé konce (scéna bez jediné akce); ostatní
    // zaseknuté stavy do nich jen vedou.
    const dead = stuck.filter(([, v]) => v.outs !== 'END' && !v.outs.length);
    (dead.length ? dead : stuck).slice(0, 3).forEach(([, v]) => {
      fail(`zákys ve scéně "${v.st.scene}"${where}: batoh [${v.st.inv}], příznaky ${JSON.stringify(v.st.flags)} — odsud nevede cesta ke konci`);
    });
    states += seen.size;
  }
  ok(`žádný zákys (${states} stavů${worlds.length > 1 ? `, ${worlds.length} varianty rozhodnutí z minula` : ''})`);
}

// projdi všechny zaregistrované mise
let id = Tiger.firstMissionId();
while (id) {
  const m = Tiger.getMission(id);
  console.log(`\nMise ${m.number}: „${m.title}"  (${m.scenes.length} scén)\n`);
  checkMission(m);
  id = Tiger.nextMissionId(id);
}

// obrázky: které nejsou v repozitáři (stáhne je deploy) a které nikdo nepoužívá
console.log('\nObrázky\n');
const keys = Object.keys(images);
const local = keys.filter(k => ['webp', 'png', 'jpg', 'jpeg'].some(e => fs.existsSync(path.join(root, 'assets/img', k + '.' + e))));
ok(`${keys.length} v js/assets.js, ${local.length} leží v assets/img/`);
const remoteOnly = keys.filter(k => !local.includes(k));
if (remoteOnly.length) console.log(`  · stáhne je deploy: ${remoteOnly.join(', ')}`);
const unused = keys.filter(k => !usedImages.has(k) && k !== 'titul' && k !== 'tiger-ref');
if (unused.length) console.log(`  · nepoužité v žádné scéně: ${unused.join(', ')}`);
keys.forEach(k => { if (!/^https?:\/\//.test(images[k])) fail(`obrázek "${k}": adresa nezačíná http(s)://`); });

console.log(errors ? `\n${errors} chyb\n` : '\nVšechno sedí.\n');
process.exit(errors ? 1 : 0);
