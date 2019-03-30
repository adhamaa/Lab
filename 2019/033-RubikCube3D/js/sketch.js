// Generated by CoffeeScript 2.3.2
var ALPHABET, COLORS, R, SWAPS, backup, change, cube, draw, i, last, mouseDragged, mousePressed, rot, setup;

COLORS = "#FFF #00F #FF0 #0F0 #FA5 #F00".split(' '); // W B Y G O R

ALPHABET = 'abcdefgh jklmnopq ABCDEFGH JKLMNOPQ STUVWXYZ stuvwxyz';

SWAPS = {
  W: 'aceg bdfh wjWN xkXO ylYP',
  B: 'lnpj moqk euAY fvBZ gwCS',
  Y: 'GECA HFDB nsJS otKT puLU',
  G: 'PNLJ QOMK EyaU FzbV GscW',
  O: 'YWUS ZXVT ajGJ hqHQ gpAP',
  R: 'suwy tvxz LClc MDmd NEne'
};

R = 60;

cube = (function() {
  var len, m, ref, results;
  ref = range(54);
  results = [];
  for (m = 0, len = ref.length; m < len; m++) {
    i = ref[m];
    results.push(Math.floor(i / 9));
  }
  return results;
})();

backup = cube.slice();

rot = [50, 50];

last = [0, 0];

change = function(letters) {
  var LETTER, a, b, c, d, j, k, l, len, len1, letter, m, n, w, word, words;
  cube = backup.slice();
  for (m = 0, len = letters.length; m < len; m++) {
    letter = letters[m];
    LETTER = letter.toUpperCase();
    if (!(LETTER in SWAPS)) {
      return;
    }
    words = SWAPS[LETTER].split(' ');
    for (n = 0, len1 = words.length; n < len1; n++) {
      word = words[n];
      [i, j, k, l] = (function() {
        var len2, o, results;
        results = [];
        for (o = 0, len2 = word.length; o < len2; o++) {
          w = word[o];
          results.push(ALPHABET.indexOf(w));
        }
        return results;
      })();
      [a, b, c, d] = LETTER === letter ? [l, i, j, k] : [j, k, l, i];
      [cube[a], cube[b], cube[c], cube[d]] = [cube[i], cube[j], cube[k], cube[l]];
    }
  }
};

setup = function() {
  return createCanvas(800, 800, WEBGL);
};

draw = function() {
  var index, j, len, m, ref, results, side;
  change(txt.value);
  rotateX(-rot[1] * 0.01);
  rotateY(-rot[0] * 0.01);
  background(0);
  index = 0;
  ref = range(6);
  results = [];
  for (m = 0, len = ref.length; m < len; m++) {
    side = ref[m];
    rotateX(HALF_PI * [1, 1, 1, 1, 0, 0][side]);
    rotateZ(HALF_PI * [0, 0, 0, 0, 1, 2][side]);
    results.push((function() {
      var len1, n, ref1, results1;
      ref1 = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [0, 0]];
      results1 = [];
      for (n = 0, len1 = ref1.length; n < len1; n++) {
        [i, j] = ref1[n];
        push();
        translate(2 * R * i, 2 * R, 2 * R * j);
        beginShape();
        fill(COLORS[cube[index]]);
        vertex(-R, R, -R);
        vertex(+R, R, -R);
        vertex(+R, R, +R);
        vertex(-R, R, +R);
        endShape(CLOSE);
        pop();
        results1.push(index += 1);
      }
      return results1;
    })());
  }
  return results;
};

mousePressed = function() {
  return last = [mouseX, mouseY];
};

