import { StorageKey, PostMessageTransport } from '..';
// const logger = new Logger('WalletPostMessageTransport')
/**
 * @internalapi
 *
 *
 */
export class WalletPostMessageTransport extends PostMessageTransport {
    constructor(name, keyPair, storage) {
        super(name, keyPair, storage, StorageKey.TRANSPORT_POSTMESSAGE_PEERS_WALLET);
    }
}
//# sourceMappingURL=WalletPostMessageTransport.js.map