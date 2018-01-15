'use strict';

// Generated by CoffeeScript 2.0.3
var bearing,
    calcColor,
    calcDelta,
    draw,
    drawCompass,
    drawHouse,
    drawNeedle,
    drawTexts,
    h,
    heading_12,
    lastObservation,
    locationUpdate,
    locationUpdateFail,
    mousePressed,
    p1,
    place,
    placeIndex,
    places,
    setup,
    texts,
    track,
    w,
    modulo = function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
};

places = [];

places.push({
  name: 'Bron S Söderbysjön',
  lat: 59.279155,
  lng: 18.149318
});

places.push({
  name: 'Golfklubben',
  lat: 59.284052,
  lng: 18.145925
});

places.push({
  name: 'Sushi Bagarmossen',
  lat: 59.277560,
  lng: 18.132739
});

places.push({
  name: 'Hem',
  lat: 59.265205,
  lng: 18.132735
});

places.push({
  name: 'Hellasgården',
  lat: 59.289813,
  lng: 18.160577
});

places.push({
  name: 'Ulvsjön, Udden',
  lat: 59.277103,
  lng: 18.164897
});

placeIndex = 0;

place = places[placeIndex];

w = null;

h = null;

track = [];

bearing = 0;

heading_12 = 0;

lastObservation = 0;

p1 = null;

texts = ['', '', '', '', '', '', '', '', '', '', '', ''];

locationUpdate = function locationUpdate(position) {
  var ds, dt, p0;
  p1 = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy,
    timestamp: position.timestamp / 1000
  };
  track.push(p1);
  heading_12 = calcHeading(p1, place);
  lastObservation = millis();
  texts[0] = precisionRound(place.lat, 6);
  texts[1] = precisionRound(place.lng, 6);
  texts[3] = '' + track.length;
  texts[6] = Math.round(p1.accuracy) + ' m';
  texts[8] = Math.round(heading_12) + '\xB0';
  //texts[3] = 'nospeed' #p1.spd
  //texts[4] = p1.timestamp
  texts[10] = Math.round(distance_on_geoid(p1, place)) + ' m';
  if (track.length >= 2) {
    p0 = track[track.length - 2];
    dt = p1.timestamp - p0.timestamp;
    ds = distance_on_geoid(p0, p1);
    texts[2] = precisionRound(dt, 3) + ' s';
    texts[4] = Math.round(ds) + ' m';
    texts[5] = precisionRound(ds / dt, 1) + ' m/s';
    return texts[9] = Math.round(calcHeading(p0, p1)) + '\xB0';
  }
};

locationUpdateFail = function locationUpdateFail(error) {
  texts[0] = "n/a";
  return texts[1] = "n/a";
};

navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
});

calcDelta = function calcDelta(delta) {
  if (delta < -180) {
    delta += 360;
  }
  if (delta > +180) {
    delta -= 360;
  }
  return delta;
};

calcColor = function calcColor(delta) {
  var green, red, white;
  white = color(255, 255, 255);
  red = color(255, 0, 0);
  green = color(0, 255, 0);
  if (abs(delta) > 90) {
    return color(0, 0, 0).levels;
  } else if (delta < 0) {
    return lerpColor(white, red, -delta / 90).levels;
  } else {
    return lerpColor(white, green, delta / 90).levels;
  }
};

setup = function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  window.addEventListener("deviceorientation", function (event) {
    var delta;
    bearing = event.alpha;
    if (typeof event.webkitCompassHeading !== "undefined") {
      bearing = event.webkitCompassHeading; // iOS non-standard
    }
    texts[7] = Math.round((millis() - lastObservation) / 1000) + ' s';
    texts[9] = Math.round(bearing) + '\xB0';
    delta = calcDelta(heading_12 - bearing);
    return texts[11] = Math.round(delta) + '\xB0';
  });
  assert([255, 255, 255, 255], calcColor(0));
  assert([255, 0, 0, 255], calcColor(-90));
  assert([0, 0, 0, 255], calcColor(-180));
  assert([0, 255, 0, 255], calcColor(90));
  return assert([0, 0, 0, 255], calcColor(180));
};

drawHouse = function drawHouse(radius) {
  var dx, i, j, len, ref;
  fc(1);
  sc();
  //textSize 50
  textAlign(CENTER, CENTER);
  ref = range(4);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    push();
    translate(0, 1.3 * radius);
    rd(180);
    text("SWNE"[i], 0, 0);
    pop();
    rd(90);
  }
  push();
  sc(0);
  sw(1);
  fc(0.5);
  dx = 0.02 * w;
  rect(-dx, -0.9 * radius, 2 * dx, 1.9 * radius);
  triangle(-1.5 * dx, -0.9 * radius, 0, -1.1 * radius, 1.5 * dx, -0.9 * radius);
  return pop();
};

drawNeedle = function drawNeedle(radius) {
  try {
    rd(-bearing);
    sc(0);
    sw(0.025 * h);
    line(0, -0.95 * radius, 0, 0.95 * radius);
    sc(1);
    sw(0.02 * h);
    line(0, 0, 0, 0.95 * radius);
    sc(1, 0, 0);
    line(0, 0, 0, -0.95 * radius);
    sw(0.025 * h);
    sc(0);
    return point(0, 0);
  } catch (error1) {}
};

drawCompass = function drawCompass() {
  var delta, radius;
  radius = 0.25 * w;
  delta = calcDelta(heading_12 - bearing);
  fill(calcColor(delta));
  sw(5);
  sc(1);
  push();
  translate(0.5 * w, 0.7 * h);
  circle(0, 0, 1.1 * radius);
  push();
  rd(-heading_12);
  drawHouse(radius);
  pop();
  textSize(0.08 * h);
  fc(1);
  sc();
  text(texts[10], 0, -2 * radius);
  text(texts[8], 0, -1.6 * radius);
  drawNeedle(radius);
  return pop();
};

drawTexts = function drawTexts() {
  var d, i, j, len, t, x, y;
  fc(0.5);
  d = h / 12;
  sc(0.5);
  sw(1);
  textSize(0.08 * h);
  for (i = j = 0, len = texts.length; j < len; i = ++j) {
    t = texts[i];
    x = i % 2 * w;
    if (i % 2 === 0) {
      textAlign(LEFT);
    } else {
      textAlign(RIGHT);
    }
    y = d * Math.floor(i / 2);
    if (i !== 8 && i !== 9 && i !== 10 && i !== 11) {
      text(t, x, 2 * d + y);
    }
  }
  textAlign(CENTER);
  return text(place.name, w / 2, d);
};

draw = function draw() {
  bg(0);
  drawCompass();
  return drawTexts();
};

mousePressed = function mousePressed() {
  var p;
  if (mouseY > h / 2 && track.length > 0) {
    p = track[track.length - 1];
    places.push({
      name: prettyDate(new Date()),
      lat: p.lat,
      lng: p.lng
    });
    placeIndex = places.length - 1;
  } else if (mouseX > w / 2) {
    placeIndex++;
  } else {
    placeIndex--;
  }
  placeIndex = modulo(placeIndex, places.length);
  place = places[placeIndex];
  texts = ['', '', '', '', '', '', '', '', '', '', '', ''];
  texts[0] = precisionRound(place.lat, 6);
  return texts[1] = precisionRound(place.lng, 6);
};
//# sourceMappingURL=sketch.js.map
