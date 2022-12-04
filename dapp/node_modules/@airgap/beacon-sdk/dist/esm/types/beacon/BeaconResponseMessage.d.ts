import { PermissionResponse, OperationResponse, SignPayloadResponse, BroadcastResponse } from '../..';
import { ErrorResponse } from './messages/ErrorResponse';
/**
 * @internalapi
 */
export declare type BeaconResponseMessage = PermissionResponse | OperationResponse | SignPayloadResponse | BroadcastResponse | ErrorResponse;
