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
      <img src="/logo192.png" alt="Chat App Logo" className="logo" />
      <h1>Welcome To My Chat App</h1>
      <p>Join the conversation and connect with people around the world!</p>
      <div className="link-container">
        <Link to="/login" className="link">Login here</Link>
      </div>
      <div className="link-container">
        <Link to="/signup" className="link">Signup here</Link>
      </div>
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

