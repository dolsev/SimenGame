var buttonMasters = ["billy", "forWhat", "sorry", "van"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("h1").click(function () {
if (level===0){
  nextSequence();}
});

function nextSequence() {
  userClickedPattern = [];
  level++
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenMaster = buttonMasters[randomNumber];
  gamePattern.push(randomChosenMaster);
  $("." + buttonMasters[randomNumber]).fadeOut(200).fadeIn(200);
  playSound(randomChosenMaster);
}

for (let i = 0; i < buttonMasters.length; i++) {
    $("." + buttonMasters[i]).click(function () {
      var clickedButtonClass = buttonMasters[i];
      animatePress(clickedButtonClass);
      playSound(clickedButtonClass);
      userClickedPattern.push(clickedButtonClass);
      checkAnswer (userClickedPattern.length-1);
    });
  }

function playSound(name) {
  const audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
function animatePress(buttonToAnimate){ 
    $("."+buttonToAnimate).addClass("pressed");
    
    setTimeout (function (){
        $("."+buttonToAnimate).removeClass("pressed")},150);
    }

function checkAnswer (currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("winning");
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){nextSequence()},1000);
        }
        else {
        currentLevel++
        }
    }
    else {
        $("h1").html ("<a href=index.html> You lost! Try again?</a>")
        playSound("rip-ears");
        $("body").addClass("bg-loser");
        setTimeout(function(){$("body").removeClass("bg-loser")},300);
        
    }
}

$(document).on('mouseenter', '.divbutton', function () {
    $(this).find(":button").show();
}).on('mouseleave', '.divbutton', function () {
    $(this).find(":button").hide();
}).on('click', ':button', function() {
    $(this).parent().remove();
});
