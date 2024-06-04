from typing import Tuple, Optional
import tcod
from tcod import console 
class Entity:
    """
    A generic object to represent players, enemies, items, etc.
    """
    def __init__(self, x: int, y: int, char: Optional[str] = None, color: Optional[Tuple[int, int, int]] = None, frames: Optional[tcod.image.Image] = None):
        self.x = x
        self.y = y
        self.char = char
        self.color = color
        self.frames = frames
        self.current_frame = 0

    def draw(self, console:tcod.console.Console) -> None:
        """
        Draw the entity to the console.
        If there is no image fall back to character
        """
        if self.frames:
            frame = self.frames[self.current_frame]
            frame.blit(console, self.x, self.y, tcod.constants.BKGND_DEFAULT,scale_x=1.0,scale_y=1.0,angle=0)  
        elif self.char and self.color:
            console.print(x=self.x, y=self.y, string=self.char, fg=self.color)

    def animate(self):
            """
            Advance to the next frame in the animation.
            """
            if self.frames:
                self.current_frame = (self.current_frame + 1) % len(self.frames)

    def move(self, dx:int,dy:int) -> None:
        """
        Move the entity by a given amount
        """
        self.x += dx
        self.y += dy
        