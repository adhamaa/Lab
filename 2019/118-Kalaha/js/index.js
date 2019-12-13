// Generated by CoffeeScript 2.4.1
var ActiveComputerHouse, Button, Evaluate, FinalScoring, HasSuccessors, HouseButtonActive, HouseOnClick, Relocation, beans, buttons, depth, keyPressed, messages, mousePressed, player, playerComputer, playerTitle, reset, setup, xdraw;

playerTitle = ['Human', 'Computer'];

playerComputer = [false, true];

player = 0; // 0 or 1

beans = 6;

depth = 1;

buttons = [];

messages = {};

messages.depth = depth;

messages.time = 0;

messages.result = '';

messages.letters = '';

messages.moves = 0;

Button = class Button {
  constructor(x1, y1, value, littera1 = '', click = function() {}) {
    this.x = x1;
    this.y = y1;
    this.value = value;
    this.littera = littera1;
    this.click = click;
    this.radie = 40;
  }

  draw() {
    fc(1, 0, 0);
    circle(this.x, this.y, this.radie);
    textAlign(CENTER, CENTER);
    if (this.value > 0) {
      fc(1);
      return text(this.value, this.x, this.y);
    } else {
      push();
      fc(0.8, 0, 0);
      text(this.littera, this.x, this.y);
      return pop();
    }
  }

  inside(x, y) {
    return this.radie > dist(x, y, this.x, this.y);
  }

};

setup = function() {
  var i, j, k, len, len1, littera, ref, ref1;
  createCanvas(2 * 450, 2 * 150);
  textAlign(CENTER, CENTER);
  textSize(40);
  ref = 'abcdef';
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    littera = ref[i];
    (function(i) {
      return buttons.push(new Button(2 * 100 + 2 * 50 * i, 2 * 100, beans, '', function() {
        return HouseOnClick(i);
      }));
    })(i);
  }
  buttons.push(new Button(2 * 400, 2 * 75, 0));
  ref1 = 'ABCDEF';
  for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
    littera = ref1[i];
    buttons.push(new Button(2 * 100 + 2 * 50 * (5 - i), 2 * 50, beans, littera));
  }
  buttons.push(new Button(2 * 50, 2 * 75, 0));
  return reset(beans);
};

xdraw = function() {
  var button, j, len;
  bg(0);
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    button.draw();
  }
  fc(1, 1, 0);
  textAlign(LEFT, CENTER);
  text('Level: ' + messages.depth, 2 * 10, 2 * 20);
  textAlign(CENTER, CENTER);
  text(messages.result, width / 2, 2 * 135);
  text(messages.letters, width / 2, 2 * 20);
  textAlign(RIGHT, CENTER);
  text(messages.time + ' ms', width - 2 * 10, 2 * 20);
  return text(messages.moves, width - 2 * 10, 2 * 135);
};

mousePressed = function() {
  var button, j, len, results;
  if (messages.result !== '') {
    return reset(0);
  }
  messages.letters = '';
  results = [];
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    if (button.inside(mouseX, mouseY)) {
      results.push(button.click());
    } else {
      results.push(void 0);
    }
  }
  return results;
};

reset = function(b) {
  var button, j, len;
  if (b > 0) {
    beans = b;
  }
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    button.value = beans;
  }
  buttons[6].value = 0;
  buttons[13].value = 0;
  if (depth < 1) {
    depth = 1;
  }
  messages.depth = depth;
  messages.time = 0;
  messages.result = '';
  messages.letters = '';
  messages.moves = 0;
  return xdraw();
};

keyPressed = function() {
  var index;
  if (messages.result === '') {
    return;
  }
  index = " 1234567890".indexOf(key);
  if (index >= 0) {
    return reset(index);
  }
};

ActiveComputerHouse = function() {
  var result, start;
  start = new Date();
  result = alphaBeta(depth, player);
  
  //result = minimax depth, player
  messages.time += new Date() - start;
  return HouseOnClick(result);
};

HouseButtonActive = function() {
  if (playerComputer[player]) {
    return ActiveComputerHouse();
  }
};

