// Generated by CoffeeScript 2.0.3
// z = z * z + c  
// todo undo
var BITS, DEPTH, N, N1, SIZE, calc, hist, mousePressed, setup, x0, xdraw, y0, zoom;

hist = [];

x0 = -0.5; // mittpunkten

y0 = 0.0;

SIZE = 100;

zoom = 1 / SIZE;

BITS = 4;

N = Math.pow(2, BITS);

N1 = N - 1;

DEPTH = Math.pow(2, 3 * BITS);

setup = function() {
  createCanvas(2 * SIZE, 2 * SIZE);
  return xdraw();
};

calc = function(cx, cy) {
  var count, k, l, len, ref, x, y;
  [x, y] = [0, 0];
  count = 0;
  ref = range(DEPTH);
  for (l = 0, len = ref.length; l < len; l++) {
    k = ref[l];
    if (dist(x, y, 0, 0) < 2) {
      count += 1;
    } else {
      return count;
    }
    [x, y] = [x * x - y * y + cx, 2 * x * y + cy];
  }
  return count;
};

xdraw = function() {
  var b, cx, cy, f, g, i, j, l, len, r, ref, results;
  ref = range(-SIZE, SIZE);
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    i = ref[l];
    results.push((function() {
      var len1, m, ref1, results1;
      ref1 = range(-SIZE, SIZE);
      results1 = [];
      for (m = 0, len1 = ref1.length; m < len1; m++) {
        j = ref1[m];
        cx = x0 + zoom * i;
        cy = y0 + zoom * j;
        f = calc(cx, cy);
        r = f % N;
        f = int(f / N);
        g = f % N;
        f = int(f / N);
        b = f % N;
        f = int(f / N);
        sc(r / N1, g / N1, b / N1);
        results1.push(point(SIZE + i, SIZE + j));
      }
      return results1;
    })());
  }
  return results;
};

