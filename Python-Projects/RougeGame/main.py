import tcod

from engine import Engine
from input_handler import EventHandler
from entity import Entity

from tcod import libtcodpy
from sprite_loader import load_and_convert_frames

def main() -> None:
    screen_width = 80
    screen_height = 80

    image_path = "Python-Projects/RougeGame/miner.png"
    frame_width, frame_height = 32, 32
    frames = load_and_convert_frames(image_path, frame_width, frame_height)

    try:
        tileset = tcod.tileset.load_tilesheet(
            "Python-Projects/RougeGame/dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD
        )
    except FileNotFoundError:
        print("Tileset image not found. Please check the path.")
        return
    
    event_handler = EventHandler()

    player = Entity(int(screen_width / 2), int(screen_height / 2), image=player_image)    
    npc = Entity(int(screen_width/2-5),int(screen_height/2),"O",(255,255,0))
    entities = {npc,player}

    engine=Engine(entities=entities,event_handler=event_handler,player=player)

    with tcod.context.new_terminal(
        screen_width,
        screen_height,
        tileset=tileset,
        title="First Rogue-like Game",
        vsync=True,
    ) as context:
        root_console = tcod.console.Console(screen_width, screen_height, order="F")
        
        while True:
            engine.render(console=root_console,context=context)

            events = tcod.event.wait()

            engine.handle_events(events)


if __name__ == "__main__":
    main()
