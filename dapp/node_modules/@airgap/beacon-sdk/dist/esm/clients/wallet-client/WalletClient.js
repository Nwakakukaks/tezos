var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Serializer, Client, LocalStorage, TransportStatus, WalletP2PTransport } from '../..';
import { PermissionManager } from '../../managers/PermissionManager';
import { AppMetadataManager } from '../../managers/AppMetadataManager';
import { IncomingRequestInterceptor } from '../../interceptors/IncomingRequestInterceptor';
import { OutgoingResponseInterceptor } from '../../interceptors/OutgoingResponseInterceptor';
import { BeaconMessageType } from '../../types/beacon/BeaconMessageType';
import { getSenderId } from '../../utils/get-sender-id';
import { ExposedPromise } from '../../utils/exposed-promise';
import { Logger } from '../../utils/Logger';
const logger = new Logger('WalletClient');
/**
 * @publicapi
 *
 * The WalletClient has to be used in the wallet. It handles all the logic related to connecting to beacon-compatible
 * dapps and handling/responding to requests.
 *
 * @category Wallet
 */
export class WalletClient extends Client {
    constructor(config) {
        super(Object.assign({ storage: new LocalStorage() }, config));
        /**
         * Returns whether or not the transport is connected
         */
        this._isConnected = new ExposedPromise();
        /**
         * This array stores pending requests, meaning requests we received and have not yet handled / sent a response.
         */
        this.pendingRequests = [];
        this.permissionManager = new PermissionManager(new LocalStorage());
        this.appMetadataManager = new AppMetadataManager(new LocalStorage());
    }
    get isConnected() {
        return this._isConnected.promise;
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const keyPair = yield this.keyPair; // We wait for keypair here so the P2P Transport creation is not delayed and causing issues
            const p2pTransport = new WalletP2PTransport(this.name, keyPair, this.storage, this.matrixNodes, this.iconUrl, this.appUrl);
            return _super.init.call(this, p2pTransport);
        });
    }
    /**
     * This method initiates a connection to the P2P network and registers a callback that will be called
     * whenever a message is received.
     *
     * @param newMessageCallback The callback that will be invoked for every message the transport receives.
     */
    connect(newMessageCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleResponse = (message, connectionContext) => __awaiter(this, void 0, void 0, function* () {
                if (message.type === BeaconMessageType.Disconnect) {
                    const transport = yield this.transport;
                    const peers = yield transport.getPeers();
                    const peer = peers.find((peerEl) => peerEl.senderId === message.senderId);
                    if (peer) {
                        yield this.removePeer(peer);
                    }
                    return;
                }
                if (!this.pendingRequests.some((request) => request[0].id === message.id)) {
                    this.pendingRequests.push([message, connectionContext]);
                    if (message.version !== '1') {
                        yield this.sendAcknowledgeResponse(message, connectionContext);
                    }
                    yield IncomingRequestInterceptor.intercept({
                        message,
                        connectionInfo: connectionContext,
                        appMetadataManager: this.appMetadataManager,
                        interceptorCallback: newMessageCallback
                    });
                }
            });
            return this._connect();
        });
    }
    /**
     * The method will attempt to initiate a connection using the active transport.
     */
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = (yield this.transport);
            if (transport.connectionStatus === TransportStatus.NOT_CONNECTED) {
                yield transport.connect();
                transport
                    .addListener((message, connectionInfo) => __awaiter(this, void 0, void 0, function* () {
                    if (typeof message === 'string') {
                        const deserializedMessage = (yield new Serializer().deserialize(message));
                        this.handleResponse(deserializedMessage, connectionInfo);
                    }
                }))
                    .catch((error) => logger.log('_connect', error));
                this._isConnected.resolve(true);
            }
            else {
                // NO-OP
            }
        });
    }
    /**
     * This method sends a response for a specific request back to the DApp
     *
     * @param message The BeaconResponseMessage that will be sent back to the DApp
     */
    respond(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.pendingRequests.find((pendingRequest) => pendingRequest[0].id === message.id);
            if (!request) {
                throw new Error('No matching request found!');
            }
            this.pendingRequests = this.pendingRequests.filter((pendingRequest) => pendingRequest[0].id !== message.id);
            yield OutgoingResponseInterceptor.intercept({
                senderId: yield getSenderId(yield this.beaconId),
                request: request[0],
                message,
                ownAppMetadata: yield this.getOwnAppMetadata(),
                permissionManager: this.permissionManager,
                appMetadataManager: this.appMetadataManager,
                interceptorCallback: (response) => __awaiter(this, void 0, void 0, function* () {
                    yield this.respondToMessage(response, request[1]);
                })
            });
        });
    }
    getAppMetadataList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.getAppMetadataList();
        });
    }
    getAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.getAppMetadata(senderId);
        });
    }
    removeAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.removeAppMetadata(senderId);
        });
    }
    removeAllAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appMetadataManager.removeAllAppMetadata();
        });
    }
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.getPermissions();
        });
    }
    getPermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.getPermission(accountIdentifier);
        });
    }
    removePermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.removePermission(accountIdentifier);
        });
    }
    removeAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionManager.removeAllPermissions();
        });
    }
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    addPeer(peer, sendPairingResponse = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const extendedPeer = Object.assign(Object.assign({}, peer), { senderId: yield getSenderId(peer.publicKey) });
            return (yield this.transport).addPeer(extendedPeer, sendPairingResponse);
        });
    }
    removePeer(peer, sendDisconnectToPeer = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const removePeerResult = (yield this.transport).removePeer(peer);
            yield this.removePermissionsForPeers([peer]);
            if (sendDisconnectToPeer) {
                yield this.sendDisconnectToPeer(peer);
            }
            return removePeerResult;
        });
    }
    removeAllPeers(sendDisconnectToPeers = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const peers = yield (yield this.transport).getPeers();
            const removePeerResult = (yield this.transport).removeAllPeers();
            yield this.removePermissionsForPeers(peers);
            if (sendDisconnectToPeers) {
                const disconnectPromises = peers.map((peer) => this.sendDisconnectToPeer(peer));
                yield Promise.all(disconnectPromises);
            }
            return removePeerResult;
        });
    }
    removePermissionsForPeers(peersToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissions = yield this.permissionManager.getPermissions();
            const peerIdsToRemove = peersToRemove.map((peer) => peer.senderId);
            // Remove all permissions with origin of the specified peer
            const permissionsToRemove = permissions.filter((permission) => peerIdsToRemove.includes(permission.appMetadata.senderId));
            const permissionIdentifiersToRemove = permissionsToRemove.map((permissionInfo) => permissionInfo.accountIdentifier);
            yield this.permissionManager.removePermissions(permissionIdentifiersToRemove);
        });
    }
    /**
     * Send an acknowledge message back to the sender
     *
     * @param message The message that was received
     */
    sendAcknowledgeResponse(request, connectionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Acknowledge the message
            const acknowledgeResponse = {
                id: request.id,
                type: BeaconMessageType.Acknowledge
            };
            yield OutgoingResponseInterceptor.intercept({
                senderId: yield getSenderId(yield this.beaconId),
                request,
                message: acknowledgeResponse,
                ownAppMetadata: yield this.getOwnAppMetadata(),
                permissionManager: this.permissionManager,
                appMetadataManager: this.appMetadataManager,
                interceptorCallback: (response) => __awaiter(this, void 0, void 0, function* () {
                    yield this.respondToMessage(response, connectionContext);
                })
            });
        });
    }
    /**
     * An internal method to send a BeaconMessage to the DApp
     *
     * @param response Send a message back to the DApp
     */
    respondToMessage(response, connectionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedMessage = yield new Serializer().serialize(response);
            if (connectionContext) {
                const peerInfos = yield this.getPeers();
                const peer = peerInfos.find((peerInfo) => peerInfo.publicKey === connectionContext.id);
                yield (yield this.transport).send(serializedMessage, peer);
            }
            else {
                yield (yield this.transport).send(serializedMessage);
            }
        });
    }
}
//# sourceMappingURL=WalletClient.js.map