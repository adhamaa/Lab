"use strict";

// Generated by CoffeeScript 2.0.3
var CRLF, MAIL, SHOP, body, calc, korg, meny, rensa, send, updateTables;

MAIL = "janchrister.nilsson@gmail.com";

SHOP = "FU Restaurang";

CRLF = "\n";

body = null;

meny = null;

korg = null;

send = null;

rensa = null;

// Svart = Closed
// Vitt = Open
// Grön = incr
// Röd = decr

// iOS visar inga radbrytningar.
// OBS: .cssText måste användas på iPhone 4s
updateTables = function updateTables() {
  meny.table.remove();
  send.remove();
  korg.table.remove();
  meny.table = document.createElement("table");
  body.appendChild(meny.table);
  meny.traverse();
  body.appendChild(send);
  body.appendChild(rensa);
  korg.table = document.createElement("table");
  body.appendChild(korg.table);
  return korg.traverse();
};

calc = function calc(hash) {
  var key, res;
  res = 0;
  for (key in hash) {
    res += hash[key];
  }
  return res;
};

window.onload = function () {
  var w;
  w = window.innerWidth;
  body = document.getElementById("body");
  meny = new Menu();
  meny.items = menuItems;
  meny.table = document.createElement("table");
  meny.traverse();
  korg = new Korg();
  korg.table = document.createElement("table");
  korg.traverse(korg.items);
  send = document.createElement("input");
  send.type = 'button';
  send.value = 'Skicka';
  send.style.cssText = "font-size:200%; width:50%";
  send.onclick = function () {
    return korg.send();
  };
  rensa = document.createElement("input");
  rensa.type = 'button';
  rensa.value = 'Rensa';
  rensa.style.cssText = "font-size:200%; width:50%";
  rensa.onclick = function () {
    korg.rensa();
    return updateTables();
  };
  body.appendChild(meny.table);
  body.appendChild(send);
  body.appendChild(rensa);
  return body.appendChild(korg.table);
};
//# sourceMappingURL=sketch.js.map
