import express  from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})
 

io.on("connection",(socket)=>{
    console.log(`user connected : ${socket.id}`)

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log("user:",socket.id, " room is" ,data)
    }) 

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
        // console.log(data)
    })
    
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
})
   
server.listen(4000,()=>{
    console.log("server is working");
})