var speed;
var starts = new Array(100);
var timeElapsed;
function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < starts.length; i++) {
    starts[i] = new StartClass();
  }
  this.timeElapsed = new Date().getTime();
}

function draw() {
  background(0);
  speed = map(mouseX, 0, width, 8, 12, true);
  translate(width / 2, height / 2);

  var now = new Date().getTime();
  var distance = now - this.timeElapsed;

  for (let i = 0; i < starts.length; i++) {
    if (distance / 1000 > .001) {
      //console.log("MOVE");
    }
    starts[i].update();
    starts[i].show();
  }

  if (distance / 1000 > .001) {
    this.timeElapsed = now;
  }
}
