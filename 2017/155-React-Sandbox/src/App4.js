// Generated by CoffeeScript 2.0.3
/*
eslint-disable import/first
*/
var App, CheckBox, M, N, assert, dist, matrix, print, range, xor;

import React, {
  Component
} from 'react';

import _ from 'lodash';

M = 90;

N = 44;

assert = console.assert;

print = console.log;

range = _.range;

dist = function(dx, dy) {
  return dx * dx + dy * dy;
};

xor = function(a, b) {
  return (a ^ b) === 1;
};

assert(false === xor(false, false));

assert(true === xor(false, true));

assert(true === xor(true, false));

assert(false === xor(true, true));

matrix = function(m, n) {
  return Array.from({
    length: m
  }, () => {
    return new Array(n).fill(false);
  });
};

CheckBox = class CheckBox extends Component {
  render() {
    return <input type="checkbox" checked={this.props.value} />;
  }

};

export default App = class App extends Component {
  constructor() {
    var mat;
    super();
    mat = matrix(M, N);
    this.state = {
      mat: mat,
      x: M / 2,
      y: N / 2,
      vx: 1,
      vy: 2,
      r: 6
    };
  }

  next() {
    var i, j, k, l, len, len1, mat, r, ref, ref1, vx, vy, x, y;
    ({mat, x, y, r, vx, vy} = this.state);
    if (!((r <= x && x <= M - r))) {
      vx = -vx;
    }
    if (!((r <= y && y <= N - r))) {
      vy = -vy;
    }
    x += vx;
    y += vy;
    ref = range(M);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ref1 = range(N);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        j = ref1[l];
        mat[i][j] = dist(x - i, y - j) < r * r;
      }
    }
    return this.setState({mat, x, y, vx, vy});
  }

  render() {
    return <div> {range(N).map((j) => {
      return <div> {range(M).map((i) => {
        return <CheckBox value={this.state.mat[i][j]} />;
      })}
			</div>;
    })}
			<button onClick={() => {
        return this.next();
      }}>click</button>
		</div>;
  }

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwNC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxBcHA0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztBQUFBLElBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUE7O0FBUUEsT0FBTyxLQUFQLEVBQUE7RUFBZ0IsU0FBaEI7Q0FBQSxNQUFBOztBQUNBLE9BQU8sQ0FBUCxNQUFBOztBQUVBLENBQUEsR0FBSTs7QUFDSixDQUFBLEdBQUk7O0FBRUosTUFBQSxHQUFTLE9BQU8sQ0FBQzs7QUFDakIsS0FBQSxHQUFRLE9BQU8sQ0FBQzs7QUFDaEIsS0FBQSxHQUFRLENBQUMsQ0FBQzs7QUFFVixJQUFBLEdBQU8sUUFBQSxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUE7U0FBVyxFQUFBLEdBQUcsRUFBSCxHQUFNLEVBQUEsR0FBRztBQUFwQjs7QUFDUCxHQUFBLEdBQU0sUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUE7U0FBUyxDQUFDLENBQUEsR0FBSSxDQUFMLENBQUEsS0FBVztBQUFwQjs7QUFDTixNQUFBLENBQU8sS0FBQSxLQUFTLEdBQUEsQ0FBSSxLQUFKLEVBQVUsS0FBVixDQUFoQjs7QUFDQSxNQUFBLENBQU8sSUFBQSxLQUFTLEdBQUEsQ0FBSSxLQUFKLEVBQVUsSUFBVixDQUFoQjs7QUFDQSxNQUFBLENBQU8sSUFBQSxLQUFTLEdBQUEsQ0FBSSxJQUFKLEVBQVMsS0FBVCxDQUFoQjs7QUFDQSxNQUFBLENBQU8sS0FBQSxLQUFTLEdBQUEsQ0FBSSxJQUFKLEVBQVMsSUFBVCxDQUFoQjs7QUFFQSxNQUFBLEdBQVMsUUFBQSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7U0FBVSxLQUFLLENBQUMsSUFBTixDQUFXO0lBQUMsTUFBQSxFQUFRO0VBQVQsQ0FBWCxFQUF3QixDQUFBLENBQUEsR0FBQTtXQUFNLElBQUksS0FBSixDQUFVLENBQVYsQ0FBWSxDQUFDLElBQWIsQ0FBa0IsS0FBbEI7RUFBTixDQUF4QjtBQUFWOztBQUVILFdBQU4sTUFBQSxTQUFBLFFBQXVCLFVBQXZCO0VBQ0MsTUFBUyxDQUFBLENBQUE7V0FBSSxDQUFBLE1BQU0sSUFBQSxDQUFPLFdBQVcsT0FBQSxDQUFVLENBQUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFSLENBQWxDO0VBQUo7O0FBRFY7O0FBR0EsT0FBQSxRQUFxQixNQUFOLE1BQUEsSUFBQSxRQUFrQixVQUFsQjtFQUNkLFdBQWMsQ0FBQSxDQUFBO0FBQ2IsUUFBQTtTQUFBLENBQUE7SUFDQSxHQUFBLEdBQU0sTUFBQSxDQUFPLENBQVAsRUFBUyxDQUFUO0lBQ04sSUFBQyxDQUFBLEtBQUQsR0FDQztNQUFBLEdBQUEsRUFBTSxHQUFOO01BQ0EsQ0FBQSxFQUFJLENBQUEsR0FBRSxDQUROO01BRUEsQ0FBQSxFQUFJLENBQUEsR0FBRSxDQUZOO01BR0EsRUFBQSxFQUFLLENBSEw7TUFJQSxFQUFBLEVBQUssQ0FKTDtNQUtBLENBQUEsRUFBSTtJQUxKO0VBSlk7O0VBV2QsSUFBTyxDQUFBLENBQUE7QUFDTixRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQTtJQUFBLENBQUEsQ0FBQyxHQUFELEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsRUFBWCxFQUFjLEVBQWQsQ0FBQSxHQUFvQixJQUFDLENBQUEsS0FBckI7SUFDQSxJQUFHLENBQUksQ0FBQyxDQUFBLENBQUEsSUFBSyxDQUFMLElBQUssQ0FBTCxJQUFVLENBQUEsR0FBRSxDQUFaLENBQUQsQ0FBUDtNQUE0QixFQUFBLEdBQUssQ0FBQyxHQUFsQzs7SUFDQSxJQUFHLENBQUksQ0FBQyxDQUFBLENBQUEsSUFBSyxDQUFMLElBQUssQ0FBTCxJQUFVLENBQUEsR0FBRSxDQUFaLENBQUQsQ0FBUDtNQUE0QixFQUFBLEdBQUssQ0FBQyxHQUFsQzs7SUFDQSxDQUFBLElBQUs7SUFDTCxDQUFBLElBQUs7QUFDTDtJQUFBLEtBQUEscUNBQUE7O0FBQ0M7TUFBQSxLQUFBLHdDQUFBOztRQUNDLEdBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQVAsR0FBWSxJQUFBLENBQUssQ0FBQSxHQUFFLENBQVAsRUFBUyxDQUFBLEdBQUUsQ0FBWCxDQUFBLEdBQWdCLENBQUEsR0FBRTtNQUQvQjtJQUREO1dBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxDQUFDLEdBQUQsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLEVBQVQsRUFBWSxFQUFaLENBQVY7RUFUTTs7RUFXUCxNQUFTLENBQUEsQ0FBQTtXQUNQLENBQUEsR0FBQSxFQUFHLENBQUksS0FBQSxDQUFNLENBQU4sQ0FBUSxDQUFDLEdBQVQsQ0FBYSxDQUFDLENBQUQsQ0FBQSxHQUFBO2FBQ25CLENBQUEsR0FBQSxFQUFHLENBQUksS0FBQSxDQUFNLENBQU4sQ0FBUSxDQUFDLEdBQVQsQ0FBYSxDQUFDLENBQUQsQ0FBQSxHQUFBO2VBQ25CLENBQUEsU0FBUyxLQUFBLENBQU0sQ0FBQyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWYsQ0FBZjtNQURtQixDQUFiLENBQUo7R0FBSCxFQUFBLEdBQUE7SUFEbUIsQ0FBYixDQUFKO0dBTUYsQ0FBQSxPQUFPLE9BQUEsQ0FBVSxDQUFDLENBQUEsQ0FBQSxHQUFBO2VBQU0sSUFBQyxDQUFBLElBQUQsQ0FBQTtNQUFOLENBQUQsQ0FBakIsQ0FBZ0MsS0FBaEMsRUFBQSxNQUFBO0VBTkQsRUFBQSxHQUFBO0VBRE87O0FBdkJLIiwic291cmNlc0NvbnRlbnQiOlsiIyMjXHJcbmVzbGludC1kaXNhYmxlIGltcG9ydC9maXJzdFxyXG4jIyNcclxuXHJcbiMgQ2hlY2tCb3ggTWF0cml4XHJcblxyXG4jIFR5dsOkcnIgcml0YXMgYWxsYSBjaGVja2JveGFyIG9tLiBEZXQgdmFyIGludGUgbWVuaW5nZW4uXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcclxuXHJcbk0gPSA5MFxyXG5OID0gNDRcclxuXHJcbmFzc2VydCA9IGNvbnNvbGUuYXNzZXJ0XHJcbnByaW50ID0gY29uc29sZS5sb2dcclxucmFuZ2UgPSBfLnJhbmdlXHJcblxyXG5kaXN0ID0gKGR4LGR5KSAtPiBkeCpkeCtkeSpkeVxyXG54b3IgPSAoYSxiKSAtPiAoYSBeIGIpID09IDFcclxuYXNzZXJ0IGZhbHNlID09IHhvciBmYWxzZSxmYWxzZVxyXG5hc3NlcnQgdHJ1ZSAgPT0geG9yIGZhbHNlLHRydWVcclxuYXNzZXJ0IHRydWUgID09IHhvciB0cnVlLGZhbHNlXHJcbmFzc2VydCBmYWxzZSA9PSB4b3IgdHJ1ZSx0cnVlXHJcblxyXG5tYXRyaXggPSAobSwgbikgLT4gQXJyYXkuZnJvbSB7bGVuZ3RoOiBtfSwgKCkgPT4gbmV3IEFycmF5KG4pLmZpbGwgZmFsc2VcclxuXHJcbmNsYXNzIENoZWNrQm94IGV4dGVuZHMgQ29tcG9uZW50IFxyXG5cdHJlbmRlciA6IC0+IDxpbnB1dCB0eXBlID0gXCJjaGVja2JveFwiIGNoZWNrZWQgPSB7QHByb3BzLnZhbHVlfSAvPlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IFxyXG5cdGNvbnN0cnVjdG9yIDogLT5cclxuXHRcdHN1cGVyKClcclxuXHRcdG1hdCA9IG1hdHJpeCBNLE5cclxuXHRcdEBzdGF0ZSA9IFxyXG5cdFx0XHRtYXQgOiBtYXRcclxuXHRcdFx0eCA6IE0vMlxyXG5cdFx0XHR5IDogTi8yXHJcblx0XHRcdHZ4IDogMVxyXG5cdFx0XHR2eSA6IDJcclxuXHRcdFx0ciA6IDZcclxuXHJcblx0bmV4dCA6IC0+XHJcblx0XHR7bWF0LHgseSxyLHZ4LHZ5fSA9IEBzdGF0ZVxyXG5cdFx0aWYgbm90IChyIDw9IHggPD0gTS1yKSB0aGVuIHZ4ID0gLXZ4IFxyXG5cdFx0aWYgbm90IChyIDw9IHkgPD0gTi1yKSB0aGVuIHZ5ID0gLXZ5XHJcblx0XHR4ICs9IHZ4XHJcblx0XHR5ICs9IHZ5XHJcblx0XHRmb3IgaSBpbiByYW5nZSBNIFxyXG5cdFx0XHRmb3IgaiBpbiByYW5nZSBOIFxyXG5cdFx0XHRcdG1hdFtpXVtqXSA9IGRpc3QoeC1pLHktaikgPCByKnIgXHJcblx0XHRAc2V0U3RhdGUge21hdCx4LHksdngsdnl9XHJcblxyXG5cdHJlbmRlciA6IC0+XHJcblx0XHQ8ZGl2PiB7IHJhbmdlKE4pLm1hcCAoaikgPT4gIFxyXG5cdFx0XHQ8ZGl2PiB7IHJhbmdlKE0pLm1hcCAoaSkgPT4gXHJcblx0XHRcdFx0PENoZWNrQm94IHZhbHVlPXtAc3RhdGUubWF0W2ldW2pdfS8+XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0fVxyXG5cdFx0XHQ8YnV0dG9uIG9uQ2xpY2sgPSB7KCkgPT4gQG5leHQoKX0+Y2xpY2s8L2J1dHRvbj5cclxuXHRcdDwvZGl2PlxyXG4iXX0=
//# sourceURL=C:\Lab\2017\155-React-Sandbox\coffee\App4.coffee