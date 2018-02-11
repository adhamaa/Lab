'use strict';

// Generated by CoffeeScript 2.0.3
var calc, s1, s2;

s1 = 'hate love peace love peace hate love peace love peace'.split(' ');

s2 = 'Om Om Shankar Tripathi Tom Jerry Jerry'.split(' ');

calc = function calc(words) {
  var count, i, len, m, res, word;
  m = {};
  for (i = 0, len = words.length; i < len; i++) {
    word = words[i];
    if (word in m) {
      m[word]++;
    } else {
      m[word] = 1;
    }
  }
  res = 0;
  for (word in m) {
    count = m[word];
    if (count === 2) {
      res++;
    }
  }
  return res;
};

assert(1, calc(s1));

assert(2, calc(s2));
//# sourceMappingURL=sketch.js.map