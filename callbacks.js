function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  console.log(
      this.currentTime.getHours() +
      ':' + this.currentTime.getMinutes() +
      ':' + this.currentTime.getSeconds()
  );
};

Clock.prototype.run = function () {
  this.currentTime = new Date();
  this.printTime();
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  this.currentTime.setTime(this.currentTime.getTime() + Clock.TICK);
  this.printTime();
};

// var clock = new Clock();
// clock.run();

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Gimme a number! ", function (response) {
      var parsedNum = parseInt(response);
      sum += parsedNum;
      console.log(sum);

      addNumbers(sum, --numsLeft, completionCallback)
    });
  } else {
    completionCallback(sum);
  }
};

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
//   reader.close();
// });

var absurdBubbleSort = function (arr, sortCompletionCallback) {
  var outerBubbleSortLoop = function (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);
};

var askIfLessThan = function (el1, el2, callback) {
  reader.question("Is " + el1 + " smaller than " + el2, function (response) {
    if (response === "y") {
      callback(true);
    } else {
      callback(false);
    }
  });
};

var innerBubbleSortLoop = function (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfLessThan(arr[i], arr[i+1], function (isLessThan) {
      if (!isLessThan) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }

      innerBubbleSortLoop(arr, ++i, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
