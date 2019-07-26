// Generated by CoffeeScript 2.3.2
var JS, KEY, assert, digits, makeAnswer, memory, page, setup,
  indexOf = [].indexOf;

KEY = '008B';

JS = '`';


//JS = ''
memory = null;

page = null;

digits = 3;

assert = function(a, b) {
  try {
    chai.assert.deepEqual(a, b);
    return '';
  } catch (error) {
    return `${a} != ${b}`;
  }
};

makeAnswer = function() {
  var answer, answers, cs, e, i, j, js, len, len1, line, pos, ref, res;
  answers = [];
  res = '';
  cs = '';
  js = '';
  ref = memory.split("\n");
  for (i = 0, len = ref.length; i < len; i++) {
    line = ref[i];
    pos = line.lastIndexOf('#');
    if (pos >= 0) {
      line = line.slice(0, pos);
    }
    cs = line.trim();
    if (cs === '' || cs.indexOf('#') === 0 || cs.indexOf('//') === 0) {
      js += transpile(JS + 'answers.push("")' + JS + "\n");
    } else {
      try {
        js += transpile(JS + 'answers.push(' + cs + ")" + JS + "\n");
      } catch (error) {
        e = error;
        js += transpile(JS + "answers.push('ERROR: " + e.message + "')" + JS + "\n");
      }
    }
  }
  try {
    eval(js);
  } catch (error) {
    e = error;
    return 'ERROR: ' + e.message;
  }
  res = "";
  for (j = 0, len1 = answers.length; j < len1; j++) {
    answer = answers[j];
    if ('function' === typeof answer) {
      res += 'function defined' + "\n";
    } else if ('object' === typeof answer) {
      res += JSON.stringify(answer) + "\n";
    } else if ('number' === typeof answer) {
      res += engineering(answer) + "\n";
    } else {
      res += answer + "\n";
    }
  }
  return res;
};

