$(document).ready(function(){
	var newGame = new ConnectFourGame();
	var lock = false;
	// console.log("heyyyy");

	var connection = new WebSocket('ws:172.16.51.254:8001');
        connection.onmessage = function(event){
        	console.log(event.data);
        	receivedMessage = JSON.parse(event.data);
        	console.log(receivedMessage);
        	// console.log(receivedMessage.column);

        	if (receivedMessage.column){
                  if (!newGame.checkWin()){
                     var column = receivedMessage.column;
        							// var column = $(this).attr('class').slice(-1);
        							var cell = newGame.playTurn(Number(column))
        							// connection.send(column);
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


                                }

                                $('.board-container div div').on('click', function(){
                                     if (!lock){
                                          var column = $(this).attr('class').slice(-1);
                                          jsonObject = JSON.stringify({column: column});
                                          connection.send(jsonObject);}
                                  }
                                  )

                                $('#new-game-button').click(function() {
                                        location.reload();
                                });
                        })
