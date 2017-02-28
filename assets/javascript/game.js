
$(document).ready(function() {

 
  var yourMatchingNumber = 0;

  var randomNum = randomNumGen();

  
  var wins = 0;
  var losses = 0;
  var crystals;

 var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/13.mp3");

      var audioElement1 = document.createElement("audio");
      audioElement1.setAttribute("src", "assets/12.mp3");
      audioElement1.volume = 0.2;

 var audioElement2 = document.createElement("audio");
      audioElement2.setAttribute("src", "assets/14w.mp3");

       var audioElement3 = document.createElement("audio");
      audioElement3.setAttribute("src", "assets/14lo.mp3");

audioElement1.play();



  
  function randomNumCrystals() {
   
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/image/1.png"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/image/2.png"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/image/3.png"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/image/4.png"
      }
    };
  }

 
  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  function setGame() {
   
    yourMatchingNumber = 0;
 
    crystals = randomNumCrystals();

    randomNum = randomNumGen();
    $("#computerGuess").text(randomNum);
  }


  function updateDom(didUserWin) {
    $("#results").empty();

   
    if (didUserWin === true) {

      $("#results").append($("<p>").text("You won!!"));
      setGame();
      renderMatchingNumber();
      audioElement2.play();
    }

    else if (didUserWin === false) {
  
      $("#results").append($("<p>").text("You lost!!"));
      setGame();
      renderMatchingNumber();
       audioElement3.play();
    }


    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#results").append(pWins);
    $("#results").append(pLosses);
  }


  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystalpic").append(crystalDiv);
    }
  }

  
  function updateMatchingNumber(crystal) {
  
    yourMatchingNumber += crystals[crystal.attr("data-name")].points;
  }


  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  $(".crystals-button").on("click", function(event) {

     audioElement.play();


    updateMatchingNumber($(this));
    renderMatchingNumber();

   
    if (yourMatchingNumber === randomNum) {
  
      wins++;
      setGame();
      updateDom(true);
    }

    else if (yourMatchingNumber > randomNum) {

      losses++;
      setGame();
      updateDom(false);
    }
  });

});
