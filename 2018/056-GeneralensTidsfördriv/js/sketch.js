"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.3.2
// Vectorized Playing Cards 2.0 - http://sourceforge.net/projects/vector-cards/
// Copyright 2015 - Chris Aguilar - conjurenation@gmail.com
// Licensed under LGPL 3 - www.gnu.org/copyleft/lesser.html

//  4  5  6  7  8  9 10 11  0 
//  4  5  6  7  8  9 10 11  1
//  4  5  6  7  8  9 10 11  2 
//  4  5  6  7  8  9 10 11  3
//  4  5  6  7  8  9 10 11
// 12 13 14 15 16 17 18 19  PANEL
var ACES,
    BlackBox,
    General,
    H,
    HEAPS,
    LIMIT,
    LONG,
    N,
    OFFSETX,
    PANEL,
    RANK,
    Rank,
    SUIT,
    Suit,
    W,
    aceCards,
    alternativeDsts,
    assert,
    b2,
    backs,
    board,
    calcAntal,
    cands,
    cards,
    compress,
    compressOne,
    copyToClipboard,
    countAceCards,
    countPanelCards,
    display,
    dsts,
    dumpBoard,
    expand,
    faces,
    fakeBoard,
    findAllMoves,
    general,
    generalen,
    getCenter,
    getParameters,
    h,
    hash,
    hint,
    hintOne,
    hitGreen,
    infoLines,
    keyPressed,
    legalMove,
    makeBoard,
    makeLink,
    makeMove,
    menu0,
    menu1,
    menu2,
    mousePressed,
    mouseReleased,
    myRandom,
    myShuffle,
    newGame,
    oneClick,
    originalBoard,
    pack,
    preload,
    prettyCard,
    prettyCard2,
    prettyMove,
    prettyUndoMove,
    print,
    printAutomaticSolution,
    printManualSolution,
    range,
    readBoard,
    released,
    restart,
    setup,
    showDialogue,
    showHeap,
    showInfo,
    srcs,
    startCompetition,
    text3,
    undoMove,
    undoMoveOne,
    unpack,
    w,
    indexOf = [].indexOf;

ACES = [0, 1, 2, 3];

HEAPS = [4, 5, 6, 7, 8, 9, 10, 11];

PANEL = [12, 13, 14, 15, 16, 17, 18, 19];

Suit = 'chsd';

Rank = "A23456789TJQK";

SUIT = "club heart spade diamond".split(' ');

RANK = "A23456789TJQK";

LONG = " Ace Two Three Four Five Six Seven Eight Nine Ten Jack Queen King".split(' ');

// Konstanter för cards.png
OFFSETX = 468;

W = 263.25;

H = 352;

w = null;

h = null;

LIMIT = 1000; // Maximum steps considered before giving up. 1000 is too low, hint fails sometimes.

faces = null;

backs = null;

board = null;

cards = null;

cands = null;

hash = null;

aceCards = 4;

originalBoard = null;

startCompetition = null;

N = null; // Max rank

srcs = null;

dsts = null;

alternativeDsts = [];

infoLines = [];

general = null;

released = true;

print = console.log;

range = _.range;

Array.prototype.clear = function () {
  return this.length = 0;
};

assert = function assert(a, b) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Assert failure';

  return chai.assert.deepEqual(a, b, msg);
};

getParameters = function getParameters() {
  var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;

  var arr, f, s;
  h = decodeURI(h);
  arr = h.split('?');
  if (arr.length !== 2) {
    return {};
  }
  s = arr[1];
  if (s === '') {
    return {};
  }
  return _.fromPairs(function () {
    var l, len, ref, results;
    ref = s.split('&');
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      f = ref[l];
      results.push(f.split('='));
    }
    return results;
  }());
};

myRandom = function myRandom(a, b) {
  var r, x;
  x = 10000 * Math.sin(general.fastSeed++);
  r = x - Math.floor(x);
  return a + Math.floor((b - a) * r);
};

myShuffle = function myShuffle(array) {
  var i, j, l, len, n, ref, results, value;
  n = array.length;
  ref = range(n);
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    j = myRandom(i, n);
    value = array[i];
    array[i] = array[j];
    results.push(array[j] = value);
  }
  return results;
};

copyToClipboard = function copyToClipboard(txt) {
  var copyText;
  copyText = document.getElementById("myClipboard");
  copyText.value = txt;
  copyText.select();
  return document.execCommand("copy");
};

makeLink = function makeLink() {
  var index, url;
  url = window.location.href + '?';
  index = url.indexOf('?');
  url = url.substring(0, index);
  return url + '?cards=' + general.slowSeed;
};

BlackBox = function () {
  // Avgör om man lyckats eller ej. Man får tillgodogöra sig tidigare drag.
  function BlackBox() {
    _classCallCheck(this, BlackBox);

    this.clr();
  }

  _createClass(BlackBox, [{
    key: "clr",
    value: function clr() {
      this.total = [0, 0, 0 // [time,computer,human]
      ];
      return this.count = 0;
    }

    //@success = false 

  }, {
    key: "show",
    value: function show() {} // print 'BlackBox',@count,@total

  }]);

  return BlackBox;
}();

