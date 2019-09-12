// Generated by CoffeeScript 2.3.2
var Button, LETTERS, SIZE, assert, buttons, draw, guess, hm, mousePressed, reset, setup, words,
  indexOf = [].indexOf,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

assert = chai.assert.deepEqual;

SIZE = 70;

LETTERS = 'abcdefghijklmnopqrstuvwxyz';

words = "abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzing buzzwords caliph cobweb cockiness croquet crypt curacao cycle daiquiri dirndl disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo giaour gizmo glowworm glyph gnarly gnostic gossip grogginess haphazard hyphen icebox injury ivory jackpot jaundice jawbreaker jaywalk jazziest jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole khaki kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquis matrix megahertz microwave mnemonic mystify naphtha nightclub nowadays numbskull nymph onyx ovary oxidize oxygen pajama peekaboo phlegm pixel pizazz pneumonia polka pshaw psyche puppy puzzling quartz queue quips quixotic quiz quizzes quorum razzmatazz rhubarb rhythm rickshaw schnapps scratch snazzy sphinx spritz squawk staff strength strengths stretch stronghold stymied subway swivel syndrome thriftless thumbscrew topaz transcript transgress transplant triphthong twelfth unknown unzip uptown vaporize vixen voodoo vortex walkway waltz wave wavy waxy wellspring wheezy whiskey whomever wimpy witchcraft wizard woozy wristwatch wyvern xylophone yachtsman yippee yoked youthful yummy zephyr zigzag zilch zipper zodiac zombie";

buttons = [];

hm = {};

reset = function() {
  hm.secret = words[Math.floor(words.length * Math.random())];
  hm.green = hm.secret.split('').map(() => {
    return '-';
  });
  return hm.red = [];
};

Button = class Button {
  constructor(x1, y1, title, click = function() {}) { //@state = 0
    this.x = x1;
    this.y = y1;
    this.title = title;
    this.click = click;
  }

  draw() {
    var ref, ref1;
    fc(1);
    rect(this.x, this.y, 0.96 * SIZE, 0.96 * SIZE);
    textSize(0.75 * SIZE);
    fc(0);
    if (ref = this.title, indexOf.call(hm.red, ref) >= 0) {
      fc(1, 0, 0);
    }
    if (ref1 = this.title, indexOf.call(hm.green, ref1) >= 0) {
      fc(0, 1, 0);
    }
    return text(this.title, this.x, this.y);
  }

  inside(mx, my) {
    return (this.x - 0.48 * SIZE < mx && mx < this.x + 0.48 * SIZE) && (this.y - 0.48 * SIZE < my && my < this.y + 0.48 * SIZE);
  }

};

guess = function(letter) {
  var green, i, j, len, ltr, ref;
  green = false;
  ref = hm.secret;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    ltr = ref[i];
    if (ltr === letter) {
      hm.green[i] = letter;
      green = true;
    }
  }
  if (!green) {
    return hm.red.push(letter);
  }
};

setup = function() {
  var i, j, len, letter, x, y;
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  words = words.split(' ');
  for (i = j = 0, len = LETTERS.length; j < len; i = ++j) {
    letter = LETTERS[i];
    x = (0.5 + Math.floor(i / 13)) * SIZE;
    y = (0.5 + modulo(i, 13)) * SIZE;
    (function(letter) {
      return buttons.push(new Button(x, y, letter, () => {
        return guess(letter);
      }));
    })(letter);
  }
  return reset();
};

draw = function() {
  var button, i, j, k, len, len1, letter, ref, results;
  bg(0);
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    button.draw();
  }
  ref = hm.green;
  results = [];
  for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
    letter = ref[i];
    fc(1, 1, 0);
    results.push(text(letter, 200, SIZE * (i + 1.5)));
  }
  return results;
};

