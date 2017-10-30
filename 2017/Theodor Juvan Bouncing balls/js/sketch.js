// Generated by CoffeeScript 1.9.3
var Ball, Bullet, balls, bullets, collision, draw, keyPressed, level, newLevel, setup, shots;

balls = [];

level = 2;

bullets = [];

shots = [0, 0];

Ball = (function() {
  function Ball(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.radie = 50;
    this.x = random(0 + this.radie, width - this.radie);
    this.y = this.radie;
    this.vx = random(1, 2);
    this.vy = random(1, 2);
    this.active = true;
  }

  Ball.prototype.rita = function() {
    if (!this.active) {
      return;
    }
    fc(this.r, this.g, this.b);
    sc(0);
    return circle(this.x, this.y, this.radie);
  };

  Ball.prototype.flytta = function() {
    this.x = this.x + this.vx;
    if (this.x > width - this.radie) {
      this.vx = -this.vx;
    }
    if (this.x < 0 + this.radie) {
      this.vx = -this.vx;
    }
    this.y = this.y + this.vy;
    if (this.y > height - this.radie || this.y < 0 + this.radie) {
      return this.vy = -this.vy;
    } else {
      return this.vy = this.vy + 0.125;
    }
  };

  return Ball;

})();

Bullet = (function() {
  function Bullet(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radie = 2;
    this.active = true;
  }

  Bullet.prototype.rita = function() {
    if (!this.active) {
      return;
    }
    fc(0);
    sc(0);
    return circle(this.x, this.y, this.radie);
  };

  Bullet.prototype.flytta = function() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    if (this.y > height - this.radie) {
      return this.vy = -this.vy;
    } else {
      return this.vy = this.vy + 0.31;
    }
  };

  return Bullet;

})();

newLevel = function(lvl) {
  var i, j, len, ref, results;
  balls = [];
  bullets = [];
  shots = [0, 0];
  level = level + lvl;
  ref = range(level);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    balls.push(new Ball(1, 1, 0));
    results.push(balls.push(new Ball(1, 0, 0)));
  }
  return results;
};

setup = function() {
  createCanvas(500, 400);
  return newLevel(1);
};

collision = function() {
  var ball, bullet, j, k, len, len1;
  for (j = 0, len = balls.length; j < len; j++) {
    ball = balls[j];
    for (k = 0, len1 = bullets.length; k < len1; k++) {
      bullet = bullets[k];
      if (ball.active && bullet.active && dist(bullet.x, bullet.y, ball.x, ball.y) < ball.radie + bullet.radie) {
        ball.active = false;
        bullet.active = false;
        shots[ball.g] = shots[ball.g] + 1;
        return;
      }
    }
  }
};

draw = function() {
  var ball, bullet, j, k, len, len1;
  bg(1, 0, 1);
  fc(0.8, 0, 1);
  textSize(150);
  textAlign(CENTER, CENTER);
  text(level, width / 2, height / 2);
  textSize(25);
  text("Theodor", width / 2, height - 30);
  for (j = 0, len = balls.length; j < len; j++) {
    ball = balls[j];
    ball.rita();
    ball.flytta();
  }
  for (k = 0, len1 = bullets.length; k < len1; k++) {
    bullet = bullets[k];
    bullet.rita();
    bullet.flytta();
  }
  collision();
  fc(0);
  rect(5, height - 5, 5, 5);
  rect(width - 15, height - 5, 5, 5);
  if (shots[0] === level) {
    newLevel(-1);
  }
  if (shots[1] === level) {
    return newLevel(+1);
  }
};

keyPressed = function() {
  if (keyCode === LEFT_ARROW) {
    bullets.push(new Bullet(5, height - 5, 5, 15));
  }
  print(keyCode);
  if (keyCode === RIGHT_ARROW) {
    return bullets.push(new Bullet(width - 5, height - 5, -5, 15));
  }
};