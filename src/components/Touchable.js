import React, {Fragment} from 'react';
import {Platform} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
//-------------------------------------

const Touchable = ({children, ...otherProps}) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        {...otherProps}>
        <Fragment>{children}</Fragment>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity {...otherProps}>
      <Fragment>{children}</Fragment>
    </TouchableOpacity>
  );
};

export default React.memo(Touchable);
