'use strict';

// Generated by CoffeeScript 2.0.3
var ID_Cards, ID_ChessBoard, ID_ChessGame, ID_ChessMany, ID_ChessOne, ID_ChessRow, ID_ClickDetector, ID_CoffeescriptClock, ID_ColorCross, ID_ColorCube, ID_ColorPair, ID_Complex, ID_Connect4, ID_Coordinator, ID_CornerPoints, ID_CornerPoints3, ID_CornerPoints7, ID_Counter, ID_Cross;

ID_Cards = {
  v: '2017-09-30',
  k: 'fc sc circle range angleMode rotate rect rectMode for lerp translate',
  l: 10,
  b: "",
  a: "rectMode CENTER\nangleMode DEGREES\nsc 1\ntranslate 100,100\nfor i in range 18,-1,-1\n	r = 1.0*i/18\n	fc r,0,0\n	w = 70+5*i\n	h = 70+5*i\n	rect 0,0, w,h\n	rotate 5"
};

ID_ChessBoard = {
  v: '2017-04-29',
  k: 'bg fc range for lerp rect',
  l: 7,
  b: "",
  a: "bg 0.5\nfor i in range 8\n	for j in range 8\n		fc (i+j)%2\n		x = 20+20*i\n		y = 20+20*j\n		rect x,y, 20,20"
};

ID_ChessGame = {
  v: '2017-04-29',
  k: 'bg fc sc sw range circle rectMode class rect if text for "" _.isEqual operators []',
  l: 53,
  b: "# OBS!   Rockad, en passant samt bondeförvandling hanteras ej.\n#        Flytta pjäserna med musen. Klick utanför brädet innebär undo.\n\nclass Chess extends Application\n	reset : ->\n		super\n	draw  : ->\n	mousePressed : (mx,my) ->\napp = new Chess",
  a: "class Chess extends Application\n	reset : ->\n		super\n		@SIZE = 22\n		@X = 100\n		@Y = 100\n		@board = ['RNBQKBNR','PPPPPPPP','........','........','........','........','pppppppp','rnbqkbnr']\n		@history = []\n		@memory = 0\n	draw : ->\n		bg 0.5\n		textSize 0.9 * @SIZE\n		textAlign CENTER,CENTER\n		rectMode CENTER\n		sc()\n		for i in range 8\n			for j in range 8\n				if (i+j)%2 == 0 then fc 0.6 else fc 0.8\n				x = @X-3.5*@SIZE+@SIZE*i\n				y = @Y-3.5*@SIZE+@SIZE*(7-j)\n				if _.isEqual @memory,[i,j] then fc 0,1,0\n				rect x,y, @SIZE, @SIZE\n				piece = @board[j][i]\n				if piece in \"RNBQKP\" then fc 0.95 else fc 0\n				if piece != '.'\n					if piece in \"pP\" then circle x,y,5 else text piece.toUpperCase(),x,y\n	setCharAt : (i,j,chr) ->\n    @board[j] = @board[j].substr(0,i) + chr + @board[j].substr(i+1)\n	move : (a,b) ->\n		[i1,j1] = a\n		[i2,j2] = b\n		taken = @board[j2][i2]\n		@setCharAt i2,j2, @board[j1][i1]\n		@setCharAt i1,j1,'.'\n		@history.push [a,b,taken]\n	undo : () ->\n		if @history.length == 0 then return\n		[a,b,taken] = @history.pop()\n		[i1,j1] = a\n		[i2,j2] = b\n		@setCharAt i1,j1, @board[j2][i2]\n		@setCharAt i2,j2, taken\n	mousePressed : (mx,my) ->\n		i = int (mx-20)/20\n		j = 7 - int (my-20)/20\n		if 0 <= i <= 7 and 0 <= j <= 7\n			if @memory == 0\n				@memory = [i,j]\n			else\n				if not _.isEqual @memory,[i,j] then @move @memory,[i,j]\n				@memory = 0\n		else\n			@undo()\n\napp = new Chess \"a\"\n",
  c: {
    app: "reset()"
  }
};

