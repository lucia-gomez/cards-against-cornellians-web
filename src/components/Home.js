import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Room = styled(Link)`
  background-color: #ccc;
  border: 1px black solid;
  padding: 5px;
  margin: 5px;
  width: 200px;
`;

const Home = props => {
  const socket = props.socket;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on('connect', function () {
      socket.emit('connection', setRooms);
    });
    socket.on("new room", r => {
      setRooms(r)
    });
    return function () {
      socket.off('new room');
    }
  }, []);

  const handleCreateRoom = () => {
    socket.emit('create room', props.setRoom);
  }

  return (
    <div>
      <p>Cards Against Cornellians</p>
      <Room to="/play"
        onClick={() => {
          handleCreateRoom();
        }}>Create Room</Room>
      <ul>
        {rooms.map((room, i) =>
          <Room onClick={() => {
            props.setRoom(room);
          }} to="/play" key={i}>{room}</Room>
        )}
      </ul>
    </div>
  );
}

export default Home;
