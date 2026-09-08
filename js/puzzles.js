/* =========================================================
   TIGER — Cesta domů
   puzzles.js — registr typů hádanek.

   Každý typ je objekt { render(host, puzzle, api) }.
   api = {
     solve()            — hádanka vyřešena
     fail(zprava)        — špatná odpověď (počítá pokus, zatřese panelem)
     say(text, druh)     — zpětná vazba: 'bad' | 'good' | 'hint'
     hint()              — vydá další nápovědu
     game                — instance Tiger.Game
   }

   Nový typ hádanky pro další misi:
     Tiger.Puzzles.register('muj-typ', { render: function(host,p,api){...} });
   ========================================================= */
(function (global) {
  'use strict';

  var types = {};

  function register(name, impl) { types[name] = impl; return impl; }
  function get(name) { return types[name] || null; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------------------------------------------------------
     1) INPUT — textová / číselná odpověď
     puzzle: { kind:'input', placeholder, answers:[...], hints:[...] }
     --------------------------------------------------------- */
  register('input', {
    render: function (host, p, api) {
      var row = el('div', 'answer-row');
      var input = el('input', 'answer-input');
      input.type = p.numeric ? 'text' : 'text';
      if (p.numeric) { input.inputMode = 'numeric'; input.setAttribute('autocomplete', 'off'); }
      input.placeholder = p.placeholder || 'Napiš odpověď…';
      input.maxLength = p.maxLength || 40;
      input.setAttribute('aria-label', p.placeholder || 'Odpověď');

      var send = el('button', 'btn btn-primary btn-sm', p.submitLabel || 'Potvrdit');

      function submit() {
        var val = Tiger.normalize(input.value);
        if (!val) { input.focus(); return; }
        var ok = (p.answers || []).some(function (a) { return Tiger.normalize(a) === val; });
        if (ok) {
          input.disabled = true; send.disabled = true;
          api.solve();
        } else {
          api.fail(pickWrong(p, val));
          input.select();
        }
      }

      send.addEventListener('click', submit);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
      });

      row.appendChild(input);
      row.appendChild(send);
      host.appendChild(row);
      setTimeout(function () { input.focus(); }, 260);
    }
  });

  // Pár odpovědí na typické „skoro správně" pokusy — dělá hru živější.
  function pickWrong(p, val) {
    if (p.nearMiss) {
      for (var i = 0; i < p.nearMiss.length; i++) {
        var nm = p.nearMiss[i];
        if ([].concat(nm.when).some(function (w) { return Tiger.normalize(w) === val; })) return nm.say;
      }
    }
    var pool = p.wrong || ['To není ono.'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* ---------------------------------------------------------
     2) LIGHTS — pojistky. Kliknutí přepne páčku i její sousedy.
     puzzle: { kind:'lights', initial:[0,1,0,1,0], labels:[...] }
     Cíl: rozsvítit všechno.
     --------------------------------------------------------- */
  register('lights', {
    render: function (host, p, api) {
      var state = (p.initial || [0, 0, 0]).slice();
      var moves = 0;

      var wrap = el('div', 'lights');
      var meta = el('div', 'puzzle-meta');
      var tools = el('div', 'puzzle-tools');
      var reset = el('button', 'link-btn', 'Vrátit páčky zpátky');

      function draw() {
        wrap.innerHTML = '';
        state.forEach(function (on, i) {
          var b = el('button', 'light' + (on ? ' on' : ''));
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          b.appendChild(el('div', 'bulb'));
          b.appendChild(el('div', 'switch'));
          b.appendChild(el('div', 'light-label', (p.labels && p.labels[i]) || String(i + 1)));
          b.addEventListener('click', function () { toggle(i); });
          wrap.appendChild(b);
        });
        meta.textContent = 'Přepnuto: ' + moves + '×';
      }

      function toggle(i) {
        [i - 1, i, i + 1].forEach(function (j) {
          if (j >= 0 && j < state.length) state[j] = state[j] ? 0 : 1;
        });
        moves++;
        draw();
        if (state.every(function (v) { return v === 1; })) {
          setTimeout(function () { api.solve({ moves: moves }); }, 420);
        } else if (moves === 4) {
          api.say('Něco se hýbe. Jen ne to správné.', 'hint');
        }
      }

      reset.addEventListener('click', function () {
        state = (p.initial || []).slice(); moves = 0; draw();
        api.say('Páčky jsou zpátky tam, kde byly.', 'hint');
      });

      host.appendChild(wrap);
      tools.appendChild(reset);
      tools.appendChild(meta);
      host.appendChild(tools);
      draw();
    }
  });

  /* ---------------------------------------------------------
     3) SEQUENCE — klikni na věci ve správném pořadí.
     puzzle: {
       kind:'sequence', solution:['a','b','c'],
       options:[{id,label,note,trap:'hláška'}],
       layout:'buttons' | 'piano' | 'stack'
     }
     --------------------------------------------------------- */
  register('sequence', {
    render: function (host, p, api) {
      var picked = [];
      var solution = p.solution || [];
      var options = p.options || [];

      var track = el('div', p.layout === 'stack' ? 'stack-view' : 'seq-track');
      var board = el('div', p.layout === 'piano' ? 'piano' : 'seq-options');
      var tools = el('div', 'puzzle-tools');
      var reset = el('button', 'link-btn', p.resetLabel || 'Začít znovu');

      function opt(id) {
        for (var i = 0; i < options.length; i++) if (options[i].id === id) return options[i];
        return null;
      }

      function drawTrack() {
        track.innerHTML = '';
        if (!picked.length) {
          var e = el('div', 'seq-empty', p.emptyLabel || 'zatím nic');
          track.appendChild(e);
          return;
        }
        picked.forEach(function (id, i) {
          var o = opt(id) || { label: id };
          if (p.layout === 'stack') {
            var box = el('div', 'stack-box', o.label);
            var w = 220 - i * 38;
            box.style.width = Math.max(90, w) + 'px';
            box.style.height = Math.max(26, 44 - i * 4) + 'px';
            track.appendChild(box);
          } else {
            track.appendChild(el('div', 'seq-slot', o.trackLabel || o.label));
          }
        });
      }

      function drawBoard() {
        board.innerHTML = '';
        options.forEach(function (o) {
          var b = el('button', p.layout === 'piano' ? 'key' : 'seq-btn');
          b.appendChild(document.createTextNode(o.label));
          if (o.note && p.layout !== 'piano') {
            var s = document.createElement('small');
            s.textContent = o.note;
            b.appendChild(s);
          }
          if (p.layout === 'stack' && picked.indexOf(o.id) > -1) b.disabled = true;
          b.addEventListener('click', function () { pick(o, b); });
          board.appendChild(b);
        });
      }

      function pick(o, btn) {
        if (o.trap) {                       // past — konkrétní špatná volba s vlastní hláškou
          picked = [];
          drawTrack(); drawBoard();
          api.fail(o.trap);
          return;
        }
        if (p.layout === 'piano') {
          btn.classList.add('pressed');
          setTimeout(function () { btn.classList.remove('pressed'); }, 140);
        }
        var idx = picked.length;
        picked.push(o.id);
        drawTrack();
        if (p.layout === 'stack') drawBoard();

        if (solution[idx] !== o.id) {       // špatný krok — zpátky na začátek
          setTimeout(function () {
            picked = [];
            drawTrack(); drawBoard();
            api.fail(p.wrongStep || 'Tohle pořadí nesedí. Ještě jednou, od začátku.');
          }, 300);
          return;
        }
        if (picked.length === solution.length) {
          setTimeout(function () { api.solve(); }, 320);
        }
      }

      reset.addEventListener('click', function () {
        picked = []; drawTrack(); drawBoard();
      });

      host.appendChild(track);
      host.appendChild(board);
      tools.appendChild(reset);
      host.appendChild(tools);
      drawTrack(); drawBoard();
    }
  });

  /* ---------------------------------------------------------
     4) CHOICE — vyber jednu z možností (může být i bez „správné")
     puzzle: { kind:'choice', options:[{id,label,correct,say}] }
     --------------------------------------------------------- */
  register('choice', {
    render: function (host, p, api) {
      var board = el('div', 'seq-options');
      (p.options || []).forEach(function (o) {
        var b = el('button', 'seq-btn');
        b.appendChild(document.createTextNode(o.label));
        if (o.note) {
          var s = document.createElement('small');
          s.textContent = o.note;
          b.appendChild(s);
        }
        b.addEventListener('click', function () {
          // Správná volba se musí označit výslovně. Kdyby stačilo „není false",
          // opomenutý příznak v datech mise by z chybné volby udělal správnou.
          if (o.correct !== true) { api.fail(o.say || 'Ne. Tohle není ono.'); return; }
          if (o.set) api.game.setFlags(o.set);
          api.solve({ choice: o.id });
        });
        board.appendChild(b);
      });
      host.appendChild(board);
    }
  });

  /* ---------------------------------------------------------
     5) PAIRS — spojovačka. Klikni vlevo, pak vpravo.
     puzzle: {
       kind:'pairs',
       left:[{id,label,note}], right:[{id,label}],
       solution:{ levyId: 'pravyId', ... }
     }
     --------------------------------------------------------- */
  register('pairs', {
    render: function (host, p, api) {
      var solution = p.solution || {};
      var matched = {};
      var picked = null;

      var board = el('div', 'pairs');
      var colL = el('div', 'pairs-col');
      var colR = el('div', 'pairs-col');
      board.appendChild(colL);
      board.appendChild(colR);
      host.appendChild(board);

      function done() { return Object.keys(matched).length === Object.keys(solution).length; }

      function draw() {
        colL.innerHTML = '';
        colR.innerHTML = '';

        (p.left || []).forEach(function (o) {
          var b = el('button', 'pair-btn');
          b.appendChild(document.createTextNode(o.label));
          if (o.note) {
            var s = document.createElement('small');
            s.textContent = o.note;
            b.appendChild(s);
          }
          if (matched[o.id]) b.classList.add('is-matched');
          else if (picked === o.id) b.classList.add('is-picked');
          b.disabled = !!matched[o.id];
          b.addEventListener('click', function () {
            picked = (picked === o.id) ? null : o.id;
            draw();
          });
          colL.appendChild(b);
        });

        (p.right || []).forEach(function (o) {
          var takenBy = null;
          Object.keys(matched).forEach(function (k) { if (matched[k] === o.id) takenBy = k; });

          var b = el('button', 'pair-btn');
          b.appendChild(document.createTextNode(o.label));
          if (takenBy) b.classList.add('is-matched');
          b.disabled = !!takenBy;
          b.addEventListener('click', function () {
            if (!picked) { api.say(p.pickFirst || 'Nejdřív vyber vlevo.', 'hint'); return; }
            if (solution[picked] === o.id) {
              matched[picked] = o.id;
              picked = null;
              draw();
              if (done()) setTimeout(function () { api.solve(); }, 420);
              else api.say(p.stepOk || 'Sedí.', 'good');
            } else {
              picked = null;
              draw();
              api.fail(p.wrongPair || 'Tahle dvojice k sobě nepatří.');
            }
          });
          colR.appendChild(b);
        });
      }

      draw();
    }
  });

  /* ---------------------------------------------------------
     6) RINGS — soustředné kruhy. Kliknutí otočí kruh i ten pod ním,
        takže záleží na pořadí: nejdřív vnější, pak dovnitř.
     puzzle: { kind:'rings', symbols:[...], start:[1,3,1], size:4 }
     Kliknutí na kruh otočí jeho i ten hned pod ním. Vnitřní kruh se otáčí
     sám, takže se hlavolam řeší odvenku dovnitř.
     Cíl: všechny kruhy na symbolu s indexem 0.
     --------------------------------------------------------- */
  register('rings', {
    render: function (host, p, api) {
      var symbols = p.symbols || ['\u25CF', '\u25B2', '\u25A0', '\u25C6'];
      var size = p.size || symbols.length;
      var state = (p.start || [1, 3, 1]).slice();
      var turns = 0;

      var wrap = el('div', 'rings');
      var tools = el('div', 'puzzle-tools');
      var meta = el('div', 'puzzle-meta');
      var reset = el('button', 'link-btn', 'Vrátit kruhy zpátky');

      function draw() {
        wrap.innerHTML = '';
        state.forEach(function (v, i) {
          var b = el('button', 'ring' + (v === 0 ? ' is-set' : ''));
          // Poměrem, ne pixely — jinak by vnější kruh přetekl na mobilu.
          b.style.width = b.style.height = (100 - i * 28) + '%';
          b.appendChild(el('span', 'ring-sym', symbols[v % symbols.length]));
          b.setAttribute('aria-label', 'Kruh ' + (i + 1));
          b.addEventListener('click', function () { turn(i); });
          wrap.appendChild(b);
        });
        meta.textContent = 'Otočeno: ' + turns + '\u00D7';
      }

      function turn(i) {
        // Kruh otočí sám sebe a kruh hned pod sebou. Vnitřní kruh už nemá
        // co táhnout, takže se řeší odshora dolů: nejdřív vnější, pak dovnitř.
        for (var j = i; j < Math.min(i + 2, state.length); j++) {
          state[j] = (state[j] + 1) % size;
        }
        turns++;
        draw();
        if (state.every(function (v) { return v === 0; })) {
          setTimeout(function () { api.solve({ turns: turns }); }, 420);
        }
      }

      reset.addEventListener('click', function () {
        state = (p.start || []).slice(); turns = 0; draw();
        api.say('Kruhy jsou zpátky tam, kde byly.', 'hint');
      });

      host.appendChild(wrap);
      tools.appendChild(reset);
      tools.appendChild(meta);
      host.appendChild(tools);
      draw();
    }
  });

  global.Tiger = global.Tiger || {};
  global.Tiger.Puzzles = { register: register, get: get };

})(window);
