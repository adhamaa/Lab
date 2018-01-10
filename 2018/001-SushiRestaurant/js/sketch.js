"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Generated by CoffeeScript 2.0.3
var CRLF, MAIL, SHOP, clr, update;

MAIL = "janchrister.nilsson@gmail.com";

SHOP = "FU Restaurang";

CRLF = "\n";

//CRLF = "<br/>"

// iOS visar inga radbrytningar.

// OBS: .cssText måste användas på iPhone 4s
window.onload = function () {
  var body, fn, i, item, len, send, table, total, w;
  w = window.innerWidth;
  body = document.getElementById("body");
  table = document.createElement("table");
  body.appendChild(table);
  fn = function fn(item) {
    var antal, b1, b2, div, id, pris, td0, td1, td2, text, tr;

    var _item = _slicedToArray(item, 4);

    id = _item[0];
    pris = _item[1];
    text = _item[2];
    antal = _item[3];

    b1 = document.createElement("input");
    b1.type = 'button';
    b1.value = text;
    b1.style.cssText = "font-size:100%; white-space:normal; width:100%; text-align:left";
    b2 = document.createElement("input");
    b2.type = 'button';
    b2.value = antal === 0 ? "" : antal;
    b2.id = id;
    b2.style.cssText = "font-size:100%; width:100%"; // height:80px; 
    b1.onclick = function () {
      return update(b2, item, +1);
    };
    b2.onclick = function () {
      if (b2.value > 0) {
        return update(b2, item, -1);
      }
    };
    tr = document.createElement("tr");
    td0 = document.createElement("td");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td0.style.cssText = "width:5%";
    td1.style.cssText = "width:85%";
    td2.style.cssText = "width:10%";
    table.appendChild(tr);
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    div = document.createElement("div");
    div.innerHTML = '<b>' + id + '</b><br>' + pris + ':-';
    td0.appendChild(div);
    td1.appendChild(b1);
    return td2.appendChild(b2);
  };
  for (i = 0, len = data.length; i < len; i++) {
    item = data[i];
    item.push(0);
    fn(item);
  }
  total = document.createElement("input");
  total.type = 'button';
  total.id = 'total';
  total.value = "0:-";
  total.style.cssText = "font-size:200%; width:50%";
  total.onclick = function () {
    return clr();
  };
  send = document.createElement("input");
  send.type = 'button';
  send.value = 'Skicka';
  send.style.cssText = "font-size:200%; width:50%";
  send.onclick = function () {
    var antal, id, j, len1, output, pris, s, t, text, u;
    total = document.getElementById("total");
    if (total.value === "0:-") {
      return;
    }
    t = 0;
    s = ''; // full text
    u = ''; // compact
    for (j = 0, len1 = data.length; j < len1; j++) {
      var _data$j = _slicedToArray(data[j], 4);

      id = _data$j[0];
      pris = _data$j[1];
      text = _data$j[2];
      antal = _data$j[3];

      if (antal > 0) {
        s += antal + ' x ' + id + ". " + text + CRLF;
        if (antal === 1) {
          u += id + CRLF;
        } else {
          u += antal + 'x' + id + CRLF;
        }
      }
      t += antal * pris;
    }
    if (s.length > 500) {
      s = u;
    }
    output = encodeURI("mailto:" + MAIL + "?&subject=Order till " + SHOP + "&body=" + s + CRLF + "Totalt " + t + " kr.");
    window.location.href = output;
    //console.log output
    return clr();
  };
  body.appendChild(send);
  return body.appendChild(total);
};

clr = function clr() {
  var button, i, item, len;
  for (i = 0, len = data.length; i < len; i++) {
    item = data[i];
    item[3] = 0;
    button = document.getElementById(item[0]);
    button.value = '';
  }
  return total.value = "0:-";
};

update = function update(b, item, delta) {
  var antal, i, id, len, pris, t, text, total;
  item[3] += delta;
  b.value = item[3] === 0 ? "" : item[3];
  t = 0;
  for (i = 0, len = data.length; i < len; i++) {
    var _data$i = _slicedToArray(data[i], 4);

    id = _data$i[0];
    pris = _data$i[1];
    text = _data$i[2];
    antal = _data$i[3];

    t += antal * pris;
  }
  total = document.getElementById("total");
  return total.value = t + ':-';
};
//# sourceMappingURL=sketch.js.map
