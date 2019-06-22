import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from './navigation.service';
import {Location} from '@angular/common';
import {faArrowLeft, faCopy, faVideo} from '@fortawesome/free-solid-svg-icons';
import {EthersService} from '../ethers.service';
import {ThemeService} from '../theme.service';
import {ConfigurationService} from '../configuration.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    backIcon = faArrowLeft;
    publishIcon = faVideo;
    loading = true;
    ensDomain;
    contractAddress;
    walletAddress;
    copyIcon = faCopy;
    referralUrl = '';

    constructor(
        private location: Location,
        public navigationService: NavigationService,
        private route: ActivatedRoute,
        private router: Router,
        private ethersService: EthersService,
        public themeService: ThemeService,
        public configurationService: ConfigurationService
    ) {
    }

    async ngOnInit() {

        try {

            this.loading = false;
            this.walletAddress = await this.ethersService.provider.getSigner().getAddress();

            this.ensDomain = this.configurationService.APP_ENS;
            this.contractAddress = this.configurationService.APP_SMART_CONTRACT_ADDRESS;

        } catch (e) {

            console.error(e);
        }
    }

    goBack() {
        this.navigationService.showBackButton = false;
        this.router.navigate(['../']);
    }
}
