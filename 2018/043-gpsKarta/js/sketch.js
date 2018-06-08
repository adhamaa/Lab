'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
var A, B, C, D, DATA, E, FILENAME, HEIGHT, SCALE, TRACKED, WIDTH, bearing, buttons, corner, cx, cy, draw, drawButtons, drawCompass, drawPoints, drawTrack, fetchData, gps, hortal, img, locationUpdate, locationUpdateFail, makeCorners, mousePressed, mouseReleased, mouseTouched, myround, points, position, preload, released, setup, setupCompass, show, spara, storeData, track, vercal;

FILENAME = 'karta.jpg';

spara = function spara(lat, lon, x, y) {
  return { lat: lat, lon: lon, x: x, y: y };
};

B = spara(59.300593, 18.163456, 5422, 158);

A = spara(59.300736, 18.125648, 554, 433);

C = spara(59.265339, 18.159501, 5384, 9114);

D = spara(59.281411, 18.122435, 338, 5298); // Sockenvägen/Ätravägen

E = spara(59.266262, 18.144961, 3496, 8980); // Garden Center

DATA = "gpsKarta";

WIDTH = 6912;

HEIGHT = 9216;

cx = 0;
cy = 0 // center (image coordinates)
;


SCALE = 1;

released = true; // to make Android work

gps = null;

TRACKED = 5; // circles shows the player's position

position = null; // gps position (pixels)

track = []; // five latest GPS positions (pixels)

buttons = [];

points = []; // remembers e.g. car/bike position

img = null;

bearing = 360;

preload = function preload() {
  return img = loadImage(FILENAME);
};

myround = function myround(x) {
  var dec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

  x *= Math.pow(10, dec);
  x = round(x);
  return x / Math.pow(10, dec);
};

show = function show(prompt, p) {
  return print(prompt, 'http://maps.google.com/maps?q=' + p.lat + ',' + p.lon);
};

vercal = function vercal(a, b, y) {
  var lat, lon, x;
  x = map(y, a.y, b.y, a.x, b.x);
  lat = map(y, a.y, b.y, a.lat, b.lat);
  lon = map(y, a.y, b.y, a.lon, b.lon);
  return { lat: lat, lon: lon, x: x, y: y };
};

hortal = function hortal(a, b, x) {
  var lat, lon, y;
  y = map(x, a.x, b.x, a.y, b.y);
  lat = map(x, a.x, b.x, a.lat, b.lat);
  lon = map(x, a.x, b.x, a.lon, b.lon);
  return { lat: lat, lon: lon, x: x, y: y };
};

corner = function corner(a, b, c, d, x, y) {
  var lat, lon;
  lon = map(x, a.x, b.x, a.lon, b.lon);
  lat = map(y, c.y, d.y, c.lat, d.lat);
  return { lat: lat, lon: lon, x: x, y: y };
};

makeCorners = function makeCorners() {
  var P1, P2, P3, P4, ab0, ab1, ad0, ad1, bc0, bc1, ec0, ec1, ne, nw, se, sw;
  ad0 = vercal(A, D, 0);
  ad1 = vercal(A, D, HEIGHT);
  bc0 = vercal(B, C, 0);
  bc1 = vercal(B, C, HEIGHT);
  ab0 = hortal(A, B, 0);
  ab1 = hortal(A, B, WIDTH);
  ec0 = hortal(E, C, 0);
  ec1 = hortal(E, C, WIDTH);
  nw = corner(ad0, bc0, ab0, ec0, 0, 0);
  ne = corner(ad0, bc0, ab1, ec1, WIDTH, 0);
  se = corner(ad1, bc1, ab1, ec1, WIDTH, HEIGHT);
  sw = corner(ad1, bc1, ab0, ec0, 0, HEIGHT);
  gps = new GPS(nw, ne, se, sw, WIDTH, HEIGHT);
  // Testpunkter
  P1 = spara(59.275687, 18.155340, 4697, 6518); // krknök
  P2 = spara(59.280348, 18.155122, 4590, 5310); // trevägsskylt
  P3 = B;
  P4 = spara(59.279172, 18.149319, 3877, 5681); // Bron
  gps.assert_gps2bmp(P1, [6, 7]);
  gps.assert_gps2bmp(P2, [24, 38]);
  gps.assert_gps2bmp(P3, [0, 1]);
  gps.assert_gps2bmp(P4, [-4, 7]);
  gps.assert_bmp2gps(P1, [2.4, -1.2]);
  gps.assert_bmp2gps(P2, [14.9, -7.35]);
  gps.assert_bmp2gps(P3, [0.2, 0]);
  return gps.assert_bmp2gps(P4, [2.3, 2.75]);
};

