#!/usr/bin/env python3
"""Convert PPTX slides to individual JPG images for optional local preview.

Uses LibreOffice (soffice) for PPTX->PDF, then PyMuPDF for PDF->JPG.
No Poppler/pdftoppm dependency required.

Images are written to a slidetemp/ directory (created automatically).
Use --clean to delete the slidetemp/ directory when review is complete.

This is a local convenience tool. Final visual and compatibility QA should
still happen in Google Slides if that is the delivery target.

Usage:
    python scripts/pptx_to_images.py presentation.pptx [--prefix NAME] [--dpi N]
    python scripts/pptx_to_images.py --clean

Examples:
    python scripts/pptx_to_images.py output/MyPresentation.pptx
    # -> slidetemp/slide-01.jpg, slidetemp/slide-02.jpg, ...

    python scripts/pptx_to_images.py output/MyPresentation.pptx --prefix review --dpi 200
    # -> slidetemp/review-01.jpg, slidetemp/review-02.jpg, ...

    python scripts/pptx_to_images.py --clean
    # deletes slidetemp/ directory
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

SOFFICE_PATHS = [
    r"C:\Program Files\LibreOffice\program\soffice.exe",
    r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
    "/usr/bin/soffice",
    "/usr/local/bin/soffice",
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
]

# Directory for QA slide images (relative to project root)
SLIDETEMP_DIR = "slidetemp"


def find_soffice():
    """Find soffice executable."""
    soffice = shutil.which("soffice")
    if soffice:
        return soffice
    for path in SOFFICE_PATHS:
        if os.path.isfile(path):
            return path
    return None


def clean_slidetemp():
    """Remove the slidetemp/ directory."""
    slidetemp = Path.cwd() / SLIDETEMP_DIR
    if slidetemp.exists():
        shutil.rmtree(slidetemp, ignore_errors=True)
        print(f"Removed {SLIDETEMP_DIR}/")
    else:
        print(f"{SLIDETEMP_DIR}/ does not exist, nothing to clean.")


def pptx_to_images(pptx_path, output_prefix="slide", dpi=150):
    """Convert a PPTX file to individual JPG images in slidetemp/.

    Args:
        pptx_path: Path to the .pptx file.
        output_prefix: Prefix for output filenames (e.g. "slide" -> slide-01.jpg).
        dpi: Resolution for rendered images (default 150).

    Returns:
        List of generated image file paths.
    """
    pptx_path = Path(pptx_path).resolve()
    if not pptx_path.exists():
        print(f"Error: {pptx_path} not found", file=sys.stderr)
        sys.exit(1)

    soffice = find_soffice()
    if not soffice:
        print("Error: LibreOffice (soffice) not found. Install it or add to PATH for local preview.", file=sys.stderr)
        sys.exit(1)

    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("Error: PyMuPDF not installed. Run: pip install pymupdf", file=sys.stderr)
        sys.exit(1)

    # Ensure slidetemp/ exists
    output_dir = Path.cwd() / SLIDETEMP_DIR
    output_dir.mkdir(exist_ok=True)

    # Step 1: PPTX -> PDF via LibreOffice
    tmpdir = tempfile.mkdtemp()
    try:
        print(f"Converting {pptx_path.name} to PDF via LibreOffice...")
        result = subprocess.run(
            [soffice, "--headless", "--convert-to", "pdf", "--outdir", tmpdir, str(pptx_path)],
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode != 0:
            print(f"LibreOffice error: {result.stderr}", file=sys.stderr)
            sys.exit(1)

        pdf_path = Path(tmpdir) / (pptx_path.stem + ".pdf")
        if not pdf_path.exists():
            pdfs = list(Path(tmpdir).glob("*.pdf"))
            if pdfs:
                pdf_path = pdfs[0]
            else:
                print("Error: PDF conversion produced no output", file=sys.stderr)
                sys.exit(1)

        # Step 2: PDF -> individual JPGs via PyMuPDF
        print(f"Rendering to images at {dpi} DPI...")
        doc = fitz.open(str(pdf_path))
        generated = []

        for i, page in enumerate(doc):
            pix = page.get_pixmap(dpi=dpi)
            out_file = output_dir / f"{output_prefix}-{i + 1:02d}.jpg"
            pix.save(str(out_file))
            generated.append(str(out_file))
            print(f"  {SLIDETEMP_DIR}/{out_file.name}")

        doc.close()
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

    print(f"Done. {len(generated)} image(s) in {SLIDETEMP_DIR}/")
    return generated


def main():
    parser = argparse.ArgumentParser(description="Convert PPTX slides to JPG images for optional local preview")
    parser.add_argument("pptx", nargs="?", help="Path to the .pptx file")
    parser.add_argument("--prefix", default="slide", help="Output filename prefix (default: slide)")
    parser.add_argument("--dpi", type=int, default=150, help="Image resolution (default: 150)")
    parser.add_argument("--clean", action="store_true", help="Remove slidetemp/ directory and exit")
    args = parser.parse_args()

    if args.clean:
        clean_slidetemp()
        return

    if not args.pptx:
        parser.error("pptx path is required (unless using --clean)")

    pptx_to_images(args.pptx, args.prefix, args.dpi)


if __name__ == "__main__":
    main()
