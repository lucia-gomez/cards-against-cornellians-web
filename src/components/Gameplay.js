import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button } from 'react-materialize';
import { BlackCard } from '../styles/Cards';
import Hand from "./Hand";

const Gameplay = props => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [wildcards, setWildcards] = useState({});
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    setCards(props.roundData ? props.roundData.whiteCards : []);
  }, [props.roundData]);

  const socket = props.socket;
  const d = props.roundData;

  if (!d) {
    return null;
  }

  const submitCards = () => {
    socket.emit('submit cards', props.room, selected, wildcards, newCards => {
      setHasPlayed(true);
      setCards(newCards);
      setWildcards({})
      setSelected([]);
    });
  }

  return (
    <>
      <BlackCard>{d.blackCard.text}</BlackCard>
      {Hand(d.whiteCards, d.blackCard.numBlanks)}
      {d.isJudge || hasPlayed ? null : <Button onClick={submitCards}>Submit Cards</Button>}
      <Hand
        cards={cards}
        numBlanks={d.blackCard.numBlanks}
        isJudge={d.isJudge || hasPlayed}
        {...{ selected, setSelected, wildcards, setWildcards }}
      />
    </>
  );
}

export default Gameplay;