ID_ChessOne = {
  v: '2017-10-10',
  k: 'bg fc range for rect circle class if [] {} text',
  l: 52,
  b: "class ChessOne extends Application\n	reset : ->\n		super\n	draw  : ->\n	mousePressed : (mx,my) ->\napp = new ChessOne\n",
  a: "class ChessOne extends Application\n	reset : ->\n		super\n		@moves =\n			King   : [false,[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Queen  : [true,[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Rook   : [true,[[-1,0],[1,0],[0,-1],[0,1]]]\n			Bishop : [true,[[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Knight : [false,[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]]\n		@currentPiece = 'King'\n		@currentCol = 4\n		@currentRow = 7\n\n	genDir : (multi,sq,dxdy) ->\n		[dx,dy] = dxdy\n		squares = []\n		maximum = if multi then 7 else 1\n		[col,row] = sq\n		for i in range maximum\n			col += dx\n			row += dy\n			if 0<=col<=7 and 0<=row<=7 then squares.push [col,row]\n		squares\n\n	oneGeneration : (piece,sq) ->\n		[multi,drag] = piece\n		squares = []\n		squares = squares.concat @genDir multi,sq,dxdy for dxdy in drag\n		squares\n\n	draw  : ->\n		bg 0.5\n		textAlign RIGHT,CENTER\n		textSize 13\n\n		for i in range 8\n			for j in range 8\n				fc (i+j+1)%2\n				rect 20*i,20*j,20,20\n\n		sc()\n		for piece,i in _.keys @moves\n			if piece == @currentPiece then fc 1,1,0 else fc 0\n			text piece,200,10+20*i\n\n		sq = [@currentCol,@currentRow]\n		[x,y] = sq\n		fc 0,1,0\n		circle 10+20*x,10+20*y,5\n\n		fc 1,0,0\n		for [x,y] in @oneGeneration @moves[@currentPiece],sq\n			circle 10+20*x,10+20*y,5\n\n	mousePressed : (mx,my) ->\n		if mx < 160\n			@currentCol = int mx/20\n			@currentRow = int my/20\n		else\n			@currentPiece = _.keys(@moves)[int my/20]\n\napp = new ChessOne \"a\"",
  c: {
    app: "reset()"
  },
  d: "reset()|mousePressed 100,100|mousePressed 180,10|mousePressed 180,30|mousePressed 180,50|mousePressed 180,70|mousePressed 180,90",
  e: {
    Schack: "https://schackonline.com/skolan/nyborjare/pjaser/pjaser.php"
  }
};

ID_ChessMany = {
  v: '2017-10-10',
  k: 'bg fc range for rect circle class if [] {} text',
  l: 70,
  b: "class ChessMany extends Application\n	reset : ->\n		super\n	draw  : ->\n	mousePressed : (mx,my) ->\napp = new ChessMany\n",
  a: "class ChessMany extends Application\n	reset : ->\n		super\n		@moves =\n			King   : [false,[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Queen  : [true,[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Rook   : [true,[[-1,0],[1,0],[0,-1],[0,1]]]\n			Bishop : [true,[[-1,-1],[1,1],[1,-1],[-1,1]]]\n			Knight : [false,[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]]\n		@currentPiece = 'King'\n		@currentCol = 4\n		@currentRow = 7\n\n	genDir : (multi,sq,dxdy) ->\n		[dx,dy] = dxdy\n		squares = []\n		maximum = if multi then 7 else 1\n		[col,row] = sq\n		for i in range maximum\n			col += dx\n			row += dy\n			if 0<=col<=7 and 0<=row<=7 then squares.push [col,row]\n		squares\n\n	oneGeneration : (piece,sq) ->\n		[multi,drag] = @moves[piece]\n		squares = []\n		squares = squares.concat @genDir multi,sq,dxdy for dxdy in drag\n		squares\n\n	recurse : (level,piece,front,reached) ->\n		if front.length==0 then return reached\n		candidates = []\n		candidates = candidates.concat @oneGeneration piece,sq for sq in front\n		newFront = []\n		for candidate in candidates\n			key = candidate.toString()\n			if key not in _.keys reached\n				reached[key] = level\n				newFront.push candidate\n		@recurse level+1, piece, newFront, reached\n\n	solve : (piece,sq) ->\n		reached = {}\n		reached[sq.toString()] = 0\n		@recurse 1,piece,[sq],reached\n\n	draw  : ->\n		bg 0.5\n\n		for i in range 8\n			for j in range 8\n				fc (i+j+1)%2\n				rect 20*i,20*j,20,20\n\n		sc()\n		textAlign RIGHT,CENTER\n		textSize 13\n		for piece,i in _.keys @moves\n			if piece == @currentPiece then fc 1,1,0 else fc 0\n			text piece,200,10+20*i\n\n		textAlign CENTER,CENTER\n		textSize 16\n		reached = @solve @currentPiece,[@currentCol,@currentRow]\n		fc 1,0,0\n		for key,level of reached\n			arr = key.split ','\n			col = int arr[0]\n			row = int arr[1]\n			text level, 10+20*col,12+20*row\n\n	mousePressed : (mx,my) ->\n		if my >= 160 then return\n		if mx < 160\n			@currentCol = int mx/20\n			@currentRow = int my/20\n		else if my < 100\n			@currentPiece = _.keys(@moves)[int my/20]\n\napp = new ChessMany \"a\"",
  c: {
    app: "reset()"
  },
  d: "reset()|mousePressed 100,100|mousePressed 180,10|mousePressed 180,30|mousePressed 180,50|mousePressed 180,70|mousePressed 180,90"
};

