import { WalletInfo } from '../../events';
export interface ToastAction {
    text: string;
    actionText?: string;
    actionCallback?(): Promise<void>;
}
export interface ToastConfig {
    body: string;
    timer?: number;
    forceNew?: boolean;
    state: 'prepare' | 'loading' | 'acknowledge' | 'finished';
    actions?: ToastAction[];
    walletInfo?: WalletInfo;
    openWalletAction?(): Promise<void>;
}
/**
 * Close a toast
 */
declare const closeToast: () => Promise<void>;
/**
 * Create a new toast
 *
 * @param toastConfig Configuration of the toast
 */
declare const openToast: (toastConfig: ToastConfig) => Promise<void>;
export { closeToast, openToast };
