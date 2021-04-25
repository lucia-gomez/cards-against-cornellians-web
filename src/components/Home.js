import styled from 'styled-components';
import { Link } from '@reach/router';
import { Button } from '../styles/Button';

const HomePage = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  padding: 30px;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  text-align: left;
  overflow: hidden;
  position: relative;
`;

const FloatContent = styled.div`
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
`;

const Home = () => {
  return (
    <HomePage>
      <FloatContent>
        <TitleSection>
          <Title>Cards</Title>
          <Title>Against</Title>
          <Title>Cornellians</Title>
        </TitleSection>
        <Link to="/rooms">
          <Button>Get started</Button>
        </Link>
      </FloatContent>
    </HomePage>
  );
}

export default Home;