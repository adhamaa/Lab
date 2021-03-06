// Generated by CoffeeScript 2.3.2
var SIZE, draw, drawLetters, hm, keyPressed, setup, words,
  indexOf = [].indexOf;

SIZE = 70;

words = "abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzing buzzwords caliph cobweb cockiness croquet crypt curacao cycle daiquiri dirndl disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo giaour gizmo glowworm glyph gnarly gnostic gossip grogginess haphazard hyphen icebox injury ivory jackpot jaundice jawbreaker jaywalk jazziest jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole khaki kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquis matrix megahertz microwave mnemonic mystify naphtha nightclub nowadays numbskull nymph onyx ovary oxidize oxygen pajama peekaboo phlegm pixel pizazz pneumonia polka pshaw psyche puppy puzzling quartz queue quips quixotic quiz quizzes quorum razzmatazz rhubarb rhythm rickshaw schnapps scratch snazzy sphinx spritz squawk staff strength strengths stretch stronghold stymied subway swivel syndrome thriftless thumbscrew topaz transcript transgress transplant triphthong twelfth unknown unzip uptown vaporize vixen voodoo vortex walkway waltz wave wavy waxy wellspring wheezy whiskey whomever wimpy witchcraft wizard woozy wristwatch wyvern xylophone yachtsman yippee yoked youthful yummy zephyr zigzag zilch zipper zodiac zombie";

hm = {};

setup = function() {
  createCanvas(windowWidth, windowHeight);
  textSize(SIZE);
  words = words.split(' ');
  hm.secret = random(words);
  hm.green = hm.secret.split('').map(() => {
    return '-';
  });
  return hm.red = [];
};

drawLetters = function(letters, x, r, g, b) {
  var i, j, len, letter, results;
  results = [];
  for (i = j = 0, len = letters.length; j < len; i = ++j) {
    letter = letters[i];
    fc(r, g, b);
    results.push(text(letter, x, SIZE * (i + 1.5)));
  }
  return results;
};

draw = function() {
  bg(0);
  drawLetters(hm.green, 100, 0, 1, 0);
  return drawLetters(hm.red, 200, 1, 0, 0);
};

