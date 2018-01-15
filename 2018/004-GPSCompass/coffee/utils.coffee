# https://cdn.rawgit.com/chrisveness/geodesy/v1.1.2/latlon-spherical.js
distance_on_geoid = (p1,p2) ->

	q1 = LatLon p1.lat,p1.lng
	q2 = LatLon p2.lat,p2.lng
	q1.distanceTo q2	

	# lat1 = p1.lat
	# lon1 = p1.lng

	# lat2 = p2.lat
	# lon2 = p2.lng

	# # Convert degrees to radians
	# lat1 *= Math.PI / 180.0
	# lon1 *= Math.PI / 180.0
 
	# lat2 *= Math.PI / 180.0
	# lon2 *= Math.PI / 180.0
 
	# # radius of earth in metres
	# r = 6378100
 
	# # P
	# rho1 = r * Math.cos lat1
	# z1 = r * Math.sin lat1
	# x1 = rho1 * Math.cos lon1
	# y1 = rho1 * Math.sin lon1
 
	# # Q
	# rho2 = r * Math.cos lat2 
	# z2 = r * Math.sin lat2
	# x2 = rho2 * Math.cos lon2
	# y2 = rho2 * Math.sin lon2
 
	# # Dot product
	# dot = x1 * x2 + y1 * y2 + z1 * z2
	# cos_theta = dot / (r * r)
 
	# theta = Math.acos cos_theta
 
	# # Distance in Metres
	# r * theta

calcHeading = (p1,p2) ->
	q1 = LatLon p1.lat,p1.lng
	q2 = LatLon p2.lat,p2.lng
	q1.bearingTo q2

precisionRound = (number, precision) ->
  factor = Math.pow 10, precision
  Math.round(number * factor) / factor