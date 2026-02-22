// Question10: Write a JavaScript function which returns the n rows by n columns identity matrix.

// Solution:
const identityMatrix = function (n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
};

// Test case
const num1 = 4;
console.log("ans1: ", identityMatrix(num1));
