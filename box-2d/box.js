function Box(x, y, w, h) {
  this.w = w;
  this.h = h;
  var options = {
    friction: 0,
    restitution: 1
  };
  this.body = Bodies.rectangle(x, y, w, h, options);

  World.add(world, [this.body]);
}

Box.prototype.show = function() {
  var pos = this.body.position;
  var angle = this.body.angle;

  push();

  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  strokeWeight(1);
  stroke(255);
  fill(127);
  rect(0, 0, this.w, this.h);
  pop();
};
