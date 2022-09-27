import {useStoreState} from "./security/persistenceAuthProvider";
import {createGlobalState} from "react-hooks-global-state";


export  const BaseUrl = 'http://localhost:8080';

export const LoginUrl = '/authenticate/login';


export function axiosAuthConfig(Bearer) {
   if (Bearer === undefined || Bearer === null|| Bearer === "") {throw new Error('Bearer token wasnt passed to axios config creator');}
   
    return {
        headers: {
            Authorization: `Bearer ${Bearer}`
        }
    };
}