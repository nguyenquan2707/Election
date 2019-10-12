initWeb3 =  function() {
    if(typeof web3 != 'undefined') {
        App.web3Provider = web3.currentProvider; 
        web3 = new Web(web3.currentProvider);
    } else {
        App.web3Provider = new Web3.providers.currentProvider("httP://127.0.0.1:7545");
        web3 = new Web(App.web3Provider); // web3 from browser blockchain
    }
    return App.initContract();
}