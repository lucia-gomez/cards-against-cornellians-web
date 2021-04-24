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

const JudgeText = styled.h2`
  margin: auto;
`;

const Gameplay = props => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [wildcards, setWildcards] = useState({});
  const [hasPlayed, setHasPlayed] = useState(false);
  const [judgeSelected, setJudgeSelected] = useState(null);

  useEffect(() => {
    setCards(props.roundData ? props.roundData.whiteCards : []);
    setHasPlayed(false);
    setJudgeSelected(null);
  }, [props.roundData]);

  useEffect(() => {
    setJudgeSelected(props.roundResults ? props.roundResults.winningIndex : null);
  }, [props.roundResults]);

  const socket = props.socket;
  const d = props.roundData;

  if (!d) {
    return null;
  }

  const numBlanks = d.blackCard.numBlanks;

  const submitCards = () => {
    socket.emit('submit cards', props.room, selected, wildcards, newCards => {
      setHasPlayed(true);
      setCards(newCards);
      setWildcards({})
      setSelected([]);
    });
  }

  const chooseWinner = () => {
    socket.emit('choose winner', props.room, judgeSelected, gameOver => {
      if (!gameOver) {
        setTimeout(() => {
          socket.emit('play round', props.room);
        }, 5000);
      }
    });
  }

  const selectWinnerBtn = d.isJudge && props.submissions !== null && props.roundResults === null ?
    <Button disabled={judgeSelected === null} onClick={chooseWinner}>Select winner</Button> :
    null;

  const submitBtn = d.isJudge || hasPlayed ?
    null :
    <Button disabled={selected.length !== numBlanks} onClick={submitCards}>Submit cards</Button>

  const judgeTxt = props.submissions === null ?
    <JudgeText>{d.isJudge ? "You are" : d.judgeName + " is"} the judge</JudgeText> :
    null;

  return (
    <>
      <ResultsSection>
        <BlackCard>{d.blackCard.text}</BlackCard>
        {judgeTxt}
        {props.submissions !== null ?
          <Results
            submissions={props.submissions}
            isJudge={d.isJudge}
            {...{ judgeSelected, setJudgeSelected }}
          />
          : null}
      </ResultsSection>
      {selectWinnerBtn}
      {submitBtn}
      <Hand
        isJudge={d.isJudge || hasPlayed}
        {...{ selected, setSelected, wildcards, setWildcards, numBlanks, cards }}
      />
    </>
  );
}

export default Gameplay;