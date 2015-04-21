$(document).ready(function(){
  view       = new View()
  game       = new TicTacToeGame()
  controller = new Controller(view, game)
  controller.bindListeners();
}); 


function Controller(view, game){
  this.view = view;
  this.game = game;
}

Controller.prototype = {

  bindListeners: function(){
    $('.gameboard').on("click", ".row .one", this.playGame.bind(this))
    $('.gameboard').on("click", ".row .two", this.playGame.bind(this))
    $('.gameboard').on("click", ".row .three", this.playGame.bind(this))
    $('#reset').on("click",this.resetGame.bind(this))
    $('.prompt').fadeIn(1000);
  },

  resetGame: function() {
    location.reload(); 
  },

  playGame: function(e){
    var $cell = $(e.currentTarget).attr('data-index');
    var self  = this;

    if (!this.game.boardFull(this.game.gameBoard) && !this.game.winner) { 
      this.view.setX($cell);
      this.game.makeHumanMove($cell, 'x'); 
      if (this.game.winner === 'x') {
        // psh never happen!
        this.view.showEndMessage("HUMAN WIN.")
        //this.resetGame();
      } else if (this.game.winner === 'o') {
        this.view.setO(self.game.gameBoard);
        this.view.showEndMessage("TOASTER WIN.")
        //this.resetGame();
      } else if (this.game.winner === 'tie') {
        this.view.showEndMessage("TIE.")
        //this.resetGame();
      } else {
      this.view.setO(self.game.gameBoard); 
      }
    }
  }
} // End Controller







