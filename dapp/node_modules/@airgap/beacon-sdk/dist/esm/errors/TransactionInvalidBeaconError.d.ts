import { BeaconError } from '..';
/**
 * @category Error
 */
export declare class TransactionInvalidBeaconError extends BeaconError {
    readonly data: unknown;
    name: string;
    title: string;
    get fullDescription(): string;
    constructor(data: unknown);
}
