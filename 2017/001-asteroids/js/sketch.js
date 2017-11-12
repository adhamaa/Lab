// Generated by CoffeeScript 1.12.7
var asteroids, draw, keyPressed, keyReleased, lasers, modulo, setup, ship;

ship = 0;

asteroids = [];

lasers = [];

modulo = function(a, b) {
  if (a < 0) {
    return a + b;
  }
  if (a > b) {
    return a - b;
  }
  return a;
};

assert(5, modulo(5, 10));

assert(5, modulo(15, 10));

assert(5, modulo(-5, 10));

setup = function() {
  var i, j, len, ref, results;
  createCanvas(600, 600);
  ship = new Ship();
  ref = range(5);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    results.push(asteroids.push(new Asteroid()));
  }
  return results;
};

draw = function() {
  var asteroid, j, k, l, laser, len, len1, len2;
  background(0);
  for (j = 0, len = asteroids.length; j < len; j++) {
    asteroid = asteroids[j];
    asteroid.update();
    asteroid.draw();
    if (asteroid.hit(ship)) {
      ship.alive = false;
    }
    for (k = 0, len1 = lasers.length; k < len1; k++) {
      laser = lasers[k];
      if (asteroid.hit(laser)) {
        asteroid.r *= 0.9;
        if (asteroid.r < 5) {
          asteroid.r = -1;
        }
        laser.r = -1;
      }
    }
  }
  lasers = _.filter(lasers, function(laser) {
    return laser.r !== -1 && laser.inside();
  });
  asteroids = _.filter(asteroids, function(a) {
    return a.r !== -1;
  });
  for (l = 0, len2 = lasers.length; l < len2; l++) {
    laser = lasers[l];
    laser.update();
    laser.draw();
  }
  ship.draw();
  ship.update();
  return print(lasers.length);
};

keyPressed = function() {
  if (key === ' ' && ship.alive) {
    lasers.push(new Laser(ship));
  }
  if (keyCode === RIGHT_ARROW) {
    return ship.setRotation(0.05);
  } else if (keyCode === LEFT_ARROW) {
    return ship.setRotation(-0.05);
  } else if (keyCode === UP_ARROW) {
    return ship.accelerate(0.1);
  }
};

