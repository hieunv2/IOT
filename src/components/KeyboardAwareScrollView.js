import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//-------------------------------------

const CommonKeyboardAwareScrollView = ({
  children,
  contentContainerStyle,
  ...rest
}) => (
  <KeyboardAwareScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    enableOnAndroid
    contentContainerStyle={Object.assign({}, contentContainerStyle, {
      flexGrow: 1,
    })}
    {...rest}>
    {children}
  </KeyboardAwareScrollView>
);

export default React.memo(CommonKeyboardAwareScrollView);
