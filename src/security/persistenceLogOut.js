
import {dispatch} from "./persistenceAuthProvider";

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