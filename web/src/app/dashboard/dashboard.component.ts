import {Component, OnInit} from '@angular/core';
import {EthersService} from '../ethers.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    walletAddress: any;
    approves: [];
    loading = true;

    constructor(
        protected ethersService: EthersService
    ) {
    }

    async ngOnInit() {

        this.walletAddress = await this.ethersService.provider.getSigner().getAddress();

        this.loading = false;
    }

    async walletAddressChanged($event) {

        console.log($event);
    }

}
