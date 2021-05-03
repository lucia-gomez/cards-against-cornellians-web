import styled, { css } from 'styled-components';
import { WhiteCard, CARD_HEIGHT, CARD_WIDTH, CARD_MARGIN } from '../styles/Cards';

const Container = styled.div`
  opacity: 0.1;
  position: absolute;
  z-index: 1;
`;

const Loop = styled.div`
  animation: ${props => 'loop-anim' + props.idx} 20s linear infinite;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  right: ${props => props.idx % 2 === 0 ? '0' : '50%'};

  @keyframes ${props => 'loop-anim' + props.idx} {
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: ${props => props.idx % 2 === 0 ? '-50%' : '50%'};
    }
}
`;

const scaleCard = css`
  height: ${props => props.scale * CARD_HEIGHT}px;
  width: ${props => props.scale * CARD_WIDTH}px;
  min-width: ${props => props.scale * CARD_WIDTH}px;
  padding: 10px;
`;

const ScrollWhiteCard = styled(WhiteCard)`
  ${scaleCard}
  font-size: 2vh;
`;

const GapCard = styled(WhiteCard)`
  ${scaleCard}
  background-color: unset;
`;

const texts1 = [
  "Martha's Bits and Bytes",
  "Touchdown's fursuit",
  "Being woken up at an ungodly hour by the chimes",
  "Riding the TCAT for one stop instead of walking 200ft",
  "Actually calling CTB 'Collegetown Bagels'",
  "Failing your swim test just for fun",
  null,
  null,
  null,
  "AlcoholEDU",
  "Ruth Bader Ginsburg",
];

const texts2 = [
  "Forgetting you enrolled in a class",
  "Ordering the same thing at CTB for 4 years",
  "Denise Cassaro",
  null,
  null,
  null,
  "President Ryan Lombardi",
  "HADM 4300: Introduction to Wines",
  "Depressing Reddit posts",
  "The Daily Sun",
  "Arriving at Ithaca airport only to discover that your flight has been cancelled",
];

const texts3 = [
  "Networking events",
  null,
  null,
  null,
  "Willard Straight popcorn",
  "Stealing the free condom bowl from Cornell Health",
  "Low Rise 7",
  "Shotgunning a beer next to your unfinished problem set",
  "Natty Light",
  "Harry Potter Wizarding Weekend",
  "Going to class with -30 degree windchill",
];

const texts = [texts1, texts2, texts3];

const getRow = texts => texts.map((text, i) => {
  const scale = (window.innerHeight / 3) / (CARD_HEIGHT + 2 * CARD_MARGIN);
  if (text === null) {
    return <GapCard key={i} scale={scale} />
  }
  return <ScrollWhiteCard key={i} scale={scale}>{text}</ScrollWhiteCard>;
});

const ScrollingCards = () => {
  return (
    <Container>
      <div>
        {texts.map((textRow, i) => {
          const row = getRow(textRow);
          return (
            <Loop key={i} idx={i}>
              {row}
              {row}
            </Loop>
          );
        })}
      </div>
    </Container>
  );
}

export default ScrollingCards;