//import {useGlobalState} from "../../../security/AuthProvider";
import {useStoreState} from "../../../../security/persistenceAuthProvider";
import {NavLink} from "react-router-dom";
import * as React from "react";
import {GlobalLogout } from "../../../../security/persistenceLogOut";





 const LogInOutSwitcher = () => {
   
    if (useStoreState('authToken') === "") { 
        return (
            <>
            <NavLink className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root" to={'/login'}>Login</NavLink>
        <NavLink className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root" to={'/register'}>Register</NavLink>
            </>
    )
    }else {
        return (
            <>
            <NavLink className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root" to={'/Profile'}>Profile</NavLink>
             <a className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root" onClick={GlobalLogout}>Logout</a>
            </>
                )
    }
 }

 export default LogInOutSwitcher;