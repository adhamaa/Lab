// Generated by CoffeeScript 1.12.7
var diameter, grid, level, mousePressed, newGame, newPoint, setup, x, y;

x = y = -99;

level = 0;

diameter = 20;

setup = function() {
  createCanvas(201, 201);
  return newGame(0);
};

grid = function() {
  var i, j, len, ref, results;
  sc(1);
  sw(1);
  ref = range(0, 201, 20);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    line(i, 0, i, 200);
    results.push(line(0, i, 200, i));
  }
  return results;
};

newPoint = function(d) {
  diameter = d;
  x = random(201);
  y = random(201);
  x = int(x / d) * d;
  return y = int(y / d) * d;
};

newGame = function(dlevel) {
  bg(0);
  textAlign(CENTER, CENTER);
  textSize(150);
  if (dlevel >= 0) {
    fc(0, 0.5, 0);
  }
  if (dlevel === -1) {
    fc(1, 0.5, 0);
  }
  level += dlevel;
  sc();
  text(level, 100, 100);
  grid();
  sw(1);
  sc(1, 1, 0);
  fc();
  circle(x, y, diameter / 2);
  sw(1);
  point(x, y);
  sc(1, 0, 0);
  sw(2);
  point(mouseX, mouseY);
  newPoint(20);
  if (level > 10) {
    newPoint(10);
  }
  if (level > 20) {
    newPoint(8);
  }
  if (level > 30) {
    newPoint(6);
  }
  if (level > 40) {
    newPoint(4);
  }
  textSize(12);
  textAlign(CENTER, CENTER);
  fc(1, 1, 0);
  sc();
  text('x', 170, 10);
  text(x, 190, 10);
  text('y', 10, 190);
  return text(y, 30, 190);
};

