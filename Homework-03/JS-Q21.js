// Question21: Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array.
//             Sample array: [1, 2, 3] and subset length is 2
//             Expected output: [[2, 1], [3, 1], [3, 2]]

// Solution: backtracking
// Assume length <= arr.length
const combination = function (arr, length) {
  let res = [];

  const backtracking = function (index, currArr) {
    if (currArr.length === length) {
      res.push([...currArr]);
      return;
    }

    for (let i = index; i < arr.length; i++) {
      currArr.push(arr[i]);
      backtracking(i + 1, currArr);
      currArr.pop();
    }
  };

  backtracking(0, []);
  return res;
};

// Test case
const arr1 = [1, 2, 3],
  length1 = 2;

const arr2 = [],
  length2 = 3;

const arr3 = [2, 3, 5, 7],
  length3 = 3;
console.log("ans1: ", combination(arr1, length1));
console.log("ans2: ", combination(arr2, length2));
console.log("ans3: ", combination(arr3, length3));
