import { FlatList, StyleSheet } from 'react-native';
import { MessageShape } from '../utils/messageUtils';
import PropTypes from 'prop-types';
import Message from './Message';

const keyExtractor = (message) => message.id.toString();

export default function MessageList({ messages, onPressMessage = () => {} }) {
  return (
    <FlatList
      style={styles.container}
      inverted // in a messaging app, we typically want new messages to appear at the bottom of the list, we use inverted to achieve that.
      data={messages}
      renderItem={({ item }) => (
        <Message message={item} onPressMessage={onPressMessage} />
      )}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
    />
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
  },
});
