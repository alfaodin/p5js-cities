function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = createVector(); //p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.currentIndex = 0;
  this.currentPoint = undefined;
}

Vehicle.prototype.behaviorsSeek = function() {
  var mouse = createVector(mouseX, mouseY);
  var seek = this.arrive2(mouse);
  this.applyForce(seek);
};

Vehicle.prototype.behaviorsFollowPoinst = function(points = []) {
  if (points.length > 0) {
    if (!this.currentPoint) {
      this.currentPoint = points[this.currentIndex];
    }

    if (this.currentPoint) {
      var seek = this.arrive2(this.currentPoint);

      var toTarget = p5.Vector.sub(this.currentPoint, this.pos);
      var dist = toTarget.mag();
      
      if (dist <= 1) {
        console.log('CAmbio');
        
        this.currentPoint = points[++this.currentIndex];
        if(this.currentIndex > points.length){
          this.currentPoint = 0;
        }
        //points.shift();
      }
      this.applyForce(seek);
    }
  }
};

Vehicle.prototype.behaviorsFleeAndArrive = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
};

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function() {
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
};

Vehicle.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.pos).normalize();
  desired = p5.Vector.mult(desired, this.maxspeed);

  var steer = p5.Vector.sub(desired, this.vel);
  return steer;
};

Vehicle.prototype.flee2 = function(target) {
  var desired = p5.Vector.sub(this.pos, target).normalize();
  desired = p5.Vector.mult(desired, this.maxspeed);

  var steer = p5.Vector.sub(desired, this.vel);
  return steer;
};

Vehicle.prototype.arrive2 = function(target) {
  var decelerationTweaker = 10;
  var toTarget = p5.Vector.sub(target, this.pos);
  var dist = toTarget.mag();

  if (dist > 0) {
    var speed = dist / decelerationTweaker;

    speed = min(speed, this.maxspeed);

    var desiredVelosity = p5.Vector.mult(toTarget, speed / dist);
    var steer = p5.Vector.sub(desiredVelosity, this.vel);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Vehicle.prototype.drawArrow = function(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(this.pos.x, this.pos.y, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
};
