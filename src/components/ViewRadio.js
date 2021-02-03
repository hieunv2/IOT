import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, HelperText, Paragraph} from 'react-native-paper';
import {theme, commonStyles} from 'common/theme';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function ViewRadio({
  label,
  labelColor,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  required,
  radio_props,
  rVertical,
  rLabelStyle,
  disabled = false,
  labelContainerStyle,
  descriptionLabel,
  containerInputStyle,
  wrapperStyle,
  ...rest
}) {
  return (
    <View style={[classes.root, wrapperStyle]}>
      {label && (
        <View style={[classes.labelContainer, labelContainerStyle]}>
          <Text
            theme={{
              colors: {
                text: labelColor || theme.colors.inputLabel,
              },
            }}
            style={classes.label}>
            {label}
          </Text>
          {required && <Text style={classes.required}>※</Text>}
        </View>
      )}
      {descriptionLabel && (
        <Paragraph style={classes.descriptionLabel}>
          {descriptionLabel}
        </Paragraph>
      )}
      <View style={[classes.inputContainer, containerInputStyle]}>
        <RadioForm
          formHorizontal={rVertical ? false : true}
          animation={true}
          {...rest}>
          {radio_props.map((obj, i) => (
            <RadioButton
              labelHorizontal={true}
              key={i}
              wrapStyle={classes.rWrap}>
              <RadioButtonInput
                obj={obj}
                disabled={disabled}
                isSelected={value === obj.value}
                onPress={onChange}
                borderWidth={1}
                buttonInnerColor={theme.colors.primary}
                buttonOuterColor={theme.colors.primary}
                buttonSize={14}
                buttonOuterSize={20}
                buttonWrapStyle={classes.rButton}
              />
              <RadioButtonLabel
                obj={obj}
                disabled={disabled}
                labelHorizontal={true}
                onPress={onChange}
                labelStyle={[classes.rLabel, rLabelStyle]}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
      {error && (
        <HelperText type="error" visible={!!error} style={classes.errorText}>
          {helperText}
        </HelperText>
      )}
    </View>
  );
}

const classes = StyleSheet.create({
  root: {
    ...commonStyles.mTB_5,
    // ...commonStyles.pLR_5,
    width: '100%',
  },
  labelContainer: {
    ...commonStyles.mTB_5,
    ...commonStyles.startEl,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputContainer: {},
  customInput: (error) => ({
    backgroundColor: error ? theme.colors.error : theme.colors.secondary,
    height: 40,
    padding: 0,
  }),
  errorText: {
    color: theme.colors.error,
  },
  rLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.inputLabel,
  },
  rButton: {
    marginLeft: 0,
  },
  rWrap: {
    marginRight: 20,
    padding: 5,
    paddingTop: 10,
    ...commonStyles.pLR_10,
  },
  required: {
    color: theme.colors.require,
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500',
  },
  descriptionLabel: {
    color: theme.colors.error,
  },
});
