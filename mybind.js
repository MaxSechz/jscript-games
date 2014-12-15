Function.prototype.myBind = function (context) {
  var fn = this;
  var passedArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
    fn.apply(context, passedArgs.concat(arguments));
  };
};
