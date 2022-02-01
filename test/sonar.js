const chalk = require("chalk");

const youShouldNeverUseVar = "This is my very long line that eslint should check as an error............................................";
console.log(chalk.green(youShouldNeverUseVar));

function myFunction(used, nonUsed) {
  if (used) {
    console.log(used);
  } else {
    console.log(nonUsed);
  }
}
myFunction();

module.exports = { myFunction };