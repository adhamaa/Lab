// Generated by CoffeeScript 2.4.1
//FILE = [1,480,640,'../game001.mp4',[[140,176],[323,173],[146,548],[332,546]]
//FILE = [2,640,480,'../game005.mp4',[[106,149],[452,152],[107,320],[452,323]]]
//FILE = [2,640,480,'../game006.mp4',[[134,168],[502,171],[136,350],[499,353]]]
var FILE, H, LITTERA, NAME, PUNKTER, TYPE, W, button, candidates, canvas, col, colDist, colDist3x3, compare3x3, content, current, draw, edgePoints, edges, fillContent, get3x3, index, k, l, len, len1, lerp2, linje, myget, p0, p1, p2, p3, p4, p5, p6, p7, playing, preload, pretty, ref, ref1, row, setup, sqColor, square0, squarePoints, toggleVid, values, video;

FILE = [2, 640, 480, '../game007.mp4', [[144, 160], [513, 171], [140, 341], [506, 356]]];

//FILE = [2,640,480,'../game008.mp4',[[184,171],[470,173],[183,312],[466,316]]]
candidates = {};

candidates.g8f6 = 'a2a3 a2a4 b2b3 b2b4 c2b3 c2a4 c2c3 c2d2 c2d1 c2e2 c1d2 c4c5 e3d4 e3e4 g2g3 g2g4 h2h3 h2h4 f1e2 f3d4 f3e5 f3g5 f3h4 f3g1 f3d2 h1g1 e1d1 e1d2 e1e2';

[TYPE, W, H, NAME, PUNKTER] = FILE;

// p4 = createVector 136,177
// p5 = createVector 414,176
// p6 = createVector 136,315
// p7 = createVector 414,314
// p4 = createVector 107,148
// p5 = createVector 453,152
// p6 = createVector 108,321
// p7 = createVector 451,323
LITTERA = 'pnbrqk KQRBNP'; // (black WHITE)

playing = true;

video = null;

button = null;

index = 0;

canvas = null;

values = [];

current = [];

// 36 each of these
edgePoints = []; // [x,y] in pixels

edges = []; // 9 points of [r,g,b] each


// 64 each of these
squarePoints = []; // [x,y] in pixels

content = []; // -6..6 piece and color

pretty = []; // a8 b8 ... g1 h1

sqColor = '1010101001010101101010100101010110101010010101011010101001010101';

square0 = []; // 9 points of [r,g,b] each

// square1 = [] # 9 points of [r,g,b] each
p0 = p1 = p2 = p3 = null;

p4 = p5 = p6 = p7 = null;

ref = "87654321";
for (k = 0, len = ref.length; k < len; k++) {
  row = ref[k];
  ref1 = "abcdefgh";
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    col = ref1[l];
    pretty.push(col + row);
  }
}

fillContent = function() {
  var ch, len2, m, ref2, results;
  ref2 = "rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR";
  results = [];
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    ch = ref2[m];
    results.push(content.push(-6 + LITTERA.indexOf(ch)));
  }
  return results;
};

lerp2 = (p, q, amt) => {
  return createVector(lerp(p.x, q.x, amt), lerp(p.y, q.y, amt));
};

preload = function() {
  return video = createVideo(NAME);
};

