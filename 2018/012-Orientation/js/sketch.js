'use strict';

// Generated by CoffeeScript 2.0.3
var canvas, draw, h, mode, ratio, setup, w;

canvas = null;

mode = 'P';

ratio = 1;

w = null;

h = null;

setup = function setup() {
  var readDeviceOrientation;

  //c = document.createElement 'canvas'
  //context = c.getContext '2d'
  //document.body.appendChild c
  //devicePixelRatio = window.devicePixelRatio || 1
  //backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1
  //ratio = devicePixelRatio / backingStoreRatio
  w = window.innerWidth;
  h = window.innerHeight;
  //c.width = w * ratio
  //c.height = h * ratio
  //c.style.width = w + 'px'
  //c.style.height = h + 'px'
  ratio = 1;
  canvas = createCanvas(w, h);
  //canvas.parent = c
  textAlign(CENTER, CENTER);
  textSize(20);
  readDeviceOrientation = function readDeviceOrientation() {
    var ref;
    w = window.innerWidth;
    h = window.innerHeight;
    if ((ref = window.orientation) === -90 || ref === 90) {
      resizeCanvas(h * ratio, w * ratio);
      //canvas.position 0, 0
      return mode = 'L';
    } else {
      resizeCanvas(w * ratio, h * ratio);
      //canvas.position 0, 0
      return mode = 'P';
    }
  };
  window.onorientationchange = readDeviceOrientation;
  return readDeviceOrientation();
};

draw = function draw() {
  bg(0.5);
  text(window.devicePixelRatio, width / 2, 0.15 * height);
  text(window.innerWidth + ' ' + window.innerHeight, width / 2, 0.25 * height);
  text(mode + ' ' + width + ' ' + height, width / 2, 0.50 * height);
  text(screen.width + ' ' + screen.height, width / 2, 0.75 * height);
  return text(ratio, width / 2, 0.85 * height);
};
//# sourceMappingURL=sketch.js.map
