let spritedata;
let spritesheet;
function preload() {
  url = 'horse.json';
  spritedata = loadJSON(url);
  spritesheet = loadImage('horse.png');
}

function setup() {
  createCanvas(1400, 800);

  console.log(spritedata);
}

function draw() {
  background(120);
}
