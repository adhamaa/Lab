'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Digit, digits, draw, mousePressed, msg, setup;

Digit = function () {
  function Digit(x, y1) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Digit);

    this.x = x;
    this.y = y1;
    this.value = value;
  }

  _createClass(Digit, [{
    key: 'bean',
    value: function bean(y) {
      fc(0.89, 0.77, 0.00);
      quad(this.x - 50, y, this.x - 25, y - 25, this.x + 25, y - 25, this.x + 50, y);
      fc(0.95, 0.70, 0.30);
      return quad(this.x - 50, y, this.x - 25, y + 25, this.x + 25, y + 25, this.x + 50, y);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var dy, i, k, len, ref;
      sw(5);
      line(this.x, 0, this.x, 500);
      sw(1);
      if (this.value >= 5) {
        dy = 50;
      } else {
        dy = 0;
      }
      fc(0.894, 0.772, 0.000);
      this.bean(this.y + dy);
      ref = range(5);
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        if (i !== this.value % 5) {
          this.bean(this.y + 150 + 50 * i);
        }
      }
      fc(1);
      return text(this.value, this.x, 150 + 4);
    }
  }, {
    key: 'click',
    value: function click(d) {
      var five;
      five = Math.floor(this.value / 5);
      if (d === 2 && five === 0) {
        this.value += 5;
      }
      if (d === 5 && five === 1) {
        this.value -= 5;
      }
      if (d === 8 && this.value % 5 > 0) {
        this.value = 0 + 5 * five;
      }
      if (d === 10 && this.value % 5 > 1) {
        this.value = 1 + 5 * five;
      }
      if (d === 12 && this.value % 5 > 2) {
        this.value = 2 + 5 * five;
      }
      if (d === 14 && this.value % 5 > 3) {
        this.value = 3 + 5 * five;
      }
      if (d === 11 && this.value % 5 <= 1) {
        this.value = 1 + 5 * five;
      }
      if (d === 13 && this.value % 5 <= 2) {
        this.value = 2 + 5 * five;
      }
      if (d === 15 && this.value % 5 <= 3) {
        this.value = 3 + 5 * five;
      }
      if (d === 17 && this.value % 5 <= 4) {
        return this.value = 4 + 5 * five;
      }
    }
  }]);

  return Digit;
}();

digits = [];

msg = '';

setup = function setup() {
  var i, k, len, ref, results;
  createCanvas(1050, 450);
  textSize(48);
  textAlign(CENTER, CENTER);
  ref = range(10);
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    results.push(digits.push(new Digit(75 + 100 * i, 50)));
  }
  return results;
};

draw = function draw() {
  var digit, k, len;
  bg(0.5);
  sw(50);
  line(0, 0, 0, 450);
  line(width, 0, width, 450);
  line(0, 0, width, 0);
  line(0, 150, width, 150);
  line(0, 450, width, 450);
  for (k = 0, len = digits.length; k < len; k++) {
    digit = digits[k];
    digit.draw();
  }
  fc(0);
  return text(msg, width / 2, height / 2);
};

mousePressed = function mousePressed() {
  var digit, i, j, k, len, results;
  i = Math.floor((mouseX - 25) / 100);
  j = Math.floor((mouseY + 25) / 25);
  if (j === 1) {
    results = [];
    for (k = 0, len = digits.length; k < len; k++) {
      digit = digits[k];
      results.push(digit.value = 0);
    }
    return results;
  } else {
    return digits[i].click(j);
  }
};
//# sourceMappingURL=sketch.js.map
