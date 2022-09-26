import React, {useContext, useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link, Hidden} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {NavLink, useNavigate} from "react-router-dom";
//import AuthManager from "../../security/AuthProvider";
import axios from 'axios';
import {BaseUrl, LoginUrl} from "../../app.properties";
import {setGlobalState} from "../../security/AuthProvider";
//import {Navigate} from "react-router-dom";

function showForgotPass() {
    let y = document.getElementsByClassName('hdn');
    y[0].style.display = 'block';
}




const Login=()=>{

 
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

   // const {AuthProvider,setAuthPrivder} = AuthManager()
    
    const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const navigate = useNavigate();


var debug ;
var accessToken;
var role ;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${BaseUrl}${LoginUrl}`, {username, password  }).then((response) => {
                 accessToken = response.headers?.authorization ;  //TODO: remove Barier from token in backend
                 role = response.headers?.role;
                    setGlobalState('AuthToken', accessToken);
                    setGlobalState('AuthRole', role);
                    setGlobalState('User', response.data);
                   if (response.status === 200) {
                    navigate('/');
                }else if (response.status === 400) {
                    setErrMsg('Invalid username or/and password');
                }else if (response.status === 401) {
                    setErrMsg('Unauthorized');
                }
                   
            }
            
            );
          
          //  console.log(JSON.stringify(response?.data)); //remove
         
            setUsername('');
            setPassword('');
            
        } catch (err) {
            console.log(err);
            
           // errRef.current.focus();
        }
    }
    
    
    
    
    
    
    
    
    
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                    <h1 style={{color:"red"}}>{errMsg}</h1>
                </Grid>
                <TextField label='Username' onChange={(e) => setUsername(e.target.value)}
                           value={username} placeholder='Enter username' fullWidth required/>
                <br/>
                <br/>
                <TextField label='Password' onChange={(e) => setPassword(e.target.value)}
                           value={password} placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' onClick={handleSubmit} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Button onClick={showForgotPass} >
                        Forgot password ?
                    </Button>
                    <div className={"hdn"} style={{display:"none"}}>
                        The Casino does NOT return money, bye 😉 !
                        <br/>
                        <br/>
                    </div>
                </Typography>
                <Typography > Do you have an account ?
                    <NavLink to={'/register'}>
                        Sign Up
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login