keyPressed = function() {
  var i, j, len, ltr, ref;
  if (indexOf.call(hm.green, key) >= 0 || indexOf.call(hm.red, key) >= 0) {
    return;
  }
  ref = hm.secret;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    ltr = ref[i];
    if (ltr === key) {
      hm.green[i] = key;
    }
  }
  if (indexOf.call(hm.green, key) < 0) {
    return hm.red.push(key);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxXQUFBLEVBQUEsRUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQTtFQUFBOztBQUFBLElBQUEsR0FBTzs7QUFFUCxLQUFBLEdBQVE7O0FBQ1IsRUFBQSxHQUFLLENBQUE7O0FBRUwsS0FBQSxHQUFRLFFBQUEsQ0FBQSxDQUFBO0VBQ1AsWUFBQSxDQUFhLFdBQWIsRUFBeUIsWUFBekI7RUFDQSxRQUFBLENBQVMsSUFBVDtFQUNBLEtBQUEsR0FBUSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVo7RUFDUixFQUFFLENBQUMsTUFBSCxHQUFZLE1BQUEsQ0FBTyxLQUFQO0VBQ1osRUFBRSxDQUFDLEtBQUgsR0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQVYsQ0FBZ0IsRUFBaEIsQ0FBbUIsQ0FBQyxHQUFwQixDQUF3QixDQUFBLENBQUEsR0FBQTtXQUFHO0VBQUgsQ0FBeEI7U0FDWCxFQUFFLENBQUMsR0FBSCxHQUFTO0FBTkY7O0FBUVIsV0FBQSxHQUFjLFFBQUEsQ0FBQyxPQUFELEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFBO0FBQ2IsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTtFQUFBLEtBQUEsaURBQUE7O0lBQ0MsRUFBQSxDQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUDtpQkFDQSxJQUFBLENBQUssTUFBTCxFQUFZLENBQVosRUFBYyxJQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUUsR0FBSCxDQUFuQjtFQUZELENBQUE7O0FBRGE7O0FBS2QsSUFBQSxHQUFPLFFBQUEsQ0FBQSxDQUFBO0VBQ04sRUFBQSxDQUFHLENBQUg7RUFDQSxXQUFBLENBQVksRUFBRSxDQUFDLEtBQWYsRUFBcUIsR0FBckIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0I7U0FDQSxXQUFBLENBQVksRUFBRSxDQUFDLEdBQWYsRUFBbUIsR0FBbkIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0I7QUFITTs7QUFLUCxVQUFBLEdBQWEsUUFBQSxDQUFBLENBQUE7QUFDWixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtFQUFBLElBQUcsYUFBTyxFQUFFLENBQUMsS0FBVixFQUFBLEdBQUEsTUFBQSxJQUFtQixhQUFPLEVBQUUsQ0FBQyxHQUFWLEVBQUEsR0FBQSxNQUF0QjtBQUF5QyxXQUF6Qzs7QUFDQTtFQUFBLEtBQUEsNkNBQUE7O0lBQ0MsSUFBRyxHQUFBLEtBQU8sR0FBVjtNQUFtQixFQUFFLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBVCxHQUFjLElBQWpDOztFQUREO0VBRUEsSUFBRyxhQUFXLEVBQUUsQ0FBQyxLQUFkLEVBQUEsR0FBQSxLQUFIO1dBQTRCLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBUCxDQUFZLEdBQVosRUFBNUI7O0FBSlkiLCJzb3VyY2VzQ29udGVudCI6WyJTSVpFID0gNzBcclxuXHJcbndvcmRzID0gXCJhYnJ1cHRseSBhYnN1cmQgYWJ5c3MgYWZmaXggYXNrZXcgYXZlbnVlIGF3a3dhcmQgYXhpb20gYXp1cmUgYmFncGlwZXMgYmFuZHdhZ29uIGJhbmpvIGJheW91IGJlZWtlZXBlciBibGl0eiBibGl6emFyZCBib2dnbGUgYm9va3dvcm0gYm94Y2FyIGJ1Y2thcm9vIGJ1ZmZhbG8gYnVmZm9vbiBidXhvbSBidXp6aW5nIGJ1enp3b3JkcyBjYWxpcGggY29id2ViIGNvY2tpbmVzcyBjcm9xdWV0IGNyeXB0IGN1cmFjYW8gY3ljbGUgZGFpcXVpcmkgZGlybmRsIGRpc2F2b3cgZGl6enlpbmcgZHVwbGV4IGR3YXJ2ZXMgZW1iZXp6bGUgZXF1aXAgZXNwaW9uYWdlIGV1b3VhZSBleG9kdXMgZmFraW5nIGZpc2hob29rIGZpeGFibGUgZmpvcmQgZmxhcGphY2sgZmxvcHBpbmcgZmx1ZmZpbmVzcyBmbHlieSBmb3hnbG92ZSBmcmF6emxlZCBmcml6emxlZCBmdWNoc2lhIGZ1bm55IGdhYmJ5IGdhbGF4eSBnYWx2YW5pemUgZ2F6ZWJvIGdpYW91ciBnaXptbyBnbG93d29ybSBnbHlwaCBnbmFybHkgZ25vc3RpYyBnb3NzaXAgZ3JvZ2dpbmVzcyBoYXBoYXphcmQgaHlwaGVuIGljZWJveCBpbmp1cnkgaXZvcnkgamFja3BvdCBqYXVuZGljZSBqYXdicmVha2VyIGpheXdhbGsgamF6emllc3QgamF6enkgamVsbHkgamlnc2F3IGppbnggaml1aml0c3Ugam9ja2V5IGpvZ2dpbmcgam9raW5nIGpvdmlhbCBqb3lmdWwganVpY3kganVrZWJveCBqdW1ibyBrYXlhayBrYXpvbyBrZXlob2xlIGtoYWtpIGtpbG9ieXRlIGtpb3NrIGtpdHNjaCBraXdpZnJ1aXQga2x1dHoga25hcHNhY2sgbGFyeW54IGxlbmd0aHMgbHVja3kgbHV4dXJ5IGx5bXBoIG1hcnF1aXMgbWF0cml4IG1lZ2FoZXJ0eiBtaWNyb3dhdmUgbW5lbW9uaWMgbXlzdGlmeSBuYXBodGhhIG5pZ2h0Y2x1YiBub3dhZGF5cyBudW1ic2t1bGwgbnltcGggb255eCBvdmFyeSBveGlkaXplIG94eWdlbiBwYWphbWEgcGVla2Fib28gcGhsZWdtIHBpeGVsIHBpemF6eiBwbmV1bW9uaWEgcG9sa2EgcHNoYXcgcHN5Y2hlIHB1cHB5IHB1enpsaW5nIHF1YXJ0eiBxdWV1ZSBxdWlwcyBxdWl4b3RpYyBxdWl6IHF1aXp6ZXMgcXVvcnVtIHJhenptYXRhenogcmh1YmFyYiByaHl0aG0gcmlja3NoYXcgc2NobmFwcHMgc2NyYXRjaCBzbmF6enkgc3BoaW54IHNwcml0eiBzcXVhd2sgc3RhZmYgc3RyZW5ndGggc3RyZW5ndGhzIHN0cmV0Y2ggc3Ryb25naG9sZCBzdHltaWVkIHN1YndheSBzd2l2ZWwgc3luZHJvbWUgdGhyaWZ0bGVzcyB0aHVtYnNjcmV3IHRvcGF6IHRyYW5zY3JpcHQgdHJhbnNncmVzcyB0cmFuc3BsYW50IHRyaXBodGhvbmcgdHdlbGZ0aCB1bmtub3duIHVuemlwIHVwdG93biB2YXBvcml6ZSB2aXhlbiB2b29kb28gdm9ydGV4IHdhbGt3YXkgd2FsdHogd2F2ZSB3YXZ5IHdheHkgd2VsbHNwcmluZyB3aGVlenkgd2hpc2tleSB3aG9tZXZlciB3aW1weSB3aXRjaGNyYWZ0IHdpemFyZCB3b296eSB3cmlzdHdhdGNoIHd5dmVybiB4eWxvcGhvbmUgeWFjaHRzbWFuIHlpcHBlZSB5b2tlZCB5b3V0aGZ1bCB5dW1teSB6ZXBoeXIgemlnemFnIHppbGNoIHppcHBlciB6b2RpYWMgem9tYmllXCJcclxuaG0gPSB7fVxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyB3aW5kb3dXaWR0aCx3aW5kb3dIZWlnaHRcclxuXHR0ZXh0U2l6ZSBTSVpFXHJcblx0d29yZHMgPSB3b3Jkcy5zcGxpdCAnICdcclxuXHRobS5zZWNyZXQgPSByYW5kb20gd29yZHNcclxuXHRobS5ncmVlbiA9IGhtLnNlY3JldC5zcGxpdCgnJykubWFwID0+ICctJ1xyXG5cdGhtLnJlZCA9IFtdXHJcblxyXG5kcmF3TGV0dGVycyA9IChsZXR0ZXJzLHgscixnLGIpIC0+XHRcclxuXHRmb3IgbGV0dGVyLGkgaW4gbGV0dGVyc1xyXG5cdFx0ZmMgcixnLGJcclxuXHRcdHRleHQgbGV0dGVyLHgsU0laRSooaSsxLjUpXHJcblxyXG5kcmF3ID0gLT5cclxuXHRiZyAwXHJcblx0ZHJhd0xldHRlcnMgaG0uZ3JlZW4sMTAwLDAsMSwwXHJcblx0ZHJhd0xldHRlcnMgaG0ucmVkLDIwMCwxLDAsMFxyXG5cclxua2V5UHJlc3NlZCA9IC0+XHRcclxuXHRpZiBrZXkgaW4gaG0uZ3JlZW4gb3Iga2V5IGluIGhtLnJlZCB0aGVuIHJldHVybiAgXHJcblx0Zm9yIGx0cixpIGluIGhtLnNlY3JldCBcclxuXHRcdGlmIGx0ciA9PSBrZXkgdGhlbiBobS5ncmVlbltpXSA9IGtleVxyXG5cdGlmIGtleSBub3QgaW4gaG0uZ3JlZW4gdGhlbiBobS5yZWQucHVzaCBrZXlcclxuIl19
//# sourceURL=c:\Lab\2019\068-HangWhatever-p5-key\coffee\sketch.coffee