/**
 * An object with promises to indicate whether or not that transport is available.
 */
export declare const availableTransports: {
    extension: Promise<boolean>;
    availableExtensions: Promise<import("../types/Extension").Extension[]>;
};
