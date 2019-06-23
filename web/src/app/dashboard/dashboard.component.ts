import {Component, OnInit} from '@angular/core';
import {EthersService} from '../ethers.service';
import {Web3Service} from '../web3.service';
import {ApprovedService} from './approved.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ContractsService} from './contracts.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    walletAddress = '';
    ownWalletAddress = '';
    approves: any;
    loading = true;
    walletAddressControl = new FormControl('');
    hasWeb3Provider = false;
    processTokenTransaction = {};
    removedTokenTransaction = {};
    done = false;
    transactionHash = '';
    error = false;

    constructor(
        protected ethersService: EthersService,
        protected web3Service: Web3Service,
        protected approvedService: ApprovedService,
        protected contractsService: ContractsService
    ) {
    }

    async ngOnInit() {

        if (
            this.ethersService.provider.getSigner &&
            this.ethersService.provider.getSigner().getAddress
        ) {

            this.hasWeb3Provider = true;
        }

        this.walletAddressControl.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
        )
            .subscribe(async (value) => {

                this.walletAddress = value;

                if (value !== this.ownWalletAddress) {

                    this.hasWeb3Provider = false;
                } else {

                    this.hasWeb3Provider = true;
                }

                localStorage.setItem('walletAddress', value);

                await this.loadApproves();
            });

        try {

            this.ownWalletAddress = await this.ethersService.provider.getSigner().getAddress();
            
            this.walletAddressControl.setValue(
                await this.ethersService.provider.getSigner().getAddress()
            );

        } catch (e) {

            if (localStorage.getItem('walletAddress')) {

                this.walletAddressControl.setValue(
                    localStorage.getItem('walletAddress')
                );
            }
        }

        this.loading = false;
    }

    async loadApproves() {

        this.done = false;
        this.error = false;

        this.loading = true;
        this.approves = await this.web3Service.getApproves(this.walletAddress);
        this.loading = false;
    }

    async walletAddressChanged($event) {

        await this.loadApproves();
    }

    async decline(approval) {

        this.done = false;
        this.error = false;

        const itemIndex = approval.tokenAddress + approval.spenderAddress;

        this.processTokenTransaction[itemIndex] = true;

        try {

            const tx = await this.approvedService.decline(
                approval.tokenAddress,
                approval.spenderAddress
            );

            this.done = true;
            this.transactionHash = tx.hash;

            this.removedTokenTransaction[itemIndex] = true;
        } catch (e) {

            this.error = true;
        }

        this.processTokenTransaction[itemIndex] = false;
    }

    async declineAll() {

        this.approves.forEach((item) => {

            item.approvals.forEach((approval) => {

                this.decline(approval);
            });
        });
    }

    async declineforContract(contractAddress) {

        this.approves.forEach((item) => {

            if (item.address.toLowerCase() === contractAddress.toLowerCase()) {

                item.approvals.forEach((approval) => {

                    this.decline(approval);
                });
            }
        });
    }
}
