import styled from 'styled-components';
import { useState } from 'react';
import { WhiteCard } from '../styles/Cards';
import Wildcard from './Wildcard';

const CardHand = styled.div`
  background-color: ${props => props.theme.medium};
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin: 20px;
`;

const Hand = props => {
  const [needWildcard, setNeedWildcard] = useState(false);

  const handleClick = i => {
    if (props.selected.includes(i)) {
      // deselect card
      props.setSelected(prev => prev.filter(x => x !== i));
    } else {
      // select new card
      if (props.selected.length < props.numBlanks) {
        // can still select cards, just select it
        props.setSelected(prev => [...prev, i]);
      } else {
        // need to bump oldest selection, add new one
        props.setSelected(prev => {
          return [...prev, i].slice(1, prev.length + 1);
        });
      }
      if (props.cards[i].isWild) {
        setNeedWildcard(true);
      }
    }
  }

  /*  
    Map card number to wildcard text
  */
  const submitWildcard = text => {
    props.setWildcards(prev => ({
      ...prev,
      [props.selected[props.selected.length - 1]]: text
    }));
    setNeedWildcard(false);
  }

  /* 
    Remove wildcard number => text mapping, and deselect card
  */
  const cancelWildcard = () => {
    setNeedWildcard(false);
    props.setWildcards(prev => { delete prev[props.selected[props.selected.length - 1]]; return prev })
    props.setSelected(prev => prev.slice(0, prev.length - 1));
  }

  return (
    <CardHand isJudge={props.isJudge}>
      {needWildcard ? <Wildcard submit={submitWildcard} cancel={cancelWildcard} /> : null}
      {props.cards.map((card, i) =>
        <WhiteCard
          selected={props.selected.includes(i)}
          isWild={i in props.wildcards}
          onClick={props.isJudge ? undefined : () => handleClick(i)}
          disabled={props.isJudge}
          key={i}>
          {i in props.wildcards ? props.wildcards[i] : card.text}
        </WhiteCard>
      )}
    </CardHand>
  );
};

export default Hand;