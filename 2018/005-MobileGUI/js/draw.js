'use strict';

// Generated by CoffeeScript 2.0.3
var draw, drawCompass, drawHouse, drawNeedle, drawTexts;

drawHouse = function drawHouse(radius) {
  var dx, i, j, k, len, len1, ref, ref1;
  push();
  // nio linjer
  dx = 0.02 * w;
  sc(0);
  sw(1);
  ref = range(-4, 5);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    line(i * 4 * dx, -1.1 * radius, i * 4 * dx, 1.1 * radius);
  }
  // vit omkrets
  sc(1);
  sw(5);
  fc();
  circle(0, 0, 1.1 * radius);
  // svarta pilen
  sc(0);
  sw(0.05 * h);
  line(0, -1.00 * radius, 0, 1.00 * radius);
  // fyra väderstreck
  sc();
  textAlign(CENTER, CENTER);
  textSize(0.06 * h);
  ref1 = range(4);
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    i = ref1[k];
    push();
    translate(0, 0.96 * radius);
    rd(180);
    if (i === 0) {
      fc(1);
    } else if (i === 2) {
      fc(1, 0, 0);
    } else {
      fc(0);
    }
    text("SWNE"[i], 0, 0);
    pop();
    rd(90);
  }
  return pop();
};

drawNeedle = function drawNeedle(radius) {
  try {
    rd(-bearing);
    sc(0);
    sw(0.035 * h);
    line(0, -0.98 * radius, 0, 0.98 * radius);
    sc(1);
    sw(0.030 * h);
    line(0, 0, 0, 0.98 * radius);
    sc(1, 0, 0);
    line(0, 0, 0, -0.98 * radius);
    sw(0.035 * h);
    sc(0);
    return point(0, 0);
  } catch (error) {}
};

drawCompass = function drawCompass() {
  var delta, radius;
  radius = 0.35 * w;
  delta = calcDelta(heading_12 - bearing);
  fill(calcColor(delta));
  sw(5);
  sc(1);
  push();
  translate(0.5 * w, 0.5 * h);
  circle(0, 0, 1.1 * radius);
  push();
  rd(-heading_12);
  drawHouse(radius);
  pop();
  drawNeedle(radius);
  return pop();
};

drawTexts = function drawTexts() {
  var currTexts, d, helpTexts, i, j, len, n, t, x, y;
  fc(0.5);
  d = h / 12;
  sc(0.5);
  sw(1);
  n = 3; // columns
  helpTexts = ['Distance', 'Bearing', 'ETA', 'Speed', '', 'Time', 'Points', '', 'Delay', 'Destination'];
  if (normal === 1) {
    currTexts = helpTexts;
  } else {
    currTexts = texts;
  }
  textSize(0.08 * h);
  for (i = j = 0, len = currTexts.length; j < len; i = ++j) {
    t = currTexts[i];
    if (i % n === 0) {
      textAlign(LEFT);
    }
    if (i % n === 1) {
      textAlign(CENTER);
    }
    if (i % n === 2) {
      textAlign(RIGHT);
    }
    x = i % n * w / 2;
    y = d * Math.floor(i / n);
    if (i >= 6) {
      y += 7.8 * d;
    }
    if (i === 0 || i === 1 || i === 2) {
      fc(1);
    } else {
      fc(0.5);
    }
    text(t, x, d + y);
  }
  return textAlign(LEFT);
};

draw = function draw() {
  var dt;
  bg(0);
  dt = Math.round((millis() - lastObservation) / 1000);
  texts[8] = dt >= 2 ? dt + ' s' : "";
  texts[5] = precisionRound((millis() - start) / 1000, 0)
  // sekunder sedan start
  + ' s';
  drawCompass();
  return drawTexts();
};
//# sourceMappingURL=draw.js.map
