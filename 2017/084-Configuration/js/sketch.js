// Generated by CoffeeScript 1.11.1
var params, selects, setup, spara, url;

params = {};

selects = [];

spara = function(s) {
  var arr;
  arr = s.split(' ');
  return params[arr[0]] = arr.slice(1).join('|');
};

url = 'http://christernilsson.github.io/Lab/2017/084-Configuration/index.html?hh=08|09|10|11|12|13|14|15|16|17&mm=00|05|10|15|20|25|30|35|40|45|50|55&su=Ma|En|Sv|Fy|Fr&da=Mo|Tu|We|Th|Fr&lo=A123|B234|C345|D456&fields=da|hh|mm|hh|mm|su|lo';

setup = function() {
  var alt, btnFinal, button, field, i, j, k, len, len1, ref, ref1, sel;
  createCanvas(400, 400);
  params = getURLParams();
  print(params);
  ref = params.fields.split('|');
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    field = ref[i];
    print(field);
    sel = createSelect();
    sel.position(300 + i * 40, 10);
    selects.push(sel);
    ref1 = params[field].split('|');
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      alt = ref1[k];
      sel.option(alt);
    }
  }
  button = createButton('+');
  button.position(270, 10);
  button.mousePressed(function() {
    var res;
    res = (function() {
      var l, len2, results;
      results = [];
      for (l = 0, len2 = selects.length; l < len2; l++) {
        sel = selects[l];
        results.push(sel.selected());
      }
      return results;
    })();
    res = res.join(' ');
    return textarea.value += res + '\n';
  });
  btnFinal = createButton('final');
  btnFinal.position(270, 30);
  return btnFinal.mousePressed(function() {
    var lines, res;
    res = (function() {
      var l, len2, ref2, results;
      ref2 = textarea.value.split('\n');
      results = [];
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        lines = ref2[l];
        results.push(lines.replace(/ /g, ''));
      }
      return results;
    })();
    return final.value = res.join(';');
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLElBQUE7O0FBQUEsTUFBQSxHQUFTOztBQUNULE9BQUEsR0FBVTs7QUFFVixLQUFBLEdBQVEsU0FBQyxDQUFEO0FBQ1AsTUFBQTtFQUFBLEdBQUEsR0FBTSxDQUFDLENBQUMsS0FBRixDQUFRLEdBQVI7U0FDTixNQUFPLENBQUEsR0FBSSxDQUFBLENBQUEsQ0FBSixDQUFQLEdBQWlCLEdBQUksU0FBSSxDQUFDLElBQVQsQ0FBYyxHQUFkO0FBRlY7O0FBSVIsR0FBQSxHQUFNOztBQUVOLEtBQUEsR0FBUSxTQUFBO0FBQ1AsTUFBQTtFQUFBLFlBQUEsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCO0VBT0EsTUFBQSxHQUFTLFlBQUEsQ0FBQTtFQUNULEtBQUEsQ0FBTSxNQUFOO0FBRUE7QUFBQSxPQUFBLDZDQUFBOztJQUNDLEtBQUEsQ0FBTSxLQUFOO0lBQ0EsR0FBQSxHQUFNLFlBQUEsQ0FBQTtJQUNOLEdBQUcsQ0FBQyxRQUFKLENBQWEsR0FBQSxHQUFJLENBQUEsR0FBRSxFQUFuQixFQUFzQixFQUF0QjtJQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsR0FBYjtBQUNBO0FBQUEsU0FBQSx3Q0FBQTs7TUFDQyxHQUFHLENBQUMsTUFBSixDQUFXLEdBQVg7QUFERDtBQUxEO0VBT0EsTUFBQSxHQUFTLFlBQUEsQ0FBYSxHQUFiO0VBQ1QsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsR0FBaEIsRUFBb0IsRUFBcEI7RUFDQSxNQUFNLENBQUMsWUFBUCxDQUFvQixTQUFBO0FBQ25CLFFBQUE7SUFBQSxHQUFBOztBQUFPO1dBQUEsMkNBQUE7O3FCQUFBLEdBQUcsQ0FBQyxRQUFKLENBQUE7QUFBQTs7O0lBQ1AsR0FBQSxHQUFNLEdBQUcsQ0FBQyxJQUFKLENBQVMsR0FBVDtXQUNOLFFBQVEsQ0FBQyxLQUFULElBQWtCLEdBQUEsR0FBTTtFQUhMLENBQXBCO0VBS0EsUUFBQSxHQUFXLFlBQUEsQ0FBYSxPQUFiO0VBQ1gsUUFBUSxDQUFDLFFBQVQsQ0FBa0IsR0FBbEIsRUFBc0IsRUFBdEI7U0FDQSxRQUFRLENBQUMsWUFBVCxDQUFzQixTQUFBO0FBQ3JCLFFBQUE7SUFBQSxHQUFBOztBQUFPO0FBQUE7V0FBQSx3Q0FBQTs7cUJBQUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEVBQXBCO0FBQUE7OztXQUNQLEtBQUssQ0FBQyxLQUFOLEdBQWMsR0FBRyxDQUFDLElBQUosQ0FBUyxHQUFUO0VBRk8sQ0FBdEI7QUEzQk8iLCJzb3VyY2VzQ29udGVudCI6WyIjIEVkaXRvciBmw7ZyIFVSTC1wYXJhbWV0cmFyLlxyXG4jIFQgZXggMDgyLUNhbGVuZGFyIENsb2NrXHJcbiMgSW5kYXRhOiBwYXJhbWV0cmFyIHNvbSBzdHlyIGFsdGVybmF0aXZlbi5cclxuIyBVdGRhdGE6IFVSTC1zdHLDpG5nIHRpbGwgbsOkc3RhIHByb2dyYW1cclxuXHJcbnBhcmFtcyA9IHt9XHJcbnNlbGVjdHMgPSBbXVxyXG5cclxuc3BhcmEgPSAocykgLT5cclxuXHRhcnIgPSBzLnNwbGl0ICcgJ1xyXG5cdHBhcmFtc1thcnJbMF1dID0gYXJyWzEuLl0uam9pbiAnfCdcclxuXHJcbnVybCA9ICdodHRwOi8vY2hyaXN0ZXJuaWxzc29uLmdpdGh1Yi5pby9MYWIvMjAxNy8wODQtQ29uZmlndXJhdGlvbi9pbmRleC5odG1sP2hoPTA4fDA5fDEwfDExfDEyfDEzfDE0fDE1fDE2fDE3Jm1tPTAwfDA1fDEwfDE1fDIwfDI1fDMwfDM1fDQwfDQ1fDUwfDU1JnN1PU1hfEVufFN2fEZ5fEZyJmRhPU1vfFR1fFdlfFRofEZyJmxvPUExMjN8QjIzNHxDMzQ1fEQ0NTYmZmllbGRzPWRhfGhofG1tfGhofG1tfHN1fGxvJ1xyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyA0MDAsNDAwXHJcblx0IyBzcGFyYSAnaGggMDggMDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcnXHJcblx0IyBzcGFyYSAnbW0gMDAgMDUgMTAgMTUgMjAgMjUgMzAgMzUgNDAgNDUgNTAgNTUnXHJcblx0IyBzcGFyYSAnc3UgTWEgRW4gU3YgRnkgVHkgRnInXHJcblx0IyBzcGFyYSAnZGEgTW8gVHUgV2UgVGggRnInXHJcblx0IyBzcGFyYSAnbG8gQTEyMyBCMjM0IEMzNDUgRDQ1NidcclxuXHQjIHNwYXJhICdmaWVsZHMgZGEgaGggbW0gaGggbW0gc3UgbG8nXHJcblx0cGFyYW1zID0gZ2V0VVJMUGFyYW1zKClcclxuXHRwcmludCBwYXJhbXNcclxuXHJcblx0Zm9yIGZpZWxkLGkgaW4gcGFyYW1zLmZpZWxkcy5zcGxpdCAnfCdcclxuXHRcdHByaW50IGZpZWxkXHJcblx0XHRzZWwgPSBjcmVhdGVTZWxlY3QoKVxyXG5cdFx0c2VsLnBvc2l0aW9uIDMwMCtpKjQwLDEwXHJcblx0XHRzZWxlY3RzLnB1c2ggc2VsXHJcblx0XHRmb3IgYWx0IGluIHBhcmFtc1tmaWVsZF0uc3BsaXQgJ3wnXHJcblx0XHRcdHNlbC5vcHRpb24gYWx0XHJcblx0YnV0dG9uID0gY3JlYXRlQnV0dG9uICcrJ1xyXG5cdGJ1dHRvbi5wb3NpdGlvbiAyNzAsMTBcclxuXHRidXR0b24ubW91c2VQcmVzc2VkICgpIC0+XHJcblx0XHRyZXMgPSAoc2VsLnNlbGVjdGVkKCkgZm9yIHNlbCBpbiBzZWxlY3RzKVxyXG5cdFx0cmVzID0gcmVzLmpvaW4gJyAnXHJcblx0XHR0ZXh0YXJlYS52YWx1ZSArPSByZXMgKyAnXFxuJ1xyXG5cclxuXHRidG5GaW5hbCA9IGNyZWF0ZUJ1dHRvbiAnZmluYWwnXHJcblx0YnRuRmluYWwucG9zaXRpb24gMjcwLDMwXHJcblx0YnRuRmluYWwubW91c2VQcmVzc2VkICgpIC0+XHJcblx0XHRyZXMgPSAobGluZXMucmVwbGFjZSgvIC9nLCAnJykgZm9yIGxpbmVzIGluIHRleHRhcmVhLnZhbHVlLnNwbGl0ICdcXG4nKVxyXG5cdFx0ZmluYWwudmFsdWUgPSByZXMuam9pbiAnOydcclxuXHJcblxyXG4iXX0=
//# sourceURL=C:\Lab\2017\084-Configuration\coffee\sketch.coffee