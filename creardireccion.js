var Web3 = require("web3");
//var web3 = new Web3();
var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

//generate private key  
privateKey = web3.eth.accounts.create().privateKey.substr(2);
pin = 2;
console.log("privateKey:" + privateKey);
//generates pubKey from privateKey, encrypts it and store in keystore folder.
web3.personal.importRawKey(privateKey, pin)
    .then((result) => {

    //store pub address.
    publicAddr = web3.utils.toChecksumAddress(result)
    console.log("publicAddr: " + publicAddr)
})