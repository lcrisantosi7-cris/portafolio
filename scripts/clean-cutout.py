"""Limpia el recorte: quita alfa residual, recorta márgenes y exporta WebP."""
import sys
from pathlib import Path

from PIL import Image

SRC = Path(r"D:\portafolio-final\public\assets\images\luis-cutout.png")
DST = SRC.with_suffix(".webp")
MAX_H = 1600
THRESHOLD = 14

if not SRC.exists():
    sys.exit(f"No existe {SRC}. Genera primero el recorte con rembg, remove.bg o Canva.")

img = Image.open(SRC).convert("RGBA")
r, g, b, a = img.split()

hist = a.histogram()
print(f"Píxeles con alfa residual (1-{THRESHOLD - 1}): {sum(hist[1:THRESHOLD])}")

a = a.point(lambda v: 0 if v < THRESHOLD else v)
img = Image.merge("RGBA", (r, g, b, a))

bbox = a.getbbox()
print("Área útil:", bbox, "de", img.size)
img = img.crop(bbox)

if img.height > MAX_H:
    ratio = MAX_H / img.height
    img = img.resize((round(img.width * ratio), MAX_H), Image.LANCZOS)

img.save(DST, "WEBP", quality=88, method=6)
print("Guardado:", DST, f"{DST.stat().st_size / 1024:.0f} KB", img.size)