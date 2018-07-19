var spaceShip = null;

function setup() {
  createCanvas(1400, 800);

  spaceShip = new SpaceShip(width / 2, 10);
  spaceShip.show();
}

function draw() {
  background(120);
  spaceShip.update();
  spaceShip.show();
}

function keyPressed() {
  spaceShip.startEngines();
}

function keyReleased() {
  spaceShip.stopEngines();
}

function SpaceShip(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.verticalForce = createVector();
  this.engineForce = createVector(0, -0.1);
  this.gravity = createVector(0, 0.1);
  this.ajustmentValue = 0.1;
  this.startEngine = false;
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

SpaceShip.prototype.startEngines = function() {
  this.startEngine = true;
};

SpaceShip.prototype.stopEngines = function() {
  this.startEngine = false;
};

SpaceShip.prototype.update = function() {
  
  if (this.startEngine) {
    this.verticalForce.add(this.engineForce);
  } else {
      this.verticalForce = createVector(0, 0);
  }

  if(this.pos.y + 20 > height){
    console.log(`La magnitud  es ${this.vel.magSq()}`);
    this.vel = createVector(0, 0);
  }else{
    this.vel.add(this.gravity);
    this.vel.add(this.verticalForce);
  }
  var adjustedGravityVel = p5.Vector.mult(this.vel, this.ajustmentValue);
  this.pos.add(adjustedGravityVel);

  
};
