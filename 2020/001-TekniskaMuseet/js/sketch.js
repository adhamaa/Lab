// Generated by CoffeeScript 2.4.1
var Button, OFF, SZ, TH, buttons, curr, currColor, draw, maze, mousePressed, moves, setup,
  indexOf = [].indexOf;

SZ = 100;

OFF = SZ / 2;

TH = 20;

Button = class Button {
  constructor(title, x1, y1, click) {
    this.title = title;
    this.x = x1;
    this.y = y1;
    this.click = click;
    this.r = 35;
  }

  draw() {
    fc(this.title === curr ? 0 : 1);
    circle(this.x, this.y, this.r);
    fc(this.title === curr ? 1 : 0);
    return text(this.title, this.x, this.y);
  }

  inside(mx, my) {
    return this.r > dist(this.x, this.y, mx, my);
  }

};

maze = " C !     | \n-#-#=###D# \n ! | E !   \nB# #-#=###=\n |  F    |G\n=#####-####\nA#####H####";

curr = 'A';

currColor = 1;

buttons = [];

moves = [];

moves.push({
  A: "",
  B: "CF",
  C: "BF",
  D: "D",
  E: "F",
  F: "BCEGH",
  G: "F",
  H: "F"
});

moves.push({
  A: "B",
  B: "AF",
  C: "D",
  D: "CEG",
  E: "DF",
  F: "BE",
  G: "D",
  H: ""
});

