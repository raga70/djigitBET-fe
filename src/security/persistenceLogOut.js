
import {dispatch} from "./persistenceAuthProvider";
import {Navigate} from "react-router-dom";

export const GlobalLogout = () => {

    dispatch({
        authToken: "",
        type: 'setAuthToken',
    });
    dispatch({
        authRole: "",
        type: 'setAuthRole',
    });
    dispatch({
        user: {},
        type: 'setUser',
    });
    
}