'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
// file:///C:/Lab/2018/037-GPS-Shortcut/index.html?lat=59.265205&lon=18.132735&radius=50&level=3&seed=0.314
var Button,
    RADIUS,
    Rmeter,
    SCALE,
    System,
    TRACKED,
    a,
    b,
    buttons,
    count,
    createProblem,
    dh,
    draw,
    dw,
    hist,
    level,
    locationUpdate,
    locationUpdateFail,
    mousePressed,
    mouseReleased,
    myrandom,
    position,
    radius,
    released,
    seed,
    setup,
    spara,
    start,
    steps,
    stopp,
    system,
    track,
    indexOf = [].indexOf;

released = true;

system = null;

position = {
  x: 0,
  y: 0 // home
};

SCALE = null;

// inparametrar
Rmeter = 50; // stora radien i meter

RADIUS = null; // stora radien i pixlar

radius = null; // lilla radien i pixlar

level = null;

seed = null;

TRACKED = 5;

//LAT = 59.265205 # Skarpnäck
//LON = 18.132735
buttons = [];

hist = [];

track = [];

a = 8;

b = 9;

count = 0;

steps = 3;

start = null;

stopp = null;

dw = null;

dh = null;

System = function () {
  function System(lat1, lon1, w, h) {
    _classCallCheck(this, System);

    var p0, p1, p2, p3, p4;
    this.lat = lat1;
    this.lon = lon1;
    this.w = w;
    this.h = h;
    p0 = LatLon(this.lat, this.lon);
    p1 = p0.destinationPoint(this.h / 2, 0);
    this.lat2 = p1.lat;
    p2 = p0.destinationPoint(this.w / 2, 90);
    this.lon2 = p2.lon;
    p3 = p0.destinationPoint(this.h / 2, 180);
    this.lat1 = p3.lat;
    p4 = p0.destinationPoint(this.w / 2, 270);
    this.lon1 = p4.lon;
  }

  _createClass(System, [{
    key: 'toXY',
    value: function toXY(lat, lon) {
      var x, y;
      x = round(map(lon, this.lon1, this.lon2, -this.w / 2, this.w / 2));
      y = round(map(lat, this.lat2, this.lat1, -this.h / 2, this.h / 2)); // turned
      return { x: x, y: y };
    }
  }, {
    key: 'toWGS84',
    value: function toWGS84(x, y) {
      var lat, lon;
      lon = map(x, -this.w / 2, this.w / 2, this.lon1, this.lon2);
      lat = map(y, -this.h / 2, this.h / 2, this.lat1, this.lat2);
      return { lat: lat, lon: lon };
    }
  }]);

  return System;
}();

Button = function () {
  function Button(x1, y1, radius1, txt1) {
    var r1 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var g1 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var b1 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    _classCallCheck(this, Button);

    this.x = x1;
    this.y = y1;
    this.radius = radius1;
    this.txt = txt1;
    this.r = r1;
    this.g = g1;
    this.b = b1;
  }

  _createClass(Button, [{
    key: 'draw',
    value: function draw() {
      if (this.inside()) {
        fc(0.25);
      } else {
        fc(0.75);
      }
      if (stopp != null) {
        fc(0, 1, 0);
      }
      sc();
      if (this.radius > 0) {
        circle(this.x, this.y, this.radius);
      }
      if (a === b) {
        fc(0, 1, 0);
      } else {
        fc(this.r, this.g, this.b);
      }
      return text(this.txt, this.x, this.y);
    }
  }, {
    key: 'execute',
    value: function execute() {
      if (this.inside()) {
        this.event();
        if (a === b) {
          return stopp = millis();
        }
      }
    }
  }, {
    key: 'inside',
    value: function inside() {
      return this.radius > dist(position.x, position.y, this.x, this.y);
    }
  }, {
    key: 'setColor',
    value: function setColor(r, g, b) {
      var _ref;

      return _ref = [r, g, b], this.r = _ref[0], this.g = _ref[1], this.b = _ref[2], _ref;
    }
  }]);

  return Button;
}();

spara = function spara(value) {
  count++;
  hist.push(a);
  a = value;
  buttons[3 + 0].txt = steps - count;
  return buttons[4 + 0].txt = a;
};

locationUpdate = function locationUpdate(p) {
  var lat, lon;
  lat = p.coords.latitude;
  lon = p.coords.longitude;
  position = system.toXY(lat, lon);
  track.push(position);
  if (track.length > TRACKED) {
    return track.shift();
  }
};

locationUpdateFail = function locationUpdateFail(error) {};

