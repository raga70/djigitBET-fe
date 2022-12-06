import * as React from 'react';
import {over} from "stompjs";
import SockJs from "sockjs-client";


import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useStoreState} from "../../security/persistenceAuthProvider";
import PlayerResponceDTO from "../DTO/PlayerResponceDTO";
import axios from "axios";
import {axiosAuthConfig, BaseUrl} from "../../app.properties";
import {useNavigate} from "react-router-dom";

let stompClient = null;
export default function GroupChatPage() {
    
    const userFromLocalStorage : PlayerResponceDTO = useStoreState('user');
    let Bearer = useStoreState('authToken');
    const navigate = useNavigate();
    const [eventMessage, setEventMessage] = useState([]);
    const [chatMessage, setChatMessage] = useState([]);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({
        sender: '',
        connected: false,
        content: ''
    });

   if (Bearer === null || Bearer === undefined) {
       navigate('/login');
    }

    useEffect(() => {
        fetchOldMessages();
    }, []);
    
    
    const connect =()=>{
        var socket = new SockJs(BaseUrl+'/ws');
        stompClient = over(socket);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/topic/public', onMessageReceived);
        userJoin();
      //  fetchOldMessages();
    }

    const userJoin=()=>{
        stompClient.send("/chatt/chat.register",
            {},
            JSON.stringify({sender: userFromLocalStorage.name, type: 'JOIN'})
        )
    }
    
    
    const  fetchOldMessages=async ()=>{
        let pageNumber = 0;
        try {
            let res = await axios.get(BaseUrl + "/chat/getoldmsgpaged/" + pageNumber + "/50", axiosAuthConfig(Bearer))
        setChatMessage(res.data);
        } catch (e) {
            console.log("fetching old msg error"+ e);
            if (e.response.status === 401) {
                navigate('/login');
            }
        }
    }
    
    
    
    const onMessageReceived = (payload)=> {
        let message = JSON.parse(payload.body);
        if (message.type === 'JOIN') {
            eventMessage.push(message);
            message.content = message.sender + ' joined!';
            setEventMessage([...eventMessage]);
        } else if (message.type === 'LEAVE') {
            eventMessage.push(message);
            message.content = message.sender + ' left!';
            setEventMessage([...eventMessage]);
        } else {
            chatMessage.push(message);
            setChatMessage([...chatMessage]);
        }
    }

    const onMessageSend = ()=> {
        if (stompClient) {
            const chatMessage = {
                sender: userFromLocalStorage.name,
                content: message,
                type: "CHAT"
            };
            console.log(chatMessage);
            stompClient.send("/chatt/chat.send", {}, JSON.stringify(chatMessage));
            //setUserData({...userData, "message": ""});
            setMessage('');
        }
    }
    


 

   
    
    
    const hanleSendBTN = ()=>{
        if (stompClient == null) {
            connect();
        }
            onMessageSend();
        
    }
    
    
    return(
        <>
            <br/>
            <br/><br/><br/> 
        <Box>
            <Paper style={{margin:"0 auto", maxWidth:800}} elevation={24}>
                <Paper style={{maxHeight:"65%", overflowY:"scroll"}}>
                {chatMessage.map((message) =>{
                    if (message.sender === userFromLocalStorage.name) {
                        return (
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <div style={{backgroundColor: "#1976d2", color: "white", padding: 10, margin: 10, borderRadius: 10}}>
                                    {message.content}
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div style={{display: "flex", justifyContent: "flex-start"  
                                }}>
                                {/*<div style={{backgroundColor: "#f88f51", color: "white", padding: 10, margin: 10, marginRight:-19, borderRadius: 10}}>*/}
                                {/*    {message.sender} peshooo:*/}
                                {/*</div>*/}
                                <div style={{backgroundColor: "#F05C05", color: "white", padding: 10, margin: 10, borderRadius: 10}}>
                                    <b><i><small>{(message.sender == null)? <>admin</>:<>{message.sender}</>}:</small></i></b>  {message.content} {/*TODO:SECURITY RISK admin impersonation*/}
                                </div>
                            </div>
                        )
                    }
                })}</Paper>
                <div style={{display: "flex", flexDirection:"row" ,  justifyContent: "flex-start"
                }}>
                <TextField sx={{width:"80%", textAlign:"left"}} value={message} onChange={(e)=>{setMessage(e.target.value)}}></TextField>
                    <Button sx={{width:"20%"}} variant="contained" onClick={hanleSendBTN}>Send</Button>
                </div>
                
                
            </Paper>
        </Box>
    
        </>)
    
    
}

