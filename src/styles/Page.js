import styled from 'styled-components';

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
`;

export default Page;