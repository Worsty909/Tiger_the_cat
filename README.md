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

**Mise 4 — „Až zapomenu"** (19 scén, 5 hádanek): rok 2038, Tiger bez paměti
a čtyřicet jedna sešitů, které za něj pamatují. Jedna scéna se liší podle toho,
jak hráč dohrál trojku.

Mise na sebe navazují — po dohrání jedné se dá plynule pokračovat a deník
si hráč nese s sebou (i když další kapitolu spustí z výběru kapitol).

## Kde si zahrát

**<https://worsty909.github.io/Tiger_the_cat/>**

Nasazuje se automaticky při každém pushi do výchozí větve
(`.github/workflows/pages.yml`). Workflow nejdřív spustí validátor misí —
s chybou se hra nenasadí — a pak doplní obrázky (viz níže).

## Jak to spustit lokálně

Otevři `index.html` v prohlížeči. To je všechno — žádný build, žádné závislosti,
čisté HTML/CSS/JS.

Obrázky, které leží v `assets/img/`, se načtou z disku; ostatní hra vezme
přímo z adresy v `js/assets.js`. Když se nepodaří ani to, vykreslí stylizovaný
náhradní panel: dohrát se dá i úplně bez grafiky.

## Obrázky — jak přidat nový

Stačí **jeden řádek** v `js/assets.js`:

```js
'm5-most': 'https://…adresa vygenerovaného obrázku…',
```

a ve scéně `bg: 'm5-most'`. Nic se nestahuje ani nepřevádí ručně — při
nasazení to udělá workflow (`tools/build-images.py`): obrázek stáhne, zmenší
na 900 px, uloží jako webp a zapamatuje si ho v cache, takže se příště už
nestahuje. Hotový web tak dostává malé webp soubory, ne několikamegabajtová PNG.

Chceš některý obrázek přepsat vlastním? Nakopíruj ho do `assets/img/` jako
`<klíč>.webp`, `.png` nebo `.jpg` — soubor v repozitáři má vždycky přednost.

## Co hra umí

- **Čtyři mise**, rozhodnutí z konce trojky se promítne do čtyřky
- **Postupné odkrývání textu** klepnutím, s rozlišením vypravěče, Tigera a vedlejších postav
- **Osm typů hádanek** (viz níže), všechny ovladatelné myší nebo klávesnicí
- **Nápovědy** u každé hádanky, odstupňované — poslední tě prakticky dovede k odpovědi
- **Odpovědi bez ohledu na diakritiku a velikost písmen** (`Klavír` = `klavir` = `PIANO`)
- **Deník vzpomínek** — sbírá se během hraní a je to hlavní nosič příběhu do dalších dílů
- **Inventář** a příznaky, na kterých se dají větvit scény
- **Automatické ukládání** do `localStorage`, zavřít okno je bezpečné
- **Přednačítání** obrázků scén, kam se dá jít dál — přechody bez čekání
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
index.html                  kostra a obrazovky
css/style.css               celý vizuál
js/engine.js                stav hry, scény, ukládání, registr misí
js/assets.js                seznam obrázků (klíč → adresa) a jejich načítání
js/puzzles.js               registr typů hádanek
js/ui.js                    vykreslování scén, dialogů a hádanek
js/game.js                  propojení enginu, UI a ovládání
js/missions/mission-0N.js   každá mise jako data
assets/img/                 obrázky v repozitáři (mají přednost před adresou)
tools/build-images.py       při deployi doplní a převede obrázky na webp
tools/validate-mission.js   kontrola, že příběhový graf drží pohromadě
docs/DESIGN.md              jak přidat další misi + příběhová bible
```

## Kontrola integrity

Před commitem obsahu se vyplatí spustit:

```bash
node tools/validate-mission.js
```

Ověří, že všechny přechody míří na existující scény, že je každá scéna dosažitelná,
že hádanky mají řešení (u pojistek a kruhů to zkusí hrubou silou), že mise má konec
a že se neodkazuje na neexistující předměty, zápisy v deníku a obrázky.

Navíc hledá **zákysy**: projde všechny stavy, do kterých se hráč může dostat
(scéna + batoh + příznaky, a u mise 4 každou variantu rozhodnutí z trojky),
a z každého musí vést cesta ke konci. Běží i při každém deployi.

## Pokračování

Mise je **data, ne kód** — přidat další díl znamená přidat jeden soubor do
`js/missions/`. Podrobně v [`docs/DESIGN.md`](docs/DESIGN.md), včetně toho,
kam příběh míří a které nitky jsou schválně nechané viset.

## Poznámka k obrázkům

Grafiku vygeneroval Higgsfield (Nano Banana Pro) ve stylu ilustrované dětské knížky.
Pro konzistenci vzhledu Tigera napříč scénami slouží referenční portrét
(`tiger-ref`), který se předává jako reference do každé další generace —
stejný postup použij i u dalších misí.
