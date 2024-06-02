import tcod

from actions import EscapeAction, MovementAction
from input_handler import EventHandler
from entity import Entity

def main() -> None:
    screen_width = 80
    screen_height = 80

   

    try:
        tileset = tcod.tileset.load_tilesheet(
            "Python-Projects/RougeGame/dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD
        )
    except FileNotFoundError:
        print("Tileset image not found. Please check the path.")
        return
    
    event_handler = EventHandler()

    player = Entity(int(screen_width/2),int(screen_height/2),"@",(255,255,255))
    npc = Entity(int(screen_width/2-5),int(screen_height/2-5),"$"(255,255,0))
    entities = {npc,player}

    with tcod.context.new_terminal(
        screen_width,
        screen_height,
        tileset=tileset,
        title="First Rogue-like Game",
        vsync=True,
    ) as context:
        root_console = tcod.console.Console(screen_width, screen_height, order="F")
        
        while True:
            root_console.print(x=player_x, y=player_y, string=player.char,fg=player.color)
            context.present(root_console)
            root_console.clear()

            for event in tcod.event.wait():
                action = event_handler.dispatch(event)
                
                if action is None:
                    continue

                if isinstance(action, MovementAction):
                    player.move(dx=action.dx,dy=action.dy)

                elif isinstance(action, EscapeAction):
                    raise SystemExit()

if __name__ == "__main__":
    main()
