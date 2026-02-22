// Question8: Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.
//            Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

// Solution
const isPrime = function (number) {
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

// Test case
const num1 = 111;
const num2 = 37;
const num3 = 1;
console.log("ans1: ", isPrime(num1));
console.log("ans2: ", isPrime(num2));
console.log("ans3: ", isPrime(num3));
