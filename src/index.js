import Blockchain from "./Blockchain";
import Block from "./Block";

// create genesis block
let genesisBlock = new Block();
let blockchain = new Blockchain(genesisBlock);


let testData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

testData.forEach((data, index) => {
  blockchain.pool = testData.slice(index);
  blockchain.mineBlock(blockchain.pool);
});

blockchain.exploreBlocks();