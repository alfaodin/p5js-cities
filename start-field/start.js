function StartClass() {
  this.x = random(-width / 2, width / 2);
  this.y = random(-height / 2, height / 2);
  this.z = random(width);
  this.pz = this.z;
}

StartClass.prototype.show = function() {
  fill(255);
  noStroke();

  var sx = map(this.x / this.z, 0, 1, 0, width);
  var sy = map(this.y / this.z, 0, 1, 0, height);

  var sz = map(this.z, 0, width, 16, 0);
  ellipse(sx, sy, sz, sz);

  var px = map(this.x / this.pz, 0, 1, 0, width);
  var py = map(this.y / this.pz, 0, 1, 0, height);

  this.pz = this.z;

  stroke(255);
  line(px, py, sx, sy);
};

StartClass.prototype.update = function() {
  this.z -= speed;
  if (this.z < 0) {
    this.z = width;
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.pz = this.z;
  }
};
