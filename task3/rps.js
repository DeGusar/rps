const readline = require("readline");
const { stdout } = process;
const Crypto = require("./Crypto");
const Winner = require("./Winner");
const random = require("simple-random-number-generator");
const Help = require("./Help");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const [, , ...elements] = process.argv;
elementsValidation();
const moves = elements.reduce((acum, elem, i) => ({ ...acum, [i + 1]: elem }), {
  0: "exit",
  "?": "help",
});
const computerMove = getComputerMove();
showHMAC();
showMenu();
rl.on("line", (line) => {
  if (Object.keys(moves).includes(line)) {
    moveHandling(line);
  } else {
    showMenu();
  }
});

function elementsValidation() {
  if (elements.length < 3) {
    console.log(
      "\nNot enough elements for game.Please enter minimum 3 elements\n"
    );
    process.exit();
  }
  if (elements.length % 2 === 0) {
    console.log(
      "\nQuantity of the elements should be odd.Try one more time please\n"
    );
    process.exit();
  }
  if (elements.length > [...new Set(elements)].length) {
    console.log("\nElements shouldn't repeat.Please enter unique elements\n");
    process.exit();
  }
}

function showMenu() {
  Object.entries(moves).forEach(([key, value]) => {
    key > 0 && console.log(`${key} - ${value}`);
  });
  console.log("0 - exit");
  console.log("? - help");
  stdout.write("Enter your move: ");
}
function moveHandling(move) {
  if (move === "0") {
    console.log("Good luck!");
    process.exit();
  } else if (move === "?") {
    const drawHelp = new Help.Help(elements);
    drawHelp.drawTable();
    showMenu();
  } else {
    const winner = new Winner.Winner(elements);
    console.log(`Your move: ${elements[move - 1]}`);
    console.log(winner.getWinner(elements[move - 1], computerMove));
    console.log(`Computer move: ${computerMove}`);
    console.log(`HMAC key: ${Crypto.key.key}`);
    process.exit();
  }
}

function showHMAC(computerMove) {
  Crypto.key.generateKey();
  Crypto.key.generateHMAC(computerMove);
  console.log(`HMAC: ${Crypto.key.hmac}`);
}

function getComputerMove() {
  let params = {
    min: 0,
    max: elements.length - 1,
    integer: true,
  };
  return elements[random(params)];
}
