import { BeaconErrorType } from '..';
/**
 * @category Error
 */
export declare abstract class BeaconError implements Error {
    name: string;
    message: string;
    title: string;
    description: string;
    get fullDescription(): string;
    constructor(errorType: BeaconErrorType, message: string);
    static getError(errorType: BeaconErrorType, errorData: unknown): BeaconError;
}
