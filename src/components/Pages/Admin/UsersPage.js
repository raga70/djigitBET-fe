import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import {Paper} from "@mui/material";
import FindInPageIcon from '@mui/icons-material/FindInPage';

// import UserMNGtable from "../../elements/UserMNGtable";

  
export default function User() {
  return (
      <Container>
        <Paper elevation={3} sx={{padding: '50px 20px', width:800, margin:'20px auto'}}>
        <FindInPageIcon fontSize={"large"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,  }}/>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
      
      <TextField id="standard-basic" label="username" variant="standard" />
        <TextField id="standard-basic" label="email" variant="standard" />
        <TextField id="standard-basic" label="name" variant="standard" />
    </Box></Paper>
      {/*<UserMNGtable/>*/}
      
      </Container>
      
      
  );
}
