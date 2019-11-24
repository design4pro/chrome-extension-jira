import { CURRENT_SCHEMA_VERSION, KEY_SCHEMA_VERSION } from 'shared/util/local-storage';
import useLocalStorage from './use-local-storage';

export const useCheckLocalStorageSchema = () => {
    const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);

    if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
        window.localStorage.clear();

        setSchemaVersion(CURRENT_SCHEMA_VERSION);
    }
};
