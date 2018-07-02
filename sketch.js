var mapa = null;
function setup() {
  createCanvas(1400, 600);
  mapa = new CityMap();
}

function draw() {
  background(220);
  mapa.draw();
}

function mousePressed() {
  mapa.mousePressed();
}

function buscar() {
  mapa.buscar(
    document.getElementById('ciudadA').value,
    document.getElementById('ciudadB').value
  );
}

class CityMap {
  constructor() {
    this.currentTime = 0;
    this.drawPath = false;
    this.currentRoute = 0;
    this.currentCityIndex = 0;
    this.cities = [];
    this.posiblesCities = [];
    this.cities.push(new City(0, 0, 'A'));
    this.cities.push(new City(250, 250, 'B'));
    this.cities.push(new City(250, -250, 'C'));
    this.cities.push(new City(-250, -250, 'D'));
    this.cities.push(new City(-250, 250, 'E'));

    this.cities.push(new City(-250, 50, 'F'));
    this.cities.push(new City(350, 150, 'G'));
    this.cities.push(new City(-650, 180, 'H'));
    this.cities.push(new City(650, 180, 'I'));
    this.cities.push(new City(750, 80, 'J'));

    this.cities.push(new City(750, -120, 'K'));
    this.cities.push(new City(30, -170, 'L'));

    this.cities.push(new City(-750, -120, 'M'));
    this.cities.push(new City(-450, -10, 'N'));

    this.cities[0].createJoin(this.cities[1]);
    this.cities[1].createJoin(this.cities[0]);
    this.cities[0].createJoin(this.cities[2]);
    this.cities[0].createJoin(this.cities[3]);
    this.cities[0].createJoin(this.cities[4]);

    this.cities[1].createJoin(this.cities[6]);
    this.cities[6].createJoin(this.cities[8]);

    this.cities[8].createJoin(this.cities[2]);

    this.cities[2].createJoin(this.cities[11]);

    this.cities[0].createJoin(this.cities[5]);

    this.cities[3].createJoin(this.cities[13]);
    this.cities[13].createJoin(this.cities[7]);

    this.cities[2].createJoin(this.cities[1]);
    this.cities[2].createJoin(this.cities[1]);

    this.cities[4].createJoin(this.cities[11]);

    this.cities[11].createJoin(this.cities[3]);
    this.cities[11].createJoin(this.cities[5]);
    this.cities[4].createJoin(this.cities[5]);
    this.cities[4].createJoin(this.cities[13]);
    this.cities[2].createJoin(this.cities[3]);
    this.cities[3].createJoin(this.cities[5]);

    this.cities[1].createJoin(this.cities[4]);
    this.cities[8].createJoin(this.cities[1]);
    this.cities[8].createJoin(this.cities[1]);
    this.cities[13].createJoin(this.cities[5]);
    this.cities[5].createJoin(this.cities[4]);
  }

  draw() {
    // Draw all the joins
    this.cities.forEach(city => city.drawJoin());

    this.cities.forEach(city => city.drawCity());

    if (this.drawPath) {
      var actualTime = new Date().getTime();
      if (actualTime - this.currentTime > 800) {
        this.currentTime = new Date().getTime();

        if (this.currentRoute < this.posiblesCities.length) {
          var citiesInRoute = this.posiblesCities[this.currentRoute];
          if (this.currentCityIndex < citiesInRoute.length) {
            var visitedCity = citiesInRoute[this.currentCityIndex];
            this.currentCityIndex++;

            var cityTo = null;
            if (this.currentCityIndex < citiesInRoute.length) {
              cityTo = citiesInRoute[this.currentCityIndex];
            }
            visitedCity.drawRouteFunc(cityTo);
          } else {
            citiesInRoute.forEach(city => city.reset());
            this.currentRoute++;
            this.currentCityIndex = 0;
          }
        } else {
          this.drawPath = false;
        }
      }
    }
  }

  buscar(cityAName, cityBName) {
    this.cities.forEach(city => city.reset());

    var cityA = this.cities.find(city => city.text === cityAName);
    var cityB = this.cities.find(city => city.text === cityBName);

    if (cityA && cityB) {
      this.posiblesCities = [];

      this.getFullPosiblesPath(cityA, cityB);
      console.log(this.posiblesCities);
      this.drawPath = true;
      this.currentRoute = 0;
      this.currentCityIndex = 0;
    }
  }