General = function () {
  function General() {
    _classCallCheck(this, General);

    this.slowSeed = 1; // stored externally
    this.fastSeed = 1; // used internally
    this.start = null;
    this.maxMoves = null;
    this.hist = null;
    this.hintsUsed = 0;
    this.blackBox = new BlackBox();
    this.clr();
    this.getLocalStorage();
  }

  _createClass(General, [{
    key: "success",
    value: function success() {
      return this.blackBox.total[2] + this.hist.length <= this.blackBox.total[1] + this.maxMoves;
    }
  }, {
    key: "probe",
    value: function probe(time) {
      var total;
      if (!this.success()) {
        return false;
      }
      total = this.blackBox.total;
      total[0] += time;
      total[1] += this.maxMoves;
      total[2] += this.hist.length;
      return true;
    }
  }, {
    key: "getLocalStorage",
    value: function getLocalStorage() {
      print('direct', localStorage.Generalen);
      if (localStorage.Generalen != null) {
        hash = JSON.parse(localStorage.Generalen);
      } else {
        hash = {};
      }
      if (5 !== _.size(hash)) {
        hash = {
          level: 0,
          slowSeed: 1,
          fastSeed: 1,
          total: [0, 0, 0],
          hintsUsed: 0
        };
      }
      print('hash', JSON.stringify(hash));
      // {level,slowSeed,fastSeed,total,hintsUsed} = hash
      this.level = hash.level;
      this.slowSeed = hash.slowSeed;
      this.fastSeed = hash.fastSeed;
      this.blackBox.total = hash.total;
      this.hintsUsed = hash.hintsUsed;
      return print('get', JSON.stringify(hash));
    }
  }, {
    key: "putLocalStorage",
    value: function putLocalStorage() {
      var s;
      s = JSON.stringify({
        level: this.level,
        slowSeed: this.slowSeed,
        fastSeed: this.fastSeed,
        total: this.blackBox.total,
        hintsUsed: this.hintsUsed
      });
      localStorage.Generalen = s;
      return print('put', s);
    }
  }, {
    key: "clr",
    value: function clr() {
      this.blackBox.clr();
      this.level = 0;
      return this.timeUsed = 0;
    }

    //@putLocalStorage()

  }, {
    key: "totalRestart",
    value: function totalRestart() {
      this.slowSeed = int(random(65536));
      return this.clr();
    }
  }, {
    key: "handle",
    value: function handle(mx, my) {
      var heap, marked, timeUsed;
      marked = [mx + (my >= 3 ? 12 : 4), my];
      heap = oneClick(marked, board, true);
      if (this.timeUsed === 0 && 4 * N === countAceCards(board)) {
        timeUsed = Math.floor((millis() - this.start) / 1000);
        if (this.probe(timeUsed)) {
          this.timeUsed = timeUsed;
          this.blackBox.show();
        }
        this.putLocalStorage();
        return printManualSolution();
      }
    }
  }]);

  return General;
}();

preload = function preload() {
  faces = loadImage('cards/Color_52_Faces_v.2.0.png');
  return backs = loadImage('cards/Playing_Card_Backs.png');
};

pack = function pack(suit, under, over) {
  return Suit[suit] + RANK[under] + (under === over ? '' : RANK[over]);
};

assert('cA', pack(0, 0, 0));

assert('dA', pack(3, 0, 0));

assert('d2', pack(3, 1, 1));

assert('hJQ', pack(1, 10, 11));

assert('hJ', pack(1, 10, 10));

//print 'pack ok'
unpack = function unpack(n) {
  var over, suit, under;
  suit = Suit.indexOf(n[0]);
  under = RANK.indexOf(n[1]);
  if (n.length === 3) {
    over = RANK.indexOf(n[2]);
  } else {
    over = under;
  }
  return [suit, under, over];
};

assert([0, 0, 0], unpack('cA'));

assert([3, 0, 0], unpack('dA'));

assert([1, 10, 11], unpack('hJQ'));

assert([1, 10, 10], unpack('hJ'));

//print 'unpack ok'
compress = function compress(board) {
  var heap, l, len, results;
  results = [];
  for (l = 0, len = HEAPS.length; l < len; l++) {
    heap = HEAPS[l];
    results.push(board[heap] = compressOne(board[heap]));
  }
  return results;
};

compressOne = function compressOne(cards) {
  var i, l, len, over1, over2, ref, ref1, res, suit1, suit2, temp, under1, under2;
  if (cards.length > 1) {
    res = [];
    temp = cards[0];
    ref = range(1, cards.length);
    for (l = 0, len = ref.length; l < len; l++) {
      i = ref[l];

      // understa
      var _unpack = unpack(temp);

      var _unpack2 = _slicedToArray(_unpack, 3);

      suit1 = _unpack2[0];
      under1 = _unpack2[1];
      over1 = _unpack2[2];

      var _unpack3 = unpack(cards[i]);

      var _unpack4 = _slicedToArray(_unpack3, 3);

      suit2 = _unpack4[0];
      under2 = _unpack4[1];
      over2 = _unpack4[2];

      if (suit1 === suit2 && ((ref1 = under2 - over1) === -1 || ref1 === 1)) {
        temp = pack(suit1, under1, over2);
      } else {
        res.push(temp);
        temp = pack(suit2, under2, over2);
      }
    }
    res.push(temp);
    return res;
  } else {
    return cards;
  }
};

assert([], compressOne([]));

assert(['cA'], compressOne(['cA']));

assert(['cA2'], compressOne(['cA', 'c2']));

assert(['c23'], compressOne(['c2', 'c3']));

assert(['cA4'], compressOne(['cA2', 'c34']));

assert(['cA3'], compressOne(['cA', 'c2', 'c3']));

assert(['cA6'], compressOne(['cA2', 'c34', 'c56']));

assert(['cA2', 'h34', 'c56'], compressOne(['cA2', 'h34', 'c56']));

//print 'compressOne ok'
calcAntal = function calcAntal(lst) {
  var card, l, len, over, res, suit, under;
  res = 0;
  for (l = 0, len = lst.length; l < len; l++) {
    card = lst[l];

    var _unpack5 = unpack(card);

    var _unpack6 = _slicedToArray(_unpack5, 3);

    suit = _unpack6[0];
    under = _unpack6[1];
    over = _unpack6[2];

    res += 1 + Math.abs(under - over);
  }
  return res;
};

