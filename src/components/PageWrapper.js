import styled from 'styled-components';
import Page from '../styles/Page';

const PageWrapStyle = styled(Page)`
  position: absolute;
  left: 0;
  top: 0;
`;

const PageWrapper = ({ className, children }) => <PageWrapStyle className={className}>
  {children}
</PageWrapStyle>

export default PageWrapper;