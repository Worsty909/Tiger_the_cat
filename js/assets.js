/* =========================================================
   TIGER — Cesta domů
   assets.js — kde hra bere obrázky.

   Každá scéna má klíč (např. 'sklep-tma'). Hra zkusí zdroje
   v pořadí:
     1) assets/img/<klic>.avif   — lokální soubor v repozitáři
     2) vzdálená adresa z manifestu níže
   Když selže obojí, engine vykreslí stylovaný náhradní panel,
   takže hra je hratelná i úplně bez obrázků.

   Chceš mít repozitář soběstačný? Spusť tools/fetch-assets.sh —
   stáhne obrázky do assets/img/ a od té chvíle se použijí ony.
   ========================================================= */
(function (global) {
  'use strict';

  var CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_35qMncw28bSf47VgL5cP5k9pLQs/';

  // klíč scény -> název souboru vygenerovaného obrázku
  var REMOTE = {
    'titul':        'hf_20260908_181244_5f668745-0a03-4ecb-a3fa-8294c41142cf.png',
    'sklep-tma':    'hf_20260908_181245_c1d207d0-8fc0-4f02-8743-5508d27f72f2.png',
    'pojistky':     'hf_20260908_181244_26ae4937-16ab-4150-8dd4-a7d69a1f60dc.png',
    'sklep-svetlo': 'hf_20260908_181244_e297dba1-6764-488a-b7d5-6ea1ea318d12.png',
    'bedna':        'hf_20260908_181244_ebf4c213-a486-41e4-a56c-4742669d6bb2.png',
    'fotka':        'hf_20260908_181245_75e2fbcc-c594-41ac-a669-f5b5debcebbf.png',
    'bertik':       'hf_20260908_181245_9c40d930-ed51-4db8-82fa-f04cfd214310.png',
    'piano':        'hf_20260908_181244_e7637d38-1b8f-4492-983f-1d270e5f33d3.png',
    'bedny-okno':   'hf_20260908_181245_b18fbcc1-5618-4a48-b86d-0e33e7408687.png',
    'ulice':        'hf_20260908_181244_6723aa49-72da-4eb1-819f-57d5ed1b87d2.png',
    // referenční portrét hlavního hrdiny — pro další mise a materiály
    'tiger-ref':    'hf_20260908_180529_0aaa8f78-d892-499d-9489-fa2ad192259d.png'
  };

  function sources(key) {
    if (!key) return [];
    var list = ['assets/img/' + key + '.avif', 'assets/img/' + key + '.webp'];
    if (REMOTE[key]) list.push(CDN + REMOTE[key]);
    return list;
  }

  global.Tiger = global.Tiger || {};
  global.Tiger.Assets = { sources: sources, remote: REMOTE, cdn: CDN };

})(window);
