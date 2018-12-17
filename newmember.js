const web3 = require("web3");
var Tx = require('ethereumjs-tx');

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
var communityFactoryAddress = "0x7d711958665f15095995953ec8c10fadec3cc714";

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
//var privateKey = "15cfe14a75459a4822b656554ac3ed5f45028f2771ccb71310a54b51ec17735e";
var privateKey = new Buffer('15cfe14a75459a4822b656554ac3ed5f45028f2771ccb71310a54b51ec17735e', 'hex')
var pass = "ramirogalvan";

///////
async function createMember(param){
    try{
    const serializeTx = async (contractInstance, publicKey, privateKey, funcData) => {
        //let privateKeyBuff = new Buffer.from(privateKey, 'hex');
        let privateKeyBuff = privateKey;

        const gasLimit = 272906;

        const nonceNumber = await web3js.eth.getTransactionCount(publicKey);
        const nonce = web3js.utils.toHex(nonceNumber);
        const gasPrice = web3js.utils.toHex(web3js.eth.gasPrice);
        const gas = web3js.utils.toHex(172906);
        const gasLimitHex = web3js.utils.toHex(gasLimit);
        const rawTx = {
            'nonce': nonce,
            'gasPrice': gasPrice,
            'gasLimit': gasLimitHex,
            'from': publicKey,
            'to': contractInstance.address,
            'data': funcData,
            "gas": gas
        };

        let tx = new Tx(rawTx);
        tx.sign(privateKeyBuff);

        return '0x' + tx.serialize().toString('hex');
    };

    let funcData = communityFactory.methods.createRandomMember(param).encodeABI();

    const serializedTx = await serializeTx(
        communityFactory,
        publicKey,
        privateKey,
        funcData,
    );

    let result = await web3js.eth.sendSignedTransaction(serializedTx);
    console.log(result);
    } catch(e){
        console.log("ErrorrrrR: " + e);
    }
}
createMember("Juan");
/////////////










/*











function createRandomMember(name) {
    // Enviar el texto hacia nuestro contrato:
    return communityFactory.methods.createRandomMember(name)
    .sendSignedTransaction(,data,{ from: userAccount })
    .on("receipt", function(receipt) {
        console.log(receipt);
    })
    .on("error", function(error) {
      // Se avisa al usuario de que su transacción no ha sido completada con éxito
      console.log(error);
    });
  }

  createRandomMember("Juan");

  */