import styled from 'styled-components';
import { Link } from '@reach/router';
import { Button } from '../styles/Button';
import ScrollingCards from './ScrollingCards';

const HomePage = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.bg};
  text-align: left;
  overflow: hidden;
  position: relative;
`;

const FloatContent = styled.div`
  padding: 30px;
  position: relative;
  z-index: 2;
`;

const TitleSection = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 10vw;
  font-weight: 900;
  margin: 0px;
  width: fit-content;

  @media only screen and (max-width: 576px) {
    font-size: 15vw;
  }

  @media only screen and (min-width: 1800px) {
    font-size: 200px;
  }
`;

const Home = () => {
  return (
    <HomePage>
      <ScrollingCards />
      <FloatContent>
        <TitleSection>
          <Title>Cards</Title>
          <Title>Against</Title>
          <Title>Cornellians</Title>
        </TitleSection>
        <Link to="/rooms">
          <Button large>Get started</Button>
        </Link>
      </FloatContent>
    </HomePage>
  );
}

export default Home;