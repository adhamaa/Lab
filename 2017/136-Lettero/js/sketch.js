// Generated by CoffeeScript 1.12.7
var angle, direction, draw, handleMousePressed, lastWord, level, listCircular, mousePressed, newGame, radius1, radius2, setup, size, touchStarted, word, words,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

words = null;

word = '';

lastWord = '';

level = -1;

angle = 0;

direction = 1;

size = null;

radius1 = null;

radius2 = null;

setup = function() {
  createCanvas(windowWidth, windowHeight);
  size = min(windowWidth, windowHeight);
  radius2 = size / 10;
  radius1 = size / 2 - radius2;
  words = ordlista.split(' ');
  textAlign(CENTER, CENTER);
  return newGame(1);
};

newGame = function(dLevel) {
  var extra;
  direction = dLevel;
  extra = int(level / 10);
  if (dLevel < 0 && extra !== 0) {
    dLevel *= extra;
  }
  level += dLevel;
  if (level < 0) {
    level = 0;
  }
  lastWord = word;
  word = _.sample(words);
  word = word.toUpperCase();
  return angle = 360 * random();
};

draw = function() {
  var ch, dAngle, i, j, len, n;
  bg(0.5);
  textSize(size / 10);
  text(lastWord, width / 2, height - size / 10);
  textSize(size / 4);
  if (direction === 1) {
    fc(0, 1, 0);
  } else {
    fc(1, 0, 0);
  }
  text(level, width / 2, height / 2);
  fc(0);
  translate(width / 2, height / 2);
  n = word.length;
  dAngle = 360 / n;
  rd(angle);
  textSize(size / 10);
  for (i = j = 0, len = word.length; j < len; i = ++j) {
    ch = word[i];
    push();
    translate(radius1, 0);
    rd(90);
    fc(1, 1, 0);
    circle(0, 0, radius2);
    fc(0);
    text(ch, 0, 0);
    pop();
    rd(dAngle);
  }
  return angle += 0.5;
};

handleMousePressed = function() {
  var ch, dword, i, j, len, n, w, x, y;
  n = word.length;
  dword = (word + word).toLowerCase();
  for (i = j = 0, len = word.length; j < len; i = ++j) {
    ch = word[i];
    x = width / 2 + radius1 * cos(radians(angle + i / n * 360));
    y = height / 2 + radius1 * sin(radians(angle + i / n * 360));
    if (radius2 > dist(mouseX, mouseY, x, y)) {
      w = dword.slice(i, i + n);
      return newGame(indexOf.call(words, w) >= 0 ? 1 : -1);
    }
  }
};

mousePressed = function() {
  return handleMousePressed();
};

touchStarted = function() {
  return handleMousePressed();
};

