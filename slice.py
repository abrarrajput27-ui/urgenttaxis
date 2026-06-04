from PIL import Image

def slice_all():
    img_path = r"C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\media__1780603398532.png"
    img = Image.open(img_path)
    
    # We want to crop out the 5 icons.
    w = 853 / 5
    for i, name in enumerate(["oneway", "roundtrip", "airport", "local", "tour"]):
        left = int(i * w)
        right = int((i + 1) * w)
        top = 100
        bottom = 260
        cropped = img.crop((left, top, right, bottom))
        cropped.save(f"frontend/src/assets/images/service-{name}.png")
        print(f"Saved {name}")

slice_all()
