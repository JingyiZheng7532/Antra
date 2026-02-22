// Question1: Write a JavaScript function that reverse a number.

//Solution1:
const reverse1 = function (number) {
  let arr = number.toString().split("");
  arr.reverse();
  return Number(arr.join(""));
};

//Solution2:

const reverse2 = function (number) {
  let curr = number;
  let str = "";
  while (curr > 0) {
    str += (curr % 10).toString();
    curr = Math.floor(curr / 10);
  }
  return Number(str);
};

// Test case
const x = 32243;
const res1 = reverse1(x);
const res2 = reverse2(x);
console.log(res1);
console.log(res2);
