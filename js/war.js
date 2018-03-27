/*----- constants -----*/
// const gameLength = {
//     short: {
//         length: 16,
//     },
//     medium: {
//         length: 32,
//     }, 
//     long: {
//         length: 52,
//     },
// }

/*----- app's state (variables) -----*/

var userArray
var computerArray
var playerPercent
var winner

// var computerPercent might not be needed? Depends on calculation of the table
var battle

// War arrays below intended to store the cards played for the WAR element. Also, array.slice
// each player's cards in a separate array case they have to be returned?
var warArray
var pOneWar
var computerWar


/*----- cached element references -----*/
var shortLength = document.getElementById('length_36');
var mediumLength = document.getElementById('length_22');
var longLength = document.getElementById('length_0');
var playerName = document.getElementById("playerName");
var showModal = document.getElementById("modal");
var message = document.getElementsByClassName("messaging");
var showMain = document.getElementsByClassName("main");
var p1Cards = document.getElementsByClassName("playerStack")
var compCards = document.getElementsByClassName("computerStack")

/*----- event listeners -----*/
document.querySelector('#choice').addEventListener('click', chooseLength);
document.querySelector('.playerStack').addEventListener('click', playGame);

/*----- functions -----*/
function initialize() {
    gameLength = 0;
    userArray = [];
    computerArray = [];

}
initialize();

    //show modal - check
    // get input from player for length of game - check 
    // hide modal - check 
    // splice user and computer arrays down to desired length - check 
    // set battle status to 50/50
    // 

function chooseLength(e) {
    var gameLength = parseInt(e.path[1].id.replace('length_', "")); 
    shuffledDeck.splice(0, gameLength);
    deal();
    render();
}
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

function playGame(e) {
    console.dir(e);
    var battle = []
    if (userArray.value[0] > computerArray.value[0]) {
        push
    }
// hit button
// cards are dealt to field
// evaulate winner logic
    // if player wins, push cards to userArray
    // if computer wins, push cards to computerArray
    //if tie, start WAR
        // if WAR:
        // evaluate user and computer arrays to ensure enough cards are there
            //if not, final War happens
        // else, deal new cards to field
        // evaluate winner logic 
            // if player wins, push cards to userArray
            // if computer wins, push cards to computerArray
            //if tie, start WAR again
}

function render() {
    document.querySelector('#modal').style.display = userArray.length ? 'none' : 'display';
    document.querySelector('main').style.display = userArray.length ? 'flex' : 'none';
}