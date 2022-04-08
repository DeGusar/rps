const { stdout } = process;
const Crypto = require("./Crypto");
const Winner = require("./Winner");
const random = require("simple-random-number-generator");
const Help = require("./Help");

class Game {
  constructor() {
    this.elements = process.argv.splice(2);
    this.moves = "";
    this.computerMove = "";
  }
  setMoves() {
    this.moves = this.elements.reduce(
      (acum, elem, i) => ({ ...acum, [i + 1]: elem }),
      {
        0: "exit",
        "?": "help",
      }
    );
  }
  elementsValidation() {
    if (this.elements.length < 3) {
      console.log(
        "\nNot enough elements for game.Please enter minimum 3 elements\n"
      );
      process.exit();
    }
    if (this.elements.length % 2 === 0) {
      console.log(
        "\nQuantity of the elements should be odd.Try one more time please\n"
      );
      process.exit();
    }
    if (this.elements.length > [...new Set(this.elements)].length) {
      console.log("\nElements shouldn't repeat.Please enter unique elements\n");
      process.exit();
    }
  }
  showMenu() {
    Object.entries(this.moves).forEach(([key, value]) => {
      key > 0 && console.log(`${key} - ${value}`);
    });
    console.log("0 - exit");
    console.log("? - help");
    stdout.write("Enter your move: ");
  }
  moveHandling(move) {
    if (move === "0") {
      console.log("Good luck!");
      process.exit();
    } else if (move === "?") {
      const drawHelp = new Help.Help(this.elements);
      drawHelp.drawTable();
      this.showMenu();
    } else {
      const winner = new Winner.Winner(this.elements);
      console.log(`Your move: ${this.elements[move - 1]}`);
      winner.drawResult(
        winner.getWinner(this.elements[move - 1], this.computerMove)
      );
      console.log(`Computer move: ${this.computerMove}`);
      console.log(`HMAC key: ${Crypto.key.key}`);
      process.exit();
    }
  }
  showHMAC(computerMove) {
    Crypto.key.generateKey();
    Crypto.key.generateHMAC(computerMove);
    console.log(`HMAC: ${Crypto.key.hmac}`);
  }
  getComputerMove() {
    let params = {
      min: 0,
      max: this.elements.length - 1,
      integer: true,
    };
    this.computerMove = this.elements[random(params)];
  }
}

exports.Game = Game;