setup = () => {
  var i, j, len2, m, p10, p11, p8, p9, q0, q1, ref2, results, w0;
  canvas = createCanvas(W, H + 100);
  pixelDensity(1);
  textAlign(CENTER, CENTER);
  textSize(20);
  button = createButton('play');
  video.hide();
  button.mousePressed(toggleVid);
  video.loop();
  fillContent();
  console.log(content);
  p4 = createVector(PUNKTER[0][0], PUNKTER[0][1]);
  p5 = createVector(PUNKTER[1][0], PUNKTER[1][1]);
  p6 = createVector(PUNKTER[2][0], PUNKTER[2][1]);
  p7 = createVector(PUNKTER[3][0], PUNKTER[3][1]);
  if (TYPE === 1) {
    p8 = lerp2(p4, p5, -0.8);
    p9 = lerp2(p4, p5, 1.8);
    p10 = lerp2(p6, p7, -0.8);
    p11 = lerp2(p6, p7, 1.8);
  }
  if (TYPE === 2) {
    p8 = lerp2(p4, p6, -0.8);
    p9 = lerp2(p4, p6, 1.8);
    p10 = lerp2(p5, p7, -0.8);
    p11 = lerp2(p5, p7, 1.8);
  }
  p0 = lerp2(p8, p10, -0.15);
  p1 = lerp2(p9, p11, -0.15);
  p2 = lerp2(p8, p10, 1.15);
  p3 = lerp2(p9, p11, 1.15);
  ref2 = range(10);
  results = [];
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    q0 = lerp2(p0, p1, 1 / 20 + i / 10);
    q1 = lerp2(p2, p3, 1 / 20 + i / 10);
    results.push((function() {
      var len3, n, ref3, results1;
      ref3 = range(10);
      results1 = [];
      for (n = 0, len3 = ref3.length; n < len3; n++) {
        j = ref3[n];
        w0 = lerp2(q0, q1, 1 / 20 + j / 10);
        w0.x = round(w0.x);
        w0.y = round(w0.y);
        if ((i === 0 || i === 9) || (j === 0 || j === 9)) {
          results1.push(edgePoints.push([w0.x, w0.y]));
        } else {
          results1.push(squarePoints.push([w0.x, w0.y]));
        }
      }
      return results1;
    })());
  }
  return results;
};

toggleVid = function() {
  if (playing) {
    video.pause();
  } else {
    video.play();
  }
  return playing = !playing;
};

linje = function(p, q) {
  return line(p.x, p.y, q.x, q.y);
};

colDist = function([r1, g1, b1], [r2, g2, b2]) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
};

// Maximum color difference of 3x3 points
colDist3x3 = function(lst0, lst1) {
  var b0, b1, g0, g1, i, len2, m, r0, r1, ref2, res;
  res = 0;
  ref2 = range(9);
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    [r0, g0, b0] = lst0[i];
    [r1, g1, b1] = lst1[i];
    res += Math.abs(r0 - r1) + Math.abs(g0 - g1) + Math.abs(b0 - b1);
  }
  return res;
};

myget = function(x, y) {
  var d;
  d = pixelDensity(); // laptop=2
  index = (x + y * width) * 4;
  return [pixels[index + 0], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
};

get3x3 = function(x, y) {
  var i, j, len2, len3, m, n, ref2, ref3, result;
  result = [];
  ref2 = [-1, 0, 1];
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    ref3 = [-1, 0, 1];
    for (n = 0, len3 = ref3.length; n < len3; n++) {
      j = ref3[n];
      result.push(myget(x + 3 * i, y + 3 * j));
    }
  }
  return result;
};

// return list of 0..63
compare3x3 = function(sq0, sq1) {
  var i, len2, limit, m, ref2, result, value, x, y;
  result = [];
  values = [];
  ref2 = range(64);
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    limit = 400;
    value = colDist3x3(sq0[i], sq1[i]);
    // if -1 != 'c2 c4 d5 d7'.indexOf pretty[i] 
    // 	console.log pretty[i], value
    values.push(value);
    //console.log pretty[i],value
    if (limit <= value) {
      fill(255, 0, 0);
      result.push(i);
      [x, y] = squarePoints[i];
      circle(x, y, 10);
    }
  }
  return result;
};

