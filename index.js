class Chassman {
    constructor(name, side, checkboard, startX, startY) {
        this.name = name;
        this.side = side;
        this.checkboard = checkboard;
        this.startX = startX;
        this.startY = startY;

        this.history = [{
            x: startX,
            y: startY
        }];
    }

    get currentPosition() {
        return this.history[0];
    }

    get lastPosition(){
        return this.history[1];
    }

    setMovePattern() {

    }

    moveTo(x, y) {
        this.checkboard.move(this.currentPosition.x, this.currentPosition.y, x, y);
        this.history.unshift({ x, y });
    }

    undo() {
        this.checkboard.move(this.currentPosition.x, this.currentPosition.y, this.lastPosition.x, this.lastPosition.y);
        this.history.shift();
    }
}

class Lattice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this._setValue(x, y);
    }

    get value() {
        return this.value_;
    }

    _setValue(x, y) {
        if (x % 2 != 0) {
            if (y % 2 != 0) {
                this.value_ = ' ';
            } else {
                this.value_ = '#';
            }
        } else {
            if (y % 2 != 0) {
                this.value_ = '#';
            } else {
                this.value_ = ' ';
            }
        }
    }

    lightOn() {
        console.log(`${this.x}x${this.y} lights on!`);
    }

    lightOff() {
        console.log(`${this.x}x${this.y} lights off!`);
    }
}

class Checkerboard {
    constructor(grid) {
        this.board = Array(grid).fill(' ').map((item, x) => {
            return Array(grid).fill(' ').map((item, y) => {
                return new Lattice(x + 1, y + 1);
            });
        });
    }

    print() {
        const board = this.board.map(array => array.map(item => item.value).join('')).join('\n');
        console.log(board);
        return this;
    }

    block(x, y) {
        return this.board[x - 1][y - 1];
    }

    move(fromX, fromY, toX, toY) {
        this.block(fromX, fromY).lightOff()
        this.block(toX, toY).lightOn();
        return this;
    }

}

const board = new Checkerboard(8);

const pawn = new Chassman('pawn', 'red', board, 2, 1);
pawn.moveTo(2, 2);
pawn.undo(2, 2);
