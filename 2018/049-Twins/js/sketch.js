'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
// Internt används talen 1..100. Externt visas de som 0..99
// Då ett tal plockats bort negeras det. Dessa visas gråa och förminskade.
// Ramens celler innehåller 0.
var Button,
    COLORS,
    FREE,
    Hearts,
    KEY,
    SIZE,
    TILE,
    b,
    buttons,
    copyToClipboard,
    deathTimestamp,
    delta,
    draw,
    drawHints,
    drawLittera,
    drawNumber,
    drawPath,
    drawRect,
    drawShadow,
    found,
    hearts,
    hints,
    lastHints,
    latestPair,
    legal,
    level,
    loadStorage,
    makeGame,
    makeLink,
    makeMove,
    makePath,
    maxLevel,
    message,
    milliseconds0,
    milliseconds1,
    mousePressed,
    newGame,
    numbers,
    path,
    pathTimestamp,
    saveStorage,
    selected,
    setup,
    showLittera,
    showMoves,
    showMoves1,
    showShadow,
    size,
    state,
    urlGame,
    within,
    modulo = function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
},
    indexOf = [].indexOf;

SIZE = 12;

TILE = 60;

FREE = 0;

COLORS = '#fff #f00 #0f0 #ff0 #f0f #0ff #800 #080 #d00'.split(' ');

KEY = '049-Twins';

size = null;

level = null;

maxLevel = null;

numbers = null;

b = null;

selected = [];

message = '';

buttons = [];

path = [];

pathTimestamp = null;

deathTimestamp = null;

hearts = null;

milliseconds0 = null;

milliseconds1 = null;

state = 'halted'; // 'running' 'halted'

delta = 0;

found = null;

showLittera = false;

showShadow = true;

hints = [];

lastHints = [];

latestPair = [];

Hearts = function () {
  function Hearts(x1, y3) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;
    var maximum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 9;

    _classCallCheck(this, Hearts);

    this.x = x1;
    this.y = y3;
    this.count = count;
    this.maximum = maximum;
  }

  _createClass(Hearts, [{
    key: 'draw',
    value: function draw() {
      var i, k, len, ref, results, x;
      ref = range(this.maximum);
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        x = this.x + 60 * i;
        if (i < this.count) {
          results.push(this.drawHeart(x, this.y, 10, 1, 0, 0));
        } else {
          results.push(this.drawHeart(x, this.y, 10, 0.5, 0.5, 0.5));
        }
      }
      return results;
    }
  }, {
    key: 'drawHeart',
    value: function drawHeart(x, y, n, r, g, b) {
      var dx, y1, y2;
      fc(r, g, b);
      sc(r, g, b);
      sw(n);
      dx = 1.2 * n;
      y -= 0.8 * n;
      y1 = y + 0.6 * n;
      y2 = y + 2.2 * n;
      line(x - dx, y1, x, y2);
      line(x + dx, y1, x, y2);
      line(x, y + 0.5 * n, x, y + 2 * n);
      sc();
      circle(x - n, y, n);
      return circle(x + n, y, n);
    }
  }]);

  return Hearts;
}();

Button = function () {
  function Button(x1, y3, txt1, click) {
    _classCallCheck(this, Button);

    this.x = x1;
    this.y = y3;
    this.txt = txt1;
    this.click = click;
    this.r = 24;
  }

  _createClass(Button, [{
    key: 'inside',
    value: function inside(x, y) {
      return this.r > dist(this.x, this.y, x, y);
    }
  }, {
    key: 'draw',
    value: function draw() {
      fc(0.5);
      if (level === maxLevel) {
        sc(1);
      } else {
        sc();
      }
      sw(2);
      circle(this.x, this.y, this.r);
      fc(0);
      textSize(30);
      sc();
      return text(this.txt, this.x, this.y);
    }
  }]);

  return Button;
}();

newGame = function newGame(n) {
  if (n === 1 || n === maxLevel + 1) {
    return;
  }
  level = constrain(n, 2, maxLevel);
  return makeGame();
};

saveStorage = function saveStorage() {
  return localStorage[KEY] = maxLevel;
};

loadStorage = function loadStorage() {
  return maxLevel = KEY in localStorage ? parseInt(localStorage[KEY]) : maxLevel = 2;
};

