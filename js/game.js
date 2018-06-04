var cardDeck = document.getElementById('card-deck');
var cards = document.getElementsByClassName('card');
console.log(cardDeck);
console.log(cards);
var arrayOfCards = [...cards];
console.log(arrayOfCards);
var openCards = [];
var clicks = 0;

var matchedCardlist = [];
var modal = document.getElementById("popup1");


var time;
var interval;


function shuffle(inputArray) {
    for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
        var temporaryValue = inputArray[currentIndex];
        var randomIndex = Math.floor(Math.random() * currentIndex);

        inputArray[currentIndex] = inputArray[randomIndex]
        inputArray[randomIndex] = temporaryValue;
    }
    return inputArray;
}

function startGame() {
    cardDeck.innerHTML = " ";
    var fiveMinutes = 60 * 5,
        display = document.querySelector('.timer');
    startTimer(fiveMinutes, display);
    arrayOfCards = shuffle(arrayOfCards);
    for (var i = 0; i < arrayOfCards.length; i++) {
        cardDeck.appendChild(arrayOfCards[i]);
        arrayOfCards[i].addEventListener("click", displayCard);
        arrayOfCards[i].classList.remove("open", "show", "match", "disabled");
        arrayOfCards[i].addEventListener("click", cardOpen);
        clicks = 0;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;
        arrayOfCards[i].addEventListener("click", congrats);

    }

}
document.body.onload = startGame;

function refreshMe() {
    clearInterval(interval);
    startGame();
}


function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}




function cardOpen() {
    openCards.push(this);

    if (openCards.length == 2) {
        clicks++;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;
        if (openCards[0].type == openCards[1].type) {
            matchedCard(...openCards);
        } else {
            unmatchedCard(...openCards);
        }
    }

}


function matchedCard(firstCard, secondCard) {
    firstCard.classList.add("match", "disabled");
    secondCard.classList.add("match", "disabled");
    firstCard.classList.remove("open", "show");
    secondCard.classList.remove("open", "show");
    matchedCardlist.push(firstCard, secondCard);
    openCards = [];
}

function unmatchedCard(firstCard, secondCard) {
    firstCard.classList.add("unmatched", "open", "show", "disabled");
    secondCard.classList.add("unmatched", "open", "show", "disabled");
    disabled();
    setTimeout(function() {
        firstCard.classList.remove("unmatched", "open", "show", "disabled");
        secondCard.classList.remove("unmatched", "open", "show", "disabled");
        enabled();
        openCards = [];

    }, 1000);

}

function disabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.add("disabled");
    });
};


function enabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.remove("disabled");
    });
    matchedCardlist.forEach(function(card) {
        card.classList.add("disabled");
    });
};

function congrats() {
    if (matchedCardlist.length == arrayOfCards.length) {
        modal.classList.add("show");
        document.getElementById('totalTime').innerHTML = time;
        
    }
    closeIcon.addEventListener("click", closeCongrats);
};

var closeIcon = document.getElementById("close-icon");

function closeCongrats() {
    modal.classList.remove("show");
    startGame();
}

function playAgain() {
    modal.classList.remove("show");
    refreshMe();
    location.reload();
};

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        time = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

