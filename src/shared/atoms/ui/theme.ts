import { atom } from 'recoil';
import { DEFAULT_THEME, KEY_THEME, ThemeState, ThemeMode } from 'shared/models/ui/theme';

const chromeStorageEffect = (key: string) => ({ setSelf, onSet, trigger }) => {
    const value = (data: ThemeState) => data || DEFAULT_THEME;

    // Initialize atom value to the remote storage state
    if (trigger === 'get') {
        // Avoid expensive initialization
        chrome.storage.local.get(key, (data) => {
            setSelf(value(data[key])); // Call synchronously to initialize
        });
    }

    // Subscribe to local storage changes and update the atom value
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local' || !(key in changes)) {
            return;
        }

        const { newValue } = changes[key];

        if (!newValue) return;

        setSelf(value(newValue)); // Call asynchronously to change value
    });

    // Subscribe to local changes and update the value
    onSet((type: ThemeMode) => {
        chrome.storage.local.set({
            [key]: type,
        });
    });
};

export const atomTheme = atom<ThemeMode>({
    key: KEY_THEME,
    default: DEFAULT_THEME,
    effects_UNSTABLE: [chromeStorageEffect(KEY_THEME)],
});

export default atomTheme;
