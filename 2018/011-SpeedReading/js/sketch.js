"use strict";

// Generated by CoffeeScript 2.0.3
var arr, data, deadline, draw, iWord, mousePressed, setup, speed;

data = "Inför köttfri dag i skolan!\nPå vår skola serveras det varje dag någon typ av kött i matsalen. Är det inte\nhamburgare eller bacon så är det köttbullar och korvar av olika slag. Men\nbehöver vi verkligen ha kött varje dag? Nej, vi vill att skolan inför minst en\nköttfri dag en gång i veckan.\nVarför?\nFör det första är det inte miljövänligt att äta kött. Det krävs tio gånger\nmer energi för att producera kött än vad det krävs för att producera\ngrönsaker.\nFör det andra är det nyttigt att ha en köttfri dag. Enligt Livsmedelsverket\nkan vi sänka vårt intag av kött med hälften och fortfarande må bra.\nFör det tredje skulle en köttfri dag i veckan leda till att efterfrågan på\nkött skulle minska. Detta skulle i sin tur leda till bättre djurhållning och\nmindre lidande för djuren. En köttfri dag leder alltså till tre goda ting: Bättre\nmiljö, bättre hälsa och bättre djurhållning. Nu kanske några menar att det\nräcker med att använda ekologiskt kött istället för importerat. Men fakta\nkvarstår fortfarande. En köttfri dag i veckan är bättre! Däremot får skolan\ngärna servera ekologiskt kött de andra fyra dagarna!\nVår förhoppning är att alla skolor i kommunen från och med nästa\ntermin inför en köttfri dag. Vi uppmanar alla elevråd i kommunen att kräva\nen köttfri dag i skolan!\nMiljövännen, Hälsofreaket och Djurrättsaktivisten";

arr = null;

iWord = 0;

speed = 10; // characters per second

deadline = 0; // millis

setup = function setup() {
  createCanvas(200, 200);
  data = data.replace(/\n/g, " ");
  arr = data.split(' ');
  textAlign(CENTER, CENTER);
  return textSize(20);
};

draw = function draw() {
  if (millis() >= deadline) {
    bg(0);
    fc(1, 1, 0);
    text(arr[iWord], 100, 100);
    deadline += 200 + 1000 * arr[iWord].length / speed;
    iWord++;
    fc(0.5);
    return text(speed + " tecken per sekund", 100, 180);
  }
};

mousePressed = function mousePressed() {
  if (mouseX > 100) {
    speed++;
  } else {
    speed--;
  }
  speed = constrain(speed, 1, 100);
  return deadline = millis();
};
//# sourceMappingURL=sketch.js.map
