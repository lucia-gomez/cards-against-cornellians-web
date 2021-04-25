import styled from 'styled-components';

const CARD_HEIGHT = 225;
const CARD_WIDTH = 175;

const Card = styled.div.attrs(_ => ({
  className: "z-depth-2 game-card",
}))`
  display: inline-block;
  position: relative;
  height: ${CARD_HEIGHT}px;
  width: ${CARD_WIDTH}px;
  min-width: 175px;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-align: left;
  font-weight: bold;
`;

const WhiteCard = styled(Card)`
  background-color: white;
  color: ${props => props.isWild ? '#9e0b01' : 'black'};
  transition: transform 0.1s;
  ${props => props.selected ? 'box-shadow: 0 0 10px #9e0b01' : ''};

  :hover {
    ${props => props.disabled ? '' : 'transform: scale(1.05);'}
  }
`;

const BlackCard = styled(Card)`
  background-color: black;
  color: white;
`;

const CardGroup = styled.div.attrs(_ => ({
  className: "card-group"
}))`
  display: inline-block;
  margin: 0px 10px;
  border-radius: 10px;
  /* ${props => props.selected ? 'box-shadow: 0 0 10px #9e0b01' : ''}; */

  :hover {
    ${props => props.disabled ? '' : 'transform: scale(1.05);'}
  }

  & > .game-card {
    :hover {
      transform: unset;
    }
  }
`;

export { WhiteCard, BlackCard, CardGroup, CARD_HEIGHT, CARD_WIDTH };