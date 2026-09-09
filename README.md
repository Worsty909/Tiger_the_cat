# TIGER — Cesta domů

Textově-grafická úniková hra o bengálské kočce jménem **Tiger**, která se ztratila
a hledá cestu domů. Ovládá se **jenom klikáním a psaním odpovědí** — žádná obratnost,
žádný časový limit, žádné složité interakce.

> Tiger si pamatoval tři věci. Vůni pečeného kuřete. Otevřená dvířka dodávky.
> A pocit, že je to vynikající nápad.

**Mise 1 — „Kdo zhasl slunce"** (15 scén, 5 hádanek): únik ze sklepa, komedie
s myší v helmě, jeden opravdu nepříjemný nález a zvrat na konci.

**Mise 2 — „Ulice, které si pamatují"** (14 scén, 5 hádanek): noční město,
plakáty starší, než by měly být, poštovní holub bez adresáta a konec, který
otevírá víc otázek, než zavírá.

**Mise 3 — „Co si pamatuje kocour"** (15 scén, 5 hádanek): odpovědi. Kdo je ta
holčička, proč Tiger nestárne, co bylo v holubím pouzdře — a dva různé konce
podle toho, jak se hráč rozhodne.

Mise na sebe navazují — po dohrání jedničky se dá plynule pokračovat a deník
si hráč nese s sebou.

## Kde si zahrát

**<https://worsty909.github.io/Tiger_the_cat/>**

Nasazuje se automaticky při každém pushi do výchozí větve
(`.github/workflows/pages.yml`).

## Jak to spustit lokálně

Otevři `index.html` v prohlížeči. To je všechno — žádný build, žádné závislosti,
čisté HTML/CSS/JS.

Všech 11 obrázků je součástí repozitáře v `assets/img/` (dohromady 442 kB), takže
hra funguje i offline. Kdyby některý chyběl, načte se z CDN — adresy jsou
v `js/assets.js` a `tools/fetch-assets.sh` je umí stáhnout znovu. Když se
nepodaří ani to, hra vykreslí stylizovaný náhradní panel: dohrát se dá i úplně
bez grafiky.

## Co hra umí

- **Postupné odkrývání textu** klepnutím, s rozlišením vypravěče, Tigera a vedlejších postav
- **Čtyři typy hádanek** (viz níže), všechny ovladatelné myší nebo klávesnicí
- **Nápovědy** u každé hádanky, odstupňované — poslední tě prakticky dovede k odpovědi
- **Odpovědi bez ohledu na diakritiku a velikost písmen** (`Klavír` = `klavir` = `PIANO`)
- **Deník vzpomínek** — sbírá se během hraní a je to hlavní nosič příběhu do dalších dílů
- **Inventář** a příznaky, na kterých se dají větvit scény
- **Automatické ukládání** do `localStorage`, zavřít okno je bezpečné
- **Výběr kapitol** na titulce — kapitola se odemyká dohráním té předchozí
- **Hra se nedá pokazit** tak, aby nešla dohrát

## Hádanky v misi 1

| # | Hádanka | Typ | Co se řeší |
|---|---------|-----|------------|
| 1 | Pojistková skříň | `lights` | Přepnutí páčky přepne i sousedy. Rozsvítit všech pět. |
| 2 | Zámek na bedně | `input` | Trojmístný kód z hádanky pro děti. |
| 3 | Bertíkova hádanka | `input` | Slovní hádanka o věci, co má klíč, nohy a zuby. |
| 4 | Piano | `sequence` | Zahrát tři tóny z ohořelého útržku not. |
| 5 | Schody z beden | `sequence` | Seřadit bedny podle velikosti — a nešlápnout na prohnilou. |

## Struktura projektu

```
index.html               kostra a obrazovky
css/style.css            celý vizuál
js/engine.js             stav hry, scény, ukládání, registr misí
js/assets.js             kde hra bere obrázky (lokálně → CDN)
js/puzzles.js            registr typů hádanek
js/ui.js                 vykreslování scén, dialogů a hádanek
js/game.js               propojení enginu, UI a ovládání
js/missions/mission-01.js   celá mise 1 jako data
tools/fetch-assets.sh    stáhne obrázky do repozitáře
tools/validate-mission.js kontrola, že příběhový graf drží pohromadě
docs/DESIGN.md           jak přidat další misi + příběhová bible
```

## Kontrola integrity

Před commitem obsahu se vyplatí spustit:

```bash
node tools/validate-mission.js
```

Ověří, že všechny přechody míří na existující scény, že je každá scéna dosažitelná,
že hádanky mají řešení (u pojistek to zkusí hrubou silou), že mise má konec
a že se neodkazuje na neexistující předměty a zápisy v deníku.

## Pokračování

Mise je **data, ne kód** — přidat další díl znamená přidat jeden soubor do
`js/missions/`. Podrobně v [`docs/DESIGN.md`](docs/DESIGN.md), včetně toho,
kam příběh míří a které nitky jsou schválně nechané viset.

## Poznámka k obrázkům

Grafiku vygeneroval Higgsfield (Nano Banana Pro) ve stylu ilustrované dětské knížky.
Pro konzistenci vzhledu Tigera napříč scénami slouží referenční portrét
(`tiger-ref`), který se předává jako reference do každé další generace —
stejný postup použij i u dalších misí.
