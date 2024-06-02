from typing import Tuple 

import numpy as np

#Tile graphics structured type compatible with COnsole.tiles_rgb.
graphic_dt = np.dtype(
    [
        ("ch",np.int32), #unicode codepoint.
        ("fg","3B"), #3 unsigned bytes for rgb
        ("bg","3b"),
    ]
)

tile_dt = np.dtype(
    [
        ("walkable",np.bool_),
        ("transparent",np.bool_),
        ("dark",graphic_dt),
    ]
)

def new_tile(
        *,
        walkable: int,
        transparent: int,
        dark: Tuple[int, Tuple[int, int, int], Tuple[int, int, int]],
) -> np.ndarray:
    """Helper function for defining individual tile types"""
    return np.array((walkable, transparent, dark), dtype=tile_dt)

floor = new_tile(walkable=True,transparent=True,dark=(ord(" "), (255,255,255),(50,50,150)),)

wall = new_tile(walkable=False,transparent=False, dark=(ord(" "),(255,255,255),(0,0,100)),)