import { useRecoilState } from 'recoil';
import atomAuthentication from 'shared/atoms/authentication';
import { AuthenticationData } from 'shared/models/authentication';

export const useAuthentication = (): [AuthenticationData, (data: AuthenticationData) => void] => {
    const [authentication, setAuthentication] = useRecoilState(atomAuthentication);

    return [authentication, setAuthentication];
};
