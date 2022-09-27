import axios from 'axios';
import {axiosAuthConfig, BaseUrl} from "../../../app.properties";
import {useStoreState} from "../../../security/persistenceAuthProvider";

const usersUrl = BaseUrl + '/user';


 export const getUsers = async (Bearer) => {
    try {
       var response = await axios.get(`${usersUrl}/getall`, axiosAuthConfig(Bearer));
       return response;
    } catch (e) {console.error('error in fetching all users', e);}
}



export const getUser = async (Bearer,id) => {
    try {
        var response = await axios.get(`${usersUrl}/get/${id}`, axiosAuthConfig(Bearer));
        return response;
    } catch (e) {console.error('error in fetching all users', e);
}}


export const deleteUser = async (Bearer,id) => {
    return await axios.delete(`${usersUrl}/delete/${id}`,axiosAuthConfig(Bearer));
}

export const editUser = async (Bearer,id, user) => {
    return await axios.put(`${usersUrl}/update/${id}`, user, axiosAuthConfig(Bearer))
}





