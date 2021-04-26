import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  text-align: left;
  z-index: 2;
`;

const LogoText = styled.h5`
  margin: 0px;
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