'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
var A, B, C, D, E, HEIGHT, N, O, P, P1, P2, P3, P4, Q, SCALE, TRACKED, WIDTH, bmp2gps, buttons, calcx, calcy, check_bmp2gps, corner, cx, cy, draw, drawGpsCircles, gps, hortal, img, locationUpdate, locationUpdateFail, makeCorners, message, mousePressed, mouseReleased, myround, position, preload, released, setup, sheight, show, spara, swidth, track, vercal;

spara = function spara(_ref, _ref2) {
  var _ref4 = _slicedToArray(_ref, 2),
      lat = _ref4[0],
      lon = _ref4[1];

  var _ref3 = _slicedToArray(_ref2, 2),
      x = _ref3[0],
      y = _ref3[1];

  return { lat: lat, lon: lon, x: x, y: y };
};

A = spara([59.300736, 18.125648], [554, 433]);

B = spara([59.300593, 18.163456], [5422, 158]);

C = spara([59.265339, 18.159501], [5384, 9114]);

D = spara([59.281411, 18.122435], [338, 5298 // Sockenvägen/Ätravägen
]);

E = spara([59.266262, 18.144961], [3496, 8980 // Garden Center
]);

// Testpunkter
P1 = spara([59.275687, 18.155340], [4697, 6518 // krknök
]);

P2 = spara([59.280348, 18.155122], [4590, 5310 // trevägsskylt
]);

P3 = B;

P4 = spara([59.279172, 18.149319], [3877, 5681 // Bron
]);

N = null;

O = null;

P = null;

Q = null;

cx = 0; // center

cy = 0;

swidth = 0;

sheight = 0;

released = true;

WIDTH = 6912;

HEIGHT = 9216;

gps = null;

SCALE = 1;

TRACKED = 5; // circles shows the player's position

position = null; // gps position

track = []; // five latest GPS positions

buttons = [];

img = null;

message = '';

preload = function preload() {
  return img = loadImage('karta.jpg');
};

myround = function myround(x) {
  x *= 1000000;
  x = round(x);
  return x / 1000000;
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
  var F, G, H, I, J, K, L, M;
  F = vercal(A, D, 0);
  G = vercal(B, C, 0);
  H = hortal(A, B, WIDTH);
  I = hortal(E, C, WIDTH);
  J = vercal(B, C, HEIGHT);
  K = vercal(A, D, HEIGHT);
  L = hortal(E, C, 0);
  M = hortal(A, B, 0);
  N = corner(F, G, M, L, 0, 0);
  O = corner(F, G, H, I, WIDTH, 0);
  P = corner(K, J, H, I, WIDTH, HEIGHT);
  Q = corner(K, J, M, L, 0, HEIGHT);
  gps = new GPS(N, O, P, Q, WIDTH, HEIGHT);
  return print(gps);
};

// show 'A',A
// show 'B',B
// show 'C',C
// show 'D',D
// show 'E',E
// show 'F',F
// show 'G',G
// show 'H',H
// show 'I',I
// show 'J',J
// show 'K',K
// show 'L',L
// show 'M',M
// show 'N',N
// show 'O',O
// show 'P',P
// show 'Q',Q
calcx = function calcx(x, y, a, b) {
  var lat, lon;
  lon = map(x, a.x, b.x, a.lon, b.lon);
  lat = map(x, a.x, b.x, a.lat, b.lat);
  return { lat: lat, lon: lon, x: x, y: y };
};

calcy = function calcy(x, y, a, b) {
  var lat, lon;
  lon = map(y, a.y, b.y, a.lon, b.lon);
  lat = map(y, a.y, b.y, a.lat, b.lat);
  return { lat: lat, lon: lon, x: x, y: y };
};

bmp2gps = function bmp2gps(mx, my) {
  var q, q1, q2;
  q1 = calcx(mx, 0, N, O);
  q2 = calcx(mx, HEIGHT, Q, P);
  q = calcy(mx, my, q1, q2);
  return [myround(q.lat, 6), myround(q.lon, 6)];
};

check_bmp2gps = function check_bmp2gps(p, error) {
  var lat, lon;

  var _bmp2gps = bmp2gps(p.x, p.y);

  var _bmp2gps2 = _slicedToArray(_bmp2gps, 2);

  lat = _bmp2gps2[0];
  lon = _bmp2gps2[1];

  return assert(error, [myround(100000 * (lat - p.lat), 6), myround(50000 * (lon - p.lon), 6)]);
};

