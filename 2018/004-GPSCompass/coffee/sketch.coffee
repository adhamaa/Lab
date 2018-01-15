places = []
places.push {name:'Bron S Söderbysjön',lat:59.279155, lng:18.149318}
places.push {name:'Golfklubben',       lat:59.284052, lng:18.145925}
places.push {name:'Sushi Bagarmossen', lat:59.277560, lng:18.132739}
places.push {name:'Hem',               lat:59.265205, lng:18.132735}
places.push {name:'Hellasgården',      lat:59.289813, lng:18.160577}
places.push {name:'Ulvsjön, Udden',    lat:59.277103, lng:18.164897}
placeIndex = 0
place = places[placeIndex]

w = null
h = null
track = []
bearing = 0
heading_12 = 0
lastObservation = 0

texts = ['','','','','','','','','','','','']

locationUpdate = (position) ->
	p1 = 
		lat : position.coords.latitude
		lng : position.coords.longitude
		accuracy : position.coords.accuracy
		timestamp : position.timestamp/1000

	track.push p1

	heading_12 = calcHeading p1,place
	lastObservation = millis()

	texts[0] = precisionRound place.lat,6
	texts[1] = precisionRound place.lng,6
	texts[3] = "#{track.length}"  
	texts[6] = "#{Math.round p1.accuracy} m"
	texts[8] = "#{Math.round heading_12}°"
	#texts[3] = 'nospeed' #p1.spd
	#texts[4] = p1.timestamp
	texts[10] = "#{Math.round distance_on_geoid p1,place} m"

	if track.length >= 2 
		p0 = track[track.length-2]
		dt = p1.timestamp-p0.timestamp
		ds = distance_on_geoid p0,p1
		texts[2] = "#{precisionRound dt,3} s"
		texts[4] = "#{Math.round ds} m"
		texts[5] = "#{precisionRound ds/dt,1} m/s"
		texts[9] = "#{Math.round calcHeading p0,p1}°"

locationUpdateFail = (error) ->
	texts[0] = "n/a"
	texts[1] = "n/a"

navigator.geolocation.watchPosition locationUpdate, locationUpdateFail, 
	enableHighAccuracy: true
	maximumAge: 30000
	timeout: 27000

calcColor = (delta) ->
	if delta < -180 then delta = delta + 360
	if delta > +180 then delta = delta - 360
	if delta < 0 then lerpColor(color(255,255,255), color(255,0,0),-delta/180).levels
	else lerpColor(color(255,255,255), color(0,255,0),delta/180).levels

setup = ->
	createCanvas windowWidth,windowHeight
	w = windowWidth
	h = windowHeight	

	window.addEventListener "deviceorientation", (event) ->
		bearing = event.alpha

		if typeof event.webkitCompassHeading != "undefined"
			bearing = event.webkitCompassHeading # iOS non-standard

		texts[7] = "#{Math.round (millis() - lastObservation)/1000} s"
		texts[9] = "#{Math.round bearing}°"
		texts[11] = "#{Math.round bearing - heading_12}°"

	assert [255,255,255,255], calcColor 0
	assert [255,128,128,255], calcColor -90
	assert [255,0,0,255], calcColor -180
	assert [128,255,128,255], calcColor 90
	assert [0,255,0,255], calcColor 180

drawCompass = ->
	radius = 0.25 * w 
	fill calcColor heading_12 - bearing
	sw 5
	sc 1
	circle 0.5*w,0.7*h,radius
	push()
	translate 0.5*w,0.7*h
	sc 1
	line 0,0,0,-radius
	try
		rd heading_12 - bearing
		sc 0 
		line 0,0,0,-radius
	pop()

draw = ->
	bg 0
	drawCompass()
	fc 0.5
	d = h/12
	sc 0.5
	sw 1
	textSize 0.08*h
	for t,i in texts
		x = i%2 * w
		if i%2==0 then textAlign LEFT else textAlign RIGHT
		y = d*Math.floor i/2
		text t,x,2*d+y
	textAlign CENTER
	text place.name,w/2,d

mousePressed = ->
	if mouseY > h/2 and track.length>0
		p = track[track.length-1]
		places.push {name:places.length, lat:p.lat, lng:p.lng}
		placeIndex = places.length-1

	else if mouseX > w/2 then placeIndex++
	else placeIndex--
	placeIndex %%= places.length
	place = places[placeIndex]
	texts = ['','','','','','','','','','','','']
	texts[0] = precisionRound place.lat,6
	texts[1] = precisionRound place.lng,6