// Generated by CoffeeScript 1.12.7
var draw, lamp, setup, state, stoppljus;

state = [0, 0, 0];

setup = function() {
  return createCanvas(windowWidth, windowHeight);
};

lamp = function(tänd, r, g, b, x, y) {
  if (tänd) {
    fc(r, g, b);
  } else {
    fc(0);
  }
  return circle(x, y, 50);
};

stoppljus = function(index, red, redyellow, green, yellow, period, x) {
  var ref, ref1, ref2, t;
  t = frameCount % period;
  if (t === red) {
    state[index] = 0;
  }
  if (t === redyellow) {
    state[index] = 1;
  }
  if (t === green) {
    state[index] = 2;
  }
  if (t === yellow) {
    state[index] = 3;
  }
  lamp((ref = state[index]) === 0 || ref === 1, 1, 0, 0, x, 100);
  lamp((ref1 = state[index]) === 1 || ref1 === 3, 1, 1, 0, x, 200);
  return lamp((ref2 = state[index]) === 2, 0, 1, 0, x, 300);
};

draw = function() {
  stoppljus(0, 0, 180, 210, 390, 420, 100);
  stoppljus(1, 0, 120, 150, 270, 300, 210);
  return stoppljus(2, 0, 250, 260, 270, 280, 320);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFpdi5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxuYWl2LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7O0FBRVIsS0FBQSxHQUFRLFNBQUE7U0FBRyxZQUFBLENBQWEsV0FBYixFQUF5QixZQUF6QjtBQUFIOztBQUVSLElBQUEsR0FBTyxTQUFDLElBQUQsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYyxDQUFkLEVBQWdCLENBQWhCO0VBQ04sSUFBRyxJQUFIO0lBQWEsRUFBQSxDQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFiO0dBQUEsTUFBQTtJQUEyQixFQUFBLENBQUcsQ0FBSCxFQUEzQjs7U0FDQSxNQUFBLENBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxFQUFYO0FBRk07O0FBSVAsU0FBQSxHQUFZLFNBQUMsS0FBRCxFQUFRLEdBQVIsRUFBWSxTQUFaLEVBQXNCLEtBQXRCLEVBQTRCLE1BQTVCLEVBQW1DLE1BQW5DLEVBQTJDLENBQTNDO0FBQ1gsTUFBQTtFQUFBLENBQUEsR0FBSSxVQUFBLEdBQWE7RUFFakIsSUFBRyxDQUFBLEtBQUcsR0FBTjtJQUFlLEtBQU0sQ0FBQSxLQUFBLENBQU4sR0FBZSxFQUE5Qjs7RUFDQSxJQUFHLENBQUEsS0FBRyxTQUFOO0lBQXFCLEtBQU0sQ0FBQSxLQUFBLENBQU4sR0FBZSxFQUFwQzs7RUFDQSxJQUFHLENBQUEsS0FBRyxLQUFOO0lBQWlCLEtBQU0sQ0FBQSxLQUFBLENBQU4sR0FBZSxFQUFoQzs7RUFDQSxJQUFHLENBQUEsS0FBRyxNQUFOO0lBQWtCLEtBQU0sQ0FBQSxLQUFBLENBQU4sR0FBZSxFQUFqQzs7RUFFQSxJQUFBLFFBQUssS0FBTSxDQUFBLEtBQUEsRUFBTixLQUFpQixDQUFqQixJQUFBLEdBQUEsS0FBbUIsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBcUMsR0FBckM7RUFDQSxJQUFBLFNBQUssS0FBTSxDQUFBLEtBQUEsRUFBTixLQUFpQixDQUFqQixJQUFBLElBQUEsS0FBbUIsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBcUMsR0FBckM7U0FDQSxJQUFBLFNBQUssS0FBTSxDQUFBLEtBQUEsRUFBTixLQUFpQixDQUF0QixFQUE0QixDQUE1QixFQUE4QixDQUE5QixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxFQUFxQyxHQUFyQztBQVZXOztBQVlaLElBQUEsR0FBTyxTQUFBO0VBQ04sU0FBQSxDQUFVLENBQVYsRUFBYSxDQUFiLEVBQWUsR0FBZixFQUFtQixHQUFuQixFQUF1QixHQUF2QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQztFQUNBLFNBQUEsQ0FBVSxDQUFWLEVBQWEsQ0FBYixFQUFlLEdBQWYsRUFBbUIsR0FBbkIsRUFBdUIsR0FBdkIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEM7U0FDQSxTQUFBLENBQVUsQ0FBVixFQUFhLENBQWIsRUFBZSxHQUFmLEVBQW1CLEdBQW5CLEVBQXVCLEdBQXZCLEVBQTJCLEdBQTNCLEVBQWdDLEdBQWhDO0FBSE0iLCJzb3VyY2VzQ29udGVudCI6WyJzdGF0ZSA9IFswLDAsMF1cclxuXHJcbnNldHVwID0gLT4gY3JlYXRlQ2FudmFzIHdpbmRvd1dpZHRoLHdpbmRvd0hlaWdodFxyXG5cclxubGFtcCA9ICh0w6RuZCwgcixnLGIsIHgseSkgLT5cclxuXHRpZiB0w6RuZCB0aGVuIGZjIHIsZyxiIGVsc2UgZmMgMFxyXG5cdGNpcmNsZSB4LHksNTAgICBcclxuXHJcbnN0b3BwbGp1cyA9IChpbmRleCwgcmVkLHJlZHllbGxvdyxncmVlbix5ZWxsb3cscGVyaW9kLCB4KSAtPlxyXG5cdHQgPSBmcmFtZUNvdW50ICUgcGVyaW9kXHJcblxyXG5cdGlmIHQ9PXJlZCB0aGVuIHN0YXRlW2luZGV4XSA9IDBcclxuXHRpZiB0PT1yZWR5ZWxsb3cgdGhlbiBzdGF0ZVtpbmRleF0gPSAxXHJcblx0aWYgdD09Z3JlZW4gdGhlbiBzdGF0ZVtpbmRleF0gPSAyXHJcblx0aWYgdD09eWVsbG93IHRoZW4gc3RhdGVbaW5kZXhdID0gM1xyXG5cclxuXHRsYW1wIHN0YXRlW2luZGV4XSBpbiBbMCwxXSwgMSwwLDAsIHgsMTAwICMgUmVkICAgXHJcblx0bGFtcCBzdGF0ZVtpbmRleF0gaW4gWzEsM10sIDEsMSwwLCB4LDIwMCAjIFllbGxvdyAgIFxyXG5cdGxhbXAgc3RhdGVbaW5kZXhdIGluIFsyXSwgICAwLDEsMCwgeCwzMDAgIyBHcmVlblxyXG5cclxuZHJhdyA9IC0+IFxyXG5cdHN0b3BwbGp1cyAwLCAwLDE4MCwyMTAsMzkwLDQyMCwgMTAwXHJcblx0c3RvcHBsanVzIDEsIDAsMTIwLDE1MCwyNzAsMzAwLCAyMTBcclxuXHRzdG9wcGxqdXMgMiwgMCwyNTAsMjYwLDI3MCwyODAsIDMyMCJdfQ==
//# sourceURL=C:\Lab\2017\019-stoppljus\coffee\naiv.coffee