ID_ChessRow = {
  v: '2017-04-29',
  k: 'bg fc range operators for lerp rect',
  l: 5,
  b: "",
  a: "bg 0.5\nfor i in range 8\n	fc i%2\n	x = 20+20*i\n	rect x,20, 20,20"
};

ID_ClickDetector = {
  v: '2017-04-29',
  k: 'bg sc fc range circle quad rect triangle class dist if operators text rectMode',
  l: 62,
  b: "class Vector\n	constructor : (@x,@y) ->\n	add : (b) -> new Vector @x+b.x,@y+b.y\n	div : (n) -> new Vector @x/n,@y/n\n\nclass ClickDetector extends Application\n	reset : ->\n		super\n	draw  : ->\n	mousePressed : (mx,my) ->\napp = new ClickDetector",
  a: "class Vector # pga att p5.Vector krockar med min serialisering\n	constructor : (@x,@y) ->\n	add : (b) -> cv @x+b.x,@y+b.y\n	div : (n) -> cv @x/n,@y/n\ncv = (x,y) -> new Vector x,y\n\nclass Figure\n	constructor : (pc) ->\n		@pc = cv(int(pc.x),int(pc.y))\n		@counter = 0\n	draw : -> text @counter,@pc.x,@pc.y\n	detect : (bool) ->\n		if bool then @counter++\n		bool\n\nclass Circle extends Figure\n	constructor : (@p,@radius,@r,@g,@b) -> super @p\n	detect : (mx,my) -> super @radius > dist @p.x,@p.y,mx,my\n	draw : -> super circle @p.x,@p.y, @radius\n\nclass Rect extends Figure\n	constructor : (@p,@w,@h,@r,@g,@b) -> super @p\n	detect : (mx,my) -> super @p.x-@w/2 < mx < @p.x+@w/2 and @p.y-@h/2 < my < @p.y+@h/2\n	draw : -> super rect @p.x,@p.y,@w,@h\n\nclass Triangle extends Figure\n	constructor : (@v1,@v2,@v3,@r=0,@g=0,@b=0) -> super @v1.add(@v2).add(@v3).div(3)\n	detect : (mx,my) ->\n		pt = cv mx,my\n		sign = (p1,p2,p3) -> (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)\n		b1 = 0 > sign pt, @v1, @v2\n		b2 = 0 > sign pt, @v2, @v3\n		b3 = 0 > sign pt, @v3, @v1\n		super b1 == b2 and b2 == b3\n	draw : -> super triangle @v1.x,@v1.y, @v2.x,@v2.y, @v3.x,@v3.y\n\nclass Quad extends Figure\n	constructor : (@v1,@v2,@v3,@v4, @r,@g,@b) -> super @v1.add(@v2).add(@v3).add(@v4).div(4)\n	detect : (mx,my) ->\n		t1 = new Triangle @v1,@v2,@v3\n		t2 = new Triangle @v1,@v3,@v4\n		super t1.detect(mx,my) or t2.detect(mx,my)\n	draw : -> super quad @v1.x,@v1.y, @v2.x,@v2.y, @v3.x,@v3.y, @v4.x,@v4.y\n\nclass ClickDetector extends Application\n	classes : -> [Vector,Circle,Rect,Triangle,Quad]\n	reset : ->\n		super\n		@figures = []\n		@figures.push new Circle cv(70,70), 50, 1,0,0\n		@figures.push new Rect cv(130,130), 100,100, 1,1,0\n		@figures.push new Triangle cv(100,100), cv(120,0), cv(190,120), 0,1,0\n		@figures.push new Quad cv(0,160), cv(60,100), cv(100,120), cv(60,200), 0.5,0.5,0.5\n	draw : ->\n		rectMode CENTER\n		textAlign CENTER,CENTER\n		textSize 50\n		bg 0.5\n		sc 0\n		sw 2\n		for figure in @figures\n			fc figure.r,figure.g,figure.b,0.5\n			figure.draw()\n	mousePressed : (mx,my) ->\n		rev = @figures[..]\n		rev.reverse()\n		for figure in rev\n			return if figure.detect mx,my\n\napp = new ClickDetector \"a\"",
  c: {
    app: "reset()"
  },
  d: "reset()|mousePressed 70,70|mousePressed 90,90|mousePressed 100,100",
  e: {
    Triangle: "http://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle"
  }
};

