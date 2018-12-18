const web3 = require("web3");
const EthereumTx = require('ethereumjs-tx')


web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io:443"));
var communityFactoryABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dna",
				"type": "uint256"
			}
		],
		"name": "NewMember",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "memberAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "members",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "dna",
				"type": "uint256"
			},
			{
				"name": "level",
				"type": "uint32"
			},
			{
				"name": "readyTime",
				"type": "uint32"
			},
			{
				"name": "convertCount",
				"type": "uint16"
			},
			{
				"name": "parentMember",
				"type": "uint16"
			},
			{
				"name": "converted",
				"type": "bool"
			},
			{
				"name": "location",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var communityFactoryAddress = "0xa7a11b32251dcf0ec61ae8db13d622b9532068e1";

//creating contract object
var communityFactory = new web3js.eth.Contract(communityFactoryABI,communityFactoryAddress);

/*
//mainet
var userAccount = "0x2C20a404C02d4E7D92731241b504FDcDa7a7512B";
var privateKey = "fa53a28154698820b373607c95a096f4322294607c572fcc1a63fcb60c53bf24";
var pass = "ramirogalvan";
*/

//rinkeby
var publicKey = "0x371066e8a3347C3448903ab3dD18b94d192c4D42";
var privateKey = "15cfe14a75459a4822b656554ac3ed5f45028f2771ccb71310a54b51ec17735e";
//var privateKey = new Buffer('15cfe14a75459a4822b656554ac3ed5f45028f2771ccb71310a54b51ec17735e', 'hex')
var pass = "ramirogalvan";

let deployerNonce = 0;
const deployPrivateKey = Buffer.from(privateKey, 'hex');
const deployPublicKey = Buffer.from(publicKey,'hex');
const defaultTxParams = {
	gasPrice: web3js.utils.toHex(web3js.utils.toWei('1', 'gwei')),
	gasLimit: web3js.utils.toHex(8000000),
	value: '0x',
	chainId: 4
  };

  console.log(web3js.utils.toWei('1', 'gwei'));
  console.log(defaultTxParams);

  function signTransaction(txParams, signerPrivKey) {
	const ethereumTx = new EthereumTx(txParams);
	ethereumTx.sign(signerPrivKey);
	return `0x${ethereumTx.serialize().toString('hex')}`;
  }

  async function createRandomMember(name, from, signerPrivKey) {
	  try{
	const txParams = {
	  ...defaultTxParams,
	  nonce: web3js.utils.toHex(deployerNonce),
	  to: communityFactoryAddress,
	  data: communityFactory.methods.createRandomMember(name).encodeABI(),
	};
	deployerNonce += 1;
	const signedTransaction = signTransaction(txParams, signerPrivKey);
	await web3js.eth.sendSignedTransaction(signedTransaction, { from });
} catch(e){
	console.log("ACA Error: " +e);
}
  }

  createRandomMember("juan",deployPublicKey,deployPrivateKey);