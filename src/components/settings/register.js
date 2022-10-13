import React, {useState} from 'react'
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutline';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import {LoginUrl, RegisterUrl} from "../../app.properties";
import {dispatch} from "../../security/persistenceAuthProvider";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()
    const paperStyle = {padding: '30px 20px', width: 480, margin: "20px auto"}
    const headerStyle = {margin: 0}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const marginTop = {marginTop: 5}

    const type = "PLAYER";
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nationalIDNumber, setNationalIDNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            let y = document.getElementsByClassName('passmsm');
            y[0].style.display = 'block';
        } else {
            const player = {type, name, surname, nationalIDNumber, email, phoneNumber, username, password};
            //TODO: Replace with axios Register


            try {
                await axios.post(`${RegisterUrl}`, player)
            } catch (e) {
                console.error('error in Registering user ULTRA', e);
            }
            try {

                let response = await axios.post(`${LoginUrl}`, {username, password})

                let accessToken = response.headers?.authorization;
                let role = response.headers?.role;

                dispatch({
                    authToken: response.headers?.authorization,
                    type: 'setAuthToken',
                });
                dispatch({
                    authRole: response.headers?.role,
                    type: 'setAuthRole',
                });
                dispatch({
                    user: response.data,
                    type: 'setUser',
                });

                if (response.status === 200) {
                    navigate('/');
                }


                player.password = null;
                navigate('/');
            } catch (e) {
                console.error('error in auto logging in the  user after registration ULTRA', e);
            }


        }


    }


    return (
        <Grid>
            <br/>
            <br/>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Username' required={true} placeholder="Enter your new username"
                               value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='Email' type={"email"} required={true} placeholder="Enter your email"
                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='Name' required={true} placeholder="Enter your name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='Surname' required={true} placeholder="Enter your surname"
                               value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='NationalIDNumber' onv required={true}
                               placeholder="Enter your national id card number" value={nationalIDNumber}
                               onChange={(e) => setNationalIDNumber(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='Phone Number' required={true} placeholder="Enter your phone number"
                               value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <br/>
                    <br/>
                    <br/>

                    <TextField fullWidth label='Password' required={true} placeholder="Enter your password"
                               value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField fullWidth label='Confirm Password' required={true} placeholder="Confirm your password"
                               value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    <div className={"passmsm"} style={{display: "none"}}>
                        <p style={{color: "red"}}>Passwords do not match</p>
                    </div>
                    <br/>
                    <br/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA"/>}
                        label="I accept the terms and conditions.( I sign my soul to the devil)"
                    />

                    <br/>
                    <br/>
                    <Button type='submit' variant='contained' color='primary' onClick={handleSubmit}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;