import { Button } from 'react-materialize';
import styled from 'styled-components';

const MyButton = styled(Button).attrs(props => ({
  className: `waves-effect waves-light red darken-4 ${props.large ? 'btn-large' : ''}`
}))`
  font-family: 'Roboto', sans-serif;
`;

export { MyButton as Button };