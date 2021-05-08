import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Button } from '../styles/Button';
import ScrollingCards from './ScrollingCards';
import PageWrapper from './PageWrapper';

const Container = styled(PageWrapper)`
  text-align: left;
  overflow: hidden;
  background-color: ${props => props.theme.text};
  background-image: unset;
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
  color: ${props => props.theme.bg};
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
    <Container>
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
    </Container>
  );
}

export default Home;