`use strict`;


let numClick = -1;
let userPattern =[];
let correctPattern = [];
let possibleColors = ["red" , "blue", "yellow", "green"];

 let numlevel = 0;
 let numscore =0;

$(".btn").click(function(buttonClicked){
    numClick++;
let color = buttonClicked.target.id;
clickAnimation("#" + color);    
playAudio(color);
checkAnswer(color);
});


function checkAnswer(color){
  userPattern.push(color);
  if(color == correctPattern[numClick]){
    if(userPattern.length == correctPattern.length){
        setTimeout(function(){
            userPattern = [];
            numClick = -1;
            nextChange();
        },100);
       
    }
  }else{
    playAudio("wrong");
    $("body").addClass("game-over");
       document.querySelector("h1").textContent="Game over!! to restart press another key";
       userPattern=[];
       correctPattern=[];
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
       if(numlevel>numscore){
         numscore = numlevel;
         $("#numScore").text(numlevel);
        }
       numlevel=0;
       numClick = -1;
  }
}


function nextChange(){
     numlevel++;
     $("#numLevel").text(numlevel);
    let rand = Math.floor(Math.random()*4);
    let color = possibleColors[rand];
    correctPattern.push(color);
    playAudio(color);
    clickAnimation("#" + color)
}
function playAudio(color){
    let relPath = `sounds/${color}.mp3`;
    let audio = new Audio(relPath);
    audio.play();
}
function clickAnimation(id){
    $(id).fadeOut(100).fadeIn(100);

}

$(document).keydown(function(){
    if(numlevel<=0){
        document.querySelector("h1").textContent="The game started!!!"
        nextChange();
    }
});


