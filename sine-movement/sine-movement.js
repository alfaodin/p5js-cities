var r;
var pos;
var angle;
var amplitud;

var points;
var spacing;

function setup() {
  createCanvas(1400, 800);
  this.r = 10;
  this.angle = 0;
  this.spacing = 50;
  this.amplitud = 100;
  this.pos = createVector(10, height / 2);
  var arrayLength = Math.floor(width / this.spacing);
  this.points = new Array(arrayLength);

  var x = 10;
  for (let i = 0; i < this.points.length; i++) {
    this.points[i] = x;
    x += this.spacing;
  }
}

function draw() {
  background(120);

  stroke(255);
  strokeWeight(this.r);
  for (let i = 0; i < this.points.length; i++) {
    const x = this.points[i];
    point(x, Math.sin(x + this.angle) * this.amplitud + height / 2);
  }
  this.angle += 0.05;
}
