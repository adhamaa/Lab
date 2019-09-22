// Generated by CoffeeScript 2.4.1
var addScript;

addScript = (src) => {
  var script;
  script = document.createElement('script');
  script.src = src;
  return document.body.appendChild(script);
};

addScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

addScript("https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js");

window.onload = () => {
  var Game, assert, createAndAppend, div0, div1, div2, game, input, range;
  range = _.range;
  assert = chai.assert.deepEqual;
  createAndAppend = (parent, type, attributes) => {
    var attribute, elem, key;
    elem = document.createElement(type);
    parent.appendChild(elem);
    for (key in attributes) {
      attribute = attributes[key];
      elem[key] = attribute;
    }
    return elem;
  };
  Game = class Game {
    constructor(level) {
      this.init = this.init.bind(this);
      // div3.innerText = 'Probability: ' + probability(@level).toFixed(3) + ' steps'
      this.action = this.action.bind(this);
      this.render = this.render.bind(this);
      this.init(level);
    }

    init(level1) {
      this.level = level1;
      if (this.level < 2) {
        this.level = 2;
      }
      this.low = 1;
      this.high = 2 ** this.level - 1;
      this.secret = _.random(this.low, this.high);
      this.hist = [];
      div0.innerText = 'Level: ' + this.level;
      return this.render();
    }

    action() {
      var value;
      if (input.value === '') {
        return;
      }
      value = parseInt(input.value);
      input.value = '';
      this.hist.push(value);
      if (value < this.secret && value >= this.low) {
        this.low = value + 1;
      }
      if (value > this.secret && value <= this.high) {
        this.high = value - 1;
      }
      if (value === this.secret) {
        this.init(this.level + (this.hist.length <= this.level ? 1 : -1));
      }
      return this.render();
    }

    render() {
      div1.innerText = 'Interval: ' + this.low + '-' + this.high;
      return div2.innerText = 'History: ' + this.hist.join(' ');
    }

  };
  // probability = (n) =>
  // 	result = range n 
  // 		.map (x) => (x+1)*2**x
  // 		.reduce (a,b) => a+b
  // 	result/(2**n-1)
  div0 = createAndAppend(document.body, 'div');
  div1 = createAndAppend(document.body, 'div');
  input = createAndAppend(document.body, 'input', {
    style: "font-size:100px"
  });
  div2 = createAndAppend(document.body, 'div');
  // div3 = createAndAppend document.body, 'div'
  input.onkeyup = (evt) => {
    if (evt.key === 'Enter') {
      return game.action();
    }
  };
  return game = new Game(2);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQUEsU0FBQSxHQUFZLENBQUMsR0FBRCxDQUFBLEdBQUE7QUFDWCxNQUFBO0VBQUEsTUFBQSxHQUFTLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0VBQ1QsTUFBTSxDQUFDLEdBQVAsR0FBYTtTQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixNQUExQjtBQUhXOztBQUtaLFNBQUEsQ0FBVSxvRUFBVjs7QUFDQSxTQUFBLENBQVUsK0RBQVY7O0FBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBQSxDQUFBLEdBQUE7QUFFZixNQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsZUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDO0VBQ1YsTUFBQSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7RUFFckIsZUFBQSxHQUFrQixDQUFDLE1BQUQsRUFBUSxJQUFSLEVBQWEsVUFBYixDQUFBLEdBQUE7QUFDakIsUUFBQSxTQUFBLEVBQUEsSUFBQSxFQUFBO0lBQUEsSUFBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCO0lBQ1IsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsSUFBbkI7SUFDQSxLQUFBLGlCQUFBOztNQUNDLElBQUssQ0FBQSxHQUFBLENBQUwsR0FBWTtJQURiO1dBRUE7RUFMaUI7RUFPWixPQUFOLE1BQUEsS0FBQTtJQUNDLFdBQWMsQ0FBQyxLQUFELENBQUE7VUFFZCxDQUFBLFdBQUEsQ0FBQSxnQkFGeUI7O1VBWXpCLENBQUEsYUFBQSxDQUFBO1VBV0EsQ0FBQSxhQUFBLENBQUE7TUF2QnlCLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTjtJQUFYOztJQUVkLElBQU8sT0FBQSxDQUFBO01BQUMsSUFBQyxDQUFBO01BQ1IsSUFBRyxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVo7UUFBbUIsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUE1Qjs7TUFDQSxJQUFDLENBQUEsR0FBRCxHQUFPO01BQ1AsSUFBQyxDQUFBLElBQUQsR0FBUSxDQUFBLElBQUcsSUFBQyxDQUFBLEtBQUosR0FBWTtNQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBQyxDQUFBLEdBQVYsRUFBZSxJQUFDLENBQUEsSUFBaEI7TUFDVixJQUFDLENBQUEsSUFBRCxHQUFRO01BQ1IsSUFBSSxDQUFDLFNBQUwsR0FBaUIsU0FBQSxHQUFZLElBQUMsQ0FBQTthQUM5QixJQUFDLENBQUEsTUFBRCxDQUFBO0lBUE07O0lBVVAsTUFBUyxDQUFBLENBQUE7QUFDUixVQUFBO01BQUEsSUFBRyxLQUFLLENBQUMsS0FBTixLQUFlLEVBQWxCO0FBQTBCLGVBQTFCOztNQUNBLEtBQUEsR0FBUSxRQUFBLENBQVMsS0FBSyxDQUFDLEtBQWY7TUFDUixLQUFLLENBQUMsS0FBTixHQUFjO01BQ2QsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsS0FBWDtNQUNBLElBQUcsS0FBQSxHQUFRLElBQUMsQ0FBQSxNQUFULElBQW9CLEtBQUEsSUFBUyxJQUFDLENBQUEsR0FBakM7UUFBMEMsSUFBQyxDQUFBLEdBQUQsR0FBTyxLQUFBLEdBQVEsRUFBekQ7O01BQ0EsSUFBRyxLQUFBLEdBQVEsSUFBQyxDQUFBLE1BQVQsSUFBb0IsS0FBQSxJQUFTLElBQUMsQ0FBQSxJQUFqQztRQUEyQyxJQUFDLENBQUEsSUFBRCxHQUFRLEtBQUEsR0FBUSxFQUEzRDs7TUFDQSxJQUFHLEtBQUEsS0FBUyxJQUFDLENBQUEsTUFBYjtRQUNDLElBQUMsQ0FBQSxJQUFELENBQU0sSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixJQUFnQixJQUFDLENBQUEsS0FBcEIsR0FBK0IsQ0FBL0IsR0FBc0MsQ0FBQyxDQUF2QyxDQUFmLEVBREQ7O2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQTtJQVRROztJQVdULE1BQVMsQ0FBQSxDQUFBO01BQ1IsSUFBSSxDQUFDLFNBQUwsR0FBaUIsWUFBQSxHQUFlLElBQUMsQ0FBQSxHQUFoQixHQUFzQixHQUF0QixHQUE0QixJQUFDLENBQUE7YUFDOUMsSUFBSSxDQUFDLFNBQUwsR0FBaUIsV0FBQSxHQUFjLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLEdBQVg7SUFGdkI7O0VBeEJWLEVBVkE7Ozs7OztFQTRDQSxJQUFBLEdBQU8sZUFBQSxDQUFnQixRQUFRLENBQUMsSUFBekIsRUFBK0IsS0FBL0I7RUFDUCxJQUFBLEdBQU8sZUFBQSxDQUFnQixRQUFRLENBQUMsSUFBekIsRUFBK0IsS0FBL0I7RUFDUCxLQUFBLEdBQVEsZUFBQSxDQUFnQixRQUFRLENBQUMsSUFBekIsRUFBK0IsT0FBL0IsRUFBd0M7SUFBQyxLQUFBLEVBQU07RUFBUCxDQUF4QztFQUNSLElBQUEsR0FBTyxlQUFBLENBQWdCLFFBQVEsQ0FBQyxJQUF6QixFQUErQixLQUEvQixFQS9DUDs7RUFpREEsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsQ0FBQyxHQUFELENBQUEsR0FBQTtJQUFTLElBQUcsR0FBRyxDQUFDLEdBQUosS0FBVyxPQUFkO2FBQTJCLElBQUksQ0FBQyxNQUFMLENBQUEsRUFBM0I7O0VBQVQ7U0FFaEIsSUFBQSxHQUFPLElBQUksSUFBSixDQUFTLENBQVQ7QUFyRFEiLCJzb3VyY2VzQ29udGVudCI6WyJhZGRTY3JpcHQgPSAoc3JjKSA9PlxyXG5cdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcclxuXHRzY3JpcHQuc3JjID0gc3JjIFxyXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgc2NyaXB0XHJcblxyXG5hZGRTY3JpcHQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9sb2Rhc2guanMvNC4xNy4xMS9sb2Rhc2guanNcIlxyXG5hZGRTY3JpcHQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9jaGFpLzQuMi4wL2NoYWkubWluLmpzXCJcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiBcclxuXHJcblx0cmFuZ2UgPSBfLnJhbmdlXHJcblx0YXNzZXJ0ID0gY2hhaS5hc3NlcnQuZGVlcEVxdWFsXHJcblxyXG5cdGNyZWF0ZUFuZEFwcGVuZCA9IChwYXJlbnQsdHlwZSxhdHRyaWJ1dGVzKSA9PlxyXG5cdFx0ZWxlbSAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IHR5cGVcclxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZCBlbGVtXHJcblx0XHRmb3Iga2V5LGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVzXHJcblx0XHRcdGVsZW1ba2V5XSA9IGF0dHJpYnV0ZVxyXG5cdFx0ZWxlbVxyXG5cclxuXHRjbGFzcyBHYW1lIFxyXG5cdFx0Y29uc3RydWN0b3IgOiAobGV2ZWwpIC0+IEBpbml0IGxldmVsXHJcblxyXG5cdFx0aW5pdCA6IChAbGV2ZWwpID0+XHJcblx0XHRcdGlmIEBsZXZlbCA8IDIgdGhlbiBAbGV2ZWwgPSAyXHJcblx0XHRcdEBsb3cgPSAxXHJcblx0XHRcdEBoaWdoID0gMioqQGxldmVsIC0gMVxyXG5cdFx0XHRAc2VjcmV0ID0gXy5yYW5kb20gQGxvdywgQGhpZ2hcclxuXHRcdFx0QGhpc3QgPSBbXVxyXG5cdFx0XHRkaXYwLmlubmVyVGV4dCA9ICdMZXZlbDogJyArIEBsZXZlbCBcclxuXHRcdFx0QHJlbmRlcigpXHJcblx0XHRcdCMgZGl2My5pbm5lclRleHQgPSAnUHJvYmFiaWxpdHk6ICcgKyBwcm9iYWJpbGl0eShAbGV2ZWwpLnRvRml4ZWQoMykgKyAnIHN0ZXBzJ1xyXG5cdFx0XHJcblx0XHRhY3Rpb24gOiA9PlxyXG5cdFx0XHRpZiBpbnB1dC52YWx1ZSA9PSAnJyB0aGVuIHJldHVybiBcclxuXHRcdFx0dmFsdWUgPSBwYXJzZUludCBpbnB1dC52YWx1ZVxyXG5cdFx0XHRpbnB1dC52YWx1ZSA9ICcnXHJcblx0XHRcdEBoaXN0LnB1c2ggdmFsdWVcclxuXHRcdFx0aWYgdmFsdWUgPCBAc2VjcmV0IGFuZCB2YWx1ZSA+PSBAbG93IHRoZW4gQGxvdyA9IHZhbHVlICsgMVxyXG5cdFx0XHRpZiB2YWx1ZSA+IEBzZWNyZXQgYW5kIHZhbHVlIDw9IEBoaWdoIHRoZW4gQGhpZ2ggPSB2YWx1ZSAtIDFcclxuXHRcdFx0aWYgdmFsdWUgPT0gQHNlY3JldCBcclxuXHRcdFx0XHRAaW5pdCBAbGV2ZWwgKyBpZiBAaGlzdC5sZW5ndGggPD0gQGxldmVsIHRoZW4gMSBlbHNlIC0xXHJcblx0XHRcdEByZW5kZXIoKVxyXG5cclxuXHRcdHJlbmRlciA6ID0+XHJcblx0XHRcdGRpdjEuaW5uZXJUZXh0ID0gJ0ludGVydmFsOiAnICsgQGxvdyArICctJyArIEBoaWdoXHJcblx0XHRcdGRpdjIuaW5uZXJUZXh0ID0gJ0hpc3Rvcnk6ICcgKyBAaGlzdC5qb2luICcgJ1xyXG5cclxuXHQjIHByb2JhYmlsaXR5ID0gKG4pID0+XHJcblx0IyBcdHJlc3VsdCA9IHJhbmdlIG4gXHJcblx0IyBcdFx0Lm1hcCAoeCkgPT4gKHgrMSkqMioqeFxyXG5cdCMgXHRcdC5yZWR1Y2UgKGEsYikgPT4gYStiXHJcblx0IyBcdHJlc3VsdC8oMioqbi0xKVxyXG5cclxuXHRkaXYwID0gY3JlYXRlQW5kQXBwZW5kIGRvY3VtZW50LmJvZHksICdkaXYnXHJcblx0ZGl2MSA9IGNyZWF0ZUFuZEFwcGVuZCBkb2N1bWVudC5ib2R5LCAnZGl2J1xyXG5cdGlucHV0ID0gY3JlYXRlQW5kQXBwZW5kIGRvY3VtZW50LmJvZHksICdpbnB1dCcsIHtzdHlsZTpcImZvbnQtc2l6ZToxMDBweFwifVxyXG5cdGRpdjIgPSBjcmVhdGVBbmRBcHBlbmQgZG9jdW1lbnQuYm9keSwgJ2RpdidcclxuXHQjIGRpdjMgPSBjcmVhdGVBbmRBcHBlbmQgZG9jdW1lbnQuYm9keSwgJ2RpdidcclxuXHRpbnB1dC5vbmtleXVwID0gKGV2dCkgPT4gaWYgZXZ0LmtleSA9PSAnRW50ZXInIHRoZW4gZ2FtZS5hY3Rpb24oKVxyXG5cclxuXHRnYW1lID0gbmV3IEdhbWUgMlxyXG4iXX0=
//# sourceURL=c:\Lab\2019\100E-Guess-SPA\coffee\sketch.coffee