locationUpdate = function locationUpdate(p) {
  var lat, lon;
  //messages = []
  lat = p.coords.latitude;
  lon = p.coords.longitude;
  //print 'locationupdate',lat,lon
  position = { lat: lat, lon: lon };
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

setup = function setup() {
  var lat, lon, x, x1, x2, y, y1, y2;
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  x1 = 100;
  x2 = width - 100;
  y1 = 100;
  y2 = height - 100;
  buttons.push(new Button('X', x1, y1));
  buttons.push(new Button('up', x, y1, function () {
    return cy -= height / 2 / SCALE;
  }));
  buttons.push(new Button('Y', x2, y1));
  buttons.push(new Button('left', x1, y, function () {
    return cx -= width / 2 / SCALE;
  }));
  buttons.push(new Button('C', x, y, function () {
    var lat, lon;
    var _position = position;
    lat = _position.lat;
    lon = _position.lon;

    var _gps$gps2bmp = gps.gps2bmp(lat, lon);

    x = _gps$gps2bmp.x;
    y = _gps$gps2bmp.y;

    cx = x - width / SCALE / 2;
    return cy = y - height / SCALE / 2;
  }));
  buttons.push(new Button('right', x2, y, function () {
    return cx += width / 2 / SCALE;
  }));
  buttons.push(new Button('down', x, y2, function () {
    return cy += height / 2 / SCALE;
  }));
  buttons.push(new Button('-', x1, y2, function () {
    return SCALE /= 1.2;
  }));
  buttons.push(new Button('+', x2, y2, function () {
    return SCALE *= 1.2;
  }));

  //[sx,sy]=[5000,0] # B
  //[sx,sy]=[3500,8000] # C
  //[sx,sy]=[0,4000] # D
  //[sx,sy]=[3000,8000] # E
  //[sx,sy]=[3500,6000] # krknök
  //[sx,sy]=[3500,5000] # trevägsskylt
  cx = WIDTH / 2;
  cy = HEIGHT / 2 // A
  ;
  textSize(50);
  makeCorners();
  // check_gps2bmp P1, [5,6]
  // check_gps2bmp P2, [23,37]
  // check_gps2bmp P3, [0,0]
  // check_gps2bmp P4, [-5,7]
  check_bmp2gps(P1, [2.4, -1.2]);
  check_bmp2gps(P2, [14.9, -7.35]);
  check_bmp2gps(P3, [0.2, 0]);
  check_bmp2gps(P4, [2.3, 2.75]);
  navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });
  lat = 59.280348;
  lon = 18.155122;
  position = { lat: lat, lon: lon };
  return track.push(position);
};

drawGpsCircles = function drawGpsCircles() {
  var h, i, j, lat, len, lon, p, results, w, x, y;
  w = width;
  h = height;
  fc();
  sw(2);
  sc(1, 1, 0); // YELLOW
  results = [];
  for (i = j = 0, len = track.length; j < len; i = ++j) {
    p = track[i];
    var _p = p;
    lat = _p.lat;
    lon = _p.lon;

    var _gps$gps2bmp2 = gps.gps2bmp(lat, lon);

    x = _gps$gps2bmp2.x;
    y = _gps$gps2bmp2.y;

    results.push(circle(cx - width / SCALE / 2 + x, cy - height / SCALE / 2 + y, 5 * (track.length - i)));
  }
  return results;
};

draw = function draw() {
  var button, j, len;
  bg(0);
  image(img, 0, 0, width, height, cx - width / SCALE / 2, cy - height / SCALE / 2, width / SCALE, height / SCALE);
  drawGpsCircles();
  buttons[0].prompt = int(cx);
  buttons[2].prompt = int(cy);
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    button.draw();
  }
  fc(1);
  return text(message, 100, 100);
};

mouseReleased = function mouseReleased() {
  // to make Android work
  released = true;
  return false;
};

mousePressed = function mousePressed() {
  var button, j, len, results;
  if (!released) {
    // to make Android work
    return;
  }
  released = false;
  results = [];
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    if (button.radius > dist(mouseX, mouseY, button.x, button.y)) {
      results.push(button.click());
    } else {
      results.push(void 0);
    }
  }
  return results;
};
//# sourceMappingURL=sketch.js.map