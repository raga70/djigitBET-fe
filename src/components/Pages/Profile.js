import React, {useState} from 'react'
import {Avatar, Button, Grid, Paper, TextField} from '@mui/material'

import {AccountCircleSharp} from "@mui/icons-material";
import {dispatch, useStoreState} from "../../security/persistenceAuthProvider";
import EditPlayerRequestDTO from "../DTO/EditPlayerRequestDTO";
import PlayerResponceDTO from "../DTO/PlayerResponceDTO";
import Box from "@mui/material/Box";
import axios from "axios";
import {axiosAuthConfig, UnprivilegedUserUrl} from "../../app.properties";
import {GlobalLogout} from "../../security/persistenceLogOut";
import {useNavigate} from "react-router-dom";

const paperStyle = {padding: '30px 20px', width: 480, marginLeft: "20px ",}
const headerStyle = {margin: 0}
const avatarStyle = {backgroundColor: '#1bbd7e'}
const marginTop = {marginTop: 5}

const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card 

    gridGap: "300px",
}


export const Profile = () => {
    let UserFromLocalst: PlayerResponceDTO = useStoreState('user');
    const navigate = useNavigate();
    let Bearer = useStoreState('authToken');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [sucessMsg, setsucessMsg] = useState('');

    let OutgoingUserEditDTO: EditPlayerRequestDTO = UserFromLocalst;


    const getSanitizedUser = async (Bearer, usrr) => {
        try {
            var response = await axios.put(UnprivilegedUserUrl, usrr, axiosAuthConfig(Bearer));
            if (response.status === 401) {
                GlobalLogout();
                navigate('/login');

            }
            return response;
        } catch (e) {
            console.error('error in putting user', e);
        }
    }


    //update balance and winCoefficient in to local storage //TODO: RETURN IF NEEDED
    // let br = 0;
    // useEffect(() => {
    //    
    //     if (br ===0){
    //         getSanitizedUser(Bearer,UserFromLocalst).then((response) => {
    //             dispatch({
    //                 user: response.data,
    //                 type: 'setUser', 
    //             });
    //            
    //         })
    //     }
    //     br++;
    // }, []);  


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            let y = document.getElementsByClassName('passmsm');
            y[0].style.display = 'block';
        } else {
            OutgoingUserEditDTO.password = password;


            getSanitizedUser(Bearer, OutgoingUserEditDTO).then((response) => {
                dispatch({
                    user: response.data,
                    type: 'setUser',
                });

            })

            setsucessMsg('information updated successfully');
        }
    }


    return (
        <Box sx={containerStyle}>
            <Grid>
                <br/>
                <br/>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AccountCircleSharp/>
                        </Avatar>
                        <h2 style={headerStyle}>Account</h2>
                        <br/>
                    </Grid>
                    <form>
                        <TextField fullWidth label='Username' required={true} placeholder="Enter your new username"
                                   defaultValue={UserFromLocalst.username}
                                   onChange={(e) => OutgoingUserEditDTO.username = e.target.value}/>
                        <br/>
                        {UserFromLocalst.type === "PLAYER" ? <>
                            <br/>
                            <TextField fullWidth label='Email' required={true} type={"email"}
                                       placeholder="Enter your email" defaultValue={UserFromLocalst.email}
                                       onChange={(e) => OutgoingUserEditDTO.email = e.target.value}/>
                            <br/>
                            <br/>
                            <TextField fullWidth label='Name' required={true} placeholder="Enter your name"
                                       defaultValue={UserFromLocalst.name} onChange={(e) => {
                                OutgoingUserEditDTO.name = e.target.value;
                            }}/>
                            <br/>
                            <br/>
                            <TextField fullWidth label='Surname' required={true} placeholder="Enter your surname"
                                       defaultValue={UserFromLocalst.surname}
                                       onChange={(e) => OutgoingUserEditDTO.surname = e.target.value}/>
                            <br/>
                            <br/>
                            <TextField fullWidth label='NationalIDNumber' type="number" required={true}
                                       placeholder="Enter your national id card number"
                                       defaultValue={UserFromLocalst.nationalIDNumber}
                                       onChange={(e) => OutgoingUserEditDTO.nationalIDNumber = e.target.value}/>
                            <br/>
                            <br/>
                            <TextField fullWidth label='Phone Number' required={true}
                                       placeholder="Enter your phone number" defaultValue={UserFromLocalst.phoneNumber}
                                       onChange={(e) => OutgoingUserEditDTO.phoneNumber = e.target.value}/>

                        </> : <></>}
                        <br/>
                        <br/>
                        <TextField fullWidth label='Password' required={true} placeholder="Enter your password"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        <br/>
                        <br/>
                        <TextField fullWidth label='Confirm Password' required={true}
                                   placeholder="Confirm your password" onChange={(e) => setPassword2(e.target.value)}/>
                        <div className={"passmsm"} style={{display: "none"}}>
                            <p style={{color: "red"}}>Passwords do not match</p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        {UserFromLocalst.type === "PLAYER" ? <>
                            <TextField fullWidth label='WinCoefficient' inputProps={{readOnly: true,}}
                                       value={UserFromLocalst.winCoefficient} readonly/>
                            <br/>
                            <br/>
                        </> : <></>}
                        <Button type='submit' variant='contained' onClick={handleSubmit} color='primary'>Update</Button>
                        <p style={{color: "green"}}>{sucessMsg}</p>
                    </form>
                </Paper>
            </Grid>
            {UserFromLocalst.type === "PLAYER" ? <>
                <Grid>
                    <br/>
                    <br/>
                    <Paper elevation={20} style={{padding: '30px 20px', width: 380, marginLeft: "20px "}}>
                        <h2>Balance</h2>
                        <h4>{UserFromLocalst.balance} €</h4>
                    </Paper>
                </Grid>
            </> : <></>}
        </Box>
    )
}
export default Profile;