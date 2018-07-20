function SpaceShip(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.verticalForce = createVector();
    this.engineForce = createVector();
    this.gravity = createVector(0, 0.1);
    this.ajustmentValue = 0.1;
    this.startEngine = false;
    this.engineMagnitud = 0.005;
  }
  
  SpaceShip.prototype.show = function() {
    stroke(255);
    strokeWeight(8);
    if (this.startEngine) {
      fill(205);
    } else {
      fill(255);
    }
    rect(this.pos.x, this.pos.y, 20, 20);
  };
  
  SpaceShip.prototype.startEngines = function(key) {
    this.startEngine = true;
    let x = 0,
      y = 0;
  
    if (key === UP_ARROW) {
      y = -1 * this.engineMagnitud;
    } else if (key === DOWN_ARROW) {
      y = this.engineMagnitud;
    } else if (key === RIGHT_ARROW) {
      x = this.engineMagnitud;
    } else if (key === LEFT_ARROW) {
      x = -1 * this.engineMagnitud;
    }
  
    this.engineForce = createVector(x, y);
  };
  
  SpaceShip.prototype.stopEngines = function() {
    this.startEngine = false;
  };
  
  SpaceShip.prototype.update = function() {
    if (this.startEngine) {
      this.verticalForce.add(this.engineForce);
      this.verticalForce.limit(0.5);
    } else {
      this.verticalForce = createVector(0, 0);
    }
  
    if (this.pos.y + 20 > height) {
      this.vel = createVector(0, 0);
    } else if (this.pos.y - 20 < 0) {
      this.vel = createVector(0, 0);
    } else if (this.pos.x + 20 > width) {
      this.vel = createVector(0, 0);
    } else if (this.pos.x - 20 < 0) {
      this.vel = createVector(0, 0);
    } else {
      this.vel.add(this.gravity);
      this.vel.add(this.verticalForce);
    }
    var adjustedGravityVel = p5.Vector.mult(this.vel, this.ajustmentValue);
    this.pos.add(adjustedGravityVel);
  };