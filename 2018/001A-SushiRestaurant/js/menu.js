'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.3.2
var Menu;

Menu = function () {
  function Menu(items1) {
    var table = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0];

    _classCallCheck(this, Menu);

    this.items = items1;
    this.table = table;
    this.branch = branch;
  }

  _createClass(Menu, [{
    key: 'rensa',
    value: function rensa() {
      return this.table.innerHTML = "";
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.branch = [0];
    }
  }, {
    key: 'traverse',
    value: function traverse() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items;
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var br = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var children, i, item, j, k, l, len, len1, len2, results, title, x;
      if (false === goDeeper(this.branch, br)) {
        return;
      }
      if (level === 0) {
        for (i = j = 0, len = items.length; j < len; i = ++j) {
          item = items[i];
          var _item = item;

          var _item2 = _toArray(_item);

          title = _item2[0];
          children = _item2.slice(1);

          this.addTitle(null, '', 0, title, children.length, level, br.concat(i), i);
          this.traverse(children, level + 1, br.concat(i));
        }
      }
      if (level === 1) {
        for (i = k = 0, len1 = items.length; k < len1; i = ++k) {
          item = items[i];
          if (true) {
            var _item3 = item; //@branch.length == 1 or i==@branch[1]

            var _item4 = _toArray(_item3);

            title = _item4[0];
            children = _item4.slice(1);

            this.addTitle(null, '', 0, title, 0, level, br.concat(i), i);
            this.traverse(children, level + 1, br.concat(i));
          }
        }
      }
      if (level === 2) {
        results = [];
        for (l = 0, len2 = items.length; l < len2; l++) {
          item = items[l];
          results.push(function () {
            var len3, m, results1;
            results1 = [];
            for (m = 0, len3 = item.length; m < len3; m++) {
              x = item[m];
              results1.push(this.addTitle(x, x[0], x[2], x[3], sum(x[4]), level, br, i));
            }
            return results1;
          }.call(this));
        }
        return results;
      }
    }
  }, {
    key: 'handleRow',
    value: function handleRow(b1, b2) {
      var tr;
      tr = document.createElement("tr");
      if (!b2) {
        b2 = makeDiv('');
      }
      addCell(tr, b1, 100);
      addCell(tr, b2, 10);
      return this.table.appendChild(tr);
    }
  }, {
    key: 'addTitle',
    value: function addTitle(item, id, pris, title, count, level, br, i) {
      var _this = this;

      var b1, b2, scount, v;
      if (count > 0 && level > 1) {
        scount = ' (' + count + ')';
      } else {
        scount = "";
      }
      v = title + scount;
      if (id !== '') {
        v = id + '. ' + v;
      }
      if (level === 2) {
        b1 = makeButton(v, YELLOW, BLACK);
        b2 = makeDiv(pris + "kr");
        b2.style.textAlign = 'right';
      } else if (this.branch[level] === i) {
        b1 = makeButton(v, WHITE, BLACK);
        b2 = makeDiv('');
      } else {
        b1 = makeButton(v, BLACK, WHITE);
        b2 = makeDiv('');
      }
      b1.style.textAlign = 'left';
      b1.branch = br;
      b1.style.paddingLeft = 10 * level + "px";
      b1.onclick = function () {
        var newitem;
        if (level === 0 || level === 1) {
          _this.branch = calcBranch(_this.branch, b1.branch);
        }
        if (level === 2) {
          newitem = _.clone(item);
          newitem[4] = _.clone(item[4]);
          korg.add(newitem);
          _this.branch = [0];
        }
        return updateTables();
      };
      return this.handleRow(b1, b2);
    }
  }]);

  return Menu;
}();
//# sourceMappingURL=menu.js.map
