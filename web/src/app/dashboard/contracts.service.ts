import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContractsService {

    public contracts = {
        '0x818E6FECD516Ecc3849DAf6845e3EC868087B755': {
            name: 'Kyber Network',
            logo: 'https://1inch.exchange/assets/kyber-network.png'
        },
        '0xeef9529B1F91B450E0B0362d3bed623c7f1a8980': {
            name: '1inch.exchange',
            logo: 'https://1inch.exchange/assets/logo.svg'
        },
        '0x2240dab907db71e64d3e0dba4800c83b5c502d4e': {
            name: '0x',
            logo: 'https://1inch.exchange/assets/0x.png'
        },
        '0x6690819Cb98c1211A8e38790d6cD48316Ed518Db': {
            name: 'Bancor Network',
            logo: 'https://1inch.exchange/assets/bancor-network.png'
        },
    };

    constructor() {
    }
}
