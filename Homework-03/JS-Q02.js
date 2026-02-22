// Qestion2: Write a JavaScript function that checks whether a passed string is palindrome or not?
//          A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.

// Solution: two pointers
const isPalindrome = function (str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

// Test case
const str1 = "abccba";
const str2 = "mnbvbnm";
const str3 = "asdfgs";
const str4 = "";

const res1 = isPalindrome(str1);
const res2 = isPalindrome(str2);
const res3 = isPalindrome(str3);
const res4 = isPalindrome(str4);

console.log("res1: ", res1);
console.log("res2: ", res2);
console.log("res3: ", res3);
console.log("res4: ", res4);
