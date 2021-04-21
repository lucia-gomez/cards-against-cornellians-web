import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button } from 'react-materialize';
import { BlackCard } from '../styles/Cards';
import Hand from "./Hand";
import Results from './Results';

const ResultsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 20px;
`;

const Gameplay = props => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [wildcards, setWildcards] = useState({});
  const [hasPlayed, setHasPlayed] = useState(false);
  const [judgeSelected, setJudgeSelected] = useState(null);

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

  const chooseWinner = () => {
    socket.emit('choose winner', props.room, judgeSelected);
  }

  return (
    <>
      <ResultsSection>
        <BlackCard>{d.blackCard.text}</BlackCard>
        {props.results !== null ?
          <Results
            results={props.results}
            isJudge={d.isJudge}
            {...{ judgeSelected, setJudgeSelected }}
          />
          : null}
      </ResultsSection>
      {d.isJudge ? <Button onClick={chooseWinner}>Select Winner</Button> : null}
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