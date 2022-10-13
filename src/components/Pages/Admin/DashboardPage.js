import {useNavigate} from "react-router-dom";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import HomePage from "../HomePage";
import * as React from "react";
import DashboardWidgets from "../../elements/Dashboard/DashboardWidgets";

export default function DashboardPage() {
    const navigate = useNavigate();
    if (useStoreState('authRole') === "ADMIN") {
        return (

            <div>
                <DashboardWidgets/>
                <br/>
                <br/>
            </div>


        );
    } else {
        return (<HomePage/>)
    }
}