mouseDragged = function() {
  rot = [rot[0] + mouseX - last[0], rot[1] + mouseY - last[1]];
  return last = [mouseX, mouseY];
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLFlBQUEsRUFBQSxZQUFBLEVBQUEsR0FBQSxFQUFBOztBQUFBLE1BQUEsR0FBUywrQkFBK0IsQ0FBQyxLQUFoQyxDQUFzQyxHQUF0QyxFQUFUOztBQUNBLFFBQUEsR0FBVzs7QUFDWCxLQUFBLEdBQ0M7RUFBQSxDQUFBLEVBQUcsMEJBQUg7RUFDQSxDQUFBLEVBQUcsMEJBREg7RUFFQSxDQUFBLEVBQUcsMEJBRkg7RUFHQSxDQUFBLEVBQUcsMEJBSEg7RUFJQSxDQUFBLEVBQUcsMEJBSkg7RUFLQSxDQUFBLEVBQUc7QUFMSDs7QUFNRCxDQUFBLEdBQUk7O0FBRUosSUFBQTs7QUFBYTtBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7NEJBQUwsSUFBRztFQUFFLENBQUE7Ozs7QUFDYixNQUFBLEdBQVMsSUFBSSxDQUFDLEtBQUwsQ0FBQTs7QUFDVCxHQUFBLEdBQU0sQ0FBQyxFQUFELEVBQUksRUFBSjs7QUFDTixJQUFBLEdBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSDs7QUFFUCxNQUFBLEdBQVMsUUFBQSxDQUFDLE9BQUQsQ0FBQTtBQUNSLE1BQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUE7RUFBQSxJQUFBLEdBQU8sTUFBTSxDQUFDLEtBQVAsQ0FBQTtFQUNQLEtBQUEseUNBQUE7O0lBQ0MsTUFBQSxHQUFTLE1BQU0sQ0FBQyxXQUFQLENBQUE7SUFDVCxJQUFHLENBQUEsQ0FBQSxNQUFBLElBQWMsS0FBZCxDQUFIO0FBQTRCLGFBQTVCOztJQUNBLEtBQUEsR0FBUSxLQUFNLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBZCxDQUFvQixHQUFwQjtJQUNSLEtBQUEseUNBQUE7O01BQ0MsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQUE7O0FBQWdDO1FBQUEsS0FBQSx3Q0FBQTs7dUJBQW5CLFFBQVEsQ0FBQyxPQUFULENBQWlCLENBQWpCO1FBQW1CLENBQUE7OztNQUNoQyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBQSxHQUFlLE1BQUEsS0FBVSxNQUFiLEdBQXlCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUF6QixHQUF3QyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVA7TUFDcEQsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFOLEVBQVMsSUFBSyxDQUFBLENBQUEsQ0FBZCxFQUFpQixJQUFLLENBQUEsQ0FBQSxDQUF0QixFQUF5QixJQUFLLENBQUEsQ0FBQSxDQUE5QixDQUFBLEdBQW9DLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBTixFQUFTLElBQUssQ0FBQSxDQUFBLENBQWQsRUFBaUIsSUFBSyxDQUFBLENBQUEsQ0FBdEIsRUFBeUIsSUFBSyxDQUFBLENBQUEsQ0FBOUI7SUFIckM7RUFKRDtBQUZROztBQVdULEtBQUEsR0FBUSxRQUFBLENBQUEsQ0FBQTtTQUFHLFlBQUEsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXNCLEtBQXRCO0FBQUg7O0FBRVIsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0FBQ04sTUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQTtFQUFBLE1BQUEsQ0FBTyxHQUFHLENBQUMsS0FBWDtFQUNBLE9BQUEsQ0FBUSxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUwsR0FBVSxJQUFsQjtFQUNBLE9BQUEsQ0FBUSxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUwsR0FBVSxJQUFsQjtFQUNBLFVBQUEsQ0FBVyxDQUFYO0VBRUEsS0FBQSxHQUFRO0FBQ1I7QUFBQTtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsT0FBQSxDQUFRLE9BQUEsR0FBVSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFjLENBQUEsSUFBQSxDQUFoQztJQUNBLE9BQUEsQ0FBUSxPQUFBLEdBQVUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBYyxDQUFBLElBQUEsQ0FBaEM7OztBQUNBO0FBQUE7TUFBQSxLQUFBLHdDQUFBO1FBQUksQ0FBQyxDQUFELEVBQUcsQ0FBSDtRQUNILElBQUEsQ0FBQTtRQUNBLFNBQUEsQ0FBVSxDQUFBLEdBQUUsQ0FBRixHQUFJLENBQWQsRUFBaUIsQ0FBQSxHQUFFLENBQW5CLEVBQXNCLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBMUI7UUFFQSxVQUFBLENBQUE7UUFDQSxJQUFBLENBQUssTUFBTyxDQUFBLElBQUssQ0FBQSxLQUFBLENBQUwsQ0FBWjtRQUNBLE1BQUEsQ0FBTyxDQUFDLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBQyxDQUFiO1FBQ0EsTUFBQSxDQUFPLENBQUMsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFDLENBQWI7UUFDQSxNQUFBLENBQU8sQ0FBQyxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQUMsQ0FBYjtRQUNBLE1BQUEsQ0FBTyxDQUFDLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBQyxDQUFiO1FBQ0EsUUFBQSxDQUFTLEtBQVQ7UUFFQSxHQUFBLENBQUE7c0JBQ0EsS0FBQSxJQUFTO01BYlYsQ0FBQTs7O0VBSEQsQ0FBQTs7QUFQTTs7QUF5QlAsWUFBQSxHQUFlLFFBQUEsQ0FBQSxDQUFBO1NBQUcsSUFBQSxHQUFPLENBQUMsTUFBRCxFQUFRLE1BQVI7QUFBVjs7QUFFZixZQUFBLEdBQWUsUUFBQSxDQUFBLENBQUE7RUFDZCxHQUFBLEdBQU0sQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFKLEdBQVMsTUFBVCxHQUFnQixJQUFLLENBQUEsQ0FBQSxDQUF0QixFQUEwQixHQUFJLENBQUEsQ0FBQSxDQUFKLEdBQVMsTUFBVCxHQUFnQixJQUFLLENBQUEsQ0FBQSxDQUEvQztTQUNOLElBQUEsR0FBTyxDQUFDLE1BQUQsRUFBUSxNQUFSO0FBRk8iLCJzb3VyY2VzQ29udGVudCI6WyJDT0xPUlMgPSBcIiNGRkYgIzAwRiAjRkYwICMwRjAgI0ZBNSAjRjAwXCIuc3BsaXQgJyAnICMgVyBCIFkgRyBPIFJcclxuQUxQSEFCRVQgPSAnYWJjZGVmZ2ggamtsbW5vcHEgQUJDREVGR0ggSktMTU5PUFEgU1RVVldYWVogc3R1dnd4eXonIFxyXG5TV0FQUyA9IFxyXG5cdFc6ICdhY2VnIGJkZmggd2pXTiB4a1hPIHlsWVAnIFxyXG5cdEI6ICdsbnBqIG1vcWsgZXVBWSBmdkJaIGd3Q1MnXHJcblx0WTogJ0dFQ0EgSEZEQiBuc0pTIG90S1QgcHVMVSdcclxuXHRHOiAnUE5MSiBRT01LIEV5YVUgRnpiViBHc2NXJ1xyXG5cdE86ICdZV1VTIFpYVlQgYWpHSiBocUhRIGdwQVAnXHJcblx0UjogJ3N1d3kgdHZ4eiBMQ2xjIE1EbWQgTkVuZScgIFxyXG5SID0gNjBcclxuXHJcbmN1YmUgPSAoaS8vOSBmb3IgaSBpbiByYW5nZSA1NClcclxuYmFja3VwID0gY3ViZS5zbGljZSgpXHJcbnJvdCA9IFs1MCw1MF1cclxubGFzdCA9IFswLDBdXHJcblxyXG5jaGFuZ2UgPSAobGV0dGVycykgLT4gXHJcblx0Y3ViZSA9IGJhY2t1cC5zbGljZSgpXHJcblx0Zm9yIGxldHRlciBpbiBsZXR0ZXJzXHJcblx0XHRMRVRURVIgPSBsZXR0ZXIudG9VcHBlckNhc2UoKSBcclxuXHRcdGlmIExFVFRFUiBub3Qgb2YgU1dBUFMgdGhlbiByZXR1cm4gXHJcblx0XHR3b3JkcyA9IFNXQVBTW0xFVFRFUl0uc3BsaXQgJyAnXHJcblx0XHRmb3Igd29yZCBpbiB3b3Jkc1xyXG5cdFx0XHRbaSxqLGssbF0gPSAoQUxQSEFCRVQuaW5kZXhPZiB3IGZvciB3IGluIHdvcmQpXHJcblx0XHRcdFthLGIsYyxkXSA9IGlmIExFVFRFUiA9PSBsZXR0ZXIgdGhlbiBbbCxpLGosa10gZWxzZSBbaixrLGwsaV1cclxuXHRcdFx0W2N1YmVbYV0sY3ViZVtiXSxjdWJlW2NdLGN1YmVbZF1dID0gW2N1YmVbaV0sY3ViZVtqXSxjdWJlW2tdLGN1YmVbbF1dXHJcblxyXG5zZXR1cCA9IC0+IGNyZWF0ZUNhbnZhcyA4MDAsODAwLCBXRUJHTFxyXG5cclxuZHJhdyA9IC0+XHJcblx0Y2hhbmdlIHR4dC52YWx1ZVxyXG5cdHJvdGF0ZVggLXJvdFsxXSAqIDAuMDFcclxuXHRyb3RhdGVZIC1yb3RbMF0gKiAwLjAxXHJcblx0YmFja2dyb3VuZCAwXHJcblxyXG5cdGluZGV4ID0gMFxyXG5cdGZvciBzaWRlIGluIHJhbmdlIDZcclxuXHRcdHJvdGF0ZVggSEFMRl9QSSAqIFsxLDEsMSwxLDAsMF1bc2lkZV1cclxuXHRcdHJvdGF0ZVogSEFMRl9QSSAqIFswLDAsMCwwLDEsMl1bc2lkZV1cclxuXHRcdGZvciBbaSxqXSBpbiBbWy0xLC0xXSxbMCwtMV0sWzEsLTFdLFsxLDBdLFsxLDFdLFswLDFdLFstMSwxXSxbLTEsMF0sWzAsMF1dXHJcblx0XHRcdHB1c2goKVxyXG5cdFx0XHR0cmFuc2xhdGUgMipSKmksIDIqUiwgMipSKmpcclxuXHJcblx0XHRcdGJlZ2luU2hhcGUoKVxyXG5cdFx0XHRmaWxsIENPTE9SU1tjdWJlW2luZGV4XV1cclxuXHRcdFx0dmVydGV4IC1SLFIsLVJcclxuXHRcdFx0dmVydGV4ICtSLFIsLVJcclxuXHRcdFx0dmVydGV4ICtSLFIsK1JcclxuXHRcdFx0dmVydGV4IC1SLFIsK1JcclxuXHRcdFx0ZW5kU2hhcGUoQ0xPU0UpXHJcblxyXG5cdFx0XHRwb3AoKVxyXG5cdFx0XHRpbmRleCArPSAxXHJcblxyXG5tb3VzZVByZXNzZWQgPSAtPiBsYXN0ID0gW21vdXNlWCxtb3VzZVldXHJcblxyXG5tb3VzZURyYWdnZWQgPSAtPlxyXG5cdHJvdCA9IFtyb3RbMF0gKyBtb3VzZVgtbGFzdFswXSwgcm90WzFdICsgbW91c2VZLWxhc3RbMV1dXHJcblx0bGFzdCA9IFttb3VzZVgsbW91c2VZXSJdfQ==
//# sourceURL=C:\Lab\2019\033-RubikCube3D\coffee\sketch.coffee