import {Injectable} from '@angular/core';
import {EthersService} from '../ethers.service';
import {ethers} from 'ethers';
import {ConfigurationService} from '../configuration.service';

const ApprovedABI = [
    {
        'constant': true,
        'inputs': [
            {
                'name': 'source',
                'type': 'address'
            },
            {
                'name': 'tokens',
                'type': 'address[]'
            },
            {
                'name': 'spenders',
                'type': 'address[]'
            }
        ],
        'name': 'allowances',
        'outputs': [
            {
                'name': 'results',
                'type': 'uint256[]'
            },
            {
                'name': 'decimals',
                'type': 'uint256[]'
            },
            {
                'name': 'symbols',
                'type': 'bytes32[]'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    }
];

const ERC20ABI = [
    {
        'constant': false,
        'inputs': [
            {
                'name': '_spender',
                'type': 'address'
            },
            {
                'name': '_value',
                'type': 'uint256'
            }
        ],
        'name': 'approve',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    }
];

@Injectable({
    providedIn: 'root'
})
export class ApprovedService {

    signer;
    contract;

    constructor(
        protected ethersService: EthersService,
        protected configurationService: ConfigurationService
    ) {

        this.signer = this.ethersService.provider.getSigner && this.ethersService.provider.getSigner().getAddress ?
            this.ethersService.provider.getSigner() : this.ethersService.provider;

        this.contract = new ethers.Contract(
            this.configurationService.APP_SMART_CONTRACT_ADDRESS,
            ApprovedABI,
            this.signer
        );
    }

    async allowances(
        source: string,
        tokens: string[],
        spenders: string[]
    ) {

        return this.contract.allowances(
            ethers.utils.getAddress(source),
            tokens,
            spenders
        );
    }

    async decline(
        tokenAddress: string,
        spenderAddress: string
    ) {

        try {

            const token = new ethers.Contract(
                tokenAddress,
                ERC20ABI,
                this.signer
            );

            await token.approve(spenderAddress, ethers.utils.bigNumberify(0));
        } catch (e) {

            alert(e);
        }
    }
}
