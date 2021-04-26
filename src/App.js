import './App.css';
import 'materialize-css';
import { ThemeProvider } from 'styled-components';

import { useState } from 'react';
import { io } from 'socket.io-client';
import { Router } from '@reach/router';
import ChooseRoom from './components/ChooseRoom';
import Room from './components/Room';
import Home from './components/Home';

const socket = io();

function App() {
  const [room, setRoom] = useState(sessionStorage.getItem('cac-room-name'));

  const theme = {
    bg: "#ddd",
    text: "#1a1a1a",
    red: "#b71c1c",
  };

  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Home path="/" />
          <ChooseRoom path="/rooms" socket={socket} setRoom={setRoom} />
          <Room path="/play" socket={socket} room={room} />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
