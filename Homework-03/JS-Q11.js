// Question11: Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively.

// Solution

const findTarget = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  arr.sort((a, b) => a - b);
  return [arr[1], arr[arr.length - 2]];
};

// Test case
const arr1 = [3, 4, 6, 1, 3];
console.log("ans1: ", findTarget(arr1));
