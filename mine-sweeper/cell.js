function Cell(row, col, squareSize) {
  this.bee = true;
  this.reveal = false;
  this.row = row;
  this.col = col;
  this.squareSize = squareSize;
}

Cell.prototype.show = function(initX, initY) {
  rect(
    initX + (this.row * this.squareSize),
    initY + (this.col * this.squareSize),
    this.squareSize,
    this.squareSize
  );
};
