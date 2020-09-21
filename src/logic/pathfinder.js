class Pathfinder {
  grid = {};
  path = [];

  constructor(grid) {
    this.grid = grid;
    this.rowLength = this.grid[0].length - 1;
    this.colLength = this.grid.length - 1;
    this.start = this.grid[0][0];
    this.start.startPath = true;
    this.currentCell = this.grid[0][0];
    this.currentCell.pathVisited = true;
    this.destination = this.grid[this.colLength][this.rowLength];

    this.path.push(this.currentCell);
  }

  async startPathfinder() {
    while (this.currentCell !== this.destination) {
      this.nextCell();

      await sleep(0);
    }

    // for (const cell of this.path) {
    //   cell.path = true;
    //   await sleep(0);
    // }
  }

  nextCell() {
    const cells = this.getAvailableCells(this.currentCell);
    this.currentCell.currentPath = false;

    if (cells.length === 0) {
      this.currentCell.path = false;
      this.currentCell = this.path.pop();
      this.currentCell.currentPath = true;
      return;
    }

    this.path.push(this.currentCell);
    this.currentCell = this.getClosestCell(
      this.getAvailableCells(this.currentCell)
    );
    this.currentCell.currentPath = true;
    this.currentCell.pathVisited = true;
    this.currentCell.path = true;
  }

  getDistToDes(cell, destination) {
    const disX = destination.column - cell.column;
    const disY = destination.row - cell.row;

    return disX + disY;
  }

  getClosestCell(cells) {
    let minDist = Infinity;
    let closestCell = null;

    cells.forEach((cell) => {
      const dist = this.getDistToDes(cell, this.destination);

      if (dist < minDist) {
        minDist = dist;
        closestCell = cell;
      }
    });

    return closestCell;
  }

  getAvailableCells(current) {
    const cells = [];

    const row = current.row;
    const column = current.column;

    if (this.grid[row - 1]) {
      const top = this.grid[row - 1][column];

      if (!current.top && !top.pathVisited) {
        cells.push(top);
      }
    }

    if (this.grid[row][column + 1]) {
      const right = this.grid[row][column + 1];

      if (!current.right && !right.pathVisited) {
        cells.push(right);
      }
    }

    if (this.grid[row + 1]) {
      const bottom = this.grid[row + 1][column];

      if (!current.bottom && !bottom.pathVisited) {
        cells.push(bottom);
      }
    }

    if (this.grid[row][column - 1]) {
      const left = this.grid[row][column - 1];

      if (!current.left && !left.pathVisited) {
        cells.push(left);
      }
    }

    return cells;
  }
}

function sleep(ms) {
  if (ms === 0) {
    return;
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default Pathfinder;
