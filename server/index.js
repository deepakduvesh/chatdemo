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
    })
    //send_message ek event h jise client ne bheja h or ise yaha listen kiya ja raha h
    socket.on("send_message",(data)=>{
        // console.log(data);
        //ab jo data client ne bheja h use m sabhi clients ko bhejunga
        // socket.broadcast.emit("receive_message",data);
        socket.to(data.room).emit("receive_message",data);
    })
})
   
// app.get("/",(req,res)=>{
//     res.send("sab mst");
// }) 
 
server.listen(4000,()=>{
    console.log("server is working");
})