var Board = require("./board.js");

function Game(reader) {
  this.reader = reader,
  this.playerMark = ["X","O"],
  this.gameBoard = new Board(),
  this.board = this.gameBoard.board;
}

Game.prototype.isValidMove = function (move) {
  if (move[0] > this.board.length || move[1] > this.board.length ||
      move[0] < 0 || move[1] < 0) {
        return false;
  }
  return this.board[move[0]][move[1]] === undefined;
};

Game.prototype.move = function (move) {
  if (this.isValidMove(move)) {
    this.board[move[0]][move[1]] = this.playerMark[0];
    return true;
  } else {
    return false;
  }
};

Game.prototype.promptMove = function (callback) {
  this.gameBoard.print();

  this.reader.question("Choose a move ", function (moveInput) {
    var move = moveInput.split(",").map(function (el) {
      return parseInt(el);
    });

    callback(move);
  });
};

Game.prototype.isWon = function () {
  var winStatus = false;

  this.board.forEach(function (row) {
    if (row[0]!== undefined && row[0] === row[1] && row[1] === row[2]) {
      winStatus = true;
    }
  })

  for (var i = 0; i < this.board.length; i++) {
    if (this.board[0][i] !== undefined &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]) {
        winStatus = true;
    }
  }

  if (this.board[1][1] !== undefined &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]) {
      winStatus = true;
  }

  if (this.board[1][1] !== undefined &&
      this.board[2][0] === this.board[1][1] &&
      this.board[1][1] === this.board[0][2]) {
      winStatus = true;
  }

  return winStatus;
};

Game.prototype.isDraw = function () {
  var flattened = this.board.reduce(function (a, b) {
    return a.concat(b);
  });

  var count = flattened.reduce(function (a) {
    return a += 1;
  }, 0);

  return count === 9;
};

Game.prototype.isOver = function () {
  return (this.isWon() || this.isDraw());
};

Game.prototype.run = function (completionCallback) {
  var that = this;

  this.promptMove(function (move) {
    var success = that.move(move);
    if (!success) {
      console.log("Invalid Move");
    } else {
      that.playerMark.reverse(); // switch players
    }

    if (that.isOver()) {
      that.playerMark.reverse();
      var msg = that.isWon() ? that.playerMark[0] + " wins!" : "The game is a draw";
      console.log(msg);
      completionCallback();
    } else {
      that.run(completionCallback);
    }
  });
};

module.exports = Game;
