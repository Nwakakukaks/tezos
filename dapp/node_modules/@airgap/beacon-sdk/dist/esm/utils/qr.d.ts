/**
 * Convert data to a QR code
 *
 * @param payload The data to be encoded as a QR code
 * @param type How the QR code will be encoded
 */
export declare const getQrData: (payload: string, type?: "data" | "svg" | "ascii" | undefined) => string;
