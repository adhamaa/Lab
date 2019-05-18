"use strict";

// Generated by CoffeeScript 2.3.2
var CRLF, clear, info, korg, meny, send, updateTables;

CRLF = "\n";

info = null;

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
  meny.rensa();
  meny.traverse();
  korg.rensa();
  korg.traverse();
  return korg.updateTotal();
};

window.onload = function () {
  var help;
  help = new Help();
  meny = new Menu(menuItems);
  meny.table = document.getElementById("meny");
  korg = new Korg();
  korg.table = document.getElementById("korg");
  send = document.getElementById("send");
  send.onclick = function () {
    return korg.send();
  };
  clear = document.getElementById("clear");
  clear.onclick = function () {
    meny.clear();
    korg.clear();
    return updateTables();
  };
  return updateTables();
};
//# sourceMappingURL=sketch.js.map
