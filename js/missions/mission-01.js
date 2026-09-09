/* =========================================================
   TIGER — Cesta domů
   MISE 1: „Kdo zhasl slunce"

   Celá mise je data. Scény, hádanky, deník i předměty.
   Šablona pro další díly: zkopíruj soubor, změň id/number/start.
   ========================================================= */
(function () {
  'use strict';

  Tiger.registerMission({
    id: 'm01',
    number: 1,
    title: 'Kdo zhasl slunce',
    shortTitle: 'Mise 1',
    start: 'probuzeni',

    /* ---------- předměty ---------- */
    items: {
      sardinky: { emo: '🐟', name: 'Plechovka sardinek', desc: 'Prošlé. Ale ne pro každého.' },
      fotka:    { emo: '📷', name: 'Stará fotka',        desc: 'Holčička s culíkem a kotě s červeným obojkem.' },
      klika:    { emo: '🔧', name: 'Železná klika',      desc: 'Vypadla z piana. Přesně pasuje na okenní západku.' }
    },

    /* ---------- deník vzpomínek ---------- */
    journal: {
      'j-tma': {
        title: 'První minuta',
        text: 'Probudil jsem se ve tmě, ve které nebyla ani jedna věc, kterou znám. Prý se to stává. Prý.'
      },
      'j-pojistky': {
        title: 'Světlo',
        text: 'Naučil jsem se, že jedna páčka nikdy není jedna páčka. Vždycky je to páčka a oba její sousedi. Docela přesný popis většiny věcí.'
      },
      'j-fotka': {
        title: 'Ta fotka',
        text: 'Na fotce jsem já. Ale ta fotka je starší než já. Zkusil jsem si namluvit, že jsou všechny bengálské kočky stejné. Nešlo to.'
      },
      'j-bertik': {
        title: 'Bertík',
        text: 'Potkal jsem myš v helmě z víčka od limonády. Nabídla mi obchod. Přijal jsem ho. Kdyby se to někdo ptal — nikdy se to nestalo.'
      },
      'j-piano': {
        title: 'Vtip, který čekal',
        text: 'Někdo naladil piano tak, aby tři tóny zněly jako pes. A pak roky čekal, až to někdo najde. Tomu člověku bych chtěl podat tlapu.'
      },
      'j-mikes': {
        title: 'MIKEŠ',
        text: 'Na plakátu je moje fotka a cizí jméno. Přeškrtnuté číslo. A jedna věta tužkou, u které jsem si musel sednout.'
      }
    },

    /* ---------- epilog ---------- */
    epilogue: {
      title: 'Kdo zhasl slunce',
      text: [
        'Tiger vylezl ze sklepa jako kočka, která jen zabloudila.',
        'Stál na ulici jako kočka, která zjistila, že zabloudila mnohem dřív, než si myslela.',
        { beat: true },
        'Někde v tomhle městě je dům s rozsvíceným oknem. Někde v tomhle městě je člověk, který přestal doufat. A někde mezi tím je jméno, které Tigerovi nepatří — a přesto ho někdo psal s láskou.',
        { tiger: 'Jednu věc vím jistě. Kdo mě sem zavřel, věděl, koho zavírá.' }
      ],
      next: 'MISE 2 — „Ulice, které si pamatují" · připravuje se'
    },

    /* ---------- scény ---------- */
    scenes: [

      /* ====== 1. PROBUZENÍ ====== */
      {
        id: 'probuzeni',
        place: 'Sklep',
        title: 'Někde pod zemí',
        bg: 'sklep-tma',
        journal: 'j-tma',
        text: [
          'Tiger si pamatoval tři věci. Vůni pečeného kuřete. Otevřená dvířka dodávky. A pocit, že je to *vynikající* nápad.',
          'Ze všech tří si teď byl jistý jenom tou vůní.',
          { beat: true },
          { tiger: 'Klid. Kočky vždycky dopadnou na nohy.' },
          { tiger: 'Tohle ale nebyl pád. Tohle byl přesun.' },
          'Byla tma. Ta hustá, sklepní, která se dá cítit ve vousech. Někde nahoře kapala voda a odpočítávala čas, který nikdo neměřil.',
          'A vysoko u stropu, jako vzkaz od někoho, kdo se s ním nechtěl bavit, svítilo jedno malé okno.'
        ],
        actions: [
          { label: 'Vylézt z krabice a rozhlédnout se', goto: 'pojistky' }
        ]
      },

      /* ====== 2. POJISTKY (hádanka: světla) ====== */
      {
        id: 'pojistky',
        place: 'Sklep · pojistková skříň',
        title: 'Pět páček',
        bg: 'pojistky',
        text: [
          'V rohu, ve výšce kočičího ocasu, visí stará pojistková skříň. Dvířka jsou vyvrácená. Uvnitř pět páček, z toho dvě nahoře.',
          'Na skříni je připíchnutý zažloutlý papírek:',
          { note: 'NEDOTÝKAT SE!\n(Myslím to vážně.)\n(Fakt.)' },
          { tiger: 'Tenhle vzkaz psal někdo, kdo nikdy nepotkal kočku.' },
          'Tiger položil tlapu na první páčku. Cvaklo to. A cvaklo to i o kus dál — jako by se páčky navzájem držely za ruce.'
        ],
        puzzle: {
          id: 'p-pojistky',
          kind: 'lights',
          head: 'Rozsvítit celý sklep',
          prompt: 'Přepnutím páčky se přepne i každá páčka hned vedle ní. Rozsviť všech pět.',
          initial: [0, 1, 0, 1, 0],
          labels: ['I', 'II', 'III', 'IV', 'V'],
          success: 'Sklep zaplavilo teplé žluté světlo.',
          hints: [
            'Nikdy nehýbeš jen jednou páčkou. Vždycky třemi — tou svojí a oběma sousedy.',
            'Krajní páčka má jen jednoho souseda. To je výhoda, ne nevýhoda.',
            'Tři přepnutí stačí. Zkus první, prostřední a poslední.'
          ],
          journal: 'j-pojistky',
          goto: 'sklep'
        }
      },

      /* ====== 3. SKLEP (rozcestník) ====== */
      {
        id: 'sklep',
        place: 'Sklep',
        title: 'Sklep při světle',
        bg: 'sklep-svetlo',
        text: [
          'Sklep vypadal při světle mnohem líp. A mnohem hůř.',
          'Regály plné zavařenin. Sto let starý prach. Bedny všech velikostí. A u zdi — piano. Staré, rozladěné, o jednu nohu kratší, podepřené cihlou.',
          { tiger: 'Piano ve sklepě. Buď tady někdo hudbu hodně miloval, nebo ji hodně nesnášel.' },
          'A pak tu byla ta bedna. Jediná, která měla zámek.'
        ],
        actions: [
          { label: 'Prohlédnout bednu se zámkem', goto: 'bedna', if: function (g) { return !g.flag('bednaOtevrena'); } },
          { label: 'Promluvit si s tou myší v rohu', goto: 'bertik', if: function (g) { return g.has('sardinky') && !g.flag('znaKlavir'); } },
          { label: 'Prohlédnout piano', goto: 'piano', if: function (g) { return g.flag('znaKlavir') && !g.has('klika'); } },
          { label: 'Postavit z beden schody k oknu', goto: 'bedny', if: function (g) { return g.has('klika'); } },
          { label: 'Podívat se na okno u stropu', goto: 'okno' }
        ]
      },

      /* ====== 4. BEDNA (hádanka: číselný kód) ====== */
      {
        id: 'bedna',
        place: 'Sklep · zamčená bedna',
        title: 'Zámek pro děti',
        bg: 'bedna',
        text: [
          'Dřevěná bedna, na ní mosazný visací zámek se třemi kolečky. Vedle zámku visí na provázku papírová visačka, popsaná vybledlým perem.',
          { note: 'PRVNÍ číslo: kolik má kočka tlapek.\nDRUHÉ číslo: o tři méně než první.\nTŘETÍ číslo: obě předchozí sečti.' },
          { tiger: 'Někdo zamkl bednu hádankou pro děti.' },
          { tiger: 'Což znamená, že ji zamykal pro dítě. A to je na tom to divné.' }
        ],
        puzzle: {
          id: 'p-bedna',
          kind: 'input',
          head: 'Trojmístný kód',
          prompt: 'Nastav tři kolečka zámku.',
          numeric: true,
          maxLength: 3,
          placeholder: '???',
          answers: ['415'],
          submitLabel: 'Otočit kolečky',
          wrong: [
            'Kolečka se otočila a zase zapadla. Nic.',
            'Zámek ani nemrkl.',
            'Cvak. Cvak. A pak vůbec nic.'
          ],
          nearMiss: [
            { when: ['441', '440'], say: 'Blízko. Ale to druhé číslo má být o tři MENŠÍ.' },
            { when: ['4', '41'], say: 'Kolečka jsou tři. Chce to celé číslo.' }
          ],
          hints: [
            'Tiger si stoupl a spočítal si vlastní tlapky. Vyšly mu čtyři.',
            'Čtyři mínus tři je jedna. Zbývá poslední kolečko.',
            'Čtyři, jedna a jejich součet. Nic víc v tom není.'
          ],
          success: 'Zámek povolil s tichým, spokojeným cvaknutím.',
          set: { bednaOtevrena: true },
          goto: 'bedna-otevrena'
        }
      },

      /* ====== 5. OBSAH BEDNY ====== */
      {
        id: 'bedna-otevrena',
        place: 'Sklep · otevřená bedna',
        title: 'Dvě věci',
        bg: 'bedna',
        give: ['sardinky'],
        text: [
          'V bedně byly jenom dvě věci. To Tigera zarazilo víc než ten zámek — kdo zamyká bednu kvůli dvěma věcem?',
          'První byla plechovka sardinek. Prošlá o osm let.',
          { tiger: 'Osm let. To je v kočičích letech… pořád sardinky.' },
          'A druhá věc ležela na dně, obrácená lícem dolů, jako by se nechtěla dívat.'
        ],
        actions: [
          { label: 'Otočit tu druhou věc', goto: 'fotka' }
        ]
      },

      /* ====== 6. FOTKA (těžké místo) ====== */
      {
        id: 'fotka',
        place: 'Sklep · otevřená bedna',
        title: 'Léto, které si nepamatuje',
        bg: 'fotka',
        give: ['fotka'],
        journal: 'j-fotka',
        text: [
          'Byla to fotka. Malá, ohmataná, na jednom rohu chyběl kus — tak, jak vypadají věci, které se dlouho nosí v kapse.',
          'Je na ní holčička s culíkem. Směje se tím způsobem, jakým se smějí jenom děti, které ještě nevědí, že se něco může ztratit.',
          'Na rameni jí sedí kotě. Bengálské. Drží se jí drápkem za tričko, aby nespadlo.',
          'A má na krku červený obojek.',
          { beat: true },
          { tiger: 'To je můj obojek.' },
          'Tiger to řekl nahlas, i když tam nikdo nebyl. Někdy je potřeba slyšet něco od někoho jiného, i kdyby tím někým jiným byl on sám.',
          'Na zadní straně fotky bylo dětským písmem napsáno datum.',
          { note: 'léto 2009 — já a Tiger' },
          { beat: true },
          { tiger: 'Já nejsem tak starý.' },
          { tiger: '…Já nejsem *takhle* starý.' },
          'Někde nad stropem zavrzalo dřevo. Možná krok. Možná jenom dům, který se ve spánku obrátil na druhý bok.'
        ],
        actions: [
          { label: 'Schovat fotku a vrátit se doprostřed sklepa', goto: 'sklep' }
        ]
      },

      /* ====== 7. BERTÍK (hádanka: slovní) ====== */
      {
        id: 'bertik',
        place: 'Sklep · za regálem',
        title: 'Vyjednávání',
        bg: 'bertik',
        journal: 'j-bertik',
        text: [
          'Za regálem se něco pohnulo. Něco malého, šedého a nesmírně sebevědomého.',
          'Byla to myš. Na hlavě měla víčko od limonády, přivázané provázkem. Postavila se na zadní a založila si packy v bok.',
          { bertik: 'Stůj! Tohle je můj sklep.' },
          { tiger: 'Ty jsi myš.' },
          { bertik: 'A ty jsi kočka. Vidím, že se tu představujeme povoláním.' },
          { tiger: '…' },
          { bertik: 'Bertík. Správce sklepa, hlavní inženýr a jediný obyvatel. Ty jsi ten, koho sem v noci přinesli v krabici.' },
          { beat: true },
          { tiger: 'Kdo mě sem přinesl?' },
          { bertik: 'Vidím, že máš sardinky. Nejdřív obchod, potom historie. Odpověz mi na hádanku a já ti řeknu, kde je v tomhle sklepě schovaná jediná užitečná věc.' },
          { note: 'Má klíč — a přece neotevře jediné dveře.\nMá nohy — a přece nikam nedojde.\nMá strunu — a není to luk.\nA když ho pohladíš po zubech, začne zpívat.' }
        ],
        puzzle: {
          id: 'p-bertik',
          kind: 'input',
          head: 'Bertíkova hádanka',
          prompt: 'Co to je?',
          placeholder: 'Napiš odpověď…',
          answers: ['klavir', 'piano', 'pianino', 'klavír'],
          submitLabel: 'Odpovědět',
          wrong: [
            'Bertík si posunul helmu do čela. „Ne."',
            '„Ne. A ani zdaleka."',
            '„Zajímavé. Špatné, ale zajímavé."'
          ],
          nearMiss: [
            { when: ['kytara', 'housle'], say: '„Teplo! Ale ta věc má zuby a nohy. Housle nemají nohy, ne?"' },
            { when: ['klic', 'klíč'], say: '„Klíč to má. Klíč to není. To je v tom celý ten vtip."' },
            { when: ['dvere'], say: '„Dveře, které zpívají? Tak takový sklep to zase není."' }
          ],
          hints: [
            'Bertík ukázal packou přes celý sklep. „Rozhlédni se. Já hádanky nevymýšlím pro věci, které tu nejsou."',
            '„Klíč — houslový. Nohy — dřevěné. Struny — uvnitř. A zuby jsou černé a bílé."',
            '„Je to ta velká černá věc u zdi, na kterou zíráš od chvíle, co se rozsvítilo."'
          ],
          success: 'Bertík slavnostně kývl a přijal sardinky jako by to byla medaile.',
          set: { znaKlavir: true },
          goto: 'bertik-po'
        }
      },

      {
        id: 'bertik-po',
        place: 'Sklep · za regálem',
        title: 'Obchod uzavřen',
        bg: 'bertik',
        text: [
          { bertik: 'Klavír. Samozřejmě. Ten tu stojí déle než já a já tu stojím déle, než je zdrávo.' },
          { bertik: 'Uvnitř je něco, co potřebuješ. Ale piano to nevydá jen tak. Chce, abys mu zahrál.' },
          { tiger: 'Já neumím hrát.' },
          { bertik: 'To nikdo. Proto to bude znít správně.' },
          { beat: true },
          { tiger: 'Bertíku. Kdo mě sem přinesl?' },
          'Bertík se poprvé nezasmál. Sundal si víčko z hlavy, jako se sundává čepice, když se mluví o vážných věcech.',
          { bertik: 'Někdo, kdo tuhle bednu zamykal. A někdo, kdo znal ten kód, protože si ho vymyslela sama. Před hodně dlouhou dobou.' },
          { bertik: 'Já jenom sklep spravuju, kocoure. Ne vysvětluju.' }
        ],
        actions: [
          { label: 'Jít k pianu', goto: 'piano' }
        ]
      },

      /* ====== 8. PIANO (hádanka: sekvence) ====== */
      {
        id: 'piano',
        place: 'Sklep · piano',
        title: 'Tři tóny',
        bg: 'piano',
        text: [
          'Piano bylo rozladěné tak dokonale, že to muselo být schválně.',
          'Na pultíku ležel ohořelý útržek notového papíru. Nebyly na něm noty. Byla na něm tři písmena, napsaná velkou dětskou rukou:',
          { note: 'H  ·  A  ·  F' },
          { tiger: 'Tři tóny. To zvládne i kočka.' },
          { tiger: '…Doufám.' }
        ],
        puzzle: {
          id: 'p-piano',
          kind: 'sequence',
          layout: 'piano',
          head: 'Zahraj to',
          prompt: 'Stiskni klávesy v pořadí z papíru.',
          emptyLabel: 'ticho',
          options: [
            { id: 'c', label: 'C' }, { id: 'd', label: 'D' }, { id: 'e', label: 'E' },
            { id: 'f', label: 'F' }, { id: 'g', label: 'G' }, { id: 'a', label: 'A' },
            { id: 'h', label: 'H' }
          ],
          solution: ['h', 'a', 'f'],
          wrongStep: 'Piano zakvílelo něco, co nebylo v žádné hádance. Zkus to znovu od začátku.',
          hints: [
            'Na papíru jsou přesně ta písmena, která jsou napsaná na klávesách.',
            'Zleva doprava, tak jak to stojí: H, potom A, potom F.'
          ],
          success: 'HAF.',
          delay: 1200,
          journal: 'j-piano',
          goto: 'piano-vysledek'
        }
      },

      {
        id: 'piano-vysledek',
        place: 'Sklep · piano',
        title: 'HAF',
        bg: 'piano',
        give: ['klika'],
        text: [
          'Ty tři tóny nezněly jako hudba.',
          'Zněly jako pes.',
          { beat: true },
          'Tiger vyletěl do vzduchu tak vysoko, že se sám sobě podivil, minul cihlu, přistál na víku piana a víko se s dunivým *bum* otevřelo.',
          { tiger: '…' },
          { tiger: 'To si někdo naladil schválně.' },
          { bertik: 'Roky to ladila. Roky!' },
          { bertik: 'A pak roky čekala, jestli to někdo najde. Umřela dřív, než se to stalo. Tobě to trvalo devět minut, kocoure. Devět. Minut.' },
          { tiger: 'Ona?' },
          { bertik: 'Sklep spravuju. Nevysvětluju.' },
          { beat: true },
          'Ve víku piana, mezi strunami a prachem, ležela těžká železná klika. Ta, co pasuje na okenní západky.',
          'Tiger si ji vzal do zubů. A pak, protože ho to napadlo, ještě jednou opatrně šlápl na H, A, F.',
          'Sklep zaštěkal.',
          { tiger: 'Dobře. Tenhle vtip si beru s sebou.' }
        ],
        actions: [
          { label: 'K oknu', goto: 'okno' }
        ]
      },

      /* ====== 9. OKNO (informace / brána dál) ====== */
      {
        id: 'okno',
        place: 'Sklep · okno',
        title: 'Vysoko',
        bg: 'sklep-svetlo',
        text: [
          'Okno bylo malé, špinavé a vysoko. Přesně tak vysoko, aby se dalo dívat, ale nedalo dosáhnout.',
          'Za sklem byla noc a v ní déšť.'
        ],
        actions: [
          {
            label: 'Zkusit skočit',
            goto: 'okno-skok',
            if: function (g) { return !g.has('klika'); }
          },
          {
            label: 'Nasadit kliku na západku',
            goto: 'bedny',
            if: function (g) { return g.has('klika'); }
          },
          { label: 'Vrátit se doprostřed sklepa', goto: 'sklep' }
        ]
      },

      {
        id: 'okno-skok',
        place: 'Sklep · okno',
        title: 'Fyzika',
        bg: 'sklep-svetlo',
        text: [
          'Tiger se rozeběhl, odrazil a v nejvyšším bodě letu si uvědomil dvě věci.',
          'Za prvé: okno je pořád o dva Tigery výš.',
          'Za druhé: západka je zavřená a otevřít se dá jenom klikou.',
          { tiger: 'Skvěle. Takže potřebuju kliku a schody. To je celý plán a zatím mám jenom fotku a hlad.' }
        ],
        actions: [
          { label: 'Vrátit se doprostřed sklepa', goto: 'sklep' }
        ]
      },

      /* ====== 10. BEDNY (hádanka: pořadí) ====== */
      {
        id: 'bedny',
        place: 'Sklep · pod oknem',
        title: 'Schody, které vydrží',
        bg: 'bedny-okno',
        text: [
          'Klika zapadla do západky a okno povolilo. Zbývalo se k němu dostat.',
          'Pod oknem stálo pět beden. Tiger si je prohlédl jednu po druhé — a u jedné z nich se zarazil. Voněla po houbách a při dotyku se prohnula jako polštář.',
          { bertik: 'Na tu nešlapej. Ta bedna už dosloužila. Jako většina věcí tady.' },
          { note: 'Bedna unese jenom takovou, která je menší než ona.\nStav odspoda nahoru.\nA na prohnilou nešlapej.' }
        ],
        puzzle: {
          id: 'p-bedny',
          kind: 'sequence',
          layout: 'stack',
          head: 'Postav schody',
          prompt: 'Klikej na bedny v pořadí, ve kterém je chceš stavět — odspoda nahoru.',
          emptyLabel: 'zatím nic nestojí',
          options: [
            { id: 'stredni',  label: 'Střední bedna',  note: 'obyčejná, poctivá' },
            { id: 'prohnila', label: 'Prohnilá bedna', note: 'voní po houbách', trap: 'Bedna se rozpadla dřív, než na ni Tiger stihl došlápnout. Celá hromada šla k zemi.' },
            { id: 'obri',     label: 'Obří bedna',     note: 'těžká jako lednička' },
            { id: 'mala',     label: 'Malá bedna',     note: 'akorát na jednu kočku' },
            { id: 'velka',    label: 'Velká bedna',    note: 'menší než obří, větší než střední' }
          ],
          solution: ['obri', 'velka', 'stredni', 'mala'],
          wrongStep: 'Vršek se rozjel a všechno se sesypalo. Nahoru patří vždycky ta menší.',
          hints: [
            'Odspoda nahoru znamená: nejdřív ta největší.',
            'Prohnilá bedna se do stavby nehodí vůbec. Ani nahoru, ani dolů.',
            'Obří, velká, střední, malá. Čtyři bedny, jedna zůstane ležet.'
          ],
          success: 'Schody stály. Vratce, ale stály.',
          delay: 1100,
          goto: 'unik'
        }
      },

      /* ====== 11. ÚNIK ====== */
      {
        id: 'unik',
        place: 'Okno',
        title: 'Ven',
        bg: 'bedny-okno',
        text: [
          'Tiger vylezl nahoru. Bedny pod ním vrzaly jako staří lidé, kteří nesouhlasí, ale pomůžou.',
          'V okně se zastavil. Zezadu ho hřál sklep — prach, zavařeniny, rozladěné piano a jedna myš v helmě. Zepředu ho studil déšť.',
          { beat: true },
          { tiger: 'Bertíku. Pojď se mnou.' },
          'Bertík se dlouho díval nahoru. Pak si nasadil víčko zpátky na hlavu.',
          { bertik: 'Někdo tu musí zůstat a hlídat vtip s tím psem. Kdyby sem přinesli další krabici.' },
          { bertik: 'Kocoure — až najdeš toho, kdo tě sem dal… neptej se ho *proč*. Zeptej se ho, *jak dlouho už to dělá*.' },
          { beat: true },
          'A pak byl Tiger venku.'
        ],
        actions: [
          { label: 'Vyjít do deště', goto: 'ulice' }
        ]
      },

      /* ====== 12. ULICE — zvrat ====== */
      {
        id: 'ulice',
        place: 'Ulice',
        title: 'Plakát',
        bg: 'ulice',
        journal: 'j-mikes',
        text: [
          'Déšť byl studený tím způsobem, který se nedá popsat — jenom zapamatovat.',
          'Ulice byla prázdná, lesklá a cizí. Tiger se rozhlédl po něčem, co by poznal. Nepoznal nic.',
          'Až na dřevěný sloup, na kterém visel promáčený papír.',
          { beat: true },
          'Fotku na tom papíru poznal okamžitě. Protože to byl on.',
          { note: 'ZTRATIL SE KOCOUR\nbengálská kočka, červený obojek\njméno: MIKEŠ\nodměna 5 000 Kč' },
          { beat: true },
          { tiger: 'Já se nejmenuju Mikeš.' },
          'Telefonní číslo dole bylo přeškrtnuté. Někdo ho škrtal tak silně, že prorazil papír až skrz.',
          'A pod ním, tužkou, dětskou rukou, byla připsaná jedna jediná věta.',
          { note: 'prosím vrať se.\n— E.' },
          { beat: true },
          { tiger: '…' },
          'Tiger seděl v dešti a četl tu větu tak dlouho, až se rozpila.',
          { tiger: 'Dobře.' },
          { tiger: 'Tak jdeme.' }
        ],
        actions: [
          { label: 'Vydat se do města', end: true }
        ]
      }

    ]
  });

})();
