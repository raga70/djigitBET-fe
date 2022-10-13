import PaymentForm from "../../funding/PaymentForm";
import {Grid, Paper} from "@mui/material";
import React, {useState} from "react";
import PlayerResponceDTO from "../../DTO/PlayerResponceDTO";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import Box from "@mui/material/Box";
import Login from "../../settings/Login";


const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card 

    gridGap: "300px",
}


export default function FundingPage() {

    let Bearer = useStoreState('authToken');


    let UserFromLocalst: PlayerResponceDTO = useStoreState('user');
    const [balance, setBalance] = useState(UserFromLocalst.balance)
    if (useStoreState('authRole') === "PLAYER")
    return (
        <Box sx={containerStyle}>


            <Grid>
                <br/>
                <br/>
                <Paper elevation={20} style={{padding: '30px 20px', minHeight: 230, width: 380, marginLeft: "20px "}}>
                    <h2>Balance:</h2>
                    <h1>{balance} €</h1>
                </Paper>
            </Grid>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20} style={{padding: '30px 20px', minHeight: 230, width: 380, marginLeft: "20px "}}>
                    <h2>Add funds:</h2>
                    <PaymentForm setBalance={setBalance}/>

                </Paper>
            </Grid>
        </Box>
    ) 
    else return <Login/>
}