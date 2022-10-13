import * as React from 'react';
import {useEffect, useState} from 'react';

import {Button, Paper, styled, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import {deleteUser, getUsers} from './api';
import {useNavigate} from 'react-router-dom';
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditUser from "./EditUser";
import {useStoreState} from "../../../security/persistenceAuthProvider";
import {GlobalLogout} from "../../../security/persistenceLogOut";

const StyledTable = styled(Table)`
  width: 100%;
  margin: 0 auto;
  //  margin-left: -10% !important;
`;

const THead = styled(TableRow)`
  & > th {

    font-size: 20px;
    background: #FFFFFF;
    color: #1976d2;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px
  }
`;

//Master component
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [inputVal, setInputVal] = useState("")
    const [filtered, setFiltered] = useState([])

    const [selUserEdit, setSelUserEdit] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    let Bearer = useStoreState('authToken');
    const navigate = useNavigate();


    const getAllUsers = async () => {
        try {
            var response = await getUsers(Bearer)
            if (response.status === 401) {
                GlobalLogout();
                navigate('/login');
            }
            setUsers(response.data);
            setFiltered(response.data);
        } catch (e) {
            console.error('Component:AllUsers.jsx , method getAll -- error with axion when gettingAllUsers', e);
        }
    }


    let brUseEfect = 0;
    useEffect(() => {
        if (users.length != 0) return;
        if (brUseEfect > 0) return;
        getAllUsers();

        brUseEfect++; //ignore unnecessary useEffect calls
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(Bearer, id);

        setUsers(users.filter((user) => user.userID !== id)); //lol what a fucked up way to delete an element from an array in js ()
    }


    const changeInputVal = (e) => {
        e.preventDefault()
        setInputVal(e.currentTarget.value)
    }


    useEffect(() => {
        if (users.length === 0) return;
        if (!inputVal) {
            setFiltered(users);
            return;
        }
        const filteredData = users.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(inputVal.toLowerCase())))
        setFiltered(filteredData)
    }, [inputVal])


    return (
        <>
            <Paper elevation={3} sx={{padding: '10px 10px', width: 600, margin: '20px auto'}}>
                <FindInPageIcon fontSize={"large"} sx={{display: {xs: 'none', md: 'flex'}, mr: 1,}}/>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField id="standard-basic" sx={{paddingBottom: 2}} variant="standard" label="Search" type="text"
                               value={inputVal} onChange={changeInputVal}/>
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
                        filtered.map((user) => {
                                return (
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
                                            <Button color="primary" variant="contained"
                                                    style={{marginRight: 10, marginBottom: 9}} onClick={() => {
                                                setSelUserEdit(user);
                                                setModalOpen(true)
                                            }}>Edit</Button>
                                            <Button color="secondary" variant="contained"
                                                    onClick={() => deleteUserData(user.userID)}>Delete</Button>
                                        </TableCell>
                                    </TRow>
                                )
                            }
                        )


                    }
                </TableBody>
                <EditUser passedUser={selUserEdit} modalOpen={modalOpen} setModalOpen={setModalOpen} UsersArr={users}
                          setUsersArr={setUsers}/>
            </StyledTable>
        </>

    )
}

export default AllUsers;