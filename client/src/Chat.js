import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"

function Chat({socket,username,room}) {
const [currentmessage,setcurrentmessage] = useState("");
const [msglist,setmsglist] = useState([])
const sendmessage = async()=>{
  if(currentmessage!==""){
    const messagedata = {
      room:room,
      author:username,
      message:currentmessage,
      time:new Date(Date.now()).getHours()+":"+
      new Date(Date.now()).getMinutes()
    }
    await socket.emit("send_message",messagedata);
    setmsglist((list)=>[...list,messagedata]);
    //ye currentmsg m jo value set h use empty kr dega
    //iske liye input tag m value (currentmessage) dena jarrori h
    setcurrentmessage("")
  }
}

useEffect(()=>{
  socket.on("receive_message",(data)=>{
    console.log(data); 
    setmsglist((list)=>[...list,data]);
  }) 
  return () => {
    socket.off("receive_message");
  };
},[socket]);

// useEffect(() => {
//   const handleReceiveMessage = (data) => {
//     console.log(data);
//     setmsglist((list) => [...list, data]);
//   };

//   socket.on("receive_message", handleReceiveMessage);

//   return () => {
//     socket.off("receive_message", handleReceiveMessage);
//   };
// }, [socket]);


  return (
    <div className="chat-window">
      <div className='chat-header'>
        <p>Live chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className="msg-container">
        {msglist.map((msgcontent)=>{
          return(
            <div className="message" id={username === msgcontent.author ? "you" : "other"}> 
              <div>
                <div className="message-content">
                  <p>{msgcontent.message}</p>
                </div>
                <div className="message-meta">
                  <p>{msgcontent.time}</p>
                  <p>{msgcontent.author}</p>
                </div>
              </div>

            </div>
          )
        })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='send msg here' value={currentmessage}
        onChange={(event)=>{setcurrentmessage(event.target.value)}}
        onKeyPress={(event)=>{event.key==="Enter" && sendmessage();}}/>
        <button onClick={sendmessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