draw = function() {
  var edgeCount, edges1, i, len2, len3, len4, len5, len6, len7, m, n, o, r, ref2, res, result, results, s, square1, t, u, value, x, y;
  bg(1);
  image(video, 0, 0, W, H);
  noStroke();
  fill(0);
  text(Math.round(frameRate()), W / 2, H + 50);
  // linje p4,p5
  // linje p5,p7
  // linje p6,p7
  // linje p4,p6
  // return
  loadPixels();
  if (frameCount === 20) {
    for (m = 0, len2 = edgePoints.length; m < len2; m++) {
      [x, y] = edgePoints[m];
      edges.push(get3x3(x, y));
    }
    console.log(edges);
  }
  edges1 = [];
  stroke(255, 255, 0);
  for (n = 0, len3 = edgePoints.length; n < len3; n++) {
    [x, y] = edgePoints[n];
    edges1.push(get3x3(x, y));
  }
  if (edges.length > 0) {
    edgeCount = 0;
    fill(255, 255, 0);
    ref2 = range(edges.length);
    for (o = 0, len4 = ref2.length; o < len4; o++) {
      i = ref2[o];
      value = colDist3x3(edges[i], edges1[i]);
      if (1200 < value) {
        edgeCount++;
        [x, y] = edgePoints[i];
        circle(x, y, 10);
      }
    }
    if (edgeCount === 0) {
      square1 = [];
      for (r = 0, len5 = squarePoints.length; r < len5; r++) {
        [x, y] = squarePoints[r];
        square1.push(get3x3(x, y));
      }
      if (square0.length === 64) {
        result = compare3x3(square0, square1);
        s = '';
        if (result.length > 0) {
          current = result;
        }
        for (t = 0, len6 = result.length; t < len6; t++) {
          res = result[t];
          s += pretty[res] + ' ' + values[res] + '|';
        }
        //s += pretty[res] + ' '
        if (s !== '') {
          console.log(s);
        }
      }
      square0 = square1;
    }
  }
  sw(1);
  stroke(255, 0, 0);
  results = [];
  for (u = 0, len7 = current.length; u < len7; u++) {
    i = current[u];
    [x, y] = squarePoints[i];
    results.push(circle(x, y, 10));
  }
  return results;
};

