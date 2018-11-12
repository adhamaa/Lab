'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Button, X, buttons, draw, execute, g, gc, mousePressed, parts, prices, rodSize, rodsize, setup, showInfo, text3;

Button = function () {
  function Button(title, x1, y1, event) {
    _classCallCheck(this, Button);

    this.title = title;
    this.x = x1;
    this.y = y1;
    this.event = event;
    this.r = 20;
  }

  _createClass(Button, [{
    key: 'draw',
    value: function draw() {
      circle(this.x, this.y, this.r);
      sc(0.8);
      line(this.x, this.y - this.r, this.x, this.y + this.r);
      sc();
      return text(this.title, this.x, this.y);
    }
  }, {
    key: 'inside',
    value: function inside(mx, my) {
      return this.r > dist(mx, my, this.x, this.y);
    }
  }, {
    key: 'execute',
    value: function execute() {
      return this.event();
    }
  }]);

  return Button;
}();

buttons = [];

prices = null;

parts = null;

X = [30, 90, 170, 300, 450, 600];

rodsize = 10;

showInfo = function showInfo(i) {
  var x;
  push();
  fc(0);
  x = Math.round(prices[i] / (i + 1) * 100) / 100;
  text(nf(x, 0, 2), X[2], 110 + 50 * i);
  return pop();
};

setup = function setup() {
  var fn, i, l, len, price;
  createCanvas(610, 700);
  textSize(16);
  prices = [1, 5, 7, 10, 0, 0, 0, 0, 0, 0];
  fn = function fn(i) {
    return buttons.push(new Button(prices[i], X[1], 110 + 50 * i, function () {
      if (mouseX < X[1]) {
        if (prices[i] > 0) {
          prices[i]--;
        }
      } else {
        prices[i]++;
      }
      buttons[i].title = prices[i];
      return execute();
    }));
  };
  for (i = l = 0, len = prices.length; l < len; i = ++l) {
    price = prices[i];
    fn(i);
  }
  return execute();
};

text3 = function text3(texts, x) {
  var i, l, len, ref, results, t;
  ref = texts.split(' ');
  results = [];
  for (i = l = 0, len = ref.length; l < len; i = ++l) {
    t = ref[i];
    results.push(text(t, x, [20, 40, 60][i]));
  }
  return results;
};

draw = function draw() {
  var button, i, l, len, len1, len2, o, p, part, price, total, y;
  bg(0.5);
  textSize(20);
  textAlign(CENTER, CENTER);
  push();
  fc(0.75);
  text3('piece size', X[0]);
  text3('piece price -|+', X[1]);
  textAlign(RIGHT, CENTER);
  text3('price / size', X[2]);
  text3('piece count', X[3]);
  text3('size x count', X[4]);
  text3('price x count', X[5]);
  for (i = l = 0, len = prices.length; l < len; i = ++l) {
    price = prices[i];
    showInfo(i);
  }
  pop();
  total = [0, 0, 0];
  textAlign(CENTER, CENTER);
  for (o = 0, len1 = buttons.length; o < len1; o++) {
    button = buttons[o];
    button.draw();
  }
  textAlign(RIGHT, CENTER);
  for (i = p = 0, len2 = parts.length; p < len2; i = ++p) {
    part = parts[i];
    push();
    fc(0.75);
    text(i + 1, X[0], 110 + 50 * i);
    pop();
    text(parts[i], X[3], 110 + 50 * i);
    text((i + 1) * parts[i], X[4], 110 + 50 * i);
    text(prices[i] * parts[i], X[5], 110 + 50 * i);
    total[0] += parts[i];
    total[1] += (i + 1) * parts[i];
    total[2] += prices[i] * parts[i];
    sc(0.75);
    y = 135 + 50 * i;
    if (i === 0) {
      line(0, y - 50, width, y - 50);
    }
    line(0, y, width, y);
    sc();
  }
  textAlign(CENTER, CENTER);
  textAlign(LEFT, CENTER);
  text('Total:', X[1], 610);
  textAlign(RIGHT, CENTER);
  text(total[0], X[3], 610);
  text(total[1], X[4], 610);
  text(total[2], X[5], 610);
  textAlign(CENTER, CENTER);
  push();
  fc(0.75);
  text('janchrister.nilsson@gmail.com', width / 2, 680);
  textSize(50);
  text('Constant Time Rod Cutter', width / 2, 650);
  return pop();
};

execute = function execute() {
  return parts = gc(prices, rodsize);
};

