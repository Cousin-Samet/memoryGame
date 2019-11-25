// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//declaring variables
 //cards
cardList = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = 0;
 //modal
modalMoves = document.querySelector('.modal-moves');
modalSec = document.querySelector('.modal-secs');
modalMin = document.querySelector('.modal-mins');
modalStars = document.querySelector('.modal-stars');
 //restart
const restart1 = document.querySelector('.restart');
const restart2 = document.querySelector('.modal-restart');
 //timer
const seconds = document.querySelector('.secs');
const minutes = document.querySelector('.mins');
let secs = 0;
let mins = 0;
 //moves
move = 0;

//initialising game
 createDeck();
 startTimer();

 //restart button
 restart1.addEventListener('click', function(){
   location.reload();
 });
 restart2.addEventListener('click', function(){
   location.reload();
 });


 //creates deck, shuffles, removes old html then adds in the new shuffled deck.
 function createDeck() {
  const cardArray = [...cardList];
  const shuffledArray = shuffle(cardArray);
 //loops over old cards and removes them from html
  for (i=0; i < cardList.length; i++) {
   const oldCard = cardList[i];
   oldCard.remove();
  }
  const deckFragment = document.createDocumentFragment();
 //creates a new deck of shuffled cards
  for (i=0; i < shuffledArray.length; i++) {
   const newCard = document.createElement('li');
   newCard.innerHTML = shuffledArray[i].innerHTML;
   newCard.className = shuffledArray[i].className;
   newCard.addEventListener('click', flipCard);
   deckFragment.appendChild(newCard);
  }
  const newDeckList = document.querySelector('.deck');
  newDeckList.appendChild(deckFragment);
}

//flips card and checks if there are 2 cards open and calls a new method. Also checks moves and ratings
function flipCard(e){
  e.target.classList.toggle("open");
  e.target.classList.toggle("show");
  openCards.push(e.target);
  e.target.removeEventListener('click', flipCard);
  if (openCards.length === 2) {
    checkCard();
  }
  moveCounter();
  checkRating();
}

//checks open cards to see if they match or not. proceeds to the appropriate function accordingly
function checkCard(){
  toggleListeners();
  if(openCards[0].innerHTML === openCards[1].innerHTML){
    setTimeout(match, 300);
  }else{
    setTimeout(notMatch, 700);
  }
}

//if cards match, remove event listeners, send alert and count matched cards. also checks to see if all cards are matched
function match(){
  openCards[0].classList.toggle("match");
  openCards[1].classList.toggle("match");
  openCards[0].removeEventListener('click', flipCard);
  openCards[1].removeEventListener('click', flipCard);
  openCards = [];
  toggleListeners();
  matchedCards++;

  if(matchedCards === 8){
    endGame();
  }
}

//if no match then cards a flipped back and the game continues
function notMatch(){
  openCards[0].classList.toggle("open");
  openCards[0].classList.toggle("show");
  openCards[0].addEventListener('click', flipCard);
  openCards[1].classList.toggle("open");
  openCards[1].classList.toggle("show");
  openCards[1].addEventListener('click', flipCard);
  openCards = [];
  toggleListeners();
}

//toggles the disable class. This removes the ability to click on other cards while game is checking the 2 cards that have been flipped
function toggleListeners(){
  const cardList = document.querySelectorAll('.card');
  for(i=0; i<cardList.length; i++){
    cardList[i].classList.toggle("disable");
  }
}

//counts the number of clicks
function moveCounter(){
  move ++;
  const moves = document.querySelector('.moves');
  moves.innerHTML = move;
}

//starts the timer for the game
function startTimer(){
  interval = setInterval(timer, 1000);
}

//code to make a timer. when time gets to 60s it resets seconds and adds 1 minute to the clock
function timer(){
   secs++;
   if(secs > 59){
     secs = 0;
     mins++;
   }

   seconds.innerHTML = secs;
   minutes.innerHTML = mins;
}

//removes a star
function removeStar(){
  const star = document.querySelector('.fa-star');
  star.remove();
}

//checks moves to see if a star needs to be removed according to the scoring rating system
function checkRating(){
  if(move === 25){
    removeStar();
  }
  if(move === 35){
    removeStar();
  }
  if(move === 45){
    removeStar();
  }
}

//at end of the game, modal pops up with final score, rating and time.
function endGame(){
  const modal = document.querySelector('#modal');
  modal.style.display = "block";
  clearInterval(interval);
  rating = document.querySelector('.stars').innerHTML;

  modalMoves.innerHTML = move + " moves";
  modalStars.innerHTML = rating;
  modalSec.innerHTML = seconds.innerHTML;
  modalMin.innerHTML = minutes.innerHTML;
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} ;
