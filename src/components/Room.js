import { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import Username from './Username';
import { Button } from 'react-materialize';

const Room = props => {
  const socket = props.socket;
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState();
  const [isHost, setHost] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);

  useEffect(() => {
    socket.on('disconnect', () => {
      console.log('disconnecting');
      setHost(false);
      socket.emit('disconnection', props.room, name);
    });

    socket.on('user joined', (newPlayer, curPlayers) => {
      setPlayers(curPlayers);
      window.M.toast({ html: newPlayer + " joined the room", displayLength: 3000, classes: 'toast' });
    });

    socket.on('user left', (leftPlayer) => {
      console.log(leftPlayer, 'has left the room');
    });

    socket.on('start game', () => setGameInProgress(true));

    return function () {
      socket.off('user joined');
      socket.off('user left');
      socket.off('start game');
    }
  }, [])

  const submitUsername = n => {
    setName(n);
    sessionStorage.setItem('cac-username', n);
    sessionStorage.setItem('cac-room-name', props.room);
    socket.emit('join room', props.room, n, sessionStorage.getItem('cac-room-token'), data => {
      setPlayers(data.players);
      setHost(data.isHost);
      sessionStorage.setItem('cac-room-token', data.token);
    });
  }

  const startGame = () => {
    setGameInProgress(true);
    socket.emit('start game', props.room);
  }

  if (!props.room) {
    navigate('/');
    return "Go back to the home page";
  }

  return (
    <>
      <Username socket={socket} room={props.room} submit={submitUsername} />
      <p>Room: {props.room}</p>
      {gameInProgress ? null :
        <>
          <ul>
            {players.map((p, i) =>
              <li key={i}>{p}</li>
            )}
          </ul>
          {isHost ? <Button onClick={startGame}>Start game</Button>
            : "Waiting for the host to start the game..."}
        </>
      }
    </>
  )
}

export default Room;