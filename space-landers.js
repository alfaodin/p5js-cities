var spaceShip = null;
var fuelIndicatorUi = null;

function setup() {
  createCanvas(1400, 800);

  spaceShip = new SpaceShip(width / 2, 40);
  fuelIndicatorUI = new FuelIndicatorUI(10, 10);
}

function draw() {
  background(120);
  spaceShip.update();
  spaceShip.show();

  fuelIndicatorUI.showUI();

  // background(255);
  // line(200, 300, 100, 150);
  // line(mouseX, mouseY, 350, 50);
  // hit = collideLineLine(200, 300, 100, 150, mouseX, mouseY, 350, 50);

  // print('colliding? ' + hit);
}

function keyPressed() {
  spaceShip.startEngines(keyCode);
}

function keyReleased() {
  spaceShip.stopEngines();
}
