import {Component, OnInit} from '@angular/core';
import {EthersService} from '../ethers.service';
import {Web3Service} from '../web3.service';
import {ApprovedService} from './approved.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    walletAddress: any;
    approves: any;
    loading = true;

    constructor(
        protected ethersService: EthersService,
        protected web3Service: Web3Service
    ) {
    }

    async ngOnInit() {

        this.walletAddress = await this.ethersService.provider.getSigner().getAddress();
        this.approves = await this.web3Service.getApproves(this.walletAddress);

        this.loading = false;
    }

    async walletAddressChanged($event) {

        console.log($event);
    }

}
