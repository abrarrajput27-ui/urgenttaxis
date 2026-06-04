from PIL import Image
import os

filepath = r'c:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\assets\images\cta-car.png'

if os.path.exists(filepath):
    img = Image.open(filepath)
    # The image now has a transparent background, so getbbox() will crop it to just the car
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        img.save(filepath, "PNG")
        print("Image cropped successfully to bounding box.")
    else:
        print("No bounding box found (image might be completely transparent).")
else:
    print(f"File not found: {filepath}")
