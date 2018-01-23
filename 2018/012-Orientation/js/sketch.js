'use strict';

// Generated by CoffeeScript 2.0.3
var canvas, draw, mode, ratio, setup;

canvas = null;

mode = 'P';

ratio = 1;

setup = function setup() {
  var backingStoreRatio, c, context, devicePixelRatio, h, readDeviceOrientation, w;
  c = document.createElement('canvas');
  context = c.getContext('2d');
  document.body.appendChild(c);
  devicePixelRatio = window.devicePixelRatio || 1;
  backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  ratio = devicePixelRatio / backingStoreRatio;
  w = window.innerWidth;
  h = window.innerHeight;
  c.width = w * ratio;
  c.height = h * ratio;
  c.style.width = w + 'px';
  c.style.height = h + 'px';
  canvas = createCanvas(window.innerWidth / 2, window.innerHeight / 2);
  canvas.parent = c;
  textAlign(CENTER, CENTER);
  textSize(20);
  readDeviceOrientation = function readDeviceOrientation() {
    var ref;
    if ((ref = window.orientation) === -90 || ref === 90) {
      resizeCanvas(window.innerHeight / 2 * ratio, window.innerWidth / 2 * ratio);
      canvas.position(0, 0);
      return mode = 'L';
    } else {
      resizeCanvas(window.innerWidth / 2 * ratio, window.innerHeight / 2 * ratio);
      canvas.position(0, 0);
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
