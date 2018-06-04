export default class Block {
  constructor() {
    this.index = 0;
    this.previousHash = '';
    this.entries = [];
    this.nonce = 0;
    this.hash = '';
  }

  get key() {
    return JSON.stringify(this.entries) + this.index + this.previousHash + this.nonce;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }
}