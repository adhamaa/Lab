from atomic_mass import ATOMIC_MASS

def parse(s): # 'H2O' => H 2 O and 'A1A'
	result = []
	pattern = ''
	i = 0
	while i<len(s):
		if s[i].isupper():
			if i+1<len(s) and s[i+1].islower():
				result.append(s[i]+s[i+1])
				pattern += 'A'
				i+=2
			else:
				result.append(s[i])
				pattern += 'A'
				i+=1
		elif s[i].isdigit():
			antal = int(s[i])
			i+=1
			while i<len(s) and s[i].isdigit():
				antal = antal*10 + int(s[i])
				i+=1
			result.append(str(antal))
			pattern += '1'
		else:
			result.append(s[i])
			pattern += s[i]
			i+=1
	return result,pattern

def pass1(m1,m2): # H 2 O => H * 2 + O
	SYMBOLS = 'A1()'
	matrix = [
		'+*+=',  # A = Atom
		'+x+=',  # 1 = Count
		'=x=x',  # (
		'+*+='   # )
	]
	operation = {
		'+': lambda a : [a, '+'],
		'*': lambda a : [a, '*'],
		'x': lambda a : [],
		'=': lambda a : [a]
	}

	result = []
	for i in range(len(m1)-1):
		ch0 = m2[i]
		ch1 = m2[i+1]
		i0 = SYMBOLS.index(ch0)
		i1 = SYMBOLS.index(ch1)
		op = matrix[i0][i1]
		result += operation[op](m1[i])
	result.append(m1[-1])
	return result

def pass2(tokens): # H * 2 + O => H 2 * O +
	ops = "+*"
	stack = []
	result = []

	for token in tokens:
		if token == '(': stack.append(token)
		elif token == ')':
			while len(stack) > 0:
				op = stack.pop()
				if op == '(': break
				result.append(op)
		else:
			if token in ops:
				while len(stack) > 0:
					op = stack[-1]
					if not (op in ops): break
					if ops.find(token) >= ops.find(op): break
					stack.pop()
					result.append(op)
				stack.append(token)
			else:
				result.append(token)

	while len(stack) > 0: result.append(stack.pop())
	return result

def pass3(rpn): # H 2 * O + => { H:2, O:1 }
	stack = []
	for item in rpn:
		if item == '+':
			h1 = stack.pop()
			h2 = stack[-1]
			for key in h1:
				if key in h2:
					h2[key] += h1[key]
				else:
					h2[key] = h1[key]
		elif item == '*':
			antal = int(stack.pop())
			hash = stack[-1]
			for key in hash:
				hash[key] *= antal
		elif item in ATOMIC_MASS:
			res = {}
			res[item] = 1
			stack.append(res)
		else:
			stack.append(item)
	return stack.pop()

def pass4(atoms): # { H:2, O:1 } => 18.015
	return sum([ATOMIC_MASS[key] * atoms[key] for key in atoms])

def molar_mass(molecule,debug = False):
	atom_list,pattern = parse(molecule)
	infix = pass1(atom_list,pattern)
	rpn = pass2(infix)
	atoms = pass3(rpn)
	if debug:
		print('molecule',molecule)
		print('atom_list',atom_list)
		print('pattern',pattern)
		print('infix',infix)
		print('rpn',rpn)
		print('atoms',atoms)
	return pass4(atoms)

	# assert 'COOH(C(CH3)2)3CH3' == molecule
	# assert 'C O O H ( C ( C H 3 ) 2 ) 3 C H 3' == ' '.join(atom_list)
	# assert 'AAAA(A(AA1)1)1AA1' == pattern
	# assert 'C + O + O + H + ( C + ( C + H * 3 ) * 2 ) * 3 + C + H * 3' == (' '.join(infix))
	# assert 'C O O H C C H 3 * + 2 * + 3 * C H 3 * + + + + + +' == ' '.join(rpn)
	# assert {'C': 11, 'O': 2, 'H': 22} == atoms

assert 1.008 == molar_mass('H')
assert 2.016 == molar_mass('H2')
assert 18.015 == molar_mass('H2O')
assert 34.014 == molar_mass('H2O2')
assert 34.014 == molar_mass('(HO)2')
assert 142.03553856000002 == molar_mass('Na2SO4')
assert 84.162 == molar_mass('C6H12')
assert 186.29499999999996 == molar_mass('COOH(C(CH3)2)3CH3') # See details above.
assert 176.124 == molar_mass('C6H4O2(OH)4') # Vitamin C
assert 386.664 == molar_mass('C27H46O') # Cholesterol

