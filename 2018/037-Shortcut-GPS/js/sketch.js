'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
// file:///C:/Lab/2018/037-GPS-Shortcut/index.html?radius=50&level=3&seed=0.5&nr=1

// translate, rotate och scale visade sig olämpliga här.
// Bl a då det gällde att detektera krock med röda halvcirklar.
var Button,
    DEAD,
    GPS,
    READY,
    RUNNING,
    SCALE,
    TRACKED,
    Text,
    a,
    b,
    buttons,
    count,
    createProblem,
    draw,
    dump,
    gps,
    hist,
    locationUpdate,
    locationUpdateFail,
    mousePressed,
    mouseReleased,
    myrandom,
    params,
    personOverActive,
    position,
    released,
    rotation1,
    rotation2,
    setup,
    spara,
    start,
    state,
    stopp,
    track,
    xo,
    yo,
    indexOf = [].indexOf;

RUNNING = 0;

READY = 1;

DEAD = 2;

state = RUNNING;

released = true;

gps = null;

rotation1 = 0; // degrees

rotation2 = 0; // degrees

xo = null;
yo = null // origo i mitten av skärmen
;


SCALE = null;

params = null;

TRACKED = 5; // circles shows the player's position

buttons = [];

hist = [];

position = null; // gps position

track = []; // positions

a = null;
b = null;


count = 0;

start = null;
stopp = null;


dump = null;

