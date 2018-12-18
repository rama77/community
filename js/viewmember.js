const web3 = require("web3");
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

//userAccount = "";

 function displayMember(id) {
    return  communityFactory.methods.members(id).call()
    .then(function(member) {
       console.log(member);
      });
  }

displayMember(0);