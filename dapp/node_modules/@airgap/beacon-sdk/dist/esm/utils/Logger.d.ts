/**
 * The logger that is used internally
 */
export declare class Logger {
    private readonly name;
    constructor(service: string);
    debug(method: string, ...args: any[]): void;
    log(method: string, ...args: any[]): void;
    warn(method: string, ...args: any[]): void;
    error(method: string, ...args: any[]): void;
    private _log;
}
