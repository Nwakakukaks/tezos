/**
 * A helper function to improve typings of object keys
 *
 * @param obj Object
 */
export declare function keys<O extends object>(obj: O): (keyof O)[];
export declare type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;
