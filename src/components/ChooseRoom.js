import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Nav from './Nav';
import { Button } from '../styles/Button';
import { CardPanel } from 'react-materialize';
import PageWrapper from './PageWrapper';

const Container = styled(PageWrapper)`
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
  background-color: ${props => props.theme.medium};
`;

const BottomRow = styled.div.attrs(_ => ({
  className: "container"
}))`
  background-color: ${props => props.theme.medium};
  margin: 20px auto;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RoomItem = styled(CardPanel)`
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;  
  margin: 10px;
  width: 150px;
  padding: 20px 5px;
  position: relative;
`;

const PlayerCount = styled.p`
  margin: 0px;
`;

const ChooseRoom = props => {
  const socket = props.socket;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit('connection', setRooms);
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
    <Container>
      <Nav />
      <TopRow>
        {createBtn}
      </TopRow>
      <BottomRow>
        <h5>Join a room</h5>
        <Grid>
          {rooms.length > 0 ? rooms.map(({ code, numPlayers, inProgress }) =>
            <Link key={code} to="/play">
              <RoomItem onClick={() => {
                props.setRoom(code);
              }}>
                {code}
                <PlayerCount>
                  {numPlayers}/10
                </PlayerCount>
              </RoomItem>
            </Link>
          ) : "No rooms found"}
        </Grid>
      </BottomRow>
    </Container>
  );
}

export default ChooseRoom;
