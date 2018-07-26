'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
// fungerar för nämnare <= 10
var Size,
    b,
    bredd,
    clearCell,
    display,
    f,
    fetchCell,
    findSum,
    g,
    _gcd,
    level,
    makeGame,
    mode,
    mousePressed,
    msg,
    msg2,
    pattern,
    printHelp,
    selected,
    setup,
    sums,
    within,
    xdraw,
    indexOf = [].indexOf;

b = null;

level = 0;

Size = null;

selected = null; // innehåller [i,j]

msg = null; // innehåller [i,j]

msg2 = null; // innehåller [n,d]

mode = 4;

sums = [];

f = function f(n, a, b) {
  var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

  return g(n, (a / b).toString(base));
};

g = function g(n, s) {
  var i, integer, k, len, mantissa, p, ref, res;
  if (s.length < n) {
    return [s, ''];
  }
  s = s.slice(0, s.length - 1);
  if (indexOf.call(s, '.') < 0) {
    return [s, ''];
  }

  var _s$split = s.split('.');

  var _s$split2 = _slicedToArray(_s$split, 2);

  integer = _s$split2[0];
  mantissa = _s$split2[1];

  res = integer + '.';
  ref = range(s.length);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    p = pattern(mantissa.slice(i));
    if (p.length > 0) {
      return [res + mantissa.slice(0, i), p];
    }
  }
  return [res, mantissa];
};

_gcd = function gcd(x, y) {
  if (y === 0) {
    return x;
  } else {
    return _gcd(y, x % y);
  }
};

pattern = function pattern(s) {
  var antal, j, k, l, len, len1, ok, p, q, ref, ref1;
  ref = range(1, 13);
  for (k = 0, len = ref.length; k < len; k++) {
    antal = ref[k];
    ok = true;
    p = s.slice(0, antal);
    if (2 * antal > s.length) {
      ok = false;
    }
    ref1 = range(Math.floor(s.length / antal));
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      q = s.slice(j * antal, (j + 1) * antal);
      if (p !== q) {
        ok = false;
      }
    }
    if (ok) {
      return p;
    }
  }
  return '';
};

makeGame = function makeGame() {
  var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var c1, c2, candidates, d, d1, d2, e, i, j, k, l, len, len1, len2, len3, len4, n, n1, n2, o, r, ref, ref1, ref2, results, u;
  level += delta;
  level = constrain(level, 0, 7);
  mode = [0, 0, 1, 1, 2, 2, 3, 4][level];
  Size = 3 + level;
  candidates = [];
  b = new Array(Size);
  ref = range(Size);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    b[i] = new Array(Size);
    ref1 = range(Size);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      if (i === j) {
        b[i][j] = null;
      } else {
        b[i][j] = [i + 1, j + 1];
        candidates.push([i + 1, j + 1]);
      }
    }
  }
  for (i = o = 0, len2 = candidates.length; o < len2; i = ++o) {
    c1 = candidates[i];
    var _c = c1;

    var _c2 = _slicedToArray(_c, 2);

    n1 = _c2[0];
    d1 = _c2[1];

    for (j = r = 0, len3 = candidates.length; r < len3; j = ++r) {
      c2 = candidates[j];
      var _c3 = c2;

      var _c4 = _slicedToArray(_c3, 2);

      n2 = _c4[0];
      d2 = _c4[1];

      if (i > j) {
        d = d1 * d2;
        n = n1 * d2 + n2 * d1;
        e = _gcd(n, d);
        n = Math.floor(n / e);
        d = Math.floor(d / e);
      }
    }
  }
  //print n1,d1,n2,d2,n,d
  //print "#{n}/#{d}" #f(13,n,d,10), f(50,n,d,2)
  candidates = _.shuffle(candidates);
  sums = [];
  ref2 = range(Math.floor(candidates.length / 2));
  results = [];
  for (u = 0, len4 = ref2.length; u < len4; u++) {
    i = ref2[u];

    var _candidates$pop = candidates.pop();

    var _candidates$pop2 = _slicedToArray(_candidates$pop, 2);

    n1 = _candidates$pop2[0];
    d1 = _candidates$pop2[1];

    var _candidates$pop3 = candidates.pop();

    var _candidates$pop4 = _slicedToArray(_candidates$pop3, 2);

    n2 = _candidates$pop4[0];
    d2 = _candidates$pop4[1];

    d = d1 * d2;
    n = n1 * d2 + n2 * d1;
    e = _gcd(n, d);
    n = Math.floor(n / e);
    d = Math.floor(d / e);
    results.push(sums.push([n, d]));
  }
  return results;
};

