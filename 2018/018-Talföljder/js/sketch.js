'use strict';

// Generated by CoffeeScript 2.0.3
var calc, doit, formel, readList, resultat, setup, talföljd;

talföljd = null;

formel = null;

resultat = null;

calc = function calc(formel, talföljd) {
  var i, j, len, n, res, term;
  res = 0;
  n = talföljd.length;
  for (i = j = 0, len = formel.length; j < len; i = ++j) {
    term = formel[i];
    if (i === 0) {
      res += term;
    } else {
      res += term * talföljd[n - i];
    }
  }
  return res;
};

readList = function readList(input) {
  var item, j, len, ref, results;
  if (input.value === '') {
    return [];
  }
  ref = input.value.split(' ');
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    item = ref[j];
    results.push(parseInt(item));
  }
  return results;
};

doit = function doit() {
  var f, i, j, len, ref, s, t, u;
  t = readList(talföljd);
  f = readList(formel);
  u = t.slice();
  ref = range(10);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    u.push(calc(f, u));
  }
  s = u.join(' ');
  if (-1 === s.indexOf('NaN')) {
    return resultat.innerHTML = s;
  } else {
    return resultat.innerHTML = 'K + Aa + Bb + ...';
  }
};

setup = function setup() {
  talföljd = document.getElementById('talföljd');
  formel = document.getElementById('formel');
  resultat = document.getElementById('resultat');
  return doit();
};
//# sourceMappingURL=sketch.js.map
