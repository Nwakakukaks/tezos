import { Storage, StorageKey, StorageKeyReturnType } from '..';
/**
 * @internalapi
 *
 * A storage that can be used in chrome extensions
 */
export declare class ChromeStorage implements Storage {
    static isSupported(): Promise<boolean>;
    get<K extends StorageKey>(key: K): Promise<StorageKeyReturnType[K]>;
    set<K extends StorageKey>(key: K, value: StorageKeyReturnType[K]): Promise<void>;
    delete<K extends StorageKey>(key: K): Promise<void>;
}
