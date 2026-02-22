// Question25:  Write a JavaScript function that accept a list of country names as input and returns the longest country name as output.
//              Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
//              Expected output: "United States of America"

// Solution:
const findLongest = function (arr) {
  let longestStr = "";
  let maxLength = 0;

  for (let name of arr) {
    if (name.length > maxLength) {
      longestStr = name;
    }
  }

  return longestStr;
};

// Test case
const arr1 = ["Australia", "Germany", "United States of America"];
console.log("ans1: ", findLongest(arr1));
