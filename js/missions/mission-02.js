/* =========================================================
   TIGER — Cesta domů
   MISE 2: „Ulice, které si pamatují"

   Navazuje na plakát z konce mise 1. Tiger hledá „E." a zjistí,
   že plakátů je víc než jeden — a že jsou starší, než by měly být.
   ========================================================= */
(function () {
  'use strict';

  Tiger.registerMission({
    id: 'm02',
    number: 2,
    title: 'Ulice, které si pamatují',
    shortTitle: 'Mise 2',
    start: 'odchod',

    /* ---------- předměty ---------- */
    items: {
      plakat:  { emo: '📄', name: 'Utržený plakát',  desc: 'Nejstarší z nich. Jméno TIGER.' },
      znamka:  { emo: '🏷️', name: 'Mosazná známka', desc: 'Druhá. Elena ji nechala vyrýt stejně jako tu jeho.' },
      klic:    { emo: '🔑', name: 'Klíček od schránky', desc: 'Visel na hřebíčku vedle šestky. Malý, ohmataný.' }
    },

    /* ---------- deník ---------- */
    journal: {
      'j-vrstvy': {
        title: 'Vrstvy',
        text: 'Na sloupu není jeden plakát. Je jich pod sebou celá tloušťka, jako letokruhy. A na každém jsem já.'
      },
      'j-jmena': {
        title: 'Čtyři jména',
        text: 'TIGER. BARON. TYGŘÍK. MIKEŠ. Čtyři jména, čtyři telefonní čísla, sedmnáct let. Jeden kocour.'
      },
      'j-vilem': {
        title: 'Vilém',
        text: 'Poštovní holub, kterému nikdo neřekl, že válka skončila. Nosí zprávu, kterou už nemá komu doručit. Nesmál jsem se tak, jak jsem čekal.'
      },
      'j-hlas': {
        title: 'Ten hlas',
        text: 'V telefonu se ozvala žena. Řekla mé jméno. To správné. A pak píplo, protože to byl záznamník, a ten hlas byl nahraný před hodně dlouhou dobou.'
      },
      'j-elena': {
        title: 'Elena',
        text: 'Nedošel jsem pozdě o hodinu. Došel jsem pozdě o rok.'
      },
      'j-okno': {
        title: 'Okno',
        text: 'V okně stála holčička s culíkem. V ruce držela červený obojek. Vypadala přesně jako ta z fotky. Ale ta fotka je z roku 2009.'
      }
    },

    /* ---------- epilog ---------- */
    epilogue: {
      title: 'Ulice, které si pamatují',
      text: [
        'Tiger přišel k tomu domu s jednou otázkou a odcházel od něj se třemi.',
        'Elena Marešová čekala sedmnáct let a nedočkala se o jediný rok. To je ta část, kterou si Tiger ponese dál a nebude o ní mluvit.',
        { beat: true },
        'Ale v okně stála holčička. Držela červený obojek, který nikomu nepatřil, a dívala se dolů na kocoura, kterého nikdy neviděla — a poznala ho.',
        { tiger: 'Bertík se ptal špatně. Nemám se ptát, jak dlouho už to někdo dělá.' },
        { tiger: 'Mám se ptát, kolikrát už jsem tuhle ulici viděl.' }
      ],
      next: 'MISE 3 — „Co si pamatuje kocour" · připravuje se'
    },

    /* ---------- scény ---------- */
    scenes: [

      /* ====== 1. ODCHOD ====== */
      {
        id: 'odchod',
        place: 'Ulice',
        title: 'Za tou větou',
        bg: 'm2-ulice-dest',
        text: [
          'Tiger šel deštěm asi dvacet minut, než si uvědomil, že neví kam.',
          { tiger: 'Dobrý plán. Rozhodný. Směr žádný.' },
          'Věděl jenom tři věci. Že se nejmenuje Mikeš. Že někdo přeškrtal telefonní číslo tak silně, až protrhl papír. A že pod tím někdo tužkou napsal *prosím vrať se*.',
          'To poslední ho hnalo dopředu víc než hlad, a to už něco znamenalo.',
          { beat: true },
          'Ulice byla stará. Ne stará jako dům — stará jako člověk. Měla pod omítkou jiné omítky a pod plakáty jiné plakáty.'
        ],
        actions: [
          { label: 'Vrátit se k tomu sloupu', goto: 'sloup' }
        ]
      },

      /* ====== 2. SLOUP (hádanka: pořadí) ====== */
      {
        id: 'sloup',
        place: 'Ulice · sloup',
        title: 'Letokruhy',
        bg: 'm2-sloup',
        journal: 'j-vrstvy',
        text: [
          'Zblízka to bylo vidět. Ten plakát nebyl na sloupu sám. Byl navrchu.',
          'Pod ním prosvítal jiný. Pod tím další. Papír na papíru, roky na rocích, přilepené deštěm do jednoho zažloutlého balíku.',
          { tiger: 'Někdo tenhle sloup používá jako dopisní schránku pro celé město.' },
          'Tiger zaťal drápek pod odchlípnutý roh a zatáhl. Odlepily se čtyři.',
          'A na všech čtyřech byla jeho fotka.',
          { beat: true },
          { tiger: '…' },
          { tiger: 'Dobře. Tak popořádku. Doslova.' },
          { note: 'Papír stárne poznatelně:\nnejstarší je zažloutlý a křehký,\nnejnovější ještě bílý a mokrý.\nA to, čím je kdo přilepil, se za ty roky taky měnilo.' }
        ],
        puzzle: {
          id: 'p-plakaty',
          kind: 'sequence',
          layout: 'buttons',
          head: 'Seřaď plakáty',
          prompt: 'Klikej na plakáty od nejstaršího po nejnovější.',
          emptyLabel: 'zatím nic',
          options: [
            { id: 'mikes',  label: 'MIKEŠ',  note: 'bílý, promáčený, lepicí páska' },
            { id: 'tiger',  label: 'TIGER',  note: 'zažloutlý, křehký, rezavé sponky' },
            { id: 'tygrik', label: 'TYGŘÍK', note: 'našedlý, ohnutý, izolepa' },
            { id: 'baron',  label: 'BARON',  note: 'béžový, potrhaný, sponky' }
          ],
          solution: ['tiger', 'baron', 'tygrik', 'mikes'],
          wrongStep: 'Ne. Tenhle papír je mladší než ten předchozí. Znovu od začátku.',
          hints: [
            'Nejstarší papír je nejžlutší a nejkřehčí. Začni tím.',
            'Rezavé sponky jsou starší než sponky. Sponky jsou starší než izolepa. Izolepa je starší než čerstvá lepicí páska.',
            'TIGER, BARON, TYGŘÍK, MIKEŠ.'
          ],
          success: 'Čtyři plakáty. Nejstarší úplně vlevo.',
          delay: 1100,
          goto: 'sloup-po'
        }
      },

      {
        id: 'sloup-po',
        place: 'Ulice · sloup',
        title: 'Čtyři jména',
        bg: 'm2-plakaty',
        give: ['plakat'],
        text: [
          'Ležely na mokrých kostkách vedle sebe a stárly zleva doprava.',
          'Čtyři plakáty. Čtyři telefonní čísla, každé přeškrtnuté. Čtyři různá jména.',
          'A jedna jediná fotka, pořád stejná, na všech čtyřech.',
          { beat: true },
          { tiger: 'MIKEŠ. TYGŘÍK. BARON.' },
          { tiger: 'A ten nejstarší.' },
          'Nejstarší plakát byl tak vybledlý, že se jméno dalo přečíst jenom proti světlu z lampy. Tiger se musel postavit na zadní.',
          { note: 'ZTRATIL SE KOCOUR\njméno: TIGER' },
          { beat: true },
          'Tiger se posadil do louže a ani si toho nevšiml.',
          { tiger: 'Tohle jméno mi nikdo nedal. Tohle jméno mám.' },
          { tiger: 'Takže ten nejstarší papír je ten první. A všechno ostatní přišlo potom.' },
          'Nejstarší plakát si vzal. Neuměl by vysvětlit proč.'
        ],
        actions: [
          { label: 'Zjistit, jak je ten papír starý', goto: 'vilem' }
        ]
      },

      /* ====== 3. VILÉM (komedie) ====== */
      {
        id: 'vilem',
        place: 'Ulice · zábradlí',
        title: 'Úřední hodiny',
        bg: 'm2-vilem',
        journal: 'j-vilem',
        text: [
          'Nad ním si někdo odkašlal. Holub to udělat neumí, ale tenhle to zkusil.',
          'Seděl na zábradlí, promáčený a nesmírně vzpřímený. Na noze měl přivázané kožené pouzdro a přes křídlo brašnu velikosti vlašského ořechu.',
          { vilem: 'Stůjte. Přepravujete listovní zásilku?' },
          { tiger: 'Přepravuju plakát.' },
          { vilem: 'Plakát je vyvěšované sdělení. Vy jej nesete. Nesené sdělení je zásilka. Zásilku smí přepravovat pouze pověřená osoba.' },
          { tiger: 'A tou jsi ty.' },
          { vilem: 'Vilém. Doručovatel. Ve službě od jednadvacátého srpna.' },
          { tiger: 'Kterého roku?' },
          'Vilém se na dlouhou chvíli odmlčel a upravil si brašnu.',
          { vilem: 'To není podstatné pro doručení.' },
          { beat: true },
          { tiger: 'Viléme. Co máš v tom pouzdře?' },
          { vilem: 'Zprávu.' },
          { tiger: 'Pro koho?' },
          { vilem: 'Pro adresáta.' },
          { tiger: 'A kde je adresát?' },
          'Vilém se podíval někam nad střechy, kde by za jiného počasí bylo vidět nebe.',
          { vilem: 'Adresát je na adrese. Adresa se nemění. To by byl zmatek.' },
          { beat: true },
          { tiger: 'Kolik stojí informace?' },
          { vilem: 'Informace se neprodávají, ty se doručují. Ale doručovatel má nárok na občerstvení, přístřeší a jednu službu.' },
          { vilem: 'Vy jste kočka. Kočky se dostanou tam, kam holubi ne. Až budete v tom domě, otevřete schránku číslo šest.' },
          { tiger: 'Proč zrovna šestku?' },
          { vilem: 'Protože je plná. Sedmnáct let plná.' }
        ],
        actions: [
          { label: 'Podívat se na jeho hnízdo', goto: 'archiv' }
        ]
      },

      /* ====== 4. ARCHIV (hádanka: spojovačka) ====== */
      {
        id: 'archiv',
        place: 'Most · Vilémovo hnízdo',
        title: 'Archiv',
        bg: 'm2-archiv',
        text: [
          'Vilémovo hnízdo bylo pod mostním obloukem a nebylo z větviček.',
          'Bylo z papíru. Z nastříhaných proužků plakátů, útržků novin, kousků fotek — všechno propletené dohromady a po stranách srovnané do úhledných komínků, jako kartotéka, kterou vede někdo velmi pečlivý a velmi bláznivý.',
          { tiger: 'Ty si schováváš všechno, co se v týhle ulici kdy vyvěsilo.' },
          { vilem: 'Doručovatel neztrácí zásilky.' },
          { tiger: 'Viléme, tyhle zásilky nikdo neposlal tobě.' },
          { vilem: 'To se nikdy neví předem.' },
          { beat: true },
          'Ve třetím komínku byly datované útržky. Rohy plakátů s ročníkem, které někdo — nebo něco — pečlivě odtrhl a schoval.',
          'Tiger položil svoje čtyři jména vedle nich.'
        ],
        puzzle: {
          id: 'p-jmena',
          kind: 'pairs',
          head: 'Přiřaď rok ke jménu',
          prompt: 'Vyber jméno vlevo a rok vpravo. Pořadí už znáš — od nejstaršího po nejnovější.',
          left: [
            { id: 'tiger',  label: 'TIGER',  note: 'zažloutlý, rezavé sponky' },
            { id: 'baron',  label: 'BARON',  note: 'béžový, sponky' },
            { id: 'tygrik', label: 'TYGŘÍK', note: 'našedlý, izolepa' },
            { id: 'mikes',  label: 'MIKEŠ',  note: 'bílý, lepicí páska' }
          ],
          right: [
            { id: 'r2009', label: '2009' },
            { id: 'r2015', label: '2015' },
            { id: 'r2020', label: '2020' },
            { id: 'r2026', label: '2026' }
          ],
          solution: { tiger: 'r2009', baron: 'r2015', tygrik: 'r2020', mikes: 'r2026' },
          hints: [
            'Nejstarší papír patří k nejstaršímu roku. Jdi ve stejném pořadí jako u sloupu.',
            'TIGER je ten nejžlutší. A rok na té fotce ze sklepa byl 2009.',
            'TIGER 2009, BARON 2015, TYGŘÍK 2020, MIKEŠ 2026.'
          ],
          stepOk: 'Sedí.',
          wrongPair: 'Ten papír na tenhle rok nevypadá.',
          success: 'Čtyři jména, čtyři roky.',
          delay: 1200,
          journal: 'j-jmena',
          goto: 'archiv-po'
        }
      },

      {
        id: 'archiv-po',
        place: 'Most · Vilémovo hnízdo',
        title: 'Sedmnáct',
        bg: 'm2-archiv',
        text: [
          'Tiger si to spočítal třikrát, protože poprvé si myslel, že se spletl, a podruhé doufal.',
          { tiger: 'Dva tisíce devět. Dva tisíce dvacet šest.' },
          { tiger: 'To je sedmnáct let.' },
          { beat: true },
          'Kočky se dožívají patnácti. Šestnácti. Ty houževnaté dvaceti, a ty jsou v novinách.',
          'Tiger si zkusil vzpomenout na rok dva tisíce devět a nevzpomněl si na nic. Zkusil si vzpomenout na loňský rok. Taky nic.',
          'Vzpomněl si na dodávku. Na kuřecí maso. Na sklep. A na ten obojek, který má na krku odjakživa, protože si nepamatuje, kdy ho dostal.',
          { beat: true },
          { tiger: 'Viléme.' },
          { vilem: 'Ano.' },
          { tiger: 'Kolik je tobě?' },
          'Vilém dlouho nic neříkal. Pak si sundal brašnu, což předtím neudělal ani jednou, a položil ji vedle sebe.',
          { vilem: 'Já se na to neptám, kocoure. Já doručuju.' },
          { vilem: 'Kdybych se zeptal, musel bych přestat.' }
        ],
        actions: [
          { label: 'Zkusit to nejstarší telefonní číslo', goto: 'budka' }
        ]
      },

      /* ====== 5. BUDKA (hádanka: číslo) ====== */
      {
        id: 'budka',
        place: 'Roh ulice · budka',
        title: 'Devět číslic',
        bg: 'm2-budka',
        text: [
          'Telefonní budka na rohu neměla co dělat v roce dva tisíce dvacet šest, ale někdo ji zapomněl odvézt a ona zůstala svítit.',
          'Uvnitř byl nabobtnalý seznam, sluchátko na kroucené šňůře a suchý čtvereček podlahy. Tiger se na seznam postavil.',
          'Číslo na nejstarším plakátu bylo přeškrtané, ale ne tak zuřivě jako na tom novém. Tady škrtal někdo unavený, ne vzteklý.',
          'Čtyři číslice se daly přečíst. Zbytek byl pod rýhami.',
          { note: '6 _ 7 _ 5 _ 9 _ 4\n\nNa okraji plakátu je tužkou dopsaná poznámka,\ndrobným dospělým písmem:\n\n„každá zakrytá číslice je součet\ntěch dvou vedle ní — a když součet\npřeleze devítku, píše se jen poslední číslice"' },
          { tiger: 'Někdo si to číslo šifroval sám sobě. To dělá člověk, který se bojí, že ho zapomene.' }
        ],
        puzzle: {
          id: 'p-cislo',
          kind: 'input',
          head: 'Devítimístné číslo',
          prompt: 'Doplň skryté číslice a napiš celé číslo.',
          numeric: true,
          maxLength: 9,
          placeholder: '6?7?5?9?4',
          answers: ['637254934', '637 254 934'],
          submitLabel: 'Vytočit',
          wrong: [
            'V sluchátku zapraskalo a pak nic.',
            'Obsazovací tón. Nebo možná jen ticho, které se snaží.',
            'Nic. Ani vyzvánění.'
          ],
          nearMiss: [
            { when: ['617151914'], say: 'Když součet přeleze devítku, píše se jeho POSLEDNÍ číslice, ne první. Třináct není jedna, ale tři.' },
            { when: ['6', '67', '637'], say: 'Číslic je devět. Chce to celé číslo.' }
          ],
          hints: [
            'Zakryté číslice jsou obě sousední vždycky vidět — stačí je sečíst.',
            'Šest a sedm je třináct. Do čísla se píše jenom trojka.',
            'Vyjde 637254934.'
          ],
          success: 'Ve sluchátku to cvaklo a začalo vyzvánět.',
          delay: 1400,
          goto: 'hlas'
        }
      },

      {
        id: 'hlas',
        place: 'Roh ulice · budka',
        title: 'Záznamník',
        bg: 'm2-budka',
        journal: 'j-hlas',
        text: [
          'Vyzvánělo to devětkrát. Tiger už chtěl sluchátko pustit, když to zvedlo.',
          { beat: true },
          { hlas: 'Dobrý den, tady Elena Marešová, teď tu nejsem…' },
          'Tiger ztuhl.',
          { hlas: '…nechte mi prosím vzkaz. A jestli voláte kvůli tomu kocourovi —' },
          'V nahrávce se něco stalo s tím hlasem. Zlomil se, srovnal a pokračoval o něco tišeji.',
          { hlas: '— jestli voláte kvůli tomu kocourovi, prosím vás, ozvěte se v kteroukoli hodinu. Opravdu v kteroukoli. Jmenuje se Tiger.' },
          { beat: true },
          'Píp.',
          { beat: true },
          'Tiger stál v telefonní budce a poslouchal ticho, do kterého měl mluvit.',
          { tiger: '…' },
          { tiger: 'Já ani nevím, co bych řekl.' },
          'Zavěsil. Pak si všiml, že na seznamu pod jeho tlapami je adresa, kterou v tom seznamu někdo dávno zakroužkoval propiskou.',
          { note: 'Marešová E. — Kovářská 9' }
        ],
        actions: [
          { label: 'Do Kovářské', goto: 'dvur' }
        ]
      },

      /* ====== 6. DVŮR (hádanka: kruhy) ====== */
      {
        id: 'dvur',
        place: 'Kovářská 9 · dvůr',
        title: 'Kovářská devět',
        bg: 'm2-dvur',
        text: [
          'Do domu se šlo dvorem a dvůr byl zavřený mříží.',
          'Ne moderní mříží s kartou. Kovanou, těžkou, s zámkem, který někdo vyrobil ručně a byl na to nejspíš hrdý — tři soustředné kruhy, každý s vyrytými znaky.',
          { tiger: 'Kovářská ulice. Kovaný zámek. Někdo tady měl smysl pro humor.' },
          'Pod zámkem byla do kovu vyražená věta, tak ošoupaná, že se dala spíš nahmatat než přečíst.',
          { note: 'ODVENKU DOVNITŘ.\nCo je vevnitř, to se samo neotočí.' },
          { tiger: 'To není návod. To je životní rada.' },
          { tiger: 'Ale beru.' }
        ],
        puzzle: {
          id: 'p-mriz',
          kind: 'rings',
          head: 'Kovaný zámek',
          prompt: 'Otoč všechny tři kruhy na kolečko. Každý kruh ale při otočení strhne i ten hned pod sebou.',
          symbols: ['●', '▲', '■', '◆'],
          size: 4,
          start: [1, 3, 1],
          hints: [
            'Vnitřní kruh nemá co strhnout — otáčí se sám. Vnější strhává prostřední, prostřední strhává vnitřní.',
            'Proto se to řeší odvenku dovnitř: srovnej nejdřív vnější kruh, pak prostřední, nakonec vnitřní.',
            'Třikrát vnější, dvakrát prostřední, jednou vnitřní.'
          ],
          success: 'Zámek povolil s takovým zvukem, jaký dělá jenom ručně kovaná věc.',
          delay: 1100,
          goto: 'zvonky'
        }
      },

      /* ====== 7. ZVONKY (hádanka: dedukce) ====== */
      {
        id: 'zvonky',
        place: 'Kovářská 9 · vchod',
        title: 'Sedm jmenovek',
        bg: 'm2-zvonky',
        text: [
          'U dveří byl mosazný panel se jmenovkami. Sedm bytů, sedm štítků a na většině z nich jméno, které déšť a roky rozmazaly do šedi.',
          'Tiger je přečetl všechny. Marešová mezi nimi nebyla.',
          { tiger: 'Dobře. Nebude to jednoduché. Kdy taky bylo.' },
          'Zato tam byla jedna jmenovka úplně nová. Bílá, rovně nalepená, čerstvá.',
          'A ještě si všiml něčeho jiného: šestá schránka v řadě byla vyboulená a z její štěrbiny čouhal roh obálky, který tam nešel zastrčit.',
          { note: 'Co Tiger ví:\n\n• Elena Marešová tu bydlela ještě loni.\n• Vilém říkal: schránka číslo šest je plná sedmnáct let.\n• Jedna jmenovka je nová. Nová jmenovka znamená,\n  že se tam někdo nastěhoval — a někdo odstěhoval.' }
        ],
        puzzle: {
          id: 'p-zvonky',
          kind: 'choice',
          head: 'Který zvonek',
          prompt: 'U kterého bytu má Tiger zazvonit?',
          options: [
            { id: 'nova', label: 'Byt s novou jmenovkou', note: 'čerstvě nalepená, cizí jméno', correct: false, say: 'Nová jmenovka znamená někoho nového. Ten o Eleně ani o kocourovi nic neví.' },
            { id: 'sest', label: 'Byt číslo 6', note: 'plná schránka, nečitelný štítek', correct: true },
            { id: 'prazdny', label: 'Byt bez jmenovky', note: 'prázdný rámeček', correct: false, say: 'Prázdný rámeček znamená prázdný byt. Tam nikdo nečeká ani nikdo nebydlí.' },
            { id: 'vsechny', label: 'Zazvonit na všechny', note: 'však ono se něco stane', correct: false, say: 'Ve tři ráno? Tiger má hlad, ne touhu po smrti.' }
          ],
          hints: [
            'Vilém mluvil o konkrétním čísle. A mluvil o něm proto, že to bylo důležité.',
            'Plná schránka není zapomenutá schránka. Plná schránka je schránka, kterou sedmnáct let nikdo nevybral, protože ten, kdo měl, čekal na něco jiného.',
            'Šestka.'
          ],
          success: 'Tiger tlačil do zvonku celou vahou.',
          delay: 1000,
          goto: 'chodba'
        }
      },

      {
        id: 'chodba',
        place: 'Kovářská 9 · schodiště',
        title: 'Nahoru',
        bg: 'm2-chodba',
        give: ['klic'],
        text: [
          'Neozvalo se nic. Zato dveře do domu byly odemčené, protože v takhle starém domě bývají.',
          'Schodiště vonělo po prachu, mokrém kabátě a jídle, které se tu vařilo před dvaceti lety.',
          'Šestá schránka byla vyboulená a klíček od ní visel na hřebíčku vedle — tak, jak to dělají lidé, kteří už dávno nemají co ztratit.',
          'Uvnitř bylo sedmnáct let pošty. Složenky. Letáky. A úplně navrchu, nová, neotevřená, jediná ručně psaná obálka.',
          { note: 'Pro toho, kdo přinese kocoura.' },
          { beat: true },
          { tiger: 'To je adresovaný mně.' },
          { tiger: 'Nebo někomu, kdo mě nese. To je skoro totéž a je to horší.' },
          'Nahoře na patře byly jedny dveře. Před nimi rohožka. Na rohožce nic.',
          'A za dveřmi ticho, které nebylo prázdné, protože z prázdných bytů se ozývá jinak.'
        ],
        actions: [
          { label: 'Škrábat na dveře', goto: 'sousedka' }
        ]
      },

      /* ====== 8. SOUSEDKA — těžké místo ====== */
      {
        id: 'sousedka',
        place: 'Kovářská 9 · schodiště',
        title: 'O rok',
        bg: 'm2-chodba',
        journal: 'j-elena',
        text: [
          'Otevřely se dveře. Ne ty. Ty naproti.',
          'Ve škvíře stála stará paní v županu a dívala se dolů na promáčeného kocoura, který jí škrábal na sousedovy dveře ve čtyři ráno.',
          'Dlouho neřekla nic. Pak si přitáhla župan.',
          { sousedka: 'Ježišmarja.' },
          { sousedka: 'Ty jsi ten kocour.' },
          { beat: true },
          'Tiger na ni koukal a poprvé za celou noc nevěděl, co má udělat s obličejem.',
          { sousedka: 'Paní Marešová tady bydlela padesát let. Sedmnáct z toho tě hledala. Vyvěšovala ty papíry. Volala do útulků. Chodila po nocích s baterkou a volala do sklepů.' },
          { sousedka: 'Říkali jsme jí, ať toho nechá. Že už je to dávno. Že ta kočka je dávno —' },
          'Nedopověděla to.',
          { beat: true },
          { sousedka: 'Loni v listopadu umřela. Ve spánku, hezky. Jestli je na tom něco hezkýho.' },
          { beat: true },
          { tiger: '…' },
          'Tiger si sedl na rohožku před cizí dveře a nehnul se.',
          'Nepřišel pozdě o hodinu. Nepřišel pozdě o den. Přišel pozdě o rok.',
          { beat: true },
          { sousedka: 'No tak. Nedívej se tak.' },
          { sousedka: 'Poslyš — ona ti nechala vzkaz. Jako fakt. Napsala ho a dala do schránky a řekla, že ho někdo jednou vyzvedne.' },
          { sousedka: 'Já jsem si tenkrát ťukala na čelo.' },
          'Stará paní se odmlčela a podívala se na obálku v Tigerových zubech.',
          { sousedka: 'Tak teď si ťukám jinam.' }
        ],
        actions: [
          { label: 'Otevřít obálku', goto: 'dopis' }
        ]
      },

      {
        id: 'dopis',
        place: 'Kovářská 9 · schodiště',
        title: 'Vzkaz',
        bg: 'm2-chodba',
        give: ['znamka'],
        text: [
          'Uvnitř byl jeden list a jedna mosazná známka na provázku. Taková, jaká se dává na obojek.',
          'Tiger tu známku znal. Měl úplně stejnou na krku.',
          { beat: true },
          { note: 'Tigere,\n\njestli tohle někdo čte, tak jsem se nedočkala. Nevadí.\nČekat je taky způsob, jak s někým být.\n\nNechala jsem ti tady druhou známku, protože ta tvoje\nse za ty roky ošoupala a už na ní nejde přečíst, co jsem\ntam dala vyrýt. Tak jsem to nechala vyrýt znovu, stejně.\nAby to na světě zůstalo aspoň dvakrát.\n\nA víš co, Tigere? Já vím, že to není možné.\nAle ty jsi za těch sedmnáct let vůbec nezestárnul.\nViděla jsem tě čtyřikrát. Pokaždé zdálky.\nPokaždé stejného.\n\nNeboj se toho. Já se toho nakonec taky přestala bát.\n\nElena' },
          { beat: true },
          'Tiger otočil známku na druhou stranu.',
          { note: 'TIGER\nKovářská 9\ndomov' },
          { beat: true },
          { tiger: '…' },
          { tiger: 'Já se nemám kam vrátit. Já se mám kam vracet.' },
          { tiger: 'To je jiné sloveso a je to celý rozdíl.' }
        ],
        actions: [
          { label: 'Jít ven', goto: 'okno' }
        ]
      },

      /* ====== 9. OKNO — zvrat ====== */
      {
        id: 'okno',
        place: 'Kovářská 9 · ulice',
        title: 'Svítá',
        bg: 'm2-okno',
        journal: 'j-okno',
        text: [
          'Venku přestalo pršet, jak to déšť dělá — ne najednou, ale tak, že si toho člověk všimne až o kus dál.',
          'Nebe nad střechami zesvětlalo do té barvy, kterou má jenom hodinu denně a nikdo pro ni nemá jméno.',
          'Tiger došel doprostřed ulice a otočil se k domu, aby si ho zapamatoval.',
          { beat: true },
          'V okně ve druhém patře se svítilo.',
          'A v tom okně stála holčička. Sedm let, možná osm. Culík. Jednu ruku měla přitisknutou na sklo.',
          'V druhé držela červený kočičí obojek.',
          { beat: true },
          { tiger: '…' },
          'Tiger tu holčičku znal. Viděl ji před pár hodinami ve sklepě, na fotce, která je z léta dva tisíce devět a je stará sedmnáct let.',
          'Ta holčička na fotce se od téhle v okně nelišila ani o den.',
          { beat: true },
          'Holčička se na Tigera podívala. Neusmála se. Nezamávala.',
          'Jenom naklonila hlavu na stranu, jako když někdo poznává někoho, koho čekal.',
          'A ústy, beze zvuku, přes sklo, přes celou ulici, řekla jedno slovo.',
          { beat: true },
          { note: 'Tigere.' }
        ],
        actions: [
          { label: 'Jít blíž', end: true }
        ]
      }

    ]
  });

})();
