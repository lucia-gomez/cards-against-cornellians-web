import styled from 'styled-components';

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.bg};
  position: absolute;
`;

export default Page;