import { atom } from 'recoil';
import {
    AuthenticationData,
    AuthenticationState,
    DEFAULT_AUTHENTICATION,
    KEY_AUTHENTICATION,
} from 'shared/models/authentication';
import { ThemeMode } from 'shared/models/ui/theme';

const chromeStorageEffect = (key: string) => ({ setSelf, onSet, trigger }) => {
    const value = (data: AuthenticationState) => ({ ...DEFAULT_AUTHENTICATION, ...data });

    // Initialize atom value to the remote storage state
    if (trigger === 'get') {
        // Avoid expensive initialization
        chrome.storage.sync.get(key, async (data) => {
            setSelf(value(data[key])); // Call synchronously to initialize
        });
    }

    // Subscribe to remote storage changes and update the atom value
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync' || !(key in changes)) {
            return;
        }

        const { newValue } = changes[key];

        if (!newValue) return;

        setSelf(value(newValue)); // Call asynchronously to change value
    });

    // Subscribe to sync changes and update the values
    onSet((type: ThemeMode) => {
        chrome.storage.sync.set({
            [key]: type,
        });
    });
};

export const atomAuthentication = atom<AuthenticationData>({
    key: KEY_AUTHENTICATION,
    default: DEFAULT_AUTHENTICATION,
    effects_UNSTABLE: [chromeStorageEffect(KEY_AUTHENTICATION)],
});

export default atomAuthentication;