HouseOnClick = function(pickedHouse) {
  var again, house, i, j, k, len, len1, ref, ref1;
  messages.letters += 'abcdef ABCDEF'[pickedHouse];
  if (buttons[pickedHouse].value === 0) {
    return;
  }
  house = buttons.map(function(button) {
    return button.value;
  });
  again = Relocation(house, pickedHouse);
  ref = range(14);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    buttons[i].value = house[i];
  }
  if (again === false) {
    if (player === 1) {
      console.log(messages.letters);
      messages.moves++;
    }
    player = 1 - player;
  }
  if (HasSuccessors(house)) {
    HouseButtonActive();
  } else {
    FinalScoring(house);
    ref1 = range(14);
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      i = ref1[k];
      buttons[i].value = house[i];
    }
    if (house[13] > house[6]) {
      messages.result = playerTitle[1] + " Wins";
      depth--;
    } else if (house[13] === house[6]) {
      messages.result = "Tie";
    } else {
      messages.result = playerTitle[0] + " Wins";
      depth++;
    }
    console.log('');
  }
  return xdraw();
};

Relocation = function(house, pickedHouse) {
  var index, opponentShop, playerShop;
  playerShop = 6;
  opponentShop = 13;
  if (pickedHouse > 6) {
    playerShop = 13;
    opponentShop = 6;
  }
  index = pickedHouse;
  while (house[pickedHouse] > 0) {
    index = (index + 1) % 14;
    if (index === opponentShop) {
      continue;
    }
    house[index]++;
    house[pickedHouse]--;
  }
  if (index === playerShop) {
    return true;
  }
  if (house[index] === 1 && house[12 - index] !== 0 && index >= (playerShop - 6) && index < playerShop) {
    house[playerShop] += house[12 - index] + 1;
    house[index] = house[12 - index] = 0;
  }
  return false;
};

FinalScoring = function(house) {
  var i, j, len, ref, results;
  ref = range(6);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    house[6] += house[i];
    house[13] += house[7 + i];
    results.push(house[i] = house[7 + i] = 0);
  }
  return results;
};

Evaluate = function(house, player1, player2) {
  return house[player1] - house[player2];
};

