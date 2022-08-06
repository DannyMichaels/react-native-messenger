import { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';

const INITIAL_ANIMATION_DURATION = 250;

export default function KeyboardState({ layout, children }) {
  const { height } = layout;

  const subscriptions = useRef([]);
  const [state, setState] = useState({
    contentHeight: height,
    keyboardHeight: 0,
    keyboardVisible: false,
    keyboardWillShow: false, // ios only
    keyboardWillHide: false, // ios only
    keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
  });

  const measure = (event) => {
    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION,
    } = event;

    setState((prevState) => ({
      ...prevState,
      contentHeight: screenY - layout?.y,
      keyboardHeight: height,
      keyboardAnimationDuration: duration,
    }));
  };

  const keyboardWillShow = (event) => {
    setState((prevState) => ({
      ...prevState,
      keyboardWillShow: true,
    }));
    measure(event);
  };

  const keyboardDidShow = (event) => {
    setState((prevState) => ({
      ...prevState,
      keyboardWillShow: false,
      keyboardVisible: true,
    }));
    measure(event);
  };

  const keyboardWillHide = (event) => {
    setState((prevState) => ({
      ...prevState,
      keyboardWillHide: true,
    }));

    measure(event);
  };
  const keyboardDidHide = () =>
    setState((prevState) => ({
      ...prevState,
      keyboardWillHide: false,
      keyboardVisible: false,
    }));

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // storing subscription handles in an array is a common practice in React native
      subscriptions.current = [
        Keyboard.addListener('keyboardWillShow', keyboardWillShow),
        Keyboard.addListener('keyboardWillHide', keyboardWillHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
      ];
    }

    return () => {
      subscriptions.current?.forEach((subscription) => subscription.remove());
    };
  }, []);

  return children({
    containerHeight: layout.height,
    contentHeight: state.contentHeight,
    keyboardHeight: state.keyboardHeight,
    keyboardVisible: state.keyboardVisible,
    keyboardWillShow: state.keyboardWillShow,
    keyboardWillHide: state.keyboardWillHide,
    keyboardAnimationDuration: state.keyboardAnimationDuration,
  });
}

KeyboardState.propTypes = {
  layout: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};
