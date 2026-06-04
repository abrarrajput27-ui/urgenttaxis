import sys
from PIL import Image

def analyze_image():
    img_path = r"C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\media__1780603398532.png"
    try:
        img = Image.open(img_path)
    except Exception as e:
        print("Error opening image:", e)
        return
    
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # Let's find rows that have mostly white pixels, to identify where the cards are.
    # We'll sample the middle column (x = width // 2)
    img_gray = img.convert("L")
    for y in range(0, height, 10):
        val = img_gray.getpixel((width//2, y))
        if val < 250:
            print(f"Non-white at y={y}, value={val}")

analyze_image()
