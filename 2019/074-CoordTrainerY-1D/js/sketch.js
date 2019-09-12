// Generated by CoffeeScript 2.3.2
var SCALE, diameter, grid, level, mousePressed, newGame, newPoint, setup, y;

y = -99;

level = 0;

diameter = 20;

SCALE = 4;

setup = function() {
  createCanvas(201 * SCALE - 2, 201 * SCALE - 2);
  cursor(CROSS);
  return newGame(0);
};

grid = function() {
  var i, j, len, ref, results;
  sc(1);
  sw(0.5);
  fc(0);
  textSize(8);
  ref = range(0, 201, 20);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    rect(0, i, 20, 20);
    results.push(text(i, 10, i));
  }
  return results;
};

newPoint = function(d) {
  diameter = d;
  y = random(201);
  return y = d * round(y / d);
};

newGame = function(dlevel) {
  bg(1);
  scale(SCALE);
  textAlign(CENTER, CENTER);
  textSize(150);
  if (dlevel >= 0) {
    fc(0, 0.5, 0);
  }
  if (dlevel === -1) {
    fc(1, 0.5, 0);
  }
  level += dlevel;
  if (level < 0) {
    level = 0;
  }
  sc();
  text(level, 100.5, 100.5);
  grid();
  newPoint(20);
  if (level >= 10) {
    newPoint(10);
  }
  if (level >= 20) {
    newPoint(8);
  }
  if (level >= 30) {
    newPoint(6);
  }
  if (level >= 40) {
    newPoint(4);
  }
  if (level >= 50) {
    newPoint(3);
  }
  if (level >= 60) {
    newPoint(2);
  }
  textSize(12);
  textAlign(CENTER, CENTER);
  fc(1, 1, 0);
  sc();
  text('y', 10, 170);
  return text(y, 10, 190);
};

