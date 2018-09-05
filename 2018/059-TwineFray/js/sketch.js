"use strict";

// Generated by CoffeeScript 2.0.3
var POTION, SWORD, helper, place;

POTION = 10;

SWORD = 50;

events.Start = function () {
  t("Valhalla V: Odin's Revenge");
  t("by Mr. Riley");
  button("Town", "CLICK HERE TO START");
  person.health = 100;
  person.sword = 0;
  person.ax = 0;
  person.coins = 100;
  return person.points = 0;
};

events.Town = function () {
  t("You are standing in the middle of town.");
  t("Where do you want to go?");
  button("Market");
  button("Castle");
  button("Graveyard");
  return button("Farm");
};

events.Market = function () {
  if (person.coins >= POTION) {
    button("Potion", "Buy A Healing Potion For " + POTION + " Coins");
  } else {
    t("Healing potions cost " + POTION + ", but you only have " + person.coins);
  }
  if (person.coins >= SWORD) {
    button("Sword", "Buy A Sword For " + SWORD + " Coins");
  } else {
    t("Swords cost " + SWORD + ", but you only have " + person.coins);
  }
  return button("Town", "Return to Town");
};

events.Potion = function () {
  person.health += POTION;
  person.coins -= POTION;
  t("+10 health!");
  t("You now have " + person.health + " health!");
  t("-10 coins.");
  t("You now have " + person.coins + " coins");
  return display("Market");
};

events.Sword = function () {
  person.sword++;
  person.coins -= SWORD;
  t("+1 sword!");
  t("You now have a Level " + person.sword + " sword!");
  t("-" + SWORD + " coins.");
  t("You now have " + person.coins + " coins.");
  return display("Market");
};

events.Castle = function () {
  return place("Castle");
};

events.Graveyard = function () {
  return place("Graveyard");
};

events.Farm = function () {
  return place("Farm");
};

place = function place(name) {
  if (1 === rand(1, 5)) {
    person.location = name;
    return display('fightEnemy');
  } else {
    t("The " + name + " looks empty... for now. Check later.");
    return button("Town", "Go back to Town");
  }
};

events.fightEnemy = function () {
  t("You are at the " + person.location);
  enemy.name = _.sample(["Giant Spider", "Zombie", "Ghost", "Pizza Rat"]);
  t("A " + enemy.name + " crawls out of the shadows!");
  enemy.health = rand(20, 40) + person.points * .1;
  enemy.punch = rand(1, 10);
  enemy.kick = 10 - enemy.punch;
  return display('enemyHitsYou');
};

events.enemyHitsYou = function () {
  var randomCoins;
  if (enemy.health > 0) {
    enemy.hit = rand(1, 3) + rand(1, 3);
    t("The " + enemy.name + " ATTACKS YOU! " + -enemy.hit);
    person.health -= enemy.hit;
    person.points += enemy.hit;
    t("You have " + person.health + " health");
    if (person.health > 0) {
      return display('useWeapon');
    } else {
      return display('youDied');
    }
  } else {
    t("You have defeated the " + enemy.name + ". +10 pts!");
    person.points += 10;
    randomCoins = rand(25, 50);
    person.coins += randomCoins;
    t("+" + randomCoins + " coins! You now have " + person.coins + " coins");
    t("You have " + person.health + " health");
    return button("Continue");
  }
};

events.Continue = function () {
  return goto(person.location);
};

events.useWeapon = function () {
  button('Punch');
  button('Kick');
  if (person.sword > 0) {
    button('useSword', 'Use Sword');
  }
  if (person.ax > 0) {
    return button("Use Ax");
  }
};

events.Punch = function () {
  return helper(enemy.punch, 'PUNCH');
};

events.Kick = function () {
  return helper(enemy.kick, 'KICK');
};

helper = function helper(value, txt) {
  var hit;
  hit = value + rand(1, 6);
  if (1 === rand(1, 8)) {
    t("You tried to " + txt + " it but you missed!");
  } else {
    enemy.health -= hit;
    person.points += hit;
    t("You " + txt + " the " + enemy.name + "! " + -hit);
  }
  return display('enemyHitsYou');
};

events.useSword = function () {
  var hit;
  hit = 10 + rand(1, 6) + rand(1, 6);
  if (rand(1, 10) === 1) {
    t("You tried to SLASH it with your sword but you missed!");
  } else {
    enemy.health -= hit;
    person.points += hit;
    t("You SLASH the " + enemy.name + " with your sword! " + hit);
  }
  return display('enemyHitsYou');
};

events.youDied = function () {
  t("You died!");
  t("GAME OVER");
  person.points += person.coins;
  return t("Final Score: " + person.points);
};
//# sourceMappingURL=sketch.js.map
