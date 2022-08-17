'use strict';

const card0El = document.querySelector('.card--0');
const card1El = document.querySelector('.card--1');
const rollBtn = document.querySelector('.roll-button');
const holdBtn = document.querySelector('.hold-button');
const newBtn = document.querySelector('.button__newgame');
const diceEl = document.querySelector('.dice__item');
const player1El = document.querySelector('.points--0');
const player2El = document.querySelector('.points--1');
const player1Na = document.querySelector('.player__name--0');
const player2Na = document.querySelector('.player__name--1');
const currentPoints = document.querySelector('.current__points');
const rollEl = document.getElementById('roll');
const body = document.body

const winnerText = document.createElement('p')
winnerText.classList.add('winner-text', 'uppercase', 'bold');
winnerText.textContent = 'winner!!!!';

let scores, currentScore, activePlayer, winScore, playing, turnsLeft;

let player1Name, player2Name;

const turnsNumber = 10;

const init = () =>{
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  turnsLeft = [turnsNumber, turnsNumber];
  playing = true;

  currentPoints.textContent = 0;
  player1El.textContent = 0;
  player2El.textContent = 0;

  card0El.classList.remove('winner');
  card1El.classList.remove('winner');
  card0El.classList.add('card--active');
  card1El.classList.remove('card--active');

  body.classList.remove('switch-gradient');

  rollEl.classList.remove('hidden');

  if(card0El.contains(winnerText)){
    card0El.removeChild(winnerText);
  }

  if(card1El.contains(winnerText)){
    card1El.removeChild(winnerText);
  }
  


  player1Na.textContent = player1Name;
  player2Na.textContent = player2Name;

  document.querySelector('.turns--0').textContent = turnsNumber;
  document.querySelector('.turns--1').textContent = turnsNumber;
}

const switchPlayer = () => {
  card0El.classList.toggle('card--active');
  card1El.classList.toggle('card--active');
  body.classList.toggle('switch-gradient');
  currentPoints.textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

rollBtn.addEventListener('click', function(e){

  if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `./assets/dice-${dice}.png`;

    turnsLeft[activePlayer] -= 1;


    if(dice !== 1){
      currentScore += dice;
      currentPoints.textContent = currentScore;
      
      document.querySelector(`.turns--${activePlayer}`).textContent = turnsLeft[activePlayer];

    }else{

      switchPlayer();

    }


    if(turnsLeft[activePlayer] <= 0)
    {
      switchPlayer();
      rollEl.classList.add('hidden');
      document.querySelector(`.card--${activePlayer}`).appendChild(winnerText);

      document.querySelector(`.card--${activePlayer}`).classList.add('winner');
      playing = false;
      
    }


  }
});

holdBtn.addEventListener('click', function(){

  if(playing){
    scores[activePlayer] += currentScore;

    document.querySelector(`.points--${activePlayer}`).textContent = scores[activePlayer];

  if(scores[activePlayer] >= winScore){
    rollEl.classList.add('hidden');

    
    document.querySelector(`.card--${activePlayer}`).classList.add('winner');
    document.querySelector(`.card--${activePlayer}`).appendChild(winnerText);
    playing = false;
  }else{
    switchPlayer();
  }
}
  
});


newBtn.addEventListener('click', function(){
  player1Name = document.querySelector('.name--0').value;
  player2Name = document.querySelector('.name--1').value;

  winScore = document.querySelector('.max__score').value;

  init();

});

