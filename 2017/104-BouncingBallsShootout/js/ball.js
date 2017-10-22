// Generated by CoffeeScript 1.12.7
var Ball;

Ball = (function() {
  function Ball(g, radius) {
    this.g = g;
    this.radius = radius;
    this.x = random(this.radius, width - this.radius);
    this.y = this.radius + random(-10, 10);
    this.vx = random(1, 4);
    if (0.5 < random(1)) {
      this.vx = -this.vx;
    }
    this.vy = 0;
    this.ay = 0.1;
    this.age = 0;
  }

  Ball.prototype.draw = function() {
    fc(1, this.g, 0);
    return circle(this.x, this.y, this.radius);
  };

  Ball.prototype.update = function() {
    this.age += 1;
    if (this.x < this.radius || this.x > width - this.radius) {
      this.vx = -this.vx;
    }
    if (this.y > height - this.radius) {
      this.vy = -this.vy;
      this.x = this.x + random(-0.1, 0.1);
    } else {
      this.vy += this.ay;
    }
    this.x += this.vx;
    return this.y += this.vy;
  };

  Ball.prototype.distance = function(o) {
    return dist(this.x, this.y, o.x, o.y);
  };

  return Ball;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsbC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxiYWxsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBTTtFQUNTLGNBQUMsQ0FBRCxFQUFJLE1BQUo7SUFBQyxJQUFDLENBQUEsSUFBRDtJQUFHLElBQUMsQ0FBQSxTQUFEO0lBQ2pCLElBQUMsQ0FBQSxDQUFELEdBQUssTUFBQSxDQUFPLElBQUMsQ0FBQSxNQUFSLEVBQWdCLEtBQUEsR0FBTSxJQUFDLENBQUEsTUFBdkI7SUFDTCxJQUFDLENBQUEsQ0FBRCxHQUFLLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBQSxDQUFPLENBQUMsRUFBUixFQUFXLEVBQVg7SUFDZixJQUFDLENBQUEsRUFBRCxHQUFNLE1BQUEsQ0FBTyxDQUFQLEVBQVMsQ0FBVDtJQUNOLElBQUcsR0FBQSxHQUFNLE1BQUEsQ0FBTyxDQUFQLENBQVQ7TUFBdUIsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLElBQUMsQ0FBQSxHQUEvQjs7SUFDQSxJQUFDLENBQUEsRUFBRCxHQUFNO0lBQ04sSUFBQyxDQUFBLEVBQUQsR0FBTTtJQUNOLElBQUMsQ0FBQSxHQUFELEdBQU87RUFQTTs7aUJBU2QsSUFBQSxHQUFPLFNBQUE7SUFDTixFQUFBLENBQUcsQ0FBSCxFQUFLLElBQUMsQ0FBQSxDQUFOLEVBQVEsQ0FBUjtXQUNBLE1BQUEsQ0FBTyxJQUFDLENBQUEsQ0FBUixFQUFVLElBQUMsQ0FBQSxDQUFYLEVBQWEsSUFBQyxDQUFBLE1BQWQ7RUFGTTs7aUJBSVAsTUFBQSxHQUFTLFNBQUE7SUFDUixJQUFDLENBQUEsR0FBRCxJQUFRO0lBQ1IsSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFHLElBQUMsQ0FBQSxNQUFKLElBQWMsSUFBQyxDQUFBLENBQUQsR0FBSyxLQUFBLEdBQU0sSUFBQyxDQUFBLE1BQTdCO01BQXlDLElBQUMsQ0FBQSxFQUFELEdBQUksQ0FBQyxJQUFDLENBQUEsR0FBL0M7O0lBQ0EsSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLE1BQUEsR0FBTyxJQUFDLENBQUEsTUFBaEI7TUFDQyxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsSUFBQyxDQUFBO01BQ1IsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUEsQ0FBRCxHQUFLLE1BQUEsQ0FBTyxDQUFDLEdBQVIsRUFBWSxHQUFaLEVBRlg7S0FBQSxNQUFBO01BSUMsSUFBQyxDQUFBLEVBQUQsSUFBTyxJQUFDLENBQUEsR0FKVDs7SUFLQSxJQUFDLENBQUEsQ0FBRCxJQUFNLElBQUMsQ0FBQTtXQUNQLElBQUMsQ0FBQSxDQUFELElBQU0sSUFBQyxDQUFBO0VBVEM7O2lCQVdULFFBQUEsR0FBVyxTQUFDLENBQUQ7V0FBTyxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUyxJQUFDLENBQUEsQ0FBVixFQUFhLENBQUMsQ0FBQyxDQUFmLEVBQWtCLENBQUMsQ0FBQyxDQUFwQjtFQUFQIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmFsbFxuXHRjb25zdHJ1Y3RvciA6IChAZyxAcmFkaXVzKSAtPlxuXHRcdEB4ID0gcmFuZG9tIEByYWRpdXMsIHdpZHRoLUByYWRpdXNcblx0XHRAeSA9IEByYWRpdXMgKyByYW5kb20gLTEwLDEwXG5cdFx0QHZ4ID0gcmFuZG9tIDEsNFxuXHRcdGlmIDAuNSA8IHJhbmRvbSAxIHRoZW4gQHZ4ID0gLUB2eFxuXHRcdEB2eSA9IDBcblx0XHRAYXkgPSAwLjFcblx0XHRAYWdlID0gMFxuXG5cdGRyYXcgOiAtPlxuXHRcdGZjIDEsQGcsMFxuXHRcdGNpcmNsZSBAeCxAeSxAcmFkaXVzXG5cblx0dXBkYXRlIDogLT5cblx0XHRAYWdlICs9IDFcblx0XHRpZiBAeDxAcmFkaXVzIG9yIEB4ID4gd2lkdGgtQHJhZGl1cyB0aGVuIEB2eD0tQHZ4XG5cdFx0aWYgQHkgPiBoZWlnaHQtQHJhZGl1c1xuXHRcdFx0QHZ5ID0gLUB2eVxuXHRcdFx0QHggPSBAeCArIHJhbmRvbSAtMC4xLDAuMVxuXHRcdGVsc2UgXG5cdFx0XHRAdnkgKz0gQGF5XG5cdFx0QHggKz0gQHZ4XG5cdFx0QHkgKz0gQHZ5XG5cblx0ZGlzdGFuY2UgOiAobykgLT4gZGlzdCBAeCwgQHksIG8ueCwgby55Il19
//# sourceURL=C:\Lab\2017\104-BouncingBallsShootout\coffee\ball.coffee