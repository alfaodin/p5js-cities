var cnv;
var font;
var points;
var bounds;
var vehicles = [];

var startFollow = false;
var seekVehicle;
var movingVehicle;
var constantMovingVehicle;
var mouseClickPositions = [];

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    cnv = createCanvas(1400, 800);
    textFont(font);
    textSize(128);
    fill(255);
    noStroke();
    text('Christian', 10, 200);
    cnv.mousePressed(storePoinClicked);

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


    //movingVehicle = new Vehicle(random(width), random(height));

    movingVehicle = new Vehicle(10, 400, createVector(200, 300));
    constantMovingVehicle = new Vehicle(10, 450, createVector(200, 350));

    fill(255, 204, 0);
    rect(bounds.x, bounds.y + 100, bounds.w, bounds.h);
}

function draw() {
    background(120);

    /*for (let i = 0; i < vehicles.length; i++) {
        const element = vehicles[i];
        element.behaviorsFleeAndArrive();
        element.update();
        element.show();
    }

    for (let i = 0; i < mouseClickPositions.length; i++) {
        const element = mouseClickPositions[i];
        const nextElement = mouseClickPositions[i + 1];

        if (nextElement) {
            stroke(80);
            strokeWeight(1);
            fill(80);
            line(element.x, element.y, nextElement.x, nextElement.y);
        }

        stroke(100);
        strokeWeight(3);
        fill(100);
        ellipse(element.x, element.y, 10, 10);
    }

    if (startFollow) seekVehicle.behaviorsFollowPoinst(mouseClickPositions);
    seekVehicle.update();
    seekVehicle.show();*/


    movingVehicle.moveAround();
    movingVehicle.update();
    movingVehicle.show();

    constantMovingVehicle.moveConstantSpeed();
    constantMovingVehicle.show();
}

function startFollowEvent() {
    this.startFollow = !this.startFollow;
}

function storePoinClicked(evt) {
    mouseClickPositions.push(createVector(mouseX, mouseY));
}