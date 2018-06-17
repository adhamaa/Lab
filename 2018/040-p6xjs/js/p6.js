"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Arc,
    Circle,
    Ellipse,
    Group,
    Polygon,
    Quad,
    Rect,
    Regular,
    Shape,
    Triangle,
    Vector,
    p6,
    shapes,
    stage,
    modulo = function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
};

shapes = {};

p6 = {};

Vector = function () {
  function Vector() {
    var x5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    this.x = x5;
    this.y = y5;
    this.rotation = atan2(this.y, this.x);
    this.length = sqrt(this.x * this.x + this.y * this.y);
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
  }, {
    key: "rotate",
    value: function rotate(degrees) {
      var v, x, y;
      v = this.rotation + degrees;
      x = this.length * cos(v);
      y = this.length * sin(v);
      return new Vector(x, y);
    }
  }]);

  return Vector;
}();

Shape = function () {
  function Shape(x5, y5, parent1) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Shape);

    this.x = x5;
    this.y = y5;
    this.parent = parent1;
    this.children = [];
    if (this.parent != null) {
      this.parent.add(this);
    }
    this.rotation = options.rotation != null ? options.rotation : 0;
    this.strokeColor = options.strokeColor != null ? options.strokeColor : "#000";
    this.strokeWeight = options.strokeWeight != null ? options.strokeWeight : 1;
    this.title = options.title != null ? options.title : '';
    this.scaleFactor = options.scaleFactor != null ? options.scaleFactor : 1;
    this.moved = options.moved != null ? options.moved : function () {};
    this.pressed = options.pressed != null ? options.pressed : function () {};
    this.fillColor = options.fillColor != null ? options.fillColor : "#fff";
  }

  _createClass(Shape, [{
    key: "draw",
    value: function draw() {
      var child, k, len, ref, results;
      scale(this.scaleFactor);
      translate(this.x, this.y);
      rotate(this.rotation);
      fill(this.fillColor);
      strokeWeight(this.strokeWeight);
      ref = this.children;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        child = ref[k];
        push();
        child.draw();
        results.push(pop());
      }
      return results;
    }
  }, {
    key: "drawTitle",
    value: function drawTitle() {
      fill('#000');
      textAlign(CENTER, CENTER);
      return text(this.title, 0, 0);
    }
  }, {
    key: "add",
    value: function add(shape) {
      return this.children.push(shape);
    }
  }, {
    key: "contains",
    value: function contains(m) {
      // m is mouse position
      var p, rotation, sf, x, y;

      var _stagepos = this.stagepos();

      var _stagepos2 = _slicedToArray(_stagepos, 4);

      x = _stagepos2[0];
      y = _stagepos2[1];
      rotation = _stagepos2[2];
      sf = _stagepos2[3];

      p = new Vector(x, y);
      p = m.sub(p);
      p = p.rotate(-rotation);
      p.x /= sf;
      p.y /= sf;
      return this.inside(p);
    }
  }, {
    key: "stagepos",
    value: function stagepos() {
      // returns resulting [x, y, rotation, scaleFactor]
      var current, k, lastRotation, len, lst, position, rotation, scaleFactor, sf, v1, v2, x, y;
      lst = [];
      current = this;
      while (current) {
        lst.unshift([current.x, current.y, current.rotation, current.scaleFactor]);
        current = current.parent;
      }
      print('lst', lst);
      position = new Vector(0, 0);
      lastRotation = 0;
      sf = 1;
      for (k = 0, len = lst.length; k < len; k++) {
        var _lst$k = _slicedToArray(lst[k], 4);

        x = _lst$k[0];
        y = _lst$k[1];
        rotation = _lst$k[2];
        scaleFactor = _lst$k[3];

        sf *= scaleFactor;
        v1 = new Vector(sf * x, sf * y);
        v2 = v1.rotate(lastRotation);
        position = position.add(v2);
        lastRotation += rotation;
      }
      return [position.x, position.y, modulo(lastRotation, 360), sf];
    }
  }, {
    key: "mouseMoved",
    value: function mouseMoved() {
      var child, k, len, m, ref, results;
      m = new Vector(mouseX, mouseY);
      ref = this.children;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        child = ref[k];
        if (child.moved != null) {
          child.moved(m);
        }
        results.push(child.mouseMoved());
      }
      return results;
    }
  }, {
    key: "mousePressed",
    value: function mousePressed() {
      var child, k, len, m, ref, results;
      m = new Vector(mouseX, mouseY);
      ref = this.children;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        child = ref[k];
        if (child.contains(m)) {
          print(child.pressed);
          if (child.pressed != null) {
            child.pressed();
          }
        }
        results.push(child.mousePressed());
      }
      return results;
    }
  }, {
    key: "move",
    value: function move(dx, dy) {
      var _ref;

      return _ref = [this.x + dx, this.y + dy], this.x = _ref[0], this.y = _ref[1], _ref;
    }
  }]);

  return Shape;
}();

