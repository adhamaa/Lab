// Generated by CoffeeScript 2.3.2
var block, current, draw, drawTree, drawTreeBackGround, fastKey, info, keyPressed, keyReleased, mousePressed, myround, p1, p2, setup, show, treshold,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

current = 0;

fastKey = 0;

p1 = null;

p2 = null;

treshold = 0.385;

setup = function() {
  var newpoints, p, xs, ys;
  //createCanvas 1500,1000 
  createCanvas(windowWidth - 20, windowHeight - 20);
  xs = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = points.length; j < len; j++) {
      p = points[j];
      results.push(p.x);
    }
    return results;
  })();
  ys = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = points.length; j < len; j++) {
      p = points[j];
      results.push(p.y);
    }
    return results;
  })();
  p1 = {
    x: min(xs),
    y: min(ys)
  };
  p2 = {
    x: max(xs),
    y: max(ys)
  };
  newpoints = simplify(points, treshold);
  return print(chrono);
};

show = function(p) {
  var factor, xfactor, yfactor;
  xfactor = 1500 / (p2.x - p1.x);
  yfactor = 1000 / (p2.y - p1.y);
  factor = 0.9 * min(xfactor, yfactor);
  return point(factor * (-1.1 * p1.x + p.x), factor * (-1.1 * p1.y + p.y));
};

info = function(title, x, y, r, g, b, sw) {
  noStroke();
  fill(255);
  text(title, x + 20, y);
  stroke(r, g, b);
  strokeWeight(sw);
  return point(x, y - 10);
};

myround = function(x, n) {
  return round(x * 10 ** n) / 10 ** n;
};

block = function([level, i], r, g, b) {
  var x, y;
  //if i==undefined or level == undefined then return 
  fill(r, g, b);
  x = 1150 + level * 20;
  y = 25 + 1.9 * i;
  return rect(x, y, 20, 2);
};

drawTreeBackGround = function() {
  var i, j, len, ref, results, x;
  ref = range(-1, 17);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    x = 1150 + i * 20;
    fc(0.75 + 0.05 * (modulo(i, 4)));
    results.push(rect(x, 0, 20, 1000));
  }
  return results;
};

drawTree = function() {
  var hash, i, j, len, level, pi, qi, ri, x, y;
  drawTreeBackGround();
  fill(0);
  hash = {};
  hash[0] = [-1, -1];
  hash[4999] = [-1, 500];
  for (i = j = 0, len = chrono.length; j < len; i = ++j) {
    [pi, qi, ri, level] = chrono[i];
    hash[qi] = [level, i];
    x = 1150 + level * 20;
    y = 25 + 1.9 * i;
    rect(x, y, 20, 2);
  }
  block(hash[0], 0, 0, 0);
  block(hash[4999], 0, 0, 0);
  [pi, qi, ri, level] = chrono[current];
  block(hash[pi], 255, 0, 0);
  block(hash[qi], 255, 255, 0);
  return block(hash[ri], 255, 0, 0);
};

draw = function() {
  var factor, i, j, k, l, len, len1, len2, len3, level, m, p, pi, qi, ref, ref1, ri, x1, x2, xfactor, yfactor;
  scale(height / 1000);
  background(0);
  drawTree();
  noFill();
  x1 = 75;
  textSize(24);
  [pi, qi, ri, level] = chrono[current];
  info('current end points', x1, 875, 255, 0, 0, 12);
  show(points[pi]);
  show(points[ri]);
  info('most distant point', x1, 925, 255, 255, 0, 12);
  show(points[qi]);
  push();
  p = points[qi];
  fill(255, 255, 0);
  noStroke();
  xfactor = 1500 / (p2.x - p1.x);
  yfactor = 1000 / (p2.y - p1.y);
  factor = 0.9 * min(xfactor, yfactor);
  text(current, 5 + factor * (-1.1 * p1.x + p.x), -5 + factor * (-1.1 * p1.y + p.y));
  pop();
  info('found points', x1, 950, 0, 255, 0, 7);
  show(points[0]);
  ref = range(current + 1);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    [pi, qi, ri, level] = chrono[i];
    show(points[qi]);
  }
  info(`simplified ${chrono.length} points`, x1, 975, 0, 255, 0, 3);
  for (k = 0, len1 = chrono.length; k < len1; k++) {
    [pi, qi, ri, level] = chrono[k];
    show(points[qi]);
  }
  info(`original ${points.length} points`, x1, 850, 255, 255, 255, 1);
  for (l = 0, len2 = points.length; l < len2; l++) {
    p = points[l];
    show(p);
  }
  info('current line', x1, 900, 255, 0, 0, 1);
  [pi, qi, ri, level] = chrono[current];
  ref1 = range(pi, ri);
  for (m = 0, len3 = ref1.length; m < len3; m++) {
    i = ref1[m];
    show(points[i]);
  }
  noStroke();
  x2 = 100;
  text('Ramer-Douglas-Peucker 1973', 25, 40);
  text(`step(${pi},${ri},${level}) => ${qi}`, x2, 600);
  text(`current: ${current}`, x2, 625);
  text(`recursion level: ${level}`, x2, 650);
  text(`points in line: ${ri - pi + 1}`, x2, 675);
  text(`distance: ${myround(chrono[current][4], 2)}`, x2, 700);
  text(`treshold: ${treshold}`, x2, 725);
  text('up = fast backward', x2, 750);
  text('left = prev    right = next', x2, 775);
  text('down = fast forward', x2, 800);
  if (fastKey === DOWN_ARROW) {
    current++;
  }
  if (fastKey === UP_ARROW) {
    current--;
  }
  return current = constrain(current, 0, chrono.length - 1);
};

