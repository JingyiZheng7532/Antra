// Question28: Write a JavaScript program to pass a 'JavaScript function' as parameter.

// Solution

const sayHello = function (name) {
  return "Hello, " + name + "!";
};

const execute = function (fn, value) {
  const result = fn(value);
  console.log("The result is: ", result);
};

execute(sayHello, "Ashley");
