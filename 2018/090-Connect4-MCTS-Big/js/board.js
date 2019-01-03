'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.3.2
var Board, M, N, WINSIZE, getRandom;

M = 9; // antal rader

N = 10; // antal kolumner

WINSIZE = 4; // number of markers in a row

getRandom = function getRandom(b) {
  return int(b * Math.random());
};

Board = function () {
  function Board() {
    var moves = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Board);

    var digit, j, len;
    this.clear();
    for (j = 0, len = moves.length; j < len; j++) {
      digit = moves[j];
      this.move(parseInt(digit));
    }
  }

  _createClass(Board, [{
    key: 'copy',
    value: function copy() {
      var b;
      b = new Board();
      b.board = this.board.slice();
      b.moves = this.moves.slice();
      return b;
    }
  }, {
    key: 'rand',
    value: function rand() {
      var b, i;
      return _.sample(function () {
        var j, len, ref, results;
        ref = this.board;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          b = ref[i];
          if (b.length < M) {
            results.push(i);
          }
        }
        return results;
      }.call(this));
    }
  }, {
    key: 'clear',
    value: function clear() {
      var i;
      this.moves = [];
      return this.board = function () {
        var j, len, ref, results;
        ref = range(N);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          i = ref[j];
          results.push('');
        }
        return results;
      }();
    }
  }, {
    key: 'move',
    value: function move(m) {
      this.board[m] += this.nextMarker();
      return this.moves.push(m);
    }
  }, {
    key: 'nextBoard',
    value: function nextBoard(play) {
      var b;
      b = this.copy();
      b.move(play);
      return b;
    }
  }, {
    key: 'undo',
    value: function undo() {
      var index;
      index = this.moves.pop();
      return this.board[index] = this.board[index].slice(0, this.board[index].length - 1);
    }
  }, {
    key: 'lastMarker',
    value: function lastMarker() {
      return 'OX'[this.moves.length % 2];
    }
  }, {
    key: 'nextMarker',
    value: function nextMarker() {
      return 'XO'[this.moves.length % 2];
    }
  }, {
    key: 'calc',
    value: function calc(dr, dc) {
      var _this = this;

      var col, helper, marker, row;
      helper = function helper() {
        var c, r, res;
        r = row + dr;
        c = col + dc;
        res = 0;
        while (0 <= r && r < M && 0 <= c && c < N && r < _this.board[c].length && _this.board[c][r] === marker) {
          res++;
          r += dr;
          c += dc;
        }
        return res;
      };
      marker = this.lastMarker();
      col = _.last(this.moves);
      row = this.board[col].length - 1;
      return 1 + helper() >= WINSIZE;
    }
  }, {
    key: 'done',
    value: function done() {
      var dc, dr, j, k, len, len1, ref, ref1;
      if (this.moves.length <= 2 * (WINSIZE - 1)) {
        return false;
      }
      ref = [-1, 0, 1];
      for (j = 0, len = ref.length; j < len; j++) {
        dr = ref[j];
        ref1 = [-1, 0, 1];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          dc = ref1[k];
          if (dr !== 0 || dc !== 0) {
            if (this.calc(dr, dc)) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: 'draw',
    value: function draw() {
      return this.moves.length === M * N; // OBS! Kan vara vinst!
    }
  }, {
    key: 'legalPlays',
    value: function legalPlays() {
      var col, j, len, ref, results;
      ref = range(N);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        col = ref[j];
        if (this.board[col].length < M) {
          results.push(col);
        }
      }
      return results;
    }
  }, {
    key: 'winner',
    value: function winner() {
      if (this.draw()) {
        return 0.5;
      }
      if (this.done()) {
        return [1, 0][this.moves.length % 2];
      }
      return null;
    }
  }]);

  return Board;
}();
//# sourceMappingURL=board.js.map
