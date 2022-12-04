var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExposedPromise } from '../../utils/exposed-promise';
import { generateGUID } from '../../utils/generate-uuid';
import { getKeypairFromSeed, toHex } from '../../utils/crypto';
import { StorageKey } from '../..';
import { BeaconEventHandler } from '../../events';
import { SDK_VERSION } from '../../constants';
import { windowRef } from '../../MockWindow';
/**
 * @internalapi
 *
 * The beacon client is an abstract client that handles everything that is shared between all other clients.
 * Specifically, it handles managing the beaconId and and the local keypair.
 */
export class BeaconClient {
    constructor(config) {
        /** The beaconId is a public key that is used to identify one specific application (dapp or wallet).
         * This is used inside a message to specify the sender, for example.
         */
        this._beaconId = new ExposedPromise();
        this.events = new BeaconEventHandler();
        /**
         * The local keypair that is used for the communication encryption
         */
        this._keyPair = new ExposedPromise();
        if (!config.name) {
            throw new Error('Name not set');
        }
        if (!config.storage) {
            throw new Error('Storage not set');
        }
        this.name = config.name;
        this.iconUrl = config.iconUrl;
        this.appUrl = config.appUrl;
        this.storage = config.storage;
        // TODO: This is a temporary "fix" to prevent users from creating multiple Client instances
        if (windowRef.beaconCreatedClientInstance) {
            console.warn('[BEACON] It looks like you created multiple Beacon SDK Client instances. This can lead to problems. Only create one instance and re-use it everywhere.');
        }
        else {
            ;
            windowRef.beaconCreatedClientInstance = true;
        }
        this.initSDK().catch(console.error);
    }
    get beaconId() {
        return this._beaconId.promise;
    }
    get keyPair() {
        return this._keyPair.promise;
    }
    /**
     * This resets the SDK. After using this method, this instance is no longer usable. You will have to instanciate a new client.
     */
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeBeaconEntriesFromStorage();
            windowRef.beaconCreatedClientInstance = false;
        });
    }
    /**
     * This method initializes the SDK by setting some values in the storage and generating a keypair.
     */
    initSDK() {
        return __awaiter(this, void 0, void 0, function* () {
            this.storage.set(StorageKey.BEACON_SDK_VERSION, SDK_VERSION).catch(console.error);
            this.loadOrCreateBeaconSecret().catch(console.error);
            return this.keyPair.then((keyPair) => {
                this._beaconId.resolve(toHex(keyPair.publicKey));
            });
        });
    }
    /**
     * Removes all beacon values from the storage.
     */
    removeBeaconEntriesFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const allKeys = Object.values(StorageKey);
            yield Promise.all(allKeys.map((key) => this.storage.delete(key)));
        });
    }
    /**
     * This method tries to load the seed from storage, if it doesn't exist, a new one will be created and persisted.
     */
    loadOrCreateBeaconSecret() {
        return __awaiter(this, void 0, void 0, function* () {
            const storageValue = yield this.storage.get(StorageKey.BEACON_SDK_SECRET_SEED);
            if (storageValue && typeof storageValue === 'string') {
                this._keyPair.resolve(yield getKeypairFromSeed(storageValue));
            }
            else {
                const key = yield generateGUID();
                yield this.storage.set(StorageKey.BEACON_SDK_SECRET_SEED, key);
                this._keyPair.resolve(yield getKeypairFromSeed(key));
            }
        });
    }
}
//# sourceMappingURL=BeaconClient.js.map