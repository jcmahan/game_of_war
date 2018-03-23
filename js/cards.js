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
  