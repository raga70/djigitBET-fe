import {Grid, Paper, styled, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import {useNavigate} from "react-router-dom";

import {getPaggedFullPlayers, getStatistics} from "./api";
import AggregatedStatisticsDTO from "../../DTO/AggregatedStatisticsDTO";
import PlayerFullDTO, {FilteringOptions} from "../../DTO/PlayerFullDTO";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";




const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card 
    marginLeft: "2vw",
    gridGap: "10vw",
}


const containerFilterStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card 
    marginLeft: "0vw",
    gridGap: "5vw",
    height: "30%",
}

const paperStyle = {
    padding: '30px 20px',
    width: 300,
    marginLeft: "20px ",
    minHeight: 220, 
}

const paperFilterSelectorStyle = {
    padding: '30px 20px',
    margin: "0 auto",
    width: '95vw',
    marginLeft: "20px "
}

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;
const THead = styled(TableRow)`
    & > th {

        font-size: 20px;
        background: #FFFFFF;
        color: #1976d2;
    }
`;


export const DashboardWidgets = () =>{
    let Bearer = useStoreState('authToken');
    const navigate = useNavigate();
    
    
    
    const [statistics, setStatistics] = useState({    totalFundsPayedIn: 0,
        totalFundsPayedOut: 0,
        jackpot: 0 ,
        casinoFunds: 0 ,
        totalWinCoefficient: 0});
    const [playerData, setPlayerData] = useState([]);

    const [selectedFilterOption, setSelectedFilterOption] = useState("empty");
    
    
    useEffect(() => {
        getStatistics(Bearer).then((response) => {
           setStatistics(response.data);
           
        }).catch((error) => {
            console.log( error);
            if (error.response.status === 401) {
                navigate('/login');
            }
        });

    },
        []);
    
    
    useEffect(() => {
        getPaggedFullPlayers(Bearer, 0, 100,selectedFilterOption).then((response) => {
            setPlayerData(response.data);
        }).catch((error) => {
            console.log( error);
            if (error.response.status === 401) {
                navigate('/login');
            }
        });
    },
        [selectedFilterOption]);
    
        
        
    
    return(
        <>
        <Box sx={containerStyle}>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20}  style={paperStyle}>
                    <h2>moneyFlow</h2>
                    <h4>totalFundsPayedIn: {statistics.totalFundsPayedIn} €</h4>
                    <h4>totalFundsPayedOut: {statistics.totalFundsPayedOut} €</h4>

                </Paper>
            </Grid>
        <Grid>
            <br/>
            <br/>
            <Paper elevation={20}  style={paperStyle}>
                <h2>casinoFunds</h2>
                <h4>{statistics.casinoFunds} €</h4>
            </Paper>
        </Grid>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20}  style={paperStyle}>
                    <h2>totalWinCoefficient:</h2>
                    <h4>{statistics.totalWinCoefficient.toFixed(4)} </h4>

                </Paper>
            </Grid>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20}  style={paperStyle}>
                    <h2>Jackpot</h2>
                    <h4>{statistics.jackpot.toFixed(2)} €</h4>
                </Paper>
            </Grid>
        </Box>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20}  style={paperFilterSelectorStyle}>
                    <h2>Per Customer Statistics</h2>
                    
                    <Box sx={containerFilterStyle}>
                        <h4 style={{maxHeight:'0.2vh',position:"relative",top:-10,left:100}}>Sort By:</h4>
                        
                        <Button  variant="contained" onClick={()=>{setSelectedFilterOption(FilteringOptions.balance)}}>Balance</Button>
                        <Button variant="contained" onClick={()=>{setSelectedFilterOption(FilteringOptions.winCoefficient)}}>WinCoefficient</Button>
                        <Button variant="contained" onClick={()=>{setSelectedFilterOption(FilteringOptions.fundsLost)}}>FundsLost</Button>
                        <Button variant="contained" onClick={()=>{setSelectedFilterOption(FilteringOptions.fundsPayedOut)}}>FundsPayedOut</Button>
                    </Box>
                    <br/>
                    <br/>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        > 
                    <TableHead>
                        <THead>
                            <TableCell>id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>WinCoefficient</TableCell>
                            <TableCell>FundsLost</TableCell>
                            <TableCell>FundsPayedOut</TableCell>
                            <TableCell>Email</TableCell>
                          
                            <TableCell></TableCell>
                        </THead>
                    </TableHead>
                    
            <TableBody>
                {
                    playerData.map((user:PlayerFullDTO) =>{ return (
                            <TRow key={user.userID}>
                                <TableCell>{user.userID}</TableCell>
                                <TableCell>{user.name} {user.surname}</TableCell>
                                <TableCell>{user.balance}€</TableCell>
                                <TableCell>{user.winCoefficient}</TableCell>
                                <TableCell>{user.fundsLost}€</TableCell>
                                <TableCell>{user.fundsPayedOut}€</TableCell>
                                <TableCell>{user.email}</TableCell>
                          
                               
                            </TRow>
                        )}
                    )
            
            
            
            
                }
            </TableBody>
                    </Grid>
                </Paper>
            </Grid>


            
            
            
            
            
            
            
            
        </>   


            )
}
export default DashboardWidgets;