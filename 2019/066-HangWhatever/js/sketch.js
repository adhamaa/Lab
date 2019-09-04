// Generated by CoffeeScript 2.3.2
var Hangman, PATH, WORDS, _, args, assert, chai, fs, hangman, hm,
  indexOf = [].indexOf;

_ = require('lodash');

chai = require('chai');

fs = require('fs');

assert = chai.assert.deepEqual;

WORDS = 'words.txt';

PATH = 'data.json';

Hangman = class Hangman {
  constructor() {
    var words;
    words = fs.readFileSync(WORDS, 'utf8').split('\r\n');
    this.secret = words[_.random(words.length)];
    this.guessed = this.secret.split('').map(() => {
      return '_';
    });
    this.history = [];
  }

  show() {
    return this.guessed.join(' ');
  }

  guess(letter) {
    var i, j, len, ltr, ref;
    this.history.push(letter);
    ref = this.secret;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      ltr = ref[i];
      if (ltr === letter) {
        this.guessed[i] = letter;
      }
    }
    return this.show();
  }

  read() {
    return Object.assign(this, JSON.parse(fs.readFileSync(PATH, 'utf8')));
  }

  write() {
    return fs.writeFileSync(PATH, JSON.stringify(this));
  }

};

//########################################
hangman = new Hangman;

hangman.secret = 'riviera';

hangman.guessed = '_______'.split('');

assert('_ _ _ _ _ _ _', hangman.show());

assert('_ _ _ _ _ _ a', hangman.guess('a'));

assert('_ i _ i _ _ a', hangman.guess('i'));

hangman.write();

hangman = new Hangman;

hangman.read();

assert('{"secret":"riviera","guessed":["_","i","_","i","_","_","a"],"history":["a","i"]}', JSON.stringify(hangman));

assert('riviera', hangman.secret);

assert(["_", "i", "_", "i", "_", "_", "a"], hangman.guessed);

assert(['a', 'i'], hangman.history);

assert('r i _ i _ r a', hangman.guess('r'));

assert('r i v i _ r a', hangman.guess('v'));

assert('r i v i e r a', hangman.guess('e'));

console.log('Ready!');

//########################################
hm = new Hangman;

hm.read();

args = process.argv;

if (args.length === 2) {
  hm = new Hangman;
} else {
  hm.guess(args[2]);
}

if (indexOf.call(hm.guessed, '_') < 0) {
  console.log(hm.history.join());
}

console.log(hm.show());

