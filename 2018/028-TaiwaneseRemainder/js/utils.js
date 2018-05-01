'use strict';

// Generated by CoffeeScript 2.0.3
var createProblem,
    createRests,
    indexOf = [].indexOf;

createRests = function createRests(ticks, total) {
  var j, len, results, t;
  results = [];
  for (j = 0, len = ticks.length; j < len; j++) {
    t = ticks[j];
    results.push(total % t);
  }
  return results;
};

createProblem = function createProblem(steps) {
  var h, i, j, len, pathname, primes, ref, rests, result, ticks, total, url;
  primes = [2, 3, 5, 7, 11, 13, 17, 19];
  ticks = _.sample(primes, 2 + Math.floor(steps / 5));
  ticks.sort(function (a, b) {
    return a - b;
  });
  total = 0;
  ref = range(steps);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    total += _.sample(ticks);
  }
  rests = createRests(ticks, total);
  h = window.location.href;
  if (indexOf.call(h, '?') >= 0) {
    pathname = h.split('?')[0];
  } else {
    pathname = h;
  }
  url = pathname;
  url += '?steps=' + steps;
  url += '&ticks=' + ticks;
  url += '&rests=' + rests;
  print(url);
  result = {
    steps: steps,
    ticks: ticks,
    rests: rests,
    url: url
  };
  return result;
};
//# sourceMappingURL=utils.js.map
