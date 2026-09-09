/* =========================================================
   TIGER — Cesta domů
   MISE 3: „Co si pamatuje kocour"

   Odpovídá na otázky z misí 1 a 2. Klíčové rozhodnutí:
   svět je jinak obyčejný, nemožná je jenom jedna věc — Tiger.
   Nestárne, protože zapomíná. Zapomínání je ta cena.
   ========================================================= */
(function () {
  'use strict';

  Tiger.registerMission({
    id: 'm03',
    number: 3,
    title: 'Co si pamatuje kocour',
    shortTitle: 'Mise 3',
    start: 'prah',

    items: {
      kapsle: { emo: '📜', name: 'Vilémova zpráva', desc: 'Doručeno. Se zpožděním sedmnácti let.' },
      album:  { emo: '📔', name: 'Starý album',     desc: 'Rok 1961. A on je na fotkách.' },
      obojek: { emo: '🔴', name: 'Nový obojek',     desc: 'Elena ho koupila. Nikdy ho nestihla nasadit.' }
    },

    journal: {
      'j-ema': {
        title: 'Ema',
        text: 'Holčička se jmenuje Ema. Věděla o mně všechno dřív, než mě viděla. Prababička jí o mně vyprávěla každý večer po dobu, kterou Ema považuje za celý svůj život.'
      },
      'j-mapa': {
        title: 'Mapa',
        text: 'Elena měla mapu čtvrti se čtyřiceti zakroužkovanými sklepy. Do každého chodila. V každém nechávala plechovku a fotku. Sedmnáct let. To nebyla naděje. To byla docházka.'
      },
      'j-zprava': {
        title: 'Doručeno',
        text: 'Vilém konečně doručil. Adresát existoval celou dobu — jen o tom nevěděl ani jeden z nás.'
      },
      'j-1961': {
        title: 'Rok 1961',
        text: 'V albu je holčička s culíkem a kocour s červeným obojkem. Ta holčička je Elena. Je jí osm. Píše se rok 1961. Ten kocour jsem já a vypadám úplně stejně.'
      },
      'j-cena': {
        title: 'Cena',
        text: 'Nezestárl jsem, protože jsem si to nezapamatoval. Každý, koho ztratím, si s sebou vezme i to, co jsem s ním prožil. Proto můžu začít znovu. Proto musím.'
      },
      'j-domov': {
        title: 'Domov',
        text: 'Ema řekla: já si to budu pamatovat za tebe. Nevím, jestli to jde. Ale je to poprvé, co to někdo nabídl.'
      }
    },

    epilogue: {
      title: 'Co si pamatuje kocour',
      text: [
        'Odpověď na otázku z názvu je nepříjemná a krátká: nic.',
        'Tiger si nepamatuje Elenu jako dítě, ani Kláru jako dítě, ani žádnou z těch čtyřiceti sklepních plechovek, které pro něj sedmnáct let někdo nosil do tmy.',
        { beat: true },
        'Zato si to pamatuje ulice. Pamatují si to plakáty, holub, myš v helmě z víčka od limonády a jedna stará paní, která si to pamatovala tak dlouho, jak jen mohla, a pak to předala dál.',
        'A teď si to pamatuje sedmiletá holčička, která si vzala tužku a začala si to psát.',
        { beat: true },
        { tiger: 'Já zapomenu. To vím jistě.' },
        { tiger: 'Ale poprvé za hodně dlouhou dobu na tom nezáleží tak moc, jak by mělo.' }
      ],
      next: 'MISE 4 — „Až zapomenu" · připravuje se'
    },

    scenes: [

      /* ====== 1. PRÁH ====== */
      {
        id: 'prah',
        place: 'Kovářská 9 · práh',
        title: 'Dveře',
        bg: 'm3-prah',
        text: [
          'Trvalo to čtyři minuty. Tiger je počítal, protože nic jiného dělat nešlo.',
          'Pak se v domě rozsvítilo, na schodech se ozvaly kroky a dveře se otevřely.',
          'Ve dveřích stála mladá žena v županu a tvářila se jako člověk, kterého někdo vzbudil a on tomu ještě nevěří.',
          'Vedle ní ta holčička z okna. V pyžamu. S červeným obojkem v ruce, který nepustila.',
          { beat: true },
          { klara: 'To není možné.' },
          'Tiger na ni koukal a čekal, až ho někdo někam odežene.',
          { klara: 'Ema, běž dovnitř. Prosím tě.' },
          { ema: 'Ne.' },
          { klara: 'Emo.' },
          { ema: 'Mami. To je Tiger.' },
          { beat: true },
          'Mladá žena si dřepla, aby byla níž, a dlouho se na kocoura dívala.',
          'Pak udělala něco, co Tiger nečekal. Rozbrečela se.',
          { klara: 'Já ho ztratila. Mně bylo sedm a já ho ztratila.' }
        ],
        actions: [
          { label: 'Jít dovnitř', goto: 'ema' }
        ]
      },

      /* ====== 2. EMA ====== */
      {
        id: 'ema',
        place: 'Kovářská 9 · předsíň',
        title: 'Ema',
        bg: 'm3-ema',
        journal: 'j-ema',
        text: [
          'V předsíni bylo teplo, což byla informace, kterou Tigerovo tělo přijalo dřív než jeho hlava.',
          'Holčička si klekla na podlahu, aby měla oči ve stejné výšce jako on. Obojek položila na otevřenou dlaň a nenatahovala ji. Jenom ji tam nechala ležet.',
          { ema: 'Nemusíš.' },
          { ema: 'Prababička říkala, že se nesmí sahat. Že musíš přijít sám.' },
          { beat: true },
          { tiger: 'Ty víš, kdo jsem.' },
          'Neřekl to nahlas, protože to neuměl. Ale holčička odpověděla, jako by to slyšela.',
          { ema: 'Ty jsi Tiger. Máš pruhy na ocase a na levém uchu chlup, co ti nikdy nelehne.' },
          { ema: 'Prababička mi o tobě vyprávěla každý večer. Když nemohla, tak si to psala, a pak mi to přečetla dvakrát.' },
          { beat: true },
          { klara: 'Emo, ty si myslíš, že tohle je ten samý kocour.' },
          { ema: 'Já si to nemyslím.' },
          'Tiger udělal dva kroky dopředu a čichl si k obojku na dlani, protože nic jiného ho nenapadlo.',
          'Byl nový. Voněl kůží a obchodem. Někdo ho koupil a nikdy nepoužil.',
          { klara: 'Ten koupila babička. Před dvěma roky.' },
          { klara: 'Já jí říkala, ať to nedělá.' }
        ],
        actions: [
          { label: 'Do kuchyně', goto: 'krabice' }
        ]
      },

      /* ====== 3. KRABICE (hádanka: mapa) ====== */
      {
        id: 'krabice',
        place: 'Kovářská 9 · kuchyně',
        title: 'Sedmnáct let v krabici',
        bg: 'm3-krabice',
        text: [
          'Klára postavila na stůl krabici, kterou po babičce ještě nikdo neměl sílu vyhodit.',
          'Byly v ní sešity. Hodně sešitů. Tužky ohryzané na konci. Baterka. Klubka provázku. Neotevřené konzervy, celá řada, srovnané podle data spotřeby.',
          'A fotky. Desítky malých rozmazaných fotek, na kterých je vždycky nějaká kočka a skoro nikdy ta správná. Zrzavé, mourovaté, cizí.',
          'A čtyři, odložené zvlášť a převázané gumičkou.',
          { klara: 'Tohle dělala každý týden. Sedmnáct let.' },
          { klara: 'Myslely jsme, že se z toho zbláznila.' },
          { beat: true },
          'Úplně dole byla mapa čtvrti, kreslená rukou a doplňovaná tolik let, že se na přehybech rozpadala.',
          'Byly na ní zakroužkované sklepy. Čtyřicet, možná víc. U každého datum.',
          { ema: 'Tady byla. A tady. A sem chodila v zimě, protože tam bylo teplo.' },
          { note: 'Tiger si vzpomíná na svůj sklep:\n\n• byla v něm sklenice s okurkami,\n• bylo tam piano podepřené cihlou,\n• a bylo tam malé okno u stropu.' }
        ],
        puzzle: {
          id: 'p-mapa',
          kind: 'choice',
          head: 'Který sklep to byl',
          prompt: 'Elena si ke každému sklepu psala poznámku. Který je ten Tigerův?',
          options: [
            { id: 'a', label: 'Kovářská 3', note: '„suchý, bez oken, zamčeno"', correct: false, say: 'Bez oken. Ale Tiger se díval na okno u stropu celou noc.' },
            { id: 'b', label: 'Dlouhá 14', note: '„okno u stropu, vlhko, plno beden"', correct: false, say: 'Sedí okno i bedny. Ale ani slovo o pianu — a to by si Elena nenechala ujít.' },
            { id: 'c', label: 'Kovářská 11', note: '„okno, zavařeniny, PIANO (!)"', correct: true },
            { id: 'd', label: 'Krátká 2', note: '„piano, ale bez okna, vchod z ulice"', correct: false, say: 'Piano ano, okno ne. A Tigerovo okno bylo to jediné, čím se dalo dostat ven.' }
          ],
          hints: [
            'Tiger si pamatuje tři věci. Hledej poznámku, ve které jsou všechny tři.',
            'Piano ve sklepě je natolik zvláštní, že si k němu Elena připsala vykřičník.',
            'Kovářská 11. Dva domy od toho, kde Elena bydlela.'
          ],
          success: 'Kovářská 11. Dva domy odsud.',
          delay: 1200,
          journal: 'j-mapa',
          goto: 'mapa-po'
        }
      },

      {
        id: 'mapa-po',
        place: 'Kovářská 9 · kuchyně',
        title: 'Dva domy',
        bg: 'm3-mapa',
        text: [
          'Tiger se na tu mapu díval a snažil se pochopit jednu věc.',
          { tiger: 'Já jsem se probudil dva domy od jejího bytu.' },
          { beat: true },
          'A pak mu došlo něco horšího.',
          { tiger: 'Ta bedna. Ten zámek s hádankou pro děti. Ty sardinky.' },
          { tiger: 'To tam nebylo náhodou. To tam nechala ona.' },
          { beat: true },
          { klara: 'Ona do těch sklepů nosila jídlo. Do všech. Pořád dokola.' },
          { klara: 'Říkala, že až se vrátíš, budeš mít hlad a nebudeš vědět kam.' },
          'Klára se odmlčela a otočila jeden ze sešitů, aby ho Tiger viděl.',
          { note: 'zápis z 3. 11. 2016 — Kovářská 11\nbedna zavřená, kód 415, jako vždycky\nkonzerva vyměněna\nfotka na dně, aby si vzpomněl' },
          { beat: true },
          { tiger: 'Ta plechovka byla prošlá o osm let.' },
          'Klára se podívala na datum a chvíli neřekla nic.',
          { klara: 'Posledních deset let už do sklepů nechodila. Po těch schodech by nedošla.' },
          { klara: 'Sešity psala dál. Každý týden, do posledního týdne. Jenom už nikam nešla.' },
          { beat: true },
          { tiger: '…' },
          { tiger: 'Já ten zámek otevřel za devět minut. A byl jsem na sebe hrdý.' }
        ],
        actions: [
          { label: 'Někdo klepe na okno', goto: 'vilem' }
        ]
      },

      /* ====== 4. VILÉM (hádanka: slova) ====== */
      {
        id: 'vilem',
        place: 'Kovářská 9 · okno',
        title: 'Doručovatel',
        bg: 'm3-vilem',
        text: [
          'Na parapetu stál Vilém a tvářil se jako někdo, kdo přišel v úřední záležitosti a je ochoten počkat, ale ne dlouho.',
          { vilem: 'Adresát.' },
          { tiger: 'Cože?' },
          { vilem: 'Zásilka byla podána k přepravě se specifikací adresáta: bengálský kocour, červený obojek, rajon Kovářská.' },
          { vilem: 'Sedmnáct let jsem nedokázal doručit, protože se adresát nezdržoval na adrese.' },
          { beat: true },
          { vilem: 'Teď se zdržuje.' },
          'Vilém zvedl nohu s koženým pouzdrem a natočil ji k Tigerovi tak formálně, že to bylo skoro k pláči.',
          { tiger: 'Viléme. Ty jsi tu zprávu nosil pro mě.' },
          { vilem: 'Pro adresáta.' },
          { tiger: 'To jsem já.' },
          { vilem: 'To jsem si ověřil až teď. Předtím to byla jenom domněnka a na domněnku se nedoručuje.' },
          { beat: true },
          'Ema pouzdro opatrně otevřela. Uvnitř byl proužek papíru srolovaný do válečku, tenký jako stéblo.',
          'Rozvinula ho na stole a přitiskla prstem, aby se nesroloval zpátky.',
          'Inkoust se za ty roky rozpil do modrých obláčků. Zbylo z něj asi šest slov a z nich se dalo poskládat jedno.',
          { note: 'čitelné útržky:\n\nnejsi   ·   zapomněla   ·   jsem\nna   ·   tebe   ·   ztracený' }
        ],
        puzzle: {
          id: 'p-slova',
          kind: 'sequence',
          layout: 'buttons',
          head: 'Poskládej větu',
          prompt: 'Klikej na slova v pořadí, ve kterém dávají větu.',
          emptyLabel: 'zatím nic',
          options: [
            { id: 'nejsi',     label: 'nejsi' },
            { id: 'ztraceny',  label: 'ztracený' },
            { id: 'jsem',      label: 'jsem' },
            { id: 'na',        label: 'na' },
            { id: 'tebe',      label: 'tebe' },
            { id: 'zapomnela', label: 'zapomněla' }
          ],
          solution: ['nejsi', 'ztraceny', 'jsem', 'na', 'tebe', 'zapomnela'],
          wrongStep: 'Takhle to větu nedává. Zkus to znovu od začátku.',
          hints: [
            'Věta má dvě části. První mluví o něm, druhá o ní.',
            'Začíná slovem „nejsi". Elena mu nejdřív říká, co není.',
            'Nejdřív „nejsi ztracený". Pak druhá půlka, ve které Elena přiznává něco o sobě.'
          ],
          success: 'NEJSI ZTRACENÝ. JSEM NA TEBE ZAPOMNĚLA…',
          delay: 1400,
          give: ['kapsle'],
          journal: 'j-zprava',
          goto: 'zprava'
        }
      },

      {
        id: 'zprava',
        place: 'Kovářská 9 · kuchyně',
        title: 'Zbytek věty',
        bg: 'm3-zprava',
        text: [
          'Ema tu větu přečetla nahlas a zarazila se.',
          { ema: 'Mami, tady chybí konec.' },
          'Klára vzala papírek k oknu a podržela ho proti světlu.',
          'Pod rozpitým inkoustem byla ještě jedna řádka, kterou voda nedostala celou, protože byla psaná tvrději. Někdo ji psal a tlačil na tužku.',
          { note: 'NEJSI ZTRACENÝ.\nJSEM NA TEBE ZAPOMNĚLA…\n\n…ALE JENOM NA CHVÍLI.\nA UŽ NIKDY VÍC.\n\nE. M.' },
          { beat: true },
          { klara: 'Ona ho fakt uvázala holubovi na nohu.' },
          { klara: 'Ona uvázala vzkaz holubovi na nohu a čekala, že to bude fungovat.' },
          { beat: true },
          'Vilém na parapetu se narovnal do své plné výšky, což bylo asi devatenáct centimetrů.',
          { vilem: 'Fungovalo to.' },
          'Nikdo neřekl nic. Vilém si upravil brašnu.',
          { vilem: 'S mírným zpožděním.' }
        ],
        actions: [
          { label: 'Co je pod tou krabicí?', goto: 'album' }
        ]
      },

      /* ====== 5. ALBUM (hádanka: datum) ====== */
      {
        id: 'album',
        place: 'Kovářská 9 · skříň',
        title: 'Něco staršího',
        bg: 'm3-album',
        text: [
          'Pod krabicí, úplně na dně skříně, byla ještě jedna věc. Album v tmavě zeleném plátně s mosaznou sponou.',
          'Bylo o hodně starší než všechno ostatní v tom bytě.',
          { klara: 'Tohle je babiččino. Z doby, kdy byla malá. To jsem nikdy neotvírala.' },
          'Spona byla zamčená malým kolečkovým zámkem na čtyři číslice. Vedle něj byl na plátně vyšitý — ne napsaný, vyšitý — jeden řádek.',
          { note: 'ROK, KDY JSEM HO POTKALA' },
          { beat: true },
          { tiger: 'Elena mě potkala v roce dva tisíce devět. To ví celá ulice.' },
          { ema: 'Ne. To ho potkala máma.' },
          'Ema otočila album a ukázala na zadní stranu, kde bylo úplně stejným písmem, jenom mladším, napsané datum pořízení alba.',
          { note: 'pořízeno 1961' },
          { beat: true },
          { tiger: '…' },
          { tiger: 'To nedává smysl.' },
          { ema: 'Prababičce bylo v jednašedesátým osm let.' },
          { ema: 'To je jednoduchý. Ona ho potkala, když jí bylo osm.' }
        ],
        puzzle: {
          id: 'p-datum',
          kind: 'input',
          head: 'Čtyřmístný kód',
          prompt: 'Nastav rok, kdy Elena potkala Tigera.',
          numeric: true,
          maxLength: 4,
          placeholder: '????',
          answers: ['1961'],
          submitLabel: 'Otevřít',
          wrong: [
            'Kolečka doklapala a spona držela dál.',
            'Nic. Spona se ani nehnula.'
          ],
          nearMiss: [
            { when: ['2009'], say: 'V roce 2009 ho potkala Klára. Elena o hodně dřív — a album je starší než ona sama tušila, že bude potřeba.' },
            { when: ['2026', '2025'], say: 'To je teď. Album je o dvě generace starší.' }
          ],
          hints: [
            'Na zadní straně alba je rok, kdy si ho Elena pořídila.',
            'Člověk si pořizuje album na fotky, které chce mít pohromadě — obvykle hned, jak vzniknou.',
            '1961.'
          ],
          success: 'Spona cvakla a album se otevřelo samo, protože chtělo.',
          delay: 1200,
          give: ['album'],
          goto: 'album-po'
        }
      },

      /* ====== 6. 1961 — hlavní zvrat ====== */
      {
        id: 'album-po',
        place: 'Kovářská 9 · skříň',
        title: 'Rok 1961',
        bg: 'm3-1961',
        journal: 'j-1961',
        text: [
          'Na první stránce byla jediná fotka, přilepená čtyřmi papírovými růžky.',
          'Sépiová, s vroubkovaným okrajem, přeložená a zase narovnaná.',
          'Na dvoře, kde se klepou koberce, stojí holčička. Osm let. Culík. Pletený svetr.',
          'V náručí drží kocoura. Skvrnitého. S červeným obojkem.',
          { beat: true },
          'Tiger se na tu fotku díval hodně dlouho.',
          'Ta holčička byla Elena. To poznal, protože měla přesně tu tvář, kterou má Ema, a přesně tu tvář, kterou má Klára na fotce ze sklepa.',
          'Tři holčičky, tři generace, jeden obličej, pětašedesát let.',
          'A na všech třech fotkách stejný kocour, kterému nikdy nebylo víc než teď.',
          { beat: true },
          { klara: 'To musí být jeho děda. Nebo praděda. To se u koček stává, že jsou si podobné.' },
          'Řekla to tak, jak lidé říkají věci, kterým sami nevěří, ale potřebují je vyslovit, aby se místnost nezhroutila.',
          { ema: 'Mami.' },
          { ema: 'Má stejný chlup na uchu.' },
          { beat: true },
          'V albu byly další fotky. Sedmdesátý druhý. Osmdesátý pátý. Devadesátý první.',
          'Elena na nich rostla, měnila účesy, jednou byla těhotná, pak měla brýle a šedivé vlasy.',
          'A na každé páté nebo šesté fotce byl někde v rohu, na zdi, na plotě, na okně — vždycky zdálky, vždycky rozmazaně — kocour.',
          { tiger: 'Já si nepamatuju nic z toho.' },
          { tiger: 'Vůbec nic. Ani jednu z nich.' }
        ],
        actions: [
          { label: 'Vrátit se do sklepa', goto: 'sklep' }
        ]
      },

      /* ====== 7. SKLEP ZA DNE ====== */
      {
        id: 'sklep',
        place: 'Kovářská 11 · sklep',
        title: 'Za světla',
        bg: 'm3-sklep-den',
        text: [
          'Ve dne vypadal ten sklep jako obyčejná místnost, což byla urážka všeho, co v něm Tiger v noci prožil.',
          'Ema šla první, protože se nebála, a Tiger druhý, protože se bál a nechtěl to dát najevo.',
          'Na bedně stál Bertík a tvářil se, jako by na ně čekal od začátku času.',
          { bertik: 'Kocoure.' },
          { tiger: 'Bertíku.' },
          { bertik: 'Vidím, že sis přivedl člověka. To se dělá?' },
          { tiger: 'Ona si přivedla mě.' },
          { bertik: 'To zní líp.' },
          { beat: true },
          { ema: 'Mami tady je myš!' },
          { bertik: 'Správce.' },
          { ema: 'Mami tady je správce!' },
          { beat: true },
          'Tiger se posadil na místo, kde před necelým dnem stála jeho krabice.',
          { tiger: 'Bertíku. Řekls mi, že mě sem v noci přinesli.' },
          { bertik: 'Přinesli.' },
          { tiger: 'Kdo?' },
          'Bertík si sundal víčko z hlavy. Za celý život to udělal dvakrát a pokaždé nerad.',
          { bertik: 'Chlap od zavařenin. Snesl bednu se sklenicemi, postavil ji ke zdi, zavřel poklop a šel.' },
          { bertik: 'Tys z té bedny vylezl až po něm. Spal jsi v ní od dodávky.' },
          { beat: true },
          { tiger: 'Takže mě nikdo nezavřel.' },
          { bertik: 'Zavřel. Ten chlap. Jenom o tobě nevěděl.' },
          { bertik: 'Já ti tenkrát řekl přinesli, protože to znělo líp. Byla to nejzajímavější noc za devět let a já ji chtěl mít ještě o kousek zajímavější.' },
          { beat: true },
          { tiger: 'Já si celou noc myslel, že mě sem někdo zavřel schválně a věděl, koho zavírá.' },
          { bertik: 'Já vím. Slušelo ti to.' },
          { beat: true },
          { tiger: 'Bertíku. Ptal ses mě, jak dlouho už to někdo dělá.' },
          { bertik: 'Ptal.' },
          { tiger: 'Pětašedesát let. Minimálně. A ta odpověď se ti nebude líbit, protože to nikdo nedělal mně.' },
          { tiger: 'To dělám já jim.' }
        ],
        actions: [
          { label: 'Podívat se za bednu', goto: 'skryse' }
        ]
      },

      /* ====== 8. SKRÝŠE (hádanka: vzpomínání) ====== */
      {
        id: 'skryse',
        place: 'Kovářská 11 · sklep',
        title: 'Co si pamatuje kocour',
        bg: 'm3-sklep-den',
        text: [
          'Za bednou, ve výklenku, který v noci nebylo vidět, jich stálo víc.',
          'Plechovky. Řada za řadou, seřazené podle data. Nejnovější je deset let stará. Nejstarší tak stará, že se na ní nedalo přečíst vůbec nic.',
          'A u každé složený papírek s fotkou.',
          { ema: 'Prababička říkala, že si nepamatuješ. Že to není tvoje vina.' },
          { tiger: 'Ona to věděla?' },
          { ema: 'Napsala to do sešitu. Že prý pokaždé, když tě viděla, ses na ni díval jako poprvé.' },
          { beat: true },
          'Ema si sedla na bednu a vytáhla z kapsy tužku a rozečtený sešit, protože byla dítě, které si všechno zapisuje.',
          { ema: 'Já to chci vědět jistě. Můžu se tě na něco zeptat?' },
          { ema: 'Na věci z dneška. Ne ze starých fotek.' },
          { tiger: 'Ptej se.' }
        ],
        puzzle: {
          id: 'p-vzpominky',
          kind: 'recall',
          head: 'Emin výslech',
          prompt: 'Ema se ptá na to, co Tiger zažil od chvíle, kdy se probudil ve sklepě.',
          stepOk: 'Ema si to zapsala.',
          questions: [
            {
              q: 'Jak se jmenuje ten správce sklepa v helmě z víčka od limonády?',
              options: ['Bertík', 'Vilém', 'Mikeš', 'Baron'],
              answer: 0,
              say: 'Ema se zamračila. „To je ten holub. Zkus to znovu."'
            },
            {
              q: 'Jaký kód byl na bedně se zámkem?',
              options: ['1961', '415', '2009', '671'],
              answer: 1,
              say: 'Ema zavrtěla hlavou. „Prababička si ho psala do sešitu. Čtyři, jedna, pět."'
            },
            {
              q: 'Které tři tóny byly napsané na notovém papíru u piana?',
              options: ['C · D · E', 'A · H · C', 'H · A · F', 'F · A · H'],
              answer: 2,
              say: 'Ema se ušklíbla. „Ve správným pořadí to dělá zvuk. Ve špatným ne."'
            },
            {
              q: 'Kolik různých jmen bylo na plakátech na tom sloupu?',
              options: ['Dvě', 'Tři', 'Čtyři', 'Sedm'],
              answer: 2,
              say: 'Ema počítala na prstech. „Byly čtyři. Na každém plakátu jiné jméno."'
            },
            {
              q: 'Co bylo vyryté na známce z obojku?',
              options: [
                'MIKEŠ · odměna 5000',
                'TIGER · Kovářská 9 · domov',
                'ELENA M. · Kovářská 9',
                'TIGER · 1961'
              ],
              answer: 1,
              say: 'Ema se na něj podívala přísně. „To je to nejdůležitější slovo na celý známce a tys ho vynechal."'
            }
          ],
          hints: [
            'Všechny odpovědi jsou z téhle jediné noci. Nic z toho není starší než jeden den.',
            'Tiger si pamatuje všechno od chvíle, kdy se probudil v krabici. To je ta hranice.'
          ],
          success: 'Ema zavřela sešit.',
          delay: 1300,
          goto: 'pravda'
        }
      },

      /* ====== 9. PRAVDA ====== */
      {
        id: 'pravda',
        place: 'Kovářská 11 · sklep',
        title: 'Cena',
        bg: 'm3-sklep-den',
        journal: 'j-cena',
        text: [
          { ema: 'Tak vidíš. Ty si pamatuješ všechno.' },
          { tiger: 'Pamatuju si jeden den.' },
          { beat: true },
          'A v tu chvíli to Tigerovi došlo celé najednou, tak jak se to stává — ne jako myšlenka, ale jako pád.',
          'Pamatuje si všechno od dodávky. Naprosto všechno, dokonale, do posledního detailu.',
          'A před dodávkou nic. Ani jeden den. Ani jednu tvář.',
          { beat: true },
          { tiger: 'Ono to není tak, že bych si nepamatoval.' },
          { tiger: 'Ono to začíná znovu.' },
          'Vždycky, když někoho ztratí, ztratí s ním i všechno ostatní. Vymaže se to. Vyčistí. A on může začít od začátku, protože nemá co nést.',
          'Proto nestárne. Nestárne, protože nikdy nedojde tak daleko, aby zestárnul.',
          { beat: true },
          { tiger: 'Ale to znamená ještě něco.' },
          'Klára ztratila kocoura v roce dva tisíce devět. Od té doby uplynulo sedmnáct let a Tiger si z nich nepamatuje ani jediný den.',
          { tiger: 'Takže mezi ní a tou dodávkou byl ještě někdo.' },
          { tiger: 'Někdo, koho jsem měl tak dlouho, že mi to smazalo i ji.' },
          { tiger: 'A já nevím ani, jak se jmenoval.' },
          { beat: true },
          { bertik: 'Kocoure.' },
          { bertik: 'Já vím, že se teď mám tvářit smutně. Ale řeknu ti to jinak.' },
          { bertik: 'Já mám v tomhle sklepě přesně jednu vzpomínku, na které mi záleží, a je to vtip s tím psem. Nesu si ho celý život. Není to moc, ale je to moje.' },
          { bertik: 'Ty si neneseš nic. To je hrozné. A zároveň to znamená, že tě nikdy nic nepřestalo bavit.' },
          { beat: true },
          { ema: 'Já mám nápad.' },
          'Ema zvedla sešit, ve kterém bylo pět odpovědí napsaných dětským písmem.',
          { ema: 'Já si to budu pamatovat za tebe.' },
          { ema: 'Prababička to dělala sedmnáct let sama. Já jsem mladší, takže to zvládnu dýl.' }
        ],
        actions: [
          { label: 'Něco jí dlužíš', goto: 'piano' }
        ]
      },

      /* ====== 10. PIANO (hádanka: HAF) ====== */
      {
        id: 'piano',
        place: 'Kovářská 11 · sklep',
        title: 'Důkaz',
        bg: 'm3-sklep-den',
        text: [
          { klara: 'Emo, pojď. Musíme jít.' },
          { ema: 'Ještě ne. Mami, on ti to musí dokázat.' },
          { klara: 'Co dokázat?' },
          { ema: 'Že je to on.' },
          { beat: true },
          'Klára se opřela o zeď a založila ruce jako člověk, který dá téhle hlouposti přesně jednu minutu.',
          'Tiger se podíval na piano.',
          'Na tu cihlu pod ním, na ohořelý útržek papíru, který tam pořád ležel, a na tři písmena napsaná dětskou rukou.',
          { beat: true },
          { tiger: 'Prosím, ať to funguje i za světla.' },
          { note: 'H  ·  A  ·  F' }
        ],
        puzzle: {
          id: 'p-haf',
          kind: 'sequence',
          layout: 'piano',
          head: 'Ještě jednou',
          prompt: 'Stiskni klávesy v pořadí z papíru.',
          emptyLabel: 'ticho',
          options: [
            { id: 'c', label: 'C' }, { id: 'd', label: 'D' }, { id: 'e', label: 'E' },
            { id: 'f', label: 'F' }, { id: 'g', label: 'G' }, { id: 'a', label: 'A' },
            { id: 'h', label: 'H' }
          ],
          solution: ['h', 'a', 'f'],
          wrongStep: 'Piano zakvílelo. Klára zvedla obočí. Znovu.',
          hints: [
            'Stejné tři tóny jako v noci. Nic se nezměnilo.',
            'H, potom A, potom F.'
          ],
          success: 'HAF.',
          delay: 1400,
          goto: 'volba'
        }
      },

      /* ====== 11. VOLBA ====== */
      {
        id: 'volba',
        place: 'Kovářská 11 · sklep',
        title: 'Rozhodnutí',
        bg: 'm3-sklep-den',
        text: [
          'Sklep zaštěkal.',
          'Klára sebou trhla tak, že si praštila loktem o zeď, a pak se poprvé za celé ráno zasmála — tím smíchem, který je z devadesáti procent úlevou.',
          { klara: 'To dělala babička.' },
          { klara: 'To dělala babička, když jsem byla malá. Vždycky mě tím vylekala a pak se řehtala.' },
          { beat: true },
          'Naklonila se a podívala se na kocoura, který stál na klávesách, jinak než předtím.',
          { klara: 'Ona tě to naučila.' },
          { klara: 'Ona tě naučila blbnout na piano a ty si to pamatuješ. Po sedmnácti letech.' },
          { beat: true },
          { tiger: 'Ne. Já si to nepamatuju.' },
          { tiger: 'Já jsem to našel včera v noci a přišlo mi to legrační.' },
          { tiger: 'A to je asi ta jediná dobrá zpráva na tom všem. Že mi to přijde legrační pokaždé znovu.' },
          { beat: true },
          'Ema stála na schodech se sešitem pod paží a s obojkem v ruce a čekala, protože jí to prababička říkala: že se nesmí sahat a že musí přijít sám.',
          'Tiger věděl, jak tohle skončí. Za pár let, možná za deset, možná dřív. Ema vyroste, něco se stane, on se probudí v nějaké krabici a nebude si pamatovat, že někdy existovala.',
          'Věděl to úplně přesně.'
        ],
        actions: [
          { label: 'Jít k ní', goto: 'konec-zustat', set: { zustal: true } },
          { label: 'Odejít dřív, než ji stihne zapomenout', goto: 'konec-odejit', set: { zustal: false } }
        ]
      },

      /* ====== 12a. KONEC — ZŮSTAT ====== */
      {
        id: 'konec-zustat',
        place: 'Kovářská 9 · okno',
        title: 'Zůstat',
        bg: 'm3-konec',
        give: ['obojek'],
        journal: 'j-domov',
        text: [
          'Došel k ní přes celý sklep a strčil hlavu do obojku dřív, než mu ho stihla nabídnout.',
          'Ema ho zapnula na třetí dírku, protože na druhou byl velký a na čtvrtou malý, a tohle si zapsala do sešitu.',
          { beat: true },
          'Odpoledne ležel na okenním parapetu v bytě, kde padesát let bydlela stará paní, která ho hledala sedmnáct let, a slunce mu pralo do břicha.',
          'Na krku měl dvě známky, protože tu starou si nenechal sundat. Na obou stálo totéž.',
          { note: 'TIGER\nKovářská 9\ndomov' },
          { beat: true },
          'Ema seděla na zemi u parapetu a psala.',
          { ema: 'Píšu si to všechno. Odzačátku.' },
          { ema: 'Až zapomeneš, tak ti to přečtu.' },
          { tiger: 'A když nebudu věřit?' },
          { ema: 'Tak ti to přečtu dvakrát. Prababička to tak dělala mně.' },
          { beat: true },
          'Tiger zavřel oči.',
          'Věděl, že to jednou přijde. Že se probudí někde ve tmě a tahle holčička pro něj nebude znamenat vůbec nic, a to bylo to nejhorší, co si dokázal představit.',
          'Ale zatím bylo odpoledne, bylo teplo, a někdo v místnosti si psal jeho jméno.'
        ],
        actions: [
          { label: 'Dokončit misi', end: true }
        ]
      },

      /* ====== 12b. KONEC — ODEJÍT ====== */
      {
        id: 'konec-odejit',
        place: 'Kovářská 11 · sklep',
        title: 'Odejít',
        bg: 'm3-konec',
        journal: 'j-domov',
        text: [
          'Tiger se na Emu podíval a neudělal ten krok.',
          'Udělal krok dozadu.',
          { beat: true },
          { tiger: 'Já tě zapomenu.' },
          { tiger: 'A tobě zůstane rok, kdy jsi měla kocoura, a pak celý zbytek života, kdy jsi ho ztratila. Přesně jako prababičce.' },
          { tiger: 'Tohle já udělat nemůžu. Ne znovu. Ne třetí generaci po sobě.' },
          { beat: true },
          'Ema stála na schodech a nebrečela, což bylo horší.',
          { ema: 'Ty si myslíš, že mi tím pomáháš.' },
          { tiger: '…Ano.' },
          { ema: 'Tak to nefunguje.' },
          { ema: 'Prababička tě hledala sedmnáct let a nikdy tě nenašla a stejně byla ráda, že tě zná. Řekla mi to. Řekla, že to za to stálo.' },
          { beat: true },
          'Tiger vyšel po schodech ven do ulice a Ema za ním nešla, protože jí to prababička říkala.',
          'Že se nesmí sahat. Že musí přijít sám.',
          { beat: true },
          'Na rohu se otočil.',
          'V okně ve druhém patře se svítilo a v tom okně stála holčička se sešitem a psala.',
          'Psala si to všechno. Odzačátku.',
          'A Tiger, který o tom nemohl vědět, protože byl daleko a byl kocour, šel dál po ulici, která si to pamatovala za oba.'
        ],
        actions: [
          { label: 'Dokončit misi', end: true }
        ]
      }

    ]
  });

})();
