function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, -1);
  this.acc = createVector(0, 0);
}

Particle.prototype.show = function () {
  point(this.pos.x, this.pos.y);
};

Particle.prototype.applyFoce = function (force) {
  this.acc.add(force);
}

Particle.prototype.update = function () {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
};
