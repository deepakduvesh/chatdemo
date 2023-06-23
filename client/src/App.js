import './App.css';
import Demo from './Demo';
import Login from './Login';
import Signup from './Signup';
import Room from './Room';
import io from "socket.io-client"
import { BrowserRouter as Router, Route, Routes,  BrowserRouter, Link } from 'react-router-dom';
import Chat from './Chat';

export const socket = io.connect("http://localhost:4000")

function HomePage() {
  return (
    <div className="App">
      <span>
      <h1>Welcome To My Chat App</h1>
      <div>
        <Link to = "/login">login here</Link>
      </div>
      <div>
      <Link to = "/signup">signup here</Link>
      </div>
      </span>
      
    </div>
  );
}

function App() {   
  return ( <div className="App">
    
<BrowserRouter>
  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/success"  element={<Demo/>} />
        <Route exact path="/login"  element={<Login/>} />
        <Route exact path="/room"  element={<Room/>} />
        <Route exact path="/chat"  element={<Chat/>} />
  </Routes>
</BrowserRouter>

  </div>
  );
  
}  
 
export default App; 

