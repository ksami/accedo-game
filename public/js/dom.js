function updateScore(score){
  $("#gameScore").text(score);
}

function endGame(score){
  $("#userScore").val(score);
  $("modalHighScoreForm").show();
  $("#modalHighScoreTable").hide();
  $("#modalHighScore").modal("show");

  // $.get("/highscore")
  // .done(function(scores){
  //   _.each(scores, function(score){
  //     $("#modalHighScoreTable").append("<tr><td>"+score.user.name+
  //       "</td><td>"+score.user.email+"</td><td>"+score.value+"</td></tr>");
  //   });
  //   $("modalHighScoreForm").hide("fast");
  //   $("#modalHighScoreTable").show("fast");
  // })
  // .fail(function(err){
  //   console.log(err);
  // });
  $("#modalHighScoreForm").submit(function(event){
    event.preventDefault();

    $.post("/highscore/submit", {
      name: $("#userName").val(),
      email: $("#userEmail").val(),
      score: score
    })
    .done(function(data){
      console.log(data);
    })
    .fail(function(err){
      console.log(err);
    });
    
  });
}
