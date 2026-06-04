from PIL import Image, ImageDraw
import os

input_path = r'C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\premium_suv_cta_1780610871093.png'
output_path = r'c:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\assets\images\cta-car-premium.png'

if not os.path.exists(input_path):
    print(f"Input file not found: {input_path}")
    exit(1)

# Open image and convert to RGBA
img = Image.open(input_path).convert("RGBA")

# Create a mask for the background using floodfill
# We floodfill from the top-left corner (0, 0)
# We use a temporary solid color (magenta) to identify the background
target_color = (255, 0, 255, 255)
ImageDraw.floodfill(img, (0, 0), target_color, thresh=30)

# Also floodfill from other corners just in case the car touches an edge
w, h = img.size
ImageDraw.floodfill(img, (w-1, 0), target_color, thresh=30)
ImageDraw.floodfill(img, (0, h-1), target_color, thresh=30)
ImageDraw.floodfill(img, (w-1, h-1), target_color, thresh=30)

# Now iterate and replace the magenta pixels with transparent
datas = img.getdata()
newData = []
for item in datas:
    if item == target_color:
        newData.append((255, 255, 255, 0))
    else:
        # Also remove any remaining pure white edge pixels just in case
        if item[0] > 245 and item[1] > 245 and item[2] > 245:
             newData.append((255, 255, 255, 0))
        else:
             newData.append(item)
img.putdata(newData)

# Crop to bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
    print("Cropped successfully to bounding box.")
else:
    print("Empty bounding box.")

img.save(output_path, "PNG")
print("Background removed via floodfill and saved to frontend assets.")
