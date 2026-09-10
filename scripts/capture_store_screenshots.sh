#!/usr/bin/env bash
# Capture 6.9" iPhone and 13" iPad App Store screenshots from the simulator.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUNDLE="com.sreeo.gita"
SCHEME="Gita"
PROJECT="$ROOT/Gita.xcodeproj"
OUT="$ROOT/AppStoreScreenshots"
DERIVED="$ROOT/DerivedData/StoreScreenshots"

SCENES=(
  "home:01-home.png"
  "chapters:02-chapters.png"
  "verse:03-verse.png"
  "audio:04-audio.png"
  "language:05-language.png"
  "daily:06-daily.png"
)

udid_for() {
  python3 - "$1" <<'PY'
import re, subprocess, sys
name = sys.argv[1]
out = subprocess.check_output(["xcrun", "simctl", "list", "devices", "available"], text=True)
for line in out.splitlines():
    if name not in line:
        continue
    match = re.search(r"\(([0-9A-F-]{36})\)", line, re.I)
    if match:
        print(match.group(1))
        sys.exit(0)
sys.exit(1)
PY
}

prepare_device() {
  local udid="$1"
  xcrun simctl boot "$udid" >/dev/null 2>&1 || true
  xcrun simctl bootstatus "$udid" -b
  xcrun simctl ui "$udid" appearance dark
  xcrun simctl status_bar "$udid" override \
    --time "9:41" \
    --wifiBars 3 \
    --cellularMode active \
    --cellularBars 4 \
    --batteryState charged \
    --batteryLevel 100 \
    --operatorName "" >/dev/null
  xcrun simctl spawn "$udid" defaults write com.apple.springboard SBChamoisEnabled -bool false >/dev/null 2>&1 || true
  xcrun simctl spawn "$udid" defaults write com.apple.springboard SBChamoisExternalEnabled -bool false >/dev/null 2>&1 || true
  xcrun simctl spawn "$udid" defaults write com.apple.springboard SBMedusaHostedReuseEnabled -bool false >/dev/null 2>&1 || true
}

install_app() {
  local udid="$1"
  local dest="$2"
  if [[ "${SKIP_BUILD:-}" != "1" ]]; then
    xcodebuild \
      -project "$PROJECT" \
      -scheme "$SCHEME" \
      -configuration Debug \
      -destination "$dest" \
      -derivedDataPath "$DERIVED" \
      CODE_SIGNING_ALLOWED=NO \
      build
  fi
  local app
  app="$(find "$DERIVED" -name "Gita.app" -type d | head -n 1)"
  xcrun simctl install "$udid" "$app"
}

