import { BlackCard } from '../styles/Cards';
import Hand from "./Hand";

const Gameplay = props => {
  const d = props.roundData;
  if (!d) {
    return null;
  }

  return (
    <>
      <BlackCard>{d.blackCard}</BlackCard>
      {Hand(d.whiteCards)}
    </>
  );
}

export default Gameplay;