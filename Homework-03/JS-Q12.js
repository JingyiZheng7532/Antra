// Question12: Write a JavaScript function which says whether a number is perfect.
//             According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is half the sum of all of its positive divisors (including itself).

// Solution
const isPerfect = function (number) {
  let divisorsSum = 0;
  for (let i = 1; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      divisorsSum += i;
      let other = number / i;
      if (other !== i && i !== 1) {
        divisorsSum += other;
      }
    }
  }
  return divisorsSum === number;
};

// Test case;
const number1 = 6;
const number2 = 28;
const number3 = 8128;
const number4 = 100;
console.log("ans1: ", isPerfect(number1));
console.log("ans2: ", isPerfect(number2));
console.log("ans3: ", isPerfect(number3));
console.log("ans4: ", isPerfect(number4));
