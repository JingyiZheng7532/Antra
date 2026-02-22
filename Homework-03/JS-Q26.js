// Question26: Write a JavaScript function to find longest substring in a given a string without repeating characters.

// Solution: Sliding window
const longestSubstring = function (string) {
  let left = 0;
  let currSet = new Set();
  let maxLength = 0;
  let finalLeft = 0,
    finalRight = 0;

  for (let right = 0; right < string.length; right++) {
    while (currSet.has(string[right])) {
      currSet.delete(string[left]);
      left++;
    }
    currSet.add(string[right]);
    if (right - left + 1 > maxLength) {
      maxLength = right - left + 1;
      finalLeft = left;
      finalRight = right;
    }
  }

  return string.substring(finalLeft, finalRight + 1);
};

// Test case
const string1 = "abcabcbb";
const string2 = "bbbbb";
const string3 = "pwwkew";

console.log("ans1: ", longestSubstring(string1));
console.log("ans2: ", longestSubstring(string2));
console.log("ans3: ", longestSubstring(string3));
