



var ConnectFourGame = function(){
  this.board = ["edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge", null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
                "edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge"
              ];

//                      1       2       3       4       5       6       7
// this.board = ["edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,
//               "edge" ,null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
//               "edge" ,null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
//               "edge" ,null   ,null   ,null   ,null   ,null   ,null   ,null   ,"edge" ,
//               "edge" ,null   ,null   ,null   ,"red"  ,null   ,null   ,null   ,"edge" ,
//               "edge" ,null   ,null   ,"red"  ,"black",null   ,null   ,null   ,"edge" ,
//               "edge" ,null   ,"red"  ,"black","red"  ,"red"  ,"black","black","edge" ,
//               "edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge" ,"edge"
//               ];
  this.colors = ['black', 'red']
  this.playerColor = this.colors[0]
  this.switchColor = function(){
    if (this.playerColor === this.colors[0]){
      this.playerColor = this.colors[1]
    } else {
      this.playerColor = this.colors[0]
    }
  }

  this.checkWin = function(){
    var _board = this.board;
    var won = false;
    this.board.forEach(function(element, index){
      if(element != null && element != "edge"){
        if(
          (element === _board[index + 9  * 1 ] &&
           element === _board[index + 9  * 2 ] &&
           element === _board[index + 9  * 3 ]) ||
          (element === _board[index + 1  * 1 ] &&
           element === _board[index + 1  * 2 ] &&
           element === _board[index + 1  * 3 ]) ||
          (element === _board[index + 8  * 1 ] &&
           element === _board[index + 8  * 2 ] &&
           element === _board[index + 8  * 3 ]) ||
          (element === _board[index + 10 * 1 ] &&
           element === _board[index + 10 * 2 ] &&
           element === _board[index + 10 * 3 ])
          ){
          won = true;
        }
      }
    })
    return won;
  }

  // this.playerTurn = function(){

  // }


  this.playTurn = function(columnNumber){
    for (var i = columnNumber + 9; i < 1000; i += 9){

        if (this.board[i] != null){
          this.board[i - 9] = this.playerColor
          this.switchColor()
          return i-9;

          i = 1000;
                  }
    }

  }



}




var newGame = new ConnectFourGame();
// console.log(String(newGame.board));

newGame.playTurn(1);

// console.log(String(newGame.board));

var askg = function (){

  sdlfjsd
}