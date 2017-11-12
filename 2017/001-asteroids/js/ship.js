// Generated by CoffeeScript 1.12.7
var Ship;

Ship = (function() {
  function Ship() {
    this.pos = new p5.Vector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = new p5.Vector(0, 0);
    this.acc = 0;
    this.alive = true;
  }

  Ship.prototype.accelerate = function(a) {
    return this.acc = a;
  };

  Ship.prototype.setRotation = function(a) {
    return this.rotation = a;
  };

  Ship.prototype.boost = function() {
    var force;
    force = p5.Vector.fromAngle(this.heading);
    force.mult(this.acc);
    return this.vel.add(force);
  };

  Ship.prototype.update = function() {
    this.boost();
    this.pos.add(this.vel);
    this.pos.x = modulo(this.pos.x, width);
    this.pos.y = modulo(this.pos.y, height);
    this.vel.mult(0.99);
    return this.heading += this.rotation;
  };

  Ship.prototype.draw = function() {
    push();
    if (this.alive) {
      stroke(255);
    } else {
      stroke(255, 0, 0);
    }
    strokeWeight(1);
    fill(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    return pop();
  };

  return Ship;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxzaGlwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQTs7QUFBTTtFQUNTLGNBQUE7SUFDYixJQUFDLENBQUEsR0FBRCxHQUFPLElBQUksRUFBRSxDQUFDLE1BQVAsQ0FBYyxLQUFBLEdBQU0sQ0FBcEIsRUFBdUIsTUFBQSxHQUFPLENBQTlCO0lBQ1AsSUFBQyxDQUFBLENBQUQsR0FBSztJQUNMLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZO0lBQ1osSUFBQyxDQUFBLEdBQUQsR0FBTyxJQUFJLEVBQUUsQ0FBQyxNQUFQLENBQWMsQ0FBZCxFQUFnQixDQUFoQjtJQUNQLElBQUMsQ0FBQSxHQUFELEdBQU87SUFDUCxJQUFDLENBQUEsS0FBRCxHQUFTO0VBUEk7O2lCQVNkLFVBQUEsR0FBYSxTQUFDLENBQUQ7V0FBTyxJQUFDLENBQUEsR0FBRCxHQUFPO0VBQWQ7O2lCQUNiLFdBQUEsR0FBYyxTQUFDLENBQUQ7V0FBTyxJQUFDLENBQUEsUUFBRCxHQUFZO0VBQW5COztpQkFFZCxLQUFBLEdBQVEsU0FBQTtBQUNQLFFBQUE7SUFBQSxLQUFBLEdBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFWLENBQW9CLElBQUMsQ0FBQSxPQUFyQjtJQUNSLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBQyxDQUFBLEdBQVo7V0FDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEdBQUwsQ0FBUyxLQUFUO0VBSE87O2lCQUtSLE1BQUEsR0FBUyxTQUFBO0lBQ1IsSUFBQyxDQUFBLEtBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxHQUFWO0lBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFMLEdBQVMsTUFBQSxDQUFPLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBWixFQUFlLEtBQWY7SUFDVCxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxNQUFBLENBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUFaLEVBQWUsTUFBZjtJQUNULElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLElBQVY7V0FDQSxJQUFDLENBQUEsT0FBRCxJQUFZLElBQUMsQ0FBQTtFQU5MOztpQkFRVCxJQUFBLEdBQU8sU0FBQTtJQUNOLElBQUEsQ0FBQTtJQUNBLElBQUcsSUFBQyxDQUFBLEtBQUo7TUFDQyxNQUFBLENBQU8sR0FBUCxFQUREO0tBQUEsTUFBQTtNQUdDLE1BQUEsQ0FBTyxHQUFQLEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFIRDs7SUFJQSxZQUFBLENBQWEsQ0FBYjtJQUNBLElBQUEsQ0FBSyxDQUFMO0lBQ0EsU0FBQSxDQUFVLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBZixFQUFpQixJQUFDLENBQUEsR0FBRyxDQUFDLENBQXRCO0lBQ0EsTUFBQSxDQUFPLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBQSxHQUFHLENBQXJCO0lBQ0EsUUFBQSxDQUFTLENBQUMsSUFBQyxDQUFBLENBQVgsRUFBYSxJQUFDLENBQUEsQ0FBZCxFQUFpQixJQUFDLENBQUEsQ0FBbEIsRUFBb0IsSUFBQyxDQUFBLENBQXJCLEVBQXdCLENBQXhCLEVBQTBCLENBQUMsSUFBQyxDQUFBLENBQTVCO1dBQ0EsR0FBQSxDQUFBO0VBWE0iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTaGlwXHJcblx0Y29uc3RydWN0b3IgOiAtPlxyXG5cdFx0QHBvcyA9IG5ldyBwNS5WZWN0b3Igd2lkdGgvMiwgaGVpZ2h0LzJcclxuXHRcdEByID0gMjBcclxuXHRcdEBoZWFkaW5nID0gMCAjIHJhZGlhbnNcclxuXHRcdEByb3RhdGlvbiA9IDBcclxuXHRcdEB2ZWwgPSBuZXcgcDUuVmVjdG9yIDAsMFxyXG5cdFx0QGFjYyA9IDBcclxuXHRcdEBhbGl2ZSA9IHRydWVcclxuXHJcblx0YWNjZWxlcmF0ZSA6IChhKSAtPiBAYWNjID0gYVxyXG5cdHNldFJvdGF0aW9uIDogKGEpIC0+IEByb3RhdGlvbiA9IGFcclxuXHJcblx0Ym9vc3QgOiAtPlxyXG5cdFx0Zm9yY2UgPSBwNS5WZWN0b3IuZnJvbUFuZ2xlIEBoZWFkaW5nXHJcblx0XHRmb3JjZS5tdWx0IEBhY2NcclxuXHRcdEB2ZWwuYWRkIGZvcmNlXHJcblxyXG5cdHVwZGF0ZSA6IC0+XHJcblx0XHRAYm9vc3QoKVxyXG5cdFx0QHBvcy5hZGQgQHZlbFxyXG5cdFx0QHBvcy54ID0gbW9kdWxvIEBwb3MueCwgd2lkdGhcclxuXHRcdEBwb3MueSA9IG1vZHVsbyBAcG9zLnksIGhlaWdodFxyXG5cdFx0QHZlbC5tdWx0IDAuOTlcclxuXHRcdEBoZWFkaW5nICs9IEByb3RhdGlvblxyXG5cclxuXHRkcmF3IDogLT5cclxuXHRcdHB1c2goKVxyXG5cdFx0aWYgQGFsaXZlXHJcblx0XHRcdHN0cm9rZSAyNTVcclxuXHRcdGVsc2VcclxuXHRcdFx0c3Ryb2tlIDI1NSwwLDBcclxuXHRcdHN0cm9rZVdlaWdodCAxXHJcblx0XHRmaWxsIDBcclxuXHRcdHRyYW5zbGF0ZSBAcG9zLngsQHBvcy55XHJcblx0XHRyb3RhdGUgQGhlYWRpbmcgKyBQSS8yXHJcblx0XHR0cmlhbmdsZSAtQHIsQHIsIEByLEByLCAwLC1AciAgXHJcblx0XHRwb3AoKSJdfQ==
//# sourceURL=C:\Lab\2017\001-asteroids\coffee\ship.coffee