countAceCards = function countAceCards(b) {
  var heap, l, len, res;
  res = 0;
  for (l = 0, len = ACES.length; l < len; l++) {
    heap = ACES[l];
    res += calcAntal(b[heap]);
  }
  return res;
};

countPanelCards = function countPanelCards(b) {
  var heap, l, len, res;
  res = 0;
  for (l = 0, len = PANEL.length; l < len; l++) {
    heap = PANEL[l];
    res += b[heap].length;
  }
  return res;
};

dumpBoard = function dumpBoard(board) {
  var heap;
  return function () {
    var l, len, results;
    results = [];
    for (l = 0, len = board.length; l < len; l++) {
      heap = board[l];
      results.push(heap.join(' '));
    }
    return results;
  }().join('|');
};

makeBoard = function makeBoard(lvl) {
  var card, classic, heap, i, l, len, len1, len2, len3, len4, len5, m, o, p, q, rank, ref, ref1, ref2, ref3, suit, t;
  N = [3, 4, 5, 5, 6, 7, 7, 8, 9, 9, 10, 11, 11, 12, 13, 13][lvl];
  classic = lvl % 3 === 0;
  //N = maxRank
  cards = [];
  ref = range(4);
  for (l = 0, len = ref.length; l < len; l++) {
    suit = ref[l];
    ref1 = range(1, N);
    // 2..K
    for (m = 0, len1 = ref1.length; m < len1; m++) {
      rank = ref1[m];
      cards.push(pack(suit, rank, rank));
    }
  }

  //general.fastSeed++ # nödvändig?
  myShuffle(cards);
  board = [];
  ref2 = range(20);
  for (o = 0, len2 = ref2.length; o < len2; o++) {
    i = ref2[o];
    board.push([]);
  }
  ref3 = range(4);
  for (heap = p = 0, len3 = ref3.length; p < len3; heap = ++p) {
    suit = ref3[heap];
    board[heap].push(pack(suit, 0, 0)); // Ess
  }
  for (q = 0, len4 = PANEL.length; q < len4; q++) {
    heap = PANEL[q];
    board[heap].push(cards.pop());
  }
  for (i = t = 0, len5 = cards.length; t < len5; i = ++t) {
    card = cards[i];
    heap = classic ? 4 + i % 8 : myRandom(4, 12);
    board[heap].push(card);
  }
  return compress(board);
};

readBoard = function readBoard(b) {
  var heap, l, len, ref, results;
  ref = b.split('|');
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    heap = ref[l];
    results.push(heap === '' ? [] : heap.split(' '));
  }
  return results;
};

fakeBoard = function fakeBoard() {
  var classic;
  N = 6;
  classic = false;
  if (N === 6) {
    board = "cA|hA|sA|dA|h5|c3|s65|c2 d5||s3|d2 h6 d4|d3 h4|h2|c5|c4|h3|c6|s4|s2|d6";
  }
  if (N === 13) {
    board = "cA|hA|sA|dA|h6 s8 h3 s2 d5|dJ s3 c9 d7|sK h7 dQ s5 h5 d34|cQ sJ dT d6|c7 cK hT d2 s4 c8|sQ s7 cJ s9T h9|h8 c56 c4 hJ d8|cT c3|c2|h2|h4|s6|d9|hQ|hK|dK";
  }
  if (N === 13) {
    board = "cA|hA|sA|dA|c5 c7 h2 d7 c9 s6 c3 d8 s9|h8 dQ cQK dK h7 s2 dT|c4 sJQ d5||hQ h54 c8 h3 d3|cJT s4 c6 s8 hJT|d2 d4 s5|h9 sK s3|d6|d9|sT|h6|s7|hK|dJ|c2";
  }
  if (N === 13) {
    board = "cA2|hA|sA|dA|c5 c7 h2 d7 c9 s6 c3 d8 s9|h8 dQ cQK dK h7 s2 dT|c4 sJQ d5||hQ h54 c8 h3 d3|cJT s4 c6 s8 hJT|d2 d4 s5|h9 sK s3|d6|d9|sT|h6|s7|hK|dJ|";
  }
  if (N === 13) {
    board = "cA2|hA|sA|dA|c5 c7 h2 d7 c9 s6 c3 d8 s9|h8 dQ cQK dK h7 s2 dT|c4 sJQ d5|s5|hQ h54 c8 h3 d3|cJT s4 c6 s8 hJT|d2 d4|h9 sK s3|d6|d9|sT|h6|s7|hK|dJ|";
  }
  if (N === 13) {
    board = "cA|hA|sA|dA|c9 h3 s8|h5 s7 sJ hK h4 s3 c7 hT s4|s9 d2|s5 d7 c4|s6 h9|c3 d3 h6|d6 d8 dK sT s2 c5 cK c6 c8 d4 h2|dT hQ cT d5 hJ dJ cJ|c2|d9|sQ|cQ|h7|dQ|sK|h8";
  }
  if (N === 13) {
    board = "cA|hA|sA|dA|s4 cJ s3 c3 dK hJ cQ c2 h4|sQK|s9 d2 dT|s2 dQ sJ hT|d8 h3 d7 h5 h2 c9|d3 s6 sT d9 c7 c4|cK c8 h7 c5|dJ hK s87 s5 cT|d6|h9|d4|h8|d5|h6|c6|hQ";
  }
  board = readBoard(board);
  return print(board);
};

