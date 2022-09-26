import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import {Paper} from "@mui/material";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AllUsers from "../../elements/AccountManengment/AllUsers";
import {useGlobalState} from "../../../security/AuthProvider";
import {useNavigate} from "react-router-dom";
import HomePage from "../HomePage";

// import UserMNGtable from "../../elements/UserMNGtable";

  
export default function UsersManengmentPage() {
    const navigate = useNavigate();
 if (useGlobalState('AuthRole')[0] === "ADMIN") {
  return (

      <div>
      <AllUsers/>
          <br/>
          <br/>
      </div>
      
      
      
  );
    }else{ 
     return ( <HomePage/>)
 }
}
