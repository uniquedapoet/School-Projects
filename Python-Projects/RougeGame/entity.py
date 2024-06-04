from typing import Tuple, Optional
import tcod
from tcod import console 
class Entity:
    """
    A generic object to represent players, enemies, items, etc.
    """
    def __init__(self, x: int, y: int, char: Optional[str] = None, color: Optional[Tuple[int, int, int]] = None, image: Optional[tcod.image.Image] = None):
        self.x = x
        self.y = y
        self.char = char
        self.color = color
        self.image = image

    def draw(self, console:tcod.console.Console) -> None:
        """
        Draw the entity to the console.
        If there is no image fall back to character
        """
        if self.image:
            console.draw_semigraphics(self.image, self.x, self.y)
        elif self.char and self.color:
            console.print(x=self.x, y=self.y, string=self.char, fg=self.color)


    def move(self, dx:int,dy:int) -> None:
        """
        Move the entity by a given amount
        """
        self.x += dx
        self.y += dy
        