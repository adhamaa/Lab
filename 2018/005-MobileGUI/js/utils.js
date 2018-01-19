"use strict";

// Generated by CoffeeScript 2.0.3
var addCell, calcDelta, calcHeading, distance_on_geoid, getField, isNumeric, makeButton, makeDiv, makeInput, precisionRound, prettyDate;

addCell = function addCell(tr, value) {
  var td;
  td = document.createElement("td");
  td.appendChild(value);
  return tr.appendChild(td);
};

calcDelta = function calcDelta(delta) {
  if (delta < -180) {
    delta += 360;
  }
  if (delta > +180) {
    delta -= 360;
  }
  return delta;
};

calcHeading = function calcHeading(p1, p2) {
  var q1, q2;
  q1 = LatLon(p1.lat, p1.lng);
  q2 = LatLon(p2.lat, p2.lng);
  return q1.bearingTo(q2);
};

// https://cdn.rawgit.com/chrisveness/geodesy/v1.1.2/latlon-spherical.js
distance_on_geoid = function distance_on_geoid(p1, p2) {
  var q1, q2;
  q1 = LatLon(p1.lat, p1.lng);
  q2 = LatLon(p2.lat, p2.lng);
  return q1.distanceTo(q2);
};

getField = function getField(name) {
  var element;
  element = document.getElementById(name);
  if (element) {
    return element.value;
  } else {
    return null;
  }
};

isNumeric = function isNumeric(val) {
  return val === Number(parseFloat(val));
};

makeButton = function makeButton(title, n, f) {
  var b;
  b = document.createElement('input');
  b.style.width = Math.floor(w / n) + "px";
  b.style.fontSize = "100%";
  b.style.webkitAppearance = "none";
  b.style.borderRadius = 0;
  b.style.padding = 0;
  b.type = 'button';
  b.value = title;
  b.onclick = f;
  return b;
};

makeDiv = function makeDiv(value) {
  var b;
  b = document.createElement('div');
  b.innerHTML = value;
  return b;
};

// makeHidden = (title,value) ->
// 	b = document.createElement 'input'
// 	b.id = title
// 	b.type = 'hidden'
// 	b.value = value
// 	b
makeInput = function makeInput(title, value) {
  var readonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var b;
  b = document.createElement('input');
  b.id = title;
  b.value = value;
  b.placeholder = title;
  b.style.fontSize = "100%";
  b.style.width = "100%";
  if (readonly) {
    b.setAttribute("readonly", true);
  }
  if (title === 'name') {
    b.autofocus = true;
  }
  //b.onclick = "this.setSelectionRange(0, this.value.length)"
  return b;
};

precisionRound = function precisionRound(number, precision) {
  var factor;
  factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

prettyDate = function prettyDate(date) {
  var d, hh, m, mm, ss, y;
  y = date.getFullYear();
  m = ("0" + (date.getMonth() + 1)).slice(-2);
  d = ("0" + date.getDate()).slice(-2);
  hh = ("0" + date.getHours()).slice(-2);
  mm = ("0" + date.getMinutes()).slice(-2);
  ss = ("0" + date.getSeconds()).slice(-2);
  return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
};
//# sourceMappingURL=utils.js.map
