var cities = [];
function setup() {
  createCanvas(1400, 600);

  cities.push(new City(0, 0, 'A'));
  cities.push(new City(250, 250, 'B'));
  cities.push(new City(250, -250, 'C'));
  cities.push(new City(-250, -250, 'D'));
  cities.push(new City(-250, 250, 'E'));

  cities.push(new City(-250, 50, 'F'));
  cities.push(new City(350, 150, 'G'));
  cities.push(new City(-650, 180, 'H'));
  cities.push(new City(650, 180, 'I'));
  cities.push(new City(750, 80, 'J'));

  cities.push(new City(750, -120, 'K'));
  cities.push(new City(30, -170, 'L'));

  cities.push(new City(-750, -120, 'M'));
  cities.push(new City(-450, -10, 'N'));

  cities[0].createJoin(cities[1]);
  cities[0].createJoin(cities[2]);
  cities[0].createJoin(cities[3]);
  cities[0].createJoin(cities[4]);

  cities[1].createJoin(cities[6]);
  cities[6].createJoin(cities[8]);

  cities[8].createJoin(cities[2]);

  cities[2].createJoin(cities[11]);

  cities[0].createJoin(cities[5]);

  cities[3].createJoin(cities[13]);
  cities[13].createJoin(cities[7]);
}

function draw() {
  background(220);
  cities.forEach(city => city.draw());
}

function mousePressed() {
  cities.forEach(city => city.reset());
  cities.forEach(city => city.selectCity(mouseX, mouseY));
}

function buscar() {
  cities.forEach(city => city.reset());
  var cityAName = document.getElementById('ciudadA').value;
  var cityBName = document.getElementById('ciudadB').value;

  var cityA = cities.find(city => city.text === cityAName);
  var cityB = cities.find(city => city.text === cityBName);

  if (cityA && cityB) {
    var routes = cityA.test(cityB);
    if (routes.length > 0) {
      cityA.drawRoute = true;
      routes.forEach(ruta => {
        ruta.selectedRoute = true;
        ruta.cityB.drawRoute = true;
      });
    }
  }
}

class City {
  constructor(x, y, text) {
    this.x = width * 0.5 + x;
    this.y = height * 0.5 - y;
    this.radio = 40;
    this.joins = [];
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.drawRoute = false;
    this.isSelected = false;
    this.text =
      text ||
      Math.random()
        .toString(30)
        .substr(2, 1);
  }

  draw() {
    var col = this.drawRoute ? color(255, 0, 0) : color(this.r, this.g, this.b);
    stroke(col);
    fill(col, 227);
    ellipse(this.x, this.y, this.radio * 2, this.radio * 2);
    this.joins.forEach(join => join.draw(this.isSelected));

    textSize(22);
    stroke(0);
    text(this.text, this.x - 5, this.y + 10);
  }

  selectCity(mouseX, mouseY) {
    var result = false;
    if (!this.isSelected) {
      // Check if mouse is inside the circle
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.radio) {
        // Pick new random color values
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        result = true;
      }
    }

    this.isSelected = result;
    return result;
  }

  findCityByName(name) {
    var result = this.text === name;
    return result ? this : null;
  }

  selectCityByName(...names) {
    var result = names.find(name => this.text === name);
    this.isSelected = result ? true : false;
    return result;
  }

  createJoin(city) {
    this.joins.push(new Join(this, city));
  }

  test(destinationCity) {
    var routeCities = [];
    for (let index = 0; index < this.joins.length; index++) {
      const ruta = this.joins[index];
      if (ruta.cityB === destinationCity) {
        routeCities.push(ruta);
        break;
      } else {
        routeCities = ruta.cityB.test(destinationCity);
        if (routeCities.length > 0) {
          routeCities.unshift(ruta);
          break;
        }
      }
    }
    return routeCities;
  }

  reset(){
    this.drawRoute = false;
    this.isSelected = false;
    this.joins.forEach(join => join.selectedRoute = false);
  }
}

class Join {
  constructor(cityA, cityB) {
    this.cityA = cityA;
    this.cityB = cityB;
    this.selectedRoute = false;

    this.h = Math.sqrt(
      Math.pow(this.cityA.x - this.cityB.x, 2) +
        Math.pow(this.cityA.y - this.cityB.y, 2)
    );
    this.angleCityA = Math.atan2(
      this.cityB.y - this.cityA.y,
      this.cityB.x - this.cityA.x
    );

    this.angleCityB = Math.atan2(
      this.cityA.y - this.cityB.y,
      this.cityA.x - this.cityB.x
    );

    this.joinCityAX =
      this.cityA.x + this.cityA.radio * Math.cos(this.angleCityA);
    this.joinCityAY =
      this.cityA.y + this.cityA.radio * Math.sin(this.angleCityA);

    this.joinCityBX =
      this.cityB.x + this.cityB.radio * Math.cos(this.angleCityB);
    this.joinCityBY =
      this.cityB.y + this.cityB.radio * Math.sin(this.angleCityB);
  }

  draw(isSelected) {
    strokeWeight(isSelected || this.selectedRoute ? 4 : 1);
    stroke(20, 20, 20);
    line(this.joinCityAX, this.joinCityAY, this.joinCityBX, this.joinCityBY);

    stroke(196);
    ellipse(this.joinCityBX, this.joinCityBY, 14, 14);
  }
}
