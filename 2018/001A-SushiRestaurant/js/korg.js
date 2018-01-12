"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.0.3
var Korg;

Korg = function () {
  function Korg() {
    _classCallCheck(this, Korg);

    this.table = null;
    this.branch = [];
    this.items = [];
    this.targets = {};
  }

  _createClass(Korg, [{
    key: "add",
    value: function add(item) {
      return this.items.push(item);
    }
  }, {
    key: "update0",
    value: function update0(b, item, delta) {
      item[1] += delta;
      return b.value = item[1] === 0 ? "" : item[1];
    }
  }, {
    key: "update1",
    value: function update1(b, items, source, delta, mapping) {
      var target;
      target = mapping[source];
      if (items[target] - delta >= 0) {
        items[target] -= delta;
        items[source] += delta;
        this.targets[target].innerHTML = items[target] === 0 ? "" : items[target];
        return b.value = items[source] === 0 ? "" : items[source];
      }
    }
  }, {
    key: "traverse",
    value: function traverse() {
      var mapping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var br = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      var antal, children, i, id, item, j, key, len, mapping1, pris, results, results1, subantal, title;
      if (false === goDeeper(this.branch, br)) {
        return;
      }
      if (level === 0) {
        results = [];
        for (i = j = 0, len = items.length; j < len; i = ++j) {
          item = items[i];
          var _item = item;

          var _item2 = _slicedToArray(_item, 6);

          id = _item2[0];
          antal = _item2[1];
          pris = _item2[2];
          title = _item2[3];
          children = _item2[4];
          mapping1 = _item2[5];

          this.addTitle0(item, id, pris, title, -1, 0, br.concat(i), antal);
          if (children) {
            results.push(this.traverse(mapping1, children, level + 1, br.concat(i)));
          } else {
            results.push(void 0);
          }
        }
        return results;
      } else if (level === 1) {
        results1 = [];
        for (key in items) {
          subantal = items[key];
          results1.push(this.addTitle1(items, key, '', 0, sushi[key][1], -1, 1, br.concat(i), subantal, mapping));
        }
        return results1;
      }
    }
  }, {
    key: "handleRow",
    value: function handleRow(b1, b2, b3) {
      var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var pris = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

      var td1, td2, td3, tr;
      tr = document.createElement("tr");
      //td0 = document.createElement "td"
      td1 = document.createElement("td");
      td2 = document.createElement("td");
      td3 = document.createElement("td");
      //td0.style.cssText = "width:5%"
      td1.style.cssText = "width:100%";
      td2.style.cssText = "width:5%";
      td3.style.cssText = "width:5%";
      this.table.appendChild(tr);
      //tr.appendChild td0
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      //div = document.createElement "div"
      //div.style.cssText = "font-size:70%"
      //if id != '' then div.innerHTML = '<b>' + id + '</b><br>' + pris + ':-'
      //td0.appendChild div
      td1.appendChild(b1);
      td2.appendChild(b2);
      return td3.appendChild(b3);
    }
  }, {
    key: "addTitle0",
    value: function addTitle0(item, id, pris, title, count, level, br, antal) {
      var _this = this;

      var b1, b2, b3, scount, v;
      if (count > 0) {
        scount = " (" + count + ")";
      } else {
        scount = "";
      }
      v = '........'.slice(0, 4 * level) + title + scount;
      b1 = makeButton(v);
      b1.style.textAlign = 'left';
      b1.branch = br;
      b1.onclick = function () {
        _this.branch = calcBranch(_this.branch, b1.branch);
        return updateTables();
      };
      v = antal === 0 ? "" : antal;
      b2 = makeButton(v, GREEN, BLACK);
      b2.onclick = function () {
        return _this.update0(b2, item, +1);
      };
      b3 = makeButton("-", RED, BLACK);
      b3.onclick = function () {
        if (b2.value > 0) {
          return _this.update0(b2, item, -1);
        }
      };
      return this.handleRow(b1, b2, b3);
    }
  }, {
    key: "addTitle1",
    value: function addTitle1(items, key, id, pris, title, count, level, br, antal, mapping) {
      var _this2 = this;

      var b1, b2, b3, v;
      b1 = document.createElement("div");
      b1.innerHTML = title;
      b1.style.cssText = "font-size:100%; white-space:normal; width:100%; text-align:right";
      v = antal === 0 ? "" : antal;
      if (mapping && key in mapping) {
        b2 = makeButton(v, GREEN, BLACK);
        b3 = makeButton('-', RED, BLACK);
      } else {
        b2 = makeDiv(v);
        b3 = makeDiv('');
        this.targets[key] = b2;
      }
      b2.onclick = function () {
        if (mapping) {
          return _this2.update1(b2, items, key, +1, mapping);
        }
      };
      b3.onclick = function () {
        if (mapping && b2.value > 0) {
          return _this2.update1(b2, items, key, -1, mapping);
        }
      };
      return this.handleRow(b1, b2, b3, id, pris);
    }
  }, {
    key: "rensa",
    value: function rensa() {
      return this.items = [];
    }
  }, {
    key: "send",
    value: function send() {
      var antal, children, id, j, key, len, output, pris, ref, s, ss, subantal, t, title, u;
      t = 0; // kr
      s = ''; // full text
      u = ''; // compact
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        var _ref$j = _slicedToArray(ref[j], 5);

        id = _ref$j[0];
        antal = _ref$j[1];
        pris = _ref$j[2];
        title = _ref$j[3];
        children = _ref$j[4];

        if (antal > 0) {
          ss = '';
          if (children && _.size(children) === 9) {
            for (key in children) {
              subantal = children[key];
              if (subantal === 1) {
                ss += ' ' + key;
              } else if (subantal > 1) {
                ss += ' ' + subantal + key;
              }
            }
          }
          s += antal + ' x ' + id + ". " + title + ss + CRLF;
          t += antal * pris;
          if (antal === 1) {
            u += id + ss + CRLF;
          } else {
            u += antal + 'x' + id + ss + CRLF;
          }
        }
      }
      if (t === 0) {
        return;
      }
      console.log(t);
      console.log(s);
      console.log(u);
      output = encodeURI("mailto:" + MAIL + "?&subject=Order till " + SHOP + "&body=" + s + CRLF + t + " kr");
      if (output.length > 2000) {
        output = encodeURI("mailto:" + MAIL + "?&subject=Order till " + SHOP + "&body=" + u + CRLF + t + " kr");
      }
      console.log(output.length);
      console.log(output);
      return window.open(output, '_blank');
    }
  }]);

  return Korg;
}();
//# sourceMappingURL=korg.js.map
