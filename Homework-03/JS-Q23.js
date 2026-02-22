// Question23: Write a JavaScript function to find the first not repeated character.
//             Sample arguments: 'abacddbec'
//             Expected output: 'e'

const notRepeat = function (string) {
  let countMap = new Map();
  for (let char of string) {
    if (!countMap.has(char)) {
      countMap.set(char, 0);
    }
    countMap.set(char, countMap.get(char) + 1);
  }

  for (let [key, value] of countMap) {
    if (value === 1) {
      return key;
    }
  }

  return "";
};

// Test case
const string1 = "abacddbec";
const string2 = "aabbssnndd";

console.log("ans1: ", notRepeat(string1));
console.log("ans2: ", notRepeat(string2));