setup = function() {
  // memory = fetchData()
  memory = '';
  if (indexOf.call(window.location.href, '?') >= 0) {
    memory = decodeURI(getParameters()['content']);
    memory = memory.replace(/%3D/g, '=');
    memory = memory.replace(/%3F/g, '?');
  }
  page = new Page(0, function() {
    var answer, enter;
    this.table.innerHTML = "";
    enter = makeTextArea();
    enter.style.left = '51%';
    enter.style.width = '48%';
    //enter.style.overflow = 'hidden'
    enter.focus();
    enter.value = memory;
    answer = makeTextArea();
    answer.style.left = '0px';
    answer.setAttribute("readonly", true);
    answer.style.textAlign = 'right';
    answer.style.overflow = 'hidden';
    answer.wrap = 'off';
    answer.value = makeAnswer();
    enter.onscroll = function(e) {
      answer.scrollTop = enter.scrollTop;
      return answer.scrollLeft = enter.scrollLeft;
    };
    answer.onscroll = function(e) {
      return e.preventDefault();
    };
    this.addRow(enter, answer);
    return enter.addEventListener("keyup", function(event) {
      var ref;
      answer.scrollTop = enter.scrollTop;
      answer.scrollLeft = enter.scrollLeft;
      if (ref = event.keyCode, indexOf.call([33, 34, 35, 36, 37, 38, 39, 40], ref) < 0) {
        memory = enter.value;
        return answer.value = makeAnswer();
      }
    });
  });
  // storeData memory

  // page.addAction 'More', -> 
  // 	digits++
  // 	storeAndGoto memory,page

  // page.addAction 'Less', -> 
  // 	if digits>1 then digits--
  // 	storeAndGoto memory,page
  page.addAction('Clear', function() {
    memory = "";
    return storeAndGoto(memory, page);
  });
  page.addAction('Samples', function() {
    var s;
    if (JS === "") {
      memory = "language = 'Coffeescript'\n2+3\n\nsträcka = 150\ntid = 6\ntid\nsträcka/tid\n25 == sträcka/tid \n30 == sträcka/tid\n\n# String\na = \"Volvo\" \n5 == a.length\n'l' == a[2]\n\n# Math\n5 == sqrt 25 \n\n# Date\nc = new Date() \nc.getFullYear()\nc.getHours()\n\n# Array\nnumbers = [1,2,3] \n2 == numbers[1]\nnumbers.push 47\n4 == numbers.length\nnumbers \n47 == numbers.pop()\n3 == numbers.length\nnumbers\nassert [0,1,4,9,16,25,36,49,64,81], (x*x for x in range 10)\n\n# Object\nperson = {fnamn:'David', enamn:'Larsson'}\n'David' == person['fnamn']\n'Larsson' == person.enamn\n\n# functions (enbart one liners tillåtna!)\nkvadrat = (x) -> x*x\n25 == kvadrat 5\n\n# feluppskattning vid användande av bäring och avstånd\narea = (b1,b2,r1,r2) -> (r2*r2 - r1*r1) * Math.PI * (b2-b1)/360  \n17.671458676442587 == area 90,91,200,205\n35.12475119638588  == area 90,91,400,405\n69.81317007977317  == area 90,92,195,205\n139.62634015954634 == area 90,92,395,405\n\nserial = (a,b) -> a+b\n2 == serial 1,1\n5 == serial 2,3\n\nparallel = (a,b) -> a*b/(a+b)\n0.5 == parallel 1,1\n1.2 == parallel 2,3\n\nfak = (x) -> if x==0 then 1 else x * fak(x-1)\n3628800 == fak 10\n\nfib = (x) -> if x<=0 then 1 else fib(x-1) + fib(x-2) \n1 == fib 0\n2 == fib 1\n5 == fib 3\n8 == fib 4\n13 == fib 5\n21 == fib 6\n";
    } else {
      memory = "language = 'Javascript'\n2+3\n\ndistance = 150\nseconds = 6\nseconds\ndistance/seconds\n25 == distance/seconds\n30 == distance/seconds\n\n// String\na = \"Volvo\" \n5 == a.length\n'l' == a[2]\n\n// Math\n5 == sqrt(25)\n\n// Date\nc = new Date() \nc.getFullYear()\nc.getHours()\n\n// Array\nnumbers = [1,2,3] \n2 == numbers[1]\nnumbers.push(47)\n4 == numbers.length\nnumbers \n47 == numbers.pop()\n3 == numbers.length\nnumbers\nassert([0,1,4,9,16,25,36,49,64,81], range(10).map(x => x*x))\n\n// Object\nperson = {fnamn:'David', enamn:'Larsson'}\n'David' == person['fnamn']\n'Larsson' == person.enamn\n\n// functions (only one liners)\nkvadrat = (x) => x*x\n25 == kvadrat(5)\n\nserial = (a,b) => a+b\n2 == serial(1,1)\n5 == serial(2,3)\n\nparallel = (a,b) => a*b/(a+b)\n0.5 == parallel(1,1)\n1.2 == parallel(2,3)\n\nfak = (x) => (x==0 ? 1 : x * fak(x-1))\n3628800 == fak(10)\n\nfib = (x) => x<=0 ? 1 : fib(x-1) + fib(x-2)\n1 == fib(0)\n2 == fib(1)\n5 == fib(3)\n8 == fib(4)\n13 == fib(5)\n21 == fib(6)\n";
    }
    // storeAndGoto memory,page
    s = encodeURI(memory);
    s = s.replace(/=/g, '%3D');
    s = s.replace(/\?/g, '%3F');
    return window.open('?content=' + s);
  });
  page.addAction('Reference', function() {
    return window.open("https://www.w3schools.com/jsref/default.asp");
  });
  page.addAction('Hide', function() {
    return page.display();
  });
  page.addAction('URL', function() {
    var s;
    s = encodeURI(memory);
    s = s.replace(/=/g, '%3D');
    s = s.replace(/\?/g, '%3F');
    return window.open('?content=' + s);
  });
  return page.display();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUE7RUFBQTs7QUFBQSxHQUFBLEdBQU07O0FBRU4sRUFBQSxHQUFLLElBRkw7Ozs7QUFLQSxNQUFBLEdBQVM7O0FBQ1QsSUFBQSxHQUFPOztBQUNQLE1BQUEsR0FBUzs7QUFFVCxNQUFBLEdBQVMsUUFBQSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7QUFDUjtJQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixDQUF0QixFQUF5QixDQUF6QjtXQUNBLEdBRkQ7R0FBQSxhQUFBO1dBSUMsQ0FBQSxDQUFBLENBQUcsQ0FBSCxDQUFLLElBQUwsQ0FBQSxDQUFXLENBQVgsQ0FBQSxFQUpEOztBQURROztBQU9ULFVBQUEsR0FBYSxRQUFBLENBQUEsQ0FBQTtBQUNaLE1BQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7RUFBQSxPQUFBLEdBQVU7RUFDVixHQUFBLEdBQU07RUFDTixFQUFBLEdBQUs7RUFDTCxFQUFBLEdBQUs7QUFDTDtFQUFBLEtBQUEscUNBQUE7O0lBQ0MsR0FBQSxHQUFNLElBQUksQ0FBQyxXQUFMLENBQWlCLEdBQWpCO0lBQ04sSUFBRyxHQUFBLElBQU0sQ0FBVDtNQUFnQixJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYLEVBQWEsR0FBYixFQUF2Qjs7SUFDQSxFQUFBLEdBQUssSUFBSSxDQUFDLElBQUwsQ0FBQTtJQUNMLElBQUcsRUFBQSxLQUFJ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LElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZixFQUF1QixRQUFBLENBQUEsQ0FBQTtXQUN0QixJQUFJLENBQUMsT0FBTCxDQUFBO0VBRHNCLENBQXZCO0VBR0EsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO0FBQ3JCLFFBQUE7SUFBQSxDQUFBLEdBQUksU0FBQSxDQUFVLE1BQVY7SUFDSixDQUFBLEdBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxJQUFWLEVBQWUsS0FBZjtJQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsT0FBRixDQUFVLEtBQVYsRUFBZ0IsS0FBaEI7V0FDSixNQUFNLENBQUMsSUFBUCxDQUFZLFdBQUEsR0FBYyxDQUExQjtFQUpxQixDQUF0QjtTQU1BLElBQUksQ0FBQyxPQUFMLENBQUE7QUFyTk8iLCJzb3VyY2VzQ29udGVudCI6WyJLRVkgPSAnMDA4QidcclxuXHJcbkpTID0gJ2AnIFxyXG4jSlMgPSAnJ1xyXG5cclxubWVtb3J5ID0gbnVsbFxyXG5wYWdlID0gbnVsbFxyXG5kaWdpdHMgPSAzXHJcblxyXG5hc3NlcnQgPSAoYSwgYikgLT5cclxuXHR0cnlcclxuXHRcdGNoYWkuYXNzZXJ0LmRlZXBFcXVhbCBhLCBiXHJcblx0XHQnJ1xyXG5cdGNhdGNoXHJcblx0XHRcIiN7YX0gIT0gI3tifVwiXHJcblxyXG5tYWtlQW5zd2VyID0gLT4gXHJcblx0YW5zd2VycyA9IFtdXHJcblx0cmVzID0gJydcclxuXHRjcyA9ICcnXHJcblx0anMgPSAnJ1xyXG5cdGZvciBsaW5lIGluIG1lbW9yeS5zcGxpdCBcIlxcblwiXHJcblx0XHRwb3MgPSBsaW5lLmxhc3RJbmRleE9mKCcjJylcclxuXHRcdGlmIHBvcyA+PTAgdGhlbiBsaW5lID0gbGluZS5zbGljZSAwLHBvc1xyXG5cdFx0Y3MgPSBsaW5lLnRyaW0oKSBcclxuXHRcdGlmIGNzPT0nJyBvciBjcy5pbmRleE9mKCcjJyk9PTAgb3IgY3MuaW5kZXhPZignLy8nKT09MFxyXG5cdFx0XHRqcyArPSB0cmFuc3BpbGUgSlMgKyAnYW5zd2Vycy5wdXNoKFwiXCIpJyAgKyBKUyArIFwiXFxuXCJcclxuXHRcdGVsc2VcclxuXHRcdFx0dHJ5XHJcblx0XHRcdFx0anMgKz0gdHJhbnNwaWxlIEpTICsgJ2Fuc3dlcnMucHVzaCgnICsgY3MgKyBcIilcIiAgKyBKUyArIFwiXFxuXCJcclxuXHRcdFx0Y2F0Y2ggZVxyXG5cdFx0XHRcdGpzICs9IHRyYW5zcGlsZSBKUyArIFwiYW5zd2Vycy5wdXNoKCdFUlJPUjogXCIgKyBlLm1lc3NhZ2UgKyBcIicpXCIgICsgSlMgKyBcIlxcblwiXHJcblxyXG5cdHRyeVxyXG5cdFx0ZXZhbCBqc1xyXG5cdGNhdGNoIGUgXHJcblx0XHRyZXR1cm4gJ0VSUk9SOiAnICsgZS5tZXNzYWdlXHJcblxyXG5cdHJlcyA9IFwiXCJcclxuXHRmb3IgYW5zd2VyIGluIGFuc3dlcnNcclxuXHRcdGlmICdmdW5jdGlvbicgPT0gdHlwZW9mIGFuc3dlclxyXG5cdFx0XHRyZXMgKz0gJ2Z1bmN0aW9uIGRlZmluZWQnICsgXCJcXG5cIiBcclxuXHRcdGVsc2UgaWYgJ29iamVjdCcgPT0gdHlwZW9mIGFuc3dlclxyXG5cdFx0XHRyZXMgKz0gSlNPTi5zdHJpbmdpZnkoYW5zd2VyKSArIFwiXFxuXCIgXHJcblx0XHRlbHNlIGlmICdudW1iZXInID09IHR5cGVvZiBhbnN3ZXJcclxuXHRcdFx0cmVzICs9IGVuZ2luZWVyaW5nKGFuc3dlcikgKyBcIlxcblwiXHJcblx0XHRlbHNlXHJcblx0XHRcdHJlcyArPSBhbnN3ZXIgKyBcIlxcblwiXHJcblx0cmVzXHJcblxyXG5zZXR1cCA9IC0+XHJcblxyXG5cdCMgbWVtb3J5ID0gZmV0Y2hEYXRhKClcclxuXHRtZW1vcnkgPSAnJ1xyXG5cdGlmICc/JyBpbiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG5cdFx0bWVtb3J5ID0gZGVjb2RlVVJJIGdldFBhcmFtZXRlcnMoKVsnY29udGVudCddXHJcblx0XHRtZW1vcnkgPSBtZW1vcnkucmVwbGFjZSAvJTNEL2csJz0nXHJcblx0XHRtZW1vcnkgPSBtZW1vcnkucmVwbGFjZSAvJTNGL2csJz8nXHJcblxyXG5cdHBhZ2UgPSBuZXcgUGFnZSAwLCAtPlxyXG5cdFx0QHRhYmxlLmlubmVySFRNTCA9IFwiXCIgXHJcblxyXG5cdFx0ZW50ZXIgPSBtYWtlVGV4dEFyZWEoKVxyXG5cdFx0ZW50ZXIuc3R5bGUubGVmdCA9ICc1MSUnXHJcblx0XHRlbnRlci5zdHlsZS53aWR0aCA9ICc0OCUnXHJcblx0XHQjZW50ZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG5cclxuXHRcdGVudGVyLmZvY3VzKClcclxuXHRcdGVudGVyLnZhbHVlID0gbWVtb3J5XHJcblxyXG5cdFx0YW5zd2VyID0gbWFrZVRleHRBcmVhKCkgXHJcblx0XHRhbnN3ZXIuc3R5bGUubGVmdCA9ICcwcHgnXHJcblx0XHRhbnN3ZXIuc2V0QXR0cmlidXRlIFwicmVhZG9ubHlcIiwgdHJ1ZVxyXG5cdFx0YW5zd2VyLnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCdcclxuXHRcdGFuc3dlci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcblx0XHRhbnN3ZXIud3JhcCA9ICdvZmYnXHJcblxyXG5cdFx0YW5zd2VyLnZhbHVlID0gbWFrZUFuc3dlcigpXHJcblxyXG5cdFx0ZW50ZXIub25zY3JvbGwgPSAoZSkgLT5cclxuXHRcdFx0YW5zd2VyLnNjcm9sbFRvcCA9IGVudGVyLnNjcm9sbFRvcFxyXG5cdFx0XHRhbnN3ZXIuc2Nyb2xsTGVmdCA9IGVudGVyLnNjcm9sbExlZnRcclxuXHRcdGFuc3dlci5vbnNjcm9sbCA9IChlKSAtPiBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcblx0XHRAYWRkUm93IGVudGVyLGFuc3dlclxyXG5cclxuXHRcdGVudGVyLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCAoZXZlbnQpIC0+XHJcblx0XHRcdGFuc3dlci5zY3JvbGxUb3AgPSBlbnRlci5zY3JvbGxUb3BcclxuXHRcdFx0YW5zd2VyLnNjcm9sbExlZnQgPSBlbnRlci5zY3JvbGxMZWZ0XHJcblx0XHRcdFxyXG5cdFx0XHRpZiBldmVudC5rZXlDb2RlIG5vdCBpbiBbMzMuLjQwXVxyXG5cdFx0XHRcdG1lbW9yeSA9IGVudGVyLnZhbHVlXHJcblx0XHRcdFx0YW5zd2VyLnZhbHVlID0gbWFrZUFuc3dlcigpXHJcblx0XHRcdFx0IyBzdG9yZURhdGEgbWVtb3J5XHJcblxyXG5cdCMgcGFnZS5hZGRBY3Rpb24gJ01vcmUnLCAtPiBcclxuXHQjIFx0ZGlnaXRzKytcclxuXHQjIFx0c3RvcmVBbmRHb3RvIG1lbW9yeSxwYWdlXHJcblxyXG5cdCMgcGFnZS5hZGRBY3Rpb24gJ0xlc3MnLCAtPiBcclxuXHQjIFx0aWYgZGlnaXRzPjEgdGhlbiBkaWdpdHMtLVxyXG5cdCMgXHRzdG9yZUFuZEdvdG8gbWVtb3J5LHBhZ2VcclxuXHJcblx0cGFnZS5hZGRBY3Rpb24gJ0NsZWFyJywgLT4gXHJcblx0XHRtZW1vcnkgPSBcIlwiXHJcblx0XHRzdG9yZUFuZEdvdG8gbWVtb3J5LHBhZ2VcclxuXHJcblx0cGFnZS5hZGRBY3Rpb24gJ1NhbXBsZXMnLCAtPlxyXG5cclxuXHRcdGlmIEpTID09IFwiXCIgXHJcblx0XHRcdG1lbW9yeSA9IFwiXCJcIlxyXG5sYW5ndWFnZSA9ICdDb2ZmZWVzY3JpcHQnXHJcbjIrM1xyXG5cclxuc3Ryw6Rja2EgPSAxNTBcclxudGlkID0gNlxyXG50aWRcclxuc3Ryw6Rja2EvdGlkXHJcbjI1ID09IHN0csOkY2thL3RpZCBcclxuMzAgPT0gc3Ryw6Rja2EvdGlkXHJcblxyXG4jIFN0cmluZ1xyXG5hID0gXCJWb2x2b1wiIFxyXG41ID09IGEubGVuZ3RoXHJcbidsJyA9PSBhWzJdXHJcblxyXG4jIE1hdGhcclxuNSA9PSBzcXJ0IDI1IFxyXG5cclxuIyBEYXRlXHJcbmMgPSBuZXcgRGF0ZSgpIFxyXG5jLmdldEZ1bGxZZWFyKClcclxuYy5nZXRIb3VycygpXHJcblxyXG4jIEFycmF5XHJcbm51bWJlcnMgPSBbMSwyLDNdIFxyXG4yID09IG51bWJlcnNbMV1cclxubnVtYmVycy5wdXNoIDQ3XHJcbjQgPT0gbnVtYmVycy5sZW5ndGhcclxubnVtYmVycyBcclxuNDcgPT0gbnVtYmVycy5wb3AoKVxyXG4zID09IG51bWJlcnMubGVuZ3RoXHJcbm51bWJlcnNcclxuYXNzZXJ0IFswLDEsNCw5LDE2LDI1LDM2LDQ5LDY0LDgxXSwgKHgqeCBmb3IgeCBpbiByYW5nZSAxMClcclxuXHJcbiMgT2JqZWN0XHJcbnBlcnNvbiA9IHtmbmFtbjonRGF2aWQnLCBlbmFtbjonTGFyc3Nvbid9XHJcbidEYXZpZCcgPT0gcGVyc29uWydmbmFtbiddXHJcbidMYXJzc29uJyA9PSBwZXJzb24uZW5hbW5cclxuXHJcbiMgZnVuY3Rpb25zIChlbmJhcnQgb25lIGxpbmVycyB0aWxsw6V0bmEhKVxyXG5rdmFkcmF0ID0gKHgpIC0+IHgqeFxyXG4yNSA9PSBrdmFkcmF0IDVcclxuXHJcbiMgZmVsdXBwc2thdHRuaW5nIHZpZCBhbnbDpG5kYW5kZSBhdiBiw6RyaW5nIG9jaCBhdnN0w6VuZFxyXG5hcmVhID0gKGIxLGIyLHIxLHIyKSAtPiAocjIqcjIgLSByMSpyMSkgKiBNYXRoLlBJICogKGIyLWIxKS8zNjAgIFxyXG4xNy42NzE0NTg2NzY0NDI1ODcgPT0gYXJlYSA5MCw5MSwyMDAsMjA1XHJcbjM1LjEyNDc1MTE5NjM4NTg4ICA9PSBhcmVhIDkwLDkxLDQwMCw0MDVcclxuNjkuODEzMTcwMDc5NzczMTcgID09IGFyZWEgOTAsOTIsMTk1LDIwNVxyXG4xMzkuNjI2MzQwMTU5NTQ2MzQgPT0gYXJlYSA5MCw5MiwzOTUsNDA1XHJcblxyXG5zZXJpYWwgPSAoYSxiKSAtPiBhK2JcclxuMiA9PSBzZXJpYWwgMSwxXHJcbjUgPT0gc2VyaWFsIDIsM1xyXG5cclxucGFyYWxsZWwgPSAoYSxiKSAtPiBhKmIvKGErYilcclxuMC41ID09IHBhcmFsbGVsIDEsMVxyXG4xLjIgPT0gcGFyYWxsZWwgMiwzXHJcblxyXG5mYWsgPSAoeCkgLT4gaWYgeD09MCB0aGVuIDEgZWxzZSB4ICogZmFrKHgtMSlcclxuMzYyODgwMCA9PSBmYWsgMTBcclxuXHJcbmZpYiA9ICh4KSAtPiBpZiB4PD0wIHRoZW4gMSBlbHNlIGZpYih4LTEpICsgZmliKHgtMikgXHJcbjEgPT0gZmliIDBcclxuMiA9PSBmaWIgMVxyXG41ID09IGZpYiAzXHJcbjggPT0gZmliIDRcclxuMTMgPT0gZmliIDVcclxuMjEgPT0gZmliIDZcclxuXHJcblwiXCJcIlxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRtZW1vcnkgPSBcIlwiXCJcclxubGFuZ3VhZ2UgPSAnSmF2YXNjcmlwdCdcclxuMiszXHJcblxyXG5kaXN0YW5jZSA9IDE1MFxyXG5zZWNvbmRzID0gNlxyXG5zZWNvbmRzXHJcbmRpc3RhbmNlL3NlY29uZHNcclxuMjUgPT0gZGlzdGFuY2Uvc2Vjb25kc1xyXG4zMCA9PSBkaXN0YW5jZS9zZWNvbmRzXHJcblxyXG4vLyBTdHJpbmdcclxuYSA9IFwiVm9sdm9cIiBcclxuNSA9PSBhLmxlbmd0aFxyXG4nbCcgPT0gYVsyXVxyXG5cclxuLy8gTWF0aFxyXG41ID09IHNxcnQoMjUpXHJcblxyXG4vLyBEYXRlXHJcbmMgPSBuZXcgRGF0ZSgpIFxyXG5jLmdldEZ1bGxZZWFyKClcclxuYy5nZXRIb3VycygpXHJcblxyXG4vLyBBcnJheVxyXG5udW1iZXJzID0gWzEsMiwzXSBcclxuMiA9PSBudW1iZXJzWzFdXHJcbm51bWJlcnMucHVzaCg0NylcclxuNCA9PSBudW1iZXJzLmxlbmd0aFxyXG5udW1iZXJzIFxyXG40NyA9PSBudW1iZXJzLnBvcCgpXHJcbjMgPT0gbnVtYmVycy5sZW5ndGhcclxubnVtYmVyc1xyXG5hc3NlcnQoWzAsMSw0LDksMTYsMjUsMzYsNDksNjQsODFdLCByYW5nZSgxMCkubWFwKHggPT4geCp4KSlcclxuXHJcbi8vIE9iamVjdFxyXG5wZXJzb24gPSB7Zm5hbW46J0RhdmlkJywgZW5hbW46J0xhcnNzb24nfVxyXG4nRGF2aWQnID09IHBlcnNvblsnZm5hbW4nXVxyXG4nTGFyc3NvbicgPT0gcGVyc29uLmVuYW1uXHJcblxyXG4vLyBmdW5jdGlvbnMgKG9ubHkgb25lIGxpbmVycylcclxua3ZhZHJhdCA9ICh4KSA9PiB4KnhcclxuMjUgPT0ga3ZhZHJhdCg1KVxyXG5cclxuc2VyaWFsID0gKGEsYikgPT4gYStiXHJcbjIgPT0gc2VyaWFsKDEsMSlcclxuNSA9PSBzZXJpYWwoMiwzKVxyXG5cclxucGFyYWxsZWwgPSAoYSxiKSA9PiBhKmIvKGErYilcclxuMC41ID09IHBhcmFsbGVsKDEsMSlcclxuMS4yID09IHBhcmFsbGVsKDIsMylcclxuXHJcbmZhayA9ICh4KSA9PiAoeD09MCA/IDEgOiB4ICogZmFrKHgtMSkpXHJcbjM2Mjg4MDAgPT0gZmFrKDEwKVxyXG5cclxuZmliID0gKHgpID0+IHg8PTAgPyAxIDogZmliKHgtMSkgKyBmaWIoeC0yKVxyXG4xID09IGZpYigwKVxyXG4yID09IGZpYigxKVxyXG41ID09IGZpYigzKVxyXG44ID09IGZpYig0KVxyXG4xMyA9PSBmaWIoNSlcclxuMjEgPT0gZmliKDYpXHJcblxyXG5cIlwiXCJcclxuXHRcdCMgc3RvcmVBbmRHb3RvIG1lbW9yeSxwYWdlXHJcblx0XHRzID0gZW5jb2RlVVJJIG1lbW9yeVxyXG5cdFx0cyA9IHMucmVwbGFjZSAvPS9nLCclM0QnXHJcblx0XHRzID0gcy5yZXBsYWNlIC9cXD8vZywnJTNGJ1xyXG5cdFx0d2luZG93Lm9wZW4gJz9jb250ZW50PScgKyBzXHJcblxyXG5cdHBhZ2UuYWRkQWN0aW9uICdSZWZlcmVuY2UnLCAtPiB3aW5kb3cub3BlbiBcImh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvZGVmYXVsdC5hc3BcIlxyXG5cclxuXHRwYWdlLmFkZEFjdGlvbiAnSGlkZScsIC0+IFxyXG5cdFx0cGFnZS5kaXNwbGF5KClcclxuXHJcblx0cGFnZS5hZGRBY3Rpb24gJ1VSTCcsIC0+IFxyXG5cdFx0cyA9IGVuY29kZVVSSSBtZW1vcnlcclxuXHRcdHMgPSBzLnJlcGxhY2UgLz0vZywnJTNEJ1xyXG5cdFx0cyA9IHMucmVwbGFjZSAvXFw/L2csJyUzRidcclxuXHRcdHdpbmRvdy5vcGVuICc/Y29udGVudD0nICsgc1xyXG5cclxuXHRwYWdlLmRpc3BsYXkoKVxyXG4iXX0=
//# sourceURL=c:\Lab\2018\008-Kalkyl\coffee\sketch.coffee