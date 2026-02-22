// Question29: Write a JavaScript function to get the function name.

// Solution

const getFunctionName = function (fn) {
  console.log(fn.name);
};

const normalFunction = function () {
  console.log("I'm a normal function!");
};

getFunctionName(normalFunction);
