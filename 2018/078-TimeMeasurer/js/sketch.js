'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Person, db, draw, mousePressed, myNow, persons, setup;

persons = [];

db = {};

myNow = function myNow() {
  return Date.now();
};

Person = function () {
  function Person(name1, y1) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var konto1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Person);

    this.name = name1;
    this.y = y1;
    this.state = state;
    this.konto = konto1;
    this.w = 80;
    this.h = 30;
    this.lastValue = 0; // millis sedan 1970
  }

  _createClass(Person, [{
    key: 'draw',
    value: function draw() {
      var d;
      this.update();
      sc();
      fc(0);
      text(this.name, 100, this.y);
      // minus
      fc(1, 1, 1);
      if (this.state === -1) {
        fc(1, 0, 0);
      }
      if (this.state === 0) {
        fc(1, 1, 1);
      }
      sc(0);
      rect(200, this.y, this.w, this.h);
      sc();
      fc(0);
      text('-', 200, this.y);
      // konto
      d = new Date(this.konto);
      fc(0);
      text(nf(d.getHours(), 2) + ':' + nf(d.getMinutes(), 2) + ':' + nf(d.getSeconds(), 2), 300, this.y);
      // plus
      fc(1, 1, 1);
      if (this.state === 0) {
        fc(1, 1, 1);
      }
      if (this.state === 1) {
        fc(0, 1, 0);
      }
      sc(0);
      rect(400, this.y, this.w, this.h);
      sc();
      fc(0);
      return text('+', 400, this.y);
    }
  }, {
    key: 'update',
    value: function update() {
      var d;
      if (this.lastValue === 0) {
        this.lastValue = myNow();
      }
      d = myNow(); // millis sedan 1970
      this.konto += this.state * (d - this.lastValue);
      print(this.konto);
      //if @konto<0 then @konto = 0 
      return this.lastValue = d;
    }
  }, {
    key: 'inside',
    value: function inside(x, y, mx, my) {
      return x - this.w / 2 < mx && mx < x + this.w / 2 && y - this.h / 2 < my && my < y + this.h / 2;
    }
  }, {
    key: 'execute',
    value: function execute(mx, my) {
      if (this.inside(200, this.y, mx, my)) {
        this.state = -1;
      }
      if (this.inside(300, this.y, mx, my)) {
        this.state = 0;
      }
      if (this.inside(400, this.y, mx, my)) {
        return this.state = 1;
      }
    }
  }]);

  return Person;
}();

setup = function setup() {
  var hash, i, j, konto, len, name, names, ref, s;
  createCanvas(800, 600);
  //delete localStorage['078-TimeMeasurer']
  s = localStorage['078-TimeMeasurer'];
  if (s === void 0) {
    s = '{}';
  }
  db = JSON.parse(s);
  hash = getParameters();
  if (hash !== void 0) {
    names = hash['names'];
    ref = names.split('|');
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      name = ref[i];
      konto = db[name];
      if (konto === null) {
        konto = 0;
      }
      persons.push(new Person(name, 150 + i * 50, konto));
    }
  }
  sc();
  textSize(20);
  textAlign(CENTER, CENTER);
  return rectMode(CENTER);
};

draw = function draw() {
  var i, j, len, person;
  bg(1);
  for (i = j = 0, len = persons.length; j < len; i = ++j) {
    person = persons[i];
    person.draw();
    db[person.name] = person.konto;
  }
  //print JSON.stringify db
  return localStorage['078-TimeMeasurer'] = JSON.stringify(db);
};

mousePressed = function mousePressed() {
  var j, len, person, results;
  results = [];
  for (j = 0, len = persons.length; j < len; j++) {
    person = persons[j];
    results.push(person.execute(mouseX, mouseY));
  }
  return results;
};
//# sourceMappingURL=sketch.js.map
