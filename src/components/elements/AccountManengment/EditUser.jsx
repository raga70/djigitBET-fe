import { useState, useEffect } from 'react';

import {FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Modal} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {getUsers, editUser, getUser} from './api';
import allUsers from "./AllUsers";
import Box from "@mui/material/Box";
import {useStoreState} from "../../../security/persistenceAuthProvider";

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 70%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 880,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};








const EditUser = (props) => {
    //not using a hook here because we want to preserve only a reference var  from the parent component
    var open = props.modalOpen;
    let Bearer = useStoreState('authToken');

    function handleClose() {
        props.setModalOpen(false);
    }
    
    
    
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (open === true) {
            setUser(props.passedUser);
        }
    }, [open]);
    
    
    
    const { id } = useParams();
    
    let navigate = useNavigate();

    // useEffect(() => {
    //     loadUserDetails();
    // }, []);
    //
    // const loadUserDetails = async() => {
    //     let response = await getUser(Bearer,id);
    //     setUser(response.data);
    // }

    const editUserDetails = async() => {
        const response = await editUser(Bearer,user.userID, user);

        var usertobeEditedINDEX = props.UsersArr.findIndex(x=>x.userID === user.userID);
        props.setUsersArr(props.UsersArr.splice(usertobeEditedINDEX, 1, user));        
       //TODO: ASK professor why it works only some times
        handleClose();
        console.log(user);
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
       <div>

           <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
           >
               <Box sx={style}>
           
           
            <Typography variant="h4">Edit Account</Typography>
                   <br/>
                   <br/>

            <FormControl sx={{marginBottom:10, marginRight:3}}>
                <InputLabel htmlFor="my-input">AccountType</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='type' value={user.type} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
          
            <FormControl sx={{marginBottom:10, marginRight:2}}>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={user.username} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl sx={{marginBottom:10, marginRight:2}}>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={user.email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl sx={{marginBottom:10, marginRight:2}}>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phoneNumber' value={user.phoneNumber} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
           <FormControl sx={{marginBottom:10, marginRight:2}}>
               <InputLabel htmlFor="my-input">NationalIDNumber</InputLabel>
               <Input onChange={(e) => onValueChange(e)} name='nationalIDNumber' value={user.nationalIDNumber} id="my-input" aria-describedby="my-helper-text" />
           </FormControl>
           <FormControl sx={{marginBottom:10, marginRight:2}}>
               <InputLabel htmlFor="my-input">Name</InputLabel>
               <Input onChange={(e) => onValueChange(e)} name='name' value={user.name} id="my-input" aria-describedby="my-helper-text" />
           </FormControl>
           <FormControl sx={{marginBottom:10, marginRight:2}}>
               <InputLabel htmlFor="my-input">Surname</InputLabel>
               <Input onChange={(e) => onValueChange(e)} name='surname' value={user.surname} id="my-input" aria-describedby="my-helper-text" />
           </FormControl>
           <FormControl >
               <InputLabel htmlFor="my-input">Balance</InputLabel>
               <Input onChange={(e) => onValueChange(e)} name='balance' value={user.balance} id="my-input" aria-describedby="my-helper-text" />
           </FormControl>
                   <br/>
                 
            <FormControl sx={{ marginRight:3}}>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
                   <FormControl >
                       <Button variant="contained" color="error" onClick={() => handleClose()}>Cancel</Button>
                   </FormControl>
               </Box>
           </Modal>
       </div>
    )
}
export default EditUser;
                   
                   
                   
                   

