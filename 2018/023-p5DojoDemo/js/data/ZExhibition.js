'use strict';

// Generated by CoffeeScript 2.0.3
var ID001, ID002, ID003, ID004, ID005, ID006, ID007, ID008, ID009, ID010, ID011, ID012, ID013, ID014, ID015, ID016, ID017, ID018;

ID001 = { // clown:
  v: '2017-05-02',
  k: 'bg circle fc sc sw line lerp',
  l: 30,
  b: "# (David Larsson)\n",
  a: "bg 0, 1, 0, 0.5\nfc 1, 0, 0\ncircle 10, 10, 5\ncircle 20, 20, 10\nfor i in range 10\n	x = lerp 10, 20, i\n	y = x\n	r = lerp 5, 10, i\n	circle x, y, r\nfc 0, 1, 1\ncircle 190, 10, 5\ncircle 180, 20, 10\nfor i in range 10\n	x = lerp 190, 180, i\n	y = lerp 10, 20, i\n	r = lerp 5, 10, i\n	circle x, y, r\nfc 1\ncircle 100, 100, 50\nfc 0\ncircle 80, 80, 10\ncircle 120, 80, 10\nsc 1, 1, 0\nsw 5\nline 70, 105, 80, 120\nline 80, 120, 115, 120\nline 115, 120, 130, 105\nfc 1, 0, 0\nsc 1, 0, 0\ncircle 100, 100, 10\n"
};

ID002 = { //tomteluva:
  v: '2017-05-02',
  k: 'circle fc sc triangle',
  l: 12,
  b: "# (Sabrina Larsson)\n",
  a: "bg 0,1,0\nfc 1,0,0\nsc 1,0,0\ntriangle 60,140,100,60,140,140\nfc 1\nsc 1\ncircle 60,140,10\ncircle 80,140,10\ncircle 100,140,10\ncircle 120,140,10\ncircle 140,140,10\ncircle 100,60,10"
};

ID003 = { // snowman:
  v: '2017-05-02',
  k: 'circle fc line sc triangle',
  l: 21,
  b: "# (David Larsson)\n",
  a: "fc 1\ncircle 100, 150, 50\ncircle 100, 70, 40\nfc 0\ncircle 80, 60, 8\ncircle 120, 60, 8\ncircle 85, 90, 6\ncircle 95, 95, 6\ncircle 115, 90, 6\ncircle 105, 95, 6\nfc 1, 0, 0, 0.5\ntriangle 100, 65, 90, 80, 105, 75\nsc 1, 1, 0\nsw 3\nline 50, 140, 30, 90\nline 35, 100, 40, 80\nline 140, 140, 170, 90\nline 160, 105, 155, 100\nfc 1\nsc 1\nrect 2, 180, 196, 20"
};

ID004 = { // christmasTree:
  v: '2017-05-02',
  k: 'bg circle fc line rect quad sc triangle',
  l: 35,
  b: "# (Sabrina Larsson)\n",
  a: "bg 0\nfc 0, 1, 0\nsc 0, 1, 0\ntriangle 100, 100, 180, 160, 20, 160\ntriangle 100, 60, 160, 120, 40, 120\ntriangle 100, 40, 140, 80, 60, 80\nfc 0.5\nsc 0.5\nrect 80, 160, 40, 20\nfc 1, 1, 0\nsc 1, 1, 0\nquad 100, 0, 120, 20, 100, 40, 80, 20\nrect 85, 5, 30, 30\nsc 1, 1, 0\nline 80, 60, 140, 120\nline 60, 100, 120, 160\nfc 1, 0, 0\nsc 1, 0, 0\ncircle 80, 100, 5\ncircle 140, 140, 5\ncircle 100, 60, 5\ncircle 60, 160, 5\ncircle 100, 120, 5\nfc 1\nsc 1\nrect 0, 180, 200, 20\ncircle 20, 20, 5\ncircle 40, 40, 5\ncircle 10, 80, 5\ncircle 30, 140, 5\ncircle 50, 100, 5\ncircle 120, 50, 5\ncircle 160, 20, 5\ncircle 180, 80, 5\ncircle 160, 130, 5\ncircle 190, 180, 5"
};

