// Question3: Write a JavaScript function that generates all combinations of a string.

// Solution: two pointers
const getAllCombination = function (str) {
  let resultSet = new Set();
  for (let left = 0; left < str.length; left++) {
    for (let right = left + 1; right < str.length + 1; right++) {
      resultSet.add(str.substring(left, right));
    }
  }
  return [...resultSet];
};

// Test case
const str1 = "dog";
const str2 = "oog";
const str3 = "ooo";
const str4 = "";

console.log("str1", getAllCombination(str1));
console.log("str2", getAllCombination(str2));
console.log("str3", getAllCombination(str3));
console.log("str4", getAllCombination(str4));