//print n1,d1,n2,d2,n,d
//print f 13,n,d,10
//print f 50,n,d,2

//milliseconds0 = millis()
//state = 'running'
findSum = function findSum() {
  var d, d1, d2, e, i, index1, index2, j, k, l, len, len1, len2, len3, lst, n, n1, n2, o, r, ref, ref1, ref2, ref3;
  lst = [];
  ref = range(Size);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    ref1 = range(Size);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      if (b[i][j]) {
        lst.push([i, j]);
      }
    }
  }
  if (lst.length === 0) {
    makeGame(1);
    ref2 = range(Size);
    for (o = 0, len2 = ref2.length; o < len2; o++) {
      i = ref2[o];
      ref3 = range(Size);
      for (r = 0, len3 = ref3.length; r < len3; r++) {
        j = ref3[r];
        if (b[i][j]) {
          lst.push([i, j]);
        }
      }
    }
  }
  index1 = [-1, -1];
  index2 = [-1, -1];
  while (index1[0] === index2[0] && index1[1] === index2[1]) {
    index1 = _.sample(lst);
    index2 = _.sample(lst);
  }

  var _fetchCell = fetchCell(index1);

  var _fetchCell2 = _slicedToArray(_fetchCell, 2);

  n1 = _fetchCell2[0];
  d1 = _fetchCell2[1];

  var _fetchCell3 = fetchCell(index2);

  var _fetchCell4 = _slicedToArray(_fetchCell3, 2);

  n2 = _fetchCell4[0];
  d2 = _fetchCell4[1];

  d = d1 * d2;
  n = n1 * d2 + n2 * d1;
  e = _gcd(n, d);
  n = Math.floor(n / e);
  d = Math.floor(d / e);
  return [n, d];
};

display = function display(m, n, d, x, y) {
  var s, t, x0;
  if (m === 0) {
    if (d === 1) {
      text('' + n, x, y);
    } else {
      text(n + '/' + d, x, y);
    }
  }
  if (m === 1) {
    text('DEC ' + n / d, x, y);
  }
  if (m === 2) {
    var _f = f(13, n, d, 10);

    var _f2 = _slicedToArray(_f, 2);

    s = _f2[0];
    t = _f2[1];

    text('DEC ' + [s, t].join(''), x, y);
    x0 = x + 4 + 4 * 37 + 37 * s.length;
    if (t !== "") {
      line(x0, y + 2, x0 + 37 * t.length, y + 2);
    }
  }
  if (m === 3) {
    text('BIN ' + (n / d).toString(2), 20, y);
  }
  if (m === 4) {
    var _f3 = f(50, n, d, 2);

    var _f4 = _slicedToArray(_f3, 2);

    s = _f4[0];
    t = _f4[1];

    text('BIN ' + [s, t].join(''), 20, y);
    x0 = x + 4 + 4 * 37 + 37 * s.length;
    if (t !== "") {
      return line(x0, y + 2, x0 + 37 * t.length, y + 2);
    }
  }
};

setup = function setup() {
  createCanvas(1900, 800);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  makeGame();
  msg2 = findSum();
  xdraw();
  return printHelp();
};

