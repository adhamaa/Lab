'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Generated by CoffeeScript 2.3.2
var UtskriftPage;

UtskriftPage = function (_Page) {
  _inherits(UtskriftPage, _Page);

  function UtskriftPage(x, y, w, h) {
    _classCallCheck(this, UtskriftPage);

    var _this = _possibleConstructorReturn(this, (UtskriftPage.__proto__ || Object.getPrototypeOf(UtskriftPage)).call(this, x, y, w, h));

    _this.selected = null;
    _this.buttons = [];
    _this.addButton(new Button('Utskrift', 0.02 * width, 0.6 * height, 0.12 * w, 0.06 * h, function () {
      return window.print();
    }));
    _this.addButton(new Button('Fortsätt', 0.02 * width, 0.7 * height, 0.12 * w, 0.06 * h, function () {
      var myNode;
      myNode = document.getElementById("qrcode");
      myNode.innerHTML = '';
      pageStack.pop();
      return pages.rlk.createSelectButtons();
    }));
    _this.addButton(new Button('Slump', 0.02 * width, 0.8 * height, 0.12 * w, 0.06 * h, function () {
      var myNode;
      myNode = document.getElementById("qrcode");
      myNode.innerHTML = '';
      pageStack.pop();
      pages.rlk.slumpa();
      return pages.rlk.createSelectButtons();
    }));
    return _this;
  }

  _createClass(UtskriftPage, [{
    key: 'stopMeasuringTime',
    value: function stopMeasuringTime() {
      this.crc = this.getCRC(pages.rlk.qr);
      return this.cpu = new Date().getTime() - pages.rlk.start;
    }
  }, {
    key: 'getCRC',
    value: function getCRC(qr) {
      var char, i, index, k, len, res;
      res = 0;
      for (i = k = 0, len = qr.length; k < len; i = ++k) {
        char = qr[i];
        index = '0123456789'.indexOf(char);
        res += (i + 1) * (index + 1);
        res %= 1000000;
      }
      return res;
    }
  }, {
    key: 'render',
    value: function render() {
      var h, i, j, k, knr, l, len, len1, myNode, pair, partikod, partinamn, personnamn, ref, ref1, rlk, w, y;
      myNode = document.getElementById('qrcode');
      myNode.style.position = 'absolute';
      myNode.style.left = int(0.02 * width) + 'px';
      myNode.style.top = int(0.02 * height) + 'px';
      textAlign(LEFT, CENTER);
      this.bg(1);
      fc(0);
      text('crc: ' + this.getCRC(pages.rlk.qr.slice(10)) + ' ' + ('tid: ' + this.cpu), 0.02 * width, 0.95 * height);
      push();
      sc();
      w = width;
      h = height;
      ref = 'RLK';
      for (i = k = 0, len = ref.length; k < len; i = ++k) {
        rlk = ref[i];
        ref1 = pages.rlk.selectedPersons[rlk];
        for (j = l = 0, len1 = ref1.length; l < len1; j = ++l) {
          pair = ref1[j];
          var _pair = pair;

          var _pair2 = _slicedToArray(_pair, 2);

          partikod = _pair2[0];
          knr = _pair2[1];

          partinamn = dbPartier[rlk][partikod][PARTI_BETECKNING];
          if (knr === 0) {
            personnamn = '';
          } else {
            personnamn = dbPersoner[rlk][knr][PERSON_NAMN];
          }
          y = [0, 0.3 * h, 0.6 * h][i] + 0.04 * h + 0.05 * h * j;
          if (j === 0) {
            textSize(0.028 * h);
            text(dbName[rlk], 0.31 * width, y);
          }
          textSize(0.020 * h);
          text(j + 1 + '  ' + partinamn + ' - ' + personnamn, 0.3 * w, y + 0.05 * h);
        }
      }
      pop();
      return pages.rlk.sbuttons = [];
    }
  }]);

  return UtskriftPage;
}(Page);
//# sourceMappingURL=UtskriftPage.js.map
