'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
//####################### Solution 1: use temporary variables
var Calculator, calculator, p, q1, q2, q3, q4, q5, q6, q7, q8, q9, r1, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r2, r3, r4, r5, r6, r7, r8, r9;

assert(30, 10 + 20);

assert(15, 30 * 30 / (30 + 30));

q1 = 10;

q2 = 4.7;

q3 = 8.9;

q4 = 0.5;

q5 = 10;

q6 = q1 + q2;

q7 = q6 * q3 / (q6 + q3);

q8 = q4 + q5;

q9 = q8 + q7;

assert(16.04364406779661, q9);

r1 = 6;

r2 = 8;

r3 = 4;

r4 = 8;

r5 = 4;

r6 = 6;

r7 = 8;

r8 = 10;

r9 = 6;

r10 = 2;

r11 = r8 + r10;

r12 = r9 * r11 / (r9 + r11);

r13 = r12 + r7;

r14 = r6 * r13 / (r6 + r13);

r15 = r14 + r5;

r16 = r4 * r15 / (r4 + r15);

r17 = r3 + r16;

r18 = r2 * r17 / (r2 + r17);

r19 = r1 + r18;

assert(10, r19);

//####################### Solution 2: introduce a function
p = function p(x, y) {
  return x * y / (x + y);
};

assert(30, 10 + 20);

assert(15, p(30, 30));

assert(16.04364406779661, p(q1 + q2, q3) + q4 + q5);

assert(10, r1 + p(r2, r3 + p(r4, r5 + p(r6, r7 + p(r8 + r10, r9)))));

//####################### Solution 3: use RPN, Reverse Polish Notation
Calculator = function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    this.stack = [];
  }

  _createClass(Calculator, [{
    key: 'p',
    value: function p() {
      var x, y;
      x = this.stack.pop();
      y = this.stack.pop();
      return this.stack.push(x * y / (x + y));
    }
  }, {
    key: 'calc',
    value: function calc(opers) {
      var i, len, oper, ref;
      ref = opers.split(' ');
      for (i = 0, len = ref.length; i < len; i++) {
        oper = ref[i];
        switch (oper) {
          case '+':
            this.stack.push(this.stack.pop() + this.stack.pop());
            break;
          case 'p':
            this.p();
            break;
          default:
            this.stack.push(parseFloat(oper));
        }
      }
      return this.stack.pop();
    }
  }]);

  return Calculator;
}();

calculator = new Calculator();

assert(30, calculator.calc('10 20 +'));

assert(15, calculator.calc('30 30 p'));

assert(16.04364406779661, calculator.calc('10 4.7 + 8.9 p 0.5 + 10 +'));

assert(10, calculator.calc('10 2 + 6 p 8 + 6 p 4 + 8 p 4 + 8 p 6 +'));
//# sourceMappingURL=sketch.js.map
