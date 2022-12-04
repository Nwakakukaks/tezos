import { BeaconError, BeaconErrorType } from '..';
/**
 * @category Error
 */
export class UnknownBeaconError extends BeaconError {
    constructor() {
        super(BeaconErrorType.UNKNOWN_ERROR, 'An unknown error occured. Please try again or report it to a developer.');
        this.name = 'UnknownBeaconError';
        this.title = 'Error';
    }
}
//# sourceMappingURL=UnknownBeaconError.js.map