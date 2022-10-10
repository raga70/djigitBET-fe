import React from 'react';

import SlotMachine from "../../elements/SlotMachine/slotengine";
import {useNavigate} from "react-router-dom";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import HomePage from "../HomePage";

function SlotsPage(props) {
    const navigate = useNavigate();
    if (useStoreState('authRole') === "PLAYER") {
        return (

            <div>
                <SlotMachine/>
                <br/>
                <br/>
            </div>



        );
    }else{
        return ( <HomePage/>)
    }
}

export default SlotsPage;