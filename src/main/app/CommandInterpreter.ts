import {Direction} from "../model/Direction";
import {ICommand} from "../commands/ICommand";
import {TurnLeftCommand} from "../commands/TurnLeftCommand";
import {MoveForwardCommand} from "../commands/MoveForwardCommand";
import {TurnRightCommand} from "../commands/TurnRightCommand";
import {InitializationCommand} from "../commands/InitializationCommand";
import {Coordinate} from "../model/Coordinate";
import {Position} from "../model/Position";
import {StartingPositionCommand} from "../commands/StartingPositionCommand";

export class CommandInterpreter {
    private letterToDirection: Map<string, Direction> = new Map([
        ["N", Direction.NORTH()], 
        // Connascence of Meaning 
        // ---- outside this class someone must know "N" means "North" 
        ["E", Direction.EAST()],
        ["S", Direction.SOUTH()],
        ["W", Direction.WEST()]
    ]);

    translate(commands: string): Array<ICommand> {
        let allCommands = new Array<ICommand>();
        allCommands.push(this.getInitializationCommand(commands)); 
        // Connascence of Order 
        // ---- outisde this class someone must know "Initialisation commands" come before "Movement commands"
        allCommands.push(this.getStartingPositionCommand(commands));
        allCommands.push(...this.getMovementCommands(commands));

        return allCommands;
    }

    private getMovementCommands(commands: string): ICommand[] {
        let movementCommands = new Array<ICommand>();
        let lines: string[] = commands.split("\n");
        // Connascence of Value 
        // ---- outside this class someone must know how "commands" is formatted inside
        for (let command of Array.from(lines[2])) {
            switch (command) {
                case 'L':
                    // Connascence of Meaning 
                    // ---- outside this class someone must know "L" means "Left"
                    movementCommands.push(new TurnLeftCommand());
                    break;
                case 'F':
                    movementCommands.push(new MoveForwardCommand());
                    break;
                case 'R':
                    movementCommands.push(new TurnRightCommand());
                    break;
            }
        }
        return movementCommands;
    }

    private getInitializationCommand(commands: string): InitializationCommand {
        let lines: string[] = commands.split("\n");
        let topRight: string[] = lines[0].split(" ");
        // Connascence of Value 
        // ---- outside this class someone knows how "commands" is formatted inside
        return new InitializationCommand(new Coordinate(parseInt(topRight[0]), parseInt(topRight[1])));
    }

    private getStartingPositionCommand(commands: string): StartingPositionCommand {
        let lines: string[] = commands.split("\n");
        let coords: string[] = lines[1].split(" ");
        // Connascence of Value 
        // ---- outside this class someone knows how "commands" is formatted inside

        let coordinate: Coordinate = new Coordinate(parseInt(coords[0]), parseInt(coords[1]));
        let direction: Direction = <Direction>this.letterToDirection.get(coords[2]);
        let position: Position = new Position(coordinate.x, coordinate.y, direction.toString());
        return new StartingPositionCommand(position);
    }


}