keyPressed = function() {
  if (keyCode === RIGHT_ARROW) {
    current++;
  }
  if (keyCode === LEFT_ARROW) {
    current--;
  }
  current = constrain(current, 0, chrono.length - 1);
  return fastKey = keyCode;
};

keyReleased = function() {
  return fastKey = 0;
};

mousePressed = function() {
  current = round((mouseY - 25) / 1.9 / (height / 1000) - 2);
  return current = constrain(current, 0, chrono.length - 1);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLGtCQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUE7RUFBQTs7QUFBQSxPQUFBLEdBQVE7O0FBQ1IsT0FBQSxHQUFROztBQUNSLEVBQUEsR0FBSzs7QUFDTCxFQUFBLEdBQUs7O0FBQ0wsUUFBQSxHQUFXOztBQUVYLEtBQUEsR0FBUSxRQUFBLENBQUEsQ0FBQTtBQUVQLE1BQUEsU0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTs7RUFBQSxZQUFBLENBQWEsV0FBQSxHQUFZLEVBQXpCLEVBQTZCLFlBQUEsR0FBYSxFQUExQztFQUNBLEVBQUE7O0FBQVU7SUFBQSxLQUFBLHdDQUFBOzttQkFBSixDQUFDLENBQUM7SUFBRSxDQUFBOzs7RUFDVixFQUFBOztBQUFVO0lBQUEsS0FBQSx3Q0FBQTs7bUJBQUosQ0FBQyxDQUFDO0lBQUUsQ0FBQTs7O0VBRVYsRUFBQSxHQUFLO0lBQUMsQ0FBQSxFQUFFLEdBQUEsQ0FBSSxFQUFKLENBQUg7SUFBWSxDQUFBLEVBQUUsR0FBQSxDQUFJLEVBQUo7RUFBZDtFQUNMLEVBQUEsR0FBSztJQUFDLENBQUEsRUFBRSxHQUFBLENBQUksRUFBSixDQUFIO0lBQVksQ0FBQSxFQUFFLEdBQUEsQ0FBSSxFQUFKO0VBQWQ7RUFFTCxTQUFBLEdBQVksUUFBQSxDQUFTLE1BQVQsRUFBaUIsUUFBakI7U0FDWixLQUFBLENBQU0sTUFBTjtBQVZPOztBQVlSLElBQUEsR0FBTyxRQUFBLENBQUMsQ0FBRCxDQUFBO0FBQ04sTUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBO0VBQUEsT0FBQSxHQUFVLElBQUEsR0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFILEdBQUssRUFBRSxDQUFDLENBQVQ7RUFDZixPQUFBLEdBQVUsSUFBQSxHQUFLLENBQUMsRUFBRSxDQUFDLENBQUgsR0FBSyxFQUFFLENBQUMsQ0FBVDtFQUNmLE1BQUEsR0FBUyxHQUFBLEdBQU0sR0FBQSxDQUFJLE9BQUosRUFBWSxPQUFaO1NBQ2YsS0FBQSxDQUFNLE1BQUEsR0FBTyxDQUFDLENBQUMsR0FBRCxHQUFLLEVBQUUsQ0FBQyxDQUFSLEdBQVUsQ0FBQyxDQUFDLENBQWIsQ0FBYixFQUE4QixNQUFBLEdBQU8sQ0FBQyxDQUFDLEdBQUQsR0FBSyxFQUFFLENBQUMsQ0FBUixHQUFVLENBQUMsQ0FBQyxDQUFiLENBQXJDO0FBSk07O0FBTVAsSUFBQSxHQUFPLFFBQUEsQ0FBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsRUFBakIsQ0FBQTtFQUNOLFFBQUEsQ0FBQTtFQUNBLElBQUEsQ0FBSyxHQUFMO0VBQ0EsSUFBQSxDQUFLLEtBQUwsRUFBVyxDQUFBLEdBQUUsRUFBYixFQUFnQixDQUFoQjtFQUNBLE1BQUEsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVg7RUFDQSxZQUFBLENBQWEsRUFBYjtTQUNBLEtBQUEsQ0FBTSxDQUFOLEVBQVEsQ0FBQSxHQUFFLEVBQVY7QUFOTTs7QUFRUCxPQUFBLEdBQVUsUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUE7U0FBUyxLQUFBLENBQU0sQ0FBQSxHQUFFLEVBQUEsSUFBSSxDQUFaLENBQUEsR0FBaUIsRUFBQSxJQUFJO0FBQTlCOztBQUVWLEtBQUEsR0FBUSxRQUFBLENBQUMsQ0FBQyxLQUFELEVBQU8sQ0FBUCxDQUFELEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQUE7QUFFUCxNQUFBLENBQUEsRUFBQSxDQUFBOztFQUFBLElBQUEsQ0FBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQ7RUFDQSxDQUFBLEdBQUksSUFBQSxHQUFLLEtBQUEsR0FBTTtFQUNmLENBQUEsR0FBSSxFQUFBLEdBQUcsR0FBQSxHQUFJO1NBQ1gsSUFBQSxDQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsRUFBVCxFQUFZLENBQVo7QUFMTzs7QUFPUixrQkFBQSxHQUFxQixRQUFBLENBQUEsQ0FBQTtBQUNwQixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUE7QUFBQTtBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxDQUFBLEdBQUksSUFBQSxHQUFLLENBQUEsR0FBRTtJQUNYLEVBQUEsQ0FBRyxJQUFBLEdBQUssSUFBQSxHQUFLLFFBQUMsR0FBRyxFQUFKLENBQWI7aUJBQ0EsSUFBQSxDQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsRUFBWCxFQUFjLElBQWQ7RUFIRCxDQUFBOztBQURvQjs7QUFNckIsUUFBQSxHQUFXLFFBQUEsQ0FBQSxDQUFBO0FBQ1YsTUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQTtFQUFBLGtCQUFBLENBQUE7RUFDQSxJQUFBLENBQUssQ0FBTDtFQUNBLElBQUEsR0FBTyxDQUFBO0VBQ1AsSUFBSyxDQUFBLENBQUEsQ0FBTCxHQUFVLENBQUMsQ0FBQyxDQUFGLEVBQUksQ0FBQyxDQUFMO0VBQ1YsSUFBSyxDQUFBLElBQUEsQ0FBTCxHQUFhLENBQUMsQ0FBQyxDQUFGLEVBQUksR0FBSjtFQUNiLEtBQUEsZ0RBQUE7SUFBSSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEtBQVY7SUFDSCxJQUFLLENBQUEsRUFBQSxDQUFMLEdBQVcsQ0FBQyxLQUFELEVBQU8sQ0FBUDtJQUNYLENBQUEsR0FBSSxJQUFBLEdBQUssS0FBQSxHQUFNO0lBQ2YsQ0FBQSxHQUFJLEVBQUEsR0FBRyxHQUFBLEdBQUk7SUFDWCxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxFQUFULEVBQVksQ0FBWjtFQUpEO0VBS0EsS0FBQSxDQUFNLElBQUssQ0FBQSxDQUFBLENBQVgsRUFBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCO0VBQ0EsS0FBQSxDQUFNLElBQUssQ0FBQSxJQUFBLENBQVgsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckI7RUFFQSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEtBQVYsQ0FBQSxHQUFtQixNQUFPLENBQUEsT0FBQTtFQUMxQixLQUFBLENBQU0sSUFBSyxDQUFBLEVBQUEsQ0FBWCxFQUFlLEdBQWYsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckI7RUFDQSxLQUFBLENBQU0sSUFBSyxDQUFBLEVBQUEsQ0FBWCxFQUFlLEdBQWYsRUFBbUIsR0FBbkIsRUFBdUIsQ0FBdkI7U0FDQSxLQUFBLENBQU0sSUFBSyxDQUFBLEVBQUEsQ0FBWCxFQUFlLEdBQWYsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckI7QUFqQlU7O0FBbUJYLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtBQUNOLE1BQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQTtFQUFBLEtBQUEsQ0FBTSxNQUFBLEdBQU8sSUFBYjtFQUNBLFVBQUEsQ0FBVyxDQUFYO0VBRUEsUUFBQSxDQUFBO0VBRUEsTUFBQSxDQUFBO0VBQ0EsRUFBQSxHQUFLO0VBQ0wsUUFBQSxDQUFTLEVBQVQ7RUFFQSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEtBQVYsQ0FBQSxHQUFtQixNQUFPLENBQUEsT0FBQTtFQUMxQixJQUFBLENBQUssb0JBQUwsRUFBMEIsRUFBMUIsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsRUFBc0MsQ0FBdEMsRUFBd0MsQ0FBeEMsRUFBMkMsRUFBM0M7RUFDQSxJQUFBLENBQUssTUFBTyxDQUFBLEVBQUEsQ0FBWjtFQUNBLElBQUEsQ0FBSyxNQUFPLENBQUEsRUFBQSxDQUFaO0VBQ0EsSUFBQSxDQUFLLG9CQUFMLEVBQTBCLEVBQTFCLEVBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLEVBQXNDLEdBQXRDLEVBQTBDLENBQTFDLEVBQTZDLEVBQTdDO0VBQ0EsSUFBQSxDQUFLLE1BQU8sQ0FBQSxFQUFBLENBQVo7RUFFQSxJQUFBLENBQUE7RUFDQSxDQUFBLEdBQUksTUFBTyxDQUFBLEVBQUE7RUFDWCxJQUFBLENBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxDQUFiO0VBQ0EsUUFBQSxDQUFBO0VBQ0EsT0FBQSxHQUFVLElBQUEsR0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFILEdBQUssRUFBRSxDQUFDLENBQVQ7RUFDZixPQUFBLEdBQVUsSUFBQSxHQUFLLENBQUMsRUFBRSxDQUFDLENBQUgsR0FBSyxFQUFFLENBQUMsQ0FBVDtFQUNmLE1BQUEsR0FBUyxHQUFBLEdBQU0sR0FBQSxDQUFJLE9BQUosRUFBWSxPQUFaO0VBQ2YsSUFBQSxDQUFLLE9BQUwsRUFBYyxDQUFBLEdBQUUsTUFBQSxHQUFPLENBQUMsQ0FBQyxHQUFELEdBQUssRUFBRSxDQUFDLENBQVIsR0FBVSxDQUFDLENBQUMsQ0FBYixDQUF2QixFQUF3QyxDQUFDLENBQUQsR0FBRyxNQUFBLEdBQU8sQ0FBQyxDQUFDLEdBQUQsR0FBSyxFQUFFLENBQUMsQ0FBUixHQUFVLENBQUMsQ0FBQyxDQUFiLENBQWxEO0VBQ0EsR0FBQSxDQUFBO0VBRUEsSUFBQSxDQUFLLGNBQUwsRUFBb0IsRUFBcEIsRUFBdUIsR0FBdkIsRUFBNEIsQ0FBNUIsRUFBOEIsR0FBOUIsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckM7RUFDQSxJQUFBLENBQUssTUFBTyxDQUFBLENBQUEsQ0FBWjtBQUNBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEtBQVYsQ0FBQSxHQUFtQixNQUFPLENBQUEsQ0FBQTtJQUMxQixJQUFBLENBQUssTUFBTyxDQUFBLEVBQUEsQ0FBWjtFQUZEO0VBSUEsSUFBQSxDQUFLLENBQUEsV0FBQSxDQUFBLENBQWMsTUFBTSxDQUFDLE1BQXJCLENBQTRCLE9BQTVCLENBQUwsRUFBMEMsRUFBMUMsRUFBNkMsR0FBN0MsRUFBa0QsQ0FBbEQsRUFBb0QsR0FBcEQsRUFBd0QsQ0FBeEQsRUFBMkQsQ0FBM0Q7RUFDZ0IsS0FBQSwwQ0FBQTtJQUFJLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLEVBQVUsS0FBVjtJQUFwQixJQUFBLENBQUssTUFBTyxDQUFBLEVBQUEsQ0FBWjtFQUFnQjtFQUVoQixJQUFBLENBQUssQ0FBQSxTQUFBLENBQUEsQ0FBWSxNQUFNLENBQUMsTUFBbkIsQ0FBMEIsT0FBMUIsQ0FBTCxFQUF3QyxFQUF4QyxFQUEyQyxHQUEzQyxFQUFnRCxHQUFoRCxFQUFvRCxHQUFwRCxFQUF3RCxHQUF4RCxFQUE2RCxDQUE3RDtFQUNPLEtBQUEsMENBQUE7O0lBQVAsSUFBQSxDQUFLLENBQUw7RUFBTztFQUVQLElBQUEsQ0FBSyxjQUFMLEVBQW9CLEVBQXBCLEVBQXVCLEdBQXZCLEVBQTRCLEdBQTVCLEVBQWdDLENBQWhDLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDO0VBQ0EsQ0FBQyxFQUFELEVBQUksRUFBSixFQUFPLEVBQVAsRUFBVSxLQUFWLENBQUEsR0FBbUIsTUFBTyxDQUFBLE9BQUE7QUFDWDtFQUFBLEtBQUEsd0NBQUE7O0lBQWYsSUFBQSxDQUFLLE1BQU8sQ0FBQSxDQUFBLENBQVo7RUFBZTtFQUVmLFFBQUEsQ0FBQTtFQUNBLEVBQUEsR0FBSztFQUNMLElBQUEsQ0FBSyw0QkFBTCxFQUFrQyxFQUFsQyxFQUFxQyxFQUFyQztFQUNBLElBQUEsQ0FBSyxDQUFBLEtBQUEsQ0FBQSxDQUFRLEVBQVIsQ0FBVyxDQUFYLENBQUEsQ0FBYyxFQUFkLENBQWlCLENBQWpCLENBQUEsQ0FBb0IsS0FBcEIsQ0FBMEIsS0FBMUIsQ0FBQSxDQUFpQyxFQUFqQyxDQUFBLENBQUwsRUFBMkMsRUFBM0MsRUFBOEMsR0FBOUM7RUFDQSxJQUFBLENBQUssQ0FBQSxTQUFBLENBQUEsQ0FBWSxPQUFaLENBQUEsQ0FBTCxFQUEyQixFQUEzQixFQUE4QixHQUE5QjtFQUNBLElBQUEsQ0FBSyxDQUFBLGlCQUFBLENBQUEsQ0FBb0IsS0FBcEIsQ0FBQSxDQUFMLEVBQWlDLEVBQWpDLEVBQW9DLEdBQXBDO0VBQ0EsSUFBQSxDQUFLLENBQUEsZ0JBQUEsQ0FBQSxDQUFtQixFQUFBLEdBQUcsRUFBSCxHQUFNLENBQXpCLENBQUEsQ0FBTCxFQUFrQyxFQUFsQyxFQUFxQyxHQUFyQztFQUNBLElBQUEsQ0FBSyxDQUFBLFVBQUEsQ0FBQSxDQUFhLE9BQUEsQ0FBUSxNQUFPLENBQUEsT0FBQSxDQUFTLENBQUEsQ0FBQSxDQUF4QixFQUEyQixDQUEzQixDQUFiLENBQUEsQ0FBTCxFQUFpRCxFQUFqRCxFQUFvRCxHQUFwRDtFQUNBLElBQUEsQ0FBSyxDQUFBLFVBQUEsQ0FBQSxDQUFhLFFBQWIsQ0FBQSxDQUFMLEVBQTZCLEVBQTdCLEVBQWdDLEdBQWhDO0VBQ0EsSUFBQSxDQUFLLG9CQUFMLEVBQTBCLEVBQTFCLEVBQTZCLEdBQTdCO0VBQ0EsSUFBQSxDQUFLLDZCQUFMLEVBQW1DLEVBQW5DLEVBQXNDLEdBQXRDO0VBQ0EsSUFBQSxDQUFLLHFCQUFMLEVBQTJCLEVBQTNCLEVBQThCLEdBQTlCO0VBRUEsSUFBRyxPQUFBLEtBQVcsVUFBZDtJQUE4QixPQUFBLEdBQTlCOztFQUNBLElBQUcsT0FBQSxLQUFXLFFBQWQ7SUFBNEIsT0FBQSxHQUE1Qjs7U0FDQSxPQUFBLEdBQVUsU0FBQSxDQUFVLE9BQVYsRUFBa0IsQ0FBbEIsRUFBb0IsTUFBTSxDQUFDLE1BQVAsR0FBYyxDQUFsQztBQTFESjs7QUE0RFAsVUFBQSxHQUFhLFFBQUEsQ0FBQSxDQUFBO0VBQ1osSUFBRyxPQUFBLEtBQVcsV0FBZDtJQUErQixPQUFBLEdBQS9COztFQUNBLElBQUcsT0FBQSxLQUFXLFVBQWQ7SUFBOEIsT0FBQSxHQUE5Qjs7RUFDQSxPQUFBLEdBQVUsU0FBQSxDQUFVLE9BQVYsRUFBa0IsQ0FBbEIsRUFBb0IsTUFBTSxDQUFDLE1BQVAsR0FBYyxDQUFsQztTQUNWLE9BQUEsR0FBVTtBQUpFOztBQU1iLFdBQUEsR0FBYyxRQUFBLENBQUEsQ0FBQTtTQUFHLE9BQUEsR0FBVTtBQUFiOztBQUVkLFlBQUEsR0FBZSxRQUFBLENBQUEsQ0FBQTtFQUNkLE9BQUEsR0FBVSxLQUFBLENBQU0sQ0FBQyxNQUFBLEdBQU8sRUFBUixDQUFBLEdBQVksR0FBWixHQUFnQixDQUFDLE1BQUEsR0FBTyxJQUFSLENBQWhCLEdBQWdDLENBQXRDO1NBQ1YsT0FBQSxHQUFVLFNBQUEsQ0FBVSxPQUFWLEVBQWtCLENBQWxCLEVBQW9CLE1BQU0sQ0FBQyxNQUFQLEdBQWMsQ0FBbEM7QUFGSSIsInNvdXJjZXNDb250ZW50IjpbImN1cnJlbnQ9MFxuZmFzdEtleT0wXG5wMSA9IG51bGxcbnAyID0gbnVsbFxudHJlc2hvbGQgPSAwLjM4NVxuXG5zZXR1cCA9ICgpIC0+XG5cdCNjcmVhdGVDYW52YXMgMTUwMCwxMDAwIFxuXHRjcmVhdGVDYW52YXMgd2luZG93V2lkdGgtMjAsIHdpbmRvd0hlaWdodC0yMFxuXHR4cyA9IChwLnggZm9yIHAgaW4gcG9pbnRzKVxuXHR5cyA9IChwLnkgZm9yIHAgaW4gcG9pbnRzKVxuXG5cdHAxID0ge3g6bWluKHhzKSwgeTptaW4oeXMpfSBcblx0cDIgPSB7eDptYXgoeHMpLCB5Om1heCh5cyl9XG5cblx0bmV3cG9pbnRzID0gc2ltcGxpZnkgcG9pbnRzLCB0cmVzaG9sZFx0XG5cdHByaW50IGNocm9ub1xuXG5zaG93ID0gKHApIC0+IFxuXHR4ZmFjdG9yID0gMTUwMC8ocDIueC1wMS54KVxuXHR5ZmFjdG9yID0gMTAwMC8ocDIueS1wMS55KVxuXHRmYWN0b3IgPSAwLjkgKiBtaW4geGZhY3Rvcix5ZmFjdG9yXG5cdHBvaW50IGZhY3RvciooLTEuMSpwMS54K3AueCksIGZhY3RvciooLTEuMSpwMS55K3AueSlcblxuaW5mbyA9ICh0aXRsZSx4LHkscixnLGIsc3cpIC0+XG5cdG5vU3Ryb2tlKClcblx0ZmlsbCAyNTVcblx0dGV4dCB0aXRsZSx4KzIwLHlcblx0c3Ryb2tlIHIsZyxiXG5cdHN0cm9rZVdlaWdodCBzd1xuXHRwb2ludCB4LHktMTBcblxubXlyb3VuZCA9ICh4LG4pIC0+IHJvdW5kKHgqMTAqKm4pIC8gMTAqKm5cblxuYmxvY2sgPSAoW2xldmVsLGldLHIsZyxiKSAtPlxuXHQjaWYgaT09dW5kZWZpbmVkIG9yIGxldmVsID09IHVuZGVmaW5lZCB0aGVuIHJldHVybiBcblx0ZmlsbCByLGcsYiBcblx0eCA9IDExNTArbGV2ZWwqMjBcblx0eSA9IDI1KzEuOSppXG5cdHJlY3QgeCx5LDIwLDJcblxuZHJhd1RyZWVCYWNrR3JvdW5kID0gLT5cblx0Zm9yIGkgaW4gcmFuZ2UgLTEsMTdcblx0XHR4ID0gMTE1MCtpKjIwXG5cdFx0ZmMgMC43NSswLjA1KihpJSU0KVxuXHRcdHJlY3QgeCwgMCwgMjAsMTAwMFxuXG5kcmF3VHJlZSA9IC0+XG5cdGRyYXdUcmVlQmFja0dyb3VuZCgpXG5cdGZpbGwgMFxuXHRoYXNoID0ge31cblx0aGFzaFswXSA9IFstMSwtMV1cblx0aGFzaFs0OTk5XSA9IFstMSw1MDBdXG5cdGZvciBbcGkscWkscmksbGV2ZWxdLGkgaW4gY2hyb25vXG5cdFx0aGFzaFtxaV0gPSBbbGV2ZWwsaV1cblx0XHR4ID0gMTE1MCtsZXZlbCoyMFxuXHRcdHkgPSAyNSsxLjkqaVxuXHRcdHJlY3QgeCx5LDIwLDJcblx0YmxvY2sgaGFzaFswXSwwLDAsMFxuXHRibG9jayBoYXNoWzQ5OTldLDAsMCwwXG5cblx0W3BpLHFpLHJpLGxldmVsXSA9IGNocm9ub1tjdXJyZW50XVxuXHRibG9jayBoYXNoW3BpXSwyNTUsMCwwXG5cdGJsb2NrIGhhc2hbcWldLDI1NSwyNTUsMFxuXHRibG9jayBoYXNoW3JpXSwyNTUsMCwwXG5cbmRyYXcgPSAtPlxuXHRzY2FsZSBoZWlnaHQvMTAwMFxuXHRiYWNrZ3JvdW5kIDBcblxuXHRkcmF3VHJlZSgpXG5cblx0bm9GaWxsKClcblx0eDEgPSA3NVxuXHR0ZXh0U2l6ZSAyNFxuXG5cdFtwaSxxaSxyaSxsZXZlbF0gPSBjaHJvbm9bY3VycmVudF1cblx0aW5mbyAnY3VycmVudCBlbmQgcG9pbnRzJyx4MSw4NzUsIDI1NSwwLDAsIDEyXG5cdHNob3cgcG9pbnRzW3BpXVxuXHRzaG93IHBvaW50c1tyaV1cblx0aW5mbyAnbW9zdCBkaXN0YW50IHBvaW50Jyx4MSw5MjUsIDI1NSwyNTUsMCwgMTJcblx0c2hvdyBwb2ludHNbcWldXG5cblx0cHVzaCgpXG5cdHAgPSBwb2ludHNbcWldXG5cdGZpbGwgMjU1LDI1NSwwXG5cdG5vU3Ryb2tlKClcblx0eGZhY3RvciA9IDE1MDAvKHAyLngtcDEueClcblx0eWZhY3RvciA9IDEwMDAvKHAyLnktcDEueSlcblx0ZmFjdG9yID0gMC45ICogbWluIHhmYWN0b3IseWZhY3Rvclx0XG5cdHRleHQgY3VycmVudCwgNStmYWN0b3IqKC0xLjEqcDEueCtwLngpLCAtNStmYWN0b3IqKC0xLjEqcDEueStwLnkpXHRcblx0cG9wKClcblxuXHRpbmZvICdmb3VuZCBwb2ludHMnLHgxLDk1MCwgMCwyNTUsMCwgN1xuXHRzaG93IHBvaW50c1swXVxuXHRmb3IgaSBpbiByYW5nZSBjdXJyZW50KzFcblx0XHRbcGkscWkscmksbGV2ZWxdID0gY2hyb25vW2ldXG5cdFx0c2hvdyBwb2ludHNbcWldXG5cblx0aW5mbyBcInNpbXBsaWZpZWQgI3tjaHJvbm8ubGVuZ3RofSBwb2ludHNcIix4MSw5NzUsIDAsMjU1LDAsIDNcblx0c2hvdyBwb2ludHNbcWldIGZvciBbcGkscWkscmksbGV2ZWxdIGluIGNocm9ub1xuXG5cdGluZm8gXCJvcmlnaW5hbCAje3BvaW50cy5sZW5ndGh9IHBvaW50c1wiLHgxLDg1MCwgMjU1LDI1NSwyNTUsIDFcblx0c2hvdyBwIGZvciBwIGluIHBvaW50cyBcblxuXHRpbmZvICdjdXJyZW50IGxpbmUnLHgxLDkwMCwgMjU1LDAsMCwgMVxuXHRbcGkscWkscmksbGV2ZWxdID0gY2hyb25vW2N1cnJlbnRdXG5cdHNob3cgcG9pbnRzW2ldIGZvciBpIGluIHJhbmdlIHBpLHJpXG5cblx0bm9TdHJva2UoKVxuXHR4MiA9IDEwMFxuXHR0ZXh0ICdSYW1lci1Eb3VnbGFzLVBldWNrZXIgMTk3MycsMjUsNDBcblx0dGV4dCBcInN0ZXAoI3twaX0sI3tyaX0sI3tsZXZlbH0pID0+ICN7cWl9XCIseDIsNjAwXG5cdHRleHQgXCJjdXJyZW50OiAje2N1cnJlbnR9XCIseDIsNjI1XG5cdHRleHQgXCJyZWN1cnNpb24gbGV2ZWw6ICN7bGV2ZWx9XCIseDIsNjUwXG5cdHRleHQgXCJwb2ludHMgaW4gbGluZTogI3tyaS1waSsxfVwiLHgyLDY3NVxuXHR0ZXh0IFwiZGlzdGFuY2U6ICN7bXlyb3VuZCBjaHJvbm9bY3VycmVudF1bNF0sMn1cIix4Miw3MDBcblx0dGV4dCBcInRyZXNob2xkOiAje3RyZXNob2xkfVwiLHgyLDcyNVxuXHR0ZXh0ICd1cCA9IGZhc3QgYmFja3dhcmQnLHgyLDc1MFxuXHR0ZXh0ICdsZWZ0ID0gcHJldiAgICByaWdodCA9IG5leHQnLHgyLDc3NVxuXHR0ZXh0ICdkb3duID0gZmFzdCBmb3J3YXJkJyx4Miw4MDBcblxuXHRpZiBmYXN0S2V5ID09IERPV05fQVJST1cgdGhlbiBjdXJyZW50Kytcblx0aWYgZmFzdEtleSA9PSBVUF9BUlJPVyB0aGVuIGN1cnJlbnQtLVxuXHRjdXJyZW50ID0gY29uc3RyYWluIGN1cnJlbnQsMCxjaHJvbm8ubGVuZ3RoLTFcblxua2V5UHJlc3NlZCA9IC0+IFxuXHRpZiBrZXlDb2RlID09IFJJR0hUX0FSUk9XIHRoZW4gY3VycmVudCsrXG5cdGlmIGtleUNvZGUgPT0gTEVGVF9BUlJPVyB0aGVuIGN1cnJlbnQtLVxuXHRjdXJyZW50ID0gY29uc3RyYWluIGN1cnJlbnQsMCxjaHJvbm8ubGVuZ3RoLTFcblx0ZmFzdEtleSA9IGtleUNvZGUgXG5cbmtleVJlbGVhc2VkID0gLT4gZmFzdEtleSA9IDBcblxubW91c2VQcmVzc2VkID0gLT5cblx0Y3VycmVudCA9IHJvdW5kIChtb3VzZVktMjUpLzEuOS8oaGVpZ2h0LzEwMDApIC0gMlxuXHRjdXJyZW50ID0gY29uc3RyYWluIGN1cnJlbnQsMCxjaHJvbm8ubGVuZ3RoLTFcbiJdfQ==
//# sourceURL=C:\Lab\2019\014-Ramer-Douglas-Peucker\coffee\sketch.coffee