//LET THE GAME BEGIN 

//ICONS 
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 

// GLOBAL VARIABLES 

const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
let shuffledCards = [];
let moves = 0;
const movesContainer = document.querySelector('.moves');
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];


//MODAL

//TIMER VARIABLES 
let minutes = 0; 
let seconds = 0;
let timer;
let initialClick = false;

// USE SETINTERVAL TO START TIMER
function myTimer() { 
    timer = setInterval(function(){
        seconds++;
        if(seconds == 60){ 
            minutes++;
            seconds = 0;
        }
        console.log(formatTime());
    }, 1000);
}

// CONDITIONAL OR TERNARY/INLINE "IF" STATEMENT
function formatTime(){ 
    let sec = seconds > 9 ? String(seconds) : "0" + String(seconds);
    let min = minutes > 9 ? String(minutes) : "0" + String(minutes);
    document.getElementById(`myTimer`).innerHTML = min + ":" + sec;
    return min + ':' + sec;
}

// TIMER TO START ON 1st CLICK 1st GAME
function startTimer(){ 
    let li_cards = document.querySelectorAll('.deck')
    li_cards.forEach(function(card){
        card.addEventListener('click', function(){
        if(initialClick === false){
            initialClick = true;
            myTimer();
            formatTime();
        }
    })
})
}

//CLEAR VARIABLES & INNERHTML 
function resetTimer() { 
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    document.getElementById(`myTimer`).innerHTML = "";
    initialClick = false;
}

// SHUFFLE FUCTION PROVIDED 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//CREATE THE CARDS ( & set the board)
function init() {
    const shuffledCards = shuffle(icons);
    
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"</i>`;
        cardsContainer.appendChild(card);
    
        click(card);
    }
}

// CREATE CLICK EVENT FOR CARDS
function click(card) {  
    card.addEventListener('click', function(){
        const currentCard = this;
        const previousCard = openedCards[0];
    
        // OPENED CARDS 
        if(openedCards.length === 1) { 
            card.classList.add('open','show','disable')
            openedCards.push(this);
            
        //COMPARE OPEN CARDS 
        compare(currentCard, previousCard);

        // IF 1st PICK THEN JUST OPEN CARD 
        } else {
            currentCard.classList.add('open','show','disable')
            openedCards.push(this);
            
        }
    });
}

//ADD MOVES (& update rating)
function addMove(){ 
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

//COMPARE CARD FUNCTION
function compare(currentCard, previousCard) { 
    if(currentCard.innerHTML === previousCard.innerHTML){

        //DO WE HAVE A MATCH? 
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        openedCards = [];

    } else { 
        //WAIT 500ms SO USER CAN SEE THE ICON 
        setTimeout(function() {
            currentCard.classList.remove('open','show', 'disable');
            previousCard.classList.remove('open','show','disable');
            openedCards = [];

        }, 500);
    }
    addMove();
    //AFTER EACH MATCH WE CHECK IF THE GAME IS OVER 
    setTimeout(function() {
        isOver();

    }, 800);
}  

//IS GAME OVER FUNCTION + SET MODAL 
function isOver() {
    if(matchedCards.length === icons.length){
        modal.style.display = "block";
        document.getElementById("result").innerHTML = "You got a "  + countStars + " star rating with a time of " + minutes + "minute(s) and " + seconds + " seconds!"; 
        span.onclick = function() {
            modal.style.display = "none";
          }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
        restartGame();
      }
}

//RESTART GAME FUNCTION (Delete cards, call init, Reset variables, Reset moves & set stars back to three)
function restartGame() { 
    cardsContainer.innerHTML = "";
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
    resetTimer();
    init();

}

//RATINGS - SCORE PANEL 
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
function rating() {
    if (moves > 22) {
      countStars = 1;
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    } else if (moves > 15) {
      countStars = 2;
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    } else {
      countStars = 3;
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                                      <li><i class="fa fa-star"></i></li>`;
    }
  }

//RESTART GAME BUTTON
const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener('click', restartGame);

// START GAME FOR FIRST TIME 
init();
startTimer();





