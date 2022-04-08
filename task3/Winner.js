class Winner {
  constructor(elements) {
    this.elements = elements;
  }
  getMod(a, b) {
    const c = a % b;
    return c < 0 ? c + b : c;
  }
  getWinner(playerMove, computerMove) {
    const playerChoice = this.elements.indexOf(playerMove);
    const computerChoice = this.elements.indexOf(computerMove);
    if (playerChoice == computerChoice) {
      return "Draw";
    }
    if (
      this.getMod(playerChoice - computerChoice, this.elements.length) <
      this.elements.length / 2
    ) {
      return "Win";
    } else {
      return "Loose";
    }
  }
  drawResult(result) {
    console.log(result === "Draw" ? "Draw" : `You ${result}!`);
  }
}
exports.Winner = Winner;
