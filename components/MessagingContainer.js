import { useEffect, useRef } from 'react';

import {
  View,
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { INPUT_METHOD } from '../utils/constants';
import PropTypes from 'prop-types';
import InputMethodEditor from './InputMethodEditor';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default function MessagingContainer({
  onChangeInputMethod = () => {},
  keyboardVisible,
  inputMethod,
  keyboardAnimationDuration,
  contentHeight,
  containerHeight,
  keyboardWillShow,
  keyboardHeight,
  keyboardWillHide,
  handlePressImage = () => {},
  children = null,
}) {
  const subscriptionRef = useRef();

  useEffect(() => {
    if (keyboardVisible) {
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      /// keyboard hidden,
      !keyboardVisible &&
      inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const anim = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android'
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(anim);
  }, [onChangeInputMethod]);

  useEffect(() => {
    subscriptionRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }

        return false;
      }
    );

    return () => {
      subscriptionRef.current?.remove();
    };
  }, []);

  const shouldUseContentHeight =
    keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

  const containerStyle = {
    height: shouldUseContentHeight ? contentHeight : containerHeight,
  };

  const showCustomInput =
    inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

  const keyboardIsHidden =
    inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;

  const keyboardIsHiding =
    inputMethod === INPUT_METHOD.KEYBOARD && keyboardWillHide;

  const inputStyle = {
    height: showCustomInput ? keyboardHeight || 250 : 0,
    marginTop: isIphoneX() && (keyboardIsHidden || keyboardIsHiding) ? 24 : 0,
  };

  return (
    <View style={containerStyle}>
      {children}
      <View style={inputStyle}>
        <InputMethodEditor handlePressImage={handlePressImage} />
      </View>
    </View>
  );
}

MessagingContainer.propTypes = {
  // From `KeyboardState`
  containerHeight: PropTypes.number.isRequired,
  contentHeight: PropTypes.number.isRequired,
  keyboardHeight: PropTypes.number.isRequired,
  keyboardVisible: PropTypes.number.isRequired,
  keyboardWillShow: PropTypes.bool.isRequired,
  keyboardWillHide: PropTypes.bool.isRequired,
  keyboardAnimationDuration: PropTypes.number.isRequired,

  inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
  onChangeInputMethod: PropTypes.func,

  children: PropTypes.node,

  handlePressImage: PropTypes.func,
};
