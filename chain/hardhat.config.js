require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "Polygon",
  networks: {
    hardhat: {
    },
    Polygon: {
      url: "https://apis.ankr.com/8976a0980f644a01ae3bdeb7b1850d4e/4f5329aedefb242bd9d597664f73330e/polygon/full/test",
      accounts: ["0xa10f6af85c7540e4ac1be6ca74b06b9c56c69eb49b88506dd8b425ae92fe22db","0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d","0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"],
      

    },
    Avalanche: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["0xa10f6af85c7540e4ac1be6ca74b06b9c56c69eb49b88506dd8b425ae92fe22db","0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d","0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"],
      gasPrice: 225000000000,
    },
    Kardiachain: {
      url: "https://dev.kardiachain.io/",
      accounts: ["0xa10f6af85c7540e4ac1be6ca74b06b9c56c69eb49b88506dd8b425ae92fe22db","0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d","0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"],

    }
  },
  solidity: {
    version: "0.8.4", // Recommended version >= 0.5.0
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
