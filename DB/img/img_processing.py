from pathlib import Path
from PIL import Image

PATH_BASE = str(Path(__file__).resolve().parent)
SRC_DIR = PATH_BASE + '\\profile'
DEST_DIR = PATH_BASE + '\\processed_profile'
IMAGE_EXTS = {".png", ".jpg"}

src_path = Path(SRC_DIR)
dest_path = Path(DEST_DIR)
dest_path.mkdir(parents=True, exist_ok=True)

processed = 0
skipped = 0
failed = 0

for file_path in src_path.rglob("*"):
    if not file_path.is_file():
        continue
    if file_path.suffix.lower() not in IMAGE_EXTS:
        continue

    out_path = dest_path / file_path.name

    try:
        with Image.open(file_path) as img:
            width, height = img.size

            # 정사각형이고 한 변이 1024 이상이면 512x512로 축소
            if width == height and width >= 1024:
                resized = img.resize((512, 512), Image.LANCZOS)

                if file_path.suffix.lower() == ".jpg" and resized.mode in ("RGBA", "LA", "P"):
                    resized = resized.convert("RGB")

                resized.save(out_path)
                processed += 1
                print(f"[RESIZED] {file_path.name} ({width}x{height} -> 512x512)")
            else:
                img.save(out_path)
                skipped += 1
                print(f"[COPIED] {file_path.name} ({width}x{height})")

    except Exception as e:
        failed += 1
        print(f"[FAILED] {file_path.name} -> {e}")

print("\n===== DONE =====")
print(f"resized : {processed}")
print(f"copied  : {skipped}")
print(f"failed  : {failed}")