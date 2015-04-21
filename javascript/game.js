function TicTacToeGame() {
  this.gameBoard = ['-','-','-','-','-','-','-','-','-'];
  this.winner    = '';
  this.moveCount = 0;
  this.maxDepth  = 6;
  this.aiMove;
}

TicTacToeGame.prototype = {

  makeToasterMove: function(board, playerMark) { 
    // check win for x before making next move
    if (this.moveCount >= 4 && this.isWin(board, 'x')) {
      this.winner = 'x';
      return;
    } else if(this.isTie(board)) {
      this.winner = 'tie';
      return;
    }

    this.minimax(board, 'o', 0);
    board[this.aiMove] = 'o';
    this.moveCount += 1;

    // check win for o right after toaster move
    if (this.moveCount >= 5 && this.isWin(board, 'o')) {
      this.winner = 'o';
      return;
    } else if(this.isTie(board)) {
      this.winner = 'tie';
      return;
    }
  },

  makeHumanMove: function(boardIndex, player) {
    if (this.gameBoard[boardIndex] === '-') {
      this.gameBoard[boardIndex] = player;
      this.moveCount += 1;
     
      var self = this;
      this.makeToasterMove(self.gameBoard, 'o');
    }
  },

  isTie: function(board) {
    return this.boardFull(board) && !this.isWin(board);
  },

  score: function(board) {
    if (this.isWin(board, 'x')) {
      return 10;
    } else if (this.isWin(board, 'o')) {
      return -10;
    } else {
      return 0;
    }
  },

  minimax: function(board, player, depth) {
    if (depth >= this.maxDepth || this.gameOver(board)) {
      return this.score(board);
    }

    var maxScore,
        minScore,
        scores = [],
        moves = [],
        opponent = (player == 'x') ? 'o' : 'x',
        successors = this.getAvailableMoves(board);

    for (var i in successors) {
      var possibleState = board;
      possibleState[successors[i]] = player;
      scores.push(this.minimax(possibleState, opponent, depth + 1));
      possibleState[successors[i]] = '-';
      moves.push(successors[i]);  
    }

    if (player == 'x') {
      this.aiMove = moves[0];
      maxScore = scores[0];
      for (var i in scores) {
        if (scores[i] > maxScore) {
          maxScore = scores[i];
          this.aiMove = moves[i];
        }
      }
      return maxScore;
    } else {
      this.aiMove = moves[0];
      minScore = scores[0];
      for (var i in scores) {
        if (scores[i] < minScore) {
          minScore = scores[i];
          this.aiMove = moves[i];
        }
      }
      return minScore;
    }  
  },

  /* For a given state of the board, returns array of indeces of available moves */
  getAvailableMoves: function(board) {
    var allMoves = [];
    for (var i = 0; i < board.length; i++) {
      if (board[i] === '-') {
        allMoves.push(i);
      }
    }
    return allMoves;
  },

  isWin: function(board, playerMark) {
    return this.rowWin(board, playerMark) || this.columnWin(board, playerMark) || this.diagWin(board, playerMark);
  },

  rowWin: function(board, playerMark) {
    //[0,1,2],[3,4,5],[6,7,8]
    var winString = playerMark + playerMark + playerMark
    var size      = 3;

    for (var i = 0; i < board.length; i += size) {
      var row = board.slice(i, i + size);
      if (row.join('') === winString) { return true };
    }
  },

  columnWin: function(board, playerMark) {
    //[0,3,6] [1,4,7] [2,5,8]
    var winString = playerMark + playerMark + playerMark
    var firstCol  = this.getWinPoss(board, 0, 3);
    var secondCol = this.getWinPoss(board, 1, 3);
    var thirdCol  = this.getWinPoss(board, 2, 3);
    return winString === firstCol || winString === secondCol || winString === thirdCol;
  },

  diagWin: function(board, playerMark) {
    //[0,4,8] [2,4,6]
    var winString = playerMark + playerMark + playerMark
    var leftDiag  = this.getWinPoss(board, 0, 4);
    var rightDiag = this.getWinPoss(board, 2, 2);

    return winString === leftDiag || winString === rightDiag;
  },

  getWinPoss: function(board, start, size) {
    var winPoss = '';

    for (var i = start; i < board.length; i += size) {
      winPoss += board.join('').charAt(i);
      if (winPoss.length === 3) { break; }
    }
    return winPoss;
  },

  boardFull: function(board) {
    return board.indexOf('-') === -1;
  },

  gameOver: function(board) {
    return this.boardFull(board) || this.isWin(board, 'x') || this.isWin(board, 'o')
  }
}
