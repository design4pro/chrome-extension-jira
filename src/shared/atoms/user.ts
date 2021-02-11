import { atom } from 'recoil';
import { KEY_USER, UserType } from 'shared/models/user';

export const atomUser = atom<UserType>({
    key: KEY_USER,
    default: '',
});

export default atomUser;
