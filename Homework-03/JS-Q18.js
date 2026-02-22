// Question18: Write a function for searching JavaScript arrays with a binary search.
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.

// Solution
const binarySearch = function (arr, target) {
  arr.sort((a, b) => a - b);
  let low = 0;
  let high = arr.length - 1;
  //   console.log(low, high);
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    // console.log("mid: ", mid);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};

// Test case:
const arr1 = [3, 4, 5, 6];
const arr2 = [5, 9, 10, 17, 19];
const arr3 = [2, 2, 4, 5];
const arr4 = [9, 2, 1];
const target = 5;

console.log("res1: ", binarySearch(arr1, target));
console.log("res2: ", binarySearch(arr2, target));
console.log("res3: ", binarySearch(arr3, target));
console.log("res4: ", binarySearch(arr4, target));
