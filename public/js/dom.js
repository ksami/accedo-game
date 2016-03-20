function updateScore(score){
  $("#gameScore").text(score);
}

function endGame(score){
  $("#userScore").val(score);
  $("#modalHighScoreForm").show();
  $("#modalHighScoreTable").hide();
  $("#modalHighScore").modal("show");

  $("#modalHighScoreForm").submit(function(event){
    event.preventDefault();
    
    $.post("/highscore/submit", {
      name: $("#userName").val(),
      email: $("#userEmail").val(),
      score: score
    })
    .done(function(scores){
      $("#modalHighScoreTable > tbody").empty();
      
      _.each(scores, function(score, idx){
        $("#modalHighScoreTable").append("<tr><td>"+(idx+1)+"</td><td>"+
          score.user.name+"</td><td>"+score.value+"</td></tr>");
      });

      $("#modalHighScoreForm").hide();
      $("#modalHighScoreTable").show();
    })
    .fail(function(err){
      console.log(err);
    });
    
  });
}