ID_CoffeescriptClock = {
  v: '2017-09-30',
  k: 'bg fc sc range operators for "" text angleMode sin cos',
  l: 10,
  b: "",
  a: "bg 1\nfc 0\nsc()\ntextSize 20\ntextAlign CENTER,CENTER\nangleMode DEGREES\nfor i in range 12\n	v = 30*i-90\n	x = 100 + 90 * cos v\n	y = 100 + 90 * sin v\n	text \"Coffeescript\"[i],x,y"
};

ID_ColorCross = {
  v: '2017-09-09',
  k: 'bg sc lerp range for point',
  l: 11,
  b: "# LÄXA: Sista tre sidorna.\n#    bM     blue\n#    BR     Black\n# bB BR RM  Red\n# CG GY YW  Magenta\n#    GY     Green\n#    CW     Cyan\n#    CW     White\n#    bM     Yellow",
  a: "bg 0.5\nfor k in range 6\n	x = [3,1,3,5,3,3][k]\n	y = [0,2,2,2,4,6][k]\n	for i in range 50\n		r = [i,0,i,50,i,i][k]\n		for j in range 50\n			g = [0,j,j,j,50,50-j][k]\n			b = [50-j,50-i,0,i,j,50][k]\n			sc r/50,g/50,b/50\n			point 25*x+i,25*y+j",
  e: {
    'Color Cube': 'https://www.google.se/search?q=color+cube&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi7moKIxNDWAhXFC5oKHTn8B1MQ_AUICigB&biw=2133&bih=1187#imgrc=liFgIqI48junAM:'
  }
};

ID_ColorCube = {
  v: '2017-04-29',
  k: 'bg range for class quad [] stroke if operators return',
  l: 33,
  b: "class ColorCube extends Application\n	reset       : ->\n		super\n	draw        : ->\n	undo 				: ->\n	mousePressed : (mx,my) ->\napp = new ColorCube",
  a: "class ColorCube extends Application\n	reset : ->\n		super\n		@r = 0\n		@g = 0\n		@b = 0\n		@size = 256\n		@history = []\n	draw : ->\n		bg 0\n		@c = @size / 4\n		for b in range 4\n			for r in range 4\n				for g in range 4\n					fill   @r+r*@c+@c/2, @g+g*@c+@c/2, @b+b*@c+@c/2\n					stroke @r+r*@c+@c/2, @g+g*@c+@c/2, @b+b*@c+@c/2\n					x = r*40-g*10\n					y = g*10+b*50 + 5\n					quad x+40,y+0, x+80,y+0, x+70,y+10, x+30,y+10\n	mousePressed : (mx,my) ->\n		if @size == 4 then return\n		for b in range 4\n			for r in range 4\n				for g in range 4\n					x = r*40-g*10\n					y = g*10+b*50 + 5\n					if x+35 <= mx <= x+75 and y <= my <= y+10\n						@history.push [@r,@g,@b,@size]\n						@size /= 4\n						@r += r * @size\n						@g += g * @size\n						@b += b * @size\n						return\n\n	undo : -> if @history.length > 0 then [@r,@g,@b,@size] = @history.pop()\n\napp = new ColorCube \"a\"",
  c: {
    app: "reset()|undo()"
  },
  d: "reset()|mousePressed 30,30|mousePressed 40,40|undo()",
  e: {
    ColorCube: "https://www.google.se/search?q=color+cube&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwjo3_Cm3Y7TAhUJb5oKHcFhCKQQsAQIJg&biw=1745&bih=963&dpr=1.1"
  }
};

