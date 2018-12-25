'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.3.2
var Board, getRandom;

getRandom = function getRandom(b) {
  return int(b * Math.random());
};

Board = function () {
  function Board() {
    var moves = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Board);

    // @board,@moves
    var digit, k, len;
    this.clear();
    for (k = 0, len = moves.length; k < len; k++) {
      digit = moves[k];
      this.move(int(digit));
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
        var k, len, ref, results;
        ref = this.board;
        results = [];
        for (i = k = 0, len = ref.length; k < len; i = ++k) {
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
      this.moves = [];
      return this.board = ['', '', '', '', '', '', ''];
    }
  }, {
    key: 'move',
    value: function move(m) {
      this.board[m] += this.next_marker();
      return this.moves.push(m);
    }
  }, {
    key: 'undo',
    value: function undo() {
      return this.board[this.moves.pop()].pop();
    }
  }, {
    key: 'last_marker',
    value: function last_marker() {
      return 'OX'[this.moves.length % 2];
    }
  }, {
    key: 'next_marker',
    value: function next_marker() {
      return 'XO'[this.moves.length % 2];
    }
  }, {
    key: 'calc_columns',
    value: function calc_columns() {
      var count, i, m, marker, row;
      m = _.last(this.moves);
      row = this.board[m];
      i = row.length - 2;
      if (i < 2) {
        return false; // 50% more pos/sec
      }
      marker = this.last_marker();
      count = 1;
      while (row[i] === marker && i >= 0) {
        count++;
        i--;
      }
      return count === 4;
    }
  }, {
    key: 'calc_rows',
    value: function calc_rows() {
      var count, i, k, l, len, len1, m, marker, n, ref, ref1;
      marker = this.last_marker();
      m = _.last(this.moves);
      count = 1;
      n = this.board[m].length - 1;
      ref = range(m + 1, N);
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        if (n >= this.board[i].length || this.board[i][n] !== marker) {
          break;
        }
        count++;
      }
      ref1 = range(m - 1, -1, -1);
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        i = ref1[l];
        if (n >= this.board[i].length || this.board[i][n] !== marker) {
          break;
        }
        count++;
      }
      return count >= 4;
    }
  }, {
    key: 'helper',
    value: function helper(di, dj, marker, m, n) {
      var i, j, res;
      i = m + di;
      j = n + dj;
      res = 0;
      while (0 <= j && j < M && 0 <= i && i < N && j < this.board[i].length && this.board[i][j] === marker) {
        res++;
        i += di;
        j += dj;
      }
      return res;
    }
  }, {
    key: 'calc_diagonal',
    value: function calc_diagonal(dj) {
      var count, m, marker, n;
      marker = this.last_marker();
      m = _.last(this.moves);
      count = 1;
      n = this.board[m].length - 1;
      count += this.helper(+1, +dj, marker, m, n);
      count += this.helper(-1, -dj, marker, m, n);
      return count >= 4;
    }
  }, {
    key: 'done',
    value: function done() {
      if (this.calc_columns()) {
        return true;
      }
      if (this.calc_rows()) {
        return true;
      }
      if (this.calc_diagonal(+1)) {
        return true;
      }
      if (this.calc_diagonal(-1)) {
        return true;
      }
      return false;
    }
  }]);

  return Board;
}();
//# sourceMappingURL=board.js.map
