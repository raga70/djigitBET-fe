import axios from "axios";
import {axiosAuthConfig, StatisticsUrl, UsersUrl} from "../../../app.properties";
import {GlobalLogout} from "../../../security/persistenceLogOut";
import {Navigate} from "react-router-dom";

export const getPaggedFullPlayers= async (Bearer, pageNo, pageSize, sortBy) => {


    try {                                           //todo: add pagination
        var response = await axios.get(`${UsersUrl}/pagged/${pageNo}/${pageSize}/${sortBy}`, axiosAuthConfig(Bearer));
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
        else  console.error('error in fetching all users', e);
    }
}


export const getStatistics = async (Bearer) => {


    try {                                           //todo: add pagination
        var response = await axios.get(`${StatisticsUrl}/`, axiosAuthConfig(Bearer));
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
        else  console.error('error in fetching all users', e);
    }
}