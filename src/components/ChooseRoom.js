import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Nav from './Nav';
import { PageColor } from '../styles/Page';
import { Button } from '../styles/Button';
import { CardPanel } from 'react-materialize';
import PageWrapper from './PageWrapper';

const Container = styled(PageColor)`
  display: grid;
  grid-template-rows: 200px 1fr;
  padding-top: 75px;
`;

const TopRow = styled.div.attrs(_ => ({
  className: "container"
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.medium}60;
`;

const BottomRow = styled.div.attrs(_ => ({
  className: "container"
}))`
  background-color: ${props => props.theme.medium}60;
  margin: 20px auto;
`;

const RoomItem = styled(CardPanel)`
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.bg};
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
    <PageWrapper>
      <Nav />
      <Container>
        <TopRow>
          {createBtn}
        </TopRow>
        <BottomRow>
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
        </BottomRow>
      </Container>
    </PageWrapper>
  );
}

export default ChooseRoom;
