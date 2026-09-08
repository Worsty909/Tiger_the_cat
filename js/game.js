/* =========================================================
   TIGER — Cesta domů
   game.js — propojení enginu, UI a ovládacích prvků.
   ========================================================= */
(function (global) {
  'use strict';

  var Game = global.Tiger.Game;
  var UI = global.Tiger.UI;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- napojení enginu na UI ---------- */
  Game.on('scene', function (scene) { UI.renderScene(scene); });
  Game.on('inventory', function () { UI.renderInventory(); });
  Game.on('journal', function () { UI.renderJournalBadge(); });
  Game.on('finish', function (payload) { UI.renderEnd(payload); });

  /* ---------- titulní obrazovka ---------- */
  function refreshTitle() {
    $('btnContinue').hidden = !Game.hasSave();

    // Pozadí titulky: první zdroj, který se opravdu načte.
    var art = $('titleArt');
    var list = global.Tiger.Assets.sources('titul');
    (function tryNext(i) {
      if (i >= list.length) return;
      var probe = new Image();
      probe.onload = function () { art.style.backgroundImage = 'url("' + list[i] + '")'; };
      probe.onerror = function () { tryNext(i + 1); };
      probe.src = list[i];
    })(0);
  }

  $('btnNewGame').addEventListener('click', function () {
    if (Game.hasSave() && !confirm('Tohle smaže rozehranou hru. Začít znovu?')) return;
    Game.wipe();
    Game.start(global.Tiger.firstMissionId());
  });

  $('btnContinue').addEventListener('click', function () {
    if (!Game.resume()) {
      Game.wipe();
      Game.start(global.Tiger.firstMissionId());
    }
  });

  $('btnAbout').addEventListener('click', openAbout);

  /* ---------- horní lišta ---------- */
  $('btnJournal').addEventListener('click', function () { UI.openJournal(); });

  $('btnMenu').addEventListener('click', function () {
    UI.openModal('Menu', function (body) {
      var list = document.createElement('div');
      list.className = 'menu-list';

      list.appendChild(menuBtn('Deník vzpomínek', function () {
        UI.closeModal(); UI.openJournal();
      }));

      list.appendChild(menuBtn('Zopakovat tuhle scénu', function () {
        UI.closeModal();
        Game.goto(Game.state.sceneId);
      }));

      list.appendChild(menuBtn('Začít misi od začátku', function () {
        if (!confirm('Opravdu začít misi 1 od začátku?')) return;
        UI.closeModal();
        Game.wipe();
        Game.start(global.Tiger.firstMissionId());
      }));

      list.appendChild(menuBtn('Zpět na titulní obrazovku', function () {
        UI.closeModal();
        refreshTitle();
        UI.show('title');
      }));

      list.appendChild(menuBtn('O hře', function () { UI.closeModal(); openAbout(); }));

      body.appendChild(list);
    });
  });

  function menuBtn(label, fn) {
    var b = document.createElement('button');
    b.className = 'btn btn-ghost';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  }

  function openAbout() {
    UI.openModal('O hře', function (body) {
      body.innerHTML =
        '<p><strong>TIGER — Cesta domů</strong> je textově-grafická úniková hra. ' +
        'Ovládá se jenom klikáním a psaním odpovědí — žádná obratnost, žádný časový limit.</p>' +
        '<h4>Jak se hraje</h4>' +
        '<p>Klepnutím posouváš text. Hádanky se řeší kliknutím na věci nebo napsáním odpovědi. ' +
        'Na diakritice ani velkých písmenech nezáleží. Když se zasekneš, každá hádanka má nápovědy — ' +
        'a hra se nikdy nedá pokazit tak, aby nešla dohrát.</p>' +
        '<h4>Postup</h4>' +
        '<p>Hra se ukládá sama do prohlížeče. Zavřít okno je bezpečné.</p>' +
        '<h4>Kdo je Tiger</h4>' +
        '<p>Bengálská kočka, která se ztratila. Zatím to vypadá jako nehoda. ' +
        'Zatím.</p>';
    });
  }

  /* ---------- modál ---------- */
  $('modalClose').addEventListener('click', function () { UI.closeModal(); });
  $('modal').addEventListener('click', function (e) {
    if (e.target === $('modal')) UI.closeModal();
  });

  /* ---------- posouvání textu ---------- */
  document.querySelector('.stage').addEventListener('click', function (e) {
    if (!UI.revealing) return;
    if (e.target.closest('button, input, a, .puzzle')) return;
    UI.revealNext();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { UI.closeModal(); return; }
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if ((e.key === 'Enter' || e.key === ' ') && UI.revealing) {
      e.preventDefault();
      UI.revealNext();
    }
  });

  /* ---------- konec mise ---------- */
  $('btnEndJournal').addEventListener('click', function () { UI.openJournal(); });
  $('btnEndMenu').addEventListener('click', function () {
    refreshTitle();
    UI.show('title');
  });

  /* ---------- start ---------- */
  refreshTitle();

})(window);
