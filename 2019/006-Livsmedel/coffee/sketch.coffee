f = (dag) ->
	res = []
	total = {k:0,f:0,c:0,p:0,price:0,amount:0,n:'TOTAL'}
	for key,amount of dag
		#arr = item.split ' '
		#key = arr[0]
		#amount = parseInt arr[1]
		data = db[key]

		n = data.n # name
		price = amount * data.price / data.weight 
		k = amount * data.k/100 # kcal RDI:2300 kcal
		c = amount * data.c/100 # carb g
		f = amount * data.f/100 # fat g 
		p = amount * data.p/100 # prot g 
		res.push {k,c,f,p,price,amount,n}

		total.k += k
		total.c += c # [g]
		total.f += f # [g]
		total.p += p # [g]
		total.price += price 
		total.amount += amount

	res.push total
	summa = (total.f+total.c+total.p)/100
	res.push {k:0,f:total.f/summa,c:total.c/summa,p:total.p/summa,price:0,amount:0,n:'%'}
	res

fmt = (value,width,decs=0) -> value.toFixed(decs).padStart width

db = {}
buildDb = ->
	db.K1  = {n:'paulun', k:405, f:13, c:53,p:12, weight:500, price:50}
	db.K2  = {n:'banan', k:101, f:0.5, c:22,p:1, weight:1000, price:22}
	db.K3  = {n:'blåbär', k:53, f:1, c:9,p:1, weight:125, price:30}
	db.K4  = {n:'avocado', k:197, f:20, c:6.5,p:1.9, weight:55, price:10}
	db.K5  = {n:'lammkorv', k:190, f:10, c:7,p:17, weight:250, price:32}
	db.K6  = {n:'spaghetti', k:360, f:2, c:71,p:12, weight:500, price:15}
	db.K7  = {n:'tomat', k:22, f:0, c:5,p:0, weight:350, price:25}
	db.K8  = {n:'rödbetsjuice', k:40, f:0, c:8,p:1, weight:750, price:38} # ok
	db.K9  = {n:'morot', k:36, f:0, c:6.6,p:0.7, weight:1000, price:30}
	db.K10 = {n:'lök', k:39, f:0, c:7.3,p:1.2, weight:1000, price:10}
	db.K11 = {n:'potatis', k:83, f:0, c:17.5,p:1.8, weight:1000, price:13}
	db.K12 = {n:'köttfärs', k:205, f:15, c:0,p:19, weight:300, price:30}
	db.K13 = {n:'ägg',     k:140, f:10, c:0,   p:12.5, weight:600, price:33}
	db.K14 = {n:'sill', k:210, f:11, c:17.5, p:9.6, weight:110, price:16}
	db.K15 = {n:'havregryn', k:370, f:7, c:58, p:13, weight:650, price:26}
	db.K16 = {n:'borlottibönor', k:290, f:0.8, c:35,p:24, weight:500, price:23}
	db.K17 = {n:'råris', k:359, f:2.5, c:74,p:7.4, weight:1000, price:0}
	db.K18 = {n:'svarta bönor', k:300, f:2.4, c:35,p:24, weight:400, price:23}
	db.K19 = {n:'sallad', k:23, f:0.3, c:3.6,p:1.5, weight:150, price:23}

setup = ->
	createCanvas 200,200
	buildDb()

	dag = 
		K1: 25
		K2: 150
		K3: 25
		K4: 50
		#K5: 0 #125
		K6: 100
		K7: 40
		K8: 100
		K9: 60
		K10: 40
		K11: 100
		#K12: 0
		K13: 60
		K14: 110
		K15: 25
		#K16: 0
		K19: 75

	print ' kcal fat carb prot price amount name'
	for item in f dag 
		print "#{fmt item.k,5} #{fmt item.f,3} #{fmt item.c,4} #{fmt item.p,4} #{fmt item.price,5,2} #{fmt item.amount,6} #{item.n}" #  #{fmt 50*item.f/item.p,4}%

	print '        8   80   12              McDougall'
	print '       40   40   20              Std Am Diet'

#######

		# gr = 1
# mgr = 0.001
# µgr = 1e-6

# RDI =
# 	mg: 0.350 * mgr
# 	selen: 1 * µgr # ren gissning

	# for line in database.split '\n'
	# 	arr = line.split '|' 
	# 	for item,i in arr
	# 		if item=='' then arr[i]=0
	# 	arr[0] = arr[0].toLowerCase()
	# 	if arr[0].includes 'chorizo' then print arr[0],arr[1]
	# 	db["K"+arr[1]] = arr

#format = (decs,unit,value) -> "#{value.toFixed decs} #{unit}"
