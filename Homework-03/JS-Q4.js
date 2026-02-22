// Question4: Write a JavaScript function that returns a passed string with letters in alphabetical order.

// Solution
const alphabeticalOrder = function (str) {
  let arr = [];
  for (let char of str) {
    let code = char.charCodeAt(0);
    arr.push(code);
  }

  arr.sort((a, b) => a - b);
  let res = arr.map((num) => String.fromCharCode(num)).join("");
  return res;
};

// Test case
const str1 = "webmaster";
console.log("str1: ", alphabeticalOrder(str1));
