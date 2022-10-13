import * as React from 'react';
import AllUsers from "../../elements/AccountManengment/AllUsers";
//import {useGlobalState} from "../../../security/AuthProvider";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import {useNavigate} from "react-router-dom";
import HomePage from "../HomePage";

// import UserMNGtable from "../../elements/UserMNGtable";


export default function UsersManengmentPage() {
    const navigate = useNavigate();
    if (useStoreState('authRole') === "ADMIN") {
        return (

            <div>
                <AllUsers/>
                <br/>
                <br/>
            </div>


        );
    } else {
        return (<HomePage/>)
    }
}