setup = function setup() {
  var canvas, params;
  print('X');
  canvas = createCanvas(innerWidth - 0.5, innerHeight - 0.5);
  canvas.position(0, 0); // hides text field used for clipboard copy.
  general = new General();
  w = width / 9;
  h = height / 4;
  angleMode(DEGREES);
  params = getParameters();
  if ('cards' in params) {
    general.slowSeed = parseInt(params.cards);
    general.level = 0;
  }
  startCompetition = millis();
  infoLines.push('Level Moves Bonus Cards   Time Hints'.split(' '));
  infoLines.push('0 0 0 0   0 0'.split(' '));
  newGame(general.level);
  return display(board);
};

keyPressed = function keyPressed() {
  if (key === 'X') {
    N = 7;
    board = "cA7|hA4|sA3|dA2||h6|s5 d6||h5 d5||s4 s6|d34||d7|s7|h7||||";
    general.hist = [[12, 0, 1], [5, 1, 1], [8, 3, 1], [9, 1, 1], [11, 1, 1], [16, 2, 1], [17, 0, 1], [10, 0, 1], [9, 0, 1], [18, 2, 1], [19, 0, 1], [7, 0, 1]];
    board = readBoard(board);
    print(board);
  }
  return display(board);
};

// returnerar övre, vänstra koordinaten för översta kortet i högen som [x,y]
getCenter = function getCenter(heap) {
  var dy, n;
  if (indexOf.call(ACES, heap) >= 0) {
    return [int(8 * w), int(heap * h)];
  }
  if (indexOf.call(PANEL, heap) >= 0) {
    return [int((heap - 12) * w), int(3 * h)];
  }
  if (indexOf.call(HEAPS, heap) >= 0) {
    n = calcAntal(board[heap]);
    dy = n === 0 ? 0 : min(h / 4, 2 * h / (n - 1));
    return [int((heap - 4) * w), int((n - 1) * dy)];
  }
};

menu0 = function menu0(src, dst, col) {
  var dialogue, r, x, y;
  dialogue = new Dialogue(0, int(w / 2), int(h / 2), int(0.10 * h), col);
  r = int(0.05 * height);

  var _getCenter = getCenter(src);

  var _getCenter2 = _slicedToArray(_getCenter, 2);

  x = _getCenter2[0];
  y = _getCenter2[1];

  dialogue.add(new Button('From', x, y, r, function () {
    return dialogues.pop();
  }));

  var _getCenter3 = getCenter(dst);

  var _getCenter4 = _slicedToArray(_getCenter3, 2);

  x = _getCenter4[0];
  y = _getCenter4[1];

  return dialogue.add(new Button('To', x, y, r, function () {
    return dialogues.pop();
  }));
};

menu1 = function menu1() {
  var dialogue, r1, r2;
  dialogue = new Dialogue(1, int(4 * w), int(1.5 * h), int(0.15 * h));
  r1 = 0.25 * height;
  r2 = 0.085 * height;
  dialogue.clock(' ', 6, r1, r2, 90 + 360 / 12);
  dialogue.buttons[0].info('Undo', general.hist.length > 0, function () {
    var antal, dst, src;
    if (general.hist.length > 0) {
      var _$last = _.last(general.hist);

      var _$last2 = _slicedToArray(_$last, 3);

      src = _$last2[0];
      dst = _$last2[1];
      antal = _$last2[2];

      dialogues.pop();
      undoMove(general.hist.pop());
      return menu0(src, dst, '#ff0');
    } else {
      return dialogues.pop();
    }
  });
  dialogue.buttons[1].info('Hint', true, function () {
    dialogues.pop();
    return hint(); // Lägger till menu0
  });
  dialogue.buttons[2].info('Cycle Move', alternativeDsts.length > 1, function () {
    var antal, dst, heap, src;
    alternativeDsts.push(alternativeDsts.shift());

    var _general$hist$pop = general.hist.pop();

    var _general$hist$pop2 = _slicedToArray(_general$hist$pop, 3);

    src = _general$hist$pop2[0];
    dst = _general$hist$pop2[1];
    antal = _general$hist$pop2[2];

    undoMove([src, dst, antal]);
    heap = alternativeDsts[0];
    return makeMove(board, src, heap, true);
  });
  // dialogues.pop() # do not pop!
  dialogue.buttons[3].info('Next', general.success(), function () {
    general.level = (general.level + 1) % 16;
    newGame(general.level);
    general.timeUsed = 0;
    general.putLocalStorage();
    return dialogues.pop();
  });
  dialogue.buttons[4].info('Help', true, function () {
    return window.open("https://github.com/ChristerNilsson/Lab/tree/master/2018/056-GeneralensTidsf%C3%B6rdriv#generalens-tidsf%C3%B6rdriv");
  });
  return dialogue.buttons[5].info('More...', true, function () {
    return menu2();
  });
};

menu2 = function menu2() {
  var dialogue, r1, r2;
  dialogue = new Dialogue(2, int(4 * w), int(1.5 * h), int(0.15 * h));
  r1 = 0.25 * height;
  r2 = 0.11 * height;
  dialogue.clock(' ', 3, r1, r2, 90 + 360 / 6);
  dialogue.buttons[0].info('Restart', true, function () {
    restart();
    return dialogues.clear();
  });
  dialogue.buttons[1].info('Total Restart', true, function () {
    general.totalRestart();
    newGame(0);
    return dialogues.clear();
  });
  return dialogue.buttons[2].info('Link', true, function () {
    var link;
    link = makeLink();
    copyToClipboard(link);

    //msg = 'Link copied to clipboard'
    return dialogues.clear();
  });
};

