rolling = document.querySelector ('.btn-roll');
newGame = document.querySelector ('.btn-new');
hold = document.querySelector('.btn-hold');
piggy = document.querySelector('.pig');
targetedScores = document.querySelector('.targetedScore');

var target,playerScores,totalScores,activeP,activePlayer,gamePlay;
var dice,diceImg;
var degree = 0;
var chooses;
var choose_value;
var checkTarget;
var winNewGame;


newGaming();


//target score choosing
document.body.addEventListener('change',choosing);

function choosing(){
    chooses = document.getElementsByName('t_score');
    
    for(var i = 0; i < chooses.length; i++){
        if(chooses[i].checked){
        choose_value = chooses[i].value;
            if(choose_value == 20){
                document.getElementById('tscore2').disabled = true;
                document.getElementById('tscore3').disabled = true;
            } 
            else if(choose_value == 50){
                document.getElementById('tscore1').disabled = true;
                document.getElementById('tscore3').disabled = true;
            }
            else if(choose_value == 100){
                document.getElementById('tscore1').disabled = true;
                document.getElementById('tscore2').disabled = true;
            }
            rolling.disabled = false;
            hold.disabled = false;
        }
    }
    
    targetedScores.textContent = choose_value;
}



//rolling dice function
function rollingDice(){
   if(gamePlay){
    dice = Math.floor(Math.random() * 6) +1;
    console.log(dice);

    diceImg =  document.querySelector('.dice');
    
    diceImg.src = 'img/D'+dice+'.png';
    diceImg.style.display ='block';
    rotation();

    if(dice !== 1){
        totalScores += dice;
        document.getElementById('score'+activeP).innerText = totalScores;

    }
    else{
       switchPlayer();
    }
    }
}
function rotation(){
    
    diceImg.style.transform = `rotate(${degree}deg)`;
    diceImg.style.transition = 'all 0.5s';
    degree = degree + 90;
    
}


//hold number
function holding(){
    choosing();
    checkTarget = parseInt(choose_value);
    
    // console.log(typeof(checkTarget));

    //get current score to overallscore
    activePlayer = activeP-1;
    playerScores[activePlayer] += totalScores;

    // console.log('Current'+activeP+'='+playerScores[activePlayer]);
    document.getElementById('count'+activeP).innerText= playerScores[activePlayer];   
        
    
    if(playerScores[activePlayer] >= checkTarget){
        document.querySelector('.p'+ activeP).classList.add('winner');
        document.querySelector('#play'+ activeP).innerText = `Player ${activeP} is winner`;
        document.getElementById('pigPlayer'+activeP).src = 'img/pig2.png';
        winNewGame = document.createElement("button");
        winNewGame.innerHTML = '<i class="far fa-plus-circle"></i>New Game'; 
        winNewGame.classList.add('btn-winNew');
        
        document.querySelector('.p'+ activeP).appendChild(winNewGame);
        winNewGame.addEventListener('click',winnewGaming);

        gamePlay = false;
    }
    else{
        switchPlayer();
    }
    

}

function switchPlayer(){
    totalScores = 0;
    document.getElementById('score'+activeP).innerText = totalScores;
    activeP == 1 ? activeP =2 :activeP =1;
    diceImg.style.display ='none';
    document.querySelector('.p1').classList.toggle('active');
    document.querySelector('.p2').classList.toggle('active');
   
}
//reseting values
function newGaming(){
   
    playerScores = [0,0];
    totalScores = 0;
    activeP = 1;
    gamePlay =true;
    // reset player
    document.getElementById('play1').textContent = 'Player1';
    document.getElementById('play2').textContent = 'Player2';

    //reset scores
    document.getElementById('count1').textContent = '0';
    document.getElementById('count2').textContent = '0';
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';
    document.querySelector('.dice').style.display ='none';

    //remove class of winner and active
    document.querySelector('.p1').classList.remove('active');
    document.querySelector('.p2').classList.remove('active');
    document.querySelector('.p1').classList.remove('winner');
    document.querySelector('.p2').classList.remove('winner');
    document.querySelector('.p1').classList.add('active');
    //remove targeted Scores
    targetedScores.textContent=0;
    document.getElementById('tscore1').checked = false;
    document.getElementById('tscore1').disabled = false;
    document.getElementById('tscore2').disabled = false;
    document.getElementById('tscore3').disabled = false;

     //original image
    piggy.src = 'img/pig1.png';
   
    //button disabled
    rolling.disabled = true;
    hold.disabled = true;
    
    
   
}

function winnewGaming(){
   
    playerScores = [0,0];
    totalScores = 0;
    activeP = 1;
    gamePlay =true;
    // reset player
    document.getElementById('play1').textContent = 'Player1';
    document.getElementById('play2').textContent = 'Player2';

    //reset scores
    document.getElementById('count1').textContent = '0';
    document.getElementById('count2').textContent = '0';
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';
    document.querySelector('.dice').style.display ='none';

    //remove class of winner and active
    document.querySelector('.p1').classList.remove('active');
    document.querySelector('.p2').classList.remove('active');
    document.querySelector('.p1').classList.remove('winner');
    document.querySelector('.p2').classList.remove('winner');
    document.querySelector('.p1').classList.add('active');
    //remove targeted Scores
    targetedScores.textContent=0;
    document.getElementById('tscore1').checked = false;
    document.getElementById('tscore1').disabled = false;
    document.getElementById('tscore2').disabled = false;
    document.getElementById('tscore3').disabled = false;

     //original image
    piggy.src = 'img/pig1.png';
   
    //button disabled
    rolling.disabled = true;
    hold.disabled = true;
    
    winNewGame.remove();
   
}

newGame.addEventListener('click',newGaming);
rolling.addEventListener('click',rollingDice);
hold.addEventListener('click',holding);
