/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
 var scores, roundScore, activePlayer, gameIsPlaying;

initGame();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameIsPlaying){
        var dice1 = Math.floor(Math.random() * 6) +1;
        var dice2 = Math.floor(Math.random() * 6) +1;
        
        document.querySelector('#dice-0').style.display = 'block';
        document.querySelector('#dice-0').src = 'dice-' + dice1 + '.png';

        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-1').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 || dice2 !==1){
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameIsPlaying){
        //Add current score to Global score
        scores[activePlayer] += roundScore;
        //Update the Ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var inputScore = parseInt(document.querySelector('.final-score').value);
        var winningScore;
        if(inputScore){
            winningScore = inputScore;
        }else{
            winningScore = 100;
        }
        //Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent ='Winner!';
            document.querySelector('#dice-0').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.final-score').classList.add('final-score-disabled');
            gameIsPlaying = false;
        }else {
            nextPlayer();
        }
    }
});

function  initGame() {
    scores =[0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameIsPlaying = true;

    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent ='Player 1';
    document.getElementById('name-1').textContent ='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

}
 document.querySelector('.btn-new').addEventListener('click', initGame);
