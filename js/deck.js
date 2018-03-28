/*----- cached element references -----*/
var p1Cards = document.getElementsByClassName("playerStack");
var compCards = document.getElementsByClassName("computerStack");


class Card {
    constructor(display, value) {
    this.display = display; 
    this.value = value; 
  }
}


  var deck = []; 
  deck = deck.map(card => card.face = card.suit + card.face)
  var suits = ["c", "s", "h", "d"];
  var faces = ["02", "03", "04", "05", "06", "07", "08", "0x9", "10", "J", "Q", "K", "A"];
  
  suits.forEach(function(suit){
    faces.forEach(function(face){
      var val = parseInt(face);
      if (isNaN(val)) {  
        switch (face) {
            case "J":
            val = 11; 
            break;
            case 'Q':
            val = 12; 
            break;
            case 'K':
            val = 13; 
            break; 
            case "A":
            val = 14;
            break;
      }
    }
      deck.push(new Card(suit + face, val));
  });
  });
  console.log(deck);

// function getRandomBetween(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }



var shuffledDeck = [];

function shuffleDeck() {
  for (var i = deck.length-1; i >=0; i--) {   
      var randomCardNumber = Math.floor(Math.random()*(i+1)); 
      var itemAtIndex = deck[randomCardNumber]; 
      deck[randomCardNumber] = deck[i]; 
      deck[i] = itemAtIndex;
      shuffledDeck.push(deck[i]);
  }
}
shuffleDeck();

var userArray = [];
var computerArray = [];


