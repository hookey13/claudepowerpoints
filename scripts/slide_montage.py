#!/usr/bin/env python3
"""Create a contact-sheet montage from rendered slide images.

Defaults to reading `slidetemp/` and writing `slidetemp_montage.jpg`
in the project root.
"""

import argparse
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw


def natural_key(path: Path):
    parts = re.split(r"(\d+)", path.name.lower())
    return [int(part) if part.isdigit() else part for part in parts]


def discover_images(input_dir: Path):
    return sorted(
        [
            path
            for path in input_dir.iterdir()
            if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png"}
        ],
        key=natural_key,
    )


def create_montage(images, output_file: Path, tile_width: int, gutter: int, background: str):
    opened = []
    for path in images:
        try:
            opened.append((path, Image.open(path).convert("RGB")))
        except OSError:
            print(f"Skipping unreadable image: {path}")

    if not opened:
        raise SystemExit("No readable images found for montage creation")

    try:
        max_height = max(image.height for _, image in opened)
        cols = min(3, max(1, math.ceil(math.sqrt(len(opened)))))
        rows = math.ceil(len(opened) / cols)
        canvas_width = (cols * tile_width) + ((cols + 1) * gutter)
        label_height = 26
        tile_height = int(max_height * (tile_width / max(image.width for _, image in opened)))
        canvas_height = rows * (tile_height + label_height) + ((rows + 1) * gutter)

        canvas = Image.new("RGB", (canvas_width, canvas_height), background)
        draw = ImageDraw.Draw(canvas)

        for index, (path, image) in enumerate(opened):
            row = index // cols
            col = index % cols
            x = gutter + (col * (tile_width + gutter))
            y = gutter + (row * (tile_height + label_height + gutter))

            resized_h = int(image.height * (tile_width / image.width))
            resized = image.resize((tile_width, resized_h), Image.Resampling.LANCZOS)
            y_offset = y + max((tile_height - resized_h) // 2, 0)
            canvas.paste(resized, (x, y_offset))
            draw.text((x, y + tile_height + 4), path.name, fill="#333333")

        canvas.save(output_file, quality=92)
    finally:
        for _, image in opened:
            image.close()


def main():
    parser = argparse.ArgumentParser(description="Create a montage/contact sheet from slide preview images")
    parser.add_argument("--input-dir", default="slidetemp", help="Directory containing slide images")
    parser.add_argument("--output", default="slidetemp_montage.jpg", help="Output montage image path")
    parser.add_argument("--tile-width", type=int, default=420, help="Width of each tile in pixels")
    parser.add_argument("--gutter", type=int, default=24, help="Spacing between tiles in pixels")
    args = parser.parse_args()

    input_dir = Path(args.input_dir).resolve()
    if not input_dir.exists():
        raise SystemExit(f"Input directory not found: {input_dir}")

    images = discover_images(input_dir)
    if not images:
        raise SystemExit(f"No slide images found in: {input_dir}")

    output = Path(args.output).resolve()
    create_montage(images, output, args.tile_width, args.gutter, "#F5F1E8")
    print(f"Saved montage to {output}")


if __name__ == "__main__":
    main()