GPS = function () {
  // hanterar GPS konvertering
  function GPS(lat1, lon1, w, h) {
    _classCallCheck(this, GPS);

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

  _createClass(GPS, [{
    key: 'toXY',
    value: function toXY(lat, lon) {
      var x, y;
      x = xo + SCALE * map(lon, this.lon1, this.lon2, -this.w / 2, this.w / 2);
      y = yo + SCALE * map(lat, this.lat2, this.lat1, -this.h / 2, this.h / 2); // turned
      return { x: x, y: y };
    }
  }, {
    key: 'toWGS84',
    value: function toWGS84(x, y) {
      // not used
      var lat, lon;
      lon = map((x - xo) / SCALE, -this.w / 2, this.w / 2, this.lon1, this.lon2);
      lat = map((y - yo) / SCALE, -this.h / 2, this.h / 2, this.lat1, this.lat2);
      return { lat: lat, lon: lon };
    }
  }]);

  return GPS;
}();

Text = function () {
  function Text(txt1, x3, y3) {
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var g = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var b1 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

    _classCallCheck(this, Text);

    this.txt = txt1;
    this.x = x3;
    this.y = y3;
    this.r = r;
    this.g = g;
    this.b = b1;
  }

  _createClass(Text, [{
    key: 'draw',
    value: function draw() {
      fc(this.r, this.g, this.b);
      return text(this.txt, this.x, this.y);
    }
  }, {
    key: 'execute',
    value: function execute() {}
  }]);

  return Text;
}();

Button = function () {
  function Button(vinkel1, radius1, radius2, txt1) {
    var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var g = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var b1 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;

    _classCallCheck(this, Button);

    this.vinkel1 = vinkel1;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.txt = txt1;
    this.r = r;
    this.g = g;
    this.b = b1;
    this.active = false;
    this.setVinkel1(this.vinkel1);
    this.setVinkel2(0);
  }

  _createClass(Button, [{
    key: 'setVinkel1',
    value: function setVinkel1(v1) {
      this.vinkel1 = v1;
      this.x = xo + this.radius1 * cos(this.vinkel1);
      return this.y = yo + this.radius1 * sin(this.vinkel1);
    }
  }, {
    key: 'setVinkel2',
    value: function setVinkel2(v2) {
      return this.v2 = v2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var d;
      sc();
      this.active = this.inCircle();
      if (this.radius2 > 0) {
        if (params.speed2 > 0 && this.radius1 > 0) {
          if (this.inZone() && state === RUNNING) {
            state = DEAD;
          }
          d = 2 * this.radius2;
          fc(0.75, 0.75, 0.75, 0.5);
          arc(this.x, this.y, d, d, this.v2, 180 + this.v2);
          fc(1, 0, 0, 0.5);
          arc(this.x, this.y, d, d, 180 + this.v2, this.v2);
        } else {
          fc(0.75);
          circle(this.x, this.y, this.radius2);
        }
      }
      sc(1);
      fc();
      circle(this.x, this.y, this.radius2);
      sc();
      fc(this.r, this.g, this.b);
      push();
      translate(this.x, this.y);
      if (params.speed2 > 0 && this.radius1 > 0) {
        rotate(rotation2);
      }
      text(this.txt, 0, 0);
      pop();
      if (this.active) {
        fc(1, 1, 0, 0.5); // yellow
        return circle(this.x, this.y, this.radius2);
      }
    }
  }, {
    key: 'execute',
    value: function execute() {
      if (this.inCircle()) {
        this.event();
        if (a === b) {
          state = READY;
          return stopp = millis();
        }
      }
    }
  }, {
    key: 'inCircle',
    value: function inCircle() {
      return this.radius2 > dist(position.x, position.y, this.x, this.y);
    }
  }, {
    key: 'inZone',
    value: function inZone() {
      // the red half circle 
      var dist1, dist2, x1, x2, y1, y2;
      x1 = this.x + this.radius2 * cos(rotation2 - 90);
      y1 = this.y + this.radius2 * sin(rotation2 - 90);
      x2 = this.x + this.radius2 * cos(rotation2 + 90);
      y2 = this.y + this.radius2 * sin(rotation2 + 90);
      dist1 = dist(position.x, position.y, x1, y1);
      dist2 = dist(position.x, position.y, x2, y2);
      return this.inCircle() && dist1 < dist2;
    }
  }]);

  return Button;
}();

spara = function spara(value) {
  count++;
  hist.push(a);
  a = value;
  buttons[9].txt = params.level - count;
  return buttons[0].txt = a;
};

locationUpdate = function locationUpdate(p) {
  return dump = p.timestamp;
};

// lat = p.coords.latitude
// lon = p.coords.longitude
// if gps == null then gps = new GPS lat,lon,width,height
// position = gps.toXY lat,lon
// track.push position
// if track.length > TRACKED then track.shift()
locationUpdateFail = function locationUpdateFail(error) {
  return dump = error.code + error.message;
};

setup = function setup() {
  var args, button, d, hs, i, k, labels, len, n, txt, ws;
  createCanvas(windowWidth, windowHeight);
  xo = width / 2;
  yo = height / 2;

  params = {};
  if (indexOf.call(window.location.href, '?') >= 0) {
    args = getParameters();
    params.nr = args.nr != null ? args.nr : void 0;
    params.level = args.level != null ? parseInt(args.level) : void 0;
    params.seed = args.seed != null ? parseFloat(args.seed) : void 0;
    params.radius1 = args.radius1 != null ? parseInt(args.radius1) : void 0;
    params.radius2 = args.radius2 != null ? parseInt(args.radius2) : void 0;
    params.speed1 = args.speed1 != null ? parseFloat(args.speed1) : void 0;
    params.speed2 = args.speed2 != null ? parseFloat(args.speed2) : void 0;
    params.cost = args.cost != null ? parseInt(args.cost) : void 0;
    print(params);
  }
  if (params.nr == null) {
    params.nr = '0';
  }
  if (params.level == null) {
    params.level = 3;
  }
  if (params.seed == null) {
    params.seed = 0.0;
  }
  if (params.radius1 == null) {
    params.radius1 = 50;
  }
  if (params.radius2 == null) {
    params.radius2 = 0.3 * params.radius1;
  }
  if (params.speed1 == null) {
    params.speed1 = 0.5 / params.radius1;
  }
  if (params.speed2 == null) {
    params.speed2 = 0.1 / params.radius2;
  }
  if (params.cost == null) {
    params.cost = params.radius1;
  }
  print(params);
  d = new Date();
  params.seed += 31 * d.getMonth() + d.getDate() + 0.1 * params.level + 0.01 * params.radius1;

  var _createProblem = createProblem(params.level, params.seed);

  var _createProblem2 = _slicedToArray(_createProblem, 2);

  a = _createProblem2[0];
  b = _createProblem2[1];

  SCALE = min(width, height) / params.radius1 / 3;
  position = {
    x: xo,
    y: yo
  };
  track = [position];
  start = millis();
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(80);
  ws = 0.35 * width;
  hs = 0.43 * height;
  buttons.push(new Text(a, xo - ws, yo - hs, 1, 0, 0)); // a
  buttons.push(new Text(b, xo + ws, yo - hs, 0, 1, 0)); // b
  buttons.push(new Text(params.nr, xo - ws, yo + hs));
  buttons.push(new Text('0', xo, yo + hs)); // sekunder
  buttons.push(new Text('0', xo + ws, yo + hs)); // count
  buttons.push(new Text(params.radius1 + 'm', xo, yo - hs)); // radius1
  labels = "+2 *2 /2".split(' ');
  n = labels.length;
  for (i = k = 0, len = labels.length; k < len; i = ++k) {
    txt = labels[i];
    button = new Button(i * 360 / n, SCALE * params.radius1, SCALE * params.radius2, txt);
    buttons.push(button);
  }
  buttons[6].event = function () {
    return spara(a + 2);
  };
  buttons[7].event = function () {
    return spara(a * 2);
  };
  buttons[8].event = function () {
    if (a % 2 === 0) {
      return spara(Math.floor(a / 2));
    }
  };
  buttons.push(new Button(0, 0, SCALE * params.radius2, params.level)); // undo
  buttons[9].event = function () {
    if (hist.length > 0) {
      a = hist.pop();
      return buttons[0].txt = a;
    }
  };
  navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });
  return state = RUNNING;
};

