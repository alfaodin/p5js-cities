function Circle(x, y, r) {
  this.r = r;
  var options = {
    friction: 0.4,
    restitution: .8
  };
  this.body = Bodies.circle(x, y, r, options);

  World.add(world, [this.body]);
}

Circle.prototype.show = function() {
  var pos = this.body.position;
  var angle = this.body.angle;

  push();

  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  strokeWeight(1);
  stroke(255);
  fill(127);
  ellipse(0, 0, this.r * 2, this.r * 2);
  pop();
};
