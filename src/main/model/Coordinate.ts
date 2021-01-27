import {format} from "util";

export class Coordinate {

    x: number;
    y: number;

    //Connascence of Order 
    // ---- outisde of this function someone must knows the order of the ints: first x, then y
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    moveNorth(): Coordinate {
        return new Coordinate(this.x, this.y + 1);
    }

    moveEast(): Coordinate {
        return new Coordinate(this.x + 1, this.y);
    }

    moveSouth(): Coordinate {
        return new Coordinate(this.x, this.y - 1);
    }

    moveWest(): Coordinate {
        return new Coordinate(this.x -1 , this.y);
    }

    toString(): string {
        return format("%s %s", this.x, this.y);
    }
}