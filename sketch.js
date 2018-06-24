var cities = [];
function setup() {
  createCanvas(1400, 600);
  cities.push(new City(280, 40));

  cities.push(new City(50, 120));

  cities.push(new City(1350, 320));

  cities.push(new City(650, 420));

  cities.push(new City(850, 520));

  cities.push(new City(450, 520));

  cities.push(new City(480, 400));

  cities.push(new City(100, 190));

  cities[0].createJoin(cities[1]);
  cities[6].createJoin(cities[7]);
  cities[1].createJoin(cities[2]);
  cities[3].createJoin(cities[2]);
}

function draw() {
  background(220);
  cities.forEach(city => city.draw());
}

class City {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radio = 40;
    this.joins = [];
  }

  draw() {
    this.joins.forEach(join => join.draw());
    ellipse(this.x, this.y, this.radio * 2, this.radio * 2);
  }

  createJoin(city) {
    this.joins.push(new Join(this, city));
  }
}

class Join {
  constructor(cityA, cityB) {
    this.cityA = cityA;
    this.cityB = cityB;

    // this.h = Math.sqrt(Math.pow(this.cityA.x - this.cityB.x, 2) + Math.pow(this.cityA.y - this.cityB.y, 2));
    // this.angleCityA = Math.acos((this.cityA.x - this.cityB.x) / this.h) * 180 / Math.PI;
    // this.angleCityB = Math.acos((this.cityB.x - this.cityA.x) / this.h) * 180 / Math.PI;

    // this.joinCityAX = this.cityA.x - this.cityA.radio * Math.cos(this.angleCityA);
    // this.joinCityAY = this.cityA.y - this.cityA.radio * Math.sin(this.angleCityA);

    // this.joinCityBX = this.cityB.x + this.cityB.radio * Math.cos(this.angleCityB);
    // this.joinCityBY = this.cityB.y + this.cityB.radio * Math.sin(this.angleCityB);
  }

  draw() {
    //line(this.joinCityAX, this.joinCityAY, this.joinCityBX, this.joinCityBY);
    //stroke(166);
    line(this.cityA.x, this.cityA.y, this.cityB.x, this.cityB.y);
    stroke(126);
    // ellipse( this.cityB.x, this.cityB.y, 90, 5);
    // stroke(196);
  }
}