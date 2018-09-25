function Cell(row, col, startPosX, startPosY, squareSize) {
  this.bee = random(1) < 0.1 ? true : false;
  this.reveal = true;
  this.row = row;
  this.col = col;
  this.rowPos = row * squareSize + startPosX;
  this.colPos = col * squareSize + startPosY;
  this.squareSize = squareSize;
  this.totalOfNeighbors = 0;
}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.rowPos, this.colPos, this.squareSize, this.squareSize);

  if (this.reveal) {
    if (this.bee) {
      stroke(0);
      fill(200);
      ellipse(
        this.rowPos + this.squareSize / 2,
        this.colPos + this.squareSize / 2,
        this.squareSize / 2
      );
    } else {
      if (this.totalOfNeighbors > 0) {
        textSize(32);
        text(
          this.totalOfNeighbors,
          this.rowPos + this.squareSize / 2 - 10,
          this.colPos + this.squareSize - 15
        );
      } else {
        fill(127);
        noStroke();
        rect(
          this.rowPos + 2,
          this.colPos + 2,
          this.squareSize - 4,
          this.squareSize - 4
        );
      }
    }
  }
};

Cell.prototype.countBees = function(grid) {
  if (this.bee) {
    return -1;
  }
  var total = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        this.row + i >= 0 &&
        this.row + i < grid.length &&
        this.col + j >= 0 &&
        this.col + j < grid[this.row].length
      ) {
        if (grid[this.row + i][this.col + j].bee) {
          total++;
        }
      }
    }
  }
  this.totalOfNeighbors = total;
};

Cell.prototype.revealCell = function() {
  this.reveal = true;
};

Cell.prototype.contains = function(mousePointX, mousePointY) {
  return (
    mousePointX >= this.rowPos &&
    mousePointX <= this.rowPos + this.squareSize &&
    (mousePointY >= this.colPos && mousePointY <= this.colPos + this.squareSize)
  );
};
