var spaceShip = null;
var fuelIndicatorUi= null;

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
}

function keyPressed() {
  spaceShip.startEngines(keyCode);
}

function keyReleased() {
  spaceShip.stopEngines();
}

