/*----- constants -----*/
var lookupTies = {
    "s" : 4,
    "h" : 3,
    "d" : 2,
    "c" : 1
};

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
var message = document.querySelector(".messaging");
var showMain = document.querySelector("main");
var p1Cards = document.getElementById("playerDeck");
var compCards = document.querySelector(".computerStack");
var playerCount = document.querySelector(".playerCardCount");
var computerCount = document.querySelector(".computerCardCount");
var userCard = document.getElementById("userCard");
var computerCard = document.getElementById("computerCard");

/*----- event listeners -----*/
document.querySelector('#choice').addEventListener('click', chooseLength);
// document.querySelector('.playerStack').addEventListener('click', playGame);
document.querySelector("img").addEventListener("click", playGame);

/*----- functions -----*/
function initialize() {
    gameLength = 0;
    userArray = [];
    computerArray = [];
    pOneWar = [];
    computerWar = [];
    winner = "";
    message.innerHTML = `You're up first, soldier!`;
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
    console.log('userArray', userArray);
    console.log('computerArray', computerArray);
    console.log('pOneWar', pOneWar);
    console.log('computeWar', computerWar);
    
    pOneWar.push(userArray.shift()); 
    computerWar.push(computerArray.shift());
    render();
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
}

function checkValue() {
    if ((pOneWar[pOneWar.length-1].value) === (computerWar[computerWar.length-1].value)) {
        startWar();
    } else if ((pOneWar[pOneWar.length-1].value) > (computerWar[computerWar.length-1].value)) {
        playerWins();
    } else {
        computerWins();
    }
}

function startWar() {
    pOneWar.push(userArray.shift());
    pOneWar.push(userArray.shift());          
    computerWar.push(computerArray.shift());
    computerWar.push(computerArray.shift());

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
        startWar();
    }
}

function startFinalWar() {
    var userValue = userArray[0].display[0];
    var compValue = computerArray[0].display[0];
    if (lookupTies[userValue] > lookupTies[computerValue]) {
        playerWins();
    } else {
        computerWins();
    }
}
    
function render() {
    document.querySelector('#modal').style.display = userArray.length ? 'none' : 'display';
    document.querySelector('main').style.display = userArray.length ? 'flex' : 'none';
    playerCount.innerHTML = `Player has ` + userArray.length + ` cards in deck.`; 
    computerCount.innerHTML = `Computer has ` + computerArray.length + ` cards in deck.`;

   
    computerHtml = "";
    userHtml = "";
    // computerArray.forEach(function(card){
    //     computerHtml += `<div class="card ${card.display}"></div>`; 
    // })
    // userArray.forEach(function(card) {
    //     userHtml += `div class ="card ${card.display}"></div>`;
    // })

    console.log('pOneWar', pOneWar)
    userCard.innerHTML = `<div class="card ${pOneWar.display}"></div>`;
    computerCard.innerHTML = `<div class="card ${computerWar.display}"></div>`;
}
    