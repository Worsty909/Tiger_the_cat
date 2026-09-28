# Obrázky

Seznam všech obrázků je **jen v `js/assets.js`** (klíč scény → adresa).
Tahle složka drží obrázky, které jsou přímo v repozitáři — mají přednost
před adresou.

## Jak to funguje

- **Při nasazení** workflow spustí `tools/build-images.py`. Pro každý klíč
  z `js/assets.js` vezme `<klíč>.webp` z téhle složky; když tu je jen
  `.png` / `.jpg`, převede ho; když tu není nic, stáhne obrázek z adresy.
  Všechno zmenší na 900 px (titulku na 1200 px) a uloží jako webp q78.
  Stažené obrázky si workflow drží v cache, takže každý stahuje jen jednou.
- **Ve hře** se zkouší `assets/img/<klíč>.webp`, pak adresa, a když selže
  obojí, vykreslí se stylizovaný náhradní panel.

Nový obrázek tedy nepotřebuje nic stahovat ani převádět: stačí řádek
v `js/assets.js`. Který obrázek leží kde, vypíše `node tools/validate-mission.js`
(sekce „Obrázky").

Doplnit obrázky do repozitáře lokálně (třeba pro hraní offline) jde jedním
příkazem, potřebuje jen Pillow:

```bash
python3 tools/build-images.py --out assets/img
```

## Seznam

| Klíč | Kde se objeví |
|------|---------------|
| `titul` | pozadí titulní obrazovky (16:9, ostatní jsou 3:2) |
| `sklep-tma` | probuzení v temném sklepě |
| `pojistky` | pojistková skříň |
| `sklep-svetlo` | sklep po rozsvícení, okno |
| `bedna` | zamčená bedna a její obsah |
| `fotka` | stará fotka na podlaze |
| `bertik` | setkání s myší Bertíkem |
| `piano` | piano a tři tóny |
| `bedny-okno` | schody z beden a únik |
| `ulice` | plakát v dešti |
| `tiger-ref` | referenční portrét Tigera (v misi se nezobrazuje) |

### Mise 2 — Ulice, které si pamatují

| Klíč | Kde se objeví |
|------|---------------|
| `m2-ulice-dest` | odchod od plakátu do deště |
| `m2-sloup` | sloup s vrstvami starých plakátů |
| `m2-plakaty` | čtyři plakáty seřazené podle stáří |
| `m2-vilem` | holub Vilém na zábradlí |
| `m2-archiv` | Vilémovo hnízdo z natrhaných plakátů |
| `m2-budka` | telefonní budka a záznamník |
| `m2-dvur` | dvůr s kovanou mříží a kruhovým zámkem |
| `m2-zvonky` | panel se jmenovkami a schránkami |
| `m2-chodba` | schodiště, schránka číslo 6, dopis |
| `m2-okno` | holčička v okně za svítání |

### Mise 3 — Co si pamatuje kocour

| Klíč | Kde se objeví |
|------|---------------|
| `m3-prah` | dveře se za svítání otevřou |
| `m3-ema` | Ema si klekne a nabídne obojek |
| `m3-krabice` | Elenina krabice: sedmnáct let hledání |
| `m3-mapa` | ručně kreslená mapa sklepů |
| `m3-vilem` | Vilém konečně doručuje |
| `m3-zprava` | rozvinutý proužek z pouzdra |
| `m3-album` | staré album s mosaznou sponou |
| `m3-1961` | fotka z roku 1961 — Elena jako dítě |
| `m3-sklep-den` | sklep za denního světla, s Bertíkem |
| `m3-konec` | parapet na slunci (oba konce) |

### Mise 4 — Až zapomenu

| Klíč | Kde se objeví |
|------|---------------|
| `m4-pokoj` | probuzení bez paměti, Ema čte nahlas |
| `m4-ema` | Ema v devatenácti, police se sešity |
| `m4-sesity` | stůl pod čtyřiceti jedna sešity |
| `m4-most` | Bruno na zděděném hnízdě |
| `m4-archiv` | čtyři komínky tříděné podle ruky |
| `m4-karta` | devatenáct kartiček z Krátké |
| `m4-kratka` | Krátká 2, prázdné okno |
| `m4-plakat` | plakát MIKEŠ vyhrabaný z vrstev |
| `m4-piano` | piano v obýváku, cihla pod nohou |
| `m4-konec` | parapet za soumraku, Ema píše |

Aby Tiger vypadal ve všech scénách stejně, předávej při generování
`tiger-ref` jako referenční obrázek — postup je popsaný v `docs/DESIGN.md`.
