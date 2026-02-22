// Question17: Write a JavaScript function to get the number of occurrences of each letter in specified string.

// Solution:
const occurrence = function (str) {
  let charMap = new Map();
  for (let char of str) {
    if (!charMap.has(char)) {
      charMap.set(char, 0);
    }
    charMap.set(char, charMap.get(char) + 1);
  }
  return charMap;
};

// Test case
const str1 = "sjuuuueed";
console.log("ans1: ", occurrence(str1));