keyReleased = function() {
  ship.setRotation(0);
  return ship.accelerate(0);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsSUFBQSxHQUFPOztBQUNQLFNBQUEsR0FBWTs7QUFDWixNQUFBLEdBQVM7O0FBRVQsTUFBQSxHQUFTLFNBQUMsQ0FBRCxFQUFHLENBQUg7RUFDUixJQUFHLENBQUEsR0FBSSxDQUFQO0FBQWMsV0FBTyxDQUFBLEdBQUksRUFBekI7O0VBQ0EsSUFBRyxDQUFBLEdBQUksQ0FBUDtBQUFjLFdBQU8sQ0FBQSxHQUFJLEVBQXpCOztTQUNBO0FBSFE7O0FBSVQsTUFBQSxDQUFPLENBQVAsRUFBVSxNQUFBLENBQU8sQ0FBUCxFQUFTLEVBQVQsQ0FBVjs7QUFDQSxNQUFBLENBQU8sQ0FBUCxFQUFVLE1BQUEsQ0FBTyxFQUFQLEVBQVUsRUFBVixDQUFWOztBQUNBLE1BQUEsQ0FBTyxDQUFQLEVBQVUsTUFBQSxDQUFPLENBQUMsQ0FBUixFQUFVLEVBQVYsQ0FBVjs7QUFFQSxLQUFBLEdBQVEsU0FBQTtBQUNQLE1BQUE7RUFBQSxZQUFBLENBQWEsR0FBYixFQUFpQixHQUFqQjtFQUNBLElBQUEsR0FBTyxJQUFJLElBQUosQ0FBQTtBQUNQO0FBQUE7T0FBQSxxQ0FBQTs7aUJBQ0MsU0FBUyxDQUFDLElBQVYsQ0FBZSxJQUFJLFFBQUosQ0FBQSxDQUFmO0FBREQ7O0FBSE87O0FBTVIsSUFBQSxHQUFPLFNBQUE7QUFDTixNQUFBO0VBQUEsVUFBQSxDQUFXLENBQVg7QUFDQSxPQUFBLDJDQUFBOztJQUNDLFFBQVEsQ0FBQyxNQUFULENBQUE7SUFDQSxRQUFRLENBQUMsSUFBVCxDQUFBO0lBQ0EsSUFBRyxRQUFRLENBQUMsR0FBVCxDQUFhLElBQWIsQ0FBSDtNQUNDLElBQUksQ0FBQyxLQUFMLEdBQWEsTUFEZDs7QUFFQSxTQUFBLDBDQUFBOztNQUNDLElBQUcsUUFBUSxDQUFDLEdBQVQsQ0FBYSxLQUFiLENBQUg7UUFDQyxRQUFRLENBQUMsQ0FBVCxJQUFjO1FBQ2QsSUFBRyxRQUFRLENBQUMsQ0FBVCxHQUFhLENBQWhCO1VBQ0MsUUFBUSxDQUFDLENBQVQsR0FBYSxDQUFDLEVBRGY7O1FBRUEsS0FBSyxDQUFDLENBQU4sR0FBVSxDQUFDLEVBSlo7O0FBREQ7QUFMRDtFQVdBLE1BQUEsR0FBUyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQsRUFBaUIsU0FBQyxLQUFEO1dBQVcsS0FBSyxDQUFDLENBQU4sS0FBUyxDQUFDLENBQVYsSUFBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBQTtFQUEzQixDQUFqQjtFQUNULFNBQUEsR0FBWSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsRUFBb0IsU0FBQyxDQUFEO1dBQU8sQ0FBQyxDQUFDLENBQUYsS0FBSyxDQUFDO0VBQWIsQ0FBcEI7QUFDWixPQUFBLDBDQUFBOztJQUNDLEtBQUssQ0FBQyxNQUFOLENBQUE7SUFDQSxLQUFLLENBQUMsSUFBTixDQUFBO0FBRkQ7RUFHQSxJQUFJLENBQUMsSUFBTCxDQUFBO0VBQ0EsSUFBSSxDQUFDLE1BQUwsQ0FBQTtTQUNBLEtBQUEsQ0FBTSxNQUFNLENBQUMsTUFBYjtBQXBCTTs7QUFzQlAsVUFBQSxHQUFhLFNBQUE7RUFDWixJQUFHLEdBQUEsS0FBTyxHQUFQLElBQWUsSUFBSSxDQUFDLEtBQXZCO0lBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLEtBQUosQ0FBVSxJQUFWLENBQVosRUFERjs7RUFFQSxJQUFHLE9BQUEsS0FBVyxXQUFkO1dBQ0UsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsRUFERjtHQUFBLE1BRUssSUFBRyxPQUFBLEtBQVcsVUFBZDtXQUNILElBQUksQ0FBQyxXQUFMLENBQWlCLENBQUMsSUFBbEIsRUFERztHQUFBLE1BRUEsSUFBRyxPQUFBLEtBQVcsUUFBZDtXQUNKLElBQUksQ0FBQyxVQUFMLENBQWdCLEdBQWhCLEVBREk7O0FBUE87O0FBVWIsV0FBQSxHQUFjLFNBQUE7RUFDYixJQUFJLENBQUMsV0FBTCxDQUFpQixDQUFqQjtTQUNBLElBQUksQ0FBQyxVQUFMLENBQWdCLENBQWhCO0FBRmEiLCJzb3VyY2VzQ29udGVudCI6WyJzaGlwID0gMFxyXG5hc3Rlcm9pZHMgPSBbXVxyXG5sYXNlcnMgPSBbXVxyXG5cclxubW9kdWxvID0gKGEsYikgLT5cclxuXHRpZiBhIDwgMCB0aGVuIHJldHVybiBhICsgYiBcclxuXHRpZiBhID4gYiB0aGVuIHJldHVybiBhIC0gYiBcclxuXHRhXHJcbmFzc2VydCA1LCBtb2R1bG8gNSwxMFxyXG5hc3NlcnQgNSwgbW9kdWxvIDE1LDEwXHJcbmFzc2VydCA1LCBtb2R1bG8gLTUsMTBcclxuXHJcbnNldHVwID0gLT5cclxuXHRjcmVhdGVDYW52YXMgNjAwLDYwMFxyXG5cdHNoaXAgPSBuZXcgU2hpcCgpXHJcblx0Zm9yIGkgaW4gcmFuZ2UgNVxyXG5cdFx0YXN0ZXJvaWRzLnB1c2ggbmV3IEFzdGVyb2lkKClcclxuXHJcbmRyYXcgPSAtPlxyXG5cdGJhY2tncm91bmQgMFxyXG5cdGZvciBhc3Rlcm9pZCBpbiBhc3Rlcm9pZHNcclxuXHRcdGFzdGVyb2lkLnVwZGF0ZSgpXHJcblx0XHRhc3Rlcm9pZC5kcmF3KClcclxuXHRcdGlmIGFzdGVyb2lkLmhpdCBzaGlwXHJcblx0XHRcdHNoaXAuYWxpdmUgPSBmYWxzZVxyXG5cdFx0Zm9yIGxhc2VyIGluIGxhc2Vyc1xyXG5cdFx0XHRpZiBhc3Rlcm9pZC5oaXQgbGFzZXJcclxuXHRcdFx0XHRhc3Rlcm9pZC5yICo9IDAuOVxyXG5cdFx0XHRcdGlmIGFzdGVyb2lkLnIgPCA1IFxyXG5cdFx0XHRcdFx0YXN0ZXJvaWQuciA9IC0xXHJcblx0XHRcdFx0bGFzZXIuciA9IC0xXHJcblx0bGFzZXJzID0gXy5maWx0ZXIgbGFzZXJzLCAobGFzZXIpIC0+IGxhc2VyLnIhPS0xIGFuZCBsYXNlci5pbnNpZGUoKVxyXG5cdGFzdGVyb2lkcyA9IF8uZmlsdGVyIGFzdGVyb2lkcywgKGEpIC0+IGEuciE9LTFcclxuXHRmb3IgbGFzZXIgaW4gbGFzZXJzXHJcblx0XHRsYXNlci51cGRhdGUoKVxyXG5cdFx0bGFzZXIuZHJhdygpXHJcblx0c2hpcC5kcmF3KClcclxuXHRzaGlwLnVwZGF0ZSgpXHJcblx0cHJpbnQgbGFzZXJzLmxlbmd0aCBcclxuXHJcbmtleVByZXNzZWQgPSAtPiBcclxuXHRpZiBrZXkgPT0gJyAnIGFuZCBzaGlwLmFsaXZlIFxyXG5cdCAgbGFzZXJzLnB1c2ggbmV3IExhc2VyIHNoaXBcclxuXHRpZiBrZXlDb2RlID09IFJJR0hUX0FSUk9XIFxyXG5cdCAgc2hpcC5zZXRSb3RhdGlvbiAwLjA1XHJcblx0ZWxzZSBpZiBrZXlDb2RlID09IExFRlRfQVJST1dcclxuXHQgIHNoaXAuc2V0Um90YXRpb24gLTAuMDVcclxuXHRlbHNlIGlmIGtleUNvZGUgPT0gVVBfQVJST1dcclxuXHRcdHNoaXAuYWNjZWxlcmF0ZSAwLjFcclxuXHJcbmtleVJlbGVhc2VkID0gLT5cclxuXHRzaGlwLnNldFJvdGF0aW9uIDBcclxuXHRzaGlwLmFjY2VsZXJhdGUgMCJdfQ==
//# sourceURL=C:\Lab\2017\001-asteroids\coffee\sketch.coffee