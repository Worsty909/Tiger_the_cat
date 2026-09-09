#!/usr/bin/env bash
# =========================================================
# TIGER — Cesta domů
# Stáhne vygenerované obrázky do assets/img/ a zmenší je pro web.
# Po spuštění je repozitář soběstačný a hra funguje i offline.
#
# Použití:   bash tools/fetch-assets.sh
# Potřebuje: curl a (volitelně) ImageMagick nebo cwebp na zmenšení.
# =========================================================
set -euo pipefail

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_35qMncw28bSf47VgL5cP5k9pLQs"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/img"
mkdir -p "$OUT"

# klíč scény <mezera> název souboru na CDN
ASSETS="
titul hf_20260908_181244_5f668745-0a03-4ecb-a3fa-8294c41142cf
sklep-tma hf_20260908_181245_c1d207d0-8fc0-4f02-8743-5508d27f72f2
pojistky hf_20260908_181244_26ae4937-16ab-4150-8dd4-a7d69a1f60dc
sklep-svetlo hf_20260908_181244_e297dba1-6764-488a-b7d5-6ea1ea318d12
bedna hf_20260908_181244_ebf4c213-a486-41e4-a56c-4742669d6bb2
fotka hf_20260908_181245_75e2fbcc-c594-41ac-a669-f5b5debcebbf
bertik hf_20260908_181245_9c40d930-ed51-4db8-82fa-f04cfd214310
piano hf_20260908_181244_e7637d38-1b8f-4492-983f-1d270e5f33d3
bedny-okno hf_20260908_181245_b18fbcc1-5618-4a48-b86d-0e33e7408687
ulice hf_20260908_181244_6723aa49-72da-4eb1-819f-57d5ed1b87d2
tiger-ref hf_20260908_180529_0aaa8f78-d892-499d-9489-fa2ad192259d
m2-ulice-dest hf_20260908_203207_357f5f9b-8353-4eb3-86e7-2ac35eab7ee6
m2-sloup hf_20260908_203207_675fb3b1-4588-49bf-be86-462424c0d03e
m2-plakaty hf_20260908_203207_e7cef5a8-638d-40b5-9ac0-f858ba084c00
m2-vilem hf_20260908_203207_5bf3bcae-30be-4600-8f9b-8c8ddf91db69
m2-archiv hf_20260908_203207_242c5da7-bda7-40b0-a0cb-f83bd5275038
m2-budka hf_20260908_203207_5e91f6ff-994f-478e-8eaf-9ea90902fda7
m2-dvur hf_20260908_203208_a1dd3d10-17e5-4a58-9b15-77f75b5ac42e
m2-zvonky hf_20260908_203207_8c095418-c1d1-42ee-85a8-a6731307520d
m2-chodba hf_20260908_203207_b6ceda17-e459-4d86-afca-63bb8b82e98b
m2-okno hf_20260908_203207_0ac35f0a-c32a-4ebb-814d-ac5da4d52510
m3-prah hf_20260909_065418_372bd26f-1ab5-4d0d-a8a2-6fd453b53dbf
m3-ema hf_20260909_065418_47bc6310-429e-4ce4-ad22-4a800871ba39
m3-krabice hf_20260909_065418_a3048921-ee15-4a8c-8f83-5409d364f32a
m3-mapa hf_20260909_065418_79df79f8-1fd7-41dd-a8aa-0ff9c3fd52ff
m3-vilem hf_20260909_065418_2ed51be7-2a7f-44aa-9dfb-6b964706ccbb
m3-zprava hf_20260909_065418_7555bb19-d078-4c18-b7b9-fe15984e26fe
m3-album hf_20260909_065418_b2f26686-78f6-49dc-bf68-0be833ec37a6
m3-1961 hf_20260909_065418_98544fb3-21f7-4090-a203-2640f0c6de8c
m3-sklep-den hf_20260909_065418_085996aa-5ebd-49fc-8ee8-6023454ed4e8
m3-konec hf_20260909_065418_d32a25ce-cf42-45fb-b534-88e6ba4a2f0c
"

have() { command -v "$1" >/dev/null 2>&1; }

echo "Stahuji obrázky do $OUT"
echo "$ASSETS" | while read -r key file; do
  [ -z "${key:-}" ] && continue
  echo "  • $key"
  curl -sfL "$CDN/$file.png" -o "$OUT/$key.png"

  # Zmenšení na rozumnou velikost pro web (nepovinné).
  if have magick; then
    magick "$OUT/$key.png" -strip -resize 900x -quality 66 "$OUT/$key.avif" && rm -f "$OUT/$key.png"
  elif have convert; then
    convert "$OUT/$key.png" -strip -resize 900x -quality 66 "$OUT/$key.webp" && rm -f "$OUT/$key.png"
  else
    echo "    (ImageMagick nenalezen — nechávám PNG; hra si poradí, jen bude těžší)"
    mv "$OUT/$key.png" "$OUT/$key.webp"
  fi
done

echo
echo "Hotovo. Otevři index.html a hraj."
