"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
// Lägg till två stjärnor
// Hantera felaktiga drag
// Kunna ångra första valet.
// Hantera hängning
var FREE, N, SIZE, TILE, b, draw, legal, makeGame, message, mousePressed, selected, setup;

SIZE = 12;

TILE = 40;

FREE = -1;

N = 5;

b = null;

selected = [];

message = '';

setup = function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  textSize(32);
  return makeGame();
};

makeGame = function makeGame() {
  var candidates, i, j, k, l, len, len1, len2, m, ref, ref1, ref2, results;
  candidates = [];
  ref = range(20);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    ref1 = range(5);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      candidates.push(j);
    }
  }
  candidates = _.shuffle(candidates);
  b = new Array(SIZE);
  ref2 = range(SIZE);
  results = [];
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    b[i] = new Array(SIZE);
    results.push(function () {
      var len3, n, ref3, results1;
      ref3 = range(SIZE);
      results1 = [];
      for (n = 0, len3 = ref3.length; n < len3; n++) {
        j = ref3[n];
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
  var cell, i, j, k, l, len, len1, len2, m, ref, ref1, results;
  bg(1);
  translate(TILE, TILE);
  textAlign(CENTER, CENTER);
  fc(1);
  sc(0);
  ref = range(SIZE);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    ref1 = range(SIZE);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      fc(0.5);
      sc(0);
      rect(TILE * i, TILE * j, TILE, TILE);
      cell = b[i][j];
      if (cell >= 0) {
        fill(["#000", "#f00", "#0f0", "#00f", "#ff0"][cell]);
        sc();
        text(b[i][j], TILE * i, TILE * j);
      }
    }
  }
  text(selected, 10, SIZE * TILE);
  results = [];
  for (m = 0, len2 = selected.length; m < len2; m++) {
    var _selected$m = _slicedToArray(selected[m], 2);

    i = _selected$m[0];
    j = _selected$m[1];

    fc(1, 1, 0, 0.5);
    sc();
    results.push(circle(TILE * i, TILE * j, TILE / 2 - 3));
  }
  return results;
};

mousePressed = function mousePressed() {
  var i, i1, j, j1;
  var _ref = [Math.floor((mouseX - TILE / 2) / TILE), Math.floor((mouseY - TILE / 2) / TILE)];
  i = _ref[0];
  j = _ref[1];

  if (!(0 <= i && i <= 11 && 0 <= j && j <= 11)) {
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
    if (b[i][j] + b[i1][j1] === 4 && (legal(i, j, i1, j1) || legal(i1, j1, i, j))) {
      b[i][j] = b[i1][j1] = FREE;
      return selected.pop();
    }
  }
};

legal = function legal(i0, j0, i1, j1) {
  var cands, dx, dy, front, index, index0, k, key, l, len, len1, next, reached, ref, start, turns, turns0, x, x0, y, y0;
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
    for (k = 0, len = front.length; k < len; k++) {
      var _front$k = _slicedToArray(front[k], 4);

      turns0 = _front$k[0];
      x0 = _front$k[1];
      y0 = _front$k[2];
      index0 = _front$k[3];

      ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (index = l = 0, len1 = ref.length; l < len1; index = ++l) {
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
        if (0 <= x && x <= 11 && 0 <= y && y <= 11) {
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
//# sourceMappingURL=sketch.js.map