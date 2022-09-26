import { useState, useEffect } from 'react';

import {Table, TableHead, TableCell, TableRow, TableBody, Button, styled, Paper} from '@mui/material'
import { getUsers, deleteUser } from './api';
import { Link } from 'react-router-dom';
import Container from "@mui/material/Container";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import EditUser from "./EditUser";

const StyledTable = styled(Table)`
    width: 100%;
    margin: 0 auto;
  //  margin-left: -10% !important;
`;
//TODO: update the users array to reflect changes done when a users is edited and deleted aka on delete remove by id on update change data
const THead = styled(TableRow)`
    & > th {

        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [inputVal, setInputVal] = useState("")
    const [filtered, setFiltered] = useState([])

    const[selUserEdit, setSelUserEdit] = useState([]);
    const[modalOpen, setModalOpen] = useState(false);

    
    
    
    
    const getAllUsers = async () => {
        console.log("the asyn function is called")
        let response = await getUsers();
        setUsers(response.data);
        setFiltered(response.data);
        console.log("in async the data returned")
        console.log(response.data);

    }
    
    
    
    
    
    
    
    
    
    useEffect(() => {
        if ( users.length != 0) return;
        getAllUsers()
       console.log("getALLUsers was called")
        
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        
        setUsers(users.filter((user) => user.userID !== id)); //lol what a fucked up way to delete an element from an array in js ()
       // getAllUsers();
    }

   





   



  

    const changeInputVal = (e) => {
        e.preventDefault()

        console.log("Input value: ", inputVal)
        setInputVal(e.currentTarget.value)
    }

    useEffect( () => {
        console.log("the filter`s use effect was called")
        if ( users.length === 0) return;
        if (!inputVal ) {
            setFiltered(users)

            return
        }


        const filteredData = users.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(inputVal.toLowerCase())))
        setFiltered(filteredData)
    }, [inputVal])
    
  
    

    return (

   
            
        <div>
            <Paper elevation={3} sx={{padding: '10px 10px', width:600, margin:'20px auto'}}>
                <FindInPageIcon fontSize={"large"} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,  }}/>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">
            <TextField id="standard-basic" sx={{paddingBottom:2}}  variant="standard" label="Search" type="text" value={inputVal} onChange={changeInputVal} />
                </Box></Paper>
            
            
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>id</TableCell>
                    <TableCell>AccountType</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>WinCoefficient</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>NationalIDNumber</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    filtered.map((user) =>{ return (
                            <TRow key={user.userID}>
                                <TableCell>{user.userID}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>{user.name} {user.surname}</TableCell>
                                <TableCell>{user.winCoefficient}</TableCell>
                                <TableCell>{user.balance}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>{user.nationalIDNumber}</TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" style={{marginRight:10, marginBottom:9}} onClick={()=>{setSelUserEdit(user); setModalOpen(true)}}  >Edit</Button>
                                    <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Delete</Button>
                                </TableCell>
                            </TRow>
                        )}
                    )


                
                
                }
            </TableBody>
    
            
            <EditUser passedUser={selUserEdit} modalOpen={modalOpen}  setModalOpen={setModalOpen} UsersArr={users} setUsersArr={setUsers} />
            
        </StyledTable>     
            
            
            
            
            
            
            
            
        </div>

    )
}

export default AllUsers;