setup = function setup() {
  var canvas;
  canvas = createCanvas(30 + TILE * SIZE + 30, 50 + TILE * SIZE + TILE);
  canvas.position(0, 0); // hides text field used for clipboard copy.
  rectMode(CENTER);
  loadStorage();
  level = maxLevel;
  buttons.push(new Button(60, 40, '-', function () {
    return newGame(level - 1);
  }));
  buttons.push(new Button(120, 40, level, function () {})); // showLittera = not showLittera
  buttons.push(new Button(180, 40, '+', function () {
    return newGame(level + 1);
  }));
  hearts = new Hearts(240, 35);
  if (-1 !== window.location.href.indexOf('level')) {
    urlGame();
  } else {
    makeGame();
  }
  return showMoves();
};

urlGame = function urlGame() {
  var params;
  params = getParameters();
  level = parseInt(params.level);
  b = JSON.parse(params.b);
  size = 5 + Math.floor(level / 4);
  if (size > 12) {
    size = 12;
  }
  hearts.count = size - 3;
  hearts.maximum = size - 3;
  numbers = (size - 2) * (size - 2);
  if (numbers % 2 === 1) {
    numbers -= 1;
  }
  milliseconds0 = millis();
  return state = 'running';
};

makeGame = function makeGame() {
  var candidates, i, j, k, l, len, len1, len2, link, m, ref, ref1, ref2;
  level += delta;
  maxLevel += delta;
  delta = 0;
  saveStorage();
  size = 5 + Math.floor(level / 4);
  if (size > 12) {
    size = 12;
  }
  hearts.count = size - 3;
  hearts.maximum = size - 3;
  numbers = (size - 2) * (size - 2);
  if (numbers % 2 === 1) {
    numbers -= 1;
  }
  candidates = [];
  ref = range(numbers / 2);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    candidates.push(1 + i % level);
    candidates.push(1 + level - 1 - i % level);
  }
  candidates = _.shuffle(candidates);
  b = new Array(size);
  ref1 = range(size);
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    i = ref1[l];
    b[i] = new Array(size);
    ref2 = range(size);
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      j = ref2[m];
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
        b[i][j] = FREE;
      } else {
        if (size % 2 === 0) {
          b[i][j] = candidates.pop();
        } else {
          if (i === Math.floor(size / 2) && j === Math.floor(size / 2)) {
            b[i][j] = FREE;
          } else {
            b[i][j] = candidates.pop();
          }
        }
      }
    }
  }
  milliseconds0 = millis();
  state = 'running';
  link = makeLink();
  copyToClipboard(link);
  return print(link);
};

makeLink = function makeLink() {
  var index, url;
  url = window.location.href + '?';
  index = url.indexOf('?');
  url = url.substring(0, index);
  url += '?b=' + JSON.stringify(b);
  url += '&level=' + level;
  return url;
};

drawRect = function drawRect(i, j) {
  fc(0);
  sc(0.25);
  sw(1);
  return rect(TILE * i, TILE * j, TILE, TILE);
};

drawNumber = function drawNumber(cell, i, j) {
  cell -= 1;
  sw(3);
  fill(COLORS[modulo(cell, COLORS.length)]);
  stroke(COLORS[Math.floor(cell / COLORS.length)]);
  return text(cell, TILE * i, TILE * j);
};

drawShadow = function drawShadow(i, j) {
  var ref;
  if (showShadow) {
    sw(3);
    fill(48);
    stroke(48);
    if (ref = -b[i][j] - 1, indexOf.call(latestPair, ref) >= 0) {
      return text(-b[i][j] - 1, TILE * i, TILE * j);
    }
  }
};

draw = function draw() {
  var button, cell, h, i, j, k, l, len, len1, len2, len3, m, ms, o, ref, ref1, w, x, y;
  bg(0.25);
  sw(1);
  buttons[1].txt = level - 1;
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    button.draw();
  }
  hearts.draw();
  translate(TILE, TILE + 50);
  textAlign(CENTER, CENTER);
  fc(1);
  sc(0);
  textSize(0.8 * TILE);
  ref = range(size);
  for (l = 0, len1 = ref.length; l < len1; l++) {
    i = ref[l];
    ref1 = range(size);
    for (m = 0, len2 = ref1.length; m < len2; m++) {
      j = ref1[m];
      drawRect(i, j);
      cell = b[i][j];
      if (cell > 0) {
        drawNumber(cell, i, j);
      } else if (cell === FREE) {} else {
        drawShadow(i, j);
      }
      if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
        drawLittera(i, j);
      }
    }
  }
  for (o = 0, len3 = selected.length; o < len3; o++) {
    var _selected$o = _slicedToArray(selected[o], 2);

    i = _selected$o[0];
    j = _selected$o[1];

    fc(1, 1, 0, 0.5);
    sc();
    circle(TILE * i, TILE * j, TILE / 2 - 3);
  }
  drawPath();
  if (state === 'halted') {
    fc(1, 1, 0, 0.5);
    x = (size - 1) * TILE / 2;
    y = (size - 1) * TILE / 2;
    w = size * TILE;
    h = size * TILE;
    rect(x, y, w, h);
    ms = round(milliseconds1 - milliseconds0) / 1000;
    if (ms > 0) {
      y = size * TILE - 10;
      fc(1);
      sc();
      textSize(20);
      text(ms, x, y);
    }
  }
  if (millis() < deathTimestamp) {
    x = Math.floor(size / 2) * TILE;
    y = Math.floor(size / 2) * TILE;
    if (size % 2 === 0) {
      var _ref = [x - TILE / 2, y - TILE / 2];
      x = _ref[0];
      y = _ref[1];
    }
    hearts.drawHeart(x, y, size * TILE / 5, 1, 0, 0);
  }
  return drawHints();
};

