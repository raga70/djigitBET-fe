import {useNavigate} from "react-router-dom";

export const stripePUBLIC_KEY = "pk_test_51LrmbpHE3EgQ6kfoD18LjoslFX0HOCjiV6EuVauiCXOuSny6tMTLvhNMe89u6h08i51lomnhgKZcwH7g1tL12RgY008963BpGE"
//export const BaseUrl = 'http://localhost:8080';

//dockerCompose
 export const BaseUrl = 'http://10.56.1.2:8080';

export const LoginUrl = BaseUrl + '/authenticate/login';
export const RegisterUrl = BaseUrl + '/authenticate/register';

export const UsersUrl = BaseUrl + '/user';
export const UnprivilegedUserUrl = BaseUrl + '/unpriviligeduser/';
export const slotsUrl = BaseUrl + '/slots';
export const StatisticsUrl = BaseUrl + '/statistics';

export function axiosAuthConfig(Bearer) {
    if (Bearer === undefined || Bearer === null || Bearer === "") {
        throw new Error('Bearer token wasnt passed to axios config creator');
        
    }

    return {
        headers: {
            Authorization: `Bearer ${Bearer}`
        }
    };
}