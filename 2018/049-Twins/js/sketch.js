"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
var COLORS, FREE, N, SIZE, TILE, b, bridge, brightness, draw, getcols, getlst, getrows, legal, makeColors, makeGame, message, mousePressed, selected, setup, within;

SIZE = 12;

TILE = 60;

FREE = -1;

N = 21; // 2..60

b = null;

COLORS = null;

selected = [];

message = '';

setup = function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  textSize(0.8 * TILE);
  makeColors();
  return makeGame();
};

brightness = function brightness(s) {
  var ch, l, len, res;
  res = 0;
  for (l = 0, len = s.length; l < len; l++) {
    ch = s[l];
    res += "0123456789abcdef#".indexOf(ch);
  }
  return res;
};

makeColors = function makeColors() {
  var i, j, k, l, len, len1, len2, m, n, ref, ref1, ref2;
  COLORS = [];
  ref = "05af";
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    ref1 = "05af";
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      j = ref1[m];
      ref2 = "05af";
      for (n = 0, len2 = ref2.length; n < len2; n++) {
        k = ref2[n];
        COLORS.push("#" + i + j + k);
      }
    }
  }
  COLORS = _.without(COLORS, "#000", "#005", "#00a", "#00f");
  return COLORS.sort(function (a, b) {
    return brightness(b) - brightness(a);
  });
};

makeGame = function makeGame() {
  var candidates, i, j, l, len, len1, m, ref, ref1, results;
  candidates = [];
  ref = range(50);
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    candidates.push(i % N);
    candidates.push(N - 1 - i % N);
  }
  candidates = _.shuffle(candidates);
  b = new Array(SIZE);
  ref1 = range(SIZE);
  results = [];
  for (m = 0, len1 = ref1.length; m < len1; m++) {
    i = ref1[m];
    b[i] = new Array(SIZE);
    results.push(function () {
      var len2, n, ref2, results1;
      ref2 = range(SIZE);
      results1 = [];
      for (n = 0, len2 = ref2.length; n < len2; n++) {
        j = ref2[n];
        if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1) {
          results1.push(b[i][j] = FREE);
        } else {
          results1.push(b[i][j] = candidates.pop());
        }
      }
      return results1;
    }());
  }
  return results;
};

draw = function draw() {
  var cell, i, j, l, len, len1, len2, m, n, ref, ref1, results;
  bg(1);
  translate(TILE, TILE);
  textAlign(CENTER, CENTER);
  fc(1);
  sc(0);
  ref = range(SIZE);
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    ref1 = range(SIZE);
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      j = ref1[m];
      fc(0);
      sc(1);
      rect(TILE * i, TILE * j, TILE, TILE);
      cell = b[i][j];
      if (cell >= 0) {
        fill(COLORS[cell]);
        sc();
        text(b[i][j], TILE * i, TILE * j);
      }
    }
  }
  text(selected, 10, SIZE * TILE);
  results = [];
  for (n = 0, len2 = selected.length; n < len2; n++) {
    var _selected$n = _slicedToArray(selected[n], 2);

    i = _selected$n[0];
    j = _selected$n[1];

    fc(1, 1, 0, 0.5);
    sc();
    results.push(circle(TILE * i, TILE * j, TILE / 2 - 3));
  }
  return results;
};

within = function within(i, j) {
  return 0 <= i && i < SIZE && 0 <= j && j < SIZE;
};

mousePressed = function mousePressed() {
  var i, i1, j, j1;
  var _ref = [Math.floor((mouseX - TILE / 2) / TILE), Math.floor((mouseY - TILE / 2) / TILE)];
  i = _ref[0];
  j = _ref[1];

  if (!within(i, j)) {
    return;
  }
  if (selected.length === 0) {
    if (b[i][j] !== FREE) {
      return selected.push([i, j]);
    }
  } else {
    var _selected$ = _slicedToArray(selected[0], 2);

    i1 = _selected$[0];
    j1 = _selected$[1];

    if (i === i1 && j === j1) {
      return selected.pop();
    }
    if (b[i][j] + b[i1][j1] === N - 1) {
      if (legal(i, j, i1, j1) || bridge(i, j, i1, j1)) {
        b[i][j] = b[i1][j1] = FREE;
        return selected.pop();
      }
    }
  }
};