setup = function() {
  var ch, i, j, k, len, line, results, x, y;
  createCanvas(1100, 700);
  maze = maze.split('\n');
  rectMode(CENTER, CENTER);
  textAlign(CENTER, CENTER);
  textSize(50);
  sc();
  results = [];
  for (j = k = 0, len = maze.length; k < len; j = ++k) {
    line = maze[j];
    results.push((function() {
      var l, len1, results1;
      results1 = [];
      for (i = l = 0, len1 = line.length; l < len1; i = ++l) {
        ch = line[i];
        if (indexOf.call("ABCDEFGH", ch) >= 0) {
          x = OFF + SZ * i;
          y = OFF + SZ * j;
          results1.push((function(ch) {
            return buttons.push(new Button(ch, x, y, function() {
              if (indexOf.call(moves[currColor][curr], ch) >= 0) {
                curr = ch;
                return currColor = 1 - currColor;
              }
            }));
          })(ch));
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    })());
  }
  return results;
};

draw = function() {
  var button, ch, i, j, k, l, len, len1, len2, line, m, x, y;
  bg(0.5);
  for (j = k = 0, len = maze.length; k < len; j = ++k) {
    line = maze[j];
    for (i = l = 0, len1 = line.length; l < len1; i = ++l) {
      ch = line[i];
      x = OFF + SZ * i;
      y = OFF + SZ * j;
      if (indexOf.call('|-', ch) >= 0) {
        fc(0, 0, 1); // Blue
      }
      if (ch === '|') {
        rect(x, y, TH, SZ);
      }
      if (ch === '-') {
        rect(x, y, SZ, TH);
      }
      if (indexOf.call('!=', ch) >= 0) {
        fc(1, 0, 0); // Red
      }
      if (ch === '!') {
        rect(x, y, TH, SZ);
      }
      if (ch === '=') {
        rect(x, y, SZ, TH);
      }
      if (ch === '#') {
        fc(1, 1, 0); // Yellow
      }
      if (ch === '#') {
        rect(x, y, SZ, SZ);
      }
    }
  }
  for (m = 0, len2 = buttons.length; m < len2; m++) {
    button = buttons[m];
    button.draw();
  }
  fc(0);
  text('Go from A to H', 350, 550);
  text('Jump in order:', 350, 600);
  text('red, blue, red, blue...', 350, 650);
  text('Tekniska Museet', 900, 550);
  if (curr === 'H') {
    return text('Excellent!', 900, 650);
  }
};

mousePressed = function() {
  var button, k, len, results;
  results = [];
  for (k = 0, len = buttons.length; k < len; k++) {
    button = buttons[k];
    if (button.inside(mouseX, mouseY)) {
      results.push(button.click());
    } else {
      results.push(void 0);
    }
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBO0VBQUE7O0FBQUEsRUFBQSxHQUFLOztBQUNMLEdBQUEsR0FBTSxFQUFBLEdBQUc7O0FBQ1QsRUFBQSxHQUFLOztBQUVDLFNBQU4sTUFBQSxPQUFBO0VBQ0MsV0FBYyxNQUFBLElBQUEsSUFBQSxPQUFBLENBQUE7SUFBQyxJQUFDLENBQUE7SUFBTSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBVSxJQUFDLENBQUEsQ0FBRCxHQUFHO0VBQTVCOztFQUNkLElBQU8sQ0FBQSxDQUFBO0lBQ04sRUFBQSxDQUFNLElBQUMsQ0FBQSxLQUFELEtBQVUsSUFBYixHQUF1QixDQUF2QixHQUE4QixDQUFqQztJQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEsQ0FBUixFQUFVLElBQUMsQ0FBQSxDQUFYLEVBQWEsSUFBQyxDQUFBLENBQWQ7SUFDQSxFQUFBLENBQU0sSUFBQyxDQUFBLEtBQUQsS0FBVSxJQUFiLEdBQXVCLENBQXZCLEdBQThCLENBQWpDO1dBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxLQUFOLEVBQVksSUFBQyxDQUFBLENBQWIsRUFBZSxJQUFDLENBQUEsQ0FBaEI7RUFKTTs7RUFLUCxNQUFTLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBQTtXQUFVLElBQUMsQ0FBQSxDQUFELEdBQUssSUFBQSxDQUFLLElBQUMsQ0FBQSxDQUFOLEVBQVMsSUFBQyxDQUFBLENBQVYsRUFBYSxFQUFiLEVBQWlCLEVBQWpCO0VBQWY7O0FBUFY7O0FBU0EsSUFBQSxHQUFPOztBQVVQ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QUFBOzJCQUFBOztFQURELENBQUE7O0FBRGMiLCJzb3VyY2VzQ29udGVudCI6WyJTWiA9IDEwMFxyXG5PRkYgPSBTWi8yXHJcblRIID0gMjBcclxuXHJcbmNsYXNzIEJ1dHRvblxyXG5cdGNvbnN0cnVjdG9yIDogKEB0aXRsZSxAeCxAeSxAY2xpY2spIC0+IEByPTM1XHJcblx0ZHJhdyA6IC0+XHJcblx0XHRmYyBpZiBAdGl0bGUgPT0gY3VyciB0aGVuIDAgZWxzZSAxXHJcblx0XHRjaXJjbGUgQHgsQHksQHJcclxuXHRcdGZjIGlmIEB0aXRsZSA9PSBjdXJyIHRoZW4gMSBlbHNlIDBcclxuXHRcdHRleHQgQHRpdGxlLEB4LEB5XHJcblx0aW5zaWRlIDogKG14LG15KS0+IEByID4gZGlzdCBAeCwgQHksIG14LCBteVxyXG5cclxubWF6ZSA9IFwiXCJcIlxyXG5cdCBDICEgICAgIHwgXHJcblx0LSMtIz0jIyNEIyBcclxuXHQgISB8IEUgISAgIFxyXG5cdEIjICMtIz0jIyM9XHJcblx0IHwgIEYgICAgfEdcclxuXHQ9IyMjIyMtIyMjI1xyXG5cdEEjIyMjI0gjIyMjXHJcblwiXCJcIlxyXG5cclxuY3VyciA9ICdBJ1xyXG5jdXJyQ29sb3IgPSAxXHJcbmJ1dHRvbnMgPSBbXVxyXG5cclxubW92ZXMgPSBbXVxyXG5tb3Zlcy5wdXNoIHtBOlwiXCIsIEI6XCJDRlwiLCBDOlwiQkZcIiwgRDpcIkRcIiwgRTpcIkZcIiwgRjpcIkJDRUdIXCIsIEc6XCJGXCIsIEg6XCJGXCJ9XHJcbm1vdmVzLnB1c2gge0E6XCJCXCIsIEI6XCJBRlwiLCBDOlwiRFwiLCBEOlwiQ0VHXCIsIEU6XCJERlwiLCBGOlwiQkVcIiwgRzpcIkRcIiwgSDpcIlwifVxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyAxMTAwLDcwMFxyXG5cdG1hemUgPSBtYXplLnNwbGl0ICdcXG4nXHJcblx0cmVjdE1vZGUgQ0VOVEVSLENFTlRFUlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0dGV4dFNpemUgNTBcclxuXHRzYygpXHJcblx0Zm9yIGxpbmUsaiBpbiBtYXplXHJcblx0XHRmb3IgY2gsaSBpbiBsaW5lXHJcblx0XHRcdGlmIGNoIGluIFwiQUJDREVGR0hcIlxyXG5cdFx0XHRcdHggPSBPRkYgKyBTWippXHJcblx0XHRcdFx0eSA9IE9GRiArIFNaKmpcclxuXHRcdFx0XHRkbyAoY2gpIC0+XHJcblx0XHRcdFx0XHRidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiBjaCx4LHksICgpIC0+XHJcblx0XHRcdFx0XHRcdGlmIGNoIGluIG1vdmVzW2N1cnJDb2xvcl1bY3Vycl1cclxuXHRcdFx0XHRcdFx0XHRjdXJyID0gY2hcclxuXHRcdFx0XHRcdFx0XHRjdXJyQ29sb3IgPSAxIC0gY3VyckNvbG9yXHJcblxyXG5kcmF3ID0gLT5cclxuXHRiZyAwLjVcclxuXHRmb3IgbGluZSxqIGluIG1hemVcclxuXHRcdGZvciBjaCxpIGluIGxpbmVcclxuXHRcdFx0eCA9IE9GRiArIFNaKmlcclxuXHRcdFx0eSA9IE9GRiArIFNaKmpcclxuXHRcdFx0aWYgY2ggaW4gJ3wtJyB0aGVuIGZjIDAsMCwxICMgQmx1ZVxyXG5cdFx0XHRpZiBjaD09J3wnIHRoZW4gcmVjdCB4LHksVEgsU1pcclxuXHRcdFx0aWYgY2g9PSctJyB0aGVuIHJlY3QgeCx5LFNaLFRIXHJcblxyXG5cdFx0XHRpZiBjaCBpbiAnIT0nIHRoZW4gZmMgMSwwLDAgIyBSZWRcclxuXHRcdFx0aWYgY2g9PSchJyB0aGVuIHJlY3QgeCx5LFRILFNaXHJcblx0XHRcdGlmIGNoPT0nPScgdGhlbiByZWN0IHgseSxTWixUSFxyXG5cclxuXHRcdFx0aWYgY2g9PScjJyB0aGVuIGZjIDEsMSwwICMgWWVsbG93XHJcblx0XHRcdGlmIGNoPT0nIycgdGhlbiByZWN0IHgseSxTWixTWlxyXG5cclxuXHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdGJ1dHRvbi5kcmF3KClcclxuXHJcblx0ZmMgMFxyXG5cdHRleHQgJ0dvIGZyb20gQSB0byBIJywzNTAsNTUwXHJcblx0dGV4dCAnSnVtcCBpbiBvcmRlcjonLDM1MCw2MDBcclxuXHR0ZXh0ICdyZWQsIGJsdWUsIHJlZCwgYmx1ZS4uLicsMzUwLDY1MFxyXG5cdHRleHQgJ1Rla25pc2thIE11c2VldCcsOTAwLDU1MFxyXG5cclxuXHRpZiBjdXJyPT0nSCcgdGhlbiB0ZXh0ICdFeGNlbGxlbnQhJyw5MDAsNjUwXHJcblxyXG5tb3VzZVByZXNzZWQgPSAtPlxyXG5cdGZvciBidXR0b24gaW4gYnV0dG9uc1xyXG5cdFx0aWYgYnV0dG9uLmluc2lkZSBtb3VzZVgsbW91c2VZIHRoZW4gYnV0dG9uLmNsaWNrKCkiXX0=
//# sourceURL=c:\Lab\2020\001-TekniskaMuseet\coffee\sketch.coffee