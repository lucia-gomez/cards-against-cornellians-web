import { BlackCard } from '../styles/Cards';
import Hand from "./Hand";

const Gameplay = props => {
  const d = props.roundData;
  if (!d) {
    return null;
  }

  return (
    <>
      <BlackCard>{d.blackCard.text}</BlackCard>
      {Hand(d.whiteCards, d.blackCard.numBlanks)}
    </>
  );
}

export default Gameplay;