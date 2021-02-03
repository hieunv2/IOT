import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {theme, commonStyles} from 'common/theme';

const ViewButton = ({
  rootStyle,
  label,
  labelStyle,
  mode,
  loading,
  onPress,
  icon,
  buttonStyle,
  contentStyle,
  disabledRadius,
  disabledRootStyle,
  disabledContentStyle,
  disabledButtonStyle,
  roundness,
  color,
  addView,
  ...rest
}) => {
  return (
    <View
      style={
        disabledRootStyle ? null : rootStyle ? rootStyle : classes.rootStyle
      }>
      {addView && (
        <View style={[classes.onTop, classes.addView]}>{addView}</View>
      )}
      <Button
        mode={mode ? mode : 'contained'}
        color={color ? color : theme.colors.button}
        icon={icon}
        contentStyle={
          disabledContentStyle
            ? null
            : contentStyle
            ? contentStyle
            : classes.contentStyle
        }
        raised
        theme={{roundness: disabledRadius ? 0 : roundness ? roundness : 3}}
        style={
          disabledButtonStyle
            ? null
            : buttonStyle
            ? buttonStyle
            : classes.buttonStyle({mode})
        }
        uppercase={false}
        onPress={onPress}
        labelStyle={labelStyle ? labelStyle : classes.labelStyle}
        loading={loading ? loading : false}
        {...rest}>
        {label}
      </Button>
    </View>
  );
};

export default ViewButton;

const classes = StyleSheet.create({
  rootStyle: {
    ...commonStyles.mTB_10,
    position: 'relative',
  },
  buttonStyle: (options) => {
    const defaultStyles = {};

    const outlinedStyles = {
      borderColor: theme.colors.button,
      borderWidth: 2,
    };

    return options.mode === 'outlined'
      ? Object.assign(defaultStyles, outlinedStyles)
      : defaultStyles;
  },
  contentStyle: {
    ...commonStyles.pTB_5,
  },
  labelStyle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  addView: {
    position: 'absolute',
  },
  onTop: {
    elevation: 100,
    zIndex: 100,
  },
});
