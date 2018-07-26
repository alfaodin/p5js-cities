function CaveGenerator(canvasWidth, canvasHeight) {
  this.roofLinePositions = [];
  this.floorLinePositions = [];
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.landingPlatformWidth = 150;

  this.platformPositionX = random(50, this.canvasWidth - (this.landingPlatformWidth + 50));
  this.platformPositionY = random(canvasHeight - 10 , canvasHeight - 500);
  this.generateCave();
}

CaveGenerator.prototype.show = function() {
  this.draw(this.roofLinePositions);
  this.draw(this.floorLinePositions);
};

CaveGenerator.prototype.draw = function(linePositions) {
  for (let i = 0; i < linePositions.length - 1; i++) {
    const element = linePositions[i];
    const nextElement = linePositions[i + 1];
    stroke(0);
    strokeWeight(1);
    line(element.x, element.y, nextElement.x, nextElement.y);
  }
};

CaveGenerator.prototype.generateCave = function() {
  // ROOF
  this.roofLinePositions = this.generateLines(createVector(), 0);

  // FLOOR
  this.floorLinePositions = this.generateLines(
    createVector(0, this.canvasHeight),
    this.canvasHeight
  );

  var auxArray = [];
  for (let i = 0; i < this.floorLinePositions.length - 1; i++) {
    const element = this.floorLinePositions[i];
    if (element.x > this.platformPositionX) {
      this.floorLinePositions[i] = createVector(this.platformPositionX, this.platformPositionY);
      this.floorLinePositions[i+ 1] = createVector(this.platformPositionX + this.landingPlatformWidth, this.platformPositionY);
      
      for (let j = i + 2; j < this.floorLinePositions.length; j++) {
        const nextElement = this.floorLinePositions[j];
        if (nextElement.x < this.platformPositionX + this.landingPlatformWidth) {
          auxArray.push(j);
        } else {          
          break;
        }
      }
      break;
    }
  }
  for (let i = 0; i < auxArray.length; i++) {
    this.floorLinePositions.splice(auxArray[i], 1);
  }

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

CaveGenerator.prototype.checkCollision = function(spaceShip) {
  let i;
  for (i = 0; i < this.roofLinePositions.length - 1; i++) {
    const element = this.roofLinePositions[i];
    const nextElement = this.roofLinePositions[i + 1];

    var hit = collideLineRect(
      element.x,
      element.y,
      nextElement.x,
      nextElement.y,
      spaceShip.pos.x,
      spaceShip.pos.y,
      spaceShip.radio,
      spaceShip.radio
    );

    if (hit) {
      print('colliding? ' + hit);
      spaceShip.lose = true;
    }
  }

  for (i = 0; i < this.floorLinePositions.length - 1; i++) {
    const element = this.floorLinePositions[i];
    const nextElement = this.floorLinePositions[i + 1];

    var hit = collideLineRect(
      element.x,
      element.y,
      nextElement.x,
      nextElement.y,
      spaceShip.pos.x,
      spaceShip.pos.y,
      spaceShip.radio,
      spaceShip.radio
    );

    if (hit) {
      print('colliding? ' + hit);
      spaceShip.lose = true;
    }
  }
};