ID_ColorPair = {
  v: '2017-04-29',
  k: 'fc circle [] .. dist _.isEqual colorMode HSB _.max _.pairs _.sortBy for class',
  l: 41,
  b: "class ColorPair extends Application\n	reset : ->\n		super\n		@seed = 0\n	draw : ->\n	mousePressed : (mx,my) ->\n	enterName : ->\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\napp = new ColorPair",
  a: "class ColorPair extends Application\n	reset : ->\n		super\n		@radius = 0\n		@seed = 0\n		@level = 0\n		@changeLevel 1\n		@name = \"\"\n		@highScore = {}\n\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\n\n	draw : ->\n		bg 1\n		sw 2\n		sc 1,1,1,0.5\n		colorMode HSB\n		for [x,y,c] in @circles\n			fill color c,100,100,0.5\n			circle x,y,@radius\n\n	mousePressed : (mx,my) ->\n		hitlist = []\n		for [x,y,c],i in @circles\n			if dist(x,y,mx,my) < @radius then hitlist.push i\n		if hitlist.length == 1\n			i = hitlist[0]\n			circle = @circles[i]\n			if @memory == -1\n				@memory = circle[2]\n				@circles.splice i,1\n			else if _.isEqual(@memory, circle[2])\n				@memory = -1\n				@circles.splice i,1\n				if @circles.length == 0\n					@updateHighScore() if @name != \"\"\n					@changeLevel 1\n			else\n				@changeLevel -1\n		else\n			@changeLevel -1\n\n	updateHighScore : ->\n		@highScore[@name] = _.max [@level, @highScore[@name]]\n		@topList = _.pairs @highScore\n		@topList = _.sortBy @topList, ([name,level]) -> -level\n\n	changeLevel : (d) ->\n		@memory = -1\n		@level = constrain @level+d, 1, 20\n		@circles = []\n		@radius = 50\n		for i in range @level\n			@radius *= 0.95\n			c = int i * 360 / @level\n			@circles.push [@randint(200), @randint(200), c]\n			@circles.push [@randint(200), @randint(200), c]\n\n	enterName : (name='') -> \n		@name = name\n		if name == '' then @name = @readText()\n\napp = new ColorPair \"a\"",
  c: {
    app: "reset()|enterName()"
  },
  d: "reset()|mousePressed 190,50|mousePressed 20,140|mousePressed 180,20|mousePressed 100,20|mousePressed 180,120|mousePressed 180,180",
  e: {
    ColorPair: "https://christernilsson.github.io/ColorPair"
  }
};

