var m_grid;

function setup() {
  createCanvas(1400, 800);

  this.m_grid = new Grid(10, 10);
}

function mousePressed() {
  this.m_grid.checkMousePressed(mouseX, mouseY);
}

function draw() {
  background(255);
  this.m_grid.show();
}
