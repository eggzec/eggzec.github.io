"""
Build the "Used by" logo strip.

Each source logo — an organisation's GitHub avatar, or replacement artwork
dropped into the source directory — is flattened onto white, desaturated, and
scaled to one content height. Desaturating here rather than in CSS keeps the
strip even and stops anything flashing colour while it loads; the single height
lands every logo on one optical line instead of a row of mismatched sizes.

    python tools/build-user-logos.py <source-dir> [--out public/brand/users]

Source files are named `<github-login>.<ext>`, lowercased; the site looks the
logo up by login. Orgs whose avatar is a default identicon, a photograph, or an
image that turns to mush in greyscale are better left out than shown badly.
"""

import argparse
import os
import sys

import cv2
import numpy as np

HEIGHT = 128  # content height in px — 2x the CSS height, for retina
MAX_WIDTH = 420  # width cap, so a long wordmark cannot take over the strip


def load(path):
    """Read an image path that may contain non-ASCII characters on Windows."""
    im = cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_UNCHANGED)
    if im is None:
        raise SystemExit(f"unreadable: {path}")
    if im.ndim == 2:
        im = cv2.cvtColor(im, cv2.COLOR_GRAY2BGR)
    if im.shape[2] == 4:
        return im[:, :, :3], im[:, :, 3]
    return im, None


def process(src, dest):
    bgr, alpha = load(src)

    # Avatars ship an alpha channel that only rounds the corners, and the page
    # behind the strip is white — so flatten onto white and keep the square.
    if alpha is not None:
        a = (alpha.astype(np.float32) / 255.0)[:, :, None]
        bgr = (bgr.astype(np.float32) * a + 255.0 * (1 - a)).astype(np.uint8)

    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

    h, w = gray.shape
    scale = min(HEIGHT / h, MAX_WIDTH / w)
    size = (max(1, round(w * scale)), max(1, round(h * scale)))
    interp = cv2.INTER_AREA if scale < 1 else cv2.INTER_CUBIC
    gray = cv2.resize(gray, size, interpolation=interp)

    ok, buf = cv2.imencode(".png", cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR),
                           [cv2.IMWRITE_PNG_COMPRESSION, 9])
    if not ok:
        raise SystemExit(f"could not encode: {dest}")
    buf.tofile(dest)
    return size


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("source", help="directory of <github-login>.<ext> logo files")
    ap.add_argument("--out", default=os.path.join("public", "brand", "users"))
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    names = sorted(f for f in os.listdir(args.source)
                   if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp")))
    if not names:
        sys.exit(f"no images in {args.source}")

    for name in names:
        login = os.path.splitext(name)[0].lower()
        w, h = process(os.path.join(args.source, name), os.path.join(args.out, f"{login}.png"))
        print(f"  {login:38} {w:4}x{h:<4}")


if __name__ == "__main__":
    main()
