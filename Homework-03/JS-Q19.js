// Question19: Write a JavaScript function that returns array elements larger than a number.

// Solution:
const larger = function (arr, target) {
  return arr.filter((item) => item > target);
};

// Test case;
const arr1 = [9, 2, 6, 7, 3, 8];
const target = 7;

console.log("ans1: ", larger(arr1, target));
