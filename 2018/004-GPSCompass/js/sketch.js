"use strict";

// Generated by CoffeeScript 2.0.3
var bearing, draw, locationUpdate, locationUpdateFail, p1, setup;

bearing = 0;

p1 = null;

locationUpdate = function locationUpdate(position) {
  return p1 = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    timestamp: position.timestamp, // milliseconds since 1970
    heading: position.coords.heading,
    speed: position.coords.speed
  };
};

locationUpdateFail = function locationUpdateFail(error) {};

setup = function setup() {
  createCanvas(windowWidth, windowHeight);
  window.addEventListener("deviceorientation", function (event) {
    if (event.alpha) {
      return bearing = 360 - Math.round(event.alpha);
    }
  });
  textSize(100);
  textAlign(CENTER, CENTER);
  return navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });
};

draw = function draw() {
  bg(1);
  if (p1) {
    if (p1.heading) {
      text(p1.heading, width * 0.5, height * 0.1);
    }
    if (p1.speed) {
      text(p1.speed, width * 0.5, height * 0.2);
    }
  }
  text(bearing, width * 0.5, height * 0.50);
  if (window.orientation) {
    return text(window.orientation, width * 0.5, height * 0.75);
  } else {
    return text('orient unknown', width * 0.5, height * 0.75);
  }
};
//# sourceMappingURL=sketch.js.map
