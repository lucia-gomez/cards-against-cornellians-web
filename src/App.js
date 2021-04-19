import './App.css';
import 'materialize-css';

import { useState } from 'react';
import { io } from 'socket.io-client';
import { Router } from '@reach/router';
import Home from './components/Home';
import Room from './components/Room';

const socket = io();

function App() {
  const [room, setRoom] = useState(sessionStorage.getItem('cac-room-name'));

  return (
    <div className="App">
      <Router>
        <Home path="/" socket={socket} setRoom={setRoom} />
        <Room path="/play" socket={socket} room={room} />
      </Router>
    </div>
  );
}

export default App;
