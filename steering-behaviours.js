var font;
var points;
var bounds;
var vehicles = [];

var seekVehicle;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(1400, 800);
  textFont(font);
  textSize(128);
  fill(255);
  noStroke();
  text('Christian', 10, 200);

  points = font.textToPoints('Christian', 10, 200, 128, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
  bounds = font.textBounds('Christian', 10, 200, 128);

  for (let i = 0; i < points.length; i++) {
    const element = points[i];
    // stroke(0, 255, 0);
    // strokeWeight(4);
    // point(element.x, element.y);

    var vehicle = new Vehicle(element.x, element.y);
    vehicles.push(vehicle);
  }

  seekVehicle = new Vehicle(width / 2, height / 2);

  fill(255, 204, 0);
  rect(bounds.x, bounds.y + 100, bounds.w, bounds.h);
}

function draw() {
  background(120);

  // for (let i = 0; i < vehicles.length; i++) {
  //   const element = vehicles[i];
  //   element.behaviorsFleeAndArrive();
  //   element.update();
  //   element.show();
  // }

  seekVehicle.behaviorsSeek();
  seekVehicle.update();
  seekVehicle.show();
}

function mousePressed() {}
