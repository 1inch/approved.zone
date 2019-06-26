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
        '0xF2A543e6800B660687A518d6f99312dE0DdE7776': {
            name: '1inch.exchange',
            logo: 'https://1inch.exchange/assets/logo.svg'
        },
        '0x87aB71093313723c35640afFFE2569bFFC2093C7': {
            name: '1inch.exchange',
            logo: 'https://1inch.exchange/assets/logo.svg'
        },
        '0x73bED544027599275d1F5FAaE02Bd03D22342907': {
            name: '1inch.exchange',
            logo: 'https://1inch.exchange/assets/logo.svg'
        },

        '0x1aB601a2E158FBfd44B314e3a9Dae742332C7F48': {
            name: 'QRToken.io',
            logo: 'https://qrtoken.io/assets/logo.svg'
        },
        '0x2240dab907db71e64d3e0dba4800c83b5c502d4e': {
            name: '0x',
            logo: 'https://1inch.exchange/assets/0x.png'
        },
        '0x6690819Cb98c1211A8e38790d6cD48316Ed518Db': {
            name: 'Bancor Network',
            logo: 'https://1inch.exchange/assets/bancor-network.png'
        },
        '0xCBc6a023eb975a1e2630223a7959988948E664f3': {
            name: 'Bancor Network',
            logo: 'https://1inch.exchange/assets/bancor-network.png'
        },
        '0x587044b74004E3D5eF2D453b7F8d198d9e4cB558': {
            name: 'Bancor Network',
            logo: 'https://1inch.exchange/assets/bancor-network.png'
        },
    };

    constructor() {
    }
}
