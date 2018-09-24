var m_grid;

function setup() {
  createCanvas(1400, 800);

  this.m_grid = new Grid(10, 10);

}

function draw() {
  background(120);

  this.m_grid.show();
}
