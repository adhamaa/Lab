'use strict';

// Generated by CoffeeScript 2.0.3
// no mouse events works
// rotate relative does not work
// contains does not work

// `
// function inside1(x,y, vs) {
//     // ray-casting algorithm based on
//     // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

//     //var x = point[0], y = point[1];

//     var inside = false;
//     for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
//         var xi = vs[i].x, yi = vs[i].y;
//         var xj = vs[j].x, yj = vs[j].y;

//         var intersect = ((yi > y) != (yj > y))
//             && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//         if (intersect) inside = !inside;
//     }

//     return inside;
// };
// `
var c, group, halfCircle, hc, i, inside, k, len, r, ref, rotation, x, y;

inside = function inside(x, y, vs) {
  var i, intersect, j, k, len, lst, res, xi, xj, yi, yj;
  res = false;
  lst = range(vs.length);
  lst.unshift(lst.pop());
  for (i = k = 0, len = lst.length; k < len; i = ++k) {
    j = lst[i];
    xi = vs[i].x;
    yi = vs[i].y;
    xj = vs[j].x;
    yj = vs[j].y;
    intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      res = !res;
    }
  }
  return res;
};

group = null;

rotation = 0.1;

hc = null;

r = new Rune({
  container: "body",
  width: 600,
  height: 600
});

halfCircle = function halfCircle(x, y, radius, cr, cg, cb, group) {
  var i, k, len, p, ref, v;
  p = r.polygon(x, y, group);
  p.fill(cr, cg, cb);
  ref = range(19);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    v = Rune.radians(i * 10);
    p.lineTo(radius * Math.cos(v), radius * Math.sin(v));
  }
  return p;
};

//doit = ->
group = r.group(300, 300);

c = r.circle(0, 0, 200, group);

c.fill(0, 255, 0);

ref = range(3);
for (k = 0, len = ref.length; k < len; k++) {
  i = ref[k];
  x = 200 * Math.cos(Rune.radians(i * 120));
  y = 200 * Math.sin(Rune.radians(i * 120));
  hc = halfCircle(x, y, 100, 255, 255, 0, group);
  halfCircle(x, y, -100, 255, 0, 0, group);
}

print(hc);

//for i in range -100,110,10
//	print i,inside i,10,hc.state.vectors 
r.on('update', function () {
  var child, l, len1, ref1, x0, y0;
  x0 = group.state.x;
  y0 = group.state.y;
  group.rotate(rotation, x0, y0);
  ref1 = group.children;
  for (i = l = 0, len1 = ref1.length; l < len1; i = ++l) {
    child = ref1[i];
    if (i > 0) {
      //if i==1 then print child.state
      var _child$state = child.state;
      x = _child$state.x;
      y = _child$state.y;
      if (i === 1) {
        print(child.state);
      }
      child.rotate(rotation, x, y);
    }
  }
  //if inside 510-x0-x,310-y0-y,child.state.vectors 
  //	child.fill 0,0,0
  //else
  //child.fill 255,255,255
  return rotation += 0.1;
});

r.on('mousemove', function (mouse) {
  return console.log('mousemove'); // happens not
});

r.on('draw', function () {
  return console.log('draw'); // happens not
});

//doit()
r.play();
//# sourceMappingURL=sketch.js.map