Group = function (_Shape) {
  _inherits(Group, _Shape);

  function Group(x, y, parent) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Group);

    return _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, x, y, parent, options));
  }

  _createClass(Group, [{
    key: "contains",
    value: function contains() {}
  }]);

  return Group;
}(Shape);

Polygon = function (_Shape2) {
  _inherits(Polygon, _Shape2);

  function Polygon(x, y, parent) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Polygon);

    var _this2 = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, x, y, parent, options));

    _this2.points = [];
    return _this2;
  }

  _createClass(Polygon, [{
    key: "lineTo",
    value: function lineTo(x, y) {
      return this.points.push(new Vector(x, y));
    }
  }, {
    key: "draw",
    value: function draw() {
      var k, len, p, ref;
      _get(Polygon.prototype.__proto__ || Object.getPrototypeOf(Polygon.prototype), "draw", this).call(this);
      beginShape();
      ref = this.points;
      for (k = 0, len = ref.length; k < len; k++) {
        p = ref[k];
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
      return this.drawTitle();
    }
  }, {
    key: "inside",
    value: function inside(p) {
      // only checks if p is locally within polygon
      var i, intersect, j, k, len, lst, res, xi, xj, yi, yj;
      res = false;
      lst = range(this.points.length);
      lst.unshift(lst.pop());
      for (i = k = 0, len = lst.length; k < len; i = ++k) {
        j = lst[i];
        xi = this.points[i].x;
        yi = this.points[i].y;
        xj = this.points[j].x;
        yj = this.points[j].y;
        intersect = yi >= p.y !== yj >= p.y && p.x <= (xj - xi) * (p.y - yi) / (yj - yi) + xi;
        if (intersect) {
          res = !res;
        }
      }
      return res;
    }
  }]);

  return Polygon;
}(Shape);

Circle = function (_Shape3) {
  _inherits(Circle, _Shape3);

  function Circle(x, y, radius1, parent) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, Circle);

    var _this3 = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, x, y, parent, options));

    _this3.radius = radius1;
    return _this3;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      _get(Circle.prototype.__proto__ || Object.getPrototypeOf(Circle.prototype), "draw", this).call(this);
      fill(this.fillColor);
      strokeWeight(this.strokeWeight);
      circle(0, 0, this.radius);
      return this.drawTitle();
    }
  }, {
    key: "inside",
    value: function inside(d) {
      return this.radius >= sqrt(d.x * d.x + d.y * d.y);
    }
  }]);

  return Circle;
}(Shape);

Ellipse = function (_Shape4) {
  _inherits(Ellipse, _Shape4);

  function Ellipse(x, y, w1, h1, parent) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    _classCallCheck(this, Ellipse);

    var _this4 = _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this, x, y, parent, options));

    _this4.w = w1;
    _this4.h = h1;
    return _this4;
  }

  _createClass(Ellipse, [{
    key: "draw",
    value: function draw() {
      _get(Ellipse.prototype.__proto__ || Object.getPrototypeOf(Ellipse.prototype), "draw", this).call(this);
      fill(this.fillColor);
      strokeWeight(this.strokeWeight);
      ellipse(0, 0, this.w, this.h);
      return this.drawTitle();
    }
  }, {
    key: "inside",
    value: function inside(d) {
      var dx, dy, xr, yr;
      xr = this.w / 2;
      yr = this.h / 2;
      dx = d.x / xr;
      dy = d.y / yr;
      return dx * dx + dy * dy < 1;
    }
  }]);

  return Ellipse;
}(Shape);

