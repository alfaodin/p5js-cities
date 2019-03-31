var points;
var spacing;

var i;
var j;
var selectedAlgorithm = -1;
var stopSortOperation = false;

function startNewSortOperation(){
  stop();
  setRamdomArray();
}

function setSortAlgorithm(algorithm) {
  selectedAlgorithm = algorithm; 
}

function stop() {
  stopSortOperation = !stopSortOperation;
  
}

function setup() {
  createCanvas(1400, 800);
  textSize(32);

  spacing = 20;
  setRamdomArray();
  
}

function draw() {
  background(120);

  if(!stopSortOperation){
    sortAlgorithm (selectedAlgorithm);
  }

  // CADENA DE CARACTERES DEL ARREGLO QUE ESTA SIENDO ORDENADO
  const arrayString = this.points.map(data => data.size).join('-');
  fill(0, 102, 153);
  text('Arreglo: ' + arrayString, 10, 40);

  // MOSTRAR LAS BARRAS DE COMPARACION
  for (let i = 0; i < this.points.length; i++) {
    const item = this.points[i];
    item.show(i, this.spacing);
  }
}

function setRamdomArray(){
  i = 0;
  j = 0;
  var arrayLength = Math.floor(width / this.spacing);
  this.points = new Array(arrayLength);

  var x = 40;
  for (let i = 0; i < this.points.length; i++) {
    const size = Math.round(random(20));
    this.points[i] = new Item(200 +( (20 - size)* 20), size);
    x += this.spacing;
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

/**
 * Algoritmo de Bubble Sort
 * @param {Array} values 
 */
function bubbleSort(values){
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1 ; j++) {
      if(values[j].size > values[j + 1].size){
        swap(values, j, j + 1);
      }
    }
  }
}

/**
 * Metodo de intercambio de elementos
 */
function swap(values, i, j){
  const aux = values[j];
  values[j] = values[i];
  values[i] = aux;
}

/**
 * Metodo que funciona como factory
 */
function sortAlgorithm(type){
  switch (type) {
    case 0:
      stepBubbleSort();
      break;
    case 1:
      stepBubbleSortVisualizationImpruved();
      break;
  }
}

function stepBubbleSort(){
  if(i < this.points.length && this.points[j].size > this.points[j + 1].size){
    swap(this.points, j, j + 1);
  }
  
  if(++j >= this.points.length - i - 1){
    i++;
    j = 0;
  }
}

function stepBubbleSortVisualizationImpruved(){
  if(i < this.points.length){
    for (let n = 0; n < this.points.length -1; n++) {
      if(this.points[n].size > this.points[n + 1].size){
        swap(this.points, n, n + 1);
      }
    }
    i++;
  }
}

function changeTextStopButton(){
  document.getElementById('stopBtn').text =  stopSortOperation ? 'START' : 'STOP';
}

/** 
 * Representa los elementos visuales que se ordenan
 */
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