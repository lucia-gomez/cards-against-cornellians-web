import styled from 'styled-components';

const PageWrapStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const PageWrapper = ({ children }) => <PageWrapStyle>{children}</PageWrapStyle>

export default PageWrapper;