Arc = function (_Polygon) {
  _inherits(Arc, _Polygon);

  function Arc(x, y, radius, start, stopp, parent) {
    var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

    _classCallCheck(this, Arc);

    var k, len, lst, v;

    var _this5 = _possibleConstructorReturn(this, (Arc.__proto__ || Object.getPrototypeOf(Arc)).call(this, x, y, parent, options));

    _this5.lineTo(0, 0);
    lst = range(start, stopp, 10);
    lst.push(stopp);
    for (k = 0, len = lst.length; k < len; k++) {
      v = lst[k];
      x = radius * cos(v);
      y = radius * sin(v);
      _this5.lineTo(x, y);
    }
    return _this5;
  }

  return Arc;
}(Polygon);

Rect = function (_Polygon2) {
  _inherits(Rect, _Polygon2);

  function Rect(x, y, w, h, parent) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    _classCallCheck(this, Rect);

    var _this6 = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, x, y, parent, options));

    w = w / 2;
    h = h / 2;
    _this6.lineTo(-w, -h);
    _this6.lineTo(+w, -h);
    _this6.lineTo(+w, +h);
    _this6.lineTo(-w, +h);
    return _this6;
  }

  return Rect;
}(Polygon);

Triangle = function (_Polygon3) {
  _inherits(Triangle, _Polygon3);

  function Triangle(x, y, x1, y1, x2, y2, x3, y3, parent) {
    var options = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : {};

    _classCallCheck(this, Triangle);

    var _this7 = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, x, y, parent, options));

    _this7.lineTo(x1, y1);
    _this7.lineTo(x2, y2);
    _this7.lineTo(x3, y3);
    return _this7;
  }

  return Triangle;
}(Polygon);

Quad = function (_Polygon4) {
  _inherits(Quad, _Polygon4);

  function Quad(x, y, x1, y1, x2, y2, x3, y3, x4, y4, parent) {
    var options = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : {};

    _classCallCheck(this, Quad);

    var _this8 = _possibleConstructorReturn(this, (Quad.__proto__ || Object.getPrototypeOf(Quad)).call(this, x, y, parent, options));

    _this8.lineTo(x1, y1);
    _this8.lineTo(x2, y2);
    _this8.lineTo(x3, y3);
    _this8.lineTo(x4, y4);
    return _this8;
  }

  return Quad;
}(Polygon);

Regular = function (_Polygon5) {
  _inherits(Regular, _Polygon5);

  function Regular(x, y, r, n, parent) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    _classCallCheck(this, Regular);

    var dx, dy, i, k, len, ref;

    var _this9 = _possibleConstructorReturn(this, (Regular.__proto__ || Object.getPrototypeOf(Regular)).call(this, x, y, parent, options));

    ref = range(n);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      dx = r * cos(i * 360 / n);
      dy = r * sin(i * 360 / n);
      _this9.lineTo(dx, dy);
    }
    return _this9;
  }

  return Regular;
}(Polygon);

p6.shape = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Shape, [null].concat(args)))();
};

p6.group = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return new (Function.prototype.bind.apply(Group, [null].concat(args)))();
};

p6.polygon = function () {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return new (Function.prototype.bind.apply(Polygon, [null].concat(args)))();
};

p6.circle = function () {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return new (Function.prototype.bind.apply(Circle, [null].concat(args)))();
};

p6.ellipse = function () {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return new (Function.prototype.bind.apply(Ellipse, [null].concat(args)))();
};

p6.arc = function () {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return new (Function.prototype.bind.apply(Arc, [null].concat(args)))();
};

p6.rect = function () {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  return new (Function.prototype.bind.apply(Rect, [null].concat(args)))();
};

p6.triangle = function () {
  for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  return new (Function.prototype.bind.apply(Triangle, [null].concat(args)))();
};

p6.quad = function () {
  for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return new (Function.prototype.bind.apply(Quad, [null].concat(args)))();
};

p6.regular = function () {
  for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return new (Function.prototype.bind.apply(Regular, [null].concat(args)))();
};

stage = new Shape(0, 0, null);
//# sourceMappingURL=p6.js.map
