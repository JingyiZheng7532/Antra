// Question9: Write a JavaScript function which accepts an argument and returns the type.
//            Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.

// Solution
const getType = function (value) {
  if (value === null) {
    return "null";
  }
  return typeof value;
};

// Test case
console.log(getType(123));
console.log(getType("hello"));
console.log(getType(undefined));
console.log(getType(true));
console.log(getType(function () {}));
console.log(getType({}));
console.log(getType(null));
