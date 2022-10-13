import React, {useEffect, useState} from 'react'
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';
import {LoginUrl} from "../../app.properties";
import {dispatch} from "../../security/persistenceAuthProvider";


function showForgotPass() {
    let y = document.getElementsByClassName('hdn');
    y[0].style.display = 'block';
}


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const paperStyle = {padding: 20, height: '70vh', width: 380, margin: "20px auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const btnstyle = {margin: '8px 0'}
    const navigate = useNavigate();


    var debug;
    var accessToken;
    var role;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${LoginUrl}`, {username, password}).then((response) => {
                    accessToken = response.headers?.authorization;
                    role = response.headers?.role;

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

                }
            );

            setUsername('');
            setPassword('');

        } catch (e) {
            if (e.response.status === 400 || e.response.status === 0) {
                setErrMsg('Invalid username or/and password');
            } else if (e.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                console.log(err);
                setErrMsg('Something went wrong');
            }
        }


    }


    useEffect(() => {
        setErrMsg('');

    }, [username, password])


    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                    <h1 style={{color: "red"}}>{errMsg}</h1>
                </Grid>
                <TextField label='Username' onChange={(e) => setUsername(e.target.value)}
                           value={username} placeholder='Enter username' fullWidth required/>
                <br/>
                <br/>
                <TextField label='Password' onChange={(e) => setPassword(e.target.value)}
                           value={password} placeholder='Enter password' type='password' fullWidth required/>

                <Button type='submit' onClick={handleSubmit} color='primary' variant="contained" style={btnstyle}
                        fullWidth>Sign in</Button>
                <Typography>
                    <Button onClick={showForgotPass}>
                        Forgot password ?
                    </Button>
                    <div className={"hdn"} style={{display: "none"}}>
                        The Casino does NOT return money, bye 😉 !
                        <br/>
                        <br/>
                    </div>
                </Typography>
                <Typography> Do you have an account ?
                    <NavLink to={'/register'}>
                        Sign Up
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login