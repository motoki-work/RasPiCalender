import logging
import epd4in01f
import time
from PIL import Image

logging.basicConfig(level=logging.DEBUG)

try:
    logging.info("Start")
    epd = epd4in01f.EPD()
    logging.info("init and Clear")
    epd.init()
    epd.Clear()

    with Image.open('./calendar.png') as img:
        img.convert("RGB").save('./calendar.bmp', format='BMP')
    
    logging.info("read tmp.bmp file")
    Himage = Image.open('./calendar.bmp')
    epd.display(epd.getbuffer(Himage))
    time.sleep(3)
    
    logging.info("Goto Sleep...")
    epd.sleep()
    
except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:
    logging.info("ctrl + c:")
    epd4in01f.epdconfig.module_exit()
    exit()