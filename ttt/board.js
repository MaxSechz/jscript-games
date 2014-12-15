function Board() {
  this.board = [];
  for (var i = 0; i < 3; i++) {
    this.board.push(new Array(3));
  }
}

Board.prototype.print = function () {
  this.board.forEach(function (row) {
    console.log(JSON.stringify(row));
  });
};

module.exports = Board;
