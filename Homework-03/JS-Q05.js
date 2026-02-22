// Question5: Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case

// Solution:
const upperFirst = function (string) {
  let strArr = string.split(" ");
  let newArr = [];
  for (let str of strArr) {
    let newStr = str[0].toUpperCase() + str.substring(1);
    newArr.push(newStr);
  }
  return newArr.join(" ");
};

// Test case
const string1 = "the quick brown fox";
console.log("string1: ", upperFirst(string1));
