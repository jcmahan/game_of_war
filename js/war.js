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
    "02": "a Two of ",
    "03": "a Three of ",
    "04": "a Four of ",
    "05": "a Five of ",
    "06": "a Six of ",
    "07": "a Seven of ",
    "08": "an Eight of ",
    "09": "a Nine of ",
    "10": "a Ten of ",
    "J": "a Jack of ",
    "Q": "a Queen of ",
    "K": "a King of ",
    "A": "an Ace of "
}
/*----- app's state (variables) -----*/

var playerHand;
var computerHand;
var winner;
var message;
var inWar;
var gameLength;
var playerWar;
var computerWar;


/*----- cached element references -----*/
var modal = document.querySelector('#modal');
var shortLength = document.getElementById('length_36');
var mediumLength = document.getElementById('length_22');
var longLength = document.getElementById('length_0');
var showModal = document.getElementById("modal");
var messageDiv = document.querySelector(".messaging");
var showMain = document.querySelector("main");
var p1Cards = document.getElementById("playerStack");
var compCards = document.querySelector(".computerStack");
var playerCount = document.querySelector(".playerCardCount");
var computerCount = document.querySelector(".computerCardCount");
var computerCard = document.getElementById("computerCard");
var compareButton = document.getElementById("compare");
var battleButton = document.getElementById("drawCard")
var playerBattlefield = document.getElementById("playerBattlefield");
var computerBattlefield = document.getElementById("computerBattlefield");

/*----- event listeners -----*/

document.querySelector('#choice').addEventListener('click', chooseLength);
p1Cards.addEventListener("click", playGame);
compareButton.addEventListener("click", doWar);
battleButton.addEventListener("click", doBattle);

/*----- functions -----*/
function initialize() {
    playerHand = [];
    computerHand = [];
    playerWar = [];
    computerWar = [];
    winner = "";
    message = "";
    inWar = false;
    render();
}
initialize();

function chooseLength(e) {
    gameLength = parseInt(e.path[1].id.replace('length_', ""));
    shuffledDeck.splice(0, gameLength);
    message = `You're up first, soldier! Click on "Start New Battle" to get started.`;

    deal();
    render();
}

function deal() {
    for (let i = 0; i < shuffledDeck.length; i++) {
        if ((i % 2) === 0) {
            playerHand.push(shuffledDeck[i]);
        } else {
            computerHand.push(shuffledDeck[i])
        }
    }
    return [playerHand, computerHand];
}

function doBattle(e) {
    gunshotSound.play();
    if (playerHand === []) {
        message = "You are a poor excuse for a soldier, Private FFM!";
    } else if
    (computerHand === []) {
        message = "Victory is yours!!! Who says a human can't beat AI?";
    } else {
        inWar = false;
        playerWar = [];
        computerWar = [];
        playerWar.push(playerHand.shift());
        computerWar.push(computerHand.shift());
        checkValue();
        if (inWar) {
            message = "A tie! Time for WAR!!!";
            setTimeout(function(){
                swordClash.play();
            }, 1000)
        } else {
            transferCards();
            message = winner === 'p' ?
                `Player One wins, as ${cardFaces[playerWar[0].display.slice(1)]} ${cardSuits[playerWar[0].display[0]]} beats ${cardFaces[computerWar[0].display.slice(1)]} ${cardSuits[computerWar[0].display[0]]}`
                :
                `The Computer defeated you, playing ${cardFaces[computerWar[0].display.slice(1)]} ${cardSuits[computerWar[0].display[0]]} which defeated ${cardFaces[playerWar[0].display.slice(1)]} ${cardSuits[playerWar[0].display[0]]}`;
        }
        render();
    }
};


function playGame(e) {
    checkWinner();
    render();
}

function checkValue() {
    if ((playerWar[playerWar.length - 1].value) === (computerWar[computerWar.length - 1].value)) {
        inWar = true;
    } else if ((playerWar[playerWar.length - 1].value) > (computerWar[computerWar.length - 1].value)) {
        winner = 'p';
    } else {
        winner = 'c';
    }
}

function doWar() {
    var numCardsLookup = { '36': 2, '22': 3, '0': 4 };
    var numWarCards = numCardsLookup[gameLength];
    if (playerHand.length < numWarCards) {
        message = "Defeated by a computer? Steve Jobs would be horrified.";
        winner = 'c';
        transferHands();
    } else if (computerHand.length < numWarCards) {
        message = "Computer doesn't have enough cards to go to war - you WIN!!!!";
        winner = 'p';
        transferHands();
    } else {
        while (numWarCards) {
            playerWar.push(playerHand.shift());
            computerWar.push(computerHand.shift());
            numWarCards--;
        }
        checkValue();
        if ((playerWar[playerWar.length - 1].value) === (computerWar[computerWar.length - 1].value)) {
            message = "Tied again! Time to look at the suits to determine a winner!"; finalTieCalc();
        } else if (winner === 'p') {
            message = "Your armies have defeated the Computer... Well played!";
        } else {
            message = "Your armies fell and were vanquished by the evil Computer!";
        }
    }
    transferCards();
    inWar = false;
    render();
}

function transferCards() {
    var targetHand = winner === 'p' ? playerHand : computerHand;
    targetHand.push(...playerWar);
    targetHand.push(...computerWar);
};

function transferHands() {
    var sourceHand = winner === 'p' ? computerHand : playerHand;
    var targetHand = winner === 'p' ? playerHand : computerHand;
    targetHand.push(...sourceHand.splice(0));
};

function finalTieCalc() {
    var userValue = playerHand[0].display[0];
    var compValue = computerHand[0].display[0];
    if (lookupTies[userValue] > lookupTies[compValue]) {
        message = `Player One wins, as the UN has determined that your ${cardSuits[playerWar[0].display[0]]} have trampled the Computer's ${cardSuits[computerWar[0].display[0]]}`;
        winner = 'p';
    } else {
        winner = 'c';
        message = `The UN has decreed the Computer defeated you, playing ${cardSuits[computerWar[0].display[0]]} which crushed your ${cardSuits[playerWar[0].display[0]]}`;
    }
}
function checkForCards() {
    if (playerHand = []) {
        message = "You are a poor excuse for a soldier, Private FFM!";
    } else if
    (computerHand = []) {
        message = "Victory is yours!!! Who says a human can't beat AI?";
    } else {
        message = "Time for another battle!";
    }
}

function render() {
    modal.style.display = playerHand.length ? 'none' : 'display';
    showMain.style.display = playerHand.length ? 'flex' : 'none';
    messageDiv.innerHTML = message;
    playerCount.innerHTML = `Player has ` + playerHand.length + ` cards in deck.`;
    computerCount.innerHTML = `Computer has ` + computerHand.length + ` cards in deck.`;
    battleButton.style.display = (playerHand.length && computerHand.length) && !inWar ? 'block' : 'none';
    compareButton.style.display = inWar ? 'block' : 'none';
    if (playerWar.length) {
        playerBattlefield.className = "card back";
        computerBattlefield.className = "card back";
        playerBattlefield.classList.add('rotate90');
        computerBattlefield.classList.add('rotate90');
        setTimeout(function () {
            playerBattlefield.classList.replace('back', playerWar[playerWar.length - 1].display);
            computerBattlefield.classList.replace('back', computerWar[computerWar.length - 1].display);
            playerBattlefield.classList.add('rotate360');
            computerBattlefield.classList.add('rotate360');
        }, 500);
    }
}