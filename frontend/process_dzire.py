from PIL import Image
import os

filepath = r'c:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\assets\images\car-dzire.png'

if os.path.exists(filepath):
    img = Image.open(filepath)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if the pixel is close to white (background/reflection)
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            # Fully transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Crop to bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(filepath, "PNG")
    print("Dzire background removed and image cropped successfully.")
else:
    print(f"File not found: {filepath}")
