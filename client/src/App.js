import './App.css';
import Chat from './Chat';
import io from "socket.io-client"
import {useEffect,useState} from "react";
  
const socket = io.connect("http://localhost:4000")
function App() {
    const [username,setusername] = useState("");
    const [room,setroom] = useState("");
    const [showchat,setshowchat] = useState(false);
 
    const joinroom = ()=>{
      if(username!=="" && room!==""){
        socket.emit("join_room",room) 
        setshowchat(true);  
      }  
    }  
  return ( <div className="App">
    {!showchat?(
      <div className="joinChatContainer">
    <h3>join a chat</h3>
    <input type="text" placeholder='name' 
     onChange={(event)=>{setusername(event.target.value)}}/>
    <input type="text" placeholder='roomId'
     onChange={(event)=>{setroom(event.target.value)}} />
    <button onClick={joinroom}>join a room</button>
    </div>
    ):(

     <Chat socket={socket} username={username} room={room} />
    )}

  </div>);

}  
 
export default App; 
 