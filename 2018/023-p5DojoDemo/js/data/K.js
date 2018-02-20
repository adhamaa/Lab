'use strict';

// Generated by CoffeeScript 2.0.3
var ID_Kalkylator, ID_Klocka, ID_Korg, ID_Korsord;

ID_Kalkylator = {
  v: '2017-04-29',
  k: 'bg sc fc range readText operators {} [] text for sqrt PI parseFloat "" class',
  l: 46,
  b: "# TIPS! Börja med de fyra räknesätten.\n#       @words ska kunna utökas med \":\". T ex \": sq dup *\"\n#       Definiera t ex invers, distans och parallella motstånd\n\nclass Kalkylator extends Application\n	reset : ->\n		super\n	draw  : ->\n	chs   : -> # ( n -- n )\n	swap  : -> # ( a b -- b a )\n	drop  : -> # ( n -- )\n	dup   : -> # ( n -- n n )\n	sqrt  : -> # ( n -- n )\n	clr   : -> # ( a b -- )\n	pi    : -> # ( -- n)\n	enter : -> # inmatning från textrutan under kommandolistan.\napp = new Kalkylator",
  a: "class Kalkylator extends Application\n	reset : ->\n		super\n		@stack = [0,1,2,3]\n		@words = {\"sq\":[\"dup\",\"*\"]}\n	draw : ->\n		bg 0\n		sc()\n		textSize 32\n		textAlign RIGHT, BOTTOM\n		fc 1,0,0\n		for value,i in _.first @stack,5\n			s = \"\" + value\n			text s[0..9],190, 200 - i*40\n\n	shift : -> @stack.shift()\n	over : -> @stack.splice(1,1)[0]\n	unshift : (item) -> @stack.unshift item\n	chs : -> @unshift -@shift()\n	swap : -> [@stack[0],@stack[1]] = [@stack[1],@stack[0]]\n	drop : -> @shift()\n	dup : -> @unshift @stack[0]\n	sqrt : -> @unshift Math.sqrt @shift()\n	clr : -> @stack = []\n	pi : -> @unshift Math.PI\n\n	execute : (arr) ->\n		for cmd in arr\n			if cmd==\"\" then continue\n			if cmd=='+' then @unshift @shift() + @shift()\n			else if cmd=='*' then @unshift @shift() * @shift()\n			else if cmd=='/' then @unshift @over() / @shift()\n			else if cmd=='-' then @unshift @over() - @shift()\n			else if cmd=='chs' then @chs()\n			else if cmd=='swap' then @swap()\n			else if cmd=='drop' then @drop()\n			else if cmd=='dup' then @dup()\n			else if cmd=='sqrt' then @sqrt()\n			else if cmd=='clr' then @clr()\n			else if cmd=='pi' then @pi()\n			else if cmd of @words then @execute @words[cmd]\n			else @stack.unshift eval cmd\n\n	enter : (s='') ->\n		commands = s\n		if s=='' then commands = @readText()\n		if commands==\"\" then return\n		arr = commands.split ' '\n		if arr[0]==':' then @words[arr[1]] = arr[2..]\n		else @execute arr\n\napp = new Kalkylator \"a\"",
  c: {
    app: "reset()|chs()|swap()|drop()|dup()|sqrt()|clr()|pi()|enter()"
  },
  d: "reset()|clr()|enter '3'|enter '4'|enter '*'|enter '13'|swap()|dup()|sqrt()|drop()|clr()|pi()",
  e: {
    parseInt: "https://www.w3schools.com/jsref/jsref_parseint.asp",
    stack: "https://sv.wikipedia.org/wiki/Stack_(datastruktur)",
    split: "https://coffeescript-cookbook.github.io/chapters/strings/splitting-a-string",
    "Omvänd Polsk Notation": "https://sv.wikipedia.org/wiki/Omv%C3%A4nd_polsk_notation",
    RPN: "https://en.wikipedia.org/wiki/Reverse_Polish_notation",
    "HP-35": "https://neil.fraser.name/software/hp-35",
    "Forth Haiku": "http://forthsalon.appspot.com/word-list"
  }
};

