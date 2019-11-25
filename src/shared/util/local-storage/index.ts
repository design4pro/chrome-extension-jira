export const CURRENT_SCHEMA_VERSION = '2';

export const KEY_SCHEMA_VERSION = 'schemaVersion';
export const KEY_THEME = 'theme';

export const getObject = (key: string) => JSON.parse(localStorage.getItem(key));
export const setObject = (key: string, value) => localStorage.setItem(key, JSON.stringify(value));
