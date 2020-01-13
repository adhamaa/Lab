// Generated by CoffeeScript 2.4.1
var Button, buttons, curr, currColor, draw, maze, mousePressed, moves, setup,
  indexOf = [].indexOf;

Button = class Button {
  constructor(title, x1, y1, click) {
    this.title = title;
    this.x = x1;
    this.y = y1;
    this.click = click;
    this.r = 35;
  }

  draw() {
    fc(1);
    if (this.title === curr) {
      fc(0);
    }
    circle(this.x, this.y, 35);
    fc(0);
    if (this.title === curr) {
      fc(1);
    }
    return text(this.title, this.x, this.y);
  }

  inside(mx, my) {
    return (this.x - this.r < mx && mx < this.x + this.r) && (this.y - this.r < my && my < this.y + this.r);
  }

};

maze = " C !     | \n-#-#=###D# \n ! | E !   \nB# #-#=###=\n |  F    |G\n=#####-####\nA#####H####";

curr = 'A';

currColor = 1;

buttons = [];

moves = [];

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
        x = 50 + 100 * i;
        y = 50 + 100 * j;
        if (indexOf.call("ABCDEFGH", ch) >= 0) {
          results1.push((function(ch) {
            return buttons.push(new Button(ch, x, y, function() {
              console.log(ch);
              if (indexOf.call(moves[1 - currColor][curr], ch) >= 0) {
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
      x = 50 + 100 * i;
      y = 50 + 100 * j;
      if (indexOf.call('|-', ch) >= 0) {
        fc(0, 0, 1); // Blue
      }
      if (ch === '|') {
        rect(x, y, 20, 100);
      }
      if (ch === '-') {
        rect(x, y, 100, 20);
      }
      if (indexOf.call('!=', ch) >= 0) {
        fc(1, 0, 0); // Red
      }
      if (ch === '!') {
        rect(x, y, 20, 100);
      }
      if (ch === '=') {
        rect(x, y, 100, 20);
      }
      if (ch === '#') {
        fc(1, 1, 0); // Yellow
      }
      if (ch === '#') {
        rect(x, y, 100, 100);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBO0VBQUE7O0FBQU0sU0FBTixNQUFBLE9BQUE7RUFDQyxXQUFjLE1BQUEsSUFBQSxJQUFBLE9BQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFNLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFVLElBQUMsQ0FBQSxDQUFELEdBQUc7RUFBNUI7O0VBQ2QsSUFBTyxDQUFBLENBQUE7SUFDTixFQUFBLENBQUcsQ0FBSDtJQUNBLElBQUcsSUFBQyxDQUFBLEtBQUQsS0FBVSxJQUFiO01BQXVCLEVBQUEsQ0FBRyxDQUFILEVBQXZCOztJQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEsQ0FBUixFQUFVLElBQUMsQ0FBQSxDQUFYLEVBQWEsRUFBYjtJQUNBLEVBQUEsQ0FBRyxDQUFIO0lBQ0EsSUFBRyxJQUFDLENBQUEsS0FBRCxLQUFVLElBQWI7TUFBdUIsRUFBQSxDQUFHLENBQUgsRUFBdkI7O1dBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxLQUFOLEVBQVksSUFBQyxDQUFBLENBQWIsRUFBZSxJQUFDLENBQUEsQ0FBaEI7RUFOTTs7RUFPUCxNQUFTLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBQTtXQUFVLENBQUEsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBSixHQUFRLEVBQVIsSUFBUSxFQUFSLEdBQWEsSUFBQyxDQUFBLENBQUQsR0FBRyxJQUFDLENBQUEsQ0FBakIsQ0FBQSxJQUF1QixDQUFBLElBQUMsQ0FBQSxDQUFELEdBQUcsSUFBQyxDQUFBLENBQUosR0FBUSxFQUFSLElBQVEsRUFBUixHQUFhLElB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QUFBLEtBQUEseUNBQUE7O0lBQ0MsSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFjLE1BQWQsRUFBcUIsTUFBckIsQ0FBSDttQkFBb0MsTUFBTSxDQUFDLEtBQVAsQ0FBQSxHQUFwQztLQUFBLE1BQUE7MkJBQUE7O0VBREQsQ0FBQTs7QUFEYyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJ1dHRvblxyXG5cdGNvbnN0cnVjdG9yIDogKEB0aXRsZSxAeCxAeSxAY2xpY2spIC0+IEByPTM1XHJcblx0ZHJhdyA6IC0+XHJcblx0XHRmYyAxXHJcblx0XHRpZiBAdGl0bGUgPT0gY3VyciB0aGVuIGZjIDBcclxuXHRcdGNpcmNsZSBAeCxAeSwzNVxyXG5cdFx0ZmMgMFxyXG5cdFx0aWYgQHRpdGxlID09IGN1cnIgdGhlbiBmYyAxXHJcblx0XHR0ZXh0IEB0aXRsZSxAeCxAeVxyXG5cdGluc2lkZSA6IChteCxteSktPiBAeC1AciA8IG14IDwgQHgrQHIgYW5kIEB5LUByIDwgbXkgPCBAeStAclxyXG5cclxubWF6ZSA9IFwiXCJcIlxyXG5cdCBDICEgICAgIHwgXHJcblx0LSMtIz0jIyNEIyBcclxuXHQgISB8IEUgISAgIFxyXG5cdEIjICMtIz0jIyM9XHJcblx0IHwgIEYgICAgfEdcclxuXHQ9IyMjIyMtIyMjI1xyXG5cdEEjIyMjI0gjIyMjXHJcblwiXCJcIlxyXG5cclxuY3VyciA9ICdBJ1xyXG5jdXJyQ29sb3IgPSAxXHJcbmJ1dHRvbnMgPSBbXVxyXG5cclxubW92ZXMgPSBbXVxyXG5tb3Zlcy5wdXNoIHtBOlwiQlwiLCBCOlwiQUZcIiwgQzpcIkRcIiwgRDpcIkNFR1wiLCBFOlwiREZcIiwgRjpcIkJFXCIsIEc6XCJEXCIsIEg6XCJcIn1cclxubW92ZXMucHVzaCB7QTpcIlwiLCBCOlwiQ0ZcIiwgQzpcIkJGXCIsIEQ6XCJEXCIsIEU6XCJGXCIsIEY6XCJCQ0VHSFwiLCBHOlwiRlwiLCBIOlwiRlwifVxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyAxMTAwLDcwMFxyXG5cdG1hemUgPSBtYXplLnNwbGl0ICdcXG4nXHJcblx0cmVjdE1vZGUgQ0VOVEVSLENFTlRFUlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0dGV4dFNpemUgNTBcclxuXHRzYygpXHJcblx0Zm9yIGxpbmUsaiBpbiBtYXplXHJcblx0XHRmb3IgY2gsaSBpbiBsaW5lXHJcblx0XHRcdHggPSA1MCArIDEwMCppXHJcblx0XHRcdHkgPSA1MCArIDEwMCpqXHJcblx0XHRcdGlmIGNoIGluIFwiQUJDREVGR0hcIlxyXG5cdFx0XHRcdGRvIChjaCkgLT5cclxuXHRcdFx0XHRcdGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIGNoLHgseSwgKCkgLT5cclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cgY2hcclxuXHRcdFx0XHRcdFx0aWYgY2ggaW4gbW92ZXNbMS1jdXJyQ29sb3JdW2N1cnJdXHJcblx0XHRcdFx0XHRcdFx0Y3VyciA9IGNoXHJcblx0XHRcdFx0XHRcdFx0Y3VyckNvbG9yID0gMSAtIGN1cnJDb2xvclxyXG5cclxuZHJhdyA9IC0+XHJcblx0YmcgMC41XHJcblx0Zm9yIGxpbmUsaiBpbiBtYXplXHJcblx0XHRmb3IgY2gsaSBpbiBsaW5lXHJcblx0XHRcdHggPSA1MCArIDEwMCppXHJcblx0XHRcdHkgPSA1MCArIDEwMCpqXHJcblx0XHRcdGlmIGNoIGluICd8LScgdGhlbiBmYyAwLDAsMSAjIEJsdWVcclxuXHRcdFx0aWYgY2g9PSd8JyB0aGVuIHJlY3QgeCx5LDIwLDEwMFxyXG5cdFx0XHRpZiBjaD09Jy0nIHRoZW4gcmVjdCB4LHksMTAwLDIwXHJcblxyXG5cdFx0XHRpZiBjaCBpbiAnIT0nIHRoZW4gZmMgMSwwLDAgIyBSZWRcclxuXHRcdFx0aWYgY2g9PSchJyB0aGVuIHJlY3QgeCx5LDIwLDEwMFxyXG5cdFx0XHRpZiBjaD09Jz0nIHRoZW4gcmVjdCB4LHksMTAwLDIwXHJcblxyXG5cdFx0XHRpZiBjaD09JyMnIHRoZW4gZmMgMSwxLDAgIyBZZWxsb3dcclxuXHRcdFx0aWYgY2g9PScjJyB0aGVuIHJlY3QgeCx5LDEwMCwxMDBcclxuXHJcblx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRidXR0b24uZHJhdygpXHJcblxyXG5cdGZjIDBcclxuXHR0ZXh0ICdHbyBmcm9tIEEgdG8gSCcsMzUwLDU1MFxyXG5cdHRleHQgJ0p1bXAgaW4gb3JkZXI6JywzNTAsNjAwXHJcblx0dGV4dCAncmVkLCBibHVlLCByZWQsIGJsdWUuLi4nLDM1MCw2NTBcclxuXHR0ZXh0ICdUZWtuaXNrYSBNdXNlZXQnLDkwMCw1NTBcclxuXHJcblx0aWYgY3Vycj09J0gnIHRoZW4gdGV4dCAnRXhjZWxsZW50IScsOTAwLDY1MFxyXG5cclxubW91c2VQcmVzc2VkID0gLT5cclxuXHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdGlmIGJ1dHRvbi5pbnNpZGUgbW91c2VYLG1vdXNlWSB0aGVuIGJ1dHRvbi5jbGljaygpIl19
//# sourceURL=c:\Lab\2020\001-TekniskaMuseet\coffee\sketch.coffee