var points;
var spacing;

var i;
var j;

function setup() {
  createCanvas(1000, 800);
  textSize(32);

  this.spacing = 20;
  var arrayLength = Math.floor(width / this.spacing);
  this.points = new Array(arrayLength);

  var x =40;
  for (let i = 0; i < this.points.length; i++) {
    const size = Math.round(random(20));
    this.points[i] = new Item(200 +( (20 - size)* 20), size);
    x += this.spacing;
  }

  i = 0;
  j = 0;
  // this.bubbleSort(this.points);
}

function draw() {
  background(120);

  if(i < this.points.length && this.points[j].size > this.points[j + 1].size){
    swap(this.points, j, j + 1);
  }
  
  if(++j >= this.points.length - i - 1){
    i++;
    j = 0;
  }


  const arrayString = this.points.map(data => data.size).join('-');
  fill(0, 102, 153);
  text('Arreglo ' + arrayString, 10, 40);

  for (let i = 0; i < this.points.length; i++) {
    const item = this.points[i];
    item.show(i, this.spacing);
  }
}

function sortArray(values){
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if(values[i].size > values[j].size){
        const aux = values[j];
        values[j] = values[i];
        values[i] = aux;
      }
    }
  }
}

function bubbleSort(values){
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1 ; j++) {
      if(values[j].size > values[j + 1].size){
        swap(values, j, j + 1);
      }
    }
  }
}

function swap(values, i, j){
  const aux = values[j];
  values[j] = values[i];
  values[i] = aux;
}

function Item(y, size){
  this.pos = createVector(0, y);
  this.size = size;
  this.width = 5;
}

Item.prototype.show = function(index, space) {
  stroke(255);
  strokeWeight(8);
  rect(10  + (index * space) , this.pos.y, this.width, this.size * 20);
};