ID_Complex = {
  v: '2017-04-29',
  k: 'bg fc sc range operators [] line circle text for if return int {} dist _.isEqual constrain class',
  l: 80,
  b: "class Complex extends Application\n	reset : ->\n		super\n	draw : ->\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\n	mousePressed : (mx,my) ->\napp = new Complex",
  a: "class Complex extends Application\n	reset : ->\n		super\n		@RADIUS = 25\n		@buttons = [[30,130,'m'],[70,170,'*i'],[130,170,'*2'],[170,130,'+1'],[30,30,'undo'], [170,30,'new']]\n		@seed = 0\n		@level = 1\n		@createGame()\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\n	gr : ->\n		sc 1,1,1,0.5\n		for i in range 21\n			line 0, 10 * i, 200, 10 * i\n			line 10 * i, 0, 10 * i, 200\n		sc 1,1,1\n		line 100,0, 100,200\n		line 0,100, 200,100\n	draw : ->\n		@buttons[4][2] = @level - @history.length\n		bg 0\n		@gr()\n		textAlign CENTER,CENTER\n		textSize 25\n		sc()\n		fc 1,0,0\n		circle 100+10*@b[0], 100-10*@b[1], 5\n		fc 0,1,0\n		circle 100+10*@a[0], 100-10*@a[1], 4\n		for [x,y,txt],i in @buttons\n			fc 1,1,0,0.4\n			circle x,y,@RADIUS\n			fc 1,1,0\n			text txt,x,y\n	newGame : ->\n		if @level >= @history.length and _.isEqual(@a,@b) then d=1 else d=-1\n		@level = constrain @level+d,1,16\n		@createGame()\n	createGame : ->\n		@history = []\n		@a = [-10 + @randint(20), -10 + @randint(20)]\n		q1 = [@a]\n		q2 = []\n		visited = {}\n		visited[@a] = true\n		expand = (n) ->\n			if visited[n] then return\n			if n[0]*n[0] + n[1]*n[1] > 1000 then return\n			visited[n] = true\n			q2.push n\n		for level in range @level\n			for [x,y] in q1\n				expand [y,x]\n				expand [-y,x]\n				expand [2*x,2*y]\n				expand [x+1,y]\n			q1 = q2\n			q2 = []\n		@b = @selectTarget q1\n	selectTarget : (lst) -> # within 21x21 window, if possible\n		bs = ([x,y] for [x,y] in lst when -10 <= x <= 10 and -10 <= y <= 10)\n		return bs[@randint(bs.length)] if bs.length > 0\n		_.min lst, ([x,y]) -> dist 0,0,x,y\n	undo : ->\n		if @history.length == 0 then return\n		@a = @history.pop()\n	mousePressed : (mx,my) ->\n		index = -1\n		for [x,y,txt],i in @buttons\n			if dist(mx,my,x,y) < @RADIUS then index = i\n		[x,y] = @a\n		a = []\n		if index == 0 then a = [y,x]\n		if index == 1 then a = [-y,x]\n		if index == 2 then a = [2*x,2*y]\n		if index == 3 then a = [x+1,y]\n		if index == 4 then @undo()\n		if index == 5 then @newGame()\n		if a.length != 0\n			@history.push @a\n			@a = a\n\napp = new Complex \"a\"\n",
  c: {
    app: "reset()"
  },
  d: "reset()|mousePressed 170,130|mousePressed 170,30|mousePressed 170,130|mousePressed 70,170|mousePressed 170,30",
  e: {
    "Komplexa tal": "http://www.matteboken.se/lektioner/matte-4/komplexa-tal/rakna-med-komplexa-tal"
  }
};

ID_Connect4 = {
  v: '2017-04-29',
  k: 'operators bg fc sc sw circle range text for class',
  l: 33,
  b: "class Connect4 extends Application\n	reset : ->\n		super\n	draw  : ->\n	undo  : ->\n	mousePressed : (mx,my) ->\napp = new Connect4",
  a: "class Connect4 extends Application\n	reset : ->\n		super\n		@SIZE = 27\n		@list = ([] for i in range 7)\n		@moves = []\n	draw : ->\n		bg 0\n		textAlign CENTER,CENTER\n		textSize @SIZE/2\n		fc()\n		sc 0.1,0.3,1\n		sw 0.2 * @SIZE\n		for i in range 7\n			for j in range 6\n				circle 100-@SIZE*3+@SIZE*i, 180-@SIZE*j, @SIZE/2\n		for column,i in @list\n			for nr,j in column\n				fc 1,nr%2,0\n				sw 1\n				circle 100-@SIZE*3+@SIZE*i, 180-@SIZE*j, @SIZE*0.4\n				fc 0\n				sc()\n				text nr, 100-@SIZE*3+@SIZE*i, 180-@SIZE*j\n		sc()\n		fc 1,(@moves.length+1)%2,0\n		circle 100,15,10\n	mousePressed : (mx,my) ->\n		nr = int (mx-(200-7*@SIZE)/2)/@SIZE\n		if 0 <= nr <= 6\n			@moves.push nr\n			@list[nr].push @moves.length\n	undo : -> if @moves.length > 0 then @list[@moves.pop()].pop()\n\napp = new Connect4 \"a\"",
  c: {
    app: "reset()|undo()"
  },
  d: "reset()|mousePressed 100,0|mousePressed 150,0|mousePressed 100,0|undo()|undo()|undo()",
  e: {
    Wikipedia: "https://en.wikipedia.org/wiki/Connect_Four"
  }
};

