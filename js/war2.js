/*----- constants -----*/


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
var p1Cards = document.getElementsByClassName("playerStack");
var compCards = document.getElementsByClassName("computerStack");
var playerCount = document.getElementsByClassName("playerCardCount");
var computerCount = document.getElementsByClassName("computerCardCount");

/*----- event listeners -----*/
document.querySelector('#choice').addEventListener('click', chooseLength);
// document.querySelector('.playerStack').addEventListener('click', playGame);
document.querySelector("button").addEventListener("click", playGame);

/*----- functions -----*/
function initialize() {
    gameLength = 0;
    userArray = [];
    computerArray = [];
    pOneWar = [];
    computerWar = [];
    winner = "";
}
initialize();

    //show modal - check
    // get input from player for length of game - check 
    // hide modal - check 
    // splice user and computer arrays down to desired length - check 
    // set battle status to 50/50 - tbd
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
    console.log("battle on!");
    console.log(userArray);
    console.log(computerArray);
    console.log(pOneWar);
    console.log(computerWar);
    
    pOneWar.push(...userArray.splice(0,1)); 
    computerWar.push(...computerArray.splice(0,1))
    checkValue();
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

function checkWinner(){
    if (userArray.length === 0) {
        message.innerHTML = "You have been defeated. Loser!";
    } else if (computerArray === 0) {
        message.innerHTML = "Victory is yours!";
    } else {
        message.innerHTML = "Time for battle!!!";
    }

function checkValue() {
    if (pOneWar[0].value === computerWar[0].value) {
        startWar();
    } else if (pOneWar[0].value > computerWar[0].value) {
        playerWins();
        } else {
        computerWins();
    }
}

function startWar() {
    pOneWar.push(...userArray.splice(0,2))     
    computerWar.push(...computerArray.splice(0,2))
    checkValue();
    
}

function playerWins() {
    userArray.push(...pOneWar.splice(0, pOneWar.length)) 
    userArray.push(...computerWar.splice(0, computerWar.length))
};

function computerWins() {
    computerArray.push(...pOneWar.splice(0, pOneWar.length)) 
    computerArray.push(...computerWar.splice(0, computerWar.length))
}

function assess() {
    if (userArray.length > 2 || computerArray > 2) {
        startFinalWar();
    } else {
        {startWar();
        }
    }
}

function startFinalWar() {
    if (userArray[0].value === computerArray[0].value) {
    } else if (userArray[0].value > computerArray[0].value) {
        playerWins();
        } else {
        computerWins();
    }
}
}
    
function render() {
    document.querySelector('#modal').style.display = userArray.length ? 'none' : 'display';
    document.querySelector('main').style.display = userArray.length ? 'flex' : 'none';
    playerCount.innerHTML = `Player has ` + userArray.length + `cards in deck.`; 
    computerCount.innerHTML = `Computer has ` + computerArray.length + `cards in deck.`;
}