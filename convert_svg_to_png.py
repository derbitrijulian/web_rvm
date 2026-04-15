#!/usr/bin/env python3
"""Convert SVG to PNG for PWA icons"""

import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
from PIL import Image
import io

# Input and output paths
svg_file = 'public/svg/titik_rvm.svg'
output_dir = 'public/png'

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Sizes needed for PWA icons
sizes = {
    'icon-192x192.png': 192,
    'icon-512x512.png': 512,
}

print("Converting SVG to PNG icons for PWA...")
print(f"Input: {svg_file}")
print(f"Output: {output_dir}\n")

for filename, size in sizes.items():
    output_path = os.path.join(output_dir, filename)
    
    try:
        # Convert SVG to PNG with specific size
        print(f"Creating {filename} ({size}x{size})...", end=" ")
        
        # Load SVG/RLG
        drawing = svg2rlg(svg_file)
        
        if drawing is None:
            print(f"✗ Error: Could not load SVG")
            continue
        
        # Scale drawing to desired size (keeping aspect ratio)
        scale = size / max(drawing.width, drawing.height)
        drawing.width = int(drawing.width * scale)
        drawing.height = int(drawing.height * scale)
        
        # Render to PNG
        renderPM.drawToFile(drawing, output_path, fmt='PNG')
        
        # Verify and ensure correct size
        img = Image.open(output_path)
        if img.size != (size, size):
            # Resize to exact size if needed
            img = img.resize((size, size), Image.Resampling.LANCZOS)
            # Convert to RGBA for transparency
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            img.save(output_path, 'PNG')
        
        # Verify file size
        file_size = os.path.getsize(output_path)
        print(f"✓ Done ({file_size} bytes)")
        
    except Exception as e:
        print(f"✗ Error: {e}")

print("\n✅ All icons created successfully!")
print(f"\nFiles created in {output_dir}:")
for filename in sizes.keys():
    path = os.path.join(output_dir, filename)
    if os.path.exists(path):
        size = os.path.getsize(path)
        print(f"  ✓ {filename} ({size} bytes)")
