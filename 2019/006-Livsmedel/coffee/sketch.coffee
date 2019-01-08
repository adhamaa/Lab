f = (s) ->
	res = []
	total = {k:0,f:0,c:0,p:0,price:0,amount:0,n:'TOTAL'}
	for item in s.split '|'
		arr = item.split ' '
		key = arr[0]
		amount = parseInt arr[1]
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
	db.K0 = {n:'bacon',   k:308, f:28, c:3.5, p:14,   weight:125, price:13}
	db.K1 = {n:'chorizo', k:273, f:23, c:3.5, p:13,   weight:540, price:40}
	db.K2 = {n:'ägg',     k:140, f:10, c:0,   p:12.5, weight:630, price:33}
	db.K3 = {n:'musslor', k:100, f:2.8, c:3.1,p:15,   weight:250, price:32}
	db.K4 = {n:'fläsklägg', k:120, f:5.2, c:2.1,p:16, weight:1000, price:35}
	db.K5 = {n:'blodpudding', k:200, f:8.5, c:22,p:7.2, weight:500, price:9}
	db.K6 = {n:'kycklingklubba', k:200, f:14, c:0,p:19, weight:1000, price:27}
	db.K7 = {n:'ananas', k:60, f:0.4, c:12,p:0, weight:225, price:0}
	db.K8 = {n:'mango', k:70, f:0, c:15,p:0, weight:250, price:10.00}
	db.K9 = {n:'blåbär', k:53, f:1, c:9,p:1, weight:125, price:17.95}
	db.K10 = {n:'banan', k:101, f:0.5, c:22,p:1, weight:1000, price:22}
	db.K11 = {n:'glass', k:234, f:16, c:18,p:4, weight:250, price:10}


setup = ->
	createCanvas 200,200
	buildDb()

	# fläsklägg 984
	# kaffegrädde 1714
	# kalvlever 1441
	# kokhöna 1161
	# kycklinghjärta 1452
	# kycklinglever 1453
	# köttfärs 963
	# lammhjärta 1435
	# makrill 1279
	# mozarella
	# märgben 956
	# nötstek 950
	# pasta 2226
	# pollock 4615
	# räkor 1395 # OBS! Hälften går bort som skal
	# torsk 1246

	söndag = 'K0 125|K1 360|K2 120|K3 125'
	måndag = 'K6 500|K7 225|K8 250'
	tisdag = 'K5 350|K9 250|K10 320|K11 250'

	print ' kcal fat carb prot price amount name'
	for item in f tisdag
		print "#{fmt item.k,5} #{fmt item.f,3} #{fmt item.c,4} #{fmt item.p,4} #{fmt item.price,5,2} #{fmt item.amount,6} #{item.n}" #  #{fmt 50*item.f/item.p,4}%
	print '       75    5   20              Keto Std'
	print '       60    5   35              Keto HP'

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
