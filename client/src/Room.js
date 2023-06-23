import React from 'react'
import io from "socket.io-client"
import Chat from "./Chat.js"
import {socket} from './App.js';
import { BrowserRouter as Router, Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import {useEffect,useState} from "react";
function Room() {
    const navigate = useNavigate()
    const [room,setroom] = useState("");
    const [showchat,setshowchat] = useState(false);
 
    const joinroom = ()=>{
      if( room!==""){ 
        const data = {
            room:room,
        }
        sessionStorage.setItem("roomid",JSON.stringify(data))
        socket.emit("join_room",room)  
        setshowchat(true);   
      }  
    } 
    const data = sessionStorage.getItem("logindata")
    console.log(data)
  return (
    <div>

        { data?( !showchat?(
      <div className="joinChatContainer">
    <h3>join a chat</h3>
    <input type="text" placeholder='roomId'
     onChange={(event)=>{setroom(event.target.value)}} />
    <button onClick={joinroom}>join a room</button>
    </div>
    ):(
    <Navigate to="/chat"/>
    )):(
<Navigate to="/login"/>
    )
        }      
    </div>
  )
}
export default Room
