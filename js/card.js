class Card {
    constructor(display, value) {
    this.display = display; 
    this.value = value; 
  }
  }
  var deck = []; 
  
  var suits = ["c", "s", "h", "d"];
  var faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
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

// var shuffledDeck = [];
// Array.prototype.shuffle = function() {
//   var input = this;
   
//   for (var i = input.length-1; i >=0; i--) {   
//       var randomCardNumber = Math.floor(Math.random()*(i+1)); 
//       var itemAtIndex = input[randomCardNumber]; 
//       input[randomCardNumber] = input[i]; 
//       input[i] = itemAtIndex;
//   }
//   return input;
// }

// Array.prototype.deal = function() {

//   var userArray = [];
//   var computerArray = [];

//   for (let i = 0; i < this.length; i++) {
    
//       if ((i % 2) === 0) {
//         userArray.push(this[i]);
//       } else {
//         computerArray.push(this[i])
//       }

//     }
//     return [ userArray, computerArray ]
// }
// deck.shuffle();
// deck.deal(); 

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

function deal() {
  for (let i = 0; i < shuffledDeck.length; i++) {    
    if ((i % 2) === 0) {
      userArray.push(shuffledDeck[i]);
    } else {
      computerArray.push(shuffledDeck[i])
    }
  }
  return [ userArray, computerArray ];
} 
deal();