// Question6: Write a JavaScript function that accepts a string as a parameter and find the longest word within the string

// Solution
const findLongest = function (string) {
  let strArr = string.split(" ");
  let maxLength = 0;
  let longestStr = "";
  for (let str of strArr) {
    if (str.length > maxLength) {
      longestStr = str;
      maxLength = str.length;
    }
  }
  return longestStr;
};

// Test case
const string1 = "Web Development Tutorial";
console.log("string1: ", findLongest(string1));
