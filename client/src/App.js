import './App.css';
import io from "socket.io-client"
import {useEffect,useState} from "react";
const socket = io.connect("http://localhost:4000")
function App() {
    const [room, setRoom] = useState("");
    const [message ,setMessage] = useState("");
    const [messageReceived ,setMessageReceived] = useState("");

    const joinRoom=()=>{
      if(room!==""){
        socket.emit("join_room",room);
      }
    }

const sendMessage = ()=>{
  //send_message ek event is jise hm bhej rahe hn
    // socket.emit("send_message",{message:"hello"}) 
    socket.emit("send_message",{message,room}) 
} 

useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageReceived(data.message)
    })
},[socket])

  return  <div className="App">
    
    <input placeholder ="Room Number" onChange={(event)=>{
      setRoom(event.target.value);
    }}/>
    <button onClick={joinRoom}>join room</button>

    <input placeholder ="message" onChange={(event)=>{
      setMessage(event.target.value);
    }}/>

    <button onClick={sendMessage}>send message</button>
    <h1>message:</h1>
    {messageReceived}
  </div>;

} 
 
export default App; 
