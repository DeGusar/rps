const Winner = require("./Winner");
const { Table } = require("console-table-printer");

class Help {
  constructor(array) {
    this.elements = array;
    this.winner = new Winner.Winner(array);
  }
  drawTable() {
    const p = new Table();
    this.elements.forEach((elem, a) => {
      p.addRow({
        ...{ "": elem },
        ...this.elements.reduce(
          (acc, elem, i) => ({
            ...acc,
            [elem]: this.winner.getWinner(this.elements[a], elem),
          }),
          {}
        ),
      });
    });
    p.printTable();
  }
}
exports.Help = Help;
