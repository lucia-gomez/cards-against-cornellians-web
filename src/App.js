import './App.css';
import 'materialize-css';
import { ThemeProvider } from 'styled-components';

import { useState } from 'react';
import { io } from 'socket.io-client';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { useTransition, animated } from 'react-spring';
import ChooseRoom from './components/ChooseRoom';
import Room from './components/Room';
import Home from './components/Home';

const socket = io();

function App() {
  const [room, setRoom] = useState(sessionStorage.getItem('cac-room-name'));

  const theme = {
    text: "#1a1a1a",
    medium: "#d8d8d8",
    bg: "#dddddd",
    red: "#b71c1c",
    lightRed: "#ef9a9a",
  };

  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);

  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate(100%, 0%)" },
    enter: { opacity: 1, transform: "translate(0%, 0%)" },
    leave: { opacity: 0, transform: "translate(-50%, 0%)" }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {transitions((props, item, key) =>
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route path="/rooms" >
                <ChooseRoom socket={socket} setRoom={setRoom} />
              </Route>
              <Route path="/play" >
                <Room socket={socket} room={room} />
              </Route>
              <Route exact path="/" >
                <Home />
              </Route>
            </Switch>
          </animated.div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
