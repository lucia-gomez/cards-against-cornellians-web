import { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import Username from './Username';
import { Button } from 'react-materialize';
import Toast from './Toast';
import Gameplay from './Gameplay';

const Room = props => {
  const socket = props.socket;
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState();
  const [isHost, setHost] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [roundData, setRoundData] = useState();
  const [submissions, setSubmissions] = useState(null);
  const [roundResults, setRoundResults] = useState();

  useEffect(() => {
    socket.on('disconnect', () => {
      console.log('disconnecting');
      setHost(false);
      socket.emit('disconnection', props.room, name);
    });

    socket.on('user joined', (newPlayer, curPlayers) => {
      setPlayers(curPlayers);
      Toast(newPlayer + " joined the room", 3000);
    });

    socket.on('user left', (leftPlayer) => {
      console.log(leftPlayer, 'has left the room');
    });

    socket.on('room closed', () => navigate('/'));

    socket.on('start game', () => setGameInProgress(true));

    socket.on('new round', data => {
      setRoundData(data);
      setSubmissions(null);
      setRoundResults(null);
    });

    socket.on('everyone played', results => {
      setSubmissions(results);
    });

    socket.on('round results', data => {
      setRoundResults(data);
      Toast(data.winnerName + " won the round", 5000);
    });

    return function () {
      socket.off('user joined');
      socket.off('user left');
      socket.off('start game');
      socket.off('room closed');
      socket.off('disconnect');
      socket.off('new round');
      socket.off('everyone played');
      socket.off('round results');
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
    // TODO: check if game is already in progress
  }

  const startGame = () => {
    setGameInProgress(true);
    socket.emit('start game', props.room);
  }

  return (
    <>
      <Username socket={socket} room={props.room} submit={submitUsername} />
      <p>Room: {props.room}</p>
      {gameInProgress ? <Gameplay {...{ roundData, submissions, roundResults }} {...props} /> :
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