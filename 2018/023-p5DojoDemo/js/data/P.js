'use strict';

// Generated by CoffeeScript 2.0.3
var ID_P5, ID_PacMan, ID_Paint, ID_PentaLerp, ID_PickingBerries, ID_Polygon;

ID_P5 = {
  v: '2017-05-20',
  k: '-> text fc sc',
  l: 5,
  b: "skriv = (txt,x,y,r,g,b,size) ->\n	# Skriv din kod här!\n\n# Ändra ingenting nedanför denna rad!\n\nskriv \"p5\",      100,100,1,0,0,180\nskriv \"Lauren\",  155, 43,0,0,0, 18\nskriv \"McCarthy\",155,180,1,1,1, 18\nskriv \"Coding\",   50, 20,1,1,0, 24\nskriv \"Train\",    50, 48,0,1,0, 30",
  a: "skriv = (txt,x,y,r,g,b,size) ->\n	textAlign CENTER,CENTER\n	textSize size\n	fc r,g,b\n	sc()\n	text txt,x,y\n\nskriv \"p5\",      100,100,1,0,0,180\nskriv \"Lauren\",  155, 43,0,0,0, 18\nskriv \"McCarthy\",155,180,1,1,1, 18\nskriv \"Coding\",   50, 20,1,1,0, 24\nskriv \"Train\",    50, 48,0,1,0, 30"
};

ID_PacMan = {
  v: '2017-04-29',
  k: 'fc arc angleMode',
  l: 2,
  b: "",
  a: "fc 1,1,0\nangleMode DEGREES\narc 100,100, 180,180, -135,135",
  e: {
    Play: "https://www.google.se/#q=pacman&clb=clb",
    Wikipedia: "https://en.wikipedia.org/wiki/Pac-Man"
  }
};

ID_Paint = {
  v: '2017-05-15',
  k: 'bg sc range rect circle for class []',
  l: 36,
  b: "# colors from cc and cct\nclass Paint extends Application\n	reset : ->\n		super\n	draw : ->\n	mousePressed : (mx,my) ->\n	undo : ->\napp = new Paint",
  a: "class Paint extends Application\n	reset : ->\n		super\n		@picture = (Array(20).fill(0) for i in range 18)\n		@selected = 3\n		@history = []\n		@state = 0\n	draw : ->\n		sc()\n		for i in range 32\n			index = i+@state*32\n			fill cc index\n			x = i % 16 * 10\n			y = 10 * int i/16\n			rect x,y,10,10\n			if index == @selected\n				fill cct @selected\n				circle x+5,y+5,3\n		for i in range 20\n			for j in range 18\n				fill cc @picture[j][i]\n				rect 10*i,20+10*j,10,10\n	mousePressed : (mx,my) ->\n		i = int mx/10\n		j = int my/10\n		if j<=1\n			if i <= 15 then @selected = 32*@state + 16*j + i\n			else return @state = 1-@state\n		else\n			j -= 2\n			@history.push [j,i,@picture[j][i]]\n			@picture[j][i] = @selected\n	undo : ->\n		if @history.length==0 then return\n		[a,b,c] = @history.pop()\n		@picture[a][b] = c\n\napp = new Paint \"a\"",
  c: {
    app: "reset()|undo()"
  }
};

ID_PentaLerp = {
  v: '2017-09-11',
  k: 'bg sc fc range circle for lerp',
  l: 11,
  b: "",
  a: "bg 0.5\nsc()\nfor i in range 11\n	for j in range 11\n		r = 0.1*i\n		g = 0.1*j\n		fc r,g,0\n		x = 20*i\n		y = 20*j\n		radius = lerp 0,1,(i+j)/2\n		circle x,y,radius"
};

