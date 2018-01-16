'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Page, draw, oldName, pages, place, placeIndex, places, setup;

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

pages = {};

placeIndex = 0;

place = places[placeIndex];

oldName = null;

Page = function () {
  function Page(actions, elements) {
    _classCallCheck(this, Page);

    // @actions visas på samma rad
    this.actions = actions;
    this.elements = elements;
    this.actions = this.actions.split(' ');
    this.elements = this.elements.split(' ');
    this.table = document.getElementById("table");
  }

  _createClass(Page, [{
    key: 'display',
    value: function display() {
      var action, div, elem, element, j, k, len, len1, ref, ref1, results;
      elem = document.getElementById('myTitle');
      elem.innerHTML = "";
      div = document.createElement("span");
      ref = this.actions;
      for (j = 0, len = ref.length; j < len; j++) {
        action = ref[j];
        div.appendChild(this.makeAction(action, this.actions.length));
      }
      elem.appendChild(div);
      hideCanvas();
      // rensa body
      this.table.innerHTML = "";
      ref1 = this.elements;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        element = ref1[k];
        results.push(this.makeElement(element));
      }
      return results;
    }
  }, {
    key: 'addRow',
    value: function addRow(b) {
      var tr;
      tr = document.createElement("tr");
      addCell(tr, b);
      return this.table.appendChild(tr);
    }
  }, {
    key: 'makeAction',
    value: function makeAction(action, n) {
      // After Add
      if (action === 'save') {
        return makeButton('Save', n, function () {
          var lat, lng, name;
          name = getField("name");
          lat = getField("lat");
          lng = getField("lng");
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
          return pages.List.display();
        });
      }
      if (action === 'listbutton') {
        return makeButton('List', n, 'center', function () {
          return pages.List.display();
        });
      }
      if (action === 'map') {
        return makeButton('Map', n, 'center', function () {
          return window.open('http://maps.google.com/maps?q=' + place.lat + ',' + place.lng);
        });
      }
      if (action === 'update') {
        return makeButton('Update', n, 'center', function () {
          // After Edit 
          var j, lat, len, lng, name, p;
          name = getField("name");
          lat = getField("lat");
          lng = getField("lng");
          // finns namnet redan?
          if (oldName === name) {
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
          return pages.List.display();
        });
      }
      if (action === 'del') {
        return makeButton('Del', n, 'center', function () {
          places = places.filter(function (e) {
            return e.name !== place.name;
          });
          return pages.List.display();
        });
      }
      if (action === 'cancel') {
        return makeButton('Cancel', n, 'center', function () {
          return pages.Nav.display();
        });
      }
      if (action === 'add') {
        return makeButton('Add', n, 'center', function () {
          return pages.Add.display();
        });
      }
      if (action === 'edit') {
        return makeButton('Edit', n, 'center', function () {
          return pages.Edit.display();
        });
      }
    }
  }, {
    key: 'makeElement',
    value: function makeElement(element) {
      var _this = this;

      var fn, i, j, len, p;
      if (element === 'canvas') {
        showCanvas();
      }
      if (element === 'list') {
        fn = function fn(i) {
          return _this.addRow(makeButton(p.name, 1, 'left', function () {
            placeIndex = i;
            place = places[i];
            return pages.Nav.display();
          }));
        };
        for (i = j = 0, len = places.length; j < len; i = ++j) {
          p = places[i];
          fn(i);
        }
      }
      if (element === 'formedit') {
        oldName = place.name;
        this.addRow(makeInput('name', place.name));
        this.addRow(makeInput('lat', place.lat));
        this.addRow(makeInput('lng', place.lng));
      }
      if (element === 'formadd') {
        this.addRow(makeInput('name', '2018-01-15 12:34:56'));
        this.addRow(makeInput('lat', '59.123456'));
        return this.addRow(makeInput('lng', '18.123456'));
      }
    }
  }]);

  return Page;
}();

setup = function setup() {
  var c;
  c = createCanvas(windowWidth, windowHeight);
  c.parent('myContainer');
  hideCanvas();
  pages.List = new Page('add', 'list');
  pages.Nav = new Page('listbutton map add edit del', 'canvas');
  pages.Edit = new Page('update cancel', 'formedit');
  pages.Add = new Page('save cancel', 'formadd');
  return pages.List.display();
};

draw = function draw() {
  bg(0.5);
  return text(place.name, 100, 100);
};
//# sourceMappingURL=sketch.js.map
