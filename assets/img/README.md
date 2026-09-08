# Obrázky

Hra hledá pro každou scénu soubor `<klíč>.<přípona>` v této složce. Zkouší
`avif`, `webp`, `png`, `jpg`, `jpeg` — v tomhle pořadí. Stačí tedy soubor
nakopírovat sem a pojmenovat podle klíče, na formátu nezáleží.

Když tu soubor není, hra ho načte z CDN (adresy jsou v `js/assets.js`).
Když neuspěje ani to, vykreslí stylizovaný náhradní panel a jde hrát dál.

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

## Doporučení

Šířka kolem 900 px bohatě stačí — hra obrázek zobrazuje maximálně v 860 px
a překrývá ho vinětou. Menší soubory znamenají rychlejší načtení.

Nejjednodušší cesta:

```bash
bash tools/fetch-assets.sh
```

Stáhne všechno, zmenší a pojmenuje správně.

## Nový obrázek pro další misi

1. Přidej řádek do `REMOTE` v `js/assets.js` (nebo jen ulož soubor sem).
2. Přidej řádek do `ASSETS` v `tools/fetch-assets.sh`.
3. Ve scéně nastav `bg: '<klíč>'`.

Aby Tiger vypadal ve všech scénách stejně, předávej při generování
`tiger-ref` jako referenční obrázek — postup je popsaný v `docs/DESIGN.md`.