mousePressed = function() {
  if (diameter / 2 > dist(x, y, mouseX, mouseY)) {
    return newGame(1);
  } else if (level > 0) {
    return newGame(-1);
  } else {
    return newGame(0);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsQ0FBQSxHQUFFLENBQUEsR0FBRSxDQUFDOztBQUNMLEtBQUEsR0FBUTs7QUFDUixRQUFBLEdBQVc7O0FBRVgsS0FBQSxHQUFRLFNBQUE7RUFDUCxZQUFBLENBQWEsR0FBYixFQUFpQixHQUFqQjtTQUNBLE9BQUEsQ0FBUSxDQUFSO0FBRk87O0FBSVIsSUFBQSxHQUFPLFNBQUE7QUFDTixNQUFBO0VBQUEsRUFBQSxDQUFHLENBQUg7RUFDQSxFQUFBLENBQUcsQ0FBSDtBQUNBO0FBQUE7T0FBQSxxQ0FBQTs7SUFDQyxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsR0FBWDtpQkFDQSxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxHQUFULEVBQWEsQ0FBYjtBQUZEOztBQUhNOztBQU9QLFFBQUEsR0FBVyxTQUFDLENBQUQ7RUFDVixRQUFBLEdBQVc7RUFDWCxDQUFBLEdBQUksTUFBQSxDQUFPLEdBQVA7RUFDSixDQUFBLEdBQUksTUFBQSxDQUFPLEdBQVA7RUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLENBQUEsR0FBRSxDQUFOLENBQUEsR0FBUztTQUNiLENBQUEsR0FBSSxHQUFBLENBQUksQ0FBQSxHQUFFLENBQU4sQ0FBQSxHQUFTO0FBTEg7O0FBT1gsT0FBQSxHQUFVLFNBQUMsTUFBRDtFQUNULEVBQUEsQ0FBRyxDQUFIO0VBQ0EsU0FBQSxDQUFVLE1BQVYsRUFBaUIsTUFBakI7RUFDQSxRQUFBLENBQVMsR0FBVDtFQUNBLElBQUcsTUFBQSxJQUFTLENBQVo7SUFBbUIsRUFBQSxDQUFHLENBQUgsRUFBSyxHQUFMLEVBQVMsQ0FBVCxFQUFuQjs7RUFDQSxJQUFHLE1BQUEsS0FBUSxDQUFDLENBQVo7SUFBbUIsRUFBQSxDQUFHLENBQUgsRUFBSyxHQUFMLEVBQVMsQ0FBVCxFQUFuQjs7RUFDQSxLQUFBLElBQVM7RUFDVCxFQUFBLENBQUE7RUFDQSxJQUFBLENBQUssS0FBTCxFQUFXLEdBQVgsRUFBZSxHQUFmO0VBQ0EsSUFBQSxDQUFBO0VBRUEsRUFBQSxDQUFHLENBQUg7RUFDQSxFQUFBLENBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQO0VBQ0EsRUFBQSxDQUFBO0VBQ0EsTUFBQSxDQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsUUFBQSxHQUFTLENBQXBCO0VBQ0EsRUFBQSxDQUFHLENBQUg7RUFDQSxLQUFBLENBQU0sQ0FBTixFQUFRLENBQVI7RUFFQSxFQUFBLENBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQO0VBQ0EsRUFBQSxDQUFHLENBQUg7RUFDQSxLQUFBLENBQU0sTUFBTixFQUFhLE1BQWI7RUFFQSxRQUFBLENBQVMsRUFBVDtFQUNBLElBQUcsS0FBQSxHQUFRLEVBQVg7SUFBbUIsUUFBQSxDQUFTLEVBQVQsRUFBbkI7O0VBQ0EsSUFBRyxLQUFBLEdBQVEsRUFBWDtJQUFtQixRQUFBLENBQVMsQ0FBVCxFQUFuQjs7RUFDQSxJQUFHLEtBQUEsR0FBUSxFQUFYO0lBQW1CLFFBQUEsQ0FBUyxDQUFULEVBQW5COztFQUNBLElBQUcsS0FBQSxHQUFRLEVBQVg7SUFBbUIsUUFBQSxDQUFTLENBQVQsRUFBbkI7O0VBRUEsUUFBQSxDQUFTLEVBQVQ7RUFDQSxTQUFBLENBQVUsTUFBVixFQUFpQixNQUFqQjtFQUNBLEVBQUEsQ0FBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVA7RUFDQSxFQUFBLENBQUE7RUFDQSxJQUFBLENBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxFQUFiO0VBQ0EsSUFBQSxDQUFLLENBQUwsRUFBTyxHQUFQLEVBQVcsRUFBWDtFQUNBLElBQUEsQ0FBSyxHQUFMLEVBQVMsRUFBVCxFQUFZLEdBQVo7U0FDQSxJQUFBLENBQUssQ0FBTCxFQUFPLEVBQVAsRUFBVSxHQUFWO0FBbkNTOztBQXFDVixZQUFBLEdBQWUsU0FBQTtFQUNkLElBQUcsUUFBQSxHQUFTLENBQVQsR0FBYSxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxNQUFULEVBQWdCLE1BQWhCLENBQWhCO1dBQ0MsT0FBQSxDQUFRLENBQVIsRUFERDtHQUFBLE1BRUssSUFBRyxLQUFBLEdBQU0sQ0FBVDtXQUNKLE9BQUEsQ0FBUSxDQUFDLENBQVQsRUFESTtHQUFBLE1BQUE7V0FFQSxPQUFBLENBQVEsQ0FBUixFQUZBOztBQUhTIiwic291cmNlc0NvbnRlbnQiOlsieD15PS05OVxyXG5sZXZlbCA9IDBcclxuZGlhbWV0ZXIgPSAyMFxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyAyMDEsMjAxXHJcblx0bmV3R2FtZSAwXHJcblxyXG5ncmlkID0gLT5cclxuXHRzYyAxXHJcblx0c3cgMVxyXG5cdGZvciBpIGluIHJhbmdlIDAsMjAxLDIwXHJcblx0XHRsaW5lIGksMCxpLDIwMFxyXG5cdFx0bGluZSAwLGksMjAwLGlcclxuXHJcbm5ld1BvaW50ID0gKGQpIC0+XHJcblx0ZGlhbWV0ZXIgPSBkXHJcblx0eCA9IHJhbmRvbSAyMDFcclxuXHR5ID0gcmFuZG9tIDIwMVxyXG5cdHggPSBpbnQoeC9kKSpkXHJcblx0eSA9IGludCh5L2QpKmRcclxuXHJcbm5ld0dhbWUgPSAoZGxldmVsKSAtPlxyXG5cdGJnIDBcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHRleHRTaXplIDE1MFxyXG5cdGlmIGRsZXZlbD49IDAgdGhlbiBmYyAwLDAuNSwwXHJcblx0aWYgZGxldmVsPT0tMSB0aGVuIGZjIDEsMC41LDBcclxuXHRsZXZlbCArPSBkbGV2ZWxcclxuXHRzYygpXHJcblx0dGV4dCBsZXZlbCwxMDAsMTAwXHJcblx0Z3JpZCgpXHJcblx0XHJcblx0c3cgMVxyXG5cdHNjIDEsMSwwXHJcblx0ZmMoKVxyXG5cdGNpcmNsZSB4LHksZGlhbWV0ZXIvMlxyXG5cdHN3IDFcclxuXHRwb2ludCB4LHlcclxuXHJcblx0c2MgMSwwLDBcclxuXHRzdyAyXHJcblx0cG9pbnQgbW91c2VYLG1vdXNlWVxyXG5cclxuXHRuZXdQb2ludCAyMFxyXG5cdGlmIGxldmVsID4gMTAgdGhlbiBuZXdQb2ludCAxMFxyXG5cdGlmIGxldmVsID4gMjAgdGhlbiBuZXdQb2ludCA4XHJcblx0aWYgbGV2ZWwgPiAzMCB0aGVuIG5ld1BvaW50IDZcclxuXHRpZiBsZXZlbCA+IDQwIHRoZW4gbmV3UG9pbnQgNFxyXG5cclxuXHR0ZXh0U2l6ZSAxMlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0ZmMgMSwxLDBcclxuXHRzYygpXHJcblx0dGV4dCAneCcsMTcwLDEwXHJcblx0dGV4dCB4LDE5MCwxMFxyXG5cdHRleHQgJ3knLDEwLDE5MFxyXG5cdHRleHQgeSwzMCwxOTBcclxuXHJcbm1vdXNlUHJlc3NlZCA9IC0+IFxyXG5cdGlmIGRpYW1ldGVyLzIgPiBkaXN0IHgseSxtb3VzZVgsbW91c2VZXHJcblx0XHRuZXdHYW1lIDFcclxuXHRlbHNlIGlmIGxldmVsPjBcclxuXHRcdG5ld0dhbWUgLTFcclxuXHRlbHNlIG5ld0dhbWUgMFxyXG4iXX0=
//# sourceURL=C:\Lab\2017\131-CoordTrainer\coffee\sketch.coffee