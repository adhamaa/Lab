ALFABET = "ABCDEFGHIJKLMOPQRSTUVWXYZ@0123456789"
CARDS = 9 # 3,6,9,12,15,18,21,24,27,30,33,36 
SIZE = 80

class Button
	constructor : (@title,i,j,@event) ->
		@visible = false 
		@x = (i+1) * SIZE
		@y = (j+1) * SIZE
	draw : ->
		rect @x,@y,SIZE,SIZE
		if @visible then text @title,@x,@y
	inside : (mx,my) -> @x-SIZE/2 < mx < @x+SIZE/2 and @y-SIZE/2 < my < @y+SIZE/2
	execute : -> @event()

clicks = 0
buttons = []
clicked = []

setup = ->
	createCanvas (6+1)*SIZE, SIZE + CARDS//3 * SIZE
	rectMode CENTER
	textAlign CENTER,CENTER
	textSize SIZE/2
	s = ALFABET.substr 0,CARDS
	arr = _.shuffle (s+s).split ''
	for title,i in arr
		buttons.push new Button title,i%%6,i//6, ->
			if @visible then return else @visible = true
			if clicked.length == 0 then clicked==[]
			else if clicked.length == 1 and clicked[0] != @
			else 
				if clicked[0].title == clicked[1].title
					click.found = true for click in clicked
				else 
					click.visible = false for click in clicked
				clicked = []
			clicks++
			clicked.push @

draw = ->
	bg 0.5
	button.draw() for button in buttons
	text clicks,width/2,SIZE/4

mousePressed = ->
	for button in buttons
		if button.inside mouseX,mouseY then button.execute()