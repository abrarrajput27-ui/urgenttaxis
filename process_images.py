import shutil
import glob
import os
from PIL import Image

def copy_and_inspect():
    # The user uploaded some images to the artifacts directory
    files = [
        r"C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\media__1780604798841.png",
        r"C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\media__1780604798842.png",
        r"C:\Users\91859\.gemini\antigravity\brain\f0e31381-f5a0-4fb3-a991-7aba8e7ba64d\media__1780604798847.png"
    ]
    
    for i, f in enumerate(files):
        if os.path.exists(f):
            dest = f"frontend/src/assets/images/service-uploaded-{i}.png"
            shutil.copy(f, dest)
            img = Image.open(dest)
            print(f"File {i}: {img.size}")
        else:
            print(f"File not found: {f}")

copy_and_inspect()