rodSize = function rodSize(input) {
  rodsize = parseInt(input.value);
  if (rodsize < 0) {
    rodsize = 1;
  }
  return execute();
};

mousePressed = function mousePressed() {
  var button, l, len, results;
  results = [];
  for (l = 0, len = buttons.length; l < len; l++) {
    button = buttons[l];
    if (button.inside(mouseX, mouseY)) {
      results.push(button.execute());
    } else {
      results.push(void 0);
    }
  }
  return results;
};

//#####

// Constant + Parts
gc = function gc(prices, n) {
  var clen, i, lst, part, price, q;
  // Om lika maxkvot, välj högsta index
  lst = function () {
    var l, len, results;
    results = [];
    for (i = l = 0, len = prices.length; l < len; i = ++l) {
      price = prices[i];
      results.push([price / (i + 1), i + 1]);
    }
    return results;
  }();
  lst.sort();

  var _$last = _.last(lst);

  var _$last2 = _slicedToArray(_$last, 2);

  q = _$last2[0];
  clen = _$last2[1];

  if (n < clen) {
    return g(prices, n, clen);
  }
  part = g(prices, clen + n % clen, clen);
  part[clen - 1] += Math.floor((n - clen) / clen);
  return part;
};

// Quadratic + Parts
g = function g(v, n2, clen) {
  var c, i, index, indexes, j, k, l, len, len1, len2, len3, len4, m, max_c, n1, o, p, part, r, ref, ref1, ref2, s, temp, z;
  n1 = v.length;
  c = v.concat(function () {
    var l, len, ref, results;
    ref = range(n2);
    // [0] * n2
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      i = ref[l];
      results.push(0);
    }
    return results;
  }());
  parts = [];
  ref = range(n2);
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    max_c = c[i];
    indexes = [i];
    ref1 = range(n2);
    for (o = 0, len1 = ref1.length; o < len1; o++) {
      j = ref1[o];
      k = i - j - 1;
      if (k >= 0) {
        temp = c[j] + c[k];
        if (temp >= max_c) {
          max_c = temp;
          indexes = [k, j];
        }
      }
    }
    c[i] = max_c;
    part = function () {
      var len2, p, ref2, results;
      ref2 = range(n1);
      results = [];
      for (p = 0, len2 = ref2.length; p < len2; p++) {
        z = ref2[p];
        results.push(0);
      }
      return results;
    }();
    if (i <= clen) {
      for (p = 0, len2 = indexes.length; p < len2; p++) {
        index = indexes[p];
        part[index] += 1;
      }
    } else {
      ref2 = range(n1);
      for (r = 0, len3 = ref2.length; r < len3; r++) {
        m = ref2[r];
        for (s = 0, len4 = indexes.length; s < len4; s++) {
          index = indexes[s];
          part[m] += parts[index][m];
        }
      }
    }
    parts.push(part);
  }
  return _.last(parts);
};

assert([0, 2, 0, 0], g([1, 5, 7, 10], 4, 4)); // 26

prices = [1, 6, 10, 14 // 1 3 3.33 3.5 clen=4
];

assert(g(prices, 1, 4), [1, 0, 0, 0 // 1
]);

assert(g(prices, 2, 4), [0, 1, 0, 0 // 6
]);

assert(g(prices, 3, 4), [0, 0, 1, 0 // 10
]);

assert(g(prices, 4, 4), [0, 0, 0, 1 // 14
]);

assert(g(prices, 5, 4), [0, 1, 1, 0 // 16
]);

assert(g(prices, 6, 4), [0, 1, 0, 1 // 20
]);

assert(g(prices, 7, 4), [0, 0, 1, 1 // 24
]);

assert(g(prices, 8, 4), [0, 0, 0, 2 // 28
]);

assert(g(prices, 9, 4), [0, 1, 1, 1 // 30
]);

assert(g(prices, 10, 4), [0, 1, 0, 2 // 34
]);

prices = [5, 6, 7, 10 // 5 3 3.5 2.5 clen=1
];

assert(g(prices, 1, 1), [1, 0, 0, 0]);

assert(g(prices, 2, 1), [2, 0, 0, 0]);

assert(g(prices, 3, 1), [3, 0, 0, 0]);

assert(g(prices, 4, 1), [4, 0, 0, 0]);

assert(g(prices, 5, 1), [5, 0, 0, 0]);

assert(g(prices, 6, 1), [6, 0, 0, 0]);

assert(g(prices, 7, 1), [7, 0, 0, 0]);

prices = [1, 5, 8, 9 // 1 2.5 2.67 2.25 clen=3
];

