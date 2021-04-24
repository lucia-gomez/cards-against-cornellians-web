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
  const [inQueue, setInQueue] = useState(false);
  const [roundData, setRoundData] = useState();
  const [submissions, setSubmissions] = useState(null);
  const [roundResults, setRoundResults] = useState();

  useEffect(() => {
    socket.on('disconnect', () => {
      setHost(false);
      socket.emit('disconnection', props.room, name);
    });

    socket.on('user joined', (newPlayer, curPlayers) => {
      setPlayers(curPlayers);
      Toast(newPlayer + " joined the room", 3000);
    });

    socket.on('player list', curPlayers => {
      setPlayers(curPlayers);
    })

    socket.on('user left', (leftPlayer) => {
    });

    socket.on('room closed', () => navigate('/'));

    socket.on('start game', () => setGameInProgress(true));

    socket.on('new round', data => {
      setInQueue(false);
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
      setInQueue(false);
      if (data.gameOver) {
        setGameInProgress(false);
      }
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
      socket.off('player list');
    }
  }, [])

  const submitUsername = n => {
    setName(n);
    sessionStorage.setItem('cac-username', n);
    sessionStorage.setItem('cac-room-name', props.room);
    socket.emit('join room', props.room, n, sessionStorage.getItem('cac-room-token'), data => {
      setPlayers(data.players);
      setHost(data.isHost);
      setGameInProgress(data.inProgress);
      setInQueue(data.inQueue);
      sessionStorage.setItem('cac-room-token', data.token);
    });
  }

  const startGame = () => {
    setGameInProgress(true);
    socket.emit('start game', props.room);
  }

  const gameplay = <Gameplay {...{ roundData, submissions, roundResults }} {...props} />;

  const lobby = (
    <>
      <ul>
        {players.map((p, i) =>
          <li key={i}>{p}</li>
        )}
      </ul>
      {isHost ? <Button onClick={startGame}>Start game</Button>
        : "Waiting for the host to start the game..."}
    </>
  );

  const gameover = roundResults && roundResults.gameOver ? (
    <>
      <h2>{roundResults.winnerName} won the game</h2>
      <p>Play again?</p>
    </>
  ) : null;
  return (
    <>
      <Username socket={socket} room={props.room} submit={submitUsername} />
      <p>Room: {props.room}</p>
      {roundResults && roundResults.gameOver ? gameover : null}
      {inQueue ? 'You will be added to the game at the start of the next round' : null}
      {gameInProgress ? gameplay : lobby}
    </>
  )
}

export default Room;