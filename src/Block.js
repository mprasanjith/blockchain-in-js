import forge from 'node-forge';

export default class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        let md = forge.md.sha256.create();
        md.update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString());
        return md.digest().toHex();
    }
}