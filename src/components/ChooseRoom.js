import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Nav from './Nav';
import Page from '../styles/Page';
import { Button } from '../styles/Button';
import { CardPanel } from 'react-materialize';

const Container = styled(Page)`
  display: grid;
  grid-template-rows: 100px 1fr;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomItem = styled(CardPanel)`
  background-color: ${props => props.theme.medium};
  color: ${props => props.theme.text};
  display: inline-block;
  margin: 10px;
  width: 150px;
`;

const ChooseRoom = props => {
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

  const createBtn = (
    <Link to="/play">
      <Button onClick={() => {
        handleCreateRoom();
      }}>
        Create Room
      </Button>
    </Link>
  );

  return (
    <>
      <Nav />
      <Container>
        <TopRow>
          {createBtn}
        </TopRow>
        <div>
          <h5>Join a room</h5>
          {rooms.length > 0 ? rooms.map((room, i) =>
            <Link key={i} to="/play">
              <RoomItem onClick={() => {
                props.setRoom(room);
              }}>
                {room}
              </RoomItem>
            </Link>
          ) : "No rooms found"}
        </div>
      </Container>
    </>
  );
}

export default ChooseRoom;