showHeap = function showHeap(board, heap, x, y, dy) {
  // dy kan vara både pos och neg
  var card, dr, k, l, len, len1, m, n, over, rank, ref, ref1, suit, under;
  n = calcAntal(board[heap]);
  x = x * w;
  if (n > 0) {
    y = y * h + y * dy;
    ref = board[heap];
    for (k = l = 0, len = ref.length; l < len; k = ++l) {
      card = ref[k];

      var _unpack7 = unpack(card);

      var _unpack8 = _slicedToArray(_unpack7, 3);

      suit = _unpack8[0];
      under = _unpack8[1];
      over = _unpack8[2];

      dr = under < over ? 1 : -1;
      ref1 = range(under, over + dr, dr);
      for (m = 0, len1 = ref1.length; m < len1; m++) {
        rank = ref1[m];
        noFill();
        stroke(0);
        image(faces, x, y, w, h * 1.1, OFFSETX + W * rank, 1092 + H * suit, 225, H - 1);
        y += dy;
      }
    }
    // visa eventuellt baksidan
    card = _.last(board[heap]);

    var _unpack9 = unpack(card);

    var _unpack10 = _slicedToArray(_unpack9, 3);

    suit = _unpack10[0];
    under = _unpack10[1];
    over = _unpack10[2];

    if (indexOf.call(ACES, heap) >= 0 && over === N - 1) {
      return image(backs, x, y, w, h * 1.1, OFFSETX + 860, 1092 + 622, 225, H - 1);
    }
  }
};

display = function display(board) {
  var dy, heap, l, len, len1, len2, m, n, o, x, y;
  background(0, 128, 0);
  generalen();
  textAlign(CENTER, TOP);
  for (y = l = 0, len = ACES.length; l < len; y = ++l) {
    heap = ACES[y];
    showHeap(board, heap, 8, y, 0);
  }
  for (x = m = 0, len1 = HEAPS.length; m < len1; x = ++m) {
    heap = HEAPS[x];
    n = calcAntal(board[heap]);
    dy = n === 0 ? 0 : min(h / 4, 2 * h / (n - 1));
    showHeap(board, heap, x, 0, dy);
  }
  for (x = o = 0, len2 = PANEL.length; o < len2; x = ++o) {
    heap = PANEL[x];
    showHeap(board, heap, x, 3, 0);
  }
  showInfo();
  noStroke();
  return showDialogue();
};

text3 = function text3(a, b, c, y) {};

showInfo = function showInfo() {
  var i, j, l, len, ref, results, total, x, y;
  fill(64);
  print('textSize');
  textSize(0.1 * (w + h));
  total = general.blackBox.total;
  infoLines[1][0] = general.level;
  infoLines[1][1] = general.maxMoves - general.hist.length;
  infoLines[1][2] = total[1] - total[2];
  infoLines[1][3] = 4 * N - countAceCards(board); // cards
  infoLines[1][6] = total[0];
  infoLines[1][7] = general.hintsUsed; // hints
  fill(255, 255, 0, 128);
  stroke(0, 128, 0);
  textAlign(CENTER, BOTTOM);
  ref = range(8);
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    x = w * (i + 0.5);
    results.push(function () {
      var len1, m, ref1, results1;
      ref1 = range(2);
      results1 = [];
      for (m = 0, len1 = ref1.length; m < len1; m++) {
        j = ref1[m];
        y = h * (2.8 + 0.2 * j);
        results1.push(text(infoLines[j][i], x, y));
      }
      return results1;
    }());
  }
  return results;
};

generalen = function generalen() {
  textAlign(CENTER, CENTER);
  textSize(0.5 * (w + h));
  stroke(0, 64, 0);
  noFill();
  text('Generalens', 4 * w, 0.5 * h);
  return text('Tidsfördriv', 4 * w, 1.5 * h);
};

showDialogue = function showDialogue() {
  if (dialogues.length > 0) {
    return _.last(dialogues).show();
  }
};

legalMove = function legalMove(board, src, dst) {
  var over1, over2, suit1, suit2, under1, under2;
  if (indexOf.call(ACES, src) >= 0) {
    return false;
  }
  if (indexOf.call(PANEL, dst) >= 0) {
    return false;
  }
  if (board[src].length === 0) {
    return false;
  }
  if (board[dst].length === 0) {
    return true;
  }

  var _unpack11 = unpack(_.last(board[src]));

  var _unpack12 = _slicedToArray(_unpack11, 3);

  suit1 = _unpack12[0];
  under1 = _unpack12[1];
  over1 = _unpack12[2];

  var _unpack13 = unpack(_.last(board[dst]));

  var _unpack14 = _slicedToArray(_unpack13, 3);

  suit2 = _unpack14[0];
  under2 = _unpack14[1];
  over2 = _unpack14[2];

  if (suit1 === suit2 && 1 === Math.abs(over1 - over2)) {
    return true;
  }
  return false;
};

makeMove = function makeMove(board, src, dst, record) {
  var over, over1, over2, suit, suit2, under, under1, under2;

  var _unpack15 = unpack(board[src].pop());

  var _unpack16 = _slicedToArray(_unpack15, 3);

  suit = _unpack16[0];
  under1 = _unpack16[1];
  over1 = _unpack16[2];

  over = under1;
  under = over1;
  if (record) {
    general.hist.push([src, dst, 1 + abs(under1 - over1)]);
  }
  if (board[dst].length > 0) {
    var _unpack17 = unpack(board[dst].pop());

    var _unpack18 = _slicedToArray(_unpack17, 3);

    suit2 = _unpack18[0];
    under2 = _unpack18[1];
    over2 = _unpack18[2];

    under = under2;
  }
  return board[dst].push(pack(suit, under, over));
};

