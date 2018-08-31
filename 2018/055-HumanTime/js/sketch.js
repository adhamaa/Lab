'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
var fem, fiveminutes, klockan, timme;

timme = 'tolv ett två tre fyra fem sex sju åtta nio tio elva'.split(' ');

fem = ['', 'fem över', 'tio över', 'kvart över', 'tjugo över', 'fem i halv', 'halv', 'fem över halv', 'tjugo i', 'kvart i', 'tio i', 'fem i'];

fiveminutes = function fiveminutes(h, m) {
  var t;
  t = Math.floor((60 * h + m + 2) / 5) * 5;
  return [Math.floor(t / 60) % 12, t % 60];
};

assert([0, 25], fiveminutes(12, 27));

assert([0, 30], fiveminutes(12, 28));

assert([0, 30], fiveminutes(12, 29));

assert([0, 30], fiveminutes(12, 30));

assert([0, 30], fiveminutes(12, 31));

assert([0, 30], fiveminutes(12, 32));

assert([0, 35], fiveminutes(12, 33));

assert([0, 35], fiveminutes(12, 34));

assert([6, 0], fiveminutes(5, 59));

klockan = function klockan(h, m) {
  var _fiveminutes = fiveminutes(h, m);

  var _fiveminutes2 = _slicedToArray(_fiveminutes, 2);

  h = _fiveminutes2[0];
  m = _fiveminutes2[1];

  if (m >= 25) {
    h = (h + 1) % 12;
  }
  return (fem[Math.floor(m / 5)] + ' ' + timme[h]).trim();
};

assert('tolv', klockan(11, 59));

assert('tolv', klockan(12, 0));

assert('tolv', klockan(12, 1));

assert('fem över halv ett', klockan(12, 34));

assert('fem över två', klockan(14, 4));

assert('tio över tre', klockan(15, 8));

assert('kvart över fyra', klockan(16, 17));

assert('tjugo över fem', klockan(5, 20));

assert('fem i halv sju', klockan(18, 25));

assert('halv åtta', klockan(19, 29));

assert('fem över halv nio', klockan(8, 35));

assert('tjugo i tio', klockan(9, 40));

assert('kvart i elva', klockan(10, 45));

assert('tio i tolv', klockan(11, 50));
//# sourceMappingURL=sketch.js.map