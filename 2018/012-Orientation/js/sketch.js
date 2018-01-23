'use strict';

// Generated by CoffeeScript 2.0.3
var canvas, draw, mode, setup;

canvas = null;

mode = 'P';

setup = function setup() {
  var readDeviceOrientation;
  canvas = createCanvas(windowWidth / 2, windowHeight / 2);
  textAlign(CENTER, CENTER);
  textSize(20);
  readDeviceOrientation = function readDeviceOrientation() {
    var ref;
    if ((ref = window.orientation) === -90 || ref === 90) {
      resizeCanvas(windowWidth / 2, windowHeight / 2);
      canvas.position(0, 0);
      return mode = 'L';
    } else {
      resizeCanvas(windowWidth / 2, windowHeight / 2);
      canvas.position(0, 0);
      return mode = 'P';
    }
  };
  window.onorientationchange = readDeviceOrientation;
  return readDeviceOrientation();
};

draw = function draw() {
  bg(0.5);
  text(windowWidth + ' ' + windowHeight, width / 2, 0.25 * height);
  text(mode + ' ' + width + ' ' + height, width / 2, 0.50 * height);
  return text(screen.width + ' ' + screen.height, width / 2, 0.75 * height);
};
//# sourceMappingURL=sketch.js.map