locationUpdate = function locationUpdate(p) {
  var lat, lon;
  lat = p.coords.latitude;
  lon = p.coords.longitude;
  position = gps.gps2bmp(lat, lon);
  track.push(position);
  if (track.length > TRACKED) {
    return track.shift();
  }
};

locationUpdateFail = function locationUpdateFail(error) {
  var messages;
  if (error.code === error.PERMISSION_DENIED) {
    return messages = ['Check location permissions'];
  }
};

setupCompass = function setupCompass() {
  return window.addEventListener("deviceorientation", function (event) {
    return bearing = round(event.alpha);
  });
};

storeData = function storeData() {
  return localStorage[DATA] = JSON.stringify(points);
};

fetchData = function fetchData() {
  if (localStorage[DATA]) {
    return points = JSON.parse(localStorage[DATA]);
  }
};

setup = function setup() {
  var x, x1, x2, y, y1, y2;
  createCanvas(windowWidth, windowHeight);
  cx = WIDTH / 2;
  cy = HEIGHT / 2;

  fetchData();
  x = width / 2;
  y = height / 2;
  x1 = 100;
  x2 = width - 100;
  y1 = 100;
  y2 = height - 100;
  buttons.push(new Button('S', x1, y1, function () {
    points.push(position);
    return storeData();
  }));
  buttons.push(new Button('U', x, y1, function () {
    return cy -= 0.5 * height / SCALE;
  }));
  buttons.push(new Button('0', x2, y1, function () {
    if (points.length > 0) {
      points.pop();
      return storeData();
    }
  }));
  buttons.push(new Button('L', x1, y, function () {
    return cx -= 0.5 * width / SCALE;
  }));
  buttons.push(new Button('C', x, y, function () {
    var _position, _position2;

    return _position = position, _position2 = _slicedToArray(_position, 2), cx = _position2[0], cy = _position2[1], _position;
  }));
  buttons.push(new Button('R', x2, y, function () {
    return cx += 0.5 * width / SCALE;
  }));
  buttons.push(new Button('D', x, y2, function () {
    return cy += 0.5 * height / SCALE;
  }));
  buttons.push(new Button('-', x1, y2, function () {
    return SCALE /= 1.5;
  }));
  buttons.push(new Button('+', x2, y2, function () {
    return SCALE *= 1.5;
  }));
  makeCorners();
  position = [WIDTH / 2, HEIGHT / 2];
  navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });
  return setupCompass();
};

drawTrack = function drawTrack() {
  var i, j, len, x, y;
  push();
  fc();
  sw(2);
  sc(1, 1, 0); // YELLOW
  translate(width / 2, height / 2);
  scale(SCALE);
  for (i = j = 0, len = track.length; j < len; i = ++j) {
    var _track$i = _slicedToArray(track[i], 2);

    x = _track$i[0];
    y = _track$i[1];

    circle(x - cx, y - cy, 5 * (track.length - i));
  }
  return pop();
};

drawPoints = function drawPoints() {
  var i, j, len, x, y;
  push();
  sc();
  fc(1, 0, 0, 0.5); // RED
  translate(width / 2, height / 2);
  scale(SCALE);
  for (i = j = 0, len = points.length; j < len; i = ++j) {
    var _points$i = _slicedToArray(points[i], 2);

    x = _points$i[0];
    y = _points$i[1];

    circle(x - cx, y - cy, 20);
  }
  return pop();
};

drawButtons = function drawButtons() {
  var button, j, len, results;
  buttons[2].prompt = points.length;
  buttons[4].prompt = 360 - bearing;
  results = [];
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    results.push(button.draw());
  }
  return results;
};

drawCompass = function drawCompass() {
  push();
  strokeCap(SQUARE);
  translate(width / 2, height / 2);
  rotate(radians(bearing));
  sw(10);
  sc(1, 0, 0);
  line(0, -100, 0, -150);
  sc(1);
  line(0, 100, 0, 150);
  return pop();
};

draw = function draw() {
  bg(0);
  fc();
  image(img, 0, 0, width, height, cx - width / SCALE / 2, cy - height / SCALE / 2, width / SCALE, height / SCALE);
  drawTrack();
  drawPoints();
  drawCompass();
  return drawButtons();
};

mouseTouched = function mouseTouched() {

  // if not released then return false # to make Android work
  // released = false            # to make Android work
  // for button in buttons
  // 	if button.contains mouseX,mouseY then button.click()
  return false; // to make Android work
};

mouseReleased = function mouseReleased() {
  // to make Android work
  released = true; // to make Android work
  return false; // to make Android work
};

mousePressed = function mousePressed() {
  var button, j, len;
  if (!released) {
    return false; // to make Android work
  }
  released = false; // to make Android work
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    if (button.contains(mouseX, mouseY)) {
      button.click();
    }
  }
  return false; // to make Android work
};
//# sourceMappingURL=sketch.js.map
