"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];
//the power of anger can rage
//index var 
let indx = 0;

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "somedata",		//here I put some data in the genesis block cuz I verify the block by checking on non-empty data
	timestamp: Date.now(),
});

for (let line of poem) {
	createBlock(line);
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************


function createBlock(data) {

	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
		data: data,
		timestamp: Date.now(),
	}


	block.hash = blockHash(block);

	Blockchain.blocks.push(block);

	return block;
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		
		bl.index+bl.prevHash+bl.data+bl.timestamp

	).digest("hex");
}

function verifyBlock(block) {
	if (block.index == 0) {		//check if genesis block 
		if (block.data.length > 0 && block.hash === "000000") return true;
		else return false;

	} else {
		
		if (block.index < 0) return false;
		
		else {
			if (block.data.length > 0 && block.prevHash && block.hash === blockHash(block)) return true;
			else return false;
		}
	}
}
function verifyChain (blockchain) {

	let blocks = blockchain.blocks;

	for (let block of blocks) {
		if (!verifyBlock(block)) return false;
		
		if (block.index > 0) {
			let prev_block = blocks[block.index-1];
			let prev_block_hash = blockHash(prev_block);

			if (block.prevHash === prev_block_hash) return true;
			else return false;
		} else {
			return true;
		}

	}
		
}