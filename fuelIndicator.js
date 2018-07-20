function FuelIndicatorUI(x, y) {
  this.pos = createVector(x, y);

  this.decreaseValue = 0.1;
  this.fuelLevel = 100;
  this.widthS = 20;
  this.heightS = 120;
}

FuelIndicatorUI.prototype.showUI = function() {
  fill(255, 204, 0);
  rect(this.pos.x, this.pos.y, this.widthS, this.heightS);
}
