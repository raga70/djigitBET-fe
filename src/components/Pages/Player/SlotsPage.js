import React from 'react';

import SlotMachine from "../../elements/SlotMachine/slotengine";
import {useNavigate} from "react-router-dom";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import HomePage from "../HomePage";
import Login from "../../settings/Login";

function SlotsPage(props) {
    const navigate = useNavigate();
    let authRole = useStoreState('authRole')
    if (useStoreState('authRole') === "PLAYER") {
        return (

            <div>
                <SlotMachine/>
                <br/>
                <br/>
            </div>


        );
    } else if (authRole === "ADMIN") {
        return (<HomePage/>)
    }else return (<Login/>)
}

export default SlotsPage;