import Block from './Block';
import forge from "node-forge";
import now from "performance-now";

export default class Blockchain {
  constructor(genesisBlock) {
    this.chain = [];
    this.pool = [];
    this.difficulty = 4;
    this.addBlock(genesisBlock);
  }

  addBlock(newBlock) {
    if (newBlock.index === 0) {
      newBlock.previousHash = '0'.repeat(64);
      console.log("Mining genesis block.");
      newBlock.hash = this.calculateHash(newBlock);
      console.log("Mining genesis block complete.");
    }

    this.chain.push(newBlock);
  }

  mineBlock(entries) {
    let block = new Block();
    entries.forEach((entry) => {
      block.addEntry(entry);
    });
    block.index = this.chain.length;
    block.previousHash = this.getLastBlock().hash;

    console.log("Block #" + block.index + ": Mining.");
    const t0 = now();
    block.hash = this.calculateHash(block);
    const t1 = now();
    console.log("Block #" + block.index + ": Mined. Took " + Math.round((t1 - t0) / 10) / 100 + "s.");

    this.addBlock(block);
  }

  calculateHash(block) {
    const target = '0'.repeat(this.difficulty);
    let md = forge.md.sha256.create();

    let generated = '';

    while (!generated.startsWith(target)) {
      block.nonce++;
      md.update(block.key);
      generated = md.digest().toHex();
    }

    return generated;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  exploreBlocks() {
    this.chain.forEach(block =>  {
      console.log(`${block.index} || ${block.previousHash} || ${block.hash} || ${block.nonce} || ${JSON.stringify(block.entries)}`);
    });
  }

  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
      if (prevBlock.hash !== currentBlock.previousHash) return false;
    }
    return true;
  }
}