mousePressed = function() {
  if (abs(y - mouseY / SCALE) < diameter / 2) {
    return newGame(1);
  } else {
    return newGame(-1);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQTs7QUFBQSxDQUFBLEdBQUksQ0FBQzs7QUFDTCxLQUFBLEdBQVE7O0FBQ1IsUUFBQSxHQUFXOztBQUNYLEtBQUEsR0FBUTs7QUFFUixLQUFBLEdBQVEsUUFBQSxDQUFBLENBQUE7RUFDUCxZQUFBLENBQWEsR0FBQSxHQUFJLEtBQUosR0FBVSxDQUF2QixFQUF5QixHQUFBLEdBQUksS0FBSixHQUFVLENBQW5DO0VBQ0EsTUFBQSxDQUFPLEtBQVA7U0FDQSxPQUFBLENBQVEsQ0FBUjtBQUhPOztBQUtSLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtBQUNOLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO0VBQUEsRUFBQSxDQUFHLENBQUg7RUFDQSxFQUFBLENBQUcsR0FBSDtFQUNBLEVBQUEsQ0FBRyxDQUFIO0VBQ0EsUUFBQSxDQUFTLENBQVQ7QUFDQTtBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxFQUFULEVBQVksRUFBWjtpQkFDQSxJQUFBLENBQUssQ0FBTCxFQUFPLEVBQVAsRUFBVSxDQUFWO0VBRkQsQ0FBQTs7QUFMTTs7QUFTUCxRQUFBLEdBQVcsUUFBQSxDQUFDLENBQUQsQ0FBQTtFQUNWLFFBQUEsR0FBVztFQUNYLENBQUEsR0FBSSxNQUFBLENBQU8sR0FBUDtTQUNKLENBQUEsR0FBSSxDQUFBLEdBQUksS0FBQSxDQUFNLENBQUEsR0FBRSxDQUFSO0FBSEU7O0FBS1gsT0FBQSxHQUFVLFFBQUEsQ0FBQyxNQUFELENBQUE7RUFDVCxFQUFBLENBQUcsQ0FBSDtFQUNBLEtBQUEsQ0FBTSxLQUFOO0VBQ0EsU0FBQSxDQUFVLE1BQVYsRUFBaUIsTUFBakI7RUFDQSxRQUFBLENBQVMsR0FBVDtFQUNBLElBQUcsTUFBQSxJQUFXLENBQWQ7SUFBcUIsRUFBQSxDQUFHLENBQUgsRUFBSyxHQUFMLEVBQVMsQ0FBVCxFQUFyQjs7RUFDQSxJQUFHLE1BQUEsS0FBVSxDQUFDLENBQWQ7SUFBcUIsRUFBQSxDQUFHLENBQUgsRUFBSyxHQUFMLEVBQVMsQ0FBVCxFQUFyQjs7RUFDQSxLQUFBLElBQVM7RUFDVCxJQUFHLEtBQUEsR0FBUSxDQUFYO0lBQWtCLEtBQUEsR0FBUSxFQUExQjs7RUFDQSxFQUFBLENBQUE7RUFDQSxJQUFBLENBQUssS0FBTCxFQUFXLEtBQVgsRUFBaUIsS0FBakI7RUFDQSxJQUFBLENBQUE7RUFFQSxRQUFBLENBQVMsRUFBVDtFQUNBLElBQUcsS0FBQSxJQUFTLEVBQVo7SUFBb0IsUUFBQSxDQUFTLEVBQVQsRUFBcEI7O0VBQ0EsSUFBRyxLQUFBLElBQVMsRUFBWjtJQUFvQixRQUFBLENBQVMsQ0FBVCxFQUFwQjs7RUFDQSxJQUFHLEtBQUEsSUFBUyxFQUFaO0lBQW9CLFFBQUEsQ0FBUyxDQUFULEVBQXBCOztFQUNBLElBQUcsS0FBQSxJQUFTLEVBQVo7SUFBb0IsUUFBQSxDQUFTLENBQVQsRUFBcEI7O0VBQ0EsSUFBRyxLQUFBLElBQVMsRUFBWjtJQUFvQixRQUFBLENBQVMsQ0FBVCxFQUFwQjs7RUFDQSxJQUFHLEtBQUEsSUFBUyxFQUFaO0lBQW9CLFFBQUEsQ0FBUyxDQUFULEVBQXBCOztFQUVBLFFBQUEsQ0FBUyxFQUFUO0VBQ0EsU0FBQSxDQUFVLE1BQVYsRUFBaUIsTUFBakI7RUFDQSxFQUFBLENBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQO0VBQ0EsRUFBQSxDQUFBO0VBQ0EsSUFBQSxDQUFLLEdBQUwsRUFBUyxFQUFULEVBQVksR0FBWjtTQUNBLElBQUEsQ0FBSyxDQUFMLEVBQU8sRUFBUCxFQUFVLEdBQVY7QUExQlM7O0FBNEJWLFlBQUEsR0FBZSxRQUFBLENBQUEsQ0FBQTtFQUFHLElBQUcsR0FBQSxDQUFJLENBQUEsR0FBRSxNQUFBLEdBQU8sS0FBYixDQUFBLEdBQXNCLFFBQUEsR0FBUyxDQUFsQztXQUF5QyxPQUFBLENBQVEsQ0FBUixFQUF6QztHQUFBLE1BQUE7V0FBd0QsT0FBQSxDQUFRLENBQUMsQ0FBVCxFQUF4RDs7QUFBSCIsInNvdXJjZXNDb250ZW50IjpbInkgPSAtOTlcclxubGV2ZWwgPSAwXHJcbmRpYW1ldGVyID0gMjBcclxuU0NBTEUgPSA0XHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIDIwMSpTQ0FMRS0yLDIwMSpTQ0FMRS0yXHJcblx0Y3Vyc29yIENST1NTXHJcblx0bmV3R2FtZSAwXHJcblxyXG5ncmlkID0gLT5cclxuXHRzYyAxXHJcblx0c3cgMC41XHJcblx0ZmMgMFxyXG5cdHRleHRTaXplIDhcclxuXHRmb3IgaSBpbiByYW5nZSAwLDIwMSwyMFxyXG5cdFx0cmVjdCAwLGksMjAsMjBcclxuXHRcdHRleHQgaSwxMCxpXHJcblxyXG5uZXdQb2ludCA9IChkKSAtPlxyXG5cdGRpYW1ldGVyID0gZFxyXG5cdHkgPSByYW5kb20gMjAxXHJcblx0eSA9IGQgKiByb3VuZCB5L2RcclxuXHJcbm5ld0dhbWUgPSAoZGxldmVsKSAtPlxyXG5cdGJnIDFcclxuXHRzY2FsZSBTQ0FMRVxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0dGV4dFNpemUgMTUwXHJcblx0aWYgZGxldmVsID49ICAwIHRoZW4gZmMgMCwwLjUsMFxyXG5cdGlmIGRsZXZlbCA9PSAtMSB0aGVuIGZjIDEsMC41LDBcclxuXHRsZXZlbCArPSBkbGV2ZWxcclxuXHRpZiBsZXZlbCA8IDAgdGhlbiBsZXZlbCA9IDBcclxuXHRzYygpXHJcblx0dGV4dCBsZXZlbCwxMDAuNSwxMDAuNVxyXG5cdGdyaWQoKVxyXG5cdFxyXG5cdG5ld1BvaW50IDIwXHJcblx0aWYgbGV2ZWwgPj0gMTAgdGhlbiBuZXdQb2ludCAxMFxyXG5cdGlmIGxldmVsID49IDIwIHRoZW4gbmV3UG9pbnQgOFxyXG5cdGlmIGxldmVsID49IDMwIHRoZW4gbmV3UG9pbnQgNlxyXG5cdGlmIGxldmVsID49IDQwIHRoZW4gbmV3UG9pbnQgNFxyXG5cdGlmIGxldmVsID49IDUwIHRoZW4gbmV3UG9pbnQgM1xyXG5cdGlmIGxldmVsID49IDYwIHRoZW4gbmV3UG9pbnQgMlxyXG5cclxuXHR0ZXh0U2l6ZSAxMlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0ZmMgMSwxLDBcclxuXHRzYygpXHJcblx0dGV4dCAneScsMTAsMTcwXHJcblx0dGV4dCB5LDEwLDE5MFxyXG5cclxubW91c2VQcmVzc2VkID0gLT4gaWYgYWJzKHktbW91c2VZL1NDQUxFKSA8IGRpYW1ldGVyLzIgdGhlbiBuZXdHYW1lIDEgZWxzZSBuZXdHYW1lIC0xIl19
//# sourceURL=c:\Lab\2019\074-CoordTrainerY-1D\coffee\sketch.coffee