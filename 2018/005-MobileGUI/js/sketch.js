'use strict';

// Generated by CoffeeScript 2.0.3
// https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
// sex decimaler motsvarar 11 cm resp 5 cm precision i sista siffran.
var BLACK, GREEN, LINK, RED, WHITE, bearing, fetchData, h, heading_12, hideCanvas, lastObservation, locationUpdate, locationUpdateFail, mousePressed, normal, oldName, p1, pages, place, placeIndex, places, setup, setupCompass, showCanvas, start, startDate, storeData, texts, track, w;

LINK = "https://christernilsson.github.io/Lab/2018/005-MobileGUI/index.html";

WHITE = null;

GREEN = null;

BLACK = null;

RED = null;

pages = {};

place = null;

oldName = null;

normal = 0; // 0 = values 1 = help texts

places = [];

places.push({
  name: 'Bagarmossen Sushi',
  lat: 59.277560,
  lng: 18.132739
});

places.push({
  name: 'Bagarmossen T',
  lat: 59.276264,
  lng: 18.131465
});

places.push({
  name: 'Björkhagens Golfklubb',
  lat: 59.284052,
  lng: 18.145925
});

places.push({
  name: 'Björkhagen T',
  lat: 59.291114,
  lng: 18.115521
});

places.push({
  name: 'Brotorpsbron',
  lat: 59.270067,
  lng: 18.150236
});

places.push({
  name: 'Brotorpsstugan',
  lat: 59.270542,
  lng: 18.148473
});

places.push({
  name: 'Kärrtorp T',
  lat: 59.284505,
  lng: 18.114477
});

places.push({
  name: 'Hellasgården',
  lat: 59.289813,
  lng: 18.160577
});

places.push({
  name: 'Hem',
  lat: 59.265205,
  lng: 18.132735
});

places.push({
  name: 'Parkeringsgran',
  lat: 59.274916,
  lng: 18.161353
});

places.push({
  name: 'Pers badställe',
  lat: 59.289571,
  lng: 18.170767
});

places.push({
  name: 'Skarpnäck T',
  lat: 59.266432,
  lng: 18.133093
});

places.push({
  name: 'Söderbysjön N Bron',
  lat: 59.285500,
  lng: 18.150542
});

places.push({
  name: 'Söderbysjön S Bron',
  lat: 59.279155,
  lng: 18.149318
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

start = null; // Starttid. Sätts vid byte av target

startDate = null;

texts = ['dist', 'bäring', 'ETA', 'km/h', '', 'wait', 'punkter', '', 'tid', 'destination'];

storeData = function storeData() {
  return localStorage["GPSCompass"] = JSON.stringify(places);
};

fetchData = function fetchData() {
  var data;
  data = localStorage["GPSCompass"];
  if (data) {
    return places = JSON.parse(data);
  }
};

hideCanvas = function hideCanvas() {
  var elem;
  elem = document.getElementById('myContainer');
  return elem.style.display = 'none';
};

showCanvas = function showCanvas() {
  var elem;
  elem = document.getElementById('myContainer');
  return elem.style.display = 'block';
};

//###############################
setupCompass = function setupCompass() {
  return window.addEventListener("deviceorientation", function (event) {
    bearing = event.alpha;
    if (typeof event.webkitCompassHeading !== "undefined") {
      return bearing = event.webkitCompassHeading; // iOS non-standard
    }
  });
};

locationUpdate = function locationUpdate(position) {
  var speed, totalTime;
  //print 'locationUpdate', position
  p1 = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    timestamp: position.timestamp // milliseconds since 1970
  };
  track.push(p1);
  heading_12 = calcHeading(p1, place);
  lastObservation = millis();
  texts[0] = prettyDist(distance_on_geoid(p1, place));
  texts[1] = Math.round(heading_12) + '\xB0';
  texts[6] = track.length;
  if (track.length > 1) {
    speed = calcSpeed(start, millis(), track[0], _.last(track), place);
    totalTime = calcTotalTime(start, millis(), track[0], _.last(track), place);
    texts[3] = precisionRound(3.6 * speed, 1) + ' km/h';
    return texts[2] = prettyETA(startDate, totalTime);
  }
};

locationUpdateFail = function locationUpdateFail(error) {};

navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
});

//#########################
mousePressed = function mousePressed() {
  return normal = 1 - normal;
};

