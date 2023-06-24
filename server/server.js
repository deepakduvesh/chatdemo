import { app } from "./index.js"
import  {connectDB}  from "./data/database.js";
import http from "http"
import {server} from "./index.js"
connectDB();

server.listen(process.env.PORT,()=>{
    console.log("server is working")
})