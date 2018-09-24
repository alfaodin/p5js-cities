function Grid(rows, cols) {
  this.squareSize = 50;
  this.rows = rows;
  this.cols = cols;
  this.arrayCell = new Array(rows);
  this.startPosX = 100;
  this.startPosY = 100;

  for (let i = 0; i < this.arrayCell.length; i++) {
    this.arrayCell[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      this.arrayCell[i][j] = new Cell(i, j, this.squareSize);
    }
  }
}

Grid.prototype.show = function() {
  rect(
    this.startPosX,
    this.startPosY,
    this.rows * this.squareSize + 10,
    this.cols * this.squareSize + 10
  );

  for (let i = 0; i < this.arrayCell.length; i++) {
    for (let j = 0; j < this.arrayCell[i].length; j++) {
      this.arrayCell[i][j].show(this.startPosX + 5, this.startPosY + 5);
    }
  }
};
