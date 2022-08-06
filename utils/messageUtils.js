import PropTypes from 'prop-types';

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['text', 'image', 'location']).isRequired,
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
});

let messageId = 0;

const getNextId = () => {
  messageId += 1;
  return messageId;
};

export const createTextMessage = (text) => ({
  type: 'text',
  id: getNextId(),
  text,
});

export const createImageMessage = (uri) => ({
  type: 'image',
  id: getNextId(),
  uri,
});

export const createLocationMessage = (coordinate) => ({
  type: 'location',
  id: getNextId(),
  coordinate,
});
