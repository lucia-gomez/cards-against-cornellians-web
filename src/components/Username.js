import { useState } from 'react';
import { Modal, Button, TextInput } from 'react-materialize';

const Username = props => {
  const [isValid, setValid] = useState(false);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const socket = props.socket;

  const onChangeText = e => {
    const name = e.target.value.trim();
    if (name && name !== null && name.length > 0) {
      socket.emit('validate username', props.room, name, d => {
        setName(name);
        setValid(d.valid);
        setError(d.valid ? null : d.error);
      });
    } else {
      setValid(false);
    }
  }

  return (
    <Modal
      header="Enter a username"
      actions={[
        <Button flat disabled={!isValid} modal="close" node="button" waves="green"
          onClick={() => props.submit(name)}
        >Join</Button>
      ]}
      options={{ dismissible: false }}
      open={true}>
      <label htmlFor="username" data-error={error}></label>
      <TextInput
        onChange={onChangeText}
        error={error}
        placeholder="Username"
        id="username"
        className={error ? 'invalid' : ''}
        validate>
      </TextInput>
    </Modal>
  );
}

export default Username;