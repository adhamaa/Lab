'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Button, Dialogue, dialogues;

dialogues = [];

Dialogue = function () {
  function Dialogue(x, y, textSize1) {
    _classCallCheck(this, Dialogue);

    this.x = x;
    this.y = y;
    this.textSize = textSize1;
    this.buttons = [];
    dialogues.push(this);
  }

  _createClass(Dialogue, [{
    key: 'add',
    value: function add(button) {
      button.dlg = this;
      return this.buttons.push(button);
    }
  }, {
    key: 'clock',
    value: function clock(n, r1, r2) {
      var turn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var i, j, len, ref, v;
      ref = range(n);
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        v = i * 360 / n - turn;
        this.add(new Button('', r1 * cos(v), r1 * sin(v), r2, function () {}));
      }
      return this.add(new Button('Back', 0, 0, r2, function () {
        return dialogues.pop();
      }));
    }
  }, {
    key: 'show',
    value: function show() {
      var button, j, len, ref;
      push();
      translate(this.x, this.y);
      textSize(this.textSize);
      ref = this.buttons;
      for (j = 0, len = ref.length; j < len; j++) {
        button = ref[j];
        button.show(this);
      }
      return pop();
    }
  }, {
    key: 'execute',
    value: function execute(mx, my) {
      var button, j, len, ref;
      ref = this.buttons;
      for (j = 0, len = ref.length; j < len; j++) {
        button = ref[j];
        if (button.inside(mx, my, this)) {
          button.execute();
          return true;
        }
      }
      return false;
    }
  }]);

  return Dialogue;
}();

Button = function () {
  function Button(txt, x, y, r) {
    var event = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
      return print(this.txt);
    };

    _classCallCheck(this, Button);

    this.txt = txt;
    this.x = x;
    this.y = y;
    this.r = r;
    this.event = event;
  }

  _createClass(Button, [{
    key: 'info',
    value: function info(txt, event) {
      this.txt = txt;
      this.event = event;
    }
  }, {
    key: 'show',
    value: function show() {
      fill(255, 255, 0, 128);
      stroke(0);
      ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
      push();
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(this.dlg.textSize);
      if ('string' === typeof this.txt) {
        text(this.txt, this.x, this.y);
      } else {
        text(this.txt[0], this.x, this.y - 0.3 * this.r);
        text(this.txt[1], this.x, this.y + 0.3 * this.r);
      }
      return pop();
    }
  }, {
    key: 'inside',
    value: function inside(mx, my) {
      return this.r > dist(mx, my, this.dlg.x + this.x, this.dlg.y + this.y);
    }
  }, {
    key: 'execute',
    value: function execute() {
      return this.event();
    }
  }]);

  return Button;
}();
//# sourceMappingURL=dialogue.js.map
