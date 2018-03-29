/*----- constants -----*/
var lookupTies = {
    "s": 4,
    "h": 3,
    "d": 2,
    "c": 1
};

var cardSuits = {
    "c": "Clubs",
    "s": "Spades",
    "h": "Hearts",
    "d": "Diamonds"
}

var cardFaces = {
    "02": "Two of ",
    "03": "Three of ",
    "04": "Four of ",
    "05": "Five of ",
    "06": "Six of ",
    "07": "Seven of ",
    "08": "Eight of ",
    "09": "Nine of ",
    "10": "Ten of ",
    "J": "Jack of ",
    "Q": "Queen of ",
    "K": "King of ",
    "A": "Ace of "
}
/*----- app's state (variables) -----*/

var userHand;
var computerHand;
var playerPercent;
var winner;

// var computerPercent might not be needed? Depends on calculation of the table
var battle;

// War arrays below intended to store the cards played for the WAR element. Also, array.slice
// each player's cards in a separate array case they have to be returned?
var warArray;
var pOneWar;
var computerWar;


/*----- cached element references -----*/
var shortLength = document.getElementById('length_36');
var mediumLength = document.getElementById('length_22');
var longLength = document.getElementById('length_0');
var playerName = document.getElementById("playerName");
var showModal = document.getElementById("modal");
var message = document.querySelector(".messaging");
var showMain = document.querySelector("main");
var p1Cards = document.getElementById("playerStack");
var compCards = document.querySelector(".computerStack");
var playerCount = document.querySelector(".playerCardCount");
var computerCount = document.querySelector(".computerCardCount");
var computerCard = document.getElementById("computerCard");
var compareButton = document.getElementById("compare");
var playerBattlefield = document.getElementById("playerBattlefield");
var computerBattlefield = document.getElementById("computerBattlefield");

/*----- event listeners -----*/
document.querySelector('#choice').addEventListener('click', chooseLength);
p1Cards.addEventListener("click", playGame);
compareButton.addEventListener("click", checkValue);

/*----- functions -----*/
function initialize() {
    gameLength = 0;
    userHand = [];
    computerHand = [];
    pOneWar = [];
    computerWar = [];
    winner = "";
    message.innerHTML = `You're up first, soldier! Click on the deck to get started.`;
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
            userHand.push(shuffledDeck[i]);
        } else {
            computerHand.push(shuffledDeck[i])
        }
    }
    return [userHand, computerHand];
}

function playGame(e) {
    console.log('userHand', userHand);
    console.log('computerHand', computerHand);
    console.log('pOneWar', pOneWar);
    console.log('computerWar', computerWar);

    pOneWar.push(userHand.shift());
    computerWar.push(computerHand.shift());
    checkWinner();
    render();
}
// hit button
// cards are dealt to field
// evaulate winner logic
// if player wins, push cards to userHand
// if computer wins, push cards to computerHand
//if tie, start WAR
// if WAR:
// evaluate user and computer arrays to ensure enough cards are there
//if not, final War happens
// else, deal new cards to field
// evaluate winner logic 
// if player wins, push cards to userHand
// if computer wins, push cards to computerHand
//if tie, start WAR again

function checkWinner() {
    if (userHand.length === 0) {
        message.innerHTML = "You have been defeated. Loser!";
    } else if (computerHand === 0) {
        message.innerHTML = "Victory is yours!";
    } else {
        message.innerHTML = "Time for battle!!!";
    }
}
function checkValue() {
    if ((pOneWar[pOneWar.length - 1].value) === (computerWar[computerWar.length - 1].value)) {
        startWar();
    } else if ((pOneWar[pOneWar.length - 1].value) > (computerWar[computerWar.length - 1].value)) {
        playerWins();
    } else {
        computerWins();
    }

    pOneWar.push(userHand.shift());
    computerWar.push(computerHand.shift());

    render();
}

function startWar() {
    message.innerHTML = "A tie! Time for WAR!!!"
    assess();
    pOneWar.push(userHand.shift());
    pOneWar.push(userHand.shift());
    computerWar.push(computerHand.shift());
    computerWar.push(computerHand.shift());

    checkValue();
}

function playerWins() {
    message.innerHTML = `Player One wins, as a ${cardFaces[pOneWar[0].display.slice(1)]} ${cardSuits[pOneWar[0].display[0]]} beats ${cardFaces[computerWar[0].display.slice(1)]} ${cardSuits[computerWar[0].display[0]]}`
    userHand.push(...pOneWar.splice(0, pOneWar.length))
    userHand.push(...computerWar.splice(0, computerWar.length))
};

function computerWins() {
    message.innerHTML = `The Computer defeated you! A ${cardFaces[computerWar[0].display.slice(1)]} ${cardSuits[computerWar[0].display[0]]} beats a ${cardFaces[pOneWar[0].display.slice(1)]} ${cardSuits[pOneWar[0].display[0]]}`
    computerHand.push(...pOneWar.splice(0, pOneWar.length))
    computerHand.push(...computerWar.splice(0, computerWar.length))
}

function assess() {
    if (userHand.length > 2 || computerHand.length > 2) {
        startFinalWar();
    } else {
        startWar();
    }
}

function startFinalWar() {
    var userValue = userHand[0].display[0];
    var compValue = computerHand[0].display[0];
    if (lookupTies[userValue] > lookupTies[compValue]) {
        playerWins();
    } else {
        computerWins();
    }
}

function render() {
    document.querySelector('#modal').style.display = userHand.length ? 'none' : 'display';
    document.querySelector('main').style.display = userHand.length ? 'flex' : 'none';
    playerCount.innerHTML = `Player has ` + userHand.length + ` cards in deck.`;
    computerCount.innerHTML = `Computer has ` + computerHand.length + ` cards in deck.`;

    computerHtml = "";
    userHtml = "";

    if (pOneWar.length > 0 && computerWar.length > 0) {
        playerBattleString = "";
        computerBattleString = "";
        pOneWar.forEach(function(card){
            playerBattleString += `<div class="card ${card.display}"></div>`
        })

        computerWar.forEach(function(card){
            computerBattleString += `<div class="card ${card.display}"></div>`
        })

        playerBattlefield.innerHTML = playerBattleString;
        computerBattlefield.innerHTML = computerBattleString;
    }
}