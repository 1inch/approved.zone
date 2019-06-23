import {Injectable} from '@angular/core';
import {ethers} from 'ethers';
import {ConfigurationService} from './configuration.service';
import {ApprovedService} from './dashboard/approved.service';

declare let require: any;
const Web3 = require('web3');

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    public web3;

    constructor(
        protected configurationService: ConfigurationService,
        protected approvedService: ApprovedService
    ) {

        Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + configurationService.INFURA_KEY));
    }

    async getApproves(walletAddress: string) {

        let result = [];

        const response = await this.web3.eth.getPastLogs({
            'address': [],
            'topics': [
                this.web3.utils.keccak256('Approval(address,address,uint256)'),
                ethers.utils.hexZeroPad(walletAddress, 32)
            ],
            'fromBlock': 'earliest',
            'toBlock': 'latest'
        });

        const tokens = [];
        const spenders = [];

        for (let i = 0; i < response.length; i++) {

            try {

                if (response[i]['topics'].length === 3) {

                    const spenderAddress = ethers.utils.getAddress(ethers.utils.hexStripZeros(response[i]['topics'][2]));
                    const tokenAddress = ethers.utils.getAddress(response[i]['address']);

                    try {

                        spenders.push(
                            ethers.utils.getAddress(spenderAddress)
                        );

                        tokens.push(
                            ethers.utils.getAddress(response[i]['address'])
                        );
                    } catch (e) {

                        // console.error(e);
                    }

                    result[tokenAddress + spenderAddress] = {

                        tokenAddress: tokenAddress,
                        spenderAddress: spenderAddress,
                        allowance: ethers.utils.formatUnits(
                            ethers.utils.bigNumberify(response[i]['data']),
                            18
                        )
                    };
                }
            } catch (e) {

            }
        }

        console.log('result', result);

        const {results, decimals, symbols} = await this.approvedService.allowances(
            walletAddress,
            tokens,
            spenders
        );

        results.forEach((allowance, i) => {

            // console.log(ethers.utils.parseBytes32String(value));
            const tokenAddress = tokens[i];
            const spenderAddress = spenders[i];
            const index = tokenAddress + spenderAddress;

            result[index]['allowance'] = allowance;

            try {

                result[index]['formatedAllowance'] = Number(ethers.utils.formatUnits(allowance, decimals[i].toNumber()));
            } catch (e) {

                result[index]['formatedAllowance'] = '∞';
            }

            result[index]['decimals'] = decimals[i].toNumber();
            result[index]['symbol'] = ethers.utils.parseBytes32String(symbols[i]);
        });

        console.log(result);

        result = Object.values(result).reduce((rv, x) => {

            (rv[x['spenderAddress']] = rv[x['spenderAddress']] || []).push(x);
            return rv;
        }, {});

        return result;
    }
}