ID_PickingBerries = {
  v: '2017-04-29',
  k: 'bg sc fc sw [] operators line text constrain dist break for class',
  l: 46,
  b: "class PickingBerries extends Application\n	reset      : ->\n		super\n	draw       : ->\n	left       : ->\n	right      : ->\n	up         : ->\n	down       : ->\n	snailSpeed : ->\n	slowSpeed  : ->\n	highSpeed  : ->\n	warpSpeed  : ->\n	pick       : ->\napp = new PickingBerries",
  a: "class PickingBerries extends Application\n\n	reset : ->\n		super\n		@SPEEDS = [1,5,20,50]\n		@x = 100\n		@y = 100\n		@speed = 2 # 0..3\n		@clicks = 0\n		@xs = [100,189,124,196,13,187,12,153,32,131]\n		@ys = [107,175,138,188,37,78,168,31,20,188]\n		@moves = \"\"\n		@dxdy = [[1,0],[0,1],[-1,0],[0,-1]]\n\n	draw : ->\n		bg 0\n		rectMode CENTER\n		sc 1\n		sw 1\n		rect @x,@y,2*@SPEEDS[@speed],2*@SPEEDS[@speed]\n		for [dx,dy] in @dxdy\n			for i in range 4\n				point @x+dx*@SPEEDS[i], @y+dy*@SPEEDS[i]\n\n		fc 1,1,0\n		sc()\n		textSize 20\n		textAlign CENTER,CENTER\n		text @clicks,100,180\n\n		sc 1,0,0\n		sw 2\n		for [x,y] in _.zip @xs,@ys\n			line x-3,y-3,x+3,y+3\n			line x+3,y-3,x-3,y+3\n\n	move : (i) ->\n		[dx,dy] = @dxdy[i]\n		@x += dx * @SPEEDS[@speed]\n		@y += dy * @SPEEDS[@speed]\n		@clicks++\n		@moves += 'abcd'[i]\n\n	setSpeed : (index) ->\n		@speed = index\n		@moves += index\n\n	right   : -> @move 0\n	down    : -> @move 1\n	left    : -> @move 2\n	up      : -> @move 3\n\n	snailSpeed : -> @setSpeed 0\n	slowSpeed  : -> @setSpeed 1\n	highSpeed  : -> @setSpeed 2\n	warpSpeed  : -> @setSpeed 3\n\n	step : (d) ->\n		@clicks++\n		constrain @zoom+d,0,3\n	pick : ->\n		for [x,y],i in _.zip @xs,@ys\n			if dist(x,y,@x,@y) <= 2\n				@xs.splice i,1\n				@ys.splice i,1\n				break\n		@clicks++\n\napp = new PickingBerries \"a\"",
  c: {
    app: "reset()|left()|right()|up()|down()|snailSpeed()|slowSpeed()|highSpeed()|warpSpeed()|pick()"
  }
};

ID_Polygon = {
  v: '2017-09-30',
  k: 'bg sc range line for cos sin angleMode class',
  l: 23,
  b: "class Turtle\n	constructor : (@r=1,@g=0,@b=0, @x=100,@y=10,@dir=0) ->\n	fd : (d) ->\n	rt : (a) ->\n\nclass Polygon extends Application\n	reset      : ->\n		super\n	draw       : ->\n	antalSidor : (d) ->\n	antalSteg  : (d) ->\napp = new Polygon",
  a: "class Turtle\n	constructor : (@r=1,@g=0,@b=0, @x=100,@y=10,@dir=0) ->\n	fd : (d) ->\n		dx = d*cos @dir\n		dy = d*sin @dir\n		sc @r,@g,@b\n		line @x,@y,@x+dx,@y+dy\n		@x += dx\n		@y += dy\n	rt : (a) ->\n		@dir +=a\n\nclass Polygon extends Application\n	reset : ->\n		super\n		@n = 6\n		@steg = 60\n\n	draw : ->\n		t = new Turtle()\n		bg 0\n		angleMode DEGREES\n		for i in range @n\n			t.fd @steg\n			t.rt 360/@n\n\n	antalSidor : (d) -> @n += d\n	antalSteg : (d) -> @steg += d\n\napp = new Polygon \"a\"",
  c: {
    app: "reset()|antalSidor -1|antalSidor +1|antalSteg -1|antalSteg +1|"
  }
};
//# sourceMappingURL=P.js.map