//mousePressed = () -> console.log mouseX,mouseY

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7QUFBQSxJQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxVQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQSxXQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQTs7QUFHQSxJQUFBLEdBQU8sQ0FBQyxDQUFELEVBQUcsR0FBSCxFQUFPLEdBQVAsRUFBVyxnQkFBWCxFQUE0QixDQUFDLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBRCxFQUFXLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBWCxFQUFxQixDQUFDLEdBQUQsRUFBSyxHQUFMLENBQXJCLEVBQStCLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBL0IsQ0FBNUIsRUFIUDs7O0FBTUEsVUFBQSxHQUFhLENBQUE7O0FBQ2IsVUFBVSxDQUFDLElBQVgsR0FBa0I7O0FBRWxCLENBQUMsSUFBRCxFQUFNLENBQU4sRUFBUSxDQUFS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QixNQUFBLENBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxFQUFYO0VBRkQsQ0FBQTs7QUFuRE07O0FBN0pQIiwic291cmNlc0NvbnRlbnQiOlsiI0ZJTEUgPSBbMSw0ODAsNjQwLCcuLi9nYW1lMDAxLm1wNCcsW1sxNDAsMTc2XSxbMzIzLDE3M10sWzE0Niw1NDhdLFszMzIsNTQ2XV1cclxuI0ZJTEUgPSBbMiw2NDAsNDgwLCcuLi9nYW1lMDA1Lm1wNCcsW1sxMDYsMTQ5XSxbNDUyLDE1Ml0sWzEwNywzMjBdLFs0NTIsMzIzXV1dXHJcbiNGSUxFID0gWzIsNjQwLDQ4MCwnLi4vZ2FtZTAwNi5tcDQnLFtbMTM0LDE2OF0sWzUwMiwxNzFdLFsxMzYsMzUwXSxbNDk5LDM1M11dXVxyXG5GSUxFID0gWzIsNjQwLDQ4MCwnLi4vZ2FtZTAwNy5tcDQnLFtbMTQ0LDE2MF0sWzUxMywxNzFdLFsxNDAsMzQxXSxbNTA2LDM1Nl1dXVxyXG4jRklMRSA9IFsyLDY0MCw0ODAsJy4uL2dhbWUwMDgubXA0JyxbWzE4NCwxNzFdLFs0NzAsMTczXSxbMTgzLDMxMl0sWzQ2NiwzMTZdXV1cclxuXHJcbmNhbmRpZGF0ZXMgPSB7fVxyXG5jYW5kaWRhdGVzLmc4ZjYgPSAnYTJhMyBhMmE0IGIyYjMgYjJiNCBjMmIzIGMyYTQgYzJjMyBjMmQyIGMyZDEgYzJlMiBjMWQyIGM0YzUgZTNkNCBlM2U0IGcyZzMgZzJnNCBoMmgzIGgyaDQgZjFlMiBmM2Q0IGYzZTUgZjNnNSBmM2g0IGYzZzEgZjNkMiBoMWcxIGUxZDEgZTFkMiBlMWUyJ1xyXG5cclxuW1RZUEUsVyxILE5BTUUsUFVOS1RFUl0gPSBGSUxFXHJcblx0XHQjIHA0ID0gY3JlYXRlVmVjdG9yIDEzNiwxNzdcclxuXHRcdCMgcDUgPSBjcmVhdGVWZWN0b3IgNDE0LDE3NlxyXG5cdFx0IyBwNiA9IGNyZWF0ZVZlY3RvciAxMzYsMzE1XHJcblx0XHQjIHA3ID0gY3JlYXRlVmVjdG9yIDQxNCwzMTRcclxuXHRcdCMgcDQgPSBjcmVhdGVWZWN0b3IgMTA3LDE0OFxyXG5cdFx0IyBwNSA9IGNyZWF0ZVZlY3RvciA0NTMsMTUyXHJcblx0XHQjIHA2ID0gY3JlYXRlVmVjdG9yIDEwOCwzMjFcclxuXHRcdCMgcDcgPSBjcmVhdGVWZWN0b3IgNDUxLDMyM1xyXG5cclxuTElUVEVSQSA9ICdwbmJycWsgS1FSQk5QJyAjIChibGFjayBXSElURSlcclxuXHJcbnBsYXlpbmcgPSB0cnVlXHJcbnZpZGVvID0gbnVsbFxyXG5idXR0b24gPSBudWxsXHJcbmluZGV4ID0gMFxyXG5jYW52YXMgPSBudWxsXHJcbnZhbHVlcyA9IFtdXHJcbmN1cnJlbnQgPSBbXVxyXG5cclxuIyAzNiBlYWNoIG9mIHRoZXNlXHJcbmVkZ2VQb2ludHMgPSBbXSAjIFt4LHldIGluIHBpeGVsc1xyXG5lZGdlcyA9IFtdICMgOSBwb2ludHMgb2YgW3IsZyxiXSBlYWNoXHJcblxyXG4jIDY0IGVhY2ggb2YgdGhlc2Vcclxuc3F1YXJlUG9pbnRzID0gW10gIyBbeCx5XSBpbiBwaXhlbHNcclxuY29udGVudCA9IFtdICMgLTYuLjYgcGllY2UgYW5kIGNvbG9yXHJcbnByZXR0eSA9IFtdICMgYTggYjggLi4uIGcxIGgxXHJcbnNxQ29sb3IgPSAnMTAxMDEwMTAwMTAxMDEwMTEwMTAxMDEwMDEwMTAxMDExMDEwMTAxMDAxMDEwMTAxMTAxMDEwMTAwMTAxMDEwMSdcclxuc3F1YXJlMCA9IFtdICMgOSBwb2ludHMgb2YgW3IsZyxiXSBlYWNoXHJcbiMgc3F1YXJlMSA9IFtdICMgOSBwb2ludHMgb2YgW3IsZyxiXSBlYWNoXHJcblxyXG5wMCA9IHAxID0gcDIgPSBwMyA9IG51bGxcclxucDQgPSBwNSA9IHA2ID0gcDcgPSBudWxsXHJcblxyXG5mb3Igcm93IGluIFwiODc2NTQzMjFcIlxyXG5cdGZvciBjb2wgaW4gXCJhYmNkZWZnaFwiXHJcblx0XHRwcmV0dHkucHVzaCBjb2wrcm93XHJcblxyXG5maWxsQ29udGVudCA9ICgpIC0+XHJcblx0Zm9yIGNoIGluIFwicm5icWtibnJwcHBwcHBwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUFBQUFBQUFBSTkJRS0JOUlwiXHJcblx0XHRjb250ZW50LnB1c2ggLTYgKyBMSVRURVJBLmluZGV4T2YgY2hcclxuXHJcbmxlcnAyID0gKHAsIHEsIGFtdCkgPT4gY3JlYXRlVmVjdG9yKGxlcnAocC54LHEueCxhbXQpLCBsZXJwKHAueSxxLnksYW10KSlcclxuXHJcbnByZWxvYWQgPSAtPiB2aWRlbyA9IGNyZWF0ZVZpZGVvIE5BTUUgXHJcblxyXG5zZXR1cCA9ICgpID0+XHJcblx0Y2FudmFzID0gY3JlYXRlQ2FudmFzIFcsSCsxMDBcclxuXHJcblx0cGl4ZWxEZW5zaXR5KDEpXHJcblxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0dGV4dFNpemUgMjBcclxuXHJcblx0YnV0dG9uID0gY3JlYXRlQnV0dG9uICdwbGF5J1xyXG5cdHZpZGVvLmhpZGUoKVxyXG5cdGJ1dHRvbi5tb3VzZVByZXNzZWQgdG9nZ2xlVmlkIFxyXG5cclxuXHR2aWRlby5sb29wKClcclxuXHJcblx0ZmlsbENvbnRlbnQoKVxyXG5cdGNvbnNvbGUubG9nIGNvbnRlbnRcclxuXHJcblx0cDQgPSBjcmVhdGVWZWN0b3IgUFVOS1RFUlswXVswXSxQVU5LVEVSWzBdWzFdXHJcblx0cDUgPSBjcmVhdGVWZWN0b3IgUFVOS1RFUlsxXVswXSxQVU5LVEVSWzFdWzFdXHJcblx0cDYgPSBjcmVhdGVWZWN0b3IgUFVOS1RFUlsyXVswXSxQVU5LVEVSWzJdWzFdXHJcblx0cDcgPSBjcmVhdGVWZWN0b3IgUFVOS1RFUlszXVswXSxQVU5LVEVSWzNdWzFdXHJcblx0XHJcblx0aWYgVFlQRSA9PSAxXHJcblx0XHRwOCA9IGxlcnAyKHA0LHA1LC0wLjgpXHJcblx0XHRwOSA9IGxlcnAyKHA0LHA1LCAxLjgpXHJcblx0XHRwMTAgPSBsZXJwMihwNixwNywtMC44KVxyXG5cdFx0cDExID0gbGVycDIocDYscDcsIDEuOClcclxuXHJcblx0aWYgVFlQRSA9PSAyXHJcblx0XHRwOCA9IGxlcnAyKHA0LHA2LC0wLjgpXHJcblx0XHRwOSA9IGxlcnAyKHA0LHA2LCAxLjgpXHJcblx0XHRwMTAgPSBsZXJwMihwNSxwNywtMC44KVxyXG5cdFx0cDExID0gbGVycDIocDUscDcsIDEuOClcclxuXHJcblx0cDAgPSBsZXJwMihwOCxwMTAsLTAuMTUpXHJcblx0cDEgPSBsZXJwMihwOSxwMTEsLTAuMTUpXHJcblx0cDIgPSBsZXJwMihwOCxwMTAsMS4xNSlcclxuXHRwMyA9IGxlcnAyKHA5LHAxMSwxLjE1KVxyXG5cclxuXHRmb3IgaSBpbiByYW5nZSAxMFxyXG5cdFx0cTAgPSBsZXJwMiBwMCxwMSwxLzIwK2kvMTBcclxuXHRcdHExID0gbGVycDIgcDIscDMsMS8yMCtpLzEwXHJcblx0XHRmb3IgaiBpbiByYW5nZSAxMFxyXG5cdFx0XHR3MCA9IGxlcnAyIHEwLHExLDEvMjArai8xMFxyXG5cdFx0XHR3MC54ID0gcm91bmQgdzAueFxyXG5cdFx0XHR3MC55ID0gcm91bmQgdzAueVxyXG5cdFx0XHRpZiBpIGluIFswLDldIG9yIGogaW4gWzAsOV1cclxuXHRcdFx0XHRlZGdlUG9pbnRzLnB1c2ggW3cwLngsdzAueV1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHNxdWFyZVBvaW50cy5wdXNoIFt3MC54LHcwLnldXHJcblxyXG50b2dnbGVWaWQgPSAoKSAtPlx0XHJcblx0aWYgcGxheWluZyBcclxuXHRcdHZpZGVvLnBhdXNlKClcclxuXHRlbHNlXHJcblx0XHR2aWRlby5wbGF5KClcclxuXHRwbGF5aW5nID0gbm90IHBsYXlpbmdcclxuXHJcbmxpbmplID0gKHAscSkgLT4gbGluZSBwLngscC55LHEueCxxLnlcclxuXHRcdFxyXG5jb2xEaXN0ID0gKFtyMSxnMSxiMV0sW3IyLGcyLGIyXSkgLT4gTWF0aC5hYnMocjEtcjIpICsgTWF0aC5hYnMoZzEtZzIpICsgTWF0aC5hYnMoYjEtYjIpXHJcblxyXG4jIE1heGltdW0gY29sb3IgZGlmZmVyZW5jZSBvZiAzeDMgcG9pbnRzXHJcbmNvbERpc3QzeDMgPSAobHN0MCxsc3QxKSAtPiBcclxuXHRyZXMgPSAwXHJcblx0Zm9yIGkgaW4gcmFuZ2UgOVx0XHJcblx0XHRbcjAsZzAsYjBdID0gbHN0MFtpXVxyXG5cdFx0W3IxLGcxLGIxXSA9IGxzdDFbaV1cclxuXHRcdHJlcyArPSBNYXRoLmFicyhyMC1yMSkgKyBNYXRoLmFicyhnMC1nMSkgKyBNYXRoLmFicyhiMC1iMSlcclxuXHRyZXNcclxuXHJcbm15Z2V0ID0gKHgseSkgLT5cclxuXHRkID0gcGl4ZWxEZW5zaXR5KCkgIyBsYXB0b3A9MlxyXG5cdGluZGV4ID0gKHggKyB5ICogd2lkdGgpICogNFxyXG5cdFtwaXhlbHNbaW5kZXgrMF0scGl4ZWxzW2luZGV4KzFdLHBpeGVsc1tpbmRleCsyXSxwaXhlbHNbaW5kZXgrM11dICMgcmdiYVxyXG5cclxuZ2V0M3gzID0gKHgseSkgLT5cclxuXHRyZXN1bHQgPSBbXVxyXG5cdGZvciBpIGluIFstMSwwLDFdXHJcblx0XHRmb3IgaiBpbiBbLTEsMCwxXVxyXG5cdFx0XHRyZXN1bHQucHVzaCBteWdldCB4KzMqaSx5KzMqalxyXG5cdHJlc3VsdFxyXG5cclxuIyByZXR1cm4gbGlzdCBvZiAwLi42M1xyXG5jb21wYXJlM3gzID0gKHNxMCxzcTEpIC0+XHJcblx0cmVzdWx0ID0gW11cclxuXHR2YWx1ZXMgPSBbXVxyXG5cdGZvciBpIGluIHJhbmdlIDY0XHJcblx0XHRsaW1pdCA9IDQwMFxyXG5cdFx0dmFsdWUgPSBjb2xEaXN0M3gzIHNxMFtpXSxzcTFbaV1cclxuXHRcdCMgaWYgLTEgIT0gJ2MyIGM0IGQ1IGQ3Jy5pbmRleE9mIHByZXR0eVtpXSBcclxuXHRcdCMgXHRjb25zb2xlLmxvZyBwcmV0dHlbaV0sIHZhbHVlXHJcblx0XHR2YWx1ZXMucHVzaCB2YWx1ZVxyXG5cdFx0I2NvbnNvbGUubG9nIHByZXR0eVtpXSx2YWx1ZVxyXG5cdFx0aWYgbGltaXQgPD0gdmFsdWVcclxuXHRcdFx0ZmlsbCAyNTUsMCwwXHJcblx0XHRcdHJlc3VsdC5wdXNoIGlcclxuXHRcdFx0W3gseV0gPSBzcXVhcmVQb2ludHNbaV1cclxuXHRcdFx0Y2lyY2xlIHgseSwxMFxyXG5cdHJlc3VsdFxyXG5cclxuZHJhdyA9IC0+XHJcblx0YmcgMVxyXG5cdGltYWdlIHZpZGVvLDAsMCxXLEhcclxuXHRub1N0cm9rZSgpXHJcblx0ZmlsbCAwXHJcblx0dGV4dCBNYXRoLnJvdW5kKGZyYW1lUmF0ZSgpKSxXLzIsSCs1MFxyXG5cclxuXHQjIGxpbmplIHA0LHA1XHJcblx0IyBsaW5qZSBwNSxwN1xyXG5cdCMgbGluamUgcDYscDdcclxuXHQjIGxpbmplIHA0LHA2XHJcblx0IyByZXR1cm5cclxuXHJcblx0bG9hZFBpeGVscygpXHJcblxyXG5cdGlmIGZyYW1lQ291bnQgPT0gMjBcclxuXHRcdGZvciBbeCx5XSBpbiBlZGdlUG9pbnRzXHJcblx0XHRcdGVkZ2VzLnB1c2ggZ2V0M3gzIHgseVxyXG5cdFx0Y29uc29sZS5sb2cgZWRnZXNcclxuXHJcblx0ZWRnZXMxID0gW11cclxuXHRzdHJva2UgMjU1LDI1NSwwXHJcblx0Zm9yIFt4LHldIGluIGVkZ2VQb2ludHNcclxuXHRcdGVkZ2VzMS5wdXNoIGdldDN4MyB4LHlcclxuXHJcblx0aWYgZWRnZXMubGVuZ3RoID4gMFxyXG5cdFx0ZWRnZUNvdW50ID0gMFxyXG5cdFx0ZmlsbCAyNTUsMjU1LDBcclxuXHRcdGZvciBpIGluIHJhbmdlIGVkZ2VzLmxlbmd0aFxyXG5cdFx0XHR2YWx1ZSA9ICBjb2xEaXN0M3gzIGVkZ2VzW2ldLGVkZ2VzMVtpXVxyXG5cdFx0XHRpZiAxMjAwIDwgdmFsdWVcclxuXHRcdFx0XHRlZGdlQ291bnQrK1xyXG5cdFx0XHRcdFt4LHldID0gZWRnZVBvaW50c1tpXVxyXG5cdFx0XHRcdGNpcmNsZSB4LHksMTBcclxuXHJcblx0XHRpZiBlZGdlQ291bnQgPT0gMFxyXG5cdFx0XHRzcXVhcmUxID0gW11cclxuXHRcdFx0Zm9yIFt4LHldIGluIHNxdWFyZVBvaW50c1xyXG5cdFx0XHRcdHNxdWFyZTEucHVzaCBnZXQzeDMgeCx5XHJcblx0XHRcdGlmIHNxdWFyZTAubGVuZ3RoID09IDY0XHJcblx0XHRcdFx0cmVzdWx0ID0gY29tcGFyZTN4MyBzcXVhcmUwLHNxdWFyZTFcclxuXHRcdFx0XHRzID0gJydcclxuXHRcdFx0XHRpZiByZXN1bHQubGVuZ3RoID4gMCB0aGVuIGN1cnJlbnQgPSByZXN1bHRcclxuXHRcdFx0XHRmb3IgcmVzIGluIHJlc3VsdFxyXG5cdFx0XHRcdFx0cyArPSBwcmV0dHlbcmVzXSArICcgJyArIHZhbHVlc1tyZXNdICsgJ3wnXHJcblx0XHRcdFx0XHQjcyArPSBwcmV0dHlbcmVzXSArICcgJ1xyXG5cdFx0XHRcdGlmIHMgIT0gJycgdGhlbiBjb25zb2xlLmxvZyBzXHJcblx0XHRcdHNxdWFyZTAgPSBzcXVhcmUxXHJcblxyXG5cdHN3IDFcclxuXHRzdHJva2UgMjU1LDAsMFxyXG5cdGZvciBpIGluIGN1cnJlbnRcclxuXHRcdFt4LHldID0gc3F1YXJlUG9pbnRzW2ldXHJcblx0XHRjaXJjbGUgeCx5LDEwXHJcblxyXG4jbW91c2VQcmVzc2VkID0gKCkgLT4gY29uc29sZS5sb2cgbW91c2VYLG1vdXNlWSJdfQ==
//# sourceURL=c:\Lab\2019\108-ChessCamera\coffee\sketch.coffee