wait_until_painted() {
  local udid="$1"
  local dest="$2"
  python3 - "$udid" "$dest" <<'PY'
import shutil, struct, subprocess, sys, tempfile, time, zlib
from pathlib import Path

udid, dest = sys.argv[1], sys.argv[2]
Path(dest).parent.mkdir(parents=True, exist_ok=True)

def png_rows(path):
    data = Path(path).read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    pos = 8
    width = height = color = None
    idat = b""
    while pos + 12 <= len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        ctype = data[pos + 4 : pos + 8]
        chunk = data[pos + 8 : pos + 8 + length]
        if ctype == b"IHDR":
            width, height, _bit, color = struct.unpack(">IIBB", chunk[:10])
        elif ctype == b"IDAT":
            idat += chunk
        elif ctype == b"IEND":
            break
        pos += 12 + length
    if width is None or color not in (2, 6):
        return None
    bpp = 3 if color == 2 else 4
    raw = zlib.decompress(idat)
    stride = width * bpp
    rows = []
    i = 0
    prev = bytes(stride)
    for _ in range(height):
        filt = raw[i]
        i += 1
        row = bytearray(raw[i : i + stride])
        i += stride
        if filt == 1:
            for x in range(stride):
                row[x] = (row[x] + (row[x - bpp] if x >= bpp else 0)) & 255
        elif filt == 2:
            for x in range(stride):
                row[x] = (row[x] + prev[x]) & 255
        elif filt == 3:
            for x in range(stride):
                a = row[x - bpp] if x >= bpp else 0
                row[x] = (row[x] + ((a + prev[x]) // 2)) & 255
        elif filt == 4:
            for x in range(stride):
                a = row[x - bpp] if x >= bpp else 0
                b = prev[x]
                c = prev[x - bpp] if x >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if pa <= pb and pa <= pc else (b if pb <= pc else c)
                row[x] = (row[x] + pr) & 255
        elif filt != 0:
            return None
        prev = bytes(row)
        rows.append(prev)
    return width, height, bpp, rows

def sample(rows, bpp, x, y):
    row = rows[y]
    i = x * bpp
    return row[i] / 255, row[i + 1] / 255, row[i + 2] / 255

def painted(path):
    parsed = png_rows(path)
    if parsed is None:
        return False
    w, h, bpp, rows = parsed
    hits = 0
    y0, y1 = int(h * 0.12), int(h * 0.88)
    x0, x1 = int(w * 0.10), int(w * 0.90)
    for y in range(y0, y1, max((y1 - y0) // 12, 1)):
        for x in range(x0, x1, max((x1 - x0) // 12, 1)):
            r, g, b = sample(rows, bpp, x, y)
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            gold = r > 0.52 and g > 0.38 and b < 0.55
            if luma > 0.38 or gold:
                hits += 1
    if hits < 6:
        return False
    springboard = 0
    for x, y in (
        (int(w * 0.04), int(h * 0.06)),
        (int(w * 0.96), int(h * 0.06)),
        (int(w * 0.04), int(h * 0.94)),
        (int(w * 0.96), int(h * 0.94)),
        (int(w * 0.50), int(h * 0.96)),
    ):
        r, g, b = sample(rows, bpp, x, y)
        if b > 0.48 and g > 0.32:
            springboard += 1
    return springboard == 0

tmp = Path(tempfile.mkdtemp(prefix="gita-shot-")) / Path(dest).name
deadline = time.time() + 30
last_ok = False
while time.time() < deadline:
    subprocess.check_call(
        ["xcrun", "simctl", "io", udid, "screenshot", "--mask=black", "--display=internal", str(tmp)],
        stdout=subprocess.DEVNULL,
    )
    last_ok = painted(str(tmp))
    if last_ok:
        break
    time.sleep(0.8)
shutil.copyfile(tmp, dest)
if not last_ok:
    print(f"warning: {dest} may still be blank", file=sys.stderr)
sys.exit(0)
PY
}

capture_on() {
  local udid="$1"
  local folder="$2"
  mkdir -p "$folder"
  local app
  app="$(find "$DERIVED" -name "Gita.app" -type d | head -n 1)"
  xcrun simctl uninstall "$udid" "$BUNDLE" >/dev/null 2>&1 || true
  xcrun simctl install "$udid" "$app"

  xcrun simctl launch "$udid" "$BUNDLE" -- -storeScreenshot home >/dev/null
  sleep 7
  xcrun simctl terminate "$udid" "$BUNDLE" >/dev/null 2>&1 || true

  for item in "${SCENES[@]}"; do
    local scene="${item%%:*}"
    local file="${item##*:}"
    xcrun simctl terminate "$udid" "$BUNDLE" >/dev/null 2>&1 || true
    xcrun simctl launch "$udid" "$BUNDLE" -- -storeScreenshot "$scene" >/dev/null
    wait_until_painted "$udid" "$folder/$file"
    echo "wrote $folder/$file"
  done
}

cd "$ROOT"
npm run ios:sync

IPHONE_NAME="${IPHONE_NAME:-iPhone 16 Pro Max}"
IPAD_NAME="${IPAD_NAME:-iPad Pro 13-inch (M4)}"

IPHONE_UDID="$(udid_for "$IPHONE_NAME" || true)"
if [[ -z "${IPHONE_UDID}" ]]; then
  IPHONE_NAME="iPhone 15 Pro Max"
  IPHONE_UDID="$(udid_for "$IPHONE_NAME")"
fi

echo "iPhone: $IPHONE_NAME ($IPHONE_UDID)"
prepare_device "$IPHONE_UDID"
install_app "$IPHONE_UDID" "platform=iOS Simulator,id=$IPHONE_UDID"
capture_on "$IPHONE_UDID" "$OUT"

IPAD_UDID="$(udid_for "$IPAD_NAME" || true)"
if [[ -z "${IPAD_UDID}" ]]; then
  IPAD_NAME="iPad Pro (12.9-inch) (6th generation)"
  IPAD_UDID="$(udid_for "$IPAD_NAME" || true)"
fi

if [[ -n "${IPAD_UDID}" ]]; then
  echo "iPad: $IPAD_NAME ($IPAD_UDID)"
  prepare_device "$IPAD_UDID"
  SKIP_BUILD=1 install_app "$IPAD_UDID" "platform=iOS Simulator,id=$IPAD_UDID"
  capture_on "$IPAD_UDID" "$OUT/iPad"
else
  echo "No 13-inch iPad simulator found; iPhone set is still required."
fi

echo "Done. Upload iPhone PNGs to the 6.9-inch slot and iPad PNGs to the 13-inch slot."
