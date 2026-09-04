from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import textwrap

W, H = 1600, 900
bg_path = Path(r"C:\Users\mizo_\.codex\generated_images\01a0627e-356a-7272-afd9-a6bb107e9ef5\exec-e67b4c51-edad-436b-a1a1-05d37b1d41ed.png")
logo_path = Path("public/logo-aionsite.png")
out_path = Path("public/media/servicios-digitales-aionsite.png")
out_path.parent.mkdir(parents=True, exist_ok=True)

bg = Image.open(bg_path).convert("RGBA").resize((W, H))
overlay = Image.new("RGBA", (W, H), (4, 10, 28, 120))
canvas = Image.alpha_composite(bg, overlay)
draw = ImageDraw.Draw(canvas)

font_dir = Path(r"C:\Windows\Fonts")
bold = ImageFont.truetype(str(font_dir / "segoeuib.ttf"), 42)
title = ImageFont.truetype(str(font_dir / "segoeuib.ttf"), 56)
body = ImageFont.truetype(str(font_dir / "segoeui.ttf"), 22)
body_bold = ImageFont.truetype(str(font_dir / "segoeuib.ttf"), 22)
small = ImageFont.truetype(str(font_dir / "segoeui.ttf"), 17)
small_bold = ImageFont.truetype(str(font_dir / "segoeuib.ttf"), 17)

if logo_path.exists():
    logo = Image.open(logo_path).convert("RGBA")
    logo.thumbnail((180, 56))
    canvas.alpha_composite(logo, (80, 50))
else:
    draw.text((80, 55), "AionSite", font=body_bold, fill=(245, 247, 255, 255))

draw.text((80, 145), "SOLUCIONES DIGITALES", font=title, fill=(248, 250, 255, 255))
draw.text((80, 215), "para hacer crecer tu negocio", font=bold, fill=(80, 190, 255, 255))
draw.text((80, 275), "Servicios claros, escalables y pensados para pequeñas y medianas empresas.", font=body, fill=(205, 216, 235, 255))

cards = [
    ("01", "SITIOS WEB", "Presencia profesional y funcional con diseño adaptable, páginas clave y formularios de contacto.", "$6,000 - $15,000", "2 - 4 semanas", (37, 99, 235)),
    ("02", "REDES SOCIALES", "Planeación, calendario y piezas visuales para mantener activa y relevante tu marca.", "$2,500 - $5,000 / mes", "1 semana de configuración", (46, 196, 182)),
    ("03", "MANTENIMIENTO", "Actualizaciones, respaldos y soporte para mantener tu sitio seguro, estable y disponible.", "$1,000 - $3,000 / mes", "Servicio continuo", (124, 58, 237)),
    ("04", "SEO", "Optimización técnica y de contenidos para mejorar tu visibilidad y atraer visitas con intención.", "$2,500 - $8,000", "1 - 3 semanas", (82, 176, 255)),
]

card_w, card_h = 690, 220
positions = [(80, 370), (830, 370), (80, 625), (830, 625)]

for (num, heading, description, price, timing, accent), (x, y) in zip(cards, positions):
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((x + 8, y + 10, x + card_w + 8, y + card_h + 10), radius=22, fill=(0, 0, 0, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    canvas = Image.alpha_composite(canvas, shadow)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((x, y, x + card_w, y + card_h), radius=22, fill=(9, 20, 47, 238), outline=(*accent, 180), width=2)
    draw.rounded_rectangle((x, y, x + 9, y + card_h), radius=5, fill=(*accent, 255))

    # Minimal line icon: consistent geometric language across all services.
    cx, cy = x + 55, y + 58
    draw.ellipse((cx - 25, cy - 25, cx + 25, cy + 25), outline=(*accent, 255), width=3)
    if num == "01":
        draw.rectangle((cx - 13, cy - 12, cx + 13, cy + 12), outline=(240, 246, 255, 255), width=3)
        draw.line((cx - 8, cy + 5, cx + 8, cy + 5), fill=(*accent, 255), width=3)
    elif num == "02":
        for dx, dy in [(-10, -8), (10, -8), (-10, 10), (10, 10)]:
            draw.ellipse((cx + dx - 4, cy + dy - 4, cx + dx + 4, cy + dy + 4), fill=(240, 246, 255, 255))
        draw.line((cx - 6, cy - 8, cx + 6, cy - 8), fill=(*accent, 255), width=2)
    elif num == "03":
        draw.arc((cx - 17, cy - 17, cx + 17, cy + 17), 45, 235, fill=(240, 246, 255, 255), width=3)
        draw.polygon([(cx + 14, cy - 14), (cx + 22, cy - 15), (cx + 18, cy - 7)], fill=(*accent, 255))
    else:
        draw.line((cx - 18, cy + 8, cx - 5, cy - 4, cx + 6, cy + 3, cx + 19, cy - 14), fill=(240, 246, 255, 255), width=3)
        draw.ellipse((cx + 15, cy - 18, cx + 23, cy - 10), fill=(*accent, 255))

    draw.text((x + 105, y + 26), heading, font=body_bold, fill=(248, 250, 255, 255))
    wrapped = textwrap.fill(description, width=54)
    draw.multiline_text((x + 105, y + 62), wrapped, font=small, fill=(201, 215, 235, 255), spacing=5)
    draw.text((x + 105, y + 150), "DESDE", font=small_bold, fill=(*accent, 255))
    draw.text((x + 175, y + 147), price, font=body_bold, fill=(248, 250, 255, 255))
    draw.text((x + 105, y + 184), f"Tiempo estimado: {timing}", font=small, fill=(180, 196, 220, 255))

draw.text((80, 865), "Rangos orientativos en MXN. Dominio, hosting, publicidad, licencias y producción externa pueden cotizarse aparte.", font=small, fill=(168, 185, 213, 255))
if logo_path.exists():
    logo = Image.open(logo_path).convert("RGBA")
    logo.thumbnail((180, 56))
    canvas.alpha_composite(logo, (80, 50))
canvas.convert("RGB").save(out_path, quality=95)
print(out_path.resolve())
