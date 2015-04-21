function View(){
}

View.prototype = {

  setX: function(dataIndex) {
    $("[data-index='" + dataIndex + "']").addClass('x');
  },

  setO: function(gameBoard) {
    for(var i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === 'o') {
        $("[data-index='" + i + "']").addClass('o');
      }
    }
  },

  showEndMessage: function(message) {
    $(".end").fadeIn();
    $(".end").text(message);
  }
}