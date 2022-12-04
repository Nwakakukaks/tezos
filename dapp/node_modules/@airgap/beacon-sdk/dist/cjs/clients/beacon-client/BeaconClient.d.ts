import * as sodium from 'libsodium-wrappers';
import { ExposedPromise } from '../../utils/exposed-promise';
import { Storage } from '../..';
import { BeaconEventHandler } from '../../events';
import { BeaconClientOptions } from './BeaconClientOptions';
/**
 * @internalapi
 *
 * The beacon client is an abstract client that handles everything that is shared between all other clients.
 * Specifically, it handles managing the beaconId and and the local keypair.
 */
export declare abstract class BeaconClient {
    /**
     * The name of the client
     */
    readonly name: string;
    /**
     * The URL of the dApp Icon. This can be used to display the icon of the dApp on in the wallet
     */
    readonly iconUrl?: string;
    /**
     * The URL of the dApp.
     */
    readonly appUrl?: string;
    /** The beaconId is a public key that is used to identify one specific application (dapp or wallet).
     * This is used inside a message to specify the sender, for example.
     */
    protected _beaconId: ExposedPromise<string>;
    get beaconId(): Promise<string>;
    protected storage: Storage;
    protected readonly events: BeaconEventHandler;
    /**
     * The local keypair that is used for the communication encryption
     */
    protected _keyPair: ExposedPromise<sodium.KeyPair>;
    protected get keyPair(): Promise<sodium.KeyPair>;
    constructor(config: BeaconClientOptions);
    /**
     * This resets the SDK. After using this method, this instance is no longer usable. You will have to instanciate a new client.
     */
    destroy(): Promise<void>;
    /**
     * This method initializes the SDK by setting some values in the storage and generating a keypair.
     */
    private initSDK;
    /**
     * Removes all beacon values from the storage.
     */
    private removeBeaconEntriesFromStorage;
    /**
     * This method tries to load the seed from storage, if it doesn't exist, a new one will be created and persisted.
     */
    private loadOrCreateBeaconSecret;
}