mousePressed = function() {
  var button, j, len;
  for (j = 0, len = buttons.length; j < len; j++) {
    button = buttons[j];
    if (button.inside(mouseX, mouseY)) {
      return button.click();
    }
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxZQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBO0VBQUE7OztBQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUVyQixJQUFBLEdBQU87O0FBRVAsT0FBQSxHQUFVOztBQUNWLEtBQUEsR0FBUTs7QUFDUixPQUFBLEdBQVU7O0FBQ1YsRUFBQSxHQUFLLENBQUE7O0FBRUwsS0FBQSxHQUFRLFFBQUEsQ0FBQSxDQUFBO0VBQ1AsRUFBRSxDQUFDLE1BQUgsR0FBWSxLQUFNLENBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsTUFBTixHQUFlLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBMUIsQ0FBQTtFQUNsQixFQUFFLENBQUMsS0FBSCxHQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBVixDQUFnQixFQUFoQixDQUFtQixDQUFDLEdBQXBCLENBQXdCLENBQUEsQ0FBQSxHQUFBO1dBQUc7RUFBSCxDQUF4QjtTQUNYLEVBQUUsQ0FBQyxHQUFILEdBQVM7QUFIRjs7QUFLRixTQUFOLE1BQUEsT0FBQTtFQUNDLFdBQWMsR0FBQSxJQUFBLE9BQUEsVUFBdUIsUUFBQSxDQUFBLENBQUEsRUFBQSxDQUF2QixDQUFBLEVBQUE7SUFBQyxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBRSxJQUFDLENBQUE7SUFBTSxJQUFDLENBQUE7RUFBZjs7RUFDZCxJQUFPLENBQUEsQ0FBQTtBQUNOLFFBQUEsR0FBQSxFQUFBO0lBQUEsRUFBQSxDQUFHLENBQUg7SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFD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QUEsR0FBSyxDQUFDLENBQUEsR0FBRSxHQUFILENBQXJCO0VBRkQsQ0FBQTs7QUFKTTs7QUFRUCxZQUFBLEdBQWUsUUFBQSxDQUFBLENBQUE7QUFDZCxNQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUE7RUFBQSxLQUFBLHlDQUFBOztJQUNDLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxNQUFkLEVBQXFCLE1BQXJCLENBQUg7QUFBb0MsYUFBTyxNQUFNLENBQUMsS0FBUCxDQUFBLEVBQTNDOztFQUREO0FBRGMiLCJzb3VyY2VzQ29udGVudCI6WyJhc3NlcnQgPSBjaGFpLmFzc2VydC5kZWVwRXF1YWxcclxuXHJcblNJWkUgPSA3MFxyXG5cclxuTEVUVEVSUyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eidcclxud29yZHMgPSBcImFicnVwdGx5IGFic3VyZCBhYnlzcyBhZmZpeCBhc2tldyBhdmVudWUgYXdrd2FyZCBheGlvbSBhenVyZSBiYWdwaXBlcyBiYW5kd2Fnb24gYmFuam8gYmF5b3UgYmVla2VlcGVyIGJsaXR6IGJsaXp6YXJkIGJvZ2dsZSBib29rd29ybSBib3hjYXIgYnVja2Fyb28gYnVmZmFsbyBidWZmb29uIGJ1eG9tIGJ1enppbmcgYnV6endvcmRzIGNhbGlwaCBjb2J3ZWIgY29ja2luZXNzIGNyb3F1ZXQgY3J5cHQgY3VyYWNhbyBjeWNsZSBkYWlxdWlyaSBkaXJuZGwgZGlzYXZvdyBkaXp6eWluZyBkdXBsZXggZHdhcnZlcyBlbWJlenpsZSBlcXVpcCBlc3Bpb25hZ2UgZXVvdWFlIGV4b2R1cyBmYWtpbmcgZmlzaGhvb2sgZml4YWJsZSBmam9yZCBmbGFwamFjayBmbG9wcGluZyBmbHVmZmluZXNzIGZseWJ5IGZveGdsb3ZlIGZyYXp6bGVkIGZyaXp6bGVkIGZ1Y2hzaWEgZnVubnkgZ2FiYnkgZ2FsYXh5IGdhbHZhbml6ZSBnYXplYm8gZ2lhb3VyIGdpem1vIGdsb3d3b3JtIGdseXBoIGduYXJseSBnbm9zdGljIGdvc3NpcCBncm9nZ2luZXNzIGhhcGhhemFyZCBoeXBoZW4gaWNlYm94IGluanVyeSBpdm9yeSBqYWNrcG90IGphdW5kaWNlIGphd2JyZWFrZXIgamF5d2FsayBqYXp6aWVzdCBqYXp6eSBqZWxseSBqaWdzYXcgamlueCBqaXVqaXRzdSBqb2NrZXkgam9nZ2luZyBqb2tpbmcgam92aWFsIGpveWZ1bCBqdWljeSBqdWtlYm94IGp1bWJvIGtheWFrIGthem9vIGtleWhvbGUga2hha2kga2lsb2J5dGUga2lvc2sga2l0c2NoIGtpd2lmcnVpdCBrbHV0eiBrbmFwc2FjayBsYXJ5bnggbGVuZ3RocyBsdWNreSBsdXh1cnkgbHltcGggbWFycXVpcyBtYXRyaXggbWVnYWhlcnR6IG1pY3Jvd2F2ZSBtbmVtb25pYyBteXN0aWZ5IG5hcGh0aGEgbmlnaHRjbHViIG5vd2FkYXlzIG51bWJza3VsbCBueW1waCBvbnl4IG92YXJ5IG94aWRpemUgb3h5Z2VuIHBhamFtYSBwZWVrYWJvbyBwaGxlZ20gcGl4ZWwgcGl6YXp6IHBuZXVtb25pYSBwb2xrYSBwc2hhdyBwc3ljaGUgcHVwcHkgcHV6emxpbmcgcXVhcnR6IHF1ZXVlIHF1aXBzIHF1aXhvdGljIHF1aXogcXVpenplcyBxdW9ydW0gcmF6em1hdGF6eiByaHViYXJiIHJoeXRobSByaWNrc2hhdyBzY2huYXBwcyBzY3JhdGNoIHNuYXp6eSBzcGhpbnggc3ByaXR6IHNxdWF3ayBzdGFmZiBzdHJlbmd0aCBzdHJlbmd0aHMgc3RyZXRjaCBzdHJvbmdob2xkIHN0eW1pZWQgc3Vid2F5IHN3aXZlbCBzeW5kcm9tZSB0aHJpZnRsZXNzIHRodW1ic2NyZXcgdG9wYXogdHJhbnNjcmlwdCB0cmFuc2dyZXNzIHRyYW5zcGxhbnQgdHJpcGh0aG9uZyB0d2VsZnRoIHVua25vd24gdW56aXAgdXB0b3duIHZhcG9yaXplIHZpeGVuIHZvb2RvbyB2b3J0ZXggd2Fsa3dheSB3YWx0eiB3YXZlIHdhdnkgd2F4eSB3ZWxsc3ByaW5nIHdoZWV6eSB3aGlza2V5IHdob21ldmVyIHdpbXB5IHdpdGNoY3JhZnQgd2l6YXJkIHdvb3p5IHdyaXN0d2F0Y2ggd3l2ZXJuIHh5bG9waG9uZSB5YWNodHNtYW4geWlwcGVlIHlva2VkIHlvdXRoZnVsIHl1bW15IHplcGh5ciB6aWd6YWcgemlsY2ggemlwcGVyIHpvZGlhYyB6b21iaWVcIlxyXG5idXR0b25zID0gW11cclxuaG0gPSB7fVxyXG5cclxucmVzZXQgPSAtPlxyXG5cdGhtLnNlY3JldCA9IHdvcmRzW01hdGguZmxvb3Igd29yZHMubGVuZ3RoICogTWF0aC5yYW5kb20oKV1cclxuXHRobS5ncmVlbiA9IGhtLnNlY3JldC5zcGxpdCgnJykubWFwID0+ICctJ1xyXG5cdGhtLnJlZCA9IFtdXHJcblxyXG5jbGFzcyBCdXR0b24gXHJcblx0Y29uc3RydWN0b3IgOiAoQHgsQHksQHRpdGxlLEBjbGljayA9IC0+KSAtPiAjQHN0YXRlID0gMFxyXG5cdGRyYXcgOiAtPlxyXG5cdFx0ZmMgMVxyXG5cdFx0cmVjdCBAeCxAeSwwLjk2KlNJWkUsMC45NipTSVpFXHJcblx0XHR0ZXh0U2l6ZSAwLjc1KlNJWkVcclxuXHJcblx0XHRmYyAwXHJcblx0XHRpZiBAdGl0bGUgaW4gaG0ucmVkIHRoZW4gZmMgMSwwLDBcclxuXHRcdGlmIEB0aXRsZSBpbiBobS5ncmVlbiB0aGVuIGZjIDAsMSwwXHJcblx0XHR0ZXh0IEB0aXRsZSxAeCxAeVxyXG5cdGluc2lkZSA6IChteCxteSkgLT4gQHgtMC40OCpTSVpFIDwgbXggPCBAeCswLjQ4KlNJWkUgYW5kIEB5LTAuNDgqU0laRSA8IG15IDwgQHkrMC40OCpTSVpFIFxyXG5cclxuZ3Vlc3MgPSAobGV0dGVyKSAtPlxyXG5cdGdyZWVuID0gZmFsc2UgXHJcblx0Zm9yIGx0cixpIGluIGhtLnNlY3JldCBcclxuXHRcdGlmIGx0ciA9PSBsZXR0ZXJcclxuXHRcdFx0aG0uZ3JlZW5baV0gPSBsZXR0ZXJcclxuXHRcdFx0Z3JlZW4gPSB0cnVlXHJcblx0aWYgbm90IGdyZWVuIHRoZW4gaG0ucmVkLnB1c2ggbGV0dGVyXHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIHdpbmRvd1dpZHRoLHdpbmRvd0hlaWdodFxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblxyXG5cdHdvcmRzID0gd29yZHMuc3BsaXQgJyAnXHJcblxyXG5cdGZvciBsZXR0ZXIsaSBpbiBMRVRURVJTXHJcblx0XHR4ID0gKDAuNStpLy8xMykgKiBTSVpFXHJcblx0XHR5ID0gKDAuNStpJSUxMykgKiBTSVpFXHJcblx0XHRkbyAobGV0dGVyKSAtPiBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiB4LHksbGV0dGVyLCA9PiBndWVzcyBsZXR0ZXJcclxuXHRyZXNldCgpXHJcblx0XHRcclxuZHJhdyA9IC0+XHJcblx0YmcgMFxyXG5cdGZvciBidXR0b24gaW4gYnV0dG9uc1x0XHJcblx0XHRidXR0b24uZHJhdygpXHJcblx0Zm9yIGxldHRlcixpIGluIGhtLmdyZWVuXHJcblx0XHRmYyAxLDEsMFxyXG5cdFx0dGV4dCBsZXR0ZXIsMjAwLFNJWkUqKGkrMS41KVxyXG5cclxubW91c2VQcmVzc2VkID0gLT4gXHJcblx0Zm9yIGJ1dHRvbiBpbiBidXR0b25zXHJcblx0XHRpZiBidXR0b24uaW5zaWRlIG1vdXNlWCxtb3VzZVkgdGhlbiByZXR1cm4gYnV0dG9uLmNsaWNrKClcclxuIl19
//# sourceURL=c:\Lab\2019\068-HangWhatever-p5-key\coffee\sketch.coffee