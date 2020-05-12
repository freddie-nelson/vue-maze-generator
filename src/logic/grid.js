export class Grid {

    constructor(columns, rows) {
        this.grid = Array(rows);

        for (let i = 0; i < rows; i++) {
            this.grid[i] = Array(columns)      
        }
    }

}