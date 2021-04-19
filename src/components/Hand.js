import styled from 'styled-components';
import { WhiteCard } from '../styles/Cards';

const CardHand = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const Hand = cards => {
  return (
    <CardHand>
      {cards.map((card, i) =>
        <WhiteCard key={i}>
          {card}
        </WhiteCard>
      )}
    </CardHand>
  );
};

export default Hand;