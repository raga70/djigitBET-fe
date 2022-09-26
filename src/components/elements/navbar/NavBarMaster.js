
import AdminAppBar from "./AdminAppbar";
import ResponsiveAppBar from "./Appbar";
import {useGlobalState} from "../../../security/AuthProvider";
//import { createGlobalState } from 'react-hooks-global-state';
export default function NavBar() {
   
    
    if (useGlobalState('AuthRole')[0] === "ADMIN") {
        return (
      
           
             <AdminAppBar/>
        )
    } else {
        return( <ResponsiveAppBar/>)
    }
}