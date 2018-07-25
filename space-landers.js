var spaceShip = null;
var caveGenerator = null;
var fuelIndicatorUi = null;

function setup() {
  createCanvas(1400, 800);

  caveGenerator = new CaveGenerator(width, height);
  spaceShip = new SpaceShip(width / 2, height/2);
  fuelIndicatorUI = new FuelIndicatorUI(10, 10);
}

function draw() {
  background(120);
  spaceShip.update();
  spaceShip.show();

  caveGenerator.checkCollision(spaceShip);
  caveGenerator.show();
  fuelIndicatorUI.showUI();

  // background(255);
	// rect(200,300,100,150);
	// line(mouseX,mouseY,150,150);

	// hit = collideLineRect(150,150,mouseX,mouseY,200,300,100,150);

	// print("colliding? " + hit);
}

function keyPressed() {
  spaceShip.startEngines(keyCode);
}

function keyReleased() {
  spaceShip.stopEngines();
}
