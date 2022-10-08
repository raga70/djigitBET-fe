import axios from "axios";
import {axiosAuthConfig, slotsUrl, UsersUrl} from "../../../app.properties";
import {GlobalLogout} from "../../../security/persistenceLogOut";
import {Navigate} from "react-router-dom";

export const generateNumbers = async (betAmount : number, Bearer : string) =>{
    try {
        var response = await axios.post(`${slotsUrl}/`,{betAmount: betAmount} , axiosAuthConfig(Bearer));
        if (response.status === 401){
            GlobalLogout();
        }
        return response;
    }
    catch (e) {
        if ( e.response.status === 401)
        {
            GlobalLogout();
            Navigate('/login');
        }
        else  console.error('error in getting slot numbers', e);
        return e.response;
    }
}