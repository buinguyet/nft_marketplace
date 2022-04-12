const {privateKey}= require('./secrets.json') 
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks : {
    ropsten: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      // See its defaults
    }
}

};
