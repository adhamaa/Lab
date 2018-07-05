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
    Size,
    TILE,
    b,
    buttons,
    copyToClipboard,
    deathTimestamp,
    delta,
    draw,
    drawHint0,
    drawHint1,
    drawHints,
    drawLittera,
    drawNumber,
    drawPath,
    drawProgress,
    drawRect,
    drawShadow,
    found,
    hearts,
    hints0,
    hints1,
    keyPressed,
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
    pretty,
    rensaWrap,
    saveStorage,
    selected,
    setup,
    showHint,
    showLittera,
    showMoves,
    showMoves1,
    showShadow,
    state,
    urlGame,
    within,
    modulo = function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
};

SIZE = 12;

TILE = 60;

FREE = 0;

COLORS = '#fff #f00 #0f0 #ff0 #f0f #0ff #880 #f88 #088 #8f8'.split(' ');

KEY = '049-Twins';

Size = null;

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

showLittera = true;

showShadow = true;

showHint = false;

hints0 = [];

hints1 = [];

latestPair = [];

Hearts = function () {
  function Hearts(x2, y3) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
    var maximum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 12;

    _classCallCheck(this, Hearts);

    this.x = x2;
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
  function Button(x2, y3, txt1, click) {
    _classCallCheck(this, Button);

    this.x = x2;
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
  if (n === 0 || n === maxLevel + 1) {
    return;
  }
  level = constrain(n, 2, maxLevel);
  makeGame();
  return showMoves();
};

saveStorage = function saveStorage() {
  return localStorage[KEY] = maxLevel;
};

loadStorage = function loadStorage() {
  return maxLevel = KEY in localStorage ? parseInt(localStorage[KEY]) : maxLevel = 2;
};

setup = function setup() {
  var canvas;
  canvas = createCanvas(TILE * (SIZE + 1), TILE * (SIZE + 2));
  canvas.position(0, 0); // hides text field used for clipboard copy.
  rectMode(CENTER);
  loadStorage();
  level = maxLevel;
  buttons.push(new Button(180 + 90, height - TILE / 2, '<', function () {
    return newGame(1);
  }));
  buttons.push(new Button(180 + 150, height - TILE / 2, '-', function () {
    return newGame(level - 1);
  }));
  buttons.push(new Button(180 + 210, height - TILE / 2, level, function () {}));
  buttons.push(new Button(180 + 270, height - TILE / 2, '+', function () {
    return newGame(level + 1);
  }));
  buttons.push(new Button(180 + 330, height - TILE / 2, '>', function () {
    return newGame(maxLevel);
  }));
  hearts = new Hearts(60, 35);
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
  Size = 4 + Math.floor(level / 4);
  if (Size > 12) {
    Size = 12;
  }
  hearts.count = constrain(1 + Math.floor(level / 8), 0, 12);
  hearts.maximum = constrain(1 + Math.floor(level / 8), 0, 12);
  numbers = (Size - 2) * (Size - 2);
  if (numbers % 2 === 1) {
    numbers -= 1;
  }
  milliseconds0 = millis();
  return state = 'running';
};

makeGame = function makeGame() {
  var candidates, i, j, k, l, len, len1, len2, link, m, ref, ref1, ref2;
  hints0 = [];
  hints1 = [];
  latestPair = [];
  if (level === maxLevel) {
    maxLevel = constrain(maxLevel + delta, 2, 100);
  }
  level += delta;
  delta = 0;
  saveStorage();
  Size = 4 + Math.floor(level / 4);
  if (Size > 12) {
    Size = 12;
  }
  hearts.count = constrain(1 + Math.floor(level / 8), 0, 12);
  hearts.maximum = constrain(1 + Math.floor(level / 8), 0, 12);
  numbers = (Size - 2) * (Size - 2);
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
  b = new Array(Size);
  ref1 = range(Size);
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    i = ref1[l];
    b[i] = new Array(Size);
    ref2 = range(Size);
    for (m = 0, len2 = ref2.length; m < len2; m++) {
      j = ref2[m];
      if (i === 0 || i === Size - 1 || j === 0 || j === Size - 1) {
        b[i][j] = FREE;
      } else {
        if (Size % 2 === 0) {
          b[i][j] = candidates.pop();
        } else {
          if (i === Math.floor(Size / 2) && j === Math.floor(Size / 2)) {
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
  var c1, c2;
  cell -= 1;
  sw(3);
  c1 = COLORS[modulo(cell, COLORS.length)];
  c2 = COLORS[Math.floor(cell / COLORS.length)];
  if (c1 === c2) {
    c1 = '#000';
  }
  fill(c1);
  stroke(c2);
  return text(cell, TILE * i, TILE * j);
};

drawHint0 = function drawHint0(cell, i, j) {
  if (showHint) {
    sw(1);
    fc(0, 1, 0);
    sc();
    textSize(20);
    return text(cell, TILE * i - 20, TILE * j + 20);
  }
};

drawHint1 = function drawHint1(cell, i, j) {
  if (showHint) {
    sw(1);
    fc(1, 0, 0);
    sc();
    textSize(20);
    return text(cell, TILE * i + 20, TILE * j + 20);
  }
};

drawShadow = function drawShadow(i, j) {
  var k, len, results, x, y;
  if (showShadow) {
    sw(3);
    fill(48);
    stroke(48);
    results = [];
    for (k = 0, len = latestPair.length; k < len; k++) {
      var _latestPair$k = _slicedToArray(latestPair[k], 2);

      x = _latestPair$k[0];
      y = _latestPair$k[1];

      if (i === x && j === y) {
        results.push(text(-b[i][j] - 1, TILE * i, TILE * j));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

draw = function draw() {
  var button, cell, h, i, i0, i1, index, j, j0, j1, k, l, len, len1, len2, len3, len4, len5, m, ms, o, q, ref, ref1, s, w, x, y;
  bg(0.25);
  sw(1);
  buttons[2].txt = level - 1;
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    button.draw();
  }
  hearts.draw();
  textAlign(CENTER, CENTER);
  textSize(0.8 * TILE);
  push();
  translate((width - TILE * Size) / 2 + TILE / 2, (height - TILE * Size) / 2 + TILE / 2);
  fc(1);
  sc(0);
  ref = range(Size);
  for (l = 0, len1 = ref.length; l < len1; l++) {
    i = ref[l];
    ref1 = range(Size);
    for (m = 0, len2 = ref1.length; m < len2; m++) {
      j = ref1[m];
      drawRect(i, j);
      cell = b[i][j];
      if (state === 'halted') {
        if (cell !== FREE) {
          drawNumber(abs(cell), i, j);
        }
      } else {
        if (cell > 0) {
          drawNumber(cell, i, j);
        } else if (cell !== FREE) {
          drawShadow(i, j);
        }
      }
      if (i === 0 || i === Size - 1 || j === 0 || j === Size - 1) {
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
  for (index = q = 0, len4 = hints0.length; q < len4; index = ++q) {
    var _hints0$index = _slicedToArray(hints0[index], 2);

    var _hints0$index$ = _slicedToArray(_hints0$index[0], 2);

    i0 = _hints0$index$[0];
    j0 = _hints0$index$[1];

    var _hints0$index$2 = _slicedToArray(_hints0$index[1], 2);

    i1 = _hints0$index$2[0];
    j1 = _hints0$index$2[1];

    drawHint0("abcdefghijklmnopqrstuvwxyz"[index], i0, j0);
    drawHint0("abcdefghijklmnopqrstuvwxyz"[index], i1, j1);
  }
  for (index = s = 0, len5 = hints1.length; s < len5; index = ++s) {
    var _hints1$index = _slicedToArray(hints1[index], 2);

    var _hints1$index$ = _slicedToArray(_hints1$index[0], 2);

    i0 = _hints1$index$[0];
    j0 = _hints1$index$[1];

    var _hints1$index$2 = _slicedToArray(_hints1$index[1], 2);

    i1 = _hints1$index$2[0];
    j1 = _hints1$index$2[1];

    drawHint1("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index], i0, j0);
    drawHint1("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index], i1, j1);
  }
  pop();
  if (state === 'halted') {
    fc(1, 1, 0, 0.5);
    x = width / 2;
    y = height / 2;
    w = Size * TILE;
    h = Size * TILE;
    rect(x, y, w, h);
    ms = round((milliseconds1 - milliseconds0) / 100) / 10;
    if (ms > 0) {
      y = Size * TILE - 10;
      fc(1);
      sc();
      textSize(30);
      text(ms, 0.85 * width, height - 30);
    }
  }
  if (millis() < deathTimestamp) {
    x = Math.floor(Size / 2) * TILE;
    y = Math.floor(Size / 2) * TILE;
    if (Size % 2 === 0) {
      var _ref = [x - TILE / 2, y - TILE / 2];
      x = _ref[0];
      y = _ref[1];
    }
    hearts.drawHeart(x, y, Size * TILE / 5, 1, 0, 0);
  }
  drawHints();
  return drawProgress();
};

drawHints = function drawHints() {
  fc(0, 1, 0);
  if (hints0.length > 0) {
    text("*", TILE, height - 0.3 * TILE);
  }
  fc(1, 0, 0);
  if (hints1.length > 0) {
    return text("*", width - TILE, height - 0.3 * TILE);
  }
};

drawProgress = function drawProgress() {
  fc(1);
  sc();
  textSize(30);
  return text(numbers, width / 4 - TILE, height - 0.5 * TILE);
};

drawLittera = function drawLittera(i, j) {
  if (showLittera) {
    push();
    textSize(32);
    fc(0.25);
    sc(0.25);
    if ((j === 0 || j === Size - 1) && i < Size - 1) {
      text(' abcdefghik '[i], TILE * i, TILE * j);
    } else if ((i === 0 || i === Size - 1) && 0 < j && j < Size - 1) {
      text(Size - 1 - j, TILE * i, TILE * j);
    }
    return pop();
  }
};

within = function within(i, j) {
  return 0 <= i && i < Size && 0 <= j && j < Size;
};

keyPressed = function keyPressed() {
  if (key === 'H') {
    return showHint = !showHint;
  }
};

mousePressed = function mousePressed() {
  var button, i, i1, j, j1, k, len, x, y;
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
  x = mouseX - (width - TILE * Size) / 2;
  y = mouseY - (height - TILE * Size) / 2;
  var _ref2 = [Math.floor(x / TILE), Math.floor(y / TILE)];
  i = _ref2[0];
  j = _ref2[1];

  if (!within(i, j)) {
    return;
  }
  if (i === 0 || i === Size - 1 || j === 0 || j === Size - 1) {
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
      latestPair = [[i, j], [i1, j1]];
      b[i][j] = -b[i][j];
      b[i1][j1] = -b[i1][j1];
      numbers -= 2;
      selected.pop();
      if (numbers === 0) {
        milliseconds1 = millis();
        state = 'halted';
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
    return [modulo(x, Size), modulo(y, Size)];
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

pretty = function pretty(name, a) {
  var k, len, p1, p2, pair, results, x0, x1, y0, y1;
  print(name);
  results = [];
  for (k = 0, len = a.length; k < len; k++) {
    pair = a[k];
    var _pair = pair;

    var _pair2 = _slicedToArray(_pair, 2);

    p1 = _pair2[0];
    p2 = _pair2[1];
    var _p = p1;

    var _p2 = _slicedToArray(_p, 2);

    x0 = _p2[0];
    y0 = _p2[1];
    var _p3 = p2;

    var _p4 = _slicedToArray(_p3, 2);

    x1 = _p4[0];
    y1 = _p4[1];

    results.push(print('' + " abcdefghik "[x0] + (11 - y0) + ' ' + " abcdefghik "[x1] + (11 - y1)));
  }
  return results;
};

rensaWrap = function rensaWrap(a, b) {
  // överlappande rutor ska bort
  var i0, i1, j0, j1, k, l, len, len1, ok, res, x0, x1, y0, y1;
  res = [];
  for (k = 0, len = b.length; k < len; k++) {
    var _b$k = _slicedToArray(b[k], 2);

    var _b$k$ = _slicedToArray(_b$k[0], 2);

    x0 = _b$k$[0];
    y0 = _b$k$[1];

    var _b$k$2 = _slicedToArray(_b$k[1], 2);

    x1 = _b$k$2[0];
    y1 = _b$k$2[1];

    ok = true;
    for (l = 0, len1 = a.length; l < len1; l++) {
      var _a$l = _slicedToArray(a[l], 2);

      var _a$l$ = _slicedToArray(_a$l[0], 2);

      i0 = _a$l$[0];
      j0 = _a$l$[1];

      var _a$l$2 = _slicedToArray(_a$l[1], 2);

      i1 = _a$l$2[0];
      j1 = _a$l$2[1];

      if (x0 === i0 && y0 === j0 && x1 === i1 && y1 === j1) {
        ok = false;
      }
    }
    if (ok) {
      res.push([[x0, y0], [x1, y1]]);
    }
  }
  return res;
};

showMoves = function showMoves() {
  hints0 = showMoves1(false);
  hints1 = showMoves1(true);
  return hints1 = rensaWrap(hints0, hints1);
};

showMoves1 = function showMoves1(wrap) {
  var i0, i1, j0, j1, k, l, len, len1, len2, len3, len4, m, o, ok, p, q, ref, ref1, ref2, ref3, res, x0, x1, y0, y1;
  res = [];
  ref = range(1, Size - 1);
  for (k = 0, len = ref.length; k < len; k++) {
    i0 = ref[k];
    ref1 = range(1, Size - 1);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j0 = ref1[l];
      if (b[i0][j0] > 0) {
        ref2 = range(1, Size - 1);
        for (m = 0, len2 = ref2.length; m < len2; m++) {
          i1 = ref2[m];
          ref3 = range(1, Size - 1);
          for (o = 0, len3 = ref3.length; o < len3; o++) {
            j1 = ref3[o];
            if (b[i1][j1] > 0) {
              if (b[i0][j0] - 1 + b[i1][j1] - 1 === level - 1) {
                if (b[i0][j0] <= b[i1][j1] && (i0 !== i1 || j0 !== j1)) {
                  p = legal(wrap, i0, j0, i1, j1);
                  if (p.length > 0) {
                    ok = true;
                    for (q = 0, len4 = res.length; q < len4; q++) {
                      var _res$q = _slicedToArray(res[q], 2);

                      var _res$q$ = _slicedToArray(_res$q[0], 2);

                      x0 = _res$q$[0];
                      y0 = _res$q$[1];

                      var _res$q$2 = _slicedToArray(_res$q[1], 2);

                      x1 = _res$q$2[0];
                      y1 = _res$q$2[1];

                      if (x0 === i0 && y0 === j0) {
                        ok = false;
                      }
                      if (x1 === i1 && y1 === j1) {
                        ok = false;
                      }
                      if (x0 === i1 && y0 === j1) {
                        ok = false;
                      }
                      if (x1 === i0 && y1 === j0) {
                        ok = false;
                      }
                    }
                    if (ok) {
                      res.push([[i0, j0], [i1, j1]]);
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
  return res; // innehåller koordinaterna för paren.
};
//# sourceMappingURL=sketch.js.map
