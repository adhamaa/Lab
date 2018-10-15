"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var B,
    Ratio,
    a,
    b,
    f,
    g,
    _gcd,
    i,
    j,
    k,
    l,
    len,
    len1,
    ref,
    ref1,
    res,
    modulo = function modulo(a, b) {
  return (+a % (b = +b) + b) % b;
};

_gcd = function gcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return _gcd(b, modulo(a, b));
  }
};

assert(2, _gcd(10, 8));

Ratio = function () {
  function Ratio() {
    var a1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var b1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, Ratio);

    var n;
    this.a = a1;
    this.b = b1;
    n = _gcd(this.a, this.b);
    this.a /= n;
    this.b /= n;
  }

  _createClass(Ratio, [{
    key: "mul",
    value: function mul(other) {
      return new Ratio(this.a * other.a, this.b * other.b);
    }
  }, {
    key: "add",
    value: function add(other) {
      return new Ratio(other.b * this.a + other.a * this.b, this.b * other.b);
    }
  }, {
    key: "neg",
    value: function neg() {
      return new Ratio(-this.a, this.b);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.a + "/" + this.b;
    }
  }]);

  return Ratio;
}();

a = new Ratio(10, 20);

b = new Ratio(6, 8);

assert("1/2", "" + a);

assert("3/4", "" + b);

assert("5/4", "" + a.add(b));

assert("3/8", "" + a.mul(b));

assert("-1/2", "" + a.neg(b));

f = function f(x) {
  return new Ratio(-1, 2).mul(new Ratio(2 * x - 1, 2 * x + 1));
};

assert("-1/6", "" + f(1));

assert("-3/10", "" + f(2));

g = function g(x, n) {
  var i, k, len, ref, res;
  res = new Ratio(1, 1);
  ref = range(2 * n - 1);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    res = res.mul(new Ratio(2 * x - i, i + 2));
  }
  return res;
};

assert("2/1", "" + g(2, 1));

assert("3/1", "" + g(3, 1));

assert("5/1", "" + g(3, 2));

assert("4/1", "" + g(4, 1));

assert("14/1", "" + g(4, 2));

assert("28/3", "" + g(4, 3));

B = [new Ratio(0, 1)];

ref = range(1, 12);
for (k = 0, len = ref.length; k < len; k++) {
  i = ref[k];
  res = f(i);
  ref1 = range(1, i);
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    j = ref1[l];
    res = res.add(B[j].mul(g(i, j)));
  }
  B.push(res.neg());
}

assert("0/1", "" + B[0]);

assert("1/6", "" + B[1]);

assert("-1/30", "" + B[2]);

assert("1/42", "" + B[3]);

assert("-1/30", "" + B[4]);

assert("5/66", "" + B[5]);

assert("-691/2730", "" + B[6]);

assert("7/6", "" + B[7]);

assert("-3617/510", "" + B[8]);

assert("43867/798", "" + B[9]);

assert("-174611/330", "" + B[10]);

assert("854513/138", "" + B[11]);

print('Ready!');
//# sourceMappingURL=sketch.js.map
