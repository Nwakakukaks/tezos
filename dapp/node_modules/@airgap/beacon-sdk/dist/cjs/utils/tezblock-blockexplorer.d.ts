import { Network, NetworkType } from '..';
import { BlockExplorer } from './block-explorer';
export declare class TezblockBlockExplorer extends BlockExplorer {
    readonly rpcUrls: {
        [key in NetworkType]: string;
    };
    constructor(rpcUrls?: {
        [key in NetworkType]: string;
    });
    getAddressLink(address: string, network: Network): Promise<string>;
    getTransactionLink(transactionId: string, network: Network): Promise<string>;
}
