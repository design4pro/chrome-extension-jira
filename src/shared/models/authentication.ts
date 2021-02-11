export const DEFAULT_AUTHENTICATION = {
    host: '',
    username: '',
    token: '',
};

export const KEY_AUTHENTICATION = 'authentication';

export interface AuthenticationData {
    host: string;
    username: string;
    password?: string;
    token: string;
}

export interface AuthenticationState {
    [key: string]: AuthenticationData;
}
