import { PermissionResponse, OperationResponse, SignPayloadResponse, BroadcastResponse, AccountInfo } from '../../..';
/**
 * @category DApp
 */
export declare type IgnoredResponseOutputProperties = 'id' | 'version' | 'type';
/**
 * @category DApp
 */
export declare type PermissionResponseOutput = PermissionResponse & {
    address: string;
    accountInfo: AccountInfo;
};
/**
 * @category DApp
 */
export declare type OperationResponseOutput = OperationResponse;
/**
 * @category DApp
 */
export declare type SignPayloadResponseOutput = SignPayloadResponse;
/**
 * @category DApp
 */
/**
 * @category DApp
 */
export declare type BroadcastResponseOutput = BroadcastResponse;
/**
 * @internalapi
 * @category DApp
 */
export declare type BeaconResponseOutputMessage = PermissionResponseOutput | OperationResponseOutput | SignPayloadResponseOutput | BroadcastResponseOutput;
