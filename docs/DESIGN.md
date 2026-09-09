# Příběhová bible a návod na další misi

## Kdo je Tiger

Bengálská kočka. Zlatá srst s rozetami, zelené oči, červený obojek s ošoupanou
mosaznou známkou. Mluví suše, ironicky, s načasováním stand-up komika — ale
jenom dokud se nezmíní domov. Pak je ticho.

**Klíč k jeho hlasu:** Tiger vtipkuje, když se bojí. Čím vážnější scéna, tím
kratší věty. V nejtěžších chvílích neřekne skoro nic — a to má bolet.

## Kam příběh míří

Mise 1 vypadá jako nehoda: kočka usnula v dodávce. Není to nehoda.

Nitky schválně nechané viset:

- **Fotka z léta 2009.** Je na ní Tiger. Fotka je starší než on. Tohle je
  hlavní záhada celé série a nemá se vysvětlit brzy.
- **Kdo zamkl bednu.** Bertík říká, že to byl někdo, kdo znal kód, protože si
  ho vymyslel sám. Před dlouhou dobou.
- **Jméno MIKEŠ.** Na plakátu je Tigerova fotka a cizí jméno. Tiger se tak
  nejmenuje. Někdo ho ale tak volal — a hledal ho.
- **Podpis „E."** Dětské písmo, tužka, přeškrtnuté telefonní číslo. Ta věta
  („prosím vrať se.") je emocionální kotva celé série.
- **Bertíkova otázka.** „Neptej se ho *proč*. Zeptej se ho, *jak dlouho už to
  dělá*." — naznačuje, že Tiger není první.

### Co odhalila mise 2

- **Čtyři jména, sedmnáct let.** TIGER (2009), BARON (2015), TYGŘÍK (2020),
  MIKEŠ (2026). Jedna fotka na všech plakátech. Tiger nestárne — a je to teď
  řečeno nahlas, ne jen naznačeno.
- **Elena Marešová** je „E." Hledala ho sedmnáct let a umřela rok předtím, než
  ji našel. Tohle se nesmí odestát ani vylepšit; je to cena, kterou příběh platí.
- **Známka z obojku:** „TIGER / Kovářská 9 / domov". Existuje dvakrát, protože
  Elena nechala vyrýt druhou.
- **Vilém** doručuje zprávu, jejíž adresát dávno neexistuje. Je to Tigerovo
  zrcadlo: obě postavy dělají totéž, jen jedna si to přiznává.
- **Holčička v okně** vypadá přesně jako Elena na fotce z roku 2009 a drží
  červený obojek. Zná Tigerovo jméno. Tohle je hlavní otázka mise 3.

### Co odhalila mise 3 (odpovědi)

- **Tiger nestárne, protože zapomíná.** Když ztratí člověka, ztratí s ním
  úplně všechno ostatní a začíná od nuly. Proto nikdy nedojde tak daleko, aby
  zestárnul. Je to jediná nemožná věc v jinak obyčejném světě — víc jich do
  příběhu nepatří.
- **Tři generace, jeden obličej.** Elena (1961, 8 let) → Klára (2009, 7 let)
  → Ema (2026, 7 let). Tím se vysvětluje holčička v okně: není to Elena, je to
  její pravnučka. Elena umřela jako stařenka, takže tou holčičkou z roku 2009
  být nemohla — to byla Klára.
- **Elena ho potkala jako dítě v roce 1961.** Její hledání nebyla starost o
  vnuččinu kočku, ale o kocoura z vlastního dětství.
- **Kdo ho zavřel do sklepa: nikdo.** Skočil si do dodávky sám. Bedna, kód 415
  a sardinky byly Elenina skrýš, jedna ze čtyřiceti. Tigerova domněnka
  z konce mise 1 byla mylná — příběh není spiknutí, ale ztráta.
- **Vilémovo pouzdro** obsahovalo Elenin vzkaz adresovaný Tigerovi. Doručeno
  po sedmnácti letech.
- **Dva konce.** Zůstat (Ema si to bude pamatovat za něj) nebo odejít dřív, než
  ji stihne zapomenout. Ani jeden není ten „správný"; příznak `zustal` je
  uložený pro pokračování.

### Nitky pro misi 4

- Co se stane, až Ema vyroste a Tiger zapomene i ji?
- Funguje vůbec „pamatovat si to za někoho"? Zatím to nikdo nezkusil.
- Bertík má jednu vzpomínku, na které mu záleží. Tiger nemá žádnou.

### Nitky pro misi 3 (vyřešeno)

- Kdo je ta holčička a proč je to Elena?
- Co bylo ve Vilémově pouzdře — a pro koho?
- Kdo Tigera odnesl do sklepa a proč zrovna teď?
- Tiger si nepamatuje nic před dodávkou. Ta ztráta paměti je záměrná, ne
  vypravěčská zkratka.

**Tón:** vtipné a hluboké se musí střídat, ne mísit. Scéna je buď komická,
nebo srdcervoucí. Když je obojí najednou, není ani jedno.

## Přidání další mise

Mise je čistě datový soubor. Zkopíruj `js/missions/mission-01.js`, změň `id`,
`number` a `start`, zaregistruj skript v `index.html` a hotovo — engine se
o zbytek postará.

### Kostra

```js
Tiger.registerMission({
  id: 'm02',
  number: 2,
  title: 'Ulice, které si pamatují',
  shortTitle: 'Mise 2',
  start: 'prvni-scena',

  items:    { klic: { emo: '🔑', name: 'Klíč', desc: 'Od čeho?' } },
  journal:  { 'j-neco': { title: 'Nadpis', text: 'Tigerův zápisek.' } },
  epilogue: { title: '…', text: [ /* stejný formát jako text scény */ ], next: '…' },

  scenes: [ /* … */ ]
});
```

### Scéna

```js
{
  id: 'prvni-scena',
  place: 'Ulice',            // do horní lišty
  title: 'Nadpis scény',
  bg: 'klic-obrazku',        // js/assets.js → assets/img/<klic>.avif
  give: ['klic'],            // předměty do batohu při vstupu
  set: { neco: true },       // příznaky
  journal: 'j-neco',         // zápis do deníku
  text: [ /* viz níže */ ],
  puzzle: { /* nepovinné */ },
  actions: [
    { label: 'Jít dál', goto: 'dalsi-scena' },
    { label: 'Otevřít dveře', goto: 'x', if: g => g.has('klic') },
    { label: 'Konec mise', end: true }
  ]
}
```

### Text scény

Pole řádků, které se odkrývají po jednom. Podporované tvary:

```js
text: [
  'Obyčejný text vypravěče. Hvězdičky dělají *důraz*.',
  { tiger:  'Tigerova replika.' },
  { bertik: 'Replika vedlejší postavy.' },
  { hlas:   'Někdo, koho není vidět.' },
  { note:   'Text na papíře.\nZobrazí se jako lístek.' },
  { sys:    'Systémová poznámka.' },
  { beat: true }              // pauza — vizuální předěl
]
```

Nová postava = přidat jméno do `SPEAKERS` v `js/ui.js` a barvu do `css/style.css`
(`.line-<klic> .say-who` a `.say-text`).

### Typy hádanek

Všechny berou `id`, `head`, `prompt`, `hints[]`, `success`, `goto` a nepovinně
`give` / `set` / `journal`.

**`input`** — napsaná odpověď. Porovnává se bez diakritiky a velikosti písmen.
```js
{ kind: 'input', answers: ['klavír', 'piano'],
  wrong: ['Hlášky při špatné odpovědi.'],
  nearMiss: [ { when: ['housle'], say: 'Teplo!' } ] }
```

**`lights`** — přepnutí páčky přepne i oba sousedy, cíl je rozsvítit všechno.
```js
{ kind: 'lights', initial: [0,1,0,1,0], labels: ['I','II','III','IV','V'] }
```
Řešitelnost ověří `node tools/validate-mission.js` hrubou silou.

**`sequence`** — klikání ve správném pořadí. `layout` je `buttons`, `piano`
nebo `stack`. Volba s `trap` je past s vlastní hláškou.
```js
{ kind: 'sequence', layout: 'piano',
  options: [{ id: 'h', label: 'H' }, /* … */],
  solution: ['h','a','f'] }
```

**`choice`** — jedna volba z několika. Volba s `correct: false` je špatně,
volba se `set` nastaví příznak. Bez `correct: false` nejde vybrat špatně —
hodí se na rozhodnutí, která mají mít následky až později.

**Nový typ** se registruje zvenčí, engine se nemusí měnit:
```js
Tiger.Puzzles.register('muj-typ', {
  render: function (host, puzzle, api) {
    // api.solve() / api.fail('hláška') / api.say(text, 'hint') / api.game
  }
});
```

## Pravidla, která drží hru pohromadě

1. **Hra se nesmí dát pokazit.** Žádná akce nesmí hráče trvale zablokovat.
2. **Každá hádanka má nápovědy** a poslední z nich je skoro odpověď. Validátor
   hádanku bez nápovědy neprojde.
3. **Žádná obratnost, žádný čas.** Jenom klikání a psaní.
4. **Nová postava dostane jeden vtip a jednu vážnou větu.** Bertík je měřítko.
5. **Před commitem obsahu spusť validátor.** Chyby v grafu jsou levné najít
   a drahé ladit v prohlížeči.

## Obrázky

Generováno přes Higgsfield, model `nano_banana_pro`, poměr 3:2 (titulka 16:9).

Společná hlavička promptu, ať série drží pohromadě:

> Children's storybook illustration, flat vector art with thick soft outlines,
> warm limited palette (deep teal shadows, dusty amber light, warm cream
> highlights), subtle paper grain, cozy-mystery mood, no text, no watermark.

Aby Tiger vypadal ve všech scénách stejně, předává se do každé generace
referenční portrét (`tiger-ref` v `js/assets.js`) jako `image_references`.
Nový obrázek = přidat řádek do `js/assets.js` a do `tools/fetch-assets.sh`.
