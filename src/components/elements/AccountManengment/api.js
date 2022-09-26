import axios from 'axios';
import {BaseUrl} from "../../../app.properties";

const usersUrl = BaseUrl + '/user';


export const getUsers = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${usersUrl}/getall`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}

// export const addUser = async (user) => {
//     return await axios.post(`${usersUrl}`, user);
// }

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/delete/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/update/${id}`, user)
}