// A*. This algorithm blocks itself sometimes.
// That's why bridge is also used.
legal = function legal(i0, j0, i1, j1) {
  var cands, dx, dy, front, index, index0, key, l, len, len1, m, next, reached, ref, start, turns, turns0, x, x0, y, y0;
  start = [0, i0, j0, -1];
  cands = [];
  cands.push(start);
  reached = {};
  reached[[i0, j0]] = start;
  while (cands.length > 0) {
    front = cands;
    front.sort(function (a, b) {
      return a[0] - b[0];
    });
    cands = [];
    for (l = 0, len = front.length; l < len; l++) {
      var _front$l = _slicedToArray(front[l], 4);

      turns0 = _front$l[0];
      x0 = _front$l[1];
      y0 = _front$l[2];
      index0 = _front$l[3];

      ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (index = m = 0, len1 = ref.length; m < len1; index = ++m) {
        var _ref$index = _slicedToArray(ref[index], 2);

        dx = _ref$index[0];
        dy = _ref$index[1];
        x = x0 + dx;
        y = y0 + dy;

        key = [x, y];
        turns = turns0;
        if (index !== index0 && index0 !== -1) {
          turns++;
        }
        next = [turns, x, y, index];
        if (x === i1 && y === j1) {
          return 2 >= turns;
        }
        if (within(x, y)) {
          if (b[x][y] === FREE) {
            if (!(key in reached) || reached[key][0] > next[0]) {
              reached[key] = next;
              cands.push(next);
            }
          }
        }
      }
    }
  }
  return false;
};

getlst = function getlst(x0, y0, dx, dy) {
  var resx, resy, x, y;
  resx = [];
  resy = [];
  x = x0 + dx;
  y = y0 + dy;

  while (within(x, y)) {
    if (b[x][y] !== FREE) {
      return [resx, resy];
    }
    resx.push(x);
    resy.push(y);
    var _ref2 = [x + dx, y + dy];
    x = _ref2[0];
    y = _ref2[1];
  }
  return [resx, resy];
};

getrows = function getrows(x0, x1) {
  var found, l, len, len1, m, ref, ref1, res, x, y;
  res = [];
  ref = range(SIZE);
  for (l = 0, len = ref.length; l < len; l++) {
    y = ref[l];
    found = false;
    ref1 = range(x0, x1);
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      x = ref1[m];
      if (b[x][y] !== FREE) {
        found = true;
      }
    }
    if (!found) {
      res.push(y);
    }
  }
  return res;
};

getcols = function getcols(y0, y1) {
  var found, l, len, len1, m, ref, ref1, res, x, y;
  res = [];
  ref = range(SIZE);
  for (l = 0, len = ref.length; l < len; l++) {
    x = ref[l];
    found = false;
    ref1 = range(y0, y1);
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      y = ref1[m];
      if (b[x][y] !== FREE) {
        found = true;
      }
    }
    if (!found) {
      res.push(x);
    }
  }
  return res;
};

bridge = function bridge(x0, y0, x1, y1) {
  var lst1, lst2, lst3, lst4, lst5;
  lst1 = getlst(x0, y0, 0, -1)[1].concat(getlst(x0, y0, 0, 1)[1]);
  lst2 = getlst(x1, y1, 0, -1)[1].concat(getlst(x1, y1, 0, 1)[1]);
  lst3 = getrows(_.min([x0, x1]) + 1, _.max([x0, x1]));
  lst4 = _.intersection(lst1, lst2, lst3);
  lst1 = getlst(x0, y0, -1, 0)[0].concat(getlst(x0, y0, 1, 0)[0]);
  lst2 = getlst(x1, y1, -1, 0)[0].concat(getlst(x1, y1, 1, 0)[0]);
  lst3 = getcols(_.min([y0, y1]) + 1, _.max([y0, y1]));
  lst5 = _.intersection(lst1, lst2, lst3);
  return lst4.length > 0 || lst5.length > 0;
};
//# sourceMappingURL=sketch.js.map
