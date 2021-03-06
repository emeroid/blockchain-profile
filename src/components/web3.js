import Web3 from 'web3';
window.ethereum.enable();

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
}else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/6c57aed3506d42eba35b78d6da5ed823'
    );
    web3 = new Web3(provider);
}

export default web3;