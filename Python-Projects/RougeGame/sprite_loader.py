from PIL import Image
import tcod
import tcod.constants
import tempfile
import os
from tcod import libtcodpy

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
    # Save the PIL image to a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    image.save(temp_file.name)
    # Load the temporary file with tcod
    tcod_image = tcod.image.Image.from_file(temp_file.name)
    # Cleanup the temporary file
    os.remove(temp_file.name)
    return tcod_image

def load_and_convert_frames(image_path: str, frame_width: int, frame_height: int):
    pil_frames = load_sprite_sheet(image_path, frame_width, frame_height)
    tcod_frames = [pil_image_to_tcod(frame) for frame in pil_frames]
    return tcod_frames