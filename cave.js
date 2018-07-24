function CaveGenerator(canvasWidth, canvasHeight) {
  this.roofLinePositions = null;
  this.floorLinePositions = null;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.generateCave();
}

CaveGenerator.prototype.show = function() {
  this.draw(this.roofLinePositions);
  this.draw(this.floorLinePositions);
};

CaveGenerator.prototype.draw = function(linePositions){
  for (let i = 0; i < linePositions.length - 1; i++) {
    const element = linePositions[i];
    const nextElement = linePositions[i + 1];
    stroke(0);
    strokeWeight(1);
    line(element.x, element.y, nextElement.x, nextElement.y);
  }
}

CaveGenerator.prototype.generateCave = function() {
  // ROOF
  this.roofLinePositions = this.generateLines(createVector(), 0);

  // FLOOR
  this.floorLinePositions = this.generateLines(createVector(0, this.canvasHeight), this.canvasHeight);
};

CaveGenerator.prototype.generateLines = function(
  firstVector,
  verticalDisplacement
) {
  var linePositions = [];
  linePositions.push(firstVector);
  var previousX = 0;
  while (true) {
    var angleDegrees = random(0, 90);
    var magnitud = random(10, this.canvasHeight / 5);
    var v = p5.Vector.fromAngle(radians(angleDegrees), magnitud);
    v.x = v.x + previousX;
    previousX = v.x;
    if (verticalDisplacement > 0) {
      v.y = verticalDisplacement - v.y;
    }

    linePositions.push(v);
    if (previousX > this.canvasWidth) {
      break;
    }
  }
  return linePositions;
};
