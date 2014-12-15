var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[3,2,1],[],[]];
}

HanoiGame.prototype.isWon = function () {
  if (this.stacks[0].length === 0 &&
      (this.stacks[1].length === 0 ||
        this.stacks[2].length === 0)) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var topStart = this.stacks[startTowerIdx][this.stacks[startTowerIdx].length - 1];
  var topEnd = this.stacks[endTowerIdx][this.stacks[endTowerIdx].length - 1];

  if (topEnd === undefined && (typeof topStart === "number")) {
    return true;
  } else if (topStart < topEnd) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
  }
  return false;
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();

  reader.question("Which tower would you like to take from?", function (startTowerInput) {
    reader.question("Which tower would you like to move to?", function (endTowerInput) {
      var startTowerIdx = parseInt(startTowerInput);
      var endTowerIdx = parseInt(endTowerInput);

      callback(startTowerIdx, endTowerIdx);
    });
  });

};

HanoiGame.prototype.run = function (completionCallback) {
  var that = this;
  this.promptMove(function (startTowerIdx, endTowerIdx) {
    var success = that.move(startTowerIdx, endTowerIdx);
    if (!success) {
      console.log("Invalid Move");
    }
    if (that.isWon()) {
      console.log("You win!");
      completionCallback();
    } else {
      that.run(completionCallback);
    }
  });
};

var game = new HanoiGame();
game.run(function () {
  console.log("this callback happened")
  reader.close();
});
