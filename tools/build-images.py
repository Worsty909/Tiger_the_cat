#!/usr/bin/env python3
"""
TIGER — Cesta domů
Připraví obrázky pro web. Spouští ho deploy workflow, ručně není potřeba.

Pro každý klíč z js/assets.js:
  1) když v assets/img/ leží <klíč>.webp, vezme se beze změny;
  2) když tam leží <klíč>.png / .jpg / .jpeg, převede se na webp;
  3) jinak se obrázek stáhne z adresy v js/assets.js a převede.

Převod = šířka 900 px (titulka 1200 px), webp kvalita 78.
Stažené a převedené soubory se ukládají do cache podle adresy, takže se
každý obrázek stahuje jen jednou — i napříč deployi (actions/cache).

Použití:
  python3 tools/build-images.py --out _site/assets/img [--cache .image-cache]
  python3 tools/build-images.py --out assets/img      # doplní repozitář lokálně

Potřebuje Pillow (pip install pillow).
"""
import argparse
import hashlib
import io
import os
import re
import shutil
import sys
import time
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MANIFEST = os.path.join(ROOT, 'js', 'assets.js')
LOCAL = os.path.join(ROOT, 'assets', 'img')

WIDTH = 900
WIDE = {'titul': 1200}
QUALITY = 78


def read_manifest():
    """Vytáhne z js/assets.js dvojice klíč → adresa (formát řádku viz tamtéž)."""
    src = open(MANIFEST, encoding='utf-8').read()
    cdn = re.search(r"var CDN = '([^']*)'", src)
    cdn = cdn.group(1) if cdn else ''
    block = re.search(r'var IMAGES = \{(.*?)\n  \};', src, re.S)
    if not block:
        sys.exit('build-images: v js/assets.js chybí blok "var IMAGES = { … };"')
    out = {}
    for m in re.finditer(r"'([a-z0-9-]+)'\s*:\s*(CDN\s*\+\s*)?'([^']+)'", block.group(1)):
        out[m.group(1)] = (cdn if m.group(2) else '') + m.group(3)
    if not out:
        sys.exit('build-images: v js/assets.js jsem nenašel žádný obrázek')
    return out


def convert(data, key, dest):
    from PIL import Image
    img = Image.open(io.BytesIO(data))
    img = img.convert('RGBA' if img.mode in ('RGBA', 'LA', 'P') else 'RGB')
    width = WIDE.get(key, WIDTH)
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    tmp = dest + '.tmp'
    img.save(tmp, 'WEBP', quality=QUALITY, method=6)
    os.replace(tmp, dest)


def download(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'tiger-build-images'})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # síť občas zakolísá — zkusit znovu s odstupem
            if i == tries - 1:
                raise
            print(f'    … {e}; zkouším znovu', flush=True)
            time.sleep(2 ** (i + 1))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--out', required=True, help='kam uložit hotové .webp')
    ap.add_argument('--cache', default=os.path.join(ROOT, '.image-cache'),
                    help='kam ukládat stažené obrázky mezi běhy')
    ap.add_argument('--strict', action='store_true',
                    help='skončit chybou, když se některý obrázek nepodaří získat')
    args = ap.parse_args()

    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)
    os.makedirs(args.cache, exist_ok=True)

    images = read_manifest()
    stats = {'v repozitáři': 0, 'převedeno z repozitáře': 0, 'z cache': 0, 'staženo': 0}
    failed = []

    for key, url in images.items():
        dest = os.path.join(out, key + '.webp')
        local = os.path.join(LOCAL, key + '.webp')

        # 1) hotový webp v repozitáři má přednost
        if os.path.exists(local):
            if os.path.abspath(local) != dest:
                shutil.copyfile(local, dest)
            stats['v repozitáři'] += 1
            continue

        # 2) jiný formát v repozitáři — převést
        raw = next((os.path.join(LOCAL, key + '.' + e) for e in ('png', 'jpg', 'jpeg')
                    if os.path.exists(os.path.join(LOCAL, key + '.' + e))), None)
        if raw:
            convert(open(raw, 'rb').read(), key, dest)
            print(f'  • {key}: převedeno z {os.path.basename(raw)}')
            stats['převedeno z repozitáře'] += 1
            continue

        # 3) stáhnout (nebo vzít z cache)
        tag = hashlib.sha1(f'{url}|{WIDE.get(key, WIDTH)}|{QUALITY}'.encode()).hexdigest()[:16]
        cached = os.path.join(args.cache, f'{key}-{tag}.webp')
        if os.path.exists(cached):
            shutil.copyfile(cached, dest)
            stats['z cache'] += 1
            continue
        try:
            print(f'  • {key}: stahuji', flush=True)
            convert(download(url), key, cached)
            shutil.copyfile(cached, dest)
            stats['staženo'] += 1
        except Exception as e:
            print(f'  ✗ {key}: {e}', flush=True)
            failed.append(key)

    total = sum(os.path.getsize(os.path.join(out, k + '.webp'))
                for k in images if os.path.exists(os.path.join(out, k + '.webp')))
    summary = ', '.join(f'{k}: {v}' for k, v in stats.items() if v)
    print(f'\nObrázky: {len(images) - len(failed)}/{len(images)} ({summary}), '
          f'celkem {total / 1024 / 1024:.1f} MB')
    if failed:
        print('Nepodařilo se získat: ' + ', '.join(failed) +
              ' — hra je načte přímo z adresy v js/assets.js.')
        if args.strict:
            sys.exit(1)


if __name__ == '__main__':
    main()
