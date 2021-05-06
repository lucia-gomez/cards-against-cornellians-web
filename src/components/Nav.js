import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  text-align: left;
  z-index: 2;
`;

const LogoText = styled.h6`
  margin: 0px;
  color: ${props => props.theme.text};
  font-weight: 900;
`;

const Nav = () => {
  return (
    <Container>
      <LogoText>Cards</LogoText>
      <LogoText>Against</LogoText>
      <LogoText>Cornellians</LogoText>
    </Container>
  );
}

export default Nav;