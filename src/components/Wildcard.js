import { useState } from 'react';
import { Modal, Button, TextInput } from 'react-materialize';

const Wildcard = props => {
  const [text, setText] = useState();

  const onChangeText = e => {
    setText(e.target.value.trim());
  }

  return (
    <Modal
      header="Enter wildcard text"
      actions={[
        <Button flat modal="close" node="button" waves="green"
          onClick={props.cancel}
        >Cancel</Button>,
        <Button flat disabled={!(text && text.length > 0)} modal="close" node="button" waves="green"
          onClick={() => props.submit(text)}
        >Confirm</Button>
      ]}
      options={{ dismissible: false }}
      open={true}>
      <TextInput
        onChange={onChangeText}
        placeholder="Enter text"
        id="wildcard-text">
      </TextInput>
    </Modal>
  );
}

export default Wildcard;