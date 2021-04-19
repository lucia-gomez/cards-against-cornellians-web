import styled from 'styled-components';

const Card = styled.div.attrs(_ => ({
  className: "z-depth-2",
}))`
  display: inline-block;
  position: relative;
  height: 225px;
  width: 175px;
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
  color: black;
  transition: transform 0.1s;

  :hover {
    transform: scale(1.05);
  }
`;

const BlackCard = styled(Card)`
  background-color: black;
  color: white;
`;

export { WhiteCard, BlackCard, Logo };