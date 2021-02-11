import axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import useAxios, { configure } from 'axios-hooks';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import atomUser from 'shared/atoms/user';
import { UserType } from 'shared/models/user';
import { useAuthentication } from './use-authentication';

const useUserFromHeaders = (): [UserType, (headers: unknown) => void] => {
    const [user, setUser] = useRecoilState(atomUser);

    const setUserFromHeaders = (headers: unknown) => {
        let userFromHeader: string;

        if (headers['x-aaccountid']) {
            userFromHeader = headers['x-aaccountid'].toLowerCase();
        } else {
            userFromHeader = headers['x-ausername'].toLowerCase();
        }

        setUser(decodeURIComponent(userFromHeader));
    };

    return [user, setUserFromHeaders];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useJiraConnection = (): [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: any; loading: boolean; error: AxiosError<any>; response: AxiosResponse<any> },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (password: string) => AxiosPromise<any>
] => {
    const [authentication] = useAuthentication();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userFromHeader, setUserFromHeaders] = useUserFromHeaders();
    const fields = `fields=fields,key`;
    const jql = `jql=worklogAuthor=currentUser()`;
    const url = `${authentication.host}rest/api/2/search?${fields}&${jql}`;

    const [{ data, loading, error, response }, refetch] = useAxios(url, { manual: true });

    useEffect(() => {
        console.log('useJira->useEffect', { response, error });
        if (response && response.headers) {
            setUserFromHeaders(response.headers);
        }
    }, [response, error, setUserFromHeaders]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (password: string): AxiosPromise<any> => {
        const headers: {
            Authorization?: string;
            app_token?: string;
        } = {};

        if (authentication.username && password) {
            const b64 = btoa(`${authentication.username}:${password}`);
            headers.Authorization = `Basic ${b64}`;
        }

        if (authentication.token) {
            headers.app_token = authentication.token;
        }

        const instance = axios.create({
            headers: headers,
            method: 'get',
        });

        configure({ axios: instance });

        console.log({ headers, authentication, instance });

        return refetch();
    };

    return [
        {
            data,
            loading,
            error,
            response,
        },
        connection,
    ];
};
