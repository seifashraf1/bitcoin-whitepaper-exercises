"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

//index var 
let indx = 0;

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain

for (let line of poem) {
	let block = createBlock(line)

	Blockchain.blocks.push({
		index: block.index,
		hash: block.hash,
		data: block.data,
		timestamp: block.timestamp,
		prevHash: block.prevHash
	});
}

// console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************


function createBlock(text) {
	indx++;

	let block = {
		index: indx,
		prevHash: Blockchain.blocks[indx-1].hash,
		data: text,
		timestamp: Date.now(),
	}

	block.hash = blockHash(block)

	return block
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		bl.index,
		bl.prevHash,
		bl.data,
		bl.timestamp

	).digest("hex");
}