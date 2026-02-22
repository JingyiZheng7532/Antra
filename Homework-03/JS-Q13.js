// Question13: Write a JavaScript function to compute the factors of a positive integer.

// Solution:
const getFactors = function (number) {
  let res = [];
  if (number <= 0) {
    return res;
  }

  for (let i = 1; i < Math.sqrt(number); i++) {
    if (number % i === 0) {
      res.push(i);
      let other = number / i;
      if (i !== other) {
        res.push(other);
      }
    }
  }
  return res;
};

// Test case;
const number1 = 6;
const number2 = 28;
const number3 = 8128;
const number4 = 100;
console.log("ans1: ", getFactors(number1));
console.log("ans2: ", getFactors(number2));
console.log("ans3: ", getFactors(number3));
console.log("ans4: ", getFactors(number4));
