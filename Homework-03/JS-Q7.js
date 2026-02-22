// Question7: Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.
//            Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here.

// Solution:
const countVowels = function (string) {
  let count = 0;
  let vowels = new Set(["a", "e", "i", "o", "u"]);
  for (let char of string) {
    if (vowels.has(char)) {
      count++;
    }
  }
  return count;
};

// Test case
const string1 = "The quick brown fox";
console.log("answer1: ", countVowels(string1));
