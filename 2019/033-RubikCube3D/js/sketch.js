// Generated by CoffeeScript 2.3.2
var ALPHABET, COLORS, R, SWAPS, change, cube, draw, setup;

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

cube = null;

change = function(letters) {
  var LETTER, a, b, c, d, i, j, k, l, len, len1, letter, m, n, w, word, words;
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
  var i, j, k, len, m, ref, results, side, x, z;
  change(txt.value);
  background(0);
  orbitControl(4, 4);
  ref = range(6);
  results = [];
  for (m = 0, len = ref.length; m < len; m++) {
    side = ref[m];
    rotateX(HALF_PI * [1, 1, 1, 1, 0, 0][side]);
    rotateZ(HALF_PI * [0, 0, 0, 0, 1, 2][side]);
    results.push((function() {
      var len1, len2, n, o, ref1, ref2, results1;
      ref1 = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [0, 0]];
      results1 = [];
      for (k = n = 0, len1 = ref1.length; n < len1; k = ++n) {
        [i, j] = ref1[k];
        translate(2 * R * i, 2 * R, 2 * R * j);
        beginShape();
        fill(COLORS[cube[9 * side + k]]);
        ref2 = [[-R, -R], [R, -R], [R, R], [-R, R]];
        for (o = 0, len2 = ref2.length; o < len2; o++) {
          [x, z] = ref2[o];
          vertex(x, R, z);
        }
        endShape();
        results1.push(translate(-2 * R * i, -2 * R, -2 * R * j));
      }
      return results1;
    })());
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBOztBQUFBLE1BQUEsR0FBUywrQkFBK0IsQ0FBQyxLQUFoQyxDQUFzQyxHQUF0QyxFQUFUOztBQUNBLFFBQUEsR0FBVzs7QUFDWCxLQUFBLEdBQ0M7RUFBQSxDQUFBLEVBQUcsMEJBQUg7RUFDQSxDQUFBLEVBQUcsMEJBREg7RUFFQSxDQUFBLEVBQUcsMEJBRkg7RUFHQSxDQUFBLEVBQUcsMEJBSEg7RUFJQSxDQUFBLEVBQUcsMEJBSkg7RUFLQSxDQUFBLEVBQUc7QUFMSDs7QUFNRCxDQUFBLEdBQUk7O0FBRUosSUFBQSxHQUFPOztBQUVQLE1BQUEsR0FBUyxRQUFBLENBQUMsT0FBRCxDQUFBO0FBQ1IsTUFBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUE7RUFBQSxJQUFBOztBQUFhO0FBQUE7SUFBQSxLQUFBLHFDQUFBOzs4QkFBTCxJQUFHO0lBQUUsQ0FBQTs7O0VBQ2IsS0FBQSx5Q0FBQTs7SUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLFdBQVAsQ0FBQTtJQUNULElBQUcsQ0FBQSxDQUFBLE1BQUEsSUFBYyxLQUFkLENBQUg7QUFBNEIsYUFBNUI7O0lBQ0EsS0FBQSxHQUFRLEtBQU0sQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUFkLENBQW9CLEdBQXBCO0lBQ1IsS0FBQSx5Q0FBQTs7TUFDQyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBQTs7QUFBZ0M7UUFBQSxLQUFBLHdDQUFBOzt1QkFBbkIsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsQ0FBakI7UUFBbUIsQ0FBQTs7O01BQ2hDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFBLEdBQWUsTUFBQSxLQUFVLE1BQWIsR0FBeUIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQXpCLEdBQXdDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUDtNQUNwRCxDQUFDLElBQUssQ0FBQSxDQUFBLENBQU4sRUFBUyxJQUFLLENBQUEsQ0FBQSxDQUFkLEVBQWlCLElBQUssQ0FBQSxDQUFBLENBQXRCLEVBQXlCLElBQUssQ0FBQSxDQUFBLENBQTlCLENBQUEsR0FBb0MsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFOLEVBQVMsSUFBSyxDQUFBLENBQUEsQ0FBZCxFQUFpQixJQUFLLENBQUEsQ0FBQSxDQUF0QixFQUF5QixJQUFLLENBQUEsQ0FBQSxDQUE5QjtJQUhyQztFQUpEO0FBRlE7O0FBV1QsS0FBQSxHQUFRLFFBQUEsQ0FBQSxDQUFBO1NBQUcsWUFBQSxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBc0IsS0FBdEI7QUFBSDs7QUFFUixJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDTixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBO0VBQUEsTUFBQSxDQUFPLEdBQUcsQ0FBQyxLQUFYO0VBQ0EsVUFBQSxDQUFXLENBQVg7RUFDQSxZQUFBLENBQWEsQ0FBYixFQUFlLENBQWY7QUFDQTtBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxPQUFBLENBQVEsT0FBQSxHQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLENBQWMsQ0FBQSxJQUFBLENBQWhDO0lBQ0EsT0FBQSxDQUFRLE9BQUEsR0FBVSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxDQUFjLENBQUEsSUFBQSxDQUFoQzs7O0FBQ0E7QUFBQTtNQUFBLEtBQUEsZ0RBQUE7UUFBSSxDQUFDLENBQUQsRUFBRyxDQUFIO1FBQ0gsU0FBQSxDQUFVLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBZCxFQUFpQixDQUFBLEdBQUUsQ0FBbkIsRUFBc0IsQ0FBQSxHQUFFLENBQUYsR0FBSSxDQUExQjtRQUNBLFVBQUEsQ0FBQTtRQUNBLElBQUEsQ0FBSyxNQUFPLENBQUEsSUFBSyxDQUFBLENBQUEsR0FBRSxJQUFGLEdBQU8sQ0FBUCxDQUFMLENBQVo7QUFDYTtRQUFBLEtBQUEsd0NBQUE7VUFBSSxDQUFDLENBQUQsRUFBRyxDQUFIO1VBQWpCLE1BQUEsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVg7UUFBYTtRQUNiLFFBQUEsQ0FBQTtzQkFDQSxTQUFBLENBQVUsQ0FBQyxDQUFELEdBQUcsQ0FBSCxHQUFLLENBQWYsRUFBa0IsQ0FBQyxDQUFELEdBQUcsQ0FBckIsRUFBd0IsQ0FBQyxDQUFELEdBQUcsQ0FBSCxHQUFLLENBQTdCO01BTkQsQ0FBQTs7O0VBSEQsQ0FBQTs7QUFKTSIsInNvdXJjZXNDb250ZW50IjpbIkNPTE9SUyA9IFwiI0ZGRiAjMDBGICNGRjAgIzBGMCAjRkE1ICNGMDBcIi5zcGxpdCAnICcgIyBXIEIgWSBHIE8gUlxyXG5BTFBIQUJFVCA9ICdhYmNkZWZnaCBqa2xtbm9wcSBBQkNERUZHSCBKS0xNTk9QUSBTVFVWV1hZWiBzdHV2d3h5eicgXHJcblNXQVBTID0gXHJcblx0VzogJ2FjZWcgYmRmaCB3aldOIHhrWE8geWxZUCcgXHJcblx0QjogJ2xucGogbW9xayBldUFZIGZ2QlogZ3dDUydcclxuXHRZOiAnR0VDQSBIRkRCIG5zSlMgb3RLVCBwdUxVJ1xyXG5cdEc6ICdQTkxKIFFPTUsgRXlhVSBGemJWIEdzY1cnXHJcblx0TzogJ1lXVVMgWlhWVCBhakdKIGhxSFEgZ3BBUCdcclxuXHRSOiAnc3V3eSB0dnh6IExDbGMgTURtZCBORW5lJyAgXHJcblIgPSA2MFxyXG5cclxuY3ViZSA9IG51bGxcclxuXHJcbmNoYW5nZSA9IChsZXR0ZXJzKSAtPiBcclxuXHRjdWJlID0gKGkvLzkgZm9yIGkgaW4gcmFuZ2UgNTQpXHJcblx0Zm9yIGxldHRlciBpbiBsZXR0ZXJzXHJcblx0XHRMRVRURVIgPSBsZXR0ZXIudG9VcHBlckNhc2UoKSBcclxuXHRcdGlmIExFVFRFUiBub3Qgb2YgU1dBUFMgdGhlbiByZXR1cm4gXHJcblx0XHR3b3JkcyA9IFNXQVBTW0xFVFRFUl0uc3BsaXQgJyAnXHJcblx0XHRmb3Igd29yZCBpbiB3b3Jkc1xyXG5cdFx0XHRbaSxqLGssbF0gPSAoQUxQSEFCRVQuaW5kZXhPZiB3IGZvciB3IGluIHdvcmQpXHJcblx0XHRcdFthLGIsYyxkXSA9IGlmIExFVFRFUiA9PSBsZXR0ZXIgdGhlbiBbbCxpLGosa10gZWxzZSBbaixrLGwsaV1cclxuXHRcdFx0W2N1YmVbYV0sY3ViZVtiXSxjdWJlW2NdLGN1YmVbZF1dID0gW2N1YmVbaV0sY3ViZVtqXSxjdWJlW2tdLGN1YmVbbF1dXHJcblxyXG5zZXR1cCA9IC0+IGNyZWF0ZUNhbnZhcyA4MDAsODAwLCBXRUJHTFxyXG5cclxuZHJhdyA9IC0+XHJcblx0Y2hhbmdlIHR4dC52YWx1ZVxyXG5cdGJhY2tncm91bmQgMFxyXG5cdG9yYml0Q29udHJvbCA0LDRcclxuXHRmb3Igc2lkZSBpbiByYW5nZSA2XHJcblx0XHRyb3RhdGVYIEhBTEZfUEkgKiBbMSwxLDEsMSwwLDBdW3NpZGVdXHJcblx0XHRyb3RhdGVaIEhBTEZfUEkgKiBbMCwwLDAsMCwxLDJdW3NpZGVdXHJcblx0XHRmb3IgW2ksal0sayBpbiBbWy0xLC0xXSxbMCwtMV0sWzEsLTFdLFsxLDBdLFsxLDFdLFswLDFdLFstMSwxXSxbLTEsMF0sWzAsMF1dXHJcblx0XHRcdHRyYW5zbGF0ZSAyKlIqaSwgMipSLCAyKlIqalxyXG5cdFx0XHRiZWdpblNoYXBlKClcclxuXHRcdFx0ZmlsbCBDT0xPUlNbY3ViZVs5KnNpZGUra11dXHJcblx0XHRcdHZlcnRleCB4LFIseiBmb3IgW3gsel0gaW4gW1stUiwtUl0sW1IsLVJdLFtSLFJdLFstUixSXV1cdFx0XHRcdFxyXG5cdFx0XHRlbmRTaGFwZSgpXHJcblx0XHRcdHRyYW5zbGF0ZSAtMipSKmksIC0yKlIsIC0yKlIqaiJdfQ==
//# sourceURL=C:\Lab\2019\033-RubikCube3D\coffee\sketch.coffee