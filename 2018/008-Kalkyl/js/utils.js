"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Page, addCell, fetchData, getElem, getField, hideCanvas, isNumeric, makeButton, makeDiv, makeInput, makeSpan, makeTextArea, showCanvas, storeAndGoto, storeData;

Page = function () {
  function Page(columns, init) {
    _classCallCheck(this, Page);

    this.columns = columns;
    this.init = init;
    this.table = getElem("table");
    this.actions = [];
  }

  _createClass(Page, [{
    key: "addAction",
    value: function addAction(title, f) {
      return this.actions.push([title, f]);
    }
  }, {
    key: "display",
    value: function display() {
      var _this = this;

      var div, elem, f, fn, i, j, len, ref, title;
      // actions
      if (this.actions.length > 0) {
        if (this.columns === 0) {
          this.columns = this.actions.length;
        }
        if (this.columns === 0) {
          this.columns = 1;
        }
        elem = getElem('myActions');
        elem.innerHTML = "";
        div = null;
        ref = this.actions;
        fn = function fn(f) {
          if (i % _this.columns === 0) {
            div = document.createElement("div");
          }
          div.appendChild(makeButton(title, _this.columns, f));
          if (i % _this.columns === _this.columns - 1) {
            return elem.appendChild(div);
          }
        };
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          var _ref$i = _slicedToArray(ref[i], 2);

          title = _ref$i[0];
          f = _ref$i[1];

          fn(f);
        }
        elem.appendChild(div);
      }
      this.table.innerHTML = "";
      return this.init();
    }
  }, {
    key: "addRow",
    value: function addRow(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var tr;
      tr = document.createElement("tr");
      tr.width = '100%';
      if (b) {
        addCell(tr, a, b);
      } else {
        addCell(tr, a);
      }
      return this.table.appendChild(tr);
    }
  }]);

  return Page;
}();

storeData = function storeData(data) {
  return localStorage[KEY] = JSON.stringify(data);
};

fetchData = function fetchData() {
  return JSON.parse(localStorage[KEY] ? localStorage[KEY] : '""');
};

storeAndGoto = function storeAndGoto(data, page) {
  storeData(data);
  return page.display();
};

isNumeric = function isNumeric(val) {
  return val === Number(parseFloat(val));
};

getElem = function getElem(id) {
  return document.getElementById(id);
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

makeTextArea = function makeTextArea() {
  var b;
  b = document.createElement('textarea');
  //b.cols = 50
  b.style.position = 'fixed';
  b.style.top = '30px';
  b.style.width = 'calc(50vw - 0px)';
  b.style.height = 'calc(100vh - 30px)';
  b.style.resize = 'none';
  //b.style.whitespace = "nowrap"
  b.style.overflow = "visible";
  b.style.overflowScroll = true;
  //b.style.overflowX = "scroll"
  //b.style.overflowY = "scroll"
  b.nowrap = 'nowrap';
  b.wrap = 'off';
  b.rows = 200;
  b.style.fontSize = "100%";
  return b;
};

makeSpan = function makeSpan(value) {
  var b;
  b = document.createElement('span');
  b.innerHTML = value;
  return b;
};

makeDiv = function makeDiv(value) {
  var b;
  b = document.createElement('div');
  b.innerHTML = value;
  return b;
};

makeInput = function makeInput(title) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var readonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var b;
  b = document.createElement('input');
  b.id = title;
  b.value = value;
  b.placeholder = title;
  if (readonly) {
    b.setAttribute("readonly", true);
  }
  if (title === 'name') {
    b.autofocus = true;
  }
  b.onclick = "this.setSelectionRange(0, this.value.length)";
  return b;
};

makeButton = function makeButton(title, n, f) {
  var b;
  b = document.createElement('input');
  if (n === 0) {
    b.style.width = "100%";
    b.style.textAlign = 'left';
  } else {
    b.style.width = Math.floor(100 / n) + "%";
  }
  b.style.fontSize = "100%";
  b.style.fontFamily = 'monospace';
  b.style.webkitAppearance = "none";
  b.style.borderRadius = 0;
  b.style.padding = 0;
  b.type = 'button';
  b.value = title;
  b.onclick = f;
  return b;
};

addCell = function addCell(tr, a) {
  var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var td;
  td = document.createElement("td");
  td.width = '100%';
  td.appendChild(a);
  if (b) {
    td.appendChild(b);
  }
  return tr.appendChild(td);
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
//# sourceMappingURL=utils.js.map
