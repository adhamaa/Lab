// Generated by CoffeeScript 2.4.1
var Game, game, question;

({question} = require('readline-sync'));

Game = require('../js/game.js');

game = new Game(2);

while (true) {
  game.action(question(`${game.low}-${game.high} > `));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7O0FBQUEsQ0FBQSxDQUFFLFFBQUYsQ0FBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBQWY7O0FBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSOztBQUVQLElBQUEsR0FBTyxJQUFJLElBQUosQ0FBUyxDQUFUOztBQUVQLE9BQU0sSUFBTjtFQUNDLElBQUksQ0FBQyxNQUFMLENBQVksUUFBQSxDQUFTLENBQUEsQ0FBQSxDQUFHLElBQUksQ0FBQyxHQUFSLENBQVksQ0FBWixDQUFBLENBQWUsSUFBSSxDQUFDLElBQXBCLENBQXlCLEdBQXpCLENBQVQsQ0FBWjtBQUREIiwic291cmNlc0NvbnRlbnQiOlsieyBxdWVzdGlvbiB9ID0gcmVxdWlyZSAncmVhZGxpbmUtc3luYydcclxuR2FtZSA9IHJlcXVpcmUgJy4uL2pzL2dhbWUuanMnXHJcblxyXG5nYW1lID0gbmV3IEdhbWUgMlxyXG5cclxud2hpbGUgdHJ1ZSBcclxuXHRnYW1lLmFjdGlvbiBxdWVzdGlvbiBcIiN7Z2FtZS5sb3d9LSN7Z2FtZS5oaWdofSA+IFwiXHJcbiJdfQ==
//# sourceURL=c:\Lab\2019\100A-Guess-cmd-readLineSync\coffee\index.coffee