xdraw = function xdraw() {
  var d, e, i, j, k, l, len, len1, n, ref, ref1;
  bg(0.5);
  textFont('Courier');
  push();
  textSize(20);
  textAlign(CENTER, CENTER);
  sw(1);
  translate(100, 100);
  ref = range(Size);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    ref1 = range(Size);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      sw(1);
      rect(40 * i, 40 * j, 40, 40);
      if (b[j][i]) {
        var _b$j$i = _slicedToArray(b[j][i], 2);

        n = _b$j$i[0];
        d = _b$j$i[1];

        e = _gcd(n, d);
        n = Math.floor(n / e);
        d = Math.floor(d / e);
        if (d === 1) {
          text(n, 40 * i, 40 * j);
        } else {
          text(n, 40 * i, 40 * j - 10 + 2);
          sw(1);
          line(40 * i - 10, 40 * j, 40 * i + 10, 40 * j);
          text(d, 40 * i, 40 * j + 10 + 2);
        }
      }
    }
  }
  pop();
  textSize(64);
  textAlign(LEFT, TOP);
  sw(1);
  if (selected) {
    var _selected = selected;

    var _selected2 = _slicedToArray(_selected, 2);

    j = _selected2[0];
    i = _selected2[1];

    push();
    fc(1, 1, 0, 0.5);
    circle(100 + 40 * i, 100 + 40 * j, 19);
    pop();
  }
  if (msg) {
    var _fetchCell5 = fetchCell(msg);

    var _fetchCell6 = _slicedToArray(_fetchCell5, 2);

    n = _fetchCell6[0];
    d = _fetchCell6[1];

    if (n !== d) {
      display(mode, n, d, 20, 18);
    }
  }
  var _msg = msg2;

  var _msg2 = _slicedToArray(_msg, 2);

  n = _msg2[0];
  d = _msg2[1];

  return display(mode, n, d, 20, 480);
};

// display 1,n,d,20,540
// display 2,n,d,20,600
// display 3,n,d,20,660
// display 4,n,d,20,720
within = function within(i, j) {
  return 0 <= i && i < Size && 0 <= j && j < Size && i !== j;
};

fetchCell = function fetchCell(pair) {
  return b[pair[0]][pair[1]];
};

clearCell = function clearCell(pair) {
  return b[pair[0]][pair[1]] = null;
};

mousePressed = function mousePressed() {
  var d, d1, d2, e, i, j, n, n1, n2;
  j = Math.floor((mouseX - 80) / 40);
  i = Math.floor((mouseY - 80) / 40);
  msg = within(i, j) ? [i, j] : null;
  if (!selected) {
    // first selection
    selected = msg;
  } else if (msg) {
    var _fetchCell7 = fetchCell(selected); // second selection


    var _fetchCell8 = _slicedToArray(_fetchCell7, 2);

    n1 = _fetchCell8[0];
    d1 = _fetchCell8[1];

    var _fetchCell9 = fetchCell(msg);

    var _fetchCell10 = _slicedToArray(_fetchCell9, 2);

    n2 = _fetchCell10[0];
    d2 = _fetchCell10[1];

    d = d1 * d2;
    n = n1 * d2 + n2 * d1;
    e = _gcd(n, d);
    n = Math.floor(n / e);
    d = Math.floor(d / e);
    if (n === msg2[0] && d === msg2[1]) {
      clearCell(selected);
      clearCell(msg);
      msg2 = findSum();
    }
    selected = null;
    msg = null;
  }
  return xdraw();
};

bredd = function bredd(nr, digits) {
  var s;
  s = nr.toString();
  return '      '.slice(0, digits - s.length) + s;
};

printHelp = function printHelp() {
  var digits, i, j, k, l, len, len1, len2, len3, m, n, o, r, ref, ref1, ref2, ref3, res, s;
  m = 2;
  res = '';
  ref = range(3, 11);
  for (k = 0, len = ref.length; k < len; k++) {
    n = ref[k];
    digits = [0, 0, 0, 2, 2, 3, 3, 4, 4, 5, 5][n];
    m *= n / _gcd(m, n);
    res += 'n = ' + n + ' ############ ' + m + '-delar\n';
    s = bredd('', digits);
    ref1 = range(1, n + 1);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      s += ' ' + bredd(j, digits);
    }
    res += s + "\n";
    ref2 = range(1, n + 1);
    for (o = 0, len2 = ref2.length; o < len2; o++) {
      i = ref2[o];
      s = bredd(i, digits);
      ref3 = range(1, n + 1);
      for (r = 0, len3 = ref3.length; r < len3; r++) {
        j = ref3[r];
        if (i === j) {
          s += "      ".slice(0, digits) + 'x';
        } else {
          s += ' ' + bredd(m * i / j, digits);
        }
      }
      res += s + "\n";
    }
    res += "\n";
  }
  return print(res);
};
//# sourceMappingURL=sketch.js.map
