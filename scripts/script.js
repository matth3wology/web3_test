const Web3 = require('web3');
const MyContract = require('../truffle/build/contracts/Hello.json')

const NEW_GREETING = "Welcome.."

// Account information
const address = '0xc619E848893f48a6375f9eA1A132e3B7Fe99B2b1';
const privateKey = '54ffdca065e6bb790c1e8f61222d5735e8ca278ff54525b6ab4b3c78e59abb3e';

// Create a new provider (this is the ganache dev environment)
const url = 'http://127.0.0.1:9545'
const provider = new Web3.providers.HttpProvider(url);

const init1 = async () => {
    // Create a new web3 object
    const web3 = new Web3(provider);

    // Get network information
    const networkId = await web3.eth.net.getId();

    // Get contract information
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    )

    const tx = myContract.methods.setItem(NEW_GREETING);
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();

    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    // Make a signed transaction
    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: myContract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId:networkId
        },
        privateKey
    )

    console.log(`Old data value: ${await myContract.methods.getItem().call()}`);

    // Execute signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction Hash: ${receipt.transactionHash}`);
    console.log(`Estimated gas: ${gas}`)
    console.log(`New value: ${await myContract.methods.getItem().call()}`)
}

init1();
