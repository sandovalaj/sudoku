class Sudoku {
    constructor() {
        this.grid = [   [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]
                        
    ];
        this.total = 9;
        this.totalSquared = 3;
    }

    createSolution() {
        for (let gridValue = 1; gridValue <= this.total; gridValue++) {
            for (let row = 0; row < this.total; row++) {
                let column = Math.floor(Math.random() * this.total);

                while (this.grid[row][column] != 0) {
                    column = Math.floor(Math.random() * this.total);
                }

                let counter = 0;
                do {
                    if (counter > this.total)
                        return false;
                    this.grid[row][column] = 0;
                    column = Math.floor(Math.random() * this.total);
                    while (this.grid[row][column] != 0) {
                        column = Math.floor(Math.random() * this.total);
                    }
                    this.grid[row][column] = gridValue;
                    counter++;
                } while (this.columnChecker(column) || this.blockChecker(row, column))

                
            }
        }

        return true;
    }

    rowChecker(row) {
        let hash = [];

        for (let column = 0; column < this.total; column++) {  
            if (hash.includes(this.grid[row][column])) {
                return true;
            }
            else if (this.grid[row][column] != 0) {
                hash.push(this.grid[row][column]);
            }
        }

        return false;
    }

    columnChecker(column) {
        let hash = [];

        for (let row = 0; row < this.total; row++) {  
            if (hash.includes(this.grid[row][column])) {
                return true;
            }
            else if (this.grid[row][column] != 0) {
                hash.push(this.grid[row][column]);
            }
        }

        return false;
    }

    blockChecker(row, column) {
        let hash = [];

        while (row % this.totalSquared != 0) 
            row--;

        while (column %  this.totalSquared!= 0) 
            column--;
        

        for (let a = 0; a < this.totalSquared; a++) {
            for (let b = 0; b < this.totalSquared; b++) {
                if (hash.includes(this.grid[row + a][column + b])) {
                    return true;
                }
                else if (this.grid[row + a][column + b] != 0) {
                    hash.push(this.grid[row + a][column + b]);
                }
           }
        }

        return false;
    }

    printGrid() {
        for (let a = 0; a < this.total; a++) {
            for (let b = 0; b < this.total; b++) {
                process.stdout.write(this.grid[a][b] + "  ");
            }
            console.log("\n");
        }
    }

    solutionChecker() {

    }

    input() {

    }
}



let sudoku = new Sudoku();

while (true) {
    if (sudoku.createSolution())
        break;
    sudoku = new Sudoku();
}

sudoku.printGrid();
        