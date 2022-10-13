import axios from 'axios';
import {axiosAuthConfig, UsersUrl} from "../../../app.properties";
import {GlobalLogout} from "../../../security/persistenceLogOut";
import {Navigate} from "react-router-dom";


export const getUsers = async (Bearer) => {


    try {
        var response = await axios.get(`${UsersUrl}/`, axiosAuthConfig(Bearer));
        if (response.status === 401) {
            GlobalLogout();
        }
        return response;
    } catch (e) {
        if (e.response.status === 401) {
            GlobalLogout();
            Navigate('/login');
        } else console.error('error in fetching all users', e);
    }
}


export const getUser = async (Bearer, id) => {
    try {
        var response = await axios.get(`${UsersUrl}/${id}`, axiosAuthConfig(Bearer));
        return response;
    } catch (e) {
        console.error('error in fetching all users', e);
    }
}


export const deleteUser = async (Bearer, id) => {
    return await axios.delete(`${UsersUrl}/${id}`, axiosAuthConfig(Bearer));
}

export const editUser = async (Bearer, id, user) => {
    try {
        return await axios.put(`${UsersUrl}/${id}`, user, axiosAuthConfig(Bearer))

    } catch (e) {
        console.error('error i edit user ULTRA', e);
    }
}