ID005 = { // santa:
  v: '2017-05-02',
  k: 'bg circle ellipse fc rect quad sc triangle',
  l: 18,
  b: "# (Sabrina Larsson)\n",
  a: "bg 0,0,1\nfc 1,0,0\nsc 1,0,0\nellipse 100,50,60,70\nrect 60,20,30,10\nquad 140,10,145,20,120,25,115,20\nfc 0\nsc 0\ncircle 50,25,10\nrect 70,40,60,10\ncircle 140,20,10\nsc 1,1,0\nrect 100,45,5,5\nfc 0.5\nsc 0.5\nrect 60,80,80,20\nrect 80,100,40,60\ntriangle 100,140,0,200,200,200"
};

ID006 = { // dist:
  v: '2017-05-02',
  k: 'bg circle dist fc lerp map sc',
  l: 10,
  b: "",
  a: "bg 0\nfc 1\nsc()\nfor i in range 10\n	x = lerp 10,30,i\n	for j in range 10\n		y = lerp 10,30,j\n		d = dist 100,100,x,y\n		r = map(d,0,150,1,20)/2\n		circle x,y,r"
};

ID007 = { // bulge:
  v: '2017-05-02',
  k: 'bg circle dist fill map noStroke sin',
  l: 10,
  b: "",
  a: "bg 0\nfill 255\nnoStroke()\nfor i in range 20\n	for j in range 20\n		x = i*200/20+5\n		y = j*200/20+5\n		r = map(sin(i*PI/20),-1,1,1,3) * map(sin(j*PI/20),-1,1,1,3) / 2\n		circle x,y,r"
};

ID008 = { // wave:
  v: '2017-05-02',
  k: 'circle colorMode fill map noStroke sin PI',
  l: 9,
  b: "",
  a: "colorMode HSB,360,100,100\nnoStroke()\nbg 0\nfor i in range 21\n	fill map(i,0,20,0,360),100,100\n	a = map i,0,20,0,2*PI\n	x = 10*i\n	y = map sin(a),-1,1,0,200\n	circle x,y,3"
};

ID009 = { // circle:
  v: '2017-05-02',
  k: 'bg circle colorMode cos fc map PI sc sin',
  l: 10,
  b: "",
  a: "bg 0\ncolorMode HSB,360,100,100\nfor i in range 20\n	r=map i,0,19,0,360\n	fill r,255,255\n	a=map i,0,20,0,2*PI\n	sc()\n	x=map cos(a),-1,1,0,200\n	y=map sin(a),-1,1,0,200\n	circle x,y,3"
};

ID010 = { // circles:
  v: '2017-05-02',
  k: 'bg circle colorMode cos fill map noStroke translate sin PI',
  l: 12,
  b: "",
  a: "bg 0\nnoStroke()\ncolorMode HSB,360,100,100\ntranslate 100,100\nfor i in range 20\n	for j in range 11\n		fill map(i,0,20,0,360),255,255\n		a = map i,0,20,0,2*PI\n		x = map cos(a),-1,1,-j*10,j*10\n		y = map sin(a),-1,1,-j*10,j*10\n		r = 3\n		circle x,y,r"
};

ID011 = { // sized_circles:
  v: '2017-05-02',
  k: 'circle colorMode cos fill map noStroke PI sin translate',
  l: 12,
  b: "",
  a: "bg 0\nnoStroke()\ncolorMode HSB,360,100,100\ntranslate 100,100\nfor i in range 20\n	fill map(i,0,20,0,360),255,255\n	a = map i,0,20,0,2*PI\n	for j in range 11\n		x = map cos(a),-1,1,-j*10,j*10\n		y = map sin(a),-1,1,-j*10,j*10\n		r = map(j,0,10,0,10)/2\n		circle x,y,r"
};

ID012 = { // rotated_circles:
  v: '2017-05-02',
  k: 'circle cos map PI push pop rotate sin translate',
  l: 17,
  b: "",
  a: "colorMode HSB,360,100,100\nsc()\nbg 0\ntranslate 100,100\nfor i in range 20\n	r = map i,0,20,0,360\n	a=map i,0,20,0,2*PI\n	for j in range 11\n		push()\n		rotate map j,0,10,0,360\n		fill r,255,255\n		x=map cos(a),-1,1,-j*10,j*10\n		y=map sin(a),-1,1,-j*10,j*10\n		circle x,y,j/2\n		pop()"
};

ID013 = { // gravity :
  v: '2017-05-02',
  k: 'circle lerp',
  l: 6,
  b: "",
  a: "fc 1\nfor i in range 15\n	x=5+10*i\n	y=5+lerp(0,lerp(0,1,i),i)\n	circle x,y,5"
};