// returns text move
undoMove = function undoMove(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      src = _ref2[0],
      dst = _ref2[1],
      antal = _ref2[2];

  var res;
  res = prettyUndoMove(src, dst, board, antal);

  var _undoMoveOne = undoMoveOne(board[src], board[dst], antal);

  var _undoMoveOne2 = _slicedToArray(_undoMoveOne, 2);

  board[src] = _undoMoveOne2[0];
  board[dst] = _undoMoveOne2[1];

  return res;
};

undoMoveOne = function undoMoveOne(a, b, antal) {
  var over, suit, under;

  var _unpack19 = unpack(b.pop());

  var _unpack20 = _slicedToArray(_unpack19, 3);

  suit = _unpack20[0];
  under = _unpack20[1];
  over = _unpack20[2];

  if (under < over) {
    a.push(pack(suit, over, over - antal + 1));
    if (over - under !== antal - 1) {
      b.push(pack(suit, under, over - antal));
    }
  } else {
    a.push(pack(suit, over, over + antal - 1));
    if (under - over !== antal - 1) {
      b.push(pack(suit, under, over + antal));
    }
  }
  return [a, b];
};

assert([['d9T'], ['dJ']], undoMoveOne([], ['dJ9'], 2));

assert([['d9'], ['dJT']], undoMoveOne([], ['dJ9'], 1));

prettyUndoMove = function prettyUndoMove(src, dst, b, antal) {
  var c1, c2;
  c2 = _.last(b[dst]);
  if (b[src].length > 0) {
    c1 = _.last(b[src]);
    return prettyCard2(c2, antal) + " to " + prettyCard(c1);
  } else {
    if (indexOf.call(HEAPS, src) >= 0) {
      prettyCard2(c2, antal) + " to hole";
    }
    if (indexOf.call(PANEL, src) >= 0) {
      return prettyCard2(c2, antal) + " to panel";
    }
  }
};

// returns destination
oneClick = function oneClick(marked, board) {
  var sharp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var found, heap, holes, l, len, len1, m, ref;
  holes = [];
  found = false;
  alternativeDsts = []; // för att kunna välja mellan flera via Cycle Moves
  for (l = 0, len = ACES.length; l < len; l++) {
    heap = ACES[l];
    if (legalMove(board, marked[0], heap)) {
      if (sharp) {
        makeMove(board, marked[0], heap, true);
      }
      found = true;
      return heap;
    }
  }
  if (!found) {
    // Går ej att flytta till något ess. 
    for (m = 0, len1 = HEAPS.length; m < len1; m++) {
      heap = HEAPS[m];
      if (board[heap].length === 0) {
        if ((ref = marked[0], indexOf.call(PANEL, ref) >= 0) || calcAntal(board[marked[0]]) > 1) {
          holes.push(heap);
        }
      } else {
        if (legalMove(board, marked[0], heap)) {
          alternativeDsts.push(heap);
        }
      }
    }
    if (holes.length > 0) {
      alternativeDsts.push(holes[0]);
    }
    if (alternativeDsts.length > 0) {
      heap = alternativeDsts[0];
      if (sharp) {
        makeMove(board, marked[0], heap, true);
      }
      return heap;
    }
  }
  return marked[0];
};

// assert1.jpg
// b1 = readBoard "cA|hA|sA|dA|h5|c3|s65|c2 d5||s3|d2 h6 d4|d3 h4|h2|c5|c4|h3|c6|s4|s2|d6"
// assert 11, oneClick {lastMarked:0, counter:0},[4,0],b1 # hj5 to hj4
// assert 5,  oneClick {lastMarked:0, counter:0},[5,0],b1 # kl3 no move
// assert 8,  oneClick {lastMarked:0, counter:0},[6,1],b1 # sp5 to hole

// assert 10, oneClick {lastMarked:0, counter:0},[7,1],b1 # ru5 to ru4
// assert 8,  oneClick {lastMarked:[7,1], counter:0},[7,1],b1 # ru5 to hole

// assert 8, oneClick {lastMarked:0, counter:0},[8,-1],b1 # hole click
// assert 9, oneClick {lastMarked:0, counter:0},[9,0],b1 # sp3 no move

// assert 7, oneClick {lastMarked:0, counter:0},[10,2],b1 # ru4 to ru5
// assert 8, oneClick {lastMarked:[10,2], counter:0},[10,2],b1 # ru4 to hole
// assert 7, oneClick {lastMarked:[10,2], counter:1},[10,2],b1 # ru4 to ru5

// b1a = readBoard "cA|hA|sA|dA|h5|c3|s65|c2 d54||s3|d2 h6|d3 h4|h2|c5|c4|h3|c6|s4|s2|d6"
// assert 4, oneClick {lastMarked:[10,2], counter:0},[10,1],b1a # hj6 to hj5
// assert 8, oneClick {lastMarked:[10,1], counter:0},[10,1],b1a # hj6 to hole

// assert 4, oneClick {lastMarked:0, counter:0},[11,1],b1 # hj4 to hj5
// assert 8, oneClick {lastMarked:[11,1], counter:0},[11,1],b1 # hj4 to hole xxx

// assert 1, oneClick {lastMarked:0, counter:0},[12,0],b1 # hj2 to A
// assert 8, oneClick {lastMarked:0, counter:0},[13,0],b1 # kl5 to hole

// assert 5, oneClick {lastMarked:0, counter:0},[14,0],b1 # kl4 to kl3
// assert 8, oneClick {lastMarked:[14,0], counter:0},[14,0],b1 # kl4 to hole

