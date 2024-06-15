import sys
import pytesseract
from PIL import Image

def ocr_process(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image, lang='eng')
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    image_path = sys.argv[1]
    print(ocr_process(image_path))