draw = function draw() {
  bg(0);
  fc();
  sc(1);
  sw(2);
  // circle xo,yo,SCALE*params.radius1

  // buttons[9].txt = params.level - hist.length 
  // if state==READY   then buttons[3].txt = round(stopp-start)/1000 + params.cost*count
  // if state==RUNNING then buttons[3].txt = round (millis()-start)/1000 + params.cost*count
  // buttons[4].txt = count

  // for button in buttons
  // 	button.draw()

  // factor = 60 / constrain frameRate(),1,60
  // rotation1 = (rotation1 + factor * params.speed1) %% 360
  // rotation2 = (rotation2 - factor * params.speed2/0.3) %% 360

  // for i in range 6,9
  // 	button = buttons[i]
  // 	button.setVinkel1 rotation1+i*120
  // 	button.setVinkel2 rotation2

  // if state == READY 
  // 	fc 0,1,0,0.5
  // 	rect 0,0,width,height
  // if state == DEAD
  // 	fc 1,0,0,0.5
  // 	rect 0,0,width,height

  // fc()
  // sw 2
  // for p,i in track
  // 	if personOverActive() then sc 0 else sc 1,1,0
  // 	circle p.x, p.y, 5*(track.length-i)
  fc(1);
  push();
  textSize(20);
  //if dump then text dump.coords.latitude,100,150
  if (dump) {
    text(dump, 100, 200);
  }
  return pop();
};

personOverActive = function personOverActive() {
  var button, i, k, len, ref;
  ref = [6, 7, 8, 9];
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    button = buttons[i];
    if (button.inCircle()) {
      return true;
    }
  }
  return false;
};

createProblem = function createProblem(level, seed) {
  var i, item, j, k, l, len, len1, lst, lst2, n, ref, save, tree;
  n = int(Math.pow(2, 4 + level / 3)); // nodes
  a = myrandom(1, n / 2);
  lst = [a];
  tree = [a];
  lst2 = [];
  save = function save(item) {
    if (item <= n && indexOf.call(tree, item) < 0) {
      lst2.push(item);
      return tree.push(item);
    }
  };
  ref = range(params.level);
  for (k = 0, len = ref.length; k < len; k++) {
    j = ref[k];
    lst2 = [];
    for (l = 0, len1 = lst.length; l < len1; l++) {
      item = lst[l];
      save(item + 2);
      save(item * 2);
      if (item % 2 === 0) {
        save(item / 2);
      }
    }
    lst = lst2;
  }
  i = myrandom(0, lst.length);
  b = lst[i];
  return [a, b];
};

myrandom = function myrandom(a, b) {
  var x;
  x = 10000 * Math.sin(params.seed);
  x = x - Math.floor(x);
  params.seed = x;
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
  if (state !== RUNNING) {
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
