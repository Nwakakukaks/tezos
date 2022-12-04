import { BeaconError, BeaconErrorType } from '..';
/**
 * @category Error
 */
export class TransactionInvalidBeaconError extends BeaconError {
    constructor(data) {
        super(BeaconErrorType.TRANSACTION_INVALID_ERROR, `The transaction is invalid and the node did not accept it.`);
        this.data = data;
        this.name = 'TransactionInvalidBeaconError';
        this.title = 'Transaction Invalid';
        this.data = data;
    }
    get fullDescription() {
        return `${this.description}<br /><pre style="text-align: left">${JSON.stringify(this.data, undefined, 2)}</pre>`;
    }
}
//# sourceMappingURL=TransactionInvalidBeaconError.js.map