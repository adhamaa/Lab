
class Page

	constructor : (@columns, @init) -> 
		@table = getElem "table"
		@actions = []

	addAction : (title, f) -> @actions.push [title,f] 

	display : ->
		# actions
		if @actions.length > 0
			if @columns==0 then @columns = @actions.length 
			if @columns==0 then @columns = 1
			elem = getElem 'myActions'
			elem.innerHTML = ""
			div = null
			for [title,f],i in @actions
				do (f) =>
					if i%@columns==0 then div = document.createElement "div"
					div.appendChild makeButton title, @columns, f
					if i%@columns==@columns-1 then elem.appendChild div
			elem.appendChild div

		@table.innerHTML = "" 
		@init()
				
	addRow : (a,b=null) ->
		tr = document.createElement "tr"
		addCell tr,a
		if b then addCell tr,b
		@table.appendChild tr

storeData = (data) -> localStorage[KEY] = JSON.stringify data
fetchData = -> JSON.parse if localStorage[KEY] then localStorage[KEY] else '""'

storeAndGoto = (data,page) ->
	storeData data
	page.display()

isNumeric = (val) -> val == Number parseFloat val
getElem = (id) -> document.getElementById id

hideCanvas = ->
	elem = document.getElementById 'myContainer'
	elem.style.display = 'none'		

showCanvas = ->
	elem = document.getElementById 'myContainer'
	elem.style.display = 'block'

makeTextArea = (cols,rows) ->
	b = document.createElement 'textarea'
	b.cols = cols
	b.rows = rows
	b.style.fontSize = "100%"
	b

makeSpan = (value) ->
	b = document.createElement 'span'
	b.innerHTML = value
	b

makeDiv = (value) ->
	b = document.createElement 'div'
	b.innerHTML = value
	b

makeInput = (title,value='',readonly=false) ->
	b = document.createElement 'input'
	b.id = title
	b.value = value
	b.placeholder = title
	if readonly then b.setAttribute "readonly", true
	if title=='name' then b.autofocus = true
	b.onclick = "this.setSelectionRange(0, this.value.length)"
	b

makeButton = (title,n,f) ->
	b = document.createElement 'input'
	if n==0
		b.style.width = "100%"
		b.style.textAlign = 'left'
	else
		b.style.width = "#{Math.floor(100/n)}%"
	b.style.fontSize = "100%"
	b.style.fontFamily = 'monospace'
	b.style.webkitAppearance = "none"
	b.style.borderRadius = 0
	b.style.padding = 0
	b.type = 'button'
	b.value = title
	b.onclick = f
	b

addCell = (tr,value) ->
	td = document.createElement "td"
	td.appendChild value
	tr.appendChild td

getField = (name) ->
	element = document.getElementById name
	if element then element.value else null