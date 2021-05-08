import { WhiteCard, CardGroup } from '../styles/Cards';

const Results = props => {
  const onClick = i => {
    if (!props.isJudge) {
      return;
    }
    if (props.judgeSelected === i) {
      props.setJudgeSelected(null);
    } else {
      props.setJudgeSelected(i);
    }
  }

  return (
    <div>
      {props.submissions.map((group, i) => {
        if (group.length === 1) {
          return <WhiteCard
            key={i}
            selected={props.judgeSelected === i}
            onClick={() => onClick(i)}
          >
            {group[0]}
          </WhiteCard>;
        }
        return <CardGroup key={i} onClick={() => onClick(i)}>
          {group.map((card, j) => <WhiteCard key={j} selected={props.judgeSelected === i}>{card}</WhiteCard>)}
        </CardGroup>;
      }
      )}
    </div>
  );
}

export default Results;