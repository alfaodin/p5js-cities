var points;
var spacing;

var i;
var j;
var selectedAlgorithm = -1;
var stopSortOperation = false;

function startNewSortOperation() {
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

  // this.points = new Array();
  // this.points.push(new Item(200 + ((20 - 9) * 20), 9));
  // this.points.push(new Item(200 + ((20 - 3) * 20), 3));
  // this.points.push(new Item(200 + ((20 - 4) * 20), 4));
  // this.points.push(new Item(200 + ((20 - 6) * 20), 6));
  // this.points.push(new Item(200 + ((20 - 5) * 20), 5));
  // this.points.push(new Item(200 + ((20 - 10) * 20), 10));
  // this.points.push(new Item(200 + ((20 - 12) * 20), 12));
  // this.points.push(new Item(200 + ((20 - 1) * 20), 1));
  // this.points.push(new Item(200 + ((20 - 2) * 20), 2));
  // this.points.push(new Item(200 + ((20 - 7) * 20), 7));
  quickSort(this.points, 0, this.points.length - 1);
}

function draw() {
  background(120);

  if (!stopSortOperation) {
    sortAlgorithm(selectedAlgorithm);
  }

  // CADENA DE CARACTERES DEL ARREGLO QUE ESTA SIENDO ORDENADO
  const arrayString = this.points.map(data => data.size).join('-');
  fill(0, 102, 153);
  textSize(16);
  text('Arreglo: ', 10, 22);
  text(arrayString, 10, 52);

  // MOSTRAR LAS BARRAS DE COMPARACION
  for (let i = 0; i < this.points.length; i++) {
    const item = this.points[i];
    item.show(i, this.spacing);
  }
}

function setRamdomArray() {
  i = 0;
  j = 0;
  var arrayLength = Math.floor(width / this.spacing);
  this.points = new Array(arrayLength);

  var x = 40;
  for (let i = 0; i < this.points.length; i++) {
    const size = Math.round(random(20)) + 1;
    this.points[i] = new Item(200 + ((20 - size) * 20), size);
    x += this.spacing;
  }
}

function sortArray(values) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i].size > values[j].size) {
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
function bubbleSort(values) {
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      if (values[j].size > values[j + 1].size) {
        swap(values, j, j + 1);
      }
    }
  }
}

/**
 * Algoritmo de Quick Sort
 * @param {Array} values 
 */
async function quickSort(array, start, end) {
  if (start >= end) {
    return;
  }

  let index = await partition(array, start, end);
  await Promise.all([
    quickSort(array, start, index - 1),
    quickSort(array, index + 1, end)
  ]);
}

async function partition(array, start, end) {
  let index = start;
  for (let i = start; i < array.length; i++) {
    const element = array[i];

    element.state = 3;
    array[end].state = 3;

    //await sleep(100);

    if (element.size < array[end].size) {
      await swapAsync(array, i, index);
      index++;
    } else {
      element.state = 0;
      array[end].state = 0;
    }
  }
  await swapAsync(array, index, end);
  return index;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Metodo de intercambio de elementos
 */
function swap(values, i, j) {
  const aux = values[j];
  values[j] = values[i];
  values[i] = aux;
}

async function swapAsync(values, i, j) {
  console.log('WAIT ' + i);
  values[i].state = 1;
  values[j].state = 2;

  await sleep(100);
  console.log('START ' + i);

  const aux = values[j];
  values[j] = values[i];
  values[i] = aux;

  values[i].state = 0;
  values[j].state = 0;
}

/**
 * Metodo que funciona como factory
 */
function sortAlgorithm(type) {
  switch (type) {
    case 0:
      stepBubbleSort();
      break;
    case 1:
      stepBubbleSortVisualizationImpruved();
      break;
    case 2:
      quickSort();
      break;
  }
}

function stepBubbleSort() {
  if (i < this.points.length && this.points[j].size > this.points[j + 1].size) {
    swap(this.points, j, j + 1);
  }

  if (++j >= this.points.length - i - 1) {
    i++;
    j = 0;
  }
}

function stepBubbleSortVisualizationImpruved() {
  if (i < this.points.length) {
    for (let n = 0; n < this.points.length - 1; n++) {
      if (this.points[n].size > this.points[n + 1].size) {
        swap(this.points, n, n + 1);
      }
    }
    i++;
  }
}


function quickSortStep() {
  if (i < this.points.length) {
    for (let n = 0; n < this.points.length - 1; n++) {
      if (this.points[n].size > this.points[n + 1].size) {
        swap(this.points, n, n + 1);
      }
    }
    i++;
  }
}

function changeTextStopButton() {
  document.getElementById('stopBtn').text = stopSortOperation ? 'START' : 'STOP';
}

/** 
 * Representa los elementos visuales que se ordenan
 */
function Item(y, size) {
  this.pos = createVector(0, y);
  this.size = size;
  this.width = 5;
  this.state = 0;
}

Item.prototype.show = function (index, space) {
  noStroke();
  switch (this.state) {
    case 0:
      fill(255);
      break;
    case 1:
      fill(255, 0, 0);
      break;
    case 2:
      fill(0, 255, 0);
      break;
    case 3:
      fill(0, 0, 255);
      break;
    case 4:
      fill(255, 0, 255);
      break;
  }
  rect(10 + (index * space), this.pos.y, this.width, this.size * 20);
};