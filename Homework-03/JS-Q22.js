// Question22: Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string.
//             Sample arguments: 'microsoft.com', 'o'
//             Expected output: 3

// Solution：
const count = function (string, char) {
  let ans = 0;
  for (let c of string) {
    if (c === char) {
      ans++;
    }
  }
  return ans;
};

// Test case
const str1 = "microsoft.com",
  char1 = "o";
const str2 = "",
  char2 = "p";
const str3 = "sddfffff",
  char3 = "";

console.log("ans1: ", count(str1, char1));
console.log("ans2: ", count(str2, char2));
console.log("ans3: ", count(str3, char3));
