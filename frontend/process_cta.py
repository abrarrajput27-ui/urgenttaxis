import os
import io
from PIL import Image

try:
    from rembg import remove
    REMBG_AVAILABLE = True
except ImportError:
    REMBG_AVAILABLE = False

input_path = r'C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\premium_suv_cta_1780610871093.png'
output_path = r'c:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\assets\images\cta-car-premium.png'

if not os.path.exists(input_path):
    print(f"Input file not found: {input_path}")
    exit(1)

if REMBG_AVAILABLE:
    print("Using rembg for flawless background removal...")
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_bytes = i.read()
            output_bytes = remove(input_bytes)
            o.write(output_bytes)
    
    # Crop the result
    img = Image.open(output_path)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        img.save(output_path, "PNG")
        print("Image cropped successfully.")
    else:
        print("Empty bounding box.")
else:
    print("rembg not installed yet.")
