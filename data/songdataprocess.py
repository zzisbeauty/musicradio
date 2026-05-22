# main.py
import csv
import json
from pathlib import Path


CSV_PATH = Path("My Spotify Library.csv")
OUT_PATH = Path("tracks.json")
NAME_COL = "Track name"
ARTIST_COL = "Artist name"
def main():
    items = []
    with CSV_PATH.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            raise SystemExit("CSV 没有表头")
        missing = [c for c in (NAME_COL, ARTIST_COL) if c not in reader.fieldnames]
        if missing:
            raise SystemExit(f"缺少字段: {missing}，实际字段: {reader.fieldnames}")
        for row in reader:
            name = (row.get(NAME_COL) or "").strip()
            artist = (row.get(ARTIST_COL) or "").strip()
            if not name or not artist:
                continue
            items.append({"name": name, "artist": artist})
    OUT_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {len(items)} items -> {OUT_PATH}")
if __name__ == "__main__":
    main()