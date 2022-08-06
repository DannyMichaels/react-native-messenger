import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Toolbar({
  isFocused,
  onChangeFocus = () => {},
  onSubmit = () => {},
  onPressCamera = () => {},
  onPressLocation = () => {},
}) {
  const [text, setText] = useState('');
  const inputRef = useRef();

  const handleChangeText = (newValue) => setText(newValue);
  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setText('');
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isFocused]);

  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleBlur = () => {
    onChangeFocus(false);
  };

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title="C" onPress={onPressCamera} />
      <ToolbarButton title="L" onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type something!"
          blurOnSubmit={false} // closes the keyboard
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

Toolbar.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onChangeFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func,
};

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },

  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: '#999',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});
