from PIL import Image
import os

filepath = r'c:\Users\91859\Desktop\Antigravity Work\Urgent Taxis\frontend\src\assets\images\cta-car.png'

if os.path.exists(filepath):
    img = Image.open(filepath)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if the pixel is close to white (background)
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            # Fully transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(filepath, "PNG")
    print("Background removed successfully.")
else:
    print(f"File not found: {filepath}")
