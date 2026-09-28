/* =========================================================
   TIGER — Cesta domů
   assets.js — obrázky scén.

   JEDINÝ seznam obrázků ve hře. Nový obrázek = jeden řádek níž:

     'klic-sceny': 'https://…adresa vygenerovaného obrázku…',

   Nic se nestahuje ani nepřevádí ručně. Při nasazení na GitHub Pages
   si workflow (tools/build-images.py) obrázky sám stáhne, zmenší na
   900 px a uloží jako webp. Soubor, který už leží v assets/img/,
   má přednost — tak se dá kterýkoli obrázek ručně přepsat.

   V prohlížeči se pro každý klíč zkouší v tomhle pořadí:
     1) assets/img/<klic>.webp   — vyrobí deploy, nebo leží v repozitáři
     2) adresa z IMAGES          — funguje i bez deploye (file://)
     3) stylovaný náhradní panel — hra jde dohrát i bez grafiky
   ========================================================= */
(function (global) {
  'use strict';

  var CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_35qMncw28bSf47VgL5cP5k9pLQs/';

  // Formát řádku drží tools/build-images.py: 'klic': 'adresa',
  var IMAGES = {
    // titulka (16:9) a mise 1
    'titul':         CDN + 'hf_20260908_181244_5f668745-0a03-4ecb-a3fa-8294c41142cf.png',
    'sklep-tma':     CDN + 'hf_20260908_181245_c1d207d0-8fc0-4f02-8743-5508d27f72f2.png',
    'pojistky':      CDN + 'hf_20260908_181244_26ae4937-16ab-4150-8dd4-a7d69a1f60dc.png',
    'sklep-svetlo':  CDN + 'hf_20260908_181244_e297dba1-6764-488a-b7d5-6ea1ea318d12.png',
    'bedna':         CDN + 'hf_20260908_181244_ebf4c213-a486-41e4-a56c-4742669d6bb2.png',
    'fotka':         CDN + 'hf_20260908_181245_75e2fbcc-c594-41ac-a669-f5b5debcebbf.png',
    'bertik':        CDN + 'hf_20260908_181245_9c40d930-ed51-4db8-82fa-f04cfd214310.png',
    'piano':         CDN + 'hf_20260908_181244_e7637d38-1b8f-4492-983f-1d270e5f33d3.png',
    'bedny-okno':    CDN + 'hf_20260908_181245_b18fbcc1-5618-4a48-b86d-0e33e7408687.png',
    'ulice':         CDN + 'hf_20260908_181244_6723aa49-72da-4eb1-819f-57d5ed1b87d2.png',
    // referenční portrét Tigera — ve hře se nezobrazuje, slouží ke generování
    'tiger-ref':     CDN + 'hf_20260908_180529_0aaa8f78-d892-499d-9489-fa2ad192259d.png',

    // mise 2
    'm2-ulice-dest': CDN + 'hf_20260908_203207_357f5f9b-8353-4eb3-86e7-2ac35eab7ee6.png',
    'm2-sloup':      CDN + 'hf_20260908_203207_675fb3b1-4588-49bf-be86-462424c0d03e.png',
    'm2-plakaty':    CDN + 'hf_20260908_203207_e7cef5a8-638d-40b5-9ac0-f858ba084c00.png',
    'm2-vilem':      CDN + 'hf_20260908_203207_5bf3bcae-30be-4600-8f9b-8c8ddf91db69.png',
    'm2-archiv':     CDN + 'hf_20260908_203207_242c5da7-bda7-40b0-a0cb-f83bd5275038.png',
    'm2-budka':      CDN + 'hf_20260908_203207_5e91f6ff-994f-478e-8eaf-9ea90902fda7.png',
    'm2-dvur':       CDN + 'hf_20260908_203208_a1dd3d10-17e5-4a58-9b15-77f75b5ac42e.png',
    'm2-zvonky':     CDN + 'hf_20260908_203207_8c095418-c1d1-42ee-85a8-a6731307520d.png',
    'm2-chodba':     CDN + 'hf_20260908_203207_b6ceda17-e459-4d86-afca-63bb8b82e98b.png',
    'm2-okno':       CDN + 'hf_20260908_203207_0ac35f0a-c32a-4ebb-814d-ac5da4d52510.png',

    // mise 3
    'm3-prah':       CDN + 'hf_20260909_065418_372bd26f-1ab5-4d0d-a8a2-6fd453b53dbf.png',
    'm3-ema':        CDN + 'hf_20260909_065418_47bc6310-429e-4ce4-ad22-4a800871ba39.png',
    'm3-krabice':    CDN + 'hf_20260909_065418_a3048921-ee15-4a8c-8f83-5409d364f32a.png',
    'm3-mapa':       CDN + 'hf_20260909_065418_79df79f8-1fd7-41dd-a8aa-0ff9c3fd52ff.png',
    'm3-vilem':      CDN + 'hf_20260909_065418_2ed51be7-2a7f-44aa-9dfb-6b964706ccbb.png',
    'm3-zprava':     CDN + 'hf_20260909_065418_7555bb19-d078-4c18-b7b9-fe15984e26fe.png',
    'm3-album':      CDN + 'hf_20260909_065418_b2f26686-78f6-49dc-bf68-0be833ec37a6.png',
    'm3-1961':       CDN + 'hf_20260909_065418_98544fb3-21f7-4090-a203-2640f0c6de8c.png',
    'm3-sklep-den':  CDN + 'hf_20260909_065418_085996aa-5ebd-49fc-8ee8-6023454ed4e8.png',
    'm3-konec':      CDN + 'hf_20260909_065418_d32a25ce-cf42-45fb-b534-88e6ba4a2f0c.png',

    // mise 4
    'm4-pokoj':      CDN + 'hf_20260909_144625_09ab74ee-dc8a-4330-a47e-d71e88e1874f.png',
    'm4-ema':        CDN + 'hf_20260909_144624_d0cbb6e2-0556-4d2b-a8a7-e4facc946a17.png',
    'm4-sesity':     CDN + 'hf_20260909_144754_3b52ba6f-ee4f-4bc8-913b-ce0d720ec0e7.png',
    'm4-most':       CDN + 'hf_20260909_144625_96f631f8-cd2d-4a34-93d4-8abbef09301d.png',
    'm4-archiv':     CDN + 'hf_20260909_144753_ed3758a3-464c-429d-ae03-7bba967ce78c.png',
    'm4-karta':      CDN + 'hf_20260909_144624_8dcb7085-1a24-406f-a46d-cc3c0f3af59f.png',
    'm4-kratka':     CDN + 'hf_20260909_144624_ba69b827-31a6-42c6-8b89-8bb695cbcc3e.png',
    'm4-plakat':     CDN + 'hf_20260909_144625_1b0e793c-b299-4bc7-a047-7c0612827d0c.png',
    'm4-piano':      CDN + 'hf_20260909_144625_a46d88b0-adb5-4605-ad4d-544a88765dad.png',
    'm4-konec':      CDN + 'hf_20260909_144625_fc16c5bd-a347-4f63-9cd3-338716fc6ba0.png'
  };

  function sources(key) {
    if (!key) return [];
    var list = ['assets/img/' + key + '.webp'];
    if (IMAGES[key]) list.push(IMAGES[key]);
    return list;
  }

  /* ---------- načítání s pamětí ----------
     Pro každý klíč se zdroje zkoušejí jen jednou; výsledek (funkční adresa,
     nebo null) si modul pamatuje. Scéna, titulka i přednačítání tak sdílejí
     jedno načtení a opakovaná návštěva scény nestojí žádný požadavek navíc. */

  var resolved = {};   // klíč -> adresa | null
  var pending = {};    // klíč -> [callbacky]

  function load(key, cb) {
    cb = cb || function () {};
    if (!key) { cb(null); return; }
    if (key in resolved) { cb(resolved[key]); return; }
    if (pending[key]) { pending[key].push(cb); return; }
    pending[key] = [cb];

    var list = sources(key);
    (function attempt(i) {
      if (i >= list.length) return settle(key, null);
      var probe = new Image();
      probe.decoding = 'async';
      probe.onload = function () { settle(key, list[i]); };
      probe.onerror = function () { attempt(i + 1); };
      probe.src = list[i];
    })(0);
  }

  function settle(key, url) {
    resolved[key] = url;
    var waiting = pending[key] || [];
    delete pending[key];
    waiting.forEach(function (fn) { fn(url); });
  }

  // Přednačtení: stáhne obrázek do cache prohlížeče, nic nevykresluje.
  function preload(keys) {
    [].concat(keys || []).forEach(function (k) { load(k); });
  }

  global.Tiger = global.Tiger || {};
  global.Tiger.Assets = { images: IMAGES, sources: sources, load: load, preload: preload };

})(window);