drawHints = function drawHints() {
  var msg0, msg1;
  textSize(24);
  if (lastHints.length === 0) {
    msg0 = '' + hints[0];
    msg1 = '' + hints[1];
  } else {
    msg0 = hints[0] + ' (' + (hints[0] - lastHints[0]) + ')';
    msg1 = hints[1] + ' (' + (hints[1] - lastHints[1]) + ')';
  }
  fc(0, 1, 0);
  text(msg0, 0, height - 127);
  fc(1, 0, 0);
  return text(msg1, width - 100, height - 127);
};

drawLittera = function drawLittera(i, j) {
  if (showLittera) {
    push();
    textSize(32);
    fc(0.25);
    sc(0.25);
    if ((j === 0 || j === size - 1) && i < size - 1) {
      text(' abcdefghik '[i], TILE * i, TILE * j);
    } else if ((i === 0 || i === size - 1) && 0 < j && j < size - 1) {
      text(size - 1 - j, TILE * i, TILE * j);
    }
    return pop();
  }
};

within = function within(i, j) {
  return 0 <= i && i < size && 0 <= j && j < size;
};

mousePressed = function mousePressed() {
  var button, i, i1, j, j1, k, len;
  if (state === 'halted') {
    newGame(level);
    return;
  }
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    if (button.inside(mouseX, mouseY)) {
      button.click();
    }
  }
  var _ref2 = [Math.floor((mouseX - TILE / 2) / TILE), Math.floor((mouseY - 50 - TILE / 2) / TILE)];
  i = _ref2[0];
  j = _ref2[1];

  if (!within(i, j)) {
    return;
  }
  if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
    showLittera = !showLittera;
    return;
  }
  if (b[i][j] < 0) {
    showShadow = !showShadow;
    return;
  }
  if (selected.length === 0) {
    if (b[i][j] > 0) {
      selected.push([i, j]);
    }
  } else {
    var _selected$ = _slicedToArray(selected[0], 2);

    i1 = _selected$[0];
    j1 = _selected$[1];

    if (i === i1 && j === j1) {
      return selected.pop();
    }
    if (b[i][j] - 1 + b[i1][j1] - 1 !== level - 1) {
      hearts.count -= 1; // Punish one, wrong sum
      deathTimestamp = 200 + millis();
      selected.pop();
    } else {
      path = legal(false, i1, j1, i, j);
      if (path.length === 0) {
        path = legal(true, i1, j1, i, j);
        if (path.length === 0) {
          hearts.count -= 2; // Punish two, anything goes
        } else {
          hearts.count -= 1; // Punish one, wrap
        }
        deathTimestamp = 200 + millis();
      }
      latestPair = [b[i][j] - 1, b[i1][j1] - 1];
      //print latestPair
      b[i][j] = -b[i][j];
      b[i1][j1] = -b[i1][j1];
      numbers -= 2;
      selected.pop();
      if (numbers === 0) {
        milliseconds1 = millis();
        state = 'halted';
        //if level == maxLevel 
        if (hearts.count >= 0) {
          delta = 1;
        } else {
          delta = -1;
        }
      } else {
        if (level === maxLevel) {
          if (hearts.count < 0) {
            state = 'halted';
            delta = -1;
          }
        }
      }
    }
  }
  return showMoves();
};

makeMove = function makeMove(wrap, x, y) {
  if (wrap) {
    return [modulo(x, size), modulo(y, size)];
  } else {
    return [x, y];
  }
};

