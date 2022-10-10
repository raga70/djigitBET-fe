import {useStoreState} from "./security/persistenceAuthProvider";
import {createGlobalState} from "react-hooks-global-state";


export  const BaseUrl = 'http://localhost:8080';

export const LoginUrl = BaseUrl + '/authenticate/login';
export const RegisterUrl = BaseUrl + '/authenticate/register';

export const UsersUrl = BaseUrl + '/user';
export const UnprivilegedUserUrl = BaseUrl + '/unpriviligeduser/';
export const slotsUrl = BaseUrl + '/slots';
export const StatisticsUrl = BaseUrl + '/statistics';

export function axiosAuthConfig(Bearer) {
   if (Bearer === undefined || Bearer === null|| Bearer === "") {throw new Error('Bearer token wasnt passed to axios config creator');}
   
    return {
        headers: {
            Authorization: `Bearer ${Bearer}`
        }
    };
}