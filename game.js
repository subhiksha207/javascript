const startScreen = document.getElementById("startScreen");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");

const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const arrow3 = document.getElementById("arrow3");

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

let x = 50;
let y = 300;
let score = 0;

const STEP = 40;

let arrowPos1 = 900;
let arrowPos2 = 1200;
let arrowPos3 = 1500;

let arrowTop1 = 100;
let arrowTop2 = 250;
let arrowTop3 = 400;

let interval1;
let interval2;
let interval3;

function startGame() {

    startScreen.style.display = "none";
    game.style.display = "block";
    updatePlayer();
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
    interval1 = setInterval(moveArrow1,60);
    interval2 = setInterval(moveArrow2,50);
    interval3 = setInterval(moveArrow3,50);
}
function updatePlayer(){
    player.style.left = x + "px";
    player.style.top = y + "px";
    scoreText.innerHTML = "SCORE : " + score;
}
startBtn.addEventListener("click",startGame);
document.addEventListener("keydown",function(e){
    if(e.key=="s" || e.key=="S"){
        startGame();
        return;
    }
    if(game.style.display=="none") return;
    const MAX_Y = game.clientHeight-player.clientHeight;
    if(e.key=="ArrowUp"){
        y -= STEP;
        if(y<0)
            y=0;
    }
    if(e.key=="ArrowDown"){
        y += STEP;
        if(y>MAX_Y)
            y=MAX_Y;
    }
    updatePlayer();

});
function randomHeight(){
    return Math.floor(Math.random()*430);
}
function moveArrow1(){
    arrowPos1 -= 10;
    if(arrowPos1<-40){
        arrowPos1 = 900 + Math.random()*200;
        do{
            arrowTop1 = randomHeight();
        }
        while(
            Math.abs(arrowTop1-arrowTop2)<80 ||
            Math.abs(arrowTop1-arrowTop3)<80
        );
        score++;
    }
    arrow1.style.left = arrowPos1+"px";
    arrow1.style.top = arrowTop1+"px";
    collision(arrow1);
}
function moveArrow2(){
    arrowPos2 -= 12;
    if(arrowPos2<-40){
        arrowPos2 = 1200 + Math.random()*200;
        do{
            arrowTop2 = randomHeight();
        }
        while(
            Math.abs(arrowTop2-arrowTop1)<80 ||
            Math.abs(arrowTop2-arrowTop3)<80
        );
        score++;
    }
    arrow2.style.left = arrowPos2+"px";
    arrow2.style.top = arrowTop2+"px";
    collision(arrow2);
}
function moveArrow3(){
    arrowPos3 -= 14;
    if(arrowPos3<-40){
        arrowPos3 = 1500 + Math.random()*200;
        do{
            arrowTop3 = randomHeight();
        }
        while(
            Math.abs(arrowTop3-arrowTop1)<80 ||
            Math.abs(arrowTop3-arrowTop2)<80
        );
        score++;
    }
    arrow3.style.left = arrowPos3+"px";
    arrow3.style.top = arrowTop3+"px";
    collision(arrow3);
}
function collision(arrow){
    let playerRect = player.getBoundingClientRect();
    let arrowRect = arrow.getBoundingClientRect();
    if(
        arrowRect.left < playerRect.right &&
        arrowRect.right > playerRect.left &&
        arrowRect.top < playerRect.bottom &&
        arrowRect.bottom > playerRect.top
    ){
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
game.style.display = "none";
finalScore.innerHTML = "Final Score : " + score;
gameOverScreen.style.display = "flex";
    }
    scoreText.innerHTML = "SCORE : " + score;
}