/* =========================================================
   TIGER — Cesta domů
   MISE 4: „Až zapomenu"

   Rok 2038. Slib z konce mise 3 se testuje: funguje vůbec
   pamatovat si něco za někoho? Odpověď je ne — a přesto ano.
   Zároveň se zaplňuje díra mezi rokem 2009 a dodávkou.

   Mise čte rozhodnutí z konce mise 3 přes Game.recall('zustal').
   Když ho hráč nemá (skočil rovnou sem přes výběr kapitol),
   běží třetí, neutrální varianta.
   ========================================================= */
(function () {
  'use strict';

  Tiger.registerMission({
    id: 'm04',
    number: 4,
    title: 'Až zapomenu',
    shortTitle: 'Mise 4',
    start: 'tma',

    /* ---------- předměty ---------- */
    items: {
      karta: { emo: '🗒️', name: 'Ručně psaná kartička', desc: 'Patnáct let stejná věta. Poslední je jiná.' },
      parte: { emo: '🕯️', name: 'Smuteční oznámení',    desc: 'Vojtěch Řehák, 1941–2026. Krátká 2.' },
      sesit: { emo: '📓', name: 'Sešit číslo jedna',     desc: 'Emin. Psaný v sedmi letech, o kocourovi, kterého jednou viděla oknem.' }
    },

    /* ---------- deník ---------- */
    journal: {
      'j-znovu': {
        title: 'Znovu',
        text: 'Probudil jsem se a v místnosti někdo četl nahlas. Znal jsem každé slovo, které říkala, a neznal jsem ji. Tohle prý není poprvé. Tohle prý je pravidlo.'
      },
      'j-sesity': {
        title: 'Čtyřicet jedna sešitů',
        text: 'Umím je odříkat. Jména, roky, kód od bedny, tři tóny. Je to jako umět zpaměti cizí životopis. Přesně tak přesné a přesně tak studené.'
      },
      'j-bruno': {
        title: 'Bruno',
        text: 'Vilémovo hnízdo stojí dál a třídí ho holub, který nikdy nezjistil, k čemu to je. Dělá to bezchybně. Řekl mi, že se to nesmí ztratit, protože mu to někdo řekl.'
      },
      'j-rehak': {
        title: 'Vojtěch Řehák',
        text: 'Patnáct let jsem chodil domů k člověku, o kterém nikdo nevěděl, že mě má. Nikdy nevyvěsil, že se mu ztratil kocour. Vyvěšoval, ať mě nechají být, protože se vždycky vrátím.'
      },
      'j-e': {
        title: 'E.',
        text: 'Tu větu, kvůli které jsem celou tu noc šel, nenapsala Elena. Napsala ji sedmiletá holčička na plakát, který vylepila její máma. O kocourovi, kterého viděla jenom jednou. Oknem.'
      },
      'j-vzdycky': {
        title: 'Vždycky',
        text: 'Dva lidé, kteří se nikdy nepotkali, o mně napsali skoro stejnou větu. Jeden ji psal patnáct let na kartičky. Druhá ji napsala v sedmi letech na první stránku.'
      }
    },

    /* ---------- epilog ---------- */
    epilogue: {
      title: 'Až zapomenu',
      text: [
        'Sešity nefungují. To je potřeba říct rovnou, protože v to doufali všichni včetně Tigera.',
        'Přečíst někomu jeho život mu ho nevrátí. Vrátí mu informace. Data, jména, letopočty — a on je umí odříkat a nic u toho necítí, protože cit se nedá napsat propiskou.',
        { beat: true },
        'Funguje ale něco jiného, s čím nikdo nepočítal.',
        'Ema mu nemohla vrátit vzpomínku na ten vtip s pianem. Mohla ho k tomu pianu dovést a nechat ho, ať si na tři klávesy šlápne sám.',
        'A pak se mohla dívat, jak se leká úplně stejně jako před dvanácti lety a jak ho to baví úplně stejně jako tehdy — protože Tigera nebaví vzpomínka. Tigera baví ta věc.',
        { beat: true },
        { tiger: 'Já vám ten život nevrátím.' },
        { tiger: 'Ale vy mě k němu můžete pokaždé dovést. A já pokaždé přijdu.' }
      ],
      next: 'Vojtěch Řehák to napsal patnáct let po sobě na kartičku. Ema v sedmi letech na první stránku. Vrátí se sám. Vždycky se vrátí.'
    },

    /* ---------- scény ---------- */
    scenes: [

      /* ====== 1. TMA — zrcadlo první scény celé hry ====== */
      {
        id: 'tma',
        place: 'Neznámý pokoj',
        title: 'Někdo čte nahlas',
        bg: 'm4-pokoj',
        journal: 'j-znovu',
        text: [
          'Tiger si pamatoval tři věci. Že je mu teplo. Že je někde vůně, na kterou nemá jméno. A že v místnosti někdo mluví, aniž by čekal odpověď.',
          'Ze všech tří si byl jistý jenom tím teplem.',
          { beat: true },
          'Nebyla to tma. To byl ten rozdíl a Tiger o něm nemohl vědět, protože si nepamatoval žádnou tmu, se kterou by to srovnal.',
          'Byl to pokoj s lampou, s knihovnou a s oknem, za kterým byl podvečer.',
          'Na zemi u postele seděla mladá žena a četla nahlas ze sešitu, který byl ohmataný jako věc, kterou někdo nosí v kapse.',
          { beat: true },
          { ema: '„…a pak se vylekal tak, že vyskočil na víko piana a to se otevřelo. Uvnitř byla klika."' },
          'Zvedla oči a viděla, že se dívá.',
          'Něco se jí stalo s obličejem — něco, co Tiger nedokázal přečíst, protože k tomu neměl s čím.',
          { ema: 'Ahoj.' },
          { ema: 'Jsem Ema. Za chvíli ti to bude připadat divný, ale já tě znám celej život.' }
        ],
        actions: [
          { label: 'Nevím, kdo jsi', goto: 'kdo' }
        ]
      },

      /* ====== 2. KDO ====== */
      {
        id: 'kdo',
        place: 'Kovářská 9 · pokoj',
        title: 'Devatenáct',
        bg: 'm4-ema',
        text: [
          'Tiger na ni koukal a hledal ve své hlavě něco, čeho by se chytil.',
          'Nenašel nic. Ani ne tak prázdno, jako spíš čerstvě uklizený pokoj, ve kterém se nedá poznat, co v něm stálo.',
          { beat: true },
          { tiger: 'Jak dlouho tu ležím?' },
          'Neřekl to nahlas. Nikdy nic neřekl nahlas. Ale ta holka odpověděla, jako by to slyšela, a to bylo první, co mu na ní přišlo divné.',
          { ema: 'Tři dny.' },
          { ema: 'Čtu ti od pondělí. Jsi u toho klidnej, což je podle mě dobrý znamení, ale babička říká, že si to jenom namlouvám.' },
          { beat: true },
          'Z kuchyně se ozvala žena, která nebyla mladá a nebyla stará.',
          { klara: 'Emo, nechej ho být.' },
          { ema: 'Nesahám na něj.' },
          { klara: 'Já vím, co děláš. Ty na něj mluvíš.' },
          { beat: true },
          'Ema zavřela sešit a Tiger na deskách uviděl číslo. Napsané fixou, dětskou rukou, přetažené několikrát, aby drželo.',
          { note: '1' },
          { ema: 'Je nás čtyřicet jedna.' },
          { ema: 'Sešitů. Ne lidí.' }
        ],
        actions: [
          { label: 'Dál', goto: 'dvanact-doma',  if: function (g) { return g.recall('zustal') === true; } },
          { label: 'Dál', goto: 'dvanact-pryc',  if: function (g) { return g.recall('zustal') === false; } },
          { label: 'Dál', goto: 'dvanact-nevim', if: function (g) { return g.recall('zustal') === undefined; } }
        ]
      },

      /* ====== 3a. DVANÁCT LET — zůstal ====== */
      {
        id: 'dvanact-doma',
        place: 'Kovářská 9 · pokoj',
        title: 'Dvanáct let',
        bg: 'm4-ema',
        text: [
          { ema: 'Bydlíš tady dvanáct let.' },
          { ema: 'Spával jsi na tomhle parapetu. Máš tam vyležený místo, běž se podívat, není to poznat na ničem jiným.' },
          { beat: true },
          'Tiger se šel podívat, protože to byla první konkrétní věc za tři dny.',
          'Na parapetu byla v laku vyšlapaná mělká prohlubeň velikosti kočky. Byla tam. Byla nepopiratelná. A neříkala mu vůbec nic.',
          { beat: true },
          { ema: 'V úterý ráno jsi vstal a šel jsi ke dveřím a čekal jsi, až tě pustím ven, protože jsi netušil, kde jsi.' },
          { ema: 'Já jsem na tenhle den čekala dvanáct let. Měla jsem to nacvičený.' },
          'Odmlčela se a poprvé jí to nešlo tak hladce.',
          { ema: 'Nacvičený to bylo dobře. Jenom jsem si to představovala jinak.' }
        ],
        actions: [
          { label: 'Ukázat mi ty sešity', goto: 'sesity' }
        ]
      },

      /* ====== 3b. DVANÁCT LET — odešel ====== */
      {
        id: 'dvanact-pryc',
        place: 'Kovářská 9 · pokoj',
        title: 'Dvanáct let',
        bg: 'm4-ema',
        text: [
          { ema: 'Tenkrát ráno jsi odešel. Já ti nešla za tím, protože se nesmí sahat.' },
          { ema: 'Tak jsem tě dvanáct let hledala.' },
          { beat: true },
          'Ukázala na zeď nad stolem. Byla na ní mapa, na kterou někdo napíchal špendlíky, a vedle mapy vytištěné inzeráty z útulků, srovnané podle data.',
          'Tiger na to koukal a měl nepříjemný pocit, že tenhle obrázek už někde viděl — jenže to bylo tím, že mu ho tři dny někdo předčítal.',
          { beat: true },
          { ema: 'Našla jsem tě v pondělí. V útulku dvě čtvrti odsud. Vedli tě jako neznámýho a starýho.' },
          { ema: 'Já jsem věděla, že nejsi starej. To ví ze všech lidí na světě přesně jedna.' },
          'Odmlčela se a poprvé jí to nešlo tak hladce.',
          { ema: 'Dvanáct let jsem si představovala, jak mě poznáš. To byla ta jediná část, kterou jsem si nenapsala.' }
        ],
        actions: [
          { label: 'Ukázat mi ty sešity', goto: 'sesity' }
        ]
      },

      /* ====== 3c. DVANÁCT LET — hráč mise 3 nehrál ====== */
      {
        id: 'dvanact-nevim',
        place: 'Kovářská 9 · pokoj',
        title: 'Dvanáct let',
        bg: 'm4-ema',
        text: [
          { ema: 'Naposledy jsem tě viděla, když mi bylo sedm.' },
          { ema: 'Od tý doby jsem si o tobě psala. Každej tejden, i když nebylo co.' },
          { beat: true },
          'Ukázala na polici, na které stály sešity v jedné dlouhé řadě, hřbet vedle hřbetu, jako by to byla encyklopedie o jednom jediném hesle.',
          { ema: 'V pondělí jsi seděl na schodech před domem.' },
          { ema: 'Nevím, jestli ses vrátil, nebo jestli ses jenom zastavil. To se tě nedá zeptat.' },
          'Odmlčela se a poprvé jí to nešlo tak hladce.',
          { ema: 'Dvanáct let jsem si představovala, jak mě poznáš. To byla ta jediná část, kterou jsem si nenapsala.' }
        ],
        actions: [
          { label: 'Ukázat mi ty sešity', goto: 'sesity' }
        ]
      },

      /* ====== 4. SEŠITY (hádanka: seřadit vlastní život) ====== */
      {
        id: 'sesity',
        place: 'Kovářská 9 · stůl',
        title: 'Čtyřicet jedna',
        bg: 'm4-sesity',
        journal: 'j-sesity',
        text: [
          'Ležely na stole ve dvou hromadách a v jedné rozestavěné třetí. Čtyřicet jedna sešitů, popsaných písmem, které začínalo jako dětské a někde kolem dvanáctého sešitu přestalo.',
          'Ema je otvírala jeden po druhém a četla nahlas a Tiger poslouchal a přijímal to celé jako někdo, komu se popisuje cizí město.',
          { beat: true },
          { ema: 'Zkusíme to jinak. Neposlouchej. Použij to.' },
          { ema: 'Já ti řeknu pět věcí ze tvýho života a ty je dáš dohromady tak, jak šly po sobě.' },
          { tiger: 'Já si nepamatuju ani jednu.' },
          { ema: 'Ty je nemáš pamatovat. Ty je máš vědět. To je rozdíl a já potřebuju vědět, jestli je to pro tebe rozdíl taky.' }
        ],
        puzzle: {
          id: 'p-zivot',
          kind: 'sequence',
          layout: 'buttons',
          head: 'Seřaď to',
          prompt: 'Klikej na to, co se stalo, v pořadí od nejstaršího.',
          emptyLabel: 'zatím nic',
          options: [
            { id: 'dnes',  label: 'Tenhle pokoj',       note: 'lampa, sešit, tři dny zpátky' },
            { id: 'klara', label: 'Holčička s culíkem', note: 'fotka na dně bedny, „léto 2009 — já a Tiger"' },
            { id: 'ema',   label: 'Holčička se sešitem', note: 'stála na schodech a nesměla sahat' },
            { id: 'elena', label: 'Dvůr, kde se klepou koberce', note: 'sépiová fotka, vroubkovaný okraj' },
            { id: 'sklep', label: 'Bedna se zámkem',    note: 'hádanka pro děti, kód na tři kolečka' }
          ],
          solution: ['elena', 'klara', 'sklep', 'ema', 'dnes'],
          wrongStep: 'Ema zavrtěla hlavou a otočila list zpátky. Znovu od začátku.',
          hints: [
            'Sépiová fotka s vroubkovaným okrajem je ze všech nejstarší.',
            'Bedna ve sklepě a holčička se sešitem jsou z jedné a té samé noci. Nejdřív sklep, teprve pak schody.',
            'Dvůr s koberci, holčička s culíkem, bedna, schody, tenhle pokoj.'
          ],
          success: 'Bez jediné chyby. Napoprvé.',
          delay: 1300,
          goto: 'nic'
        }
      },

      /* ====== 5. NIC — těžké místo ====== */
      {
        id: 'nic',
        place: 'Kovářská 9 · stůl',
        title: 'Studené',
        bg: 'm4-sesity',
        text: [
          { ema: 'Vidíš. Umíš to.' },
          { tiger: 'Umím.' },
          { beat: true },
          'A tady se to celé zaseklo, protože oba věděli, že to nestačí, a ani jeden to nechtěl říct první.',
          'Tiger uměl odříkat kód od bedny. Uměl tři tóny. Uměl čtyři jména a čtyři roky a věděl, že jedna stará paní chodila sedmnáct let po sklepech s baterkou.',
          'Věděl to přesně tak, jak se ví, kolik měří Sněžka.',
          { beat: true },
          { tiger: 'Emo.' },
          { tiger: 'Když mi řekneš, že mě někdo hledal sedmnáct let, tak já vím, že to je hrozně dlouho.' },
          { tiger: 'Ale nebolí mě to.' },
          { beat: true },
          'Ema seděla nad čtyřiceti jedna sešity, do kterých psala od svých sedmi let každý týden, a chvíli neřekla vůbec nic.',
          { klara: 'Emo.' },
          { ema: 'Ne, mami.' },
          { ema: 'Já vím, cos chtěla říct, a ne.' },
          { beat: true },
          'Pak otevřela úplně poslední sešit, ten rozepsaný, a otočila ho k Tigerovi. Byla v něm jedna stránka, na které nebyl zápis. Byl na ní seznam.',
          { note: 'CO NESEDÍ\n\n• 2009 — Klára ho ztratí\n• 2026 — probudí se v dodávce\n\nmezi tím je sedmnáct let\na v nich není nikdo\n\nNĚKDO TAM BÝT MUSEL' },
          { beat: true },
          { ema: 'Tohle si píšu od svejch čtrnácti.' },
          { ema: 'A dneska mě napadlo, že máme kde se zeptat.' }
        ],
        actions: [
          { label: 'Kde?', goto: 'most' }
        ]
      },

      /* ====== 6. MOST — Bruno (komedie) ====== */
      {
        id: 'most',
        place: 'Most · hnízdo',
        title: 'Úřední hodiny II',
        bg: 'm4-most',
        journal: 'j-bruno',
        text: [
          'Hnízdo pod mostním obloukem tam pořád bylo.',
          'Bylo větší. Komínky byly vyšší, srovnanější a po stranách podepřené kamínky, aby se nesesypaly. Někdo se o to celou tu dobu staral.',
          'Na okraji seděl holub. Mladší, menší a nesrovnatelně nervóznější než ten, kterého si Tiger nepamatoval.',
          { bruno: 'Dobrý den. Podatelna je vpravo.' },
          { tiger: 'Vpravo je řeka.' },
          { bruno: 'Ano. Ta je vpravo.' },
          { beat: true },
          { tiger: 'Jak se jmenuješ?' },
          { bruno: 'Bruno. Doručovatel. Ve službě od té doby, co předchůdce už není ve službě.' },
          { tiger: 'Vilém.' },
          'Bruno se narovnal tak prudce, že o kousek nadskočil.',
          { bruno: 'Vy jste ho znal?' },
          { tiger: 'Ne. Ale mám to napsané.' },
          { beat: true },
          'Bruno se podíval na komínky kolem sebe a pak zpátky na kocoura a bylo na něm vidět, že mu právě přeskočila v hlavě nějaká výhybka.',
          { bruno: 'Já vám něco řeknu a bude to znít blbě.' },
          { bruno: 'Já nevím, co v tom je. Já to neumím přečíst. Já jsem holub.' },
          { bruno: 'Vím jenom, že se to nesmí ztratit, protože mi to řekl. A tak to třídím a doplňuju a v zimě to přikrývám igelitem.' },
          { beat: true },
          { ema: 'Podle čeho to třídíte?' },
          { bruno: 'Podle ruky. Ne podle toho, co je na tom napsané — podle toho, kdo to psal.' },
          { bruno: 'To bylo jeho pravidlo. Říkal, že obsah se dá přečíst kdykoli, ale ruka se pozná jenom zblízka.' }
        ],
        actions: [
          { label: 'Prohledat komínky', goto: 'archiv' }
        ]
      },

      /* ====== 7. ARCHIV (hádanka: který komínek) ====== */
      {
        id: 'archiv',
        place: 'Most · hnízdo',
        title: 'Podle ruky',
        bg: 'm4-archiv',
        text: [
          'Komínky byly čtyři a Bruno u každého poposedl, aby bylo jasné, který je který.',
          'Tiger si sedl mezi ně a udělal to, co uměl líp než cokoli jiného: vzal to, co má napsané, a začal z toho počítat.',
          { beat: true },
          { tiger: 'Ten člověk mě nehledal.' },
          { ema: 'Jak to víš?' },
          { tiger: 'Protože kdyby mě hledal, byl by v tom sloupu pátý plakát a Elena by ho našla dřív než já.' },
          { tiger: 'Sedmnáct let mě někdo měl a ani jednou nevyvěsil, že se mu ztratil kocour.' },
          { beat: true },
          { note: 'Co Tiger hledá:\n\n• není to výzva a není v tom odměna,\n• je to psané rukou, ne tištěné,\n• opakuje se to hodně let za sebou,\n• není u toho telefonní číslo,\n  protože ten člověk nechtěl, aby mu někdo volal.' }
        ],
        puzzle: {
          id: 'p-komínek',
          kind: 'choice',
          head: 'Který komínek',
          prompt: 'Ve kterém z nich to bude?',
          options: [
            {
              id: 'plakaty', label: 'Plakáty ZTRATIL SE', note: 'tištěné, fotka, telefon, odměna',
              correct: false,
              say: 'Ty už zná. Ty vyvěšovala rodina, která ho hledala. Tenhle člověk ne.'
            },
            {
              id: 'parte', label: 'Parte a smuteční oznámení', note: 'černý rámeček, tiskárna',
              correct: false,
              say: 'Tam bude jednou. Ale parte o sobě člověk nepíše rukou a nevyvěšuje ho patnáct let po sobě.'
            },
            {
              id: 'kartičky', label: 'Ručně psané kartičky', note: 'jedna ruka, patnáct let, bez telefonu',
              correct: true
            },
            {
              id: 'plesy', label: 'Vývěsky ze schůzí a plesů', note: 'cyklostyl, razítka',
              correct: false,
              say: 'Razítko není ruka. A tenhle člověk nikam nezval.'
            }
          ],
          hints: [
            'Bruno třídí podle ruky. Hledá se tedy komínek, ve kterém je pořád ta stejná.',
            'Kdo se bojí, že mu volali, nepíše na papír číslo. Kdo hledá, ho tam napíše vždycky.',
            'Ručně psané kartičky.'
          ],
          success: 'Bruno komínek opatrně nadzvedl křídlem.',
          delay: 1100,
          goto: 'karta'
        }
      },

      /* ====== 8. KARTA (hádanka: doplnit slovo) ====== */
      {
        id: 'karta',
        place: 'Most · hnízdo',
        title: 'Patnáct let stejná věta',
        bg: 'm4-karta',
        give: ['karta', 'parte'],
        text: [
          'Bylo jich devatenáct. Devatenáct malých kartiček, tiskacím písmem, tvrdým hrotem, každá o kus roztřesenější než ta předchozí.',
          'A na osmnácti z nich stálo úplně to samé.',
          { note: 'POKUD NAJDETE KOCOURA S ČERVENÝM OBOJKEM,\nNECHTE HO BÝT.\nVRÁTÍ SE SÁM. VŽDYCKY SE VRÁTÍ.\n\n                             V. Ř., Krátká 2' },
          { beat: true },
          'Ema je rozložila na kameni podle data. První byla z roku dva tisíce jedenáct. Poslední z října dva tisíce dvacet pět.',
          { ema: 'Krátká dva.' },
          { ema: 'To je od nás… čtyři minuty. Já tudy chodím do školy.' },
          { beat: true },
          'Tiger se díval na tu poslední kartičku a chvíli mu trvalo, než pochopil, proč vypadá jinak.',
          'Byla vyvěšená v říjnu a někdo pod tu větu připsal ještě jednu řádku. Tou samou rukou, ale silněji, jako by tlačil na tužku, aby se to udrželo na papíře.',
          'Voda z ní ukousla poslední slovo.',
          { note: 'UŽ SE NE________.' },
          { bruno: 'Tuhle jsem nechtěl brát.' },
          { bruno: 'Ale nesmí se to ztratit.' }
        ],
        puzzle: {
          id: 'p-slovo',
          kind: 'input',
          head: 'Poslední slovo',
          prompt: 'Doplň, co na té kartičce chybí.',
          placeholder: 'už se ne…',
          answers: ['nevratil', 'uz se nevratil', 'nevratil se'],
          submitLabel: 'Doplnit',
          wrong: [
            'Ne. Tahle věta má jenom jeden možný konec a Tiger ho zná.',
            'To by nikdo netlačil na tužku.'
          ],
          nearMiss: [
            { when: ['vratil', 'uz se vratil'], say: 'Ta ruka se třásla a tlačila. Tohle není věta, kterou někdo píše, když se něco povedlo.' },
            { when: ['neozval', 'nevratim'], say: 'Skoro. Ale ten člověk nepsal o sobě. Celých patnáct let psal jenom o kocourovi.' }
          ],
          hints: [
            'Osmnáct kartiček tvrdí, že se vždycky vrátí. Ta devatenáctá je z října a je připsaná dodatečně.',
            'Je to sloveso z té věty nad tím, jenom obrácené.',
            'Už se nevrátil.'
          ],
          success: 'Ema to řekla nahlas a hned toho litovala.',
          delay: 1400,
          journal: 'j-rehak',
          goto: 'kratka'
        }
      },

      /* ====== 9. KRÁTKÁ 2 ====== */
      {
        id: 'kratka',
        place: 'Krátká 2',
        title: 'Čtyři minuty',
        bg: 'm4-kratka',
        text: [
          'Dům v Krátké byl nízký, žlutý a naprosto obyčejný.',
          'Ve druhém patře bylo okno bez záclony a za sklem prázdná místnost s vytaženou podlahou. Někdo tam rekonstruoval.',
          { beat: true },
          'Ema si sedla na obrubník a přečetla parte ještě jednou, i když ho uměla nazpaměť po prvních dvou.',
          { note: 'S upřímnou lítostí oznamujeme,\nže nás opustil pan\n\nVOJTĚCH ŘEHÁK\n\n*1941        †2026\n\nPoslední rozloučení proběhne v úzkém kruhu.' },
          { ema: 'Úzkej kruh.' },
          { ema: 'Mami, co to znamená, když se napíše úzkej kruh?' },
          'Klára chvíli neodpověděla.',
          { klara: 'Že nebyl kdo přijít.' },
          { beat: true },
          'Tiger stál na chodníku před domem, ve kterém prožil patnáct let, a snažil se ze všech sil o jedinou věc.',
          'Snažil se něco cítit.',
          'Byl to poctivý pokus. Díval se na to okno, na kliku od vchodových dveří, na obrubník, na kterém musel tisíckrát sedět a čekat, až ho někdo pustí dovnitř.',
          { beat: true },
          { tiger: 'Nic.' },
          { tiger: 'Ani na tomhle místě nic.' },
          { tiger: 'A on tady byl sám a čekal a já jsem byl čtyři minuty odsud a nevěděl jsem o něm.' }
        ],
        actions: [
          { label: 'Jak se jmenoval? Jak mi říkal on?', goto: 'jmeno' }
        ]
      },

      /* ====== 10. JMÉNO — zvrat v kauzalitě ====== */
      {
        id: 'jmeno',
        place: 'Krátká 2',
        title: 'Jak mi říkal',
        bg: 'm4-kratka',
        text: [
          'Ema procházela kartičky ještě jednou, protože Tiger se zeptal na jednu konkrétní věc a ona ji nemohla najít.',
          'Devatenáct kartiček. Patnáct let. Ani na jedné jméno.',
          { beat: true },
          { ema: 'Nikde tě nejmenuje.' },
          { ema: 'Píše „kocour". Malým písmenem. Pokaždý.' },
          { tiger: 'To je divné.' },
          { ema: 'Ne.' },
          'Ema otočila kartičku, aby na ni šlo světlo z lampy, a ukázala na rub, kde bylo tou samou tiskací rukou dopsáno pár slov pro toho, kdo by kartičku sundával.',
          { note: 'Neshání se. Neztratil se.\nMá známku, ale je sedřená a nejde přečíst.\nNějaké jméno tedy má.\nNení moje, abych mu dával jiné.' },
          { beat: true },
          { tiger: '…' },
          'Čtyři lidé mu za sedmdesát let dali čtyři jména a všechna čtyři byla vedle.',
          'A jeden člověk, který ho měl nejdél ze všech, mu žádné nedal, protože usoudil, že mu to nepřísluší.',
          { beat: true },
          'A pak Tigerovi došlo to druhé, a to bylo horší, protože to bořilo jedinou věc, kterou si o sobě myslel, že ví.',
          { tiger: 'Emo. Kdy se ta poslední kartička vyvěsila?' },
          { ema: 'V říjnu dvacet pět.' },
          { tiger: 'A kdy umřel?' },
          'Ema se podívala do parte a spočítala si to a bylo vidět, ve kterém okamžiku to pochopila taky.',
          { ema: 'V lednu. O tři měsíce pozdějc.' },
          { beat: true },
          { tiger: 'Takže jsem ho neztratil.' },
          { tiger: 'Já jsem odešel od živého člověka, protože jsem přestal vědět, že je můj.' },
          'Vždycky si myslel, že to funguje takhle: ztratím někoho, a proto zapomenu.',
          'Bylo to obráceně. Nejdřív zapomene. A pak, protože ho nic nikde nedrží, odejde.',
          { beat: true },
          { tiger: 'Já nejsem ten, komu se ztrácejí lidi.' },
          { tiger: 'Já jsem ten, kdo odchází. Pokaždé. A ani o tom nevím.' }
        ],
        actions: [
          { label: 'Zpátky k tomu sloupu', goto: 'plakat' }
        ]
      },

      /* ====== 11. PLAKÁT (hádanka: čí je které písmo) ====== */
      {
        id: 'plakat',
        place: 'Ulice · sloup',
        title: 'Čtyři ruce',
        bg: 'm4-plakat',
        text: [
          'Sloup stál dál a byl na něm nový nános papíru, protože ulice si pamatuje tak, že vrství.',
          'Ema se prohrabala dvanácti lety až dolů a našla ho — vybledlý, roztřepený a pořád čitelný.',
          { note: 'ZTRATIL SE KOCOUR\nbengálská kočka, červený obojek\njméno: MIKEŠ\nodměna 5 000 Kč' },
          { beat: true },
          { tiger: 'Tenhle je poslední ze čtyř. Ten, u kterého jsem si tenkrát musel sednout.' },
          { ema: 'Ukaž.' },
          'Ema si ho vzala do ruky a dívala se na něj dlouho — a Tiger si všiml, že se nedívá na ten tisk. Dívá se na tu tužku dole.',
          { beat: true },
          { tiger: 'Bruno říkal, že se ruka pozná jenom zblízka.' },
          { tiger: 'Tak si to zblízka přiřaďme. Máme čtyři písma a čtyři lidi.' }
        ],
        puzzle: {
          id: 'p-ruce',
          kind: 'pairs',
          head: 'Čí je které písmo',
          prompt: 'Vyber vlevo papír a vpravo toho, kdo ho psal.',
          left: [
            { id: 'sifra',  label: 'Šifra k telefonnímu číslu', note: 'drobné dospělé písmo, tužka, na okraji plakátu' },
            { id: 'skrt',   label: 'Přeškrtané číslo',          note: 'propiska, protržený papír, vztek' },
            { id: 'prosim', label: '„prosím vrať se."',         note: 'tužka, dětská ruka, nedotažená písmena' },
            { id: 'karta',  label: 'Kartička z Krátké',         note: 'tiskací, roztřesené, tvrdý hrot' }
          ],
          right: [
            { id: 'elena',  label: 'Elena Marešová' },
            { id: 'klara',  label: 'Klára' },
            { id: 'ema',    label: 'Ema' },
            { id: 'rehak',  label: 'Vojtěch Řehák' }
          ],
          solution: { sifra: 'elena', skrt: 'klara', prosim: 'ema', karta: 'rehak' },
          hints: [
            'Tiskací roztřesené písmo tvrdým hrotem je z devatenácti kartiček. To je nejjednodušší.',
            'Šifru si vymyslel někdo, kdo se bál, že si to číslo nezapamatuje. To je dospělé a drobné písmo.',
            'Zbývají dvě. Jedno je dětské a jedno protrhlo papír. V roce dva tisíce dvacet šest bylo Emě sedm.'
          ],
          stepOk: 'Sedí.',
          wrongPair: 'Ne. Tahle ruka to nebyla.',
          success: 'Čtyři ruce. Tři z nich se nikdy nepotkaly.',
          delay: 1500,
          journal: 'j-e',
          goto: 'e'
        }
      },

      /* ====== 12. E. — druhý zvrat ====== */
      {
        id: 'e',
        place: 'Ulice · sloup',
        title: 'E.',
        bg: 'm4-plakat',
        text: [
          'Ema držela plakát a byla úplně rudá.',
          { klara: 'Ten plakát jsem vylepila já.' },
          { klara: 'Babička byla čtyři měsíce po smrti a já jsem tě v březnu viděla u Krátké a myslela jsem si, že se zbláznila i na mě.' },
          { klara: 'Tak jsem udělala to, co dělala ona, protože mě nic jinýho nenapadlo. Vytiskla jsem plakát.' },
          { klara: 'A když se týden nikdo neozval, tak jsem to číslo přeškrtala. Na tom sloupu. Ve tři ráno.' },
          { beat: true },
          { klara: 'Emo, tobě bylo sedm a ty jsi za mnou přišla s tužkou.' },
          { ema: 'Mami, prosím tě.' },
          { klara: 'A já jsem ti dovolila to tam napsat, protože jsem se styděla ti říct, že to k ničemu nebude.' },
          { beat: true },
          'Tiger stál v ulici a díval se na tři slova, kvůli kterým prošel celé město, kvůli kterým vlezl do dvora s kovanou mříží a zazvonil ve čtyři ráno na cizí zvonek.',
          { note: 'prosím vrať se.\n— E.' },
          { beat: true },
          'Celou tu noc si myslel, že to napsala žena, která ho hledala sedmnáct let.',
          'Napsala to sedmiletá holčička, která ho v životě neviděla — jenom o něm každý večer slyšela.',
          { beat: true },
          { tiger: 'Emo.' },
          { ema: 'Já vím, je to trapný, mně bylo—' },
          { tiger: 'Ema.' },
          { tiger: 'Já jsem kvůli té větě šel. Nešel jsem kvůli ničemu jinému. Já jsem tenkrát ještě nevěděl vůbec nic — jenom tohle.' },
          { beat: true },
          { tiger: 'Ty jsi mě nezačala hledat před dvanácti lety.' },
          { tiger: 'Ty jsi mě přivedla domů dřív, než jsem tě potkal.' }
        ],
        actions: [
          { label: 'Vrátit se domů', goto: 'sesit-jedna' }
        ]
      },

      /* ====== 13. SEŠIT ČÍSLO JEDNA (hádanka: kotouče) ====== */
      {
        id: 'sesit-jedna',
        place: 'Kovářská 9 · pokoj',
        title: 'První stránka',
        bg: 'm4-sesity',
        give: ['sesit'],
        text: [
          'Doma Ema položila na stůl sešit číslo jedna a ruku nechala na deskách o vteřinu dýl, než bylo potřeba.',
          { ema: 'Tenhle ti nečtu.' },
          { tiger: 'Proč ne?' },
          { ema: 'Protože jsem ho psala v sedmi a je to blbý.' },
          { beat: true },
          'Otevřela ho na první stránce a otočila k němu.',
          'Byla na ní jedna jediná věta, napsaná přes celou šířku papíru tak, jak píšou sedmileté děti — velkými písmeny, každé jinak velké, poslední slovo namačkané na okraj, protože se nevešlo.',
          'A přes tři prostřední slova byla čára. Ne přeškrtnutí. Spíš to, co udělá dítě, když se stydí a už se to nedá gumovat.',
          { beat: true },
          { note: 'T I G E R  ▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓▓  D O M Ů' },
          { ema: 'To nemusíš.' },
          { tiger: 'Já vím.' }
        ],
        puzzle: {
          id: 'p-veta',
          kind: 'dial',
          head: 'Přečti to',
          prompt: 'Otoč kolečka tak, aby ta věta zase dávala smysl. První a poslední slovo je vidět.',
          wheels: [
            { options: ['MIKEŠ', 'TIGER', 'KOCOUR'],             answer: 1, start: 1 },
            { options: ['UŽ', 'NIKDY', 'SE'],                    answer: 2, start: 1 },
            { options: ['VŽDYCKY', 'MOŽNÁ', 'JEDNOU'],           answer: 0, start: 2 },
            { options: ['ZTRATÍ', 'VRÁTÍ', 'VZPOMENE'],          answer: 1, start: 0 },
            { options: ['SÁM', 'ZPÁTKY', 'DOMŮ'],                answer: 2, start: 2 }
          ],
          hints: [
            'Sedmileté dítě nepíše o tom, co se stane možná. Píše o tom, co je jisté.',
            'Ta věta se dneska už jednou objevila. Stála na devatenácti kartičkách z Krátké.',
            'Tiger se vždycky vrátí domů.'
          ],
          success: 'TIGER SE VŽDYCKY VRÁTÍ DOMŮ.',
          delay: 1600,
          journal: 'j-vzdycky',
          goto: 'shoda'
        }
      },

      /* ====== 14. SHODA ====== */
      {
        id: 'shoda',
        place: 'Kovářská 9 · pokoj',
        title: 'Dva lidé, jedna věta',
        bg: 'm4-sesity',
        text: [
          'Ema položila vedle sešitu tu nejstarší kartičku z Krátké, z roku dva tisíce jedenáct, a chvíli se na to dívali všichni tři.',
          { note: 'VRÁTÍ SE SÁM. VŽDYCKY SE VRÁTÍ.\n\nTIGER SE VŽDYCKY VRÁTÍ DOMŮ.' },
          { beat: true },
          { ema: 'Já jsem toho pána nikdy neviděla.' },
          { klara: 'On o nás nevěděl. My o něm ne.' },
          { ema: 'Tak jak to, že jsme napsali to samý?' },
          { beat: true },
          'Tiger na to znal odpověď a nebyla útěšná, tak ji chvíli nechal být.',
          'Napsali to samé, protože oba dva popisovali tu samou věc: kocoura, který odchází a pak se objeví.',
          'Řehák to bral jako slib. Ema to psala jako přání.',
          'A ono to nebylo ani jedno. Byl to popis poruchy.',
          { beat: true },
          { tiger: 'Já se vždycky vrátím.' },
          { tiger: 'Jenom nikdy ke stejnému člověku.' },
          { beat: true },
          { ema: 'Tak to změníme.' },
          { klara: 'Emo, to se nedá—' },
          { ema: 'Mami, já jsem dvanáct let psala sešity. Já vím líp než kdokoli na světě, co se nedá.' },
          'Vzala obojek, který ležel na parapetu celou dobu, co byl Tiger vzhůru, a nikdo se ho nedotkl.',
          { ema: 'Nedá se ti to vrátit do hlavy. To je fakt a já jsem ho tři dny zkoušela obejít.' },
          { ema: 'Ale dá se tě k tomu pokaždý znovu dovést.' }
        ],
        actions: [
          { label: 'Kam?', goto: 'piano' }
        ]
      },

      /* ====== 15. PIANO — důkaz ====== */
      {
        id: 'piano',
        place: 'Kovářská 9 · obývák',
        title: 'Tři tóny',
        bg: 'm4-piano',
        text: [
          'V obýváku u zdi stálo piano.',
          'Bylo staré, rozladěné a mělo pod jednou nohou podloženou cihlu, protože když ho tenkrát z Kovářské jedenáct stěhovali, nikdo si netroufl tu cihlu vyhodit.',
          { klara: 'To je z toho sklepa. Máma to nechala přivízt, když ten barák rekonstruovali.' },
          { klara: 'Osmnáct let to tady stojí a nikdo na to nesáhl.' },
          { beat: true },
          'Ema odklopila víko, sedla si na zem vedle a otevřela sešit číslo čtyři.',
          { ema: 'Nebudu ti to hrát. To bych ti to zkazila.' },
          { ema: 'Já ti přečtu jenom, co je tady napsaný, a ty si s tím dělej, co chceš.' },
          { beat: true },
          { ema: '„Na papíře na pultíku jsou tři písmena. H, A, F. Napsal je někdo dětskou rukou hrozně dávno a ty jsi na ně šlápl a strašně ses lekl."' },
          'Zvedla oči.',
          { ema: 'To je celý. Víc tam není.' },
          { beat: true },
          'Tiger vyskočil na stoličku a ze stoličky na klávesy a chvíli tam jenom stál.',
          'Tři písmena. Nic mu neříkala. Nic mu neříkalo v tom bytě vůbec nic.',
          'Ale byly to instrukce a instrukce se dají provést i bez vzpomínky. To je celé kouzlo instrukcí.',
          { note: 'H  ·  A  ·  F' },
          { beat: true },
          'Šlápl na H.',
          'Šlápl na A.',
          'Šlápl na F.'
        ],
        actions: [
          { label: '…', goto: 'haf' }
        ]
      },

      /* ====== 16. HAF ====== */
      {
        id: 'haf',
        place: 'Kovářská 9 · obývák',
        title: 'HAF',
        bg: 'm4-piano',
        text: [
          'Byt zaštěkal.',
          { beat: true },
          'Tiger vyletěl do vzduchu tak vysoko, že se sám sobě podivil, minul cihlu, přistál na víku a víko se s dunivým *bum* zavřelo.',
          'Klára vyjekla a přitiskla si ruku na pusu.',
          'Ema se nesmála. Ema seděla na zemi u piana s otevřeným sešitem číslo čtyři na klíně a dívala se na kocoura tak, jak se člověk dívá na výsledek pokusu, který dělal dvanáct let.',
          { beat: true },
          { tiger: '…' },
          { tiger: 'To si někdo naladil schválně.' },
          { beat: true },
          'A pak se stalo tohle: Tiger slezl z piana, otočil se, obešel stoličku, vylezl zpátky nahoru a šlápl na ty tři klávesy ještě jednou.',
          'Byt zaštěkal podruhé. Lekl se přesně stejně.',
          'A potřetí. A počtvrté.',
          { beat: true },
          { klara: 'On se leká pořád dokola.' },
          { ema: 'Jo.' },
          { klara: 'To ho nepřestane bavit?' },
          { ema: 'Ne.' },
          'Ema to řekla úplně klidně, protože to měla napsané v sešitě číslo dvacet devět a čekala na to dvanáct let.',
          { ema: 'On si nepamatuje ten vtip, mami. On si nepamatuje, že už se tomu smál.' },
          { ema: 'Takže se tomu bude smát pokaždý poprvý. Napořád.' },
          { beat: true },
          { ema: 'To jsem hledala. Ne aby si vzpomněl. Aby existovalo něco, co funguje i bez toho.' }
        ],
        actions: [
          { label: 'Sednout si k ní', goto: 'konec' }
        ]
      },

      /* ====== 17. KONEC ====== */
      {
        id: 'konec',
        place: 'Kovářská 9 · parapet',
        title: 'Až zapomenu',
        bg: 'm4-konec',
        text: [
          'Večer ležel Tiger na parapetu, ve kterém byla vyležená mělká prohlubeň velikosti kočky, a nevěděl, kdo ji tam udělal.',
          'Ema seděla na zemi zády opřená o topení a psala sešit číslo čtyřicet dvě.',
          { beat: true },
          { tiger: 'Emo.' },
          { tiger: 'Já to zapomenu znovu.' },
          { ema: 'Já vím. Mám to spočítaný, vychází to jednou za dvanáct až sedmnáct let, ale ten vzorek je malej, tak s tím nepočítej.' },
          { tiger: 'To mě mělo uklidnit?' },
          { ema: 'To byla informace. Uklidnění je na další stránce.' },
          { beat: true },
          'Otočila sešit a ukázala mu ho. Na nové stránce, nahoře, byl nadpis podtržený dvakrát.',
          { note: 'NÁVOD, AŽ TO PŘIJDE ZNOVU\n\n1. neplakat před ním, leká ho to\n2. neříkat mu nejdřív jména, jména mu nic nedělají\n3. hned ho vzít k pianu\n4. H, A, F\n5. počkat\n6. zbytek mu přečíst až potom' },
          { beat: true },
          { tiger: '…' },
          { tiger: 'Bod tři je docela drsný.' },
          { ema: 'Bod tři je celej ten návod. Zbytek jsou poznámky.' },
          { beat: true },
          'Za oknem byl podvečer té barvy, kterou má jenom hodinu denně a nikdo pro ni nemá jméno.',
          'Někde na druhém konci města stál sloup, na kterém byla pod dvanácti vrstvami papíru schovaná jedna tužkou psaná věta.',
          'Někde v Krátké dva se rekonstruovalo a nikdo z těch lidí nevěděl, že se v tom bytě patnáct let čekalo na kocoura, který si to nemohl pamatovat.',
          'A někde pod mostem seděl holub a přikrýval igelitem archiv, kterému nerozuměl, protože mu někdo řekl, že se to nesmí ztratit.',
          { beat: true },
          'Tiger si nepamatoval z toho všeho vůbec nic.',
          'Ale ležel na parapetu, bylo teplo, a někdo v místnosti si zase psal jeho jméno.'
        ],
        actions: [
          { label: 'Dokončit misi', end: true }
        ]
      }

    ]
  });

})();