ID014 = { // hypnoticA :
  v: '2017-05-02',
  k: 'bg circle cos fc sc sin',
  l: 6,
  b: "",
  a: "bg 0.5, 0, 0\nsc()\nfc 1\nfor i in range 100\n	x = 100 + cos(i) * i\n	y = 100 + sin(i) * i\n	circle x, y, 5"
};

ID015 = { // hypnoticB :
  v: '2017-05-02',
  k: 'bg circle cos fc map sc sin',
  l: 7,
  b: "",
  a: "bg 0.5, 0, 0\nsc()\nfc 1\nfor i in range 100\n	x = 100 + cos(i) * i\n	y = 100 + sin(i) * i\n	speed = i/10.0\n	r = map sin(5*speed), -1, 1, 2, 5\n	circle x, y, r"
};

ID016 = { // Rainbow :
  v: '2017-05-02',
  k: 'bg fc sc sw circle arc',
  l: 37,
  b: "# (Isabel T)\n",
  a: "bg 0.5,0.8,1\n\nsw 11\nfc()\nsc 0.9,0.1,0.1\narc 100,97,190,180,PI,PI\nsc 0.9,0.4,0.1\narc 100,107,180,180,PI,PI\nsc 1,0.75,0\narc 100,117,170,180,PI,PI\nsc 0.4,0.75,0.2\narc 100,127,160,180,PI,PI\nsc 0.1,0.65,0.6\narc 100,137,150,180,PI,PI\nsc 0.15,0.45,0.65\narc 100,147,140,180,PI,PI\nsc 0.55,0.25,0.55\narc 100,157,130,180,PI,PI\n\nsw 0\nfc 1\ncircle 0,108,10\ncircle 10,120,13\ncircle 15,130,10\ncircle 20,145,13\ncircle 35,157,12\ncircle 37,170,12\ncircle 25,175,10\ncircle 10,170,10\ncircle 5,150,26\n\ncircle 200,108,10\ncircle 190,120,13\ncircle 185,130,10\ncircle 180,145,13\ncircle 165,157,12\ncircle 163,170,12\ncircle 175,175,10\ncircle 190,170,10\ncircle 195,150,26"
};

ID017 = { // Melon :
  v: '2017-05-15',
  k: 'bg fc sc rect',
  l: 44,
  b: "# (Sabrina)\n",
  a: "bg 0.866, 0.941, 1.000\nfc 0.168, 0.615, 0.000\nsc()\nrect 170,40,10,60\nrect 160,30,10,10\nrect 150,20,10,10\nrect 160,100,10,20\nrect 150,110,10,20\nrect 140,120,10,20\nrect 130,130,10,10\nrect 80,140,50,10\nrect 60,130,10,10\nrect 50,120,10,10\nfc 0.415, 0.745, 0.000\nrect 50,110,10,10\nrect 60,120,10,10\nrect 70,130,60,10\nrect 130,120,10,10\nrect 140,110,10,10\nrect 150,100,10,10\nrect 160,40,10,60\nrect 150,30,10,10\nrect 140,20,10,10\nfc 0.980, 0.772, 1.000\nrect 140,30,10,20\nrect 150,40,10,60\nrect 140,90,10,20\nrect 120,110,20,10\nrect 70,120,60,10\nrect 60,110,20,10\nfc 0.890, 0.062, 0.000\nrect 80,80,40,40\nrect 120,40,20,70\nrect 110,50,40,40\nrect 90,70,10,10\nrect 100,60,10,20\nrect 70,90,10,20\nrect 60,100,10,10\nrect 130,30,10,10\nfc 0\nrect 80,100,10,10\nrect 100,90,10,10\nrect 120,70,10,10\nrect 130,50,10,10"
};

ID018 = { // Sailing Boat :
  v: '2017-05-26',
  k: 'bg fc sw sc circle triangle line angleMode rotate arc ellipse',
  l: 24,
  b: "# (Sabrina)\n",
  a: "bg 0,1,1\nfc 1,1,0\nsw 0\ncircle 130,100,57\nsw 8\nsc 1,1,0\nnoFill()\ncircle 130,100,75\ncircle 130,100,105\nfc 1\nsc()\ntriangle 100,120,60,120,100,56\nsc 0.25,0.25,0\nsw 10\nline 100,60,100,125\nfc 0.25,0.25,0\nsw 0\nsc 0\nrotate 20\narc 130,70,100,100,0,1900,0\nfc 0,0,1\nellipse 100,170,150,100\nellipse 170,150,150,100\nellipse 250,125,170,100"
};
//# sourceMappingURL=ZExhibition.js.map