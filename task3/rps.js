const Game = require("./Game");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function play() {
  const game = new Game.Game();
  game.setMoves();
  game.elementsValidation();
  game.getComputerMove();
  game.showHMAC();
  game.showMenu();
  rl.on("line", (line) => {
    if (Object.keys(game.moves).includes(line)) {
      game.moveHandling(line);
    } else {
      game.showMenu();
    }
  });
}
play();