makePath = function makePath(wrap, reached, i, j) {
  var di, dj, i0, index, indexes0, j0, k, key, len, res, turns0;
  res = [];
  key = i + ',' + j;

  var _reached$key = _slicedToArray(reached[key], 4);

  turns0 = _reached$key[0];
  i0 = _reached$key[1];
  j0 = _reached$key[2];
  indexes0 = _reached$key[3];
  i = i0;
  j = j0;

  res.push([i, j]);
  pathTimestamp = millis();
  indexes0.reverse();
  for (k = 0, len = indexes0.length; k < len; k++) {
    index = indexes0[k];

    var _index = _slicedToArray([[1, 0], [-1, 0], [0, 1], [0, -1]][index], 2);

    di = _index[0];
    dj = _index[1];

    var _makeMove = makeMove(wrap, i + di, j + dj);

    var _makeMove2 = _slicedToArray(_makeMove, 2);

    i = _makeMove2[0];
    j = _makeMove2[1];

    res.push([i, j]);
  }
  return res;
};

drawPath = function drawPath() {
  var i1, i2, j1, j2, k, len;
  if (path.length === 0) {
    return;
  }
  sw(3);
  sc(1, 1, 0);

  var _path$ = _slicedToArray(path[0], 2);

  i1 = _path$[0];
  j1 = _path$[1];

  for (k = 0, len = path.length; k < len; k++) {
    var _path$k = _slicedToArray(path[k], 2);

    i2 = _path$k[0];
    j2 = _path$k[1];

    if (1 === dist(i1, j1, i2, j2)) {
      line(TILE * i1, TILE * j1, TILE * i2, TILE * j2);
    }
    i1 = i2;
    j1 = j2;
  }
  if (millis() > 500 + pathTimestamp) {
    return path = [];
  }
};

// A*
legal = function legal(wrap, i0, j0, i1, j1) {
  var cands, dx, dy, front, index, indexes0, k, key, l, len, len1, next, reached, ref, start, turns, turns0, x, x0, y, y0;
  start = [0, i0, j0, // turns,x,y,move
  []];
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
      indexes0 = _front$k[3];

      ref = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (index = l = 0, len1 = ref.length; l < len1; index = ++l) {
        var _ref$index = _slicedToArray(ref[index], 2);

        dx = _ref$index[0];
        dy = _ref$index[1];

        var _makeMove3 = makeMove(wrap, x0 + dx, y0 + dy);

        var _makeMove4 = _slicedToArray(_makeMove3, 2);

        x = _makeMove4[0];
        y = _makeMove4[1];

        key = x + ',' + y;
        turns = turns0;
        if (indexes0.length > 0 && index !== _.last(indexes0)) {
          turns++;
        }
        next = [turns, x, y, indexes0.concat([index])];
        if (x === i1 && y === j1 && turns <= 2) {
          reached[key] = next;
          return makePath(wrap, reached, i1, j1);
        }
        if (within(x, y)) {
          if (b[x][y] <= 0) {
            if (!(key in reached) || reached[key][0] >= next[0]) {
              if (next[0] < 3) {
                reached[key] = next;
                cands.push(next);
              }
            }
          }
        }
      }
    }
  }
  return [];
};

copyToClipboard = function copyToClipboard(txt) {
  var copyText;
  copyText = document.getElementById("myClipboard");
  copyText.value = txt;
  copyText.select();
  return document.execCommand("copy");
};

showMoves = function showMoves() {
  lastHints = hints;
  return hints = [showMoves1(false), showMoves1(true)];
};

showMoves1 = function showMoves1(wrap) {
  var i0, i1, j0, j1, k, l, len, len1, len2, len3, m, o, ref, ref1, ref2, ref3, ref4, res;
  res = [];
  ref = range(1, size - 1);
  for (k = 0, len = ref.length; k < len; k++) {
    i0 = ref[k];
    ref1 = range(1, size - 1);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j0 = ref1[l];
      if (b[i0][j0] > 0) {
        ref2 = range(1, size - 1);
        for (m = 0, len2 = ref2.length; m < len2; m++) {
          i1 = ref2[m];
          ref3 = range(1, size - 1);
          for (o = 0, len3 = ref3.length; o < len3; o++) {
            j1 = ref3[o];
            if (b[i1][j1] > 0) {
              if (b[i0][j0] - 1 + b[i1][j1] - 1 === level - 1) {
                if (b[i0][j0] <= b[i1][j1] && (i0 !== i1 || j0 !== j1)) {
                  path = legal(wrap, i0, j0, i1, j1);
                  if (path.length > 0) {
                    if (ref4 = [b[i0][j0] - 1, b[i1][j1] - 1], indexOf.call(res, ref4) < 0) {
                      res.push([b[i0][j0] - 1, b[i1][j1] - 1]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return res.length;
};
//# sourceMappingURL=sketch.js.map