// assert 11, oneClick {lastMarked:0, counter:0},[15,0],b1 # hj3 to hj4
// assert 8, oneClick {lastMarked:[15,0], counter:0},[15,0],b1 # hj3 to hole

// assert 8, oneClick {lastMarked:0, counter:0},[16,0],b1 # kl6 to hole

// assert 6, oneClick {lastMarked:0, counter:0},[17,0],b1 # sp4 to sp5
// assert 9, oneClick {lastMarked:[17,0], counter:0},[17,0],b1 # sp4 to sp3
// assert 8, oneClick {lastMarked:[17,0], counter:1},[17,0],b1 # sp4 to hole

// assert 2, oneClick {lastMarked:0, counter:0},[18,0],b1 # sp2 to A

// assert 7, oneClick {lastMarked:0, counter:0},[19,0],b1 # ru6 to ru5
// assert 8, oneClick {lastMarked:[19,0], counter:0},[19,0],b1 # ru6 to hole

// assert2.jpg
b2 = readBoard("cA|hA|sA|dA|d5 h2 d3 h3|c7|c34|d4 h76|||s3 d6 c6|d7 c5 d2|c2|s4|s6|h5|s5|s7|s2|h4");

//assert 8, oneClick {lastMarked:0, marked:9, counter:0},b2 #hj6 to hole
hitGreen = function hitGreen(mx, my, mouseX, mouseY) {
  var n, seqs;
  if (my === 3) {
    return false;
  }
  seqs = board[mx + 4];
  n = calcAntal(seqs);
  if (n === 0) {
    return true;
  }
  return mouseY > h * (1 + 1 / 4 * (n - 1));
};

mouseReleased = function mouseReleased() {
  released = true;
  return false;
};

mousePressed = function mousePressed() {
  var dialogue, mx, my;
  if (!released) {
    return false;
  }
  released = false;
  if (!(0 < mouseX && mouseX < width)) {
    return false;
  }
  if (!(0 < mouseY && mouseY < height)) {
    return false;
  }
  mx = Math.floor(mouseX / w);
  my = Math.floor(mouseY / h);
  if (dialogues.length === 1 && dialogues[0].number === 0) {
    dialogues.pop(); // dölj indikatorer
  }
  dialogue = _.last(dialogues);
  if (dialogues.length === 0 || !dialogue.execute(mouseX, mouseY)) {
    if (mx === 8 || hitGreen(mx, my, mouseX, mouseY)) {
      if (dialogues.length === 0) {
        menu1();
      } else {
        dialogues.pop();
      }
      display(board);
      return false;
    }
    dialogues.clear();
    general.handle(mx, my);
  }
  display(board);
  return false;
};

//###### AI-section ########
findAllMoves = function findAllMoves(b) {
  var dst, holeUsed, l, len, len1, m, res, src;
  srcs = HEAPS.concat(PANEL);
  dsts = ACES.concat(HEAPS);
  res = [];
  for (l = 0, len = srcs.length; l < len; l++) {
    src = srcs[l];
    holeUsed = false;
    for (m = 0, len1 = dsts.length; m < len1; m++) {
      dst = dsts[m];
      if (src !== dst) {
        if (legalMove(b, src, dst)) {
          if (b[dst].length === 0) {
            if (holeUsed) {
              continue;
            }
            holeUsed = true;
          }
          res.push([src, dst]);
        }
      }
    }
  }
  return res;
};

expand = function expand(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 4),
      aceCards = _ref4[0],
      level = _ref4[1],
      b = _ref4[2],
      path = _ref4[3];

  var b1, dst, key, l, len, move, moves, newPath, res, src;
  res = [];
  moves = findAllMoves(b);
  for (l = 0, len = moves.length; l < len; l++) {
    move = moves[l];
    var _move = move;

    var _move2 = _slicedToArray(_move, 2);

    src = _move2[0];
    dst = _move2[1];

    b1 = _.cloneDeep(b);
    makeMove(b1, src, dst);
    key = dumpBoard(b1);
    if (!(key in hash)) {
      newPath = path.concat([move]);
      hash[key] = [newPath, b];
      res.push([countAceCards(b1), level + 1, b1, path.concat([move])]);
    }
  }
  return res;
};

hint = function hint() {
  var antal, dst, res, src;
  if (4 * N === countAceCards(board)) {
    return;
  }
  general.hintsUsed++;
  //dialogues.pop()
  res = hintOne();
  if (res || general.hist.length === 0) {
    return;
  }

  // Gick ej att gå framåt, gå bakåt

  var _$last3 = _.last(general.hist);

  var _$last4 = _slicedToArray(_$last3, 3);

  src = _$last4[0];
  dst = _$last4[1];
  antal = _$last4[2];

  menu0(src, dst, '#f00');
  return print('red', dialogues.length);
};

hintOne = function hintOne() {
  var cand, dst, hintTime, increment, key, nr, origBoard, path, src;
  hintTime = millis();
  aceCards = countAceCards(board);
  if (aceCards === N * 4) {
    return true;
  }
  cands = [];
  cands.push([aceCards, general.hist.length, board, // antal kort på ässen, antal drag, board
  []]);
  hash = {};
  key = dumpBoard(board);
  path = [];
  hash[key] = [path, board];
  nr = 0;
  cand = null;
  origBoard = _.cloneDeep(board);
  while (nr < 10000 && cands.length > 0 && aceCards < N * 4) {
    nr++;
    cand = cands.pop();
    aceCards = cand[0];
    if (aceCards < N * 4) {
      increment = expand(cand);
      cands = cands.concat(increment);
      cands.sort(function (a, b) {
        if (a[0] === b[0]) {
          return b[1] - a[1];
        } else {
          return a[0] - b[0];
        }
      });
    }
  }
  //print N,nr,cands.length,aceCards
  if (aceCards === N * 4) {
    board = cand[2];
    //printAutomaticSolution hash, board
    path = cand[3];
    board = origBoard;

    //makeMove board,src,dst,true
    //dialogues.pop()
    var _path$ = _slicedToArray(path[0], 2);

    src = _path$[0];
    dst = _path$[1];
    menu0(src, dst, '#0f0');
    //print "hint: #{int millis()-hintTime} ms"
    return true;
  } else {
    print('hint failed. Should never happen!');
    //print N,nr,cands.length,aceCards,_.size hash
    board = origBoard;
    return false;
  }
};

