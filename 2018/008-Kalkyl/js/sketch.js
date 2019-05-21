// 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 2.3.2
var JS,
    KEY,
    assert,
    digits,
    makeAnswer,
    memory,
    page,
    setup,
    indexOf = [].indexOf;

KEY = '008B';

JS = '`';

//JS = ''
memory = null;

page = null;

digits = 3;

assert = function assert(a, b) {
  try {
    chai.assert.deepEqual(a, b);
    return '';
  } catch (error) {
    return a + ' != ' + b;
  }
};

makeAnswer = function makeAnswer() {
  var answer, answers, cs, e, i, j, js, len, len1, line, ref, res;
  answers = [];
  res = '';
  cs = '';
  js = '';
  ref = memory.split("\n");
  for (i = 0, len = ref.length; i < len; i++) {
    line = ref[i];
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
    } else if ('object' === (typeof answer === 'undefined' ? 'undefined' : _typeof(answer))) {
      res += JSON.stringify(answer) + "\n";
    } else if ('number' === typeof answer) {
      res += answer + "\n";
    } else {
      res += answer + "\n";
    }
  }
  return res;
};

setup = function setup() {
  memory = fetchData();
  page = new Page(0, function () {
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
    enter.onscroll = function (e) {
      answer.scrollTop = enter.scrollTop;
      return answer.scrollLeft = enter.scrollLeft;
    };
    answer.onscroll = function (e) {
      return e.preventDefault();
    };
    this.addRow(enter, answer);
    return enter.addEventListener("keyup", function (event) {
      var ref;
      answer.scrollTop = enter.scrollTop;
      answer.scrollLeft = enter.scrollLeft;
      if (ref = event.keyCode, indexOf.call([33, 34, 35, 36, 37, 38, 39, 40], ref) < 0) {
        memory = enter.value;
        answer.value = makeAnswer();
        return storeData(memory);
      }
    });
  });
  // page.addAction 'More', -> 
  // 	digits++
  // 	storeAndGoto memory,page

  // page.addAction 'Less', -> 
  // 	if digits>1 then digits--
  // 	storeAndGoto memory,page
  page.addAction('Clear', function () {
    memory = "";
    return storeAndGoto(memory, page);
  });
  page.addAction('Samples', function () {
    if (JS === "") {
      memory = "# Coffeescript\n2+3\n\nsträcka = 150\ntid = 6\ntid\nsträcka/tid\n25 == sträcka/tid \n30 == sträcka/tid\n\n# String\na = \"Volvo\" \n5 == a.length\n'l' == a[2]\n\n# Math\n5 == sqrt 25 \n\n# Date\nc = new Date() \nc.getFullYear()\nc.getHours()\n\n# Array\nnumbers = [1,2,3] \n2 == numbers[1]\nnumbers.push 47\n4 == numbers.length\nnumbers \n47 == numbers.pop()\n3 == numbers.length\nnumbers\nassert [0,1,4,9,16,25,36,49,64,81], (x*x for x in range 10)\n\n# Object\nperson = {fnamn:'David', enamn:'Larsson'}\n'David' == person['fnamn']\n'Larsson' == person.enamn\n\n# functions (enbart one liners tillåtna!)\nkvadrat = (x) -> x*x\n25 == kvadrat 5\n\n# feluppskattning vid användande av bäring och avstånd\narea = (b1,b2,r1,r2) -> (r2*r2 - r1*r1) * Math.PI * (b2-b1)/360  \n17.671458676442587 == area 90,91,200,205\n35.12475119638588  == area 90,91,400,405\n69.81317007977317  == area 90,92,195,205\n139.62634015954634 == area 90,92,395,405\n\nserial = (a,b) -> a+b\n2 == serial 1,1\n5 == serial 2,3\n\nparallel = (a,b) -> a*b/(a+b)\n0.5 == parallel 1,1\n1.2 == parallel 2,3\n\nfak = (x) -> if x==0 then 1 else x * fak(x-1)\n3628800 == fak 10\n\nfib = (x) -> if x<=0 then 1 else fib(x-1) + fib(x-2) \n1 == fib 0\n2 == fib 1\n5 == fib 3\n8 == fib 4\n13 == fib 5\n21 == fib 6\n";
    } else {
      memory = "// Javascript\n2+3\n\nsträcka = 150\ntid = 6\ntid\nsträcka/tid\n25 == sträcka/tid \n30 == sträcka/tid\n\n// String\na = \"Volvo\" \n5 == a.length\n'l' == a[2]\n\n// Math\n5 == sqrt(25)\n\n// Date\nc = new Date() \nc.getFullYear()\nc.getHours()\n\n// Array\nnumbers = [1,2,3] \n2 == numbers[1]\nnumbers.push(47)\n4 == numbers.length\nnumbers \n47 == numbers.pop()\n3 == numbers.length\nnumbers\nassert([0,1,4,9,16,25,36,49,64,81], range(10).map(x => x*x))\n\n// Object\nperson = {fnamn:'David', enamn:'Larsson'}\n'David' == person['fnamn']\n'Larsson' == person.enamn\n\n// functions (enbart one liners tillåtna!)\nkvadrat = (x) => x*x\n25 == kvadrat(5)\n\n// feluppskattning vid användande av bäring och avstånd\narea = (b1,b2,r1,r2) => (r2*r2 - r1*r1) * Math.PI * (b2-b1)/360  \n17.671458676442587 == area(90,91,200,205)\n35.12475119638588  == area(90,91,400,405)\n69.81317007977317  == area(90,92,195,205)\n139.62634015954634 == area(90,92,395,405)\n\nserial = (a,b) => a+b\n2 == serial(1,1)\n5 == serial(2,3)\n\nparallel = (a,b) => a*b/(a+b)\n0.5 == parallel(1,1)\n1.2 == parallel(2,3)\n\nfak = (x) => x==0 ? 1 : x * fak(x-1)\n3628800 == fak(10)\n\nfib = (x) => x<=0 ? 1 : fib(x-1) + fib(x-2) \n1 == fib(0)\n2 == fib(1)\n5 == fib(3)\n8 == fib(4)\n13 == fib(5)\n21 == fib(6)\n";
    }
    return storeAndGoto(memory, page);
  });
  page.addAction('Reference', function () {
    return window.open("https://www.w3schools.com/jsref/default.asp");
  });
  page.addAction('Hide', function () {
    return page.display();
  });
  return page.display();
};
//# sourceMappingURL=sketch.js.map
