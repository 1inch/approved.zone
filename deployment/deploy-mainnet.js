const etherlime = require('etherlime');
const Approved = require('../build/Approved.json');

const defaultConfigs = {
    gasPrice: 10000000000,
    etherscanApiKey: 'XU743YAPQPIBGA4RAFJ8FQC1IUBK4KUR78'
    // gasLimit: 7000000,
};

const deploy = async (network, secret) => {

    const deployer = new etherlime.InfuraPrivateKeyDeployer(process.env.PRIVATE_KEY, 'mainnet', process.env.INFURA_KEY, defaultConfigs);
    const contract = await deployer.deployAndVerify(
        Approved,
        false
    );
};

module.exports = {
    deploy
};
