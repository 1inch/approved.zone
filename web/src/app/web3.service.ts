import {Injectable} from '@angular/core';
import {ethers} from 'ethers';
import {ConfigurationService} from './configuration.service';

declare let require: any;
const Web3 = require('web3');

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    public web3;

    constructor(
        protected configurationService: ConfigurationService
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

        for (let i = 0; i < response.length; i++) {

            if (response[i]['topics'].length === 3) {

                result[response[i]['address'] + response[i]['topics'][2]] = {

                    tokenAddress: response[i]['address'],
                    spenderAddress: ethers.utils.hexStripZeros(response[i]['topics'][2]),
                    allowance: ethers.utils.formatUnits(
                        ethers.utils.bigNumberify(response[i]['data']),
                        18
                    )
                };
            }
        }

        result = Object.values(result).reduce((rv, x) => {

            // console.log('rv', rv);
            // console.log('x', x);

            (rv[x['spenderAddress']] = rv[x['spenderAddress']] || []).push(x);
            return rv;
        }, {});

        console.log('result', result);

        return result;
    }
}
