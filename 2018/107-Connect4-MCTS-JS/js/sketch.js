'use strict';

// Generated by CoffeeScript 2.3.2
//'use strict'

// const util = require('util')
// const Game_C4 = require('./game-c4.js')
// const MonteCarlo = require('./monte-carlo.js')
var draw, dump, game, mcts, mousePressed, setup, state, winner;

game = new Game();

mcts = new MonteCarlo(game);

state = game.start();

winner = game.winner(state);

// // Setup
setup = function setup() {
  var play;
  createCanvas(200, 200);
  mcts.runSearch(state, 1);
  play = mcts.bestPlay(state, "robust");
  //	print mcts
  //	print play
  return state = game.nextState(state, play);
};

// // From initial state, play games until end
dump = function dump(board) {
  var item, k, l, len, len1, row, s;
  s = '';
  for (k = 0, len = board.length; k < len; k++) {
    row = board[k];
    for (l = 0, len1 = row.length; l < len1; l++) {
      item = row[l];
      if (item === -1) {
        item = 2;
      }
      s += item + ' ';
    }
    s += "\n";
  }
  return print(s);
};

draw = function draw() {
  var i, item, j, k, len, ref, results, row;
  bg(0.5);
  ref = state.board;
  results = [];
  for (j = k = 0, len = ref.length; k < len; j = ++k) {
    row = ref[j];
    results.push(function () {
      var l, len1, results1;
      results1 = [];
      for (i = l = 0, len1 = row.length; l < len1; i = ++l) {
        item = row[i];
        fc(0.5);
        if (item === -1) {
          fc(1, 0, 0);
        }
        if (item === +1) {
          fc(1, 1, 0);
        }
        results1.push(circle(20 + 20 * i, 20 + 20 * j, 10));
      }
      return results1;
    }());
  }
  return results;
};

mousePressed = function mousePressed() {
  var col, k, len, play, ref, row;
  // human move
  col = Math.floor((mouseX - 10) / 20);
  ref = range(5, -1, -1);
  for (k = 0, len = ref.length; k < len; k++) {
    row = ref[k];
    if (state.board[row][col] === 0) {
      break;
    }
  }
  play = new Play(row, col);
  print(play);
  state = game.nextState(state, play);
  winner = game.winner(state);
  // computer move
  mcts.runSearch(state, 1);
  //print 'JSON'
  //print JSON.stringify mcts 
  //stats = mcts.getStats(state)
  play = mcts.bestPlay(state, "robust");
  state = game.nextState(state, play);
  //dump state.board
  winner = game.winner(state);
  if (winner) {
    return text(winner, width / 2, 150);
  }
};
//# sourceMappingURL=sketch.js.map
