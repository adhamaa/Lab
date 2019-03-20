// Generated by CoffeeScript 2.3.2
var add, molar_mass, mul;

mul = function(match, p1, offset, string) {
  return '*' + p1;
};

add = function(match, p1, offset, string) {
  if (p1 === '(') {
    return '+' + p1;
  }
  return `+${ATOMIC_MASS[p1]}`;
};

molar_mass = function(s) {
  s = s.replace(/(\d+)/g, mul);
  s = s.replace(/([A-Z][a-z]{0,2}|\()/g, add);
  return parseFloat(eval(s).toFixed(3));
};

//##############################
molar_mass = function(s) {
  var i, member, name, next, result;
  result = '';
  i = 0;
  member = function(a, c) {
    var ref;
    return (a <= (ref = s[i]) && ref <= c);
  };
  next = function() {
    i += 1;
    return s[i - 1];
  };
  while (i < s.length) {
    if (s[i] === '(') {
      result += '+' + next();
    } else if (s[i] === ')') {
      result += next();
    } else if (member('0', '9')) {
      result += '*';
      while (member('0', '9')) {
        result += next();
      }
    } else if (member('A', 'Z')) {
      name = next();
      while (member('a', 'z')) {
        name += next();
      }
      result += '+' + ATOMIC_MASS[name];
    }
  }
  return parseFloat(eval(result).toFixed(3));
};

assert(1.008, molar_mass('H'));

assert(2.016, molar_mass('H2'));

assert(18.015, molar_mass('H2O'));

assert(34.014, molar_mass('H2O2'));

assert(34.014, molar_mass('(HO)2'));

assert(142.036, molar_mass('Na2SO4'));

assert(84.162, molar_mass('C6H12'));

assert(186.295, molar_mass('COOH(C(CH3)2)3CH3'));

assert(176.124, molar_mass('C6H4O2(OH)4')); // Vitamin C

assert(386.664, molar_mass('C27H46O')); // Cholesterol

assert(315, molar_mass('Uue'));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQTs7QUFBQSxHQUFBLEdBQU0sUUFBQSxDQUFDLEtBQUQsRUFBUSxFQUFSLEVBQVksTUFBWixFQUFvQixNQUFwQixDQUFBO1NBQStCLEdBQUEsR0FBTTtBQUFyQzs7QUFDTixHQUFBLEdBQU0sUUFBQSxDQUFDLEtBQUQsRUFBUSxFQUFSLEVBQVksTUFBWixFQUFvQixNQUFwQixDQUFBO0VBQ0wsSUFBRyxFQUFBLEtBQU0sR0FBVDtBQUFrQixXQUFPLEdBQUEsR0FBTSxHQUEvQjs7U0FDQSxDQUFBLENBQUEsQ0FBQSxDQUFJLFdBQVksQ0FBQSxFQUFBLENBQWhCLENBQUE7QUFGSzs7QUFJTixVQUFBLEdBQWEsUUFBQSxDQUFDLENBQUQsQ0FBQTtFQUNaLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLFFBQVYsRUFBb0IsR0FBcEI7RUFDSixDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSx1QkFBVixFQUFtQyxHQUFuQztTQUNKLFVBQUEsQ0FBVyxJQUFBLENBQUssQ0FBTCxDQUFPLENBQUMsT0FBUixDQUFnQixDQUFoQixDQUFYO0FBSFksRUFMYjs7O0FBWUEsVUFBQSxHQUFhLFFBQUEsQ0FBQyxDQUFELENBQUE7QUFDWixNQUFBLENBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtFQUFBLE1BQUEsR0FBUztFQUNULENBQUEsR0FBSTtFQUNKLE1BQUEsR0FBUyxRQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBQTtBQUFVLFFBQUE7V0FBQSxDQUFBLENBQUEsV0FBSyxDQUFFLENBQUEsQ0FBQSxFQUFQLE9BQUEsSUFBYSxDQUFiO0VBQVY7RUFDVCxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7SUFDTixDQUFBLElBQUs7V0FDTCxDQUFFLENBQUEsQ0FBQSxHQUFFLENBQUY7RUFGSTtBQUdQLFNBQU0sQ0FBQSxHQUFJLENBQUMsQ0FBQyxNQUFaO0lBQ0MsSUFBRyxDQUFFLENBQUEsQ0FBQSxDQUFGLEtBQVEsR0FBWDtNQUFvQixNQUFBLElBQVUsR0FBQSxHQUFNLElBQUEsQ0FBQSxFQUFwQztLQUFBLE1BQ0ssSUFBRyxDQUFFLENBQUEsQ0FBQSxDQUFGLEtBQVEsR0FBWDtNQUFvQixNQUFBLElBQVUsSUFBQSxDQUFBLEVBQTlCO0tBQUEsTUFDQSxJQUFHLE1BQUEsQ0FBTyxHQUFQLEVBQVcsR0FBWCxDQUFIO01BQ0osTUFBQSxJQUFVO0FBQ08sYUFBTSxNQUFBLENBQU8sR0FBUCxFQUFXLEdBQVgsQ0FBTjtRQUFqQixNQUFBLElBQVUsSUFBQSxDQUFBO01BQU8sQ0FGYjtLQUFBLE1BR0EsSUFBRyxNQUFBLENBQU8sR0FBUCxFQUFXLEdBQVgsQ0FBSDtNQUNKLElBQUEsR0FBTyxJQUFBLENBQUE7QUFDUSxhQUFNLE1BQUEsQ0FBTyxHQUFQLEVBQVcsR0FBWCxDQUFOO1FBQWYsSUFBQSxJQUFRLElBQUEsQ0FBQTtNQUFPO01BQ2YsTUFBQSxJQUFVLEdBQUEsR0FBTSxXQUFZLENBQUEsSUFBQSxFQUh4Qjs7RUFOTjtTQVVBLFVBQUEsQ0FBVyxJQUFBLENBQUssTUFBTCxDQUFZLENBQUMsT0FBYixDQUFxQixDQUFyQixDQUFYO0FBakJZOztBQW1CYixNQUFBLENBQU8sS0FBUCxFQUFjLFVBQUEsQ0FBVyxHQUFYLENBQWQ7O0FBQ0EsTUFBQSxDQUFPLEtBQVAsRUFBYyxVQUFBLENBQVcsSUFBWCxDQUFkOztBQUNBLE1BQUEsQ0FBTyxNQUFQLEVBQWUsVUFBQSxDQUFXLEtBQVgsQ0FBZjs7QUFDQSxNQUFBLENBQU8sTUFBUCxFQUFlLFVBQUEsQ0FBVyxNQUFYLENBQWY7O0FBQ0EsTUFBQSxDQUFPLE1BQVAsRUFBZSxVQUFBLENBQVcsT0FBWCxDQUFmOztBQUNBLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLFVBQUEsQ0FBVyxRQUFYLENBQWhCOztBQUNBLE1BQUEsQ0FBTyxNQUFQLEVBQWUsVUFBQSxDQUFXLE9BQVgsQ0FBZjs7QUFDQSxNQUFBLENBQU8sT0FBUCxFQUFnQixVQUFBLENBQVcsbUJBQVgsQ0FBaEI7O0FBQ0EsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsVUFBQSxDQUFXLGFBQVgsQ0FBaEIsRUF2Q0E7O0FBd0NBLE1BQUEsQ0FBTyxPQUFQLEVBQWdCLFVBQUEsQ0FBVyxTQUFYLENBQWhCLEVBeENBOztBQXlDQSxNQUFBLENBQU8sR0FBUCxFQUFZLFVBQUEsQ0FBVyxLQUFYLENBQVoiLCJzb3VyY2VzQ29udGVudCI6WyJtdWwgPSAobWF0Y2gsIHAxLCBvZmZzZXQsIHN0cmluZykgLT4gJyonICsgcDEgXHJcbmFkZCA9IChtYXRjaCwgcDEsIG9mZnNldCwgc3RyaW5nKSAtPiBcclxuXHRpZiBwMSA9PSAnKCcgdGhlbiByZXR1cm4gJysnICsgcDEgXHJcblx0XCIrI3tBVE9NSUNfTUFTU1twMV19XCJcclxuXHJcbm1vbGFyX21hc3MgPSAocykgLT5cclxuXHRzID0gcy5yZXBsYWNlIC8oXFxkKykvZywgbXVsXHJcblx0cyA9IHMucmVwbGFjZSAvKFtBLVpdW2Etel17MCwyfXxcXCgpL2csIGFkZFxyXG5cdHBhcnNlRmxvYXQoZXZhbChzKS50b0ZpeGVkKDMpKVxyXG5cclxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxubW9sYXJfbWFzcyA9IChzKSAtPlxyXG5cdHJlc3VsdCA9ICcnXHJcblx0aSA9IDBcclxuXHRtZW1iZXIgPSAoYSxjKSAtPiAgYSA8PSBzW2ldIDw9IGNcclxuXHRuZXh0ID0gLT5cclxuXHRcdGkgKz0gMVxyXG5cdFx0c1tpLTFdXHJcblx0d2hpbGUgaSA8IHMubGVuZ3RoXHJcblx0XHRpZiBzW2ldID09ICcoJyB0aGVuXHRyZXN1bHQgKz0gJysnICsgbmV4dCgpXHJcblx0XHRlbHNlIGlmIHNbaV0gPT0gJyknIHRoZW4gcmVzdWx0ICs9IG5leHQoKVxyXG5cdFx0ZWxzZSBpZiBtZW1iZXIgJzAnLCc5J1xyXG5cdFx0XHRyZXN1bHQgKz0gJyonIFxyXG5cdFx0XHRyZXN1bHQgKz0gbmV4dCgpIHdoaWxlIG1lbWJlciAnMCcsJzknXHJcblx0XHRlbHNlIGlmIG1lbWJlciAnQScsJ1onXHJcblx0XHRcdG5hbWUgPSBuZXh0KClcclxuXHRcdFx0bmFtZSArPSBuZXh0KCkgd2hpbGUgbWVtYmVyICdhJywneidcclxuXHRcdFx0cmVzdWx0ICs9ICcrJyArIEFUT01JQ19NQVNTW25hbWVdXHJcblx0cGFyc2VGbG9hdCBldmFsKHJlc3VsdCkudG9GaXhlZCAzXHJcblxyXG5hc3NlcnQgMS4wMDgsIG1vbGFyX21hc3MgJ0gnXHJcbmFzc2VydCAyLjAxNiwgbW9sYXJfbWFzcyAnSDInXHJcbmFzc2VydCAxOC4wMTUsIG1vbGFyX21hc3MgJ0gyTydcclxuYXNzZXJ0IDM0LjAxNCwgbW9sYXJfbWFzcyAnSDJPMidcclxuYXNzZXJ0IDM0LjAxNCwgbW9sYXJfbWFzcyAnKEhPKTInXHJcbmFzc2VydCAxNDIuMDM2LCBtb2xhcl9tYXNzICdOYTJTTzQnXHJcbmFzc2VydCA4NC4xNjIsIG1vbGFyX21hc3MgJ0M2SDEyJ1xyXG5hc3NlcnQgMTg2LjI5NSwgbW9sYXJfbWFzcyAnQ09PSChDKENIMykyKTNDSDMnXHJcbmFzc2VydCAxNzYuMTI0LCBtb2xhcl9tYXNzICdDNkg0TzIoT0gpNCcgIyBWaXRhbWluIENcclxuYXNzZXJ0IDM4Ni42NjQsIG1vbGFyX21hc3MgJ0MyN0g0Nk8nICMgQ2hvbGVzdGVyb2xcclxuYXNzZXJ0IDMxNSwgbW9sYXJfbWFzcyAnVXVlJ1xyXG4iXX0=
//# sourceURL=C:\Lab\2019\029-ChemicalCalculator\coffee\sketch.coffee