$(document).ready(function(){
  var newGame = new ConnectFourGame();
  var lock = true;
  var socket = io();

  socket.on('game-id', function(msg){
    $('#game-id').html(msg);
    $('#matching').hide();
    $('#found-game').html("Game found!");
    $('#found-game').fadeIn();
    $('#found-game').hide().html("Pairing...").fadeIn();
    $('#found-game').hide();
    $('.board-container').fadeIn();
    lock = false;
  });

  socket.on('matching', function(msg){
    $('#matching').show();
    $('#matching').html(msg);

  });

  socket.on('message', function(msg){
  // needs on message criteria
  receivedMessage = JSON.parse(msg);
    if (receivedMessage.column){
      if (!newGame.checkWin()){
       var column = receivedMessage.column;
        // saves the return value (where the actual peice can drop) and alters
        // the "backend" javascript board
        var cell = newGame.playTurn(Number(column))
        var row = Math.floor(cell/9)
        $('#row'+row + ' .col' + column).css('background-color', newGame.playerColor )
        if (newGame.checkWin()){
          $("#winner-status").html(newGame.playerColor.toUpperCase() + " WINS");
        }
      }
      lock = false;
    } 
    if (receivedMessage.lock){
      lock = true;
    }
    if (receivedMessage.refresh) {
      alert("Your opponent left. :( New game initiated.");
      location.reload();
    }
  })
 // end message event handler
 $('.board-container div div').on('click', function(){
   if (!lock){
    var column = $(this).attr('class').slice(-1);
    jsonObject = JSON.stringify({gameId: $("#game-id").html(),column: column});
    socket.emit("message", jsonObject);}
  })
   $('#new-game-button').click(function() {
    location.reload();
  });
})


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}