listCircular = function() {
  var antal, ch, dword, i, j, k, len, len1, n, res, w;
  print(words.length);
  antal = 0;
  for (j = 0, len = words.length; j < len; j++) {
    word = words[j];
    n = word.length;
    dword = (word + word).toLowerCase();
    res = [];
    for (i = k = 0, len1 = word.length; k < len1; i = ++k) {
      ch = word[i];
      w = dword.slice(i, i + n);
      if (indexOf.call(words, w) >= 0) {
        res.push(w);
      }
    }
    if (res.length === 2) {
      antal++;
    }
  }
  return print(antal);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsMEpBQUE7RUFBQTs7QUFBQSxLQUFBLEdBQVE7O0FBQ1IsSUFBQSxHQUFPOztBQUNQLFFBQUEsR0FBVzs7QUFDWCxLQUFBLEdBQVEsQ0FBQzs7QUFDVCxLQUFBLEdBQVE7O0FBQ1IsU0FBQSxHQUFZOztBQUNaLElBQUEsR0FBTzs7QUFDUCxPQUFBLEdBQVU7O0FBQ1YsT0FBQSxHQUFVOztBQUVWLEtBQUEsR0FBUSxTQUFBO0VBQ1AsWUFBQSxDQUFhLFdBQWIsRUFBeUIsWUFBekI7RUFDQSxJQUFBLEdBQU8sR0FBQSxDQUFJLFdBQUosRUFBZ0IsWUFBaEI7RUFDUCxPQUFBLEdBQVUsSUFBQSxHQUFLO0VBQ2YsT0FBQSxHQUFVLElBQUEsR0FBSyxDQUFMLEdBQU87RUFDakIsS0FBQSxHQUFRLFFBQVEsQ0FBQyxLQUFULENBQWUsR0FBZjtFQUNSLFNBQUEsQ0FBVSxNQUFWLEVBQWlCLE1BQWpCO1NBRUEsT0FBQSxDQUFRLENBQVI7QUFSTzs7QUFVUixPQUFBLEdBQVUsU0FBQyxNQUFEO0FBQ1QsTUFBQTtFQUFBLFNBQUEsR0FBWTtFQUNaLEtBQUEsR0FBUSxHQUFBLENBQUksS0FBQSxHQUFNLEVBQVY7RUFDUixJQUFHLE1BQUEsR0FBUyxDQUFULElBQWUsS0FBQSxLQUFTLENBQTNCO0lBQWtDLE1BQUEsSUFBVSxNQUE1Qzs7RUFDQSxLQUFBLElBQVM7RUFDVCxJQUFHLEtBQUEsR0FBUSxDQUFYO0lBQWtCLEtBQUEsR0FBUSxFQUExQjs7RUFDQSxRQUFBLEdBQVc7RUFDWCxJQUFBLEdBQU8sQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUFUO0VBQ1AsSUFBQSxHQUFPLElBQUksQ0FBQyxXQUFMLENBQUE7U0FDUCxLQUFBLEdBQVEsR0FBQSxHQUFNLE1BQUEsQ0FBQTtBQVRMOztBQVdWLElBQUEsR0FB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LENBQVMsQ0FBVCxFQUFuQjs7QUFGRDtJQUdBLElBQUcsR0FBRyxDQUFDLE1BQUosS0FBYyxDQUFqQjtNQUNDLEtBQUEsR0FERDs7QUFQRDtTQVNBLEtBQUEsQ0FBTSxLQUFOO0FBWmMiLCJzb3VyY2VzQ29udGVudCI6WyJ3b3JkcyA9IG51bGxcclxud29yZCA9ICcnXHJcbmxhc3RXb3JkID0gJydcclxubGV2ZWwgPSAtMVxyXG5hbmdsZSA9IDBcclxuZGlyZWN0aW9uID0gMVxyXG5zaXplID0gbnVsbFxyXG5yYWRpdXMxID0gbnVsbFxyXG5yYWRpdXMyID0gbnVsbFxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyB3aW5kb3dXaWR0aCx3aW5kb3dIZWlnaHRcclxuXHRzaXplID0gbWluIHdpbmRvd1dpZHRoLHdpbmRvd0hlaWdodFxyXG5cdHJhZGl1czIgPSBzaXplLzEwXHJcblx0cmFkaXVzMSA9IHNpemUvMi1yYWRpdXMyIFxyXG5cdHdvcmRzID0gb3JkbGlzdGEuc3BsaXQgJyAnXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHQjbGlzdENpcmN1bGFyKClcclxuXHRuZXdHYW1lIDFcclxuXHJcbm5ld0dhbWUgPSAoZExldmVsKSAtPlxyXG5cdGRpcmVjdGlvbiA9IGRMZXZlbFxyXG5cdGV4dHJhID0gaW50IGxldmVsLzEwICMgc3RyYWZmYSBtZWQgMTAlIGF2IGxldmVsLlxyXG5cdGlmIGRMZXZlbCA8IDAgYW5kIGV4dHJhICE9IDAgdGhlbiBkTGV2ZWwgKj0gZXh0cmFcclxuXHRsZXZlbCArPSBkTGV2ZWxcclxuXHRpZiBsZXZlbCA8IDAgdGhlbiBsZXZlbCA9IDBcclxuXHRsYXN0V29yZCA9IHdvcmRcclxuXHR3b3JkID0gXy5zYW1wbGUgd29yZHNcclxuXHR3b3JkID0gd29yZC50b1VwcGVyQ2FzZSgpXHJcblx0YW5nbGUgPSAzNjAgKiByYW5kb20oKVxyXG5cclxuZHJhdyA9IC0+XHJcblx0YmcgMC41XHJcblx0dGV4dFNpemUgc2l6ZS8xMFxyXG5cdHRleHQgbGFzdFdvcmQsIHdpZHRoLzIsaGVpZ2h0LXNpemUvMTBcclxuXHR0ZXh0U2l6ZSBzaXplLzRcclxuXHRpZiBkaXJlY3Rpb24gPT0gMSB0aGVuIGZjIDAsMSwwIGVsc2UgZmMgMSwwLDBcclxuXHR0ZXh0IGxldmVsLHdpZHRoLzIsaGVpZ2h0LzIgXHJcblx0ZmMgMFxyXG5cdHRyYW5zbGF0ZSB3aWR0aC8yLGhlaWdodC8yXHJcblx0biA9IHdvcmQubGVuZ3RoXHJcblx0ZEFuZ2xlID0gMzYwL25cclxuXHRyZCBhbmdsZVxyXG5cdHRleHRTaXplIHNpemUvMTBcclxuXHRmb3IgY2gsaSBpbiB3b3JkXHJcblx0XHRwdXNoKClcclxuXHRcdHRyYW5zbGF0ZSByYWRpdXMxLDBcclxuXHRcdHJkIDkwXHJcblx0XHRmYyAxLDEsMFxyXG5cdFx0Y2lyY2xlIDAsMCxyYWRpdXMyXHJcblx0XHRmYyAwXHJcblx0XHR0ZXh0IGNoLDAsMFxyXG5cdFx0cG9wKClcclxuXHRcdHJkIGRBbmdsZVxyXG5cdGFuZ2xlICs9IDAuNVxyXG5cclxuaGFuZGxlTW91c2VQcmVzc2VkID0gLT5cclxuXHRuID0gd29yZC5sZW5ndGhcclxuXHRkd29yZCA9ICh3b3JkK3dvcmQpLnRvTG93ZXJDYXNlKClcclxuXHRmb3IgY2gsaSBpbiB3b3JkXHJcblx0XHR4ID0gd2lkdGgvMiAgKyByYWRpdXMxICogY29zIHJhZGlhbnMgYW5nbGUgKyBpL24gKiAzNjBcclxuXHRcdHkgPSBoZWlnaHQvMiArIHJhZGl1czEgKiBzaW4gcmFkaWFucyBhbmdsZSArIGkvbiAqIDM2MFxyXG5cdFx0aWYgcmFkaXVzMiA+IGRpc3QgbW91c2VYLG1vdXNlWSx4LHkgXHJcblx0XHRcdHcgPSBkd29yZC5zbGljZSBpLGkrblxyXG5cdFx0XHRyZXR1cm4gbmV3R2FtZSBpZiB3IGluIHdvcmRzIHRoZW4gMSBlbHNlIC0xXHJcblxyXG5tb3VzZVByZXNzZWQgPSAtPlx0aGFuZGxlTW91c2VQcmVzc2VkKClcclxudG91Y2hTdGFydGVkID0gLT4gaGFuZGxlTW91c2VQcmVzc2VkKClcclxuXHJcbmxpc3RDaXJjdWxhciA9ICgpIC0+XHJcblx0cHJpbnQgd29yZHMubGVuZ3RoXHJcblx0YW50YWwgPSAwIFxyXG5cdGZvciB3b3JkIGluIHdvcmRzXHJcblx0XHRuID0gd29yZC5sZW5ndGhcclxuXHRcdGR3b3JkID0gKHdvcmQrd29yZCkudG9Mb3dlckNhc2UoKVxyXG5cdFx0cmVzID0gW11cclxuXHRcdGZvciBjaCxpIGluIHdvcmRcclxuXHRcdFx0dyA9IGR3b3JkLnNsaWNlIGksaStuXHJcblx0XHRcdGlmIHcgaW4gd29yZHMgdGhlbiByZXMucHVzaCB3XHJcblx0XHRpZiByZXMubGVuZ3RoID09IDJcclxuXHRcdFx0YW50YWwrK1xyXG5cdHByaW50IGFudGFsIl19
//# sourceURL=C:\Lab\2017\136-Lettero\coffee\sketch.coffee