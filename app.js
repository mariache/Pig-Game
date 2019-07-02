/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls 1*1, 2*2, 3*3, 4*4, 5*5, 6*6, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
{
  let scores, roundScore, activePlayer, gameIsPlaying, lastDice;
  const newGameBtn = document.querySelector(".btn-new");
  const rollDiceBtn = document.querySelector(".btn-roll");
  const holdBtn = document.querySelector(".btn-hold");
  const dice0 = document.querySelector("#dice-0");
  const dice1 = document.querySelector("#dice-1");
  const finalScore = document.querySelector(".final-score");
  const score0 = document.getElementById("score-0");
  const score1 = document.getElementById("score-1");
  const currentScore0 = document.getElementById("current-0");
  const currentScore1 = document.getElementById("current-1");
  const player0Panel = document.querySelector(".player-0-panel");
  const player1Panel = document.querySelector(".player-1-panel");

  const toReload = () => {
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  const rollDice = () => {
    if (gameIsPlaying) {
      const dice0Val = Math.floor(Math.random() * 6) + 1;
      const dice1Val = Math.floor(Math.random() * 6) + 1;

      dice0.style.display = "block";
      dice0.src = "dice-" + dice0Val + ".png";

      dice1.style.display = "block";
      dice1.src = "dice-" + dice1Val + ".png";

      if (dice0Val !== dice1Val) {
        //Add score
        roundScore += dice0Val + dice1Val;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        alert(
          `you've got ${dice0Val} * ${dice1Val} so, all your ROUND score gets lost`
        );
        nextPlayer();
      }
    }
  };

  const holdScore = () => {
    if (gameIsPlaying) {
      //Add current score to Global score
      scores[activePlayer] += roundScore;
      //Update the Ui
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

      let inputScore = parseInt(finalScore.value);
      let winningScore;
      if (inputScore) {
        winningScore = inputScore;
      } else {
        winningScore = 100;
      }
      //Check if player won the game
      if (scores[activePlayer] >= winningScore) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        dice0.style.display = "none";
        dice1.style.display = "none";
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");

        finalScore.classList.add("final-score-disabled");

        gameIsPlaying = false;
        toReload();
      } else {
        nextPlayer();
      }
    }
  };

  const initGame = () => {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameIsPlaying = true;

    dice0.style.display = "none";
    dice1.style.display = "none";
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    player0Panel.classList.remove("winner");
    player1Panel.classList.remove("winner");
    player0Panel.classList.remove("active");
    player1Panel.classList.remove("active");
    player0Panel.classList.add("active");
  };

  const nextPlayer = () => {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    currentScore0.textContent = "0";
    currentScore1.textContent = "0";

    player0Panel.classList.toggle("active");
    player1Panel.classList.toggle("active");

    dice0.style.display = "none";
    dice1.style.display = "none";
  };

  initGame();
  rollDiceBtn.addEventListener("click", rollDice);
  holdBtn.addEventListener("click", holdScore);
  newGameBtn.addEventListener("click", initGame);
}
