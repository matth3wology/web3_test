const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider')
const MyContract = require('../truffle/build/contracts/Hello.json')

const NEW_GREETING = "Welcome.."

// Account information
const address = '0xc619E848893f48a6375f9eA1A132e3B7Fe99B2b1';
const privateKey = '54ffdca065e6bb790c1e8f61222d5735e8ca278ff54525b6ab4b3c78e59abb3e';

// Create a new provider (this is the ganache dev environment)
const url = 'http://127.0.0.1:9545'

const init1 = async () => {
    // Create a provider
    const provider = new Provider(privateKey, url)

    // Create a new web3 object
    const web3 = new Web3(provider);

    // Get network information
    const networkId = await web3.eth.net.getId();

    // Get contract information
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    )

    console.log(`Old data value: ${await myContract.methods.getItem().call()}`);
    
    // Execute signed transaction
    const receipt = await myContract.methods.setItem(NEW_GREETING).send({ from: address });

    console.log(`Transaction Hash: ${receipt.transactionHash}`);
    console.log(`New value: ${await myContract.methods.getItem().call()}`)
}

init1();
