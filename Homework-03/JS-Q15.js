// Question15: Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result.

// Solution1:
const calPow1 = function (b, n) {
  return Math.pow(b, n);
};

// Solution2;
const calPow2 = function (b, n) {
  let ans = 1;
  for (let i = 0; i < n; i++) {
    ans *= b;
  }
  return ans;
};

const b = 5,
  n = 4;
console.log("solution1: ", calPow1(b, n));
console.log("solution2: ", calPow2(b, n));