setup = function setup() {
  var d, hs, i, k, labels, lat, len, lon, n, rs, txt, ws, x, y;
  createCanvas(windowWidth, windowHeight);
  // args = getParameters()
  // lat = parseFloat args.lat
  // lon = parseFloat args.lon
  // RADIUS = parseInt args.radius 
  // level = parseInt args.level
  // seed = parseFloat args.seed
  lat = 59.265205;
  lon = 18.132735;
  RADIUS = 500;
  level = 3;
  seed = 0.5;
  d = new Date();
  seed += 31 * d.getMonth() + d.getDate();
  createProblem(level, seed);
  system = new System(lat, lon, width, height);
  SCALE = min(width, height) / RADIUS / 3;
  radius = 0.3 * RADIUS;
  navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });
  start = millis();
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(1 * radius);
  labels = "+2 *2 /2".split(' ');
  n = labels.length;
  for (i = k = 0, len = labels.length; k < len; i = ++k) {
    txt = labels[i];
    x = RADIUS * cos(i * 360 / n);
    y = RADIUS * sin(i * 360 / n);
    buttons.push(new Button(x, y, radius, txt));
  }
  buttons[0].event = function () {
    return spara(a + 2);
  };
  buttons[1].event = function () {
    return spara(a * 2);
  };
  buttons[2].event = function () {
    if (a % 2 === 0) {
      return spara(Math.floor(a / 2));
    }
  };
  //buttons[3].event = -> spara a+3
  buttons.push(new Button(0, 0, radius, steps));
  buttons[3 + 0].event = function () {
    if (hist.length > 0) {
      a = hist.pop();
      return buttons[4 + 1].txt = a;
    }
  };
  ws = 0.3 * width / SCALE;
  hs = 0.4 * height / SCALE;
  rs = radius / SCALE;
  buttons.push(new Button(-ws, -hs, -rs, a));
  buttons.push(new Button(ws, -hs, -rs, b));
  buttons[4 + 0].setColor(1, 0, 0);
  buttons[5 + 0].setColor(0, 1, 0);
  buttons.push(new Button(-ws, hs, -rs, '0'));
  buttons.push(new Button(ws, hs, -rs, '0'));
  buttons[6 + 0].setColor(0, 0, 0);
  return buttons[7 + 0].setColor(0, 0, 0);
};

draw = function draw() {
  var button, i, k, l, len, len1, p, results;
  translate(width / 2, height / 2);
  scale(SCALE);
  bg(0.5);
  fc();
  sc(0);
  circle(0, 0, RADIUS);
  if (stopp != null) {
    buttons[6 + 0].txt = round(stopp - start) / 1000;
  } else {
    buttons[6 + 0].txt = round((millis() - start) / 1000);
  }
  buttons[7 + 0].txt = count;
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    button.draw();
  }
  fc();
  sc(1, 1, 0);
  sw(1);
  results = [];
  for (i = l = 0, len1 = track.length; l < len1; i = ++l) {
    p = track[i];
    results.push(circle(p.x, p.y, 2 * (track.length - i)));
  }
  return results;
};

createProblem = function createProblem(level, seed) {
  var i, item, j, k, l, len, len1, lst, lst2, n, ref, save, tree;
  n = int(Math.pow(2, 4 + level / 3)); // nodes
  a = myrandom(1, n / 2);
  lst = [a];
  tree = [a];
  lst2 = [];
  save = function save(item) {
    if (item === Math.floor(item) && item <= n) {
      if (indexOf.call(tree, item) < 0) {
        lst2.push(item);
        return tree.push(item);
      }
    }
  };
  ref = range(level);
  for (k = 0, len = ref.length; k < len; k++) {
    j = ref[k];
    lst2 = [];
    for (l = 0, len1 = lst.length; l < len1; l++) {
      item = lst[l];
      save(item + 2);
      save(item * 2);
      save(item / 2);
    }
    lst = lst2;
  }
  print(a, lst);
  i = myrandom(0, lst.length);
  return b = lst[i];
};

myrandom = function myrandom(a, b) {
  var x;
  x = 10000 * Math.sin(seed);
  x = x - Math.floor(x);
  return int(a + x * (b - a));
};

mouseReleased = function mouseReleased() {
  // to make Android work
  released = true;
  return false;
};

mousePressed = function mousePressed() {
  var button, k, len, results;
  if (!released) {
    // to make Android work
    return;
  }
  released = false;
  if (stopp != null) {
    return;
  }
  results = [];
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    results.push(button.execute());
  }
  return results;
};
//# sourceMappingURL=sketch.js.map
