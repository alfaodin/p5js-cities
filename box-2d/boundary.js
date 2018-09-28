function Boundary(x, y, w, h, angle) {
  this.w = w;
  this.h = h;
  var options = {
    isStatic: true,
    angle: angle
  };
  this.body = Bodies.rectangle(x, y, w, h, options);

  World.add(world, [this.body]);
}

Boundary.prototype.show = function() {
  var pos = this.body.position;
  var angle = this.body.angle;

  push();

  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  noStroke();
  fill(0);
  rect(0, 0, this.w, this.h);
  pop();
};