hm.write();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsRUFBQTtFQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0FBQ1AsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztBQUNMLE1BQUEsR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUVyQixLQUFBLEdBQVE7O0FBQ1IsSUFBQSxHQUFPOztBQUVELFVBQU4sTUFBQSxRQUFBO0VBQ0MsV0FBYyxDQUFBLENBQUE7QUFDYixRQUFBO0lBQUEsS0FBQSxHQUFRLEVBQUUsQ0FBQyxZQUFILENBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLENBQThCLENBQUMsS0FBL0IsQ0FBcUMsTUFBckM7SUFDUixJQUFDLENBQUEsTUFBRCxHQUFVLEtBQU0sQ0FBQSxDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxNQUFmLENBQUE7SUFDaEIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBYyxFQUFkLENBQWlCLENBQUMsR0FBbEIsQ0FBc0IsQ0FBQSxDQUFBLEdBQUE7YUFBRztJQUFILENBQXRCO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztFQUpFOztFQU1kLElBQU8sQ0FBQSxDQUFBO1dBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsR0FBZDtFQUFIOztFQUVQLEtBQVEsQ0FBQyxNQUFELENBQUE7QUFDUCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE1BQWQ7QUFDQTtJQUFBLEtBQUEsNkNBQUE7O01BQ0MsSUFBRyxHQUFBLEtBQU8sTUFBVjtRQUFzQixJQUFDLENBQUEsT0FBUSxDQUFBLENBQUEsQ0FBVCxHQUFjLE9BQXBDOztJQUREO1dBRUEsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUpPOztFQU1SLElBQU8sQ0FBQSxDQUFBO1dBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLEVBQWlCLElBQUksQ0FBQyxLQUFMLENBQVcsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBcUIsTUFBckIsQ0FBWCxDQUFqQjtFQUFIOztFQUNQLEtBQVEsQ0FBQSxDQUFBO1dBQUcsRUFBRSxDQUFDLGFBQUgsQ0FBaUIsSUFBakIsRUFBc0IsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXRCO0VBQUg7O0FBaEJULEVBUkE7OztBQTJCQSxPQUFBLEdBQVUsSUFBSTs7QUFDZCxPQUFPLENBQUMsTUFBUixHQUFrQjs7QUFDbEIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsRUFBaEI7O0FBQ2xCLE1BQUEsQ0FBTyxlQUFQLEVBQXdCLE9BQU8sQ0FBQyxJQUFSLENBQUEsQ0FBeEI7O0FBQ0EsTUFBQSxDQUFPLGVBQVAsRUFBd0IsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLENBQXhCOztBQUNBLE1BQUEsQ0FBTyxlQUFQLEVBQXdCLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxDQUF4Qjs7QUFDQSxPQUFPLENBQUMsS0FBUixDQUFBOztBQUVBLE9BQUEsR0FBVSxJQUFJOztBQUNkLE9BQU8sQ0FBQyxJQUFSLENBQUE7O0FBQ0EsTUFBQSxDQUFPLGtGQUFQLEVBQTJGLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUEzRjs7QUFDQSxNQUFBLENBQU8sU0FBUCxFQUFrQixPQUFPLENBQUMsTUFBMUI7O0FBQ0EsTUFBQSxDQUFPLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixDQUFQLEVBQXNDLE9BQU8sQ0FBQyxPQUE5Qzs7QUFDQSxNQUFBLENBQU8sQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFQLEVBQWtCLE9BQU8sQ0FBQyxPQUExQjs7QUFFQSxNQUFBLENBQU8sZUFBUCxFQUF3QixPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBeEI7O0FBQ0EsTUFBQSxDQUFPLGVBQVAsRUFBd0IsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLENBQXhCOztBQUNBLE1BQUEsQ0FBTyxlQUFQLEVBQXdCLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxDQUF4Qjs7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosRUE3Q0E7OztBQWdEQSxFQUFBLEdBQUssSUFBSTs7QUFDVCxFQUFFLENBQUMsSUFBSCxDQUFBOztBQUVBLElBQUEsR0FBTyxPQUFPLENBQUM7O0FBRWYsSUFBRyxJQUFJLENBQUMsTUFBTCxLQUFlLENBQWxCO0VBQXlCLEVBQUEsR0FBSyxJQUFJLFFBQWxDO0NBQUEsTUFBQTtFQUErQyxFQUFFLENBQUMsS0FBSCxDQUFTLElBQUssQ0FBQSxDQUFBLENBQWQsRUFBL0M7OztBQUVBLElBQUcsYUFBVyxFQUFFLENBQUMsT0FBZCxFQUFBLEdBQUEsS0FBSDtFQUE4QixPQUFPLENBQUMsR0FBUixDQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBWCxDQUFBLENBQVosRUFBOUI7OztBQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksRUFBRSxDQUFDLElBQUgsQ0FBQSxDQUFaOztBQUNBLEVBQUUsQ0FBQyxLQUFILENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJfID0gcmVxdWlyZSAnbG9kYXNoJ1xyXG5jaGFpID0gcmVxdWlyZSAnY2hhaSdcclxuZnMgPSByZXF1aXJlICdmcydcclxuYXNzZXJ0ID0gY2hhaS5hc3NlcnQuZGVlcEVxdWFsXHJcblxyXG5XT1JEUyA9ICd3b3Jkcy50eHQnXHJcblBBVEggPSAnZGF0YS5qc29uJ1xyXG5cclxuY2xhc3MgSGFuZ21hbiBcclxuXHRjb25zdHJ1Y3RvciA6IC0+XHJcblx0XHR3b3JkcyA9IGZzLnJlYWRGaWxlU3luYyhXT1JEUywgJ3V0ZjgnKS5zcGxpdCAnXFxyXFxuJ1xyXG5cdFx0QHNlY3JldCA9IHdvcmRzW18ucmFuZG9tIHdvcmRzLmxlbmd0aF1cclxuXHRcdEBndWVzc2VkID0gQHNlY3JldC5zcGxpdCgnJykubWFwID0+ICdfJ1xyXG5cdFx0QGhpc3RvcnkgPSBbXVxyXG5cclxuXHRzaG93IDogLT4gQGd1ZXNzZWQuam9pbiAnICdcclxuXHJcblx0Z3Vlc3MgOiAobGV0dGVyKSAtPlxyXG5cdFx0QGhpc3RvcnkucHVzaCBsZXR0ZXJcclxuXHRcdGZvciBsdHIsaSBpbiBAc2VjcmV0IFxyXG5cdFx0XHRpZiBsdHIgPT0gbGV0dGVyIHRoZW4gQGd1ZXNzZWRbaV0gPSBsZXR0ZXJcclxuXHRcdEBzaG93KClcclxuXHJcblx0cmVhZCA6IC0+IE9iamVjdC5hc3NpZ24gQCwgSlNPTi5wYXJzZSBmcy5yZWFkRmlsZVN5bmMgUEFUSCwndXRmOCdcclxuXHR3cml0ZSA6IC0+IGZzLndyaXRlRmlsZVN5bmMgUEFUSCxKU09OLnN0cmluZ2lmeSBAXHJcblxyXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5oYW5nbWFuID0gbmV3IEhhbmdtYW5cclxuaGFuZ21hbi5zZWNyZXQgID0gJ3JpdmllcmEnXHJcbmhhbmdtYW4uZ3Vlc3NlZCA9ICdfX19fX19fJy5zcGxpdCAnJ1xyXG5hc3NlcnQgJ18gXyBfIF8gXyBfIF8nLCBoYW5nbWFuLnNob3coKVxyXG5hc3NlcnQgJ18gXyBfIF8gXyBfIGEnLCBoYW5nbWFuLmd1ZXNzICdhJ1xyXG5hc3NlcnQgJ18gaSBfIGkgXyBfIGEnLCBoYW5nbWFuLmd1ZXNzICdpJ1xyXG5oYW5nbWFuLndyaXRlKClcclxuXHJcbmhhbmdtYW4gPSBuZXcgSGFuZ21hblxyXG5oYW5nbWFuLnJlYWQoKVxyXG5hc3NlcnQgJ3tcInNlY3JldFwiOlwicml2aWVyYVwiLFwiZ3Vlc3NlZFwiOltcIl9cIixcImlcIixcIl9cIixcImlcIixcIl9cIixcIl9cIixcImFcIl0sXCJoaXN0b3J5XCI6W1wiYVwiLFwiaVwiXX0nLCBKU09OLnN0cmluZ2lmeSBoYW5nbWFuXHJcbmFzc2VydCAncml2aWVyYScsIGhhbmdtYW4uc2VjcmV0XHJcbmFzc2VydCBbXCJfXCIsXCJpXCIsXCJfXCIsXCJpXCIsXCJfXCIsXCJfXCIsXCJhXCJdLCBoYW5nbWFuLmd1ZXNzZWRcclxuYXNzZXJ0IFsnYScsJ2knXSwgaGFuZ21hbi5oaXN0b3J5XHJcblxyXG5hc3NlcnQgJ3IgaSBfIGkgXyByIGEnLCBoYW5nbWFuLmd1ZXNzICdyJ1xyXG5hc3NlcnQgJ3IgaSB2IGkgXyByIGEnLCBoYW5nbWFuLmd1ZXNzICd2J1xyXG5hc3NlcnQgJ3IgaSB2IGkgZSByIGEnLCBoYW5nbWFuLmd1ZXNzICdlJ1xyXG5jb25zb2xlLmxvZyAnUmVhZHkhJ1xyXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxuaG0gPSBuZXcgSGFuZ21hblxyXG5obS5yZWFkKClcclxuXHJcbmFyZ3MgPSBwcm9jZXNzLmFyZ3ZcclxuXHJcbmlmIGFyZ3MubGVuZ3RoID09IDIgdGhlbiBobSA9IG5ldyBIYW5nbWFuIGVsc2UgaG0uZ3Vlc3MgYXJnc1syXVxyXG5cclxuaWYgJ18nIG5vdCBpbiBobS5ndWVzc2VkIHRoZW4gY29uc29sZS5sb2cgaG0uaGlzdG9yeS5qb2luKClcclxuY29uc29sZS5sb2cgaG0uc2hvdygpXHJcbmhtLndyaXRlKCkiXX0=
//# sourceURL=c:\Lab\2019\066-HangWhatever\coffee\sketch.coffee