HasSuccessors = function(house) {
  var i, j, len, player1, player2, ref;
  player1 = false;
  player2 = false;
  ref = range(6);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (house[i] !== 0) {
      player1 = true;
    }
    if (house[7 + i] !== 0) {
      player2 = true;
    }
  }
  return player1 && player2;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLG1CQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxZQUFBLEVBQUEsYUFBQSxFQUFBLGlCQUFBLEVBQUEsWUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxNQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBOztBQUFBLFdBQUEsR0FBYyxDQUFDLE9BQUQsRUFBUyxVQUFUOztBQUNkLGNBQUEsR0FBaUIsQ0FBQyxLQUFELEVBQU8sSUFBUDs7QUFDakIsTUFBQSxHQUFTLEVBRlQ7O0FBR0EsS0FBQSxHQUFROztBQUNSLEtBQUEsR0FBUTs7QUFDUixPQUFBLEdBQVc7O0FBRVgsUUFBQSxHQUFXLENBQUE7O0FBQ1gsUUFBUSxDQUFDLEtBQVQsR0FBaUI7O0FBQ2pCLFFBQVEsQ0FBQyxJQUFULEdBQWdCOztBQUNoQixRQUFRLENBQUMsTUFBVCxHQUFrQjs7QUFDbEIsUUFBUSxDQUFDLE9BQVQsR0FBbUI7O0FBQ25CLFFBQVEsQ0FBQyxLQUFULEdBQWlCOztBQUVYLFNBQU4sTUFBQSxPQUFBO0VBQ0MsV0FBYyxHQUFBLElBQUEsT0FBQSxhQUF1QixFQUF2QixVQUFpQyxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQWpDLENBQUE7SUFBQyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBTSxJQUFDLENBQUE7SUFBVyxJQUFDLENBQUE7SUFBYSxJQUFDLENBQUEsS0FBRCxHQUFPO0VBQS9DOztFQUNkLElBQU8sQ0FBQSxDQUFBO0lBQ04sRUFBQSxDQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUDtJQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEs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Q0FBQSxDQUFBLEdBQUksQ0FBSixDQUFOLEdBQWU7RUFIM0IsQ0FBQTs7QUFEYzs7QUFNZixRQUFBLEdBQVcsUUFBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLE9BQWpCLENBQUE7U0FBNkIsS0FBTSxDQUFBLE9BQUEsQ0FBTixHQUFpQixLQUFNLENBQUEsT0FBQTtBQUFwRDs7QUFFWCxhQUFBLEdBQWdCLFFBQUEsQ0FBQyxLQUFELENBQUE7QUFDZixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUE7RUFBQSxPQUFBLEdBQVU7RUFDVixPQUFBLEdBQVU7QUFDVjtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsSUFBRyxLQUFNLENBQUEsQ0FBQSxDQUFOLEtBQVksQ0FBZjtNQUFzQixPQUFBLEdBQVUsS0FBaEM7O0lBQ0EsSUFBRyxLQUFNLENBQUEsQ0FBQSxHQUFJLENBQUosQ0FBTixLQUFnQixDQUFuQjtNQUEwQixPQUFBLEdBQVUsS0FBcEM7O0VBRkQ7U0FHQSxPQUFBLElBQVk7QUFORyIsInNvdXJjZXNDb250ZW50IjpbInBsYXllclRpdGxlID0gWydIdW1hbicsJ0NvbXB1dGVyJ11cclxucGxheWVyQ29tcHV0ZXIgPSBbZmFsc2UsdHJ1ZV1cclxucGxheWVyID0gMCAjIDAgb3IgMVxyXG5iZWFucyA9IDZcclxuZGVwdGggPSAxXHJcbmJ1dHRvbnMgID0gW10gXHJcblxyXG5tZXNzYWdlcyA9IHt9XHJcbm1lc3NhZ2VzLmRlcHRoID0gZGVwdGhcclxubWVzc2FnZXMudGltZSA9IDBcclxubWVzc2FnZXMucmVzdWx0ID0gJydcclxubWVzc2FnZXMubGV0dGVycyA9ICcnXHJcbm1lc3NhZ2VzLm1vdmVzID0gMFxyXG5cclxuY2xhc3MgQnV0dG9uXHJcblx0Y29uc3RydWN0b3IgOiAoQHgsQHksQHZhbHVlLEBsaXR0ZXJhPScnLEBjbGljaz0tPikgLT4gQHJhZGllPTQwXHJcblx0ZHJhdyA6IC0+XHJcblx0XHRmYyAxLDAsMFxyXG5cdFx0Y2lyY2xlIEB4LEB5LEByYWRpZVxyXG5cdFx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRcdGlmIEB2YWx1ZSA+IDAgXHJcblx0XHRcdGZjIDFcclxuXHRcdFx0dGV4dCBAdmFsdWUsQHgsQHlcclxuXHRcdGVsc2VcclxuXHRcdFx0cHVzaCgpXHJcblx0XHRcdGZjIDAuOCwwLDBcclxuXHRcdFx0dGV4dCBAbGl0dGVyYSxAeCxAeVxyXG5cdFx0XHRwb3AoKVxyXG5cdGluc2lkZSA6ICh4LHkpIC0+IEByYWRpZSA+IGRpc3QgeCx5LEB4LEB5XHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIDIqNDUwLDIqMTUwXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHR0ZXh0U2l6ZSA0MFxyXG5cdGZvciBsaXR0ZXJhLGkgaW4gJ2FiY2RlZidcclxuXHRcdGRvIChpKSAtPlxyXG5cdFx0XHRidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiAyKjEwMCsyKjUwKmksMioxMDAsYmVhbnMsJycsKCkgLT4gSG91c2VPbkNsaWNrIGlcclxuXHRidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiAyKjQwMCwyKjc1LDBcclxuXHRmb3IgbGl0dGVyYSxpIGluICdBQkNERUYnXHJcblx0XHRidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiAyKjEwMCsyKjUwKig1LWkpLDIqNTAsYmVhbnMsbGl0dGVyYVxyXG5cdGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIDIqNTAsMio3NSwwXHJcblx0cmVzZXQgYmVhbnNcclxuXHJcbnhkcmF3ID0gLT5cclxuXHRiZyAwXHJcblx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRidXR0b24uZHJhdygpXHJcblx0ZmMgMSwxLDBcclxuXHR0ZXh0QWxpZ24gTEVGVCxDRU5URVJcclxuXHR0ZXh0ICdMZXZlbDogJyttZXNzYWdlcy5kZXB0aCwyKjEwLDIqMjBcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHRleHQgbWVzc2FnZXMucmVzdWx0LHdpZHRoLzIsMioxMzVcclxuXHR0ZXh0IG1lc3NhZ2VzLmxldHRlcnMsd2lkdGgvMiwyKjIwXHJcblx0dGV4dEFsaWduIFJJR0hULENFTlRFUlxyXG5cdHRleHQgbWVzc2FnZXMudGltZSsnIG1zJyx3aWR0aC0yKjEwLDIqMjBcclxuXHR0ZXh0IG1lc3NhZ2VzLm1vdmVzLHdpZHRoLTIqMTAsMioxMzVcclxuXHJcbm1vdXNlUHJlc3NlZCA9ICgpIC0+XHJcblx0aWYgbWVzc2FnZXMucmVzdWx0ICE9ICcnIHRoZW4gcmV0dXJuIHJlc2V0IDBcclxuXHRtZXNzYWdlcy5sZXR0ZXJzID0gJydcclxuXHRmb3IgYnV0dG9uIGluIGJ1dHRvbnNcclxuXHRcdGlmIGJ1dHRvbi5pbnNpZGUgbW91c2VYLG1vdXNlWSB0aGVuIGJ1dHRvbi5jbGljaygpXHJcblxyXG5yZXNldCA9IChiKSAtPlxyXG5cdGlmIGIgPiAwIHRoZW5cdGJlYW5zID0gYlxyXG5cdGZvciBidXR0b24gaW4gYnV0dG9uc1xyXG5cdFx0YnV0dG9uLnZhbHVlID0gYmVhbnNcclxuXHRidXR0b25zWzZdLnZhbHVlID0gMFxyXG5cdGJ1dHRvbnNbMTNdLnZhbHVlID0gMFxyXG5cdGlmIGRlcHRoIDwgMSB0aGVuIGRlcHRoID0gMVxyXG5cdG1lc3NhZ2VzLmRlcHRoID0gZGVwdGhcclxuXHRtZXNzYWdlcy50aW1lID0gMFxyXG5cdG1lc3NhZ2VzLnJlc3VsdCA9ICcnXHJcblx0bWVzc2FnZXMubGV0dGVycyA9ICcnXHJcblx0bWVzc2FnZXMubW92ZXMgPSAwXHJcblx0eGRyYXcoKVxyXG5cclxua2V5UHJlc3NlZCA9IC0+IFxyXG5cdGlmIG1lc3NhZ2VzLnJlc3VsdCA9PSAnJyB0aGVuIHJldHVyblxyXG5cdGluZGV4ID0gXCIgMTIzNDU2Nzg5MFwiLmluZGV4T2Yga2V5XHJcblx0aWYgaW5kZXggPj0gMCB0aGVuIHJlc2V0IGluZGV4XHJcblxyXG5BY3RpdmVDb21wdXRlckhvdXNlID0gKCkgLT4gXHJcblx0c3RhcnQgPSBuZXcgRGF0ZSgpXHJcblx0cmVzdWx0ID0gYWxwaGFCZXRhIGRlcHRoLCBwbGF5ZXIgXHJcblx0I3Jlc3VsdCA9IG1pbmltYXggZGVwdGgsIHBsYXllclxyXG5cdG1lc3NhZ2VzLnRpbWUgKz0gbmV3IERhdGUoKSAtIHN0YXJ0XHJcblxyXG5cdEhvdXNlT25DbGljayByZXN1bHRcclxuXHJcbkhvdXNlQnV0dG9uQWN0aXZlID0gKCkgLT4gaWYgcGxheWVyQ29tcHV0ZXJbcGxheWVyXSB0aGVuIEFjdGl2ZUNvbXB1dGVySG91c2UoKSBcclxuXHJcbkhvdXNlT25DbGljayA9IChwaWNrZWRIb3VzZSkgLT5cclxuXHRtZXNzYWdlcy5sZXR0ZXJzICs9ICdhYmNkZWYgQUJDREVGJ1twaWNrZWRIb3VzZV1cclxuXHRpZiBidXR0b25zW3BpY2tlZEhvdXNlXS52YWx1ZSA9PSAwIHRoZW4gcmV0dXJuIFxyXG5cdGhvdXNlID0gYnV0dG9ucy5tYXAgKGJ1dHRvbikgLT4gYnV0dG9uLnZhbHVlXHJcblx0YWdhaW4gPSBSZWxvY2F0aW9uKGhvdXNlLCBwaWNrZWRIb3VzZSlcclxuXHRmb3IgaSBpbiByYW5nZSAxNFxyXG5cdFx0YnV0dG9uc1tpXS52YWx1ZSA9IGhvdXNlW2ldXHJcblx0aWYgYWdhaW4gPT0gZmFsc2VcclxuXHRcdGlmIHBsYXllcj09MVxyXG5cdFx0XHRjb25zb2xlLmxvZyBtZXNzYWdlcy5sZXR0ZXJzXHJcblx0XHRcdG1lc3NhZ2VzLm1vdmVzKytcclxuXHRcdHBsYXllciA9IDEgLSBwbGF5ZXJcclxuXHRpZiBIYXNTdWNjZXNzb3JzKGhvdXNlKVxyXG5cdFx0SG91c2VCdXR0b25BY3RpdmUoKVxyXG5cdGVsc2UgXHJcblx0XHRGaW5hbFNjb3JpbmcoaG91c2UpXHJcblx0XHRmb3IgaSBpbiByYW5nZSAxNFxyXG5cdFx0XHRidXR0b25zW2ldLnZhbHVlID0gaG91c2VbaV1cclxuXHJcblx0XHRpZiBob3VzZVsxM10gPiBob3VzZVs2XVxyXG5cdFx0XHRtZXNzYWdlcy5yZXN1bHQgPSBwbGF5ZXJUaXRsZVsxXSArIFwiIFdpbnNcIlxyXG5cdFx0XHRkZXB0aC0tXHJcblx0XHRlbHNlIGlmIGhvdXNlWzEzXSA9PSBob3VzZVs2XVxyXG5cdFx0XHRtZXNzYWdlcy5yZXN1bHQgPSBcIlRpZVwiXHJcblx0XHRlbHNlXHJcblx0XHRcdG1lc3NhZ2VzLnJlc3VsdCA9IHBsYXllclRpdGxlWzBdICsgXCIgV2luc1wiXHJcblx0XHRcdGRlcHRoKytcclxuXHRcdGNvbnNvbGUubG9nICcnXHJcblx0eGRyYXcoKVxyXG5cclxuUmVsb2NhdGlvbiA9IChob3VzZSwgcGlja2VkSG91c2UpIC0+XHJcblx0cGxheWVyU2hvcCA9IDZcclxuXHRvcHBvbmVudFNob3AgPSAxM1xyXG5cdGlmIHBpY2tlZEhvdXNlID4gNlxyXG5cdFx0cGxheWVyU2hvcCA9IDEzXHJcblx0XHRvcHBvbmVudFNob3AgPSA2XHJcblxyXG5cdGluZGV4ID0gcGlja2VkSG91c2VcclxuXHR3aGlsZSBob3VzZVtwaWNrZWRIb3VzZV0gPiAwIFxyXG5cdFx0aW5kZXggPSAoaW5kZXggKyAxKSAlIDE0XHJcblx0XHRpZiBpbmRleCA9PSBvcHBvbmVudFNob3AgdGhlbiBjb250aW51ZVxyXG5cdFx0aG91c2VbaW5kZXhdKytcclxuXHRcdGhvdXNlW3BpY2tlZEhvdXNlXS0tXHJcblxyXG5cdGlmIGluZGV4ID09IHBsYXllclNob3AgdGhlbiByZXR1cm4gdHJ1ZVxyXG5cclxuXHRpZiBob3VzZVtpbmRleF0gPT0gMSBhbmQgaG91c2VbMTIgLSBpbmRleF0gIT0gMCBhbmQgaW5kZXggPj0gKHBsYXllclNob3AgLSA2KSBhbmQgaW5kZXggPCBwbGF5ZXJTaG9wXHJcblx0XHRob3VzZVtwbGF5ZXJTaG9wXSArPSBob3VzZVsxMiAtIGluZGV4XSArIDFcclxuXHRcdGhvdXNlW2luZGV4XSA9IGhvdXNlWzEyIC0gaW5kZXhdID0gMFxyXG5cdGZhbHNlXHJcblxyXG5GaW5hbFNjb3JpbmcgPSAoaG91c2UpIC0+XHJcblx0Zm9yIGkgaW4gcmFuZ2UgNlxyXG5cdFx0aG91c2VbNl0gKz0gaG91c2VbaV1cclxuXHRcdGhvdXNlWzEzXSArPSBob3VzZVs3ICsgaV1cclxuXHRcdGhvdXNlW2ldID0gaG91c2VbNyArIGldID0gMFxyXG5cclxuRXZhbHVhdGUgPSAoaG91c2UsIHBsYXllcjEsIHBsYXllcjIpIC0+IGhvdXNlW3BsYXllcjFdIC0gaG91c2VbcGxheWVyMl1cclxuXHJcbkhhc1N1Y2Nlc3NvcnMgPSAoaG91c2UpIC0+XHJcblx0cGxheWVyMSA9IGZhbHNlXHJcblx0cGxheWVyMiA9IGZhbHNlXHJcblx0Zm9yIGkgaW4gcmFuZ2UgNlxyXG5cdFx0aWYgaG91c2VbaV0gIT0gMCB0aGVuIHBsYXllcjEgPSB0cnVlXHJcblx0XHRpZiBob3VzZVs3ICsgaV0gIT0gMCB0aGVuIHBsYXllcjIgPSB0cnVlXHJcblx0cGxheWVyMSBhbmQgcGxheWVyMlxyXG4iXX0=
//# sourceURL=c:\Lab\2019\118-Kalaha\coffee\index.coffee