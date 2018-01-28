'use strict';

// Generated by CoffeeScript 2.0.3
var CRLF, _generateTree, tree;

CRLF = "\n";

tree = null;

window.onload = function () {

  //console.log world = generateTree 20
  return tree = new Tree(world);
};

_generateTree = function generateTree(level) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var hsh, i, key, len, ref;
  if (level === 0) {
    return {};
  }
  hsh = {};
  ref = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (i = 0, len = ref.length; i < len; i++) {
    key = ref[i];
    hsh[title + key] = _generateTree(level - 1, title + key);
  }
  return hsh;
};
//# sourceMappingURL=sketch.js.map