mousePressed = function() {
  print([x0, y0, zoom]);
  hist.push([x0, y0, zoom]);
  x0 = map(mouseX, 0, 2 * SIZE, x0 - zoom * SIZE, x0 + zoom * SIZE);
  y0 = map(mouseY, 0, 2 * SIZE, y0 - zoom * SIZE, y0 + zoom * SIZE);
  zoom = zoom / 2;
  return xdraw();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFlBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLEVBQUE7O0FBRUEsSUFBQSxHQUFPOztBQUVQLEVBQUEsR0FBSyxDQUFDLElBSk47O0FBS0EsRUFBQSxHQUFLOztBQUNMLElBQUEsR0FBTzs7QUFDUCxJQUFBLEdBQU8sQ0FBQSxHQUFFOztBQUNULElBQUEsR0FBTzs7QUFDUCxDQUFBLFlBQUksR0FBRzs7QUFDUCxFQUFBLEdBQUssQ0FBQSxHQUFFOztBQUNQLEtBQUEsWUFBUSxHQUFJLENBQUEsR0FBRTs7QUFFZCxLQUFBLEdBQVEsUUFBQSxDQUFBLENBQUE7RUFDUCxZQUFBLENBQWEsQ0FBQSxHQUFFLElBQWYsRUFBb0IsQ0FBQSxHQUFFLElBQXRCO1NBQ0EsS0FBQSxDQUFBO0FBRk87O0FBSVIsSUFBQSxHQUFPLFFBQUEsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFBO0FBQ04sTUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQTtFQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQSxHQUFRLENBQUMsQ0FBRCxFQUFHLENBQUg7RUFDUixLQUFBLEdBQVE7QUFDUjtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsSUFBRyxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFBLEdBQWdCLENBQW5CO01BQ0MsS0FBQSxJQUFTLEVBRFY7S0FBQSxNQUFBO0FBR0MsYUFBTyxNQUhSOztJQUlBLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQSxHQUFRLENBQUMsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUFBLEdBQUUsQ0FBTixHQUFRLEVBQVQsRUFBYSxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQUosR0FBTSxFQUFuQjtFQUxUO1NBTUE7QUFUTTs7QUFXUCxLQUFBLEdBQVEsUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQTtBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7OztBQUNDO0FBQUE7TUFBQSxLQUFBLHdDQUFBOztRQUNDLEVBQUEsR0FBSyxFQUFBLEdBQUssSUFBQSxHQUFLO1FBQ2YsRUFBQSxHQUFLLEVBQUEsR0FBSyxJQUFBLEdBQUs7UUFDZixDQUFBLEdBQUksSUFBQSxDQUFLLEVBQUwsRUFBUSxFQUFSO1FBQ0osQ0FBQSxHQUFJLENBQUEsR0FBRTtRQUFHLENBQUEsR0FBSSxHQUFBLENBQUksQ0FBQSxHQUFFLENBQU47UUFDYixDQUFBLEdBQUksQ0FBQSxHQUFFO1FBQUcsQ0FBQSxHQUFJLEdBQUEsQ0FBSSxDQUFBLEdBQUUsQ0FBTjtRQUNiLENBQUEsR0FBSSxDQUFBLEdBQUU7UUFBRyxDQUFBLEdBQUksR0FBQSxDQUFJLENBQUEsR0FBRSxDQUFOO1FBQ2IsRUFBQSxDQUFHLENBQUEsR0FBRSxFQUFMLEVBQVEsQ0FBQSxHQUFFLEVBQVYsRUFBYSxDQUFBLEdBQUUsRUFBZjtzQkFDQSxLQUFBLENBQU0sSUFBQSxHQUFLLENBQVgsRUFBYSxJQUFBLEdBQUssQ0FBbEI7TUFSRCxDQUFBOzs7RUFERCxDQUFBOztBQURPOztBQVlSLFlBQUEsR0FBZSxRQUFBLENBQUEsQ0FBQTtFQUNkLEtBQUEsQ0FBTSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sSUFBUCxDQUFOO0VBQ0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sSUFBUCxDQUFWO0VBQ0EsRUFBQSxHQUFLLEdBQUEsQ0FBSSxNQUFKLEVBQVcsQ0FBWCxFQUFhLENBQUEsR0FBRSxJQUFmLEVBQW9CLEVBQUEsR0FBRyxJQUFBLEdBQUssSUFBNUIsRUFBaUMsRUFBQSxHQUFHLElBQUEsR0FBSyxJQUF6QztFQUNMLEVBQUEsR0FBSyxHQUFBLENBQUksTUFBSixFQUFXLENBQVgsRUFBYSxDQUFBLEdBQUUsSUFBZixFQUFvQixFQUFBLEdBQUcsSUFBQSxHQUFLLElBQTVCLEVBQWlDLEVBQUEsR0FBRyxJQUFBLEdBQUssSUFBekM7RUFDTCxJQUFBLEdBQU8sSUFBQSxHQUFLO1NBQ1osS0FBQSxDQUFBO0FBTmMiLCJzb3VyY2VzQ29udGVudCI6WyIjIHogPSB6ICogeiArIGMgIFxyXG4jIHRvZG8gdW5kb1xyXG5oaXN0ID0gW11cclxuXHJcbngwID0gLTAuNSAjIG1pdHRwdW5rdGVuXHJcbnkwID0gMC4wXHJcblNJWkUgPSAxMDBcclxuem9vbSA9IDEvU0laRSBcclxuQklUUyA9IDQgXHJcbk4gPSAyKipCSVRTXHJcbk4xID0gTi0xXHJcbkRFUFRIID0gMioqKDMqQklUUylcclxuXHJcbnNldHVwID0gLT5cclxuXHRjcmVhdGVDYW52YXMgMipTSVpFLDIqU0laRVxyXG5cdHhkcmF3KClcclxuXHJcbmNhbGMgPSAoY3gsY3kpIC0+XHJcblx0W3gseV0gPSBbMCwwXVxyXG5cdGNvdW50ID0gMFxyXG5cdGZvciBrIGluIHJhbmdlIERFUFRIXHJcblx0XHRpZiBkaXN0KHgseSwwLDApIDwgMlxyXG5cdFx0XHRjb3VudCArPSAxXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBjb3VudFxyXG5cdFx0W3gseV0gPSBbeCp4LXkqeStjeCwgMip4KnkrY3ldXHJcblx0Y291bnRcclxuXHJcbnhkcmF3ID0gLT5cclxuXHRmb3IgaSBpbiByYW5nZSAtU0laRSxTSVpFXHJcblx0XHRmb3IgaiBpbiByYW5nZSAtU0laRSxTSVpFXHJcblx0XHRcdGN4ID0geDAgKyB6b29tKmlcclxuXHRcdFx0Y3kgPSB5MCArIHpvb20qalxyXG5cdFx0XHRmID0gY2FsYyhjeCxjeSlcclxuXHRcdFx0ciA9IGYlTjsgZiA9IGludCBmL05cclxuXHRcdFx0ZyA9IGYlTjsgZiA9IGludCBmL05cclxuXHRcdFx0YiA9IGYlTjsgZiA9IGludCBmL05cclxuXHRcdFx0c2Mgci9OMSxnL04xLGIvTjFcclxuXHRcdFx0cG9pbnQgU0laRStpLFNJWkUralxyXG5cclxubW91c2VQcmVzc2VkID0gLT5cclxuXHRwcmludCBbeDAseTAsem9vbV1cclxuXHRoaXN0LnB1c2ggW3gwLHkwLHpvb21dXHJcblx0eDAgPSBtYXAgbW91c2VYLDAsMipTSVpFLHgwLXpvb20qU0laRSx4MCt6b29tKlNJWkVcclxuXHR5MCA9IG1hcCBtb3VzZVksMCwyKlNJWkUseTAtem9vbSpTSVpFLHkwK3pvb20qU0laRVxyXG5cdHpvb20gPSB6b29tLzJcclxuXHR4ZHJhdygpIl19
//# sourceURL=C:\Lab\2017\105-Mandelbrot\coffee\sketch.coffee