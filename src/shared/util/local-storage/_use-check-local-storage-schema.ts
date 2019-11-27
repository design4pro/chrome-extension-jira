import { useLocalStorageState } from './node_modules/shared/state/store/hooks';
import { CURRENT_SCHEMA_VERSION, KEY_SCHEMA_VERSION } from './node_modules/shared/util/local-storage/_index';

export const useCheckLocalStorageSchema = () => {
    const [schemaVersion, setSchemaVersion] = useLocalStorageState(KEY_SCHEMA_VERSION, '0');

    if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
        window.localStorage.clear();

        setSchemaVersion(CURRENT_SCHEMA_VERSION);
    }
};
