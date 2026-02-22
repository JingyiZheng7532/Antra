// Question14: Write a JavaScript function to convert an amount to coins.
//             Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
//             Here 46 is the amount. and 25, 10, 5, 2, 1 are coins.
//             Output: 25, 10, 10, 1

// Solution: Assume that a combination always exists for the given amount.
const convert = function (amount, coins) {
  let res = [];
  coins.sort((a, b) => a - b);
  while (amount > 0) {
    while (coins[coins.length - 1] > amount) {
      coins.pop();
    }
    amount -= coins[coins.length - 1];
    res.push(coins[coins.length - 1]);
  }

  return res;
};

const amount1 = 46;
const coins1 = [25, 10, 5, 2, 1];

const amount2 = 50;
const coins2 = [40, 15, 1];

console.log("ans1: ", convert(amount1, coins1));
console.log("ans2: ", convert(amount2, coins2));
