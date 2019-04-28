# Denna fil användes istället för sketch.coffee när man ska kalibrera en ny karta
# Klicka på tydliga referenspunkter i de fyra hörnen
# T ex vägskäl, hus, broar, kraftledningar, osv
# Avläs koordinaterna med tangent F12

img = null 
index = -1

# preload = -> img = loadImage '2019-SommarN.jpg'
# litteras = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 24 26 27 28 29 30 31 32'.split ' ' # 2019 Summer North
# points = 
# 	1: [1830,333]
# 	2: [1506,521]
# 	3: [907,711]
# 	4: [1193,873]
# 	5: [472,617]
# 	6: [228,841]
# 	7: [672,1013]
# 	8: [1125,1196]
# 	9: [1430,1290]
# 	10: [4361,503]
# 	11: [4118,1106]
# 	12: [3830,640]
# 	13: [3192,1133]
# 	14: [2664,873]
# 	15: [2322,1862]
# 	16: [4120,2699]
# 	17: [4181,3069]
# 	18: [4080,3361]	
# 	19: [3340,2904]
# 	20: [2691,2554]
# 	24: [3366,3217]
# 	26: [390,1935]
# 	27: [547,2143]
# 	28: [1462,2293]
# 	29: [1055,2620]
# 	30: [371,2502]
# 	31: [1090,3104]
# 	32: [2250,2750]

preload = -> img = loadImage '2019-SommarS.jpg'
litteras = '21 22 23 25 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50'.split ' ' # 2019 Summer South
points = 
	21: [4303,255]
	22: [4066,407]
	23: [3436,158]
	25: [3534,485]
	34: [1709,65]
	35: [1212,151]
	36: [2215,1008]
	37: [2571,1186]
	38: [2894,485]
	39: [3245,778]
	40: [4317,1003]
	41: [4303,685]
	42: [3868,1292]
	43: [3426,1281]
	44: [3536,1650]
	45: [4538,1763]
	46: [3926,2133]
	47: [3104,2025]
	48: [4256,2514]
	49: [3773,2493]
	50: [3231,2757]

setup = ->
	createCanvas img.width, img.height
	image img, 0,0, width,height
	print img
	fc()
	textSize 100
	textAlign CENTER,CENTER
	nextIndex()

draw = ->	
	image img, 0,0, width,height
	fc()
	circle mouseX,mouseY,88
	if index of litteras
		fc 0
		text litteras[index],mouseX,mouseY

nextIndex = ->
	while index==-1 or (index<litteras.length and points[litteras[index]])
		index += 1 

mousePressed = ->
	x = round mouseX
	y = round mouseY
	#if x < width and y < height
	points[litteras[index]] = [x, y]
	arr = ("\t#{key}: [#{value}]" for key,value of points)
	print "\n" + arr.join "\n"
	nextIndex()
