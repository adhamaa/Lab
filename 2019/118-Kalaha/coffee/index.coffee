playerTitle = ['Human','Computer']
playerComputer = [false,true]
player = 0 # 0 or 1
beans = 4
depth = 1
buttons  = [] 

messages = {}
messages.depth = depth
messages.time = 0
messages.result = ''
messages.letters = ''
messages.moves = 0

class Button
	constructor : (@x,@y,@value,@littera='',@click=->) -> @radie=40
	draw : ->
		fc 1,0,0
		circle @x,@y,@radie
		textAlign CENTER,CENTER
		if @value > 0 
			fc 1
			text @value,@x,@y
		else
			push()
			fc 0.8,0,0
			text @littera,@x,@y
			pop()
	inside : (x,y) -> @radie > dist x,y,@x,@y

setup = ->
	createCanvas 2*450,2*150
	textAlign CENTER,CENTER
	textSize 40
	for littera,i in 'abcdef'
		do (i) ->
			buttons.push new Button 2*100+2*50*i,2*100,beans,'',() -> HouseOnClick i
	buttons.push new Button 2*400,2*75,0
	for littera,i in 'ABCDEF'
		buttons.push new Button 2*100+2*50*(5-i),2*50,beans,littera
	buttons.push new Button 2*50,2*75,0
	reset beans

xdraw = ->
	bg 0
	for button in buttons
		button.draw()
	fc 1,1,0
	textAlign LEFT,CENTER
	text 'Level: '+messages.depth,2*10,2*20
	textAlign CENTER,CENTER
	text messages.result,width/2,2*135
	text messages.letters,width/2,2*20
	textAlign RIGHT,CENTER
	text messages.time+' ms',width-2*10,2*20
	text messages.moves,width-2*10,2*135

mousePressed = () ->
	if messages.result != '' then return reset 0
	messages.letters = ''
	for button in buttons
		if button.inside mouseX,mouseY then button.click()

reset = (b) ->
	if b > 0 then	beans = b
	for button in buttons
		button.value = beans
	buttons[6].value = 0
	buttons[13].value = 0
	if depth < 1 then depth = 1
	messages.depth = depth
	messages.time = 0
	messages.result = ''
	messages.letters = ''
	messages.moves = 0

	player = _.random 0,1
	if player == 1 then ActiveComputerHouse()
	console.log player
	xdraw()

keyPressed = -> 
	if messages.result == '' then return
	index = " 1234567890".indexOf key
	if index >= 0 then reset index

ActiveComputerHouse = () -> 
	start = new Date()
	result = alphaBeta depth, player 
	#result = minimax depth, player
	messages.time += new Date() - start
	HouseOnClick result

HouseButtonActive = () -> if playerComputer[player] then ActiveComputerHouse() 

HouseOnClick = (pickedHouse) ->
	messages.letters += 'abcdef ABCDEF'[pickedHouse]
	if buttons[pickedHouse].value == 0 then return 
	house = buttons.map (button) -> button.value
	again = Relocation(house, pickedHouse)
	for i in range 14
		buttons[i].value = house[i]
	if again == false
		if player==1
			console.log messages.letters
			messages.moves++
		player = 1 - player
	if HasSuccessors(house)
		HouseButtonActive()
	else 
		FinalScoring(house)
		for i in range 14
			buttons[i].value = house[i]

		if house[13] > house[6]
			messages.result = playerTitle[1] + " Wins"
			depth--
		else if house[13] == house[6]
			messages.result = "Tie"
		else
			messages.result = playerTitle[0] + " Wins"
			depth++
		console.log ''
	xdraw()

Relocation = (house, pickedHouse) ->
	playerShop = 6
	opponentShop = 13
	if pickedHouse > 6
		playerShop = 13
		opponentShop = 6

	index = pickedHouse
	seeds = house[pickedHouse]
	house[index] = 0 
	while seeds > 0 
		index = (index + 1) % 14
		if index == opponentShop then continue
		house[index]++
		seeds--

	if index == playerShop then return true

	if house[index] == 1 and house[12 - index] != 0 and index >= (playerShop - 6) and index < playerShop
		house[playerShop] += house[12 - index] + 1
		house[index] = house[12 - index] = 0
	false

FinalScoring = (house) ->
	for i in range 6
		house[6] += house[i]
		house[13] += house[7 + i]
		house[i] = house[7 + i] = 0

Evaluate = (house, player1, player2) -> house[player1] - house[player2]

HasSuccessors = (house) ->
	player1 = false
	player2 = false
	for i in range 6
		if house[i] != 0 then player1 = true
		if house[7 + i] != 0 then player2 = true
	player1 and player2
