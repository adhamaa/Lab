"use strict";

// Generated by CoffeeScript 2.0.3
var CRLF, MAIL, SHOP, calc, clear, korg, meny, send, updateTables;

MAIL = "janchrister.nilsson@gmail.com";

SHOP = "FU Restaurang";

CRLF = "\n";

//body = null
meny = null;

korg = null;

send = null;

clear = null;

// Svart = Closed
// Vitt = Open
// Grön = incr
// Röd = decr
// Gul = valbar maträtt

// iOS visar inga radbrytningar.
// OBS: .cssText måste användas på iPhone 4s
updateTables = function updateTables() {
  var removeHelp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (removeHelp) {
    document.getElementById("help").innerHTML = '';
  }
  meny.rensa();
  meny.traverse();
  korg.rensa();
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
  //body = document.getElementById "body"
  meny = new Menu();
  meny.items = menuItems;
  meny.table = document.getElementById("meny");
  korg = new Korg();
  korg.table = document.getElementById("korg");
  send = document.getElementById("send");
  send.onclick = function () {
    return korg.send();
  };
  clear = document.getElementById("clear");
  clear.onclick = function () {
    korg.clear();
    return updateTables();
  };
  return updateTables(false);
};
//# sourceMappingURL=sketch.js.map