setup = function setup() {
  var c, parameters;
  WHITE = color(255, 255, 255);
  GREEN = color(0, 255, 0);
  BLACK = color(0, 0, 0);
  RED = color(255, 0, 0);
  test();
  fetchData();
  parameters = getParameters();
  if (_.size(parameters) === 3) {
    console.log(parameters);
    places.push(parameters);
    storeData();
  }
  start = millis();
  c = createCanvas(windowWidth, windowHeight * 0.90); // 4s
  w = width;
  h = height;
  c.parent('myContainer');
  hideCanvas();
  setupCompass();
  pages.List = new Page(function () {
    var _this = this;

    var i, j, len, p, results;
    results = [];
    for (i = j = 0, len = places.length; j < len; i = ++j) {
      p = places[i];
      results.push(function (i) {
        var b;
        b = makeButton(p.name, 1, function () {
          place = places[i];
          return pages.Nav.display();
        });
        b.style.textAlign = 'left';
        return _this.addRow(b);
      }(i));
    }
    return results;
  });
  pages.List.addAction('Add', function () {
    return pages.Add.display();
  });
  pages.Nav = new Page(function () {
    texts[9] = place.name;
    start = millis();
    startDate = new Date();
    track = [];
    lastObservation = millis();
    return showCanvas();
  });
  pages.Nav.addAction('List', function () {
    return pages.List.display();
  });
  pages.Nav.addAction('Map', function () {
    return window.open('http://maps.google.com/maps?q=' + place.lat + ',' + place.lng);
  });
  pages.Nav.addAction('Edit', function () {
    return pages.Edit.display();
  });
  pages.Nav.addAction('Del', function () {
    return pages.Del.display();
  });
  pages.Nav.addAction('Link', function () {
    return pages.Link.display();
  });
  pages.Edit = new Page(function () {
    oldName = place.name;
    this.addRow(makeInput('name', place.name));
    this.addRow(makeInput('lat', place.lat));
    this.addRow(makeInput('lng', place.lng));
    document.getElementById("name").focus();
    return document.getElementById("name").select();
  });
  pages.Edit.addAction('Update', function () {
    var j, lat, len, lng, name, p;
    name = getField("name");
    lat = parseFloat(getField("lat"));
    lng = parseFloat(getField("lng"));
    if (isNumeric(lat) && isNumeric(lng)) {
      if (oldName === name) {
        // finns namnet redan?
        for (j = 0, len = places.length; j < len; j++) {
          p = places[j];
          if (oldName === p.name) {
            p.lat = lat;
            p.lng = lng;
          }
        }
      } else {
        places = places.filter(function (e) {
          return e.name !== oldName;
        });
        places.push({
          name: name,
          lat: lat,
          lng: lng
        });
        places.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
      }
      storeData();
      return pages.List.display();
    }
  });
  pages.Edit.addAction('Cancel', function () {
    return pages.List.display();
  });
  pages.Add = new Page(function () {
    var last;
    if (track.length > 0) {
      last = _.last(track);
      print(last);
      this.addRow(makeInput('name', prettyDate(new Date(last.timestamp))));
      this.addRow(makeInput('lat', precisionRound(last.lat, 6)));
      this.addRow(makeInput('lng', precisionRound(last.lng, 6)));
    } else {
      this.addRow(makeInput('name', 'Missing'));
      this.addRow(makeInput('lat', 0));
      this.addRow(makeInput('lng', 0));
    }
    document.getElementById("name").focus();
    return document.getElementById("name").select();
  });
  pages.Add.addAction('Save', function () {
    var lat, lng, name;
    name = getField("name");
    lat = parseFloat(getField("lat"));
    lng = parseFloat(getField("lng"));
    if (isNumeric(lat) && isNumeric(lng)) {
      places.push({
        name: name,
        lat: lat,
        lng: lng
      });
      places.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
      storeData();
      return pages.List.display();
    }
  });
  pages.Add.addAction('Cancel', function () {
    return pages.List.display();
  });
  pages.Del = new Page(function () {
    this.addRow(makeInput('name', place.name, true));
    this.addRow(makeInput('lat', place.lat, true));
    return this.addRow(makeInput('lng', place.lng, true));
  });
  pages.Del.addAction('Delete', function () {
    places = places.filter(function (e) {
      return e.name !== place.name;
    });
    storeData();
    return pages.List.display();
  });
  pages.Del.addAction('Cancel', function () {
    return pages.Nav.display();
  });
  pages.Link = new Page(function () {
    this.addRow(makeInput('link', encodeURI(LINK + '?name=' + place.name + '&lat=' + place.lat + '&lng=' + place.lng, true)));
    this.addRow(makeDiv('The Link is now on the Clipboard. Mail it to a friend.'));
    document.getElementById("link").focus();
    document.getElementById("link").select();
    return document.execCommand('copy');
  });
  pages.Link.addAction('Ok', function () {
    return pages.Nav.display();
  });
  // startsida:
  return pages.List.display();
};
//# sourceMappingURL=sketch.js.map
