p2 = # Ulvsjön
	lat: 59.277103
	lng: 18.164897

p1 = # Home
	lat: null
	lng: null
	#hng: null # NESW = [0,90,180,270]
	#spd: null # m/s
	timestamp: null

track = []

positionLat = document.getElementById "position-lat"
positionLng = document.getElementById "position-lng"
positionHng = document.getElementById "position-hng"
positionSpd = document.getElementById "position-spd"
positionTimestamp = document.getElementById "timestamp"
distance = document.getElementById "distance"

deltat = document.getElementById "deltat"
deltas = document.getElementById "deltas"
speed = document.getElementById "speed"
heading = document.getElementById "heading"
points = document.getElementById "points"

# decimalToSexagesimal = (decimal, type) ->
# 	degrees = decimal | 0
# 	fraction = Math.abs decimal - degrees
# 	minutes = (fraction * 60) | 0;
# 	seconds = (fraction * 3600 - minutes * 60) | 0

# 	direction = ""
# 	positive = degrees > 0
# 	degrees = Math.abs degrees
# 	if type == "lat" then direction = if positive then "N" else "S"
# 	if type == "lng" then	direction = if positive then "E" else "W"
# 	degrees + "° " + minutes + "' " + seconds + "\" " + direction

locationUpdate = (position) ->
	p1.lat = position.coords.latitude
	p1.lng = position.coords.longitude
	#p1.hng = position.coords.heading
	#p1.spd = position.coords.speed
	p1.timestamp = position.timestamp

	track.push p1

	positionLat.textContent = p1.lat
	positionLng.textContent = p1.lng
	positionHng.textContent = "#{Math.round calcHeading p1.lat,p1.lng, p2.lat,p2.lng} grader"
	positionSpd.textContent = p1.spd
	positionTimestamp.textContent = p1.timestamp

	distance.textContent = "#{Math.round distance_on_geoid p1.lat,p1.lng, p2.lat,p2.lng} meter"

	if track.length >= 2 
		p0 = track[track.length-2]
		deltat.textContent = "#{p1.timestamp - p0.timestamp} millis"
		deltas.textContent = "#{Math.round distance_on_geoid p0.lat,p0.lng, p1.lat,p1.lng} meter"
		speed.textContent = "?"
		heading.textContent = "#{Math.round calcHeading p0.lat,p0.lng, p1.lat,p1.lng} grader"

	points.textContent = track.length 

locationUpdateFail = (error) ->
	positionLat.textContent = "n/a"
	positionLng.textContent = "n/a"

navigator.geolocation.watchPosition locationUpdate, locationUpdateFail, 
		enableHighAccuracy: false
		maximumAge: 30000
		timeout: 27000