assert(g(prices, 1, 3), [1, 0, 0, 0 // 1
]);

assert(g(prices, 2, 3), [0, 1, 0, 0 // 5
]);

assert(g(prices, 3, 3), [0, 0, 1, 0 // 8
]);

assert(g(prices, 4, 3), [0, 2, 0, 0 // 10
]);

assert(g(prices, 5, 3), [0, 1, 1, 0 // 13
]);

assert(g(prices, 6, 3), [0, 0, 2, 0 // 16
]);

assert(g(prices, 7, 3), [0, 2, 1, 0 // 18
]);

assert(g(prices, 8, 3), [0, 1, 2, 0 // 21
]);

assert(g(prices, 9, 3), [0, 0, 3, 0 // 24
]);

assert(g(prices, 10, 3), [0, 2, 2, 0 // 26
]);

//####################################
assert(gc([1, 12, 19, 25], 10), [0, 0, 2, 1]);

assert(gc([1, 5, 7, 10], 4), [0, 2, 0, 0]);

prices = [1, 5, 8, 9 // 1 2.5 2.67 2.25 clen=3
];

assert(gc(prices, 1), [1, 0, 0, 0]);

assert(gc(prices, 2), [0, 1, 0, 0]);

assert(gc(prices, 3), [0, 0, 1, 0]);

assert(gc(prices, 4), [0, 2, 0, 0]);

assert(gc(prices, 5), [0, 1, 1, 0]);

assert(gc(prices, 6), [0, 0, 2, 0]);

assert(gc(prices, 7), [0, 2, 1, 0]);

assert(gc(prices, 8), [0, 1, 2, 0]);

assert(gc(prices, 9), [0, 0, 3, 0]);

assert(gc(prices, 10), [0, 2, 2, 0]);

prices = [1, 6, 10, 14 // 1 3 3.33 3.5 clen=4
];

assert(gc(prices, 1), [1, 0, 0, 0]);

assert(gc(prices, 2), [0, 1, 0, 0]);

assert(gc(prices, 3), [0, 0, 1, 0]);

assert(gc(prices, 4), [0, 0, 0, 1]);

assert(gc(prices, 5), [0, 1, 1, 0]);

assert(gc(prices, 6), [0, 1, 0, 1]);

assert(gc(prices, 7), [0, 0, 1, 1]);

assert(gc(prices, 8), [0, 0, 0, 2]);

assert(gc(prices, 9), [0, 1, 1, 1]);

assert(gc(prices, 10), [0, 1, 0, 2]);

assert(gc(prices, 11), [0, 0, 1, 2]);

assert(gc(prices, 12), [0, 0, 0, 3]);

prices = [5, 6, 7, 10 // 5 3 3.5 2.5 clen=1
];

assert(gc(prices, 1), [1, 0, 0, 0 // 5
]);

assert(gc(prices, 2), [2, 0, 0, 0 // 10
]);

assert(gc(prices, 3), [3, 0, 0, 0 // 15
]);

assert(gc(prices, 4), [4, 0, 0, 0 // 20
]);

assert(gc(prices, 5), [5, 0, 0, 0 // 25
]);

assert(gc(prices, 6), [6, 0, 0, 0 // 30
]);

assert(gc(prices, 7), [7, 0, 0, 0 // 35
]);

assert(gc(prices, 8), [8, 0, 0, 0 // 40
]);

assert(gc(prices, 9), [9, 0, 0, 0 // 45
]);

assert(gc(prices, 10), [10, 0, 0, 0 // 50
]);

prices = [46, 64, 75, 96 // 46 32 25 24 clen=1
];

assert(gc(prices, 1), [1, 0, 0, 0 // 46
]);

assert(gc(prices, 2), [2, 0, 0, 0 // 92
]);

assert(gc(prices, 3), [3, 0, 0, 0 // ...
]);

assert(gc(prices, 4), [4, 0, 0, 0]);

assert(gc(prices, 5), [5, 0, 0, 0]);

assert(gc(prices, 6), [6, 0, 0, 0]);

assert(gc(prices, 7), [7, 0, 0, 0]);

assert(gc(prices, 8), [8, 0, 0, 0]);

assert(gc(prices, 9), [9, 0, 0, 0]);

assert(gc(prices, 10), [10, 0, 0, 0]);

// for k in range 100
// 	prices = []
// 	for i in range 10
// 		prices.push Math.round 10 + 90 * Math.random()
// 	prices.sort()
// 	print prices 
// 	for i in range 1,101
// 		print gc prices,i
// print 'Ready!'
//# sourceMappingURL=sketch.js.map
