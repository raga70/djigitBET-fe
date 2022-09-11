import React from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link, Hidden} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {NavLink} from "react-router-dom";


function showForgotPass() {
    let y = document.getElementsByClassName('hdn');
    y[0].style.display = 'block';
}

const Login=()=>{

 
    
    const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <br/>
                <br/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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