export class Grid {
  constructor(size) {
    this.gridSize = size;
    this.grid = [];
    this.stack = [];
    this.totalCells = size * size;

    this.createGrid(size);
  }

  createGrid(size) {
    for (let i = 0; i < size; i++) {
      const row = [];

      for (let j = 0; j < size; j++) {
        row.push({
          visited: false,
          top: true,
          right: true,
          bottom: true,
          left: true,
          row: i,
          column: j
        });
      }

      this.grid.push(row);
    }

    // pick starting cell and make it visited
    this.currentCell = this.grid[0][0];
    this.currentCell.visited = true;

    this.visitedCells = 1;

    // push currentCell to stack
    this.stack.push(this.currentCell);
  }

  clearGrid(size) {
    this.grid.splice(0, this.grid.length);
    this.stack.splice(0, this.stack.length);

    if (size) {
        this.totalCells = size * size;
    }

    this.createGrid(size || this.gridSize);
  }

  getNeighbours() {
    const row = this.currentCell.row;
    const column = this.currentCell.column;

    let top;
    let right;
    let bottom;
    let left;

    if (this.grid[row - 1]) {
      top = this.grid[row - 1][column];
    }

    if (this.grid[row][column + 1]) {
      right = this.grid[row][column + 1];
    }

    if (this.grid[row + 1]) {
      bottom = this.grid[row + 1][column];
    }

    if (this.grid[row][column - 1]) {
      left = this.grid[row][column - 1];
    }

    let neighbours = [top, right, bottom, left];
    neighbours = neighbours.filter(neighbour => {
      if (neighbour !== undefined && !neighbour.visited) {
        return neighbour;
      }
    });

    this.neighbours = neighbours;
  }

  selectRandomNeighbour() {
    const randomIndex = Math.floor(Math.random() * this.neighbours.length);
    return this.neighbours[randomIndex];
  }

  pickNeighbour() {
    let nextCell = this.selectRandomNeighbour();

    if (!nextCell) {
      while (!nextCell) {
        nextCell = this.backtrack();
      }
    }

    this.removeBorders(nextCell);

    this.currentCell.current = false;
    this.currentCell = nextCell;
    this.currentCell.visited = true;
    this.currentCell.current = true;

    this.visitedCells++;

    // push current cell to the stack
    this.stack.push(this.currentCell);
  }

  removeBorders(nextCell) {
    const diffRow = this.currentCell.row - nextCell.row;
    const diffColumn = this.currentCell.column - nextCell.column;

    if (diffRow === -1) {
      this.currentCell.bottom = false;
      nextCell.top = false;
    } else if (diffRow === 1) {
      this.currentCell.top = false;
      nextCell.bottom = false;
    }

    if (diffColumn === -1) {
      this.currentCell.right = false;
      nextCell.left = false;
    } else if (diffColumn === 1) {
      this.currentCell.left = false;
      nextCell.right = false;
    }
  }

  backtrack() {
    this.currentCell.current = false;
    this.currentCell = this.stack.pop();
    this.getNeighbours();

    if (this.neighbours.length > 0) {
      return this.selectRandomNeighbour();
    }
  }

  async generateMaze() {
    while (this.totalCells > this.visitedCells) {
      // await sleep(2);
      this.getNeighbours();
      this.pickNeighbour();
    }
  }
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
