// Question16: Write a JavaScript function to extract unique characters from a string.

// Solution
const unique = function (str) {
  let uniqueSet = new Set();
  for (let char of str) {
    uniqueSet.add(char);
  }
  return [...uniqueSet].join("");
};

// Test case;
const str1 = "hequickbrownfoxjumpsoverthelazydog";
const str2 = "dhhjdjdjjjjj";
console.log("ans1: ", unique(str1));
console.log("ans2: ", unique(str2));
