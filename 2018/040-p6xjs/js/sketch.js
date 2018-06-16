"use strict";

// Generated by CoffeeScript 2.0.3
var btnLeft, btnRight, draw, earth, message, moon, mouseMoved, mousePressed, setup, sun;

btnLeft = null;

btnRight = null;

sun = null;

earth = null;

moon = null;

message = "";

setup = function setup() {
  var moved;
  createCanvas(600, 600);
  angleMode(DEGREES);
  textSize(20);
  textAlign(CENTER, CENTER);
  moved = function moved(m) {
    return this.strokeWeight = this.contains(m) ? 3 : 1;
  };
  btnLeft = p6.circle(100, 100, 50);
  btnLeft.title("Left");
  btnLeft.moved = moved;
  btnLeft.pressed = function () {
    return sun.move(-10, 0);
  };
  btnRight = p6.regular(500, 100, 50, 6);
  btnRight.title("Right");
  btnRight.moved = moved;
  btnRight.pressed = function () {
    return sun.move(10, 0);
  };
  sun = p6.circle(300, 300, 80);
  sun.title('s');
  sun.fill("#ff0");
  sun.moved = moved;
  sun.pressed = function () {
    return message = this.txt;
  };
  earth = p6.ellipse(200, 0, 80, 60, sun);
  earth.title('e');
  earth.fill("#00f");
  earth.moved = moved;
  earth.pressed = function () {
    return message = this.txt;
  };
  moon = p6.circle(80, 0, 15, earth);
  moon.title('m');
  moon.fill("#fff");
  moon.moved = moved;
  return moon.pressed = function () {
    return message = this.txt;
  };
};

draw = function draw() {
  bg(0.5);
  stage.draw();
  btnRight.rotation += 0.2;
  sun.rotation += 0.05;
  earth.rotation += 0.2;
  return text(message, width / 2, 100);
};

mouseMoved = function mouseMoved() {
  return stage.mouseMoved();
};

mousePressed = function mousePressed() {
  return stage.mousePressed();
};
//# sourceMappingURL=sketch.js.map