ID_Coordinator = {
  v: '2017-05-10',
  k: 'sc fc circle class dist if operators text',
  l: 30,
  b: "class Coordinator extends Application\n	reset : ->\n		super\n		@seed = 0\n	draw : ->\n	mousePressed : (mx,my) ->\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\napp = new Coordinator",
  a: "\nclass Coordinator extends Application\n	reset : ->\n		super\n		@seed = 0\n		@level = 1\n		@errors = 0\n		@newGame 0\n	newGame : (d) ->\n		if d==-1 then @errors++\n		@level = constrain @level+d, 1, 100\n		@radius = int 100/@level\n		@x = @randint 200\n		@y = @randint 200\n	draw : ->\n		fc 1,1,0\n		sc()\n		textAlign CENTER,CENTER\n		textSize 50\n		text @x + \",\" + @y,100,50\n		fc 0,1,0\n		text @level,67,150\n		fc 1,0,0\n		text @errors,133,150\n		fc()\n		sc 1,1,0\n		circle 100,100,@radius\n	mousePressed : (mx,my) ->\n		@seed++\n		@newGame if @radius >= dist mx,my,@x,@y then 1 else -1\n	randint : (n) -> int n * fraction 10000 * Math.sin @seed++\n\napp = new Coordinator \"a\"",
  c: {
    app: "reset()"
  },
  d: "reset()|mousePressed 0,141|mousePressed 40,195|mousePressed 169,173|mousePressed 36,157"
};

ID_CornerPoints = {
  v: '2017-04-29',
  k: 'sc sw point',
  l: 9,
  b: "# LÄXA: Grönt, gult och svart.\nsw\nsc\npoint\n",
  a: "sw 10\nsc 1,0,0\npoint 0,0\nsc 0,1,0\npoint 200,0\nsc 1,1,0\npoint 0,200\nsc 0\npoint 200,200",
  e: {
    Koordinatsystem: "http://www.matteboken.se/lektioner/matte-1/funktioner/koordinatsystem"
  }
};

ID_CornerPoints3 = {
  v: '2017-04-29',
  k: 'sc sw point',
  l: 17,
  b: "# LÄXA: Grönt, gult, vitt",
  a: "sw 10\nsc 1,0,0\npoint 20,0\npoint 20,20\npoint 0,20\n\nsc 0,1,0\npoint 180,0\npoint 180,20\npoint 200,20\n\nsc 1,1,0\npoint 20,180\npoint 20,200\npoint 0,180\n\nsc 1\npoint 180,180\npoint 180,200\npoint 200,180",
  e: {
    Koordinatsystem: "http://www.matteboken.se/lektioner/matte-1/funktioner/koordinatsystem"
  }
};

ID_CornerPoints7 = {
  v: '2017-04-29',
  k: 'sc sw point',
  l: 17,
  b: "# LÄXA: Grönt",
  a: "sw 10\nsc 1,0,0\npoint 30,0\npoint 30,10\npoint 30,20\npoint 30,30\npoint 10,30\npoint 20,30\npoint 0,30\n\nsc 0,1,0\npoint 170,200\npoint 170,190\npoint 170,180\npoint 170,170\npoint 190,170\npoint 180,170\npoint 200,170",
  e: {
    Koordinatsystem: "http://www.matteboken.se/lektioner/matte-1/funktioner/koordinatsystem"
  }
};

ID_Counter = {
  v: '2017-10-22',
  k: 'bg fc sc text operators class',
  l: 12,
  b: "# De blåa knapparna anropar metoder i de båda objekten\n# Klicka på reset() för att komma igång!\n\nclass Counter extends Application\n	reset : ->\n		super\n	draw  : ->\n	up    : ->\n	down  : ->\n	mousePressed : (mx,my) -> print \"mousePressed\",mx,my\napp = new Counter",
  a: "class Counter extends Application\n	reset : ->\n		super\n		@counter = 0\n	up : -> @counter += 1\n	down : -> @counter -= 1\n	draw : ->\n		bg 0.5\n		fc 1,1,0\n		sc()\n		textAlign CENTER,CENTER\n		textSize 100\n		text @counter,100,100\n	mousePressed : (mx,my) -> @counter += if my < 100 then 1 else -1\n\napp = new Counter \"a\"",
  c: {
    app: "reset()|up()|down()"
  },
  d: "reset()|up()|up()|up()"
};

ID_Cross = {
  v: '2017-10-31',
  k: 'fc rect sc',
  l: 4,
  b: "# LÄXA: Hela uppgiften",
  a: "fc 1,0,0\nsc()\nrect 85,70, 70,10\nrect 115,40, 10,100"
};
//# sourceMappingURL=C.js.map
