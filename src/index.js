import Blockchain from "./Blockchain";
import Block from "./Block";

let fusecoin = new Blockchain();
fusecoin.addBlock(new Block(1, "23/03/2018", { data: "Test Block 1" }));
fusecoin.addBlock(new Block(2, "23/03/2018", { data: "Test Block 2" }));
console.log(fusecoin.isChainValid());

fusecoin.chain[1].data = { amount: 50 };
console.log(fusecoin.isChainValid());