/* Kontrola integrity misí: existují všechny cíle, dají se hádanky vyřešit,
   je scéna dosažitelná a nevede příběh do slepé uličky?
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

for (const f of ['js/engine.js', 'js/assets.js', 'js/missions/mission-01.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}

const Tiger = sandbox.Tiger;
const mission = Tiger.getMission(Tiger.firstMissionId());

let errors = 0;
const fail = (m) => { errors++; console.error('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

const ids = new Set(mission.scenes.map(s => s.id));
const items = new Set(Object.keys(mission.items || {}));
const journal = new Set(Object.keys(mission.journal || {}));

console.log(`\nMise ${mission.number}: „${mission.title}"  (${mission.scenes.length} scén)\n`);

// 1) všechny cíle přechodů existují
const targets = [];
for (const s of mission.scenes) {
  const push = (t, where) => { if (t) targets.push([t, `${s.id} → ${where}`]); };
  push(s.goto, 'goto');
  (s.actions || []).forEach((a, i) => push(a.goto, `actions[${i}] "${a.label}"`));
  if (s.puzzle) push(s.puzzle.goto, `puzzle ${s.puzzle.id}`);
}
targets.forEach(([t, where]) => { if (!ids.has(t)) fail(`neexistující scéna "${t}" (${where})`); });
if (!errors) ok(`${targets.length} přechodů míří na existující scény`);

// 2) předměty a zápisky v deníku jsou definované
for (const s of mission.scenes) {
  [].concat(s.give || [], s.puzzle?.give || []).forEach(i => {
    if (!items.has(i)) fail(`scéna ${s.id}: neznámý předmět "${i}"`);
  });
  [].concat(s.journal || [], s.puzzle?.journal || []).forEach(j => {
    if (!journal.has(j)) fail(`scéna ${s.id}: neznámý zápis do deníku "${j}"`);
  });
}

// 3) hádanky dávají smysl
const kinds = new Set(['input', 'lights', 'sequence', 'choice']);
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

// 4) dosažitelnost: projdi graf od startu a ověř, že se dá dojít do konce
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

ok(`${puzzles} hádanek, ${items.size} předmětů, ${journal.size} zápisů v deníku`);

console.log(errors ? `\n${errors} chyb\n` : '\nVšechno sedí.\n');
process.exit(errors ? 1 : 0);
