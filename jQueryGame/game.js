
let level=0;
let userClickedPattern =[];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];



function playSound(name){
    let sound = new Audio("./sounds/wrong.mp3");
    switch(name){
        case 'blue':
            sound=new Audio('./sounds/blue.mp3');
            break;
        case 'green':
            sound=new Audio('./sounds/green.mp3');
            break;
        case 'red':
            sound=new Audio('./sounds/red.mp3');
            break;
        case 'wrong':
            sound=new Audio('./sounds/wrong.mp3');
            break;
        case 'yellow':
            sound=new Audio('./sounds/yellow.mp3');
            break;
        default:
            break;
    }
}

function animatePress(currentColour){
    let button = $( `#${currentColour}`)
    button.addClass("pressed");
    setTimeout(()=>{
        button.removeClass("pressed")
    },100);
}

function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    level=0;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");

        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence(){
    userClickedPattern = [];

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    level+=1;
    $("h1").text(`Level ${level}`);
}


$(document).keydown(function(){
    if(level==0){
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
})
