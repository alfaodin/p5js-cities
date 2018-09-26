var m_grid;
var startTime;
function setup() {
  createCanvas(1400, 800);

  // Get todays date and time
  this.startTime = new Date().getTime();

  this.m_grid = new Grid(10, 10);
}

function mousePressed() {
  this.m_grid.checkMousePressed(mouseX, mouseY);
}

function draw() {
  background(255);
  this.m_grid.show();

  var now = new Date().getTime();
  var distance = now - this.startTime;

  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  textSize(32);
  text(`${minutes > 9 ? minutes : '0' + minutes} : ${seconds > 9 ? seconds : '0' + seconds}`, 100, 70);
}
