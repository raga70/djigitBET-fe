
import AdminAppBar from "./AdminAppbar";
import UserAppBar from "./UserAppBar";
//import {useGlobalState} from "../../../security/AuthProvider";
import {useStoreState} from "../../../security/persistenceAuthProvider";

export default function NavBar() {
   
    var usrStt = useStoreState('authRole')
    if (useStoreState('authRole') === "ADMIN") {
        return (
      
           
             <AdminAppBar/>
        )
    } else {
        return( <UserAppBar/>)
    }
}