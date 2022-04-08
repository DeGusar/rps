const crypto = require("crypto");
const CryptoJS = require("crypto-js");
class Crypto {
  constructor() {
    this.key = "";
    this.hmac = "";
  }
  generateKey() {
    this.key = crypto.randomBytes(256 / 8).toString("hex");
  }
  generateHMAC(computerMove) {
    this.generateKey();
    this.hmac = crypto
      .createHmac("sha256", this.key)
      .update(`${computerMove}`)
      .digest("hex");
  }
}
const key = new Crypto();
exports.key = key;