newGame = function newGame(lvl) {
  // 0..15
  var cand, increment, nr;
  //lvl = 14
  general.level = lvl;
  general.start = millis();
  general.hist = [];
  print('#####', 'Level', lvl);
  while (true) {
    makeBoard(general.level);
    general.hintsUsed = 0;
    originalBoard = _.cloneDeep(board);
    aceCards = countAceCards(board);
    cands = [];
    cands.push([aceCards, 0, board, // antal kort på ässen, antal drag, board
    []]);
    hash = {};
    nr = 0;
    cand = null;
    while (nr < LIMIT && cands.length > 0 && aceCards < N * 4) {
      nr++;
      cand = cands.pop();
      aceCards = cand[0];
      increment = expand(cand);
      cands = cands.concat(increment);
      cands.sort(function (a, b) {
        if (a[0] === b[0]) {
          return b[1] - a[1];
        } else {
          return a[0] - b[0];
        }
      });
    }
    print('trying', nr, cands.length);
    if (aceCards === N * 4) {
      print(JSON.stringify(dumpBoard(originalBoard)));
      board = cand[2];
      print(makeLink());
      //print 'currentSeed', currentSeed
      printAutomaticSolution(hash, board);
      board = _.cloneDeep(originalBoard);
      print(int(millis() - general.start) + " ms");
      general.start = millis();
      general.maxMoves = int(cand[1]);
      return;
    }
  }
};

restart = function restart() {
  general.hist = [];
  return board = _.cloneDeep(originalBoard);
};

prettyCard2 = function prettyCard2(card, antal) {
  var over, suit, under;

  var _unpack21 = unpack(card);

  var _unpack22 = _slicedToArray(_unpack21, 3);

  suit = _unpack22[0];
  under = _unpack22[1];
  over = _unpack22[2];

  if (antal === 1) {
    return SUIT[suit] + " " + RANK[over];
  } else {
    if (under < over) {
      return SUIT[suit] + " " + RANK[over] + ".." + RANK[over - antal + 1];
    } else {
      return SUIT[suit] + " " + RANK[over] + ".." + RANK[over + antal - 1];
    }
  }
};

prettyCard = function prettyCard(card) {
  var antal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var over, suit, under;

  var _unpack23 = unpack(card);

  var _unpack24 = _slicedToArray(_unpack23, 3);

  suit = _unpack24[0];
  under = _unpack24[1];
  over = _unpack24[2];

  if (antal === 1) {
    return "" + RANK[over];
  } else {
    return SUIT[suit] + " " + RANK[over];
  }
};

assert("club A", prettyCard(pack(0, 0, 0)));

assert("club T", prettyCard(pack(0, 9, 9)));

assert("heart J", prettyCard(pack(1, 10, 10)));

assert("spade Q", prettyCard(pack(2, 11, 11)));

assert("diamond K", prettyCard(pack(3, 12, 12)));

assert("3", prettyCard(pack(3, 2, 2), 1));

//print 'prettyCard ok'
prettyMove = function prettyMove(src, dst, b) {
  var c1, c2;
  c1 = _.last(b[src]);
  if (b[dst].length > 0) {
    c2 = _.last(b[dst]);
    return prettyCard(c1) + " to " + prettyCard(c2, 1);
  } else {
    if (indexOf.call(HEAPS, dst) >= 0) {
      return prettyCard(c1) + " to hole";
    } else {
      return prettyCard(c1) + " to panel";
    }
  }
};

printAutomaticSolution = function printAutomaticSolution(hash, b) {
  var dst, index, key, l, len, path, s, solution, src;
  key = dumpBoard(b);
  solution = [];
  while (key in hash) {
    var _hash$key = _slicedToArray(hash[key], 2);

    path = _hash$key[0];
    b = _hash$key[1];

    solution.push(hash[key]);
    key = dumpBoard(b);
  }
  solution.reverse();
  s = 'Automatic Solution:';
  for (index = l = 0, len = solution.length; l < len; index = ++l) {
    var _solution$index = _slicedToArray(solution[index], 2);

    path = _solution$index[0];
    b = _solution$index[1];

    var _$last5 = _.last(path);

    var _$last6 = _slicedToArray(_$last5, 2);

    src = _$last6[0];
    dst = _$last6[1];

    s += "\n" + index + ": " + prettyMove(src, dst, b) + " (" + src + " to " + dst + ")";
  }
  return print(s);
};

printManualSolution = function printManualSolution() {
  var antal, b, dst, index, l, len, ref, s, src;
  b = _.cloneDeep(originalBoard);
  s = 'Manual Solution:';
  ref = general.hist;
  for (index = l = 0, len = ref.length; l < len; index = ++l) {
    var _ref$index = _slicedToArray(ref[index], 3);

    src = _ref$index[0];
    dst = _ref$index[1];
    antal = _ref$index[2];

    s += "\n" + index + ": " + prettyMove(src, dst, b);
    makeMove(b, src, dst, false);
  }
  return print(s);
};
//# sourceMappingURL=sketch.js.map
