class Sudoku {
    constructor() {
        this.solutionGrid = [   
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
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

        this.boardGrid = [   
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    createSolution() {
        for (let gridValue = 1; gridValue <= this.total; gridValue++) {
            for (let row = 0; row < this.total; row++) {
                let column = Math.floor(Math.random() * this.total);

                while (this.solutionGrid[row][column] != 0) {
                    column = Math.floor(Math.random() * this.total);
                }

                let counter = 0;
                do {
                    if (counter > this.total)
                        return false;
                    this.solutionGrid[row][column] = 0;
                    column = Math.floor(Math.random() * this.total);
                    while (this.solutionGrid[row][column] != 0) {
                        column = Math.floor(Math.random() * this.total);
                    }
                    this.solutionGrid[row][column] = gridValue;
                    counter++;
                } while (this.columnChecker(column) || this.blockChecker(row, column))

                
            }
        }

        return true;
    }

    rowChecker(row) {
        let hash = [];

        for (let column = 0; column < this.total; column++) {  
            if (hash.includes(this.solutionGrid[row][column])) {
                return true;
            }
            else if (this.solutionGrid[row][column] != 0) {
                hash.push(this.solutionGrid[row][column]);
            }
        }

        return false;
    }

    columnChecker(column) {
        let hash = [];

        for (let row = 0; row < this.total; row++) {  
            if (hash.includes(this.solutionGrid[row][column])) {
                return true;
            }
            else if (this.solutionGrid[row][column] != 0) {
                hash.push(this.solutionGrid[row][column]);
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
                if (hash.includes(this.solutionGrid[row + a][column + b])) {
                    return true;
                }
                else if (this.solutionGrid[row + a][column + b] != 0) {
                    hash.push(this.solutionGrid[row + a][column + b]);
                }
           }
        }

        return false;
    }

    createBoard() {
        for (let a = 0; a < 9; a++) {
            for (let b = 0; b < 9; b++) {
                this.boardGrid[a][b] = this.solutionGrid[a][b];
            }
        }
        //put blanks in solutionGrid
        for (let row = 0; row < 9; row++) {
            for (let i = 0; i < 6; i++) {
                while (true) {
                    let column = Math.floor(Math.random() * 9);
    
                    if (this.boardGrid[row][column] != 0) {
                        this.boardGrid[row][column] = 0;
                        break;
                    }
                }
            }
        }
    }

    displayGrid() {
        var id;
        for (let a = 0; a < 9; a++) {
            for (let b = 0; b < 9; b++) {
                id = "c" + a + b;
                if (this.boardGrid[a][b] === 0) {
                    document.getElementById(id).value = '';
                    document.getElementById(id).disabled = false;
                } else {
                    document.getElementById(id).value = this.boardGrid[a][b];
                    document.getElementById(id).disabled = true;
                }
            }
        }
    }

    solutionChecker() {
        //take html input
        //convert to grid
        //use row, column, blockchecker
        //return html coordinates that is wrong
            //highlight wrong
        //if correct all, return winning statement
    }

    input() {

    }
}

const newGame = document.querySelector('[data-newGame]');
const checkAnswers = document.querySelector('[data-checkAnswers]');
const reset = document.querySelector('[data-reset]');

let sudoku;

newGame.addEventListener('click', button => {
    sudoku = new Sudoku();
    while (true) {
        if (sudoku.createSolution())
            break;
        sudoku = new Sudoku();
    }
    sudoku.createBoard();
    sudoku.displayGrid();
})

checkAnswers.addEventListener('click', button => {

})

reset.addEventListener('click', button => {
    sudoku.displayGrid();
})

        