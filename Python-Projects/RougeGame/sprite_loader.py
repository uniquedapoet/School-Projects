from PIL import Image
import tcod
import tcod.constants

def load_sprite_sheet(image_path: str, frame_width:int,frame_height:int):
    """
    Load in Sprite Sheet and define frames with Pillow
    """
    sprite_sheet = Image.open(image_path) #opening image
    sheet_width, sheet_height = sprite_sheet.size #create width and height based on sprite dimensions
    frames = [] #create list to hold each frame of the sheet

    for y in range(0, sheet_height, frame_height): #iterate throught the sheet going frame by frame
        for x in range(0, sheet_width, frame_width):
            box= (x,y,x+frame_width,y+frame_height) #define each frame
            frame = sprite_sheet.crop(box)
            frames.append(frame)

    return frames

def pil_image_to_tcod(image):
    image = image.convert("RGBA")
    data = image.tobytes("raw","RGBA")
    tcod_image = tcod.image.Image.from_bytes(data,image.size[0],image.size[1],tcod.constants.ORDER_RGBA)
    return tcod_image

def load_and_convert_frames(image_path: str, frame_width: int, frame_height: int):
    pil_frames = load_sprite_sheet(image_path, frame_width, frame_height)
    tcod_frames = [pil_image_to_tcod(frame) for frame in pil_frames]
    return tcod_frames