  getPath(sourceCity, destinationCity, visitedCities = new Set()) {
    if (visitedCities.has(sourceCity)) {
      return false;
    }
    visitedCities.add(sourceCity);
    if (sourceCity === destinationCity) {
      return true;
    }

    for (let index = 0; index < sourceCity.joins.length; index++) {
      const join = sourceCity.joins[index];
      if (this.getPath(join.cityB, destinationCity, visitedCities)) {
        return true;
      }
    }
    return false;
  }

  getFullPosiblesPath(sourceCity, destinationCity, visitedCities = new Set()) {
    if (visitedCities.has(sourceCity)) {
      return false;
    }
    visitedCities.add(sourceCity);
    if (sourceCity === destinationCity) {
      return true;
    }

    for (let index = 0; index < sourceCity.joins.length; index++) {
      const join = sourceCity.joins[index];
      if (
        this.getFullPosiblesPath(join.cityB, destinationCity, visitedCities)
      ) {
        this.posiblesCities.push(Array.from(visitedCities));
        visitedCities.delete(join.cityB);
      }
    }
    visitedCities.delete(sourceCity);
    return false;
  }

  mousePressed() {
    this.cities.forEach(city => city.reset());
    this.cities.forEach(city => city.selectCity(mouseX, mouseY));
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

  drawCity() {
    var col = this.drawRoute ? color(255, 0, 0) : color(this.r, this.g, this.b);
    stroke(col);
    fill(col, 227);
    ellipse(this.x, this.y, this.radio * 2, this.radio * 2);

    textSize(22);
    stroke(0);
    text(this.text, this.x - 5, this.y + 10);
  }

  drawJoin() {
    var col = this.drawRoute ? color(255, 0, 0) : color(this.r, this.g, this.b);
    stroke(col);
    fill(col, 227);
    ellipse(this.x, this.y, this.radio * 2, this.radio * 2);
    this.joins.forEach(join => join.draw(this.isSelected));
  }

  drawRouteFunc(cityRoute) {
    this.drawRoute = true;
    if (cityRoute) {
      var route = this.joins.find(join => join.cityB === cityRoute);
      route.selectedRoute = true;
    }
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

  // NO funciona con caminos dobles, recursividad infinita
  getPathByBruteForce(destinationCity) {
    var routeCities = [];
    for (let index = 0; index < this.joins.length; index++) {
      const ruta = this.joins[index];
      if (ruta.cityB === destinationCity) {
        routeCities.push(ruta);
        break;
      } else {
        routeCities = ruta.cityB.getPathByBruteForce(destinationCity);
        if (routeCities.length > 0) {
          routeCities.unshift(ruta);
          break;
        }
      }
    }
    return routeCities;
  }

  reset() {
    this.drawRoute = false;
    this.isSelected = false;
    this.joins.forEach(join => join.reset());
  }
}

class Join {
  constructor(cityA, cityB) {
    this.currentTime = 0;
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

    this.increment = 0;

    this.hNoRadios = this.h - (this.cityA.radio + this.cityB.radio);
  }

  draw(isSelected) {
    strokeWeight(1);
    stroke(20, 20, 20);
    line(this.joinCityAX, this.joinCityAY, this.joinCityBX, this.joinCityBY);

    if (this.selectedRoute || isSelected) {
      var time = new Date().getTime();
      if (time - this.currentTime > 60 && this.increment < 100) {
        this.currentTime = new Date().getTime();

        this.increment += 10;
      }

      var hipotenusa = this.hNoRadios * (this.increment / 100);
      var testBx = this.joinCityAX + hipotenusa * Math.cos(this.angleCityA);
      var testBy = this.joinCityAY + hipotenusa * Math.sin(this.angleCityA);
      strokeWeight(4);
      stroke(200, 200, 20);
      line(this.joinCityAX, this.joinCityAY, testBx, testBy);
    }

    stroke(196);
    ellipse(this.joinCityBX, this.joinCityBY, 14, 14);
  }

  reset() {
    this.increment = 0;
    this.currentTime = 0;
    this.selectedRoute = false;
  }
}
