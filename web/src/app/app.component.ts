import {EthersService} from './ethers.service';
import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {ThemeService} from './theme.service';

declare let require: any;
declare let web3: any;

const ethers = require('ethers');

interface MyWindow extends Window {
    ethereum: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        ethersService: EthersService,
        configurationService: ConfigurationService,
        themeService: ThemeService
    ) {

    }

    async ngOnInit() {

    }

}
