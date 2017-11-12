// Generated by CoffeeScript 1.12.7
var Stoppljus, draw, lysen, setup;

lysen = [];

setup = function() {
  var i, j, len, ref, results;
  createCanvas(windowWidth, windowHeight);
  bg(0.5);
  ref = range(10);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    results.push(lysen.push(new Stoppljus(60 + 60 * i, 50, 50, [random(500, 1500), random(200, 300), random(500, 1500), random(200, 300)])));
  }
  return results;
};

draw = function() {
  var j, len, lyse, results;
  results = [];
  for (j = 0, len = lysen.length; j < len; j++) {
    lyse = lysen[j];
    results.push(lyse.update());
  }
  return results;
};

Stoppljus = (function() {
  function Stoppljus(x, y1, size, delays) {
    this.x = x;
    this.y = y1;
    this.size = size;
    this.delays = delays;
    this.delay = 0;
    this.state = 0;
  }

  Stoppljus.prototype.one_lamp = function(villkor, r, g, b, y) {
    if (villkor) {
      fc(r, g, b);
    } else {
      fc(0);
    }
    return circle(this.x, this.y + y, this.size / 2);
  };

  Stoppljus.prototype.update = function() {
    if (millis() > this.delay) {
      this.state += 1;
      this.state %= 4;
      this.delay = millis() + this.delays[this.state];
      this.one_lamp(this.state <= 1, 1, 0, 0, 0);
      this.one_lamp(this.state % 2 === 1, 1, 1, 0, this.size);
      return this.one_lamp(this.state === 2, 0, 1, 0, 2 * this.size);
    }
  };

  return Stoppljus;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsS0FBQSxHQUFROztBQUVSLEtBQUEsR0FBUSxTQUFBO0FBQ1AsTUFBQTtFQUFBLFlBQUEsQ0FBYSxXQUFiLEVBQXlCLFlBQXpCO0VBQ0EsRUFBQSxDQUFHLEdBQUg7QUFDQTtBQUFBO09BQUEscUNBQUE7O2lCQUNDLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBSSxTQUFKLENBQWMsRUFBQSxHQUFLLEVBQUEsR0FBRyxDQUF0QixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxDQUFDLE1BQUEsQ0FBTyxHQUFQLEVBQVcsSUFBWCxDQUFELEVBQWtCLE1BQUEsQ0FBTyxHQUFQLEVBQVcsR0FBWCxDQUFsQixFQUFrQyxNQUFBLENBQU8sR0FBUCxFQUFXLElBQVgsQ0FBbEMsRUFBbUQsTUFBQSxDQUFPLEdBQVAsRUFBVyxHQUFYLENBQW5ELENBQWpDLENBQVg7QUFERDs7QUFITzs7QUFNUixJQUFBLEdBQU8sU0FBQTtBQUFHLE1BQUE7QUFBQTtPQUFBLHVDQUFBOztpQkFBQSxJQUFJLENBQUMsTUFBTCxDQUFBO0FBQUE7O0FBQUg7O0FBRUQ7RUFDUyxtQkFBQyxDQUFELEVBQUssRUFBTCxFQUFTLElBQVQsRUFBZ0IsTUFBaEI7SUFBQyxJQUFDLENBQUEsSUFBRDtJQUFJLElBQUMsQ0FBQSxJQUFEO0lBQUksSUFBQyxDQUFBLE9BQUQ7SUFBTyxJQUFDLENBQUEsU0FBRDtJQUM3QixJQUFDLENBQUEsS0FBRCxHQUFTO0lBQ1QsSUFBQyxDQUFBLEtBQUQsR0FBUztFQUZJOztzQkFJZCxRQUFBLEdBQVcsU0FBQyxPQUFELEVBQVUsQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkLEVBQWlCLENBQWpCO0lBQ1YsSUFBRyxPQUFIO01BQWdCLEVBQUEsQ0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBaEI7S0FBQSxNQUFBO01BQThCLEVBQUEsQ0FBRyxDQUFILEVBQTlCOztXQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEsQ0FBUixFQUFXLElBQUMsQ0FBQSxDQUFELEdBQUcsQ0FBZCxFQUFpQixJQUFDLENBQUEsSUFBRCxHQUFNLENBQXZCO0VBRlU7O3NCQUlYLE1BQUEsR0FBUyxTQUFBO0lBQ1IsSUFBRyxNQUFBLENBQUEsQ0FBQSxHQUFXLElBQUMsQ0FBQSxLQUFmO01BQ0MsSUFBQyxDQUFBLEtBQUQsSUFBVTtNQUNWLElBQUMsQ0FBQSxLQUFELElBQVU7TUFDVixJQUFDLENBQUEsS0FBRCxHQUFTLE1BQUEsQ0FBQSxDQUFBLEdBQVcsSUFBQyxDQUFBLE1BQU8sQ0FBQSxJQUFDLENBQUEsS0FBRDtNQUU1QixJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFELElBQVUsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBK0IsQ0FBL0I7TUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFELEdBQU8sQ0FBUCxLQUFVLENBQXBCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQStCLElBQUMsQ0FBQSxJQUFoQzthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLEtBQUQsS0FBVSxDQUFwQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUErQixDQUFBLEdBQUUsSUFBQyxDQUFBLElBQWxDLEVBUEQ7O0VBRFEiLCJzb3VyY2VzQ29udGVudCI6WyJseXNlbiA9IFtdXHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIHdpbmRvd1dpZHRoLHdpbmRvd0hlaWdodFxyXG5cdGJnIDAuNVxyXG5cdGZvciBpIGluIHJhbmdlIDEwXHJcblx0XHRseXNlbi5wdXNoIG5ldyBTdG9wcGxqdXMgNjAgKyA2MCppLCA1MCwgNTAsIFtyYW5kb20oNTAwLDE1MDApLHJhbmRvbSgyMDAsMzAwKSxyYW5kb20oNTAwLDE1MDApLHJhbmRvbSgyMDAsMzAwKV1cclxuXHJcbmRyYXcgPSAtPiBseXNlLnVwZGF0ZSgpIGZvciBseXNlIGluIGx5c2VuXHJcblx0XHRcclxuY2xhc3MgU3RvcHBsanVzXHJcblx0Y29uc3RydWN0b3IgOiAoQHgsIEB5LCBAc2l6ZSwgQGRlbGF5cykgLT5cclxuXHRcdEBkZWxheSA9IDBcclxuXHRcdEBzdGF0ZSA9IDBcclxuXHJcblx0b25lX2xhbXAgOiAodmlsbGtvciwgcixnLGIsIHkpIC0+XHJcblx0XHRpZiB2aWxsa29yIHRoZW4gZmMgcixnLGIgZWxzZSBmYyAwXHJcblx0XHRjaXJjbGUgQHgsIEB5K3ksIEBzaXplLzJcclxuXHJcblx0dXBkYXRlIDogLT5cclxuXHRcdGlmIG1pbGxpcygpID4gQGRlbGF5XHJcblx0XHRcdEBzdGF0ZSArPSAxXHJcblx0XHRcdEBzdGF0ZSAlPSA0XHJcblx0XHRcdEBkZWxheSA9IG1pbGxpcygpICsgQGRlbGF5c1tAc3RhdGVdXHJcblxyXG5cdFx0XHRAb25lX2xhbXAgQHN0YXRlIDw9IDEsIDEsMCwwICwgMCAgICAgICAjIFJlZFxyXG5cdFx0XHRAb25lX2xhbXAgQHN0YXRlJTI9PTEsIDEsMSwwICwgQHNpemUgICAjIFllbGxvd1xyXG5cdFx0XHRAb25lX2xhbXAgQHN0YXRlID09IDIsIDAsMSwwICwgMipAc2l6ZSAjIEdyZWVuIl19
//# sourceURL=C:\Lab\2017\019-stoppljus\coffee\sketch.coffee