// module aliases
var Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var boxA;
var world;
var engine;
var boxes = [];
var circles = [];
var grounds = [];

function setup() {
  createCanvas(800, 800);
  // create an engine
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  grounds.push(new Boundary(width / 2, height, width, 10, 0));
  grounds.push(new Boundary(250, height / 3, 500, 10, (PI * 25) / 180));

  grounds.push(new Boundary(550, 400, 400, 10, 210));
}

function mouseDragged() {
  boxes.push(new Box(mouseX, mouseY, random(10, 40), random(5, 40)));
}
function mousePressed() {
  circles.push(new Circle(mouseX, mouseY, random(10, 20)));
}

function draw() {
  background(65);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
  }

  for (let i = 0; i < grounds.length; i++) {
    grounds[i].show();
  }
}
