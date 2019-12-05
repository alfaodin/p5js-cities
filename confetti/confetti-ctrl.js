var speed;
var fireworks = new Array(100);

function setup() {
  createCanvas(800, 800);
  stroke(255);
  strokeWeight(4);

  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i] = new Particle(random(width), random(height / 2));
  }

}

function draw() {
  background(0);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].show();
  }
}