ID_Klocka = {
  v: '2017-09-30',
  k: 'fc sc circle range angleMode rotate point rect rectMode for if translate push pop class Date',
  l: 49,
  b: "class Klocka extends Application\n	reset  : ->\n		super\n	draw   : ->\n	hour   : (h) ->\n	minute : (m) ->\n	second : (s) ->\n	now 	 : ->\napp = new Klocka",
  a: "class Klocka extends Application\n	reset : ->\n		super\n		@h=10\n		@m=9\n		@s=30\n	draw : ->\n		bg 0.5\n		rectMode CENTER\n		angleMode DEGREES\n		translate 100,100\n		@urtavla()\n		@visare (@h+@m/60.0)*30, 7,60,1,0,0\n		@visare (@m+@s/60.0)*6,5,80,0,1,0\n		@visare @s*6,2,80,1,1,0\n	hour   : (h) -> @adjust h,0,0\n	minute : (m) -> @adjust 0,m,0\n	second : (s) -> @adjust 0,0,s\n	now    : ->\n		d = new Date()\n		@h = d.getHours()\n		@m = d.getMinutes()\n		@s = d.getSeconds()\n	adjust : (h,m,s) ->\n		@h+=h\n		@m+=m\n		@s+=s\n		t = 3600 * @h + 60 * @m + @s\n		@s = t %% 60\n		t = (t - @s) / 60\n		@m = t %% 60\n		t = (t - @m) / 60\n		@h = t %% 24\n	visare : (v,w,l,r,g,b) ->\n		push()\n		rotate v-90\n		translate l/2,0\n		fc r,g,b\n		rect 0,0,l,w\n		pop()\n	urtavla : ->\n		fc 0\n		sc 1\n		sw 2\n		circle 0,0,90\n		fc 1\n		sc()\n		for i in range 60\n			circle 85,0, if i%5==0 then 3 else 2\n			rotate 6\n\napp = new Klocka \"a\"",
  c: {
    app: "reset()|hour -1|hour +1|minute -1|minute +1|second -1|second +1|now()"
  },
  d: "reset()|hour -1|hour +1|minute -1|minute +1|second -1|second +1|now()"
};

ID_Korg = {
  v: '2017-04-29',
  k: 'bg fc sc sw rect for if class',
  l: 27,
  b: "class Korg extends Application\n	reset   : ->\n		super\n	draw    : ->\n	more    : ->\n	less    : ->\n	thinner : ->\n	thicker : ->\napp = new Korg",
  a: "class Korg extends Application\n	reset : ->\n		super\n		@n = 1\n		@w = 5\n\n	draw : ->\n		c1 = co 1,0,0\n		c2 = co 1,1,0\n		bg 0\n		sw @w\n		fill c1\n		stroke c2\n		q = 2*@n+1\n		d = 200.0/q\n		for i in range @n\n			rect d+i*2*d,0,d,200\n		for j in range @n\n			rect 0,d+j*2*d,200,d\n		for i in range @n\n			for j in range @n\n				if (i+j) % 2 == 1\n					rect i*2*d,d+j*2*d,3*d,d\n				else\n					rect d+i*2*d,j*2*d,d,3*d\n	more : -> @n = constrain @n+1,1,10\n	less : -> @n = constrain @n-1,1,10\n	thinner : -> @w = constrain @w-1,0,10\n	thicker : -> @w = constrain @w+1,0,10\n\napp = new Korg \"a\"",
  c: {
    app: "reset()|more()|less()|thinner()|thicker()"
  },
  d: "reset()|more()|less()|thinner()|thicker()"
};

ID_Korsord = {
  v: '2017-04-29',
  k: 'bg fc sc readText operators text if for "" class []',
  l: 27,
  b: "# Mata in t ex b..l och få ut bill samt boll. Använd variabeln ordlista.\n\nclass Korsord extends Application\n	reset : ->\n		super\n	draw  : ->\n	enter : ->\napp = new Korsord",
  a: "class Korsord extends Application\n	reset : ->\n		super\n		@found = \"\"\n		@pattern = ''\n	draw : ->\n		n = 15\n		bg 0\n		textAlign LEFT,TOP\n		textSize 12\n		fc 1,1,0\n		sc()\n		for word,i in @found.split \" \"\n			x = int i / n\n			y = i % n\n			text word,5+200/4*x,200*y/n\n	match : (word,pattern) ->\n		for letter,i in pattern\n			if letter != '.' and letter != word[i] then	return false\n		true\n	enter : ->\n		words = ordlista.split \" \"\n		@pattern = @readText()\n		@found = []\n		for w in words\n			if w.length == @pattern.length and @match w,@pattern then @found.push w\n		@found = @found.join \" \"\n\napp = new Korsord \"a\"",
  c: {
    app: "reset()|enter()"
  },
  d: "reset()"
};
//# sourceMappingURL=K.js.map
