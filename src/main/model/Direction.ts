import {format} from "util";

enum DirectionEnum {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3
}
export class Direction {

    private value: number;
    private static map: Map<any, any> = new Map<any, any>([
        [0, new Direction(0)],
        [1, new Direction(1)],
        [2, new Direction(2)],
        [3, new Direction(3)]
    ])


    constructor(value: number) {
        this.value = value;
    }

    enumValue(): string {
        return DirectionEnum[this.value];
    }

    static valueOf(directionValue: number): Direction {
        return this.map.get(directionValue);
    }

    turnLeft(): Direction {
        let previousValue: number = this.value - 1;
        //Connascence of Algorithm 
        // ---- outisde of this function someone already knows the way to wrap coordinates, no need to implement each time
        return Direction.valueOf((previousValue % 4 + 4) % 4);
    }

    turnRight(): Direction {
        let previousValue = this.value + 1;
        //Connascence of Algorithm 
        // ---- outisde of this function someone already knows the way to wrap coordinates, no need to implement each time
        return Direction.valueOf((previousValue % 4 + 4) % 4);
    }

    toString(): string {
        return format("%s", this.enumValue().charAt(0))
    }

    static NORTH(): Direction {
        return Direction.valueOf(DirectionEnum.NORTH);
    }

    static EAST(): Direction {
        return Direction.valueOf(DirectionEnum.EAST);
    }

    static SOUTH(): Direction {
        return Direction.valueOf(DirectionEnum.SOUTH);
    }

    static WEST(): Direction {
        return Direction.valueOf(DirectionEnum.WEST);
    }
}