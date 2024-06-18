import sys
import pytesseract
from PIL import Image

def ocr_process(image_path):
    try:
        print(f"Opening image: {image_path}")  # 파일 경로 출력
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image, lang='kor')
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        print(ocr_process(image_path))
    else:
        print("Usage: python ocr.py path/to/your/image/file.png")
