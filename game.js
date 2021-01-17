
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameIsStarted = false;
var level = 0;

$(document).keypress(function (e)
{
  if (!gameIsStarted)
  {

    $("#level-title").text("Level " + level);
    nextSequence();
    gameIsStarted = true;
  }
} );


//handling user clicks
$(".btn").click(function()
{
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});
//checking answer
function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length)
    {


      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
  console.log("wrong");

   $("#level-title").text("Game Over. Press Any Key to Start");
   startOver();

   var audio = new Audio("sounds/wrong.mp3");
   audio.play();
   $(body).addClass("game-over");
   setTimeout(function() {$("#" + currentColour).removeClass("game-over");}, 200);

  }


}


function nextSequence() //choosing next random color
{ //increase level by 1, show current level tplayer (0 - game not started)


  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  //filling game pattern

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    //adding random color to existing game pattern
    gamePattern.push(randomChosenColour);

    //animating new pattern color
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //playing sound of new patterncolor
    playSound(randomChosenColour);

}

//animating chosen button
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {$("#" + currentColour).removeClass("pressed");}, 100);

}

//play sound on clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function startOver()
{
  level = 0;
  gameIsStarted = false;
  gamePattern =[];

}
