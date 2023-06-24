import express  from "express";
import cookieParser from "cookie-parser";
import http from "http";
import userRouter from "./routes/user.js";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"
import  {connectDB}  from "./data/database.js";
import { config } from "dotenv";
// import { Client } from "socket.io/dist/client";
export const app = express();

config({
    path:"./data/config.env"
})             
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 

app.use(cors());
userRouter.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
export const server = http.createServer(app);
const io = new Server(server,{  
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
}) 
  
app.get("/",(req,res)=>{ 
    res.send("working")
})

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "client/build")));

// Add a catch-all route for the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

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
     
 

