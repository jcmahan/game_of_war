/*----- constants -----*/
const gameLength = {
    short: {
        length: 16,
    },
    medium: {
        length: 32,
    }, 
    long: {
        length: 52,
    },
}

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
var shortLength = document.getElementsByClassName('short');
var mediumLength = document.getElementsByClassName('medium');
var longLength = document.getElementsByClassName('long');

/*----- event listeners -----*/
// document.querySelector('img').addEventListener('click', chooseLength);



/*----- functions -----*/
function initialize() {
    //show modal
// get input from player for length of game
// hide modal
// splice user and computer arrays down to desired length
// set battle status to 50/50
// 

} 

function chooseLength() {
    console.log('poo');
}

function playGame() {
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

}