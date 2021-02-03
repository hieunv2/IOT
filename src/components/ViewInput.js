import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput as NativeInput,
  Platform,
} from 'react-native';
import {TextInput, Text, HelperText, Paragraph} from 'react-native-paper';
import {theme, commonStyles} from 'common/theme';

export default function ViewTextInput({
  label,
  labelColor,
  labelContainerStyle,
  modeInput,
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  required,
  inputStyle,
  width,
  security,
  inputBackgroundColor,
  descriptionLabel,
  containerInputStyle,
  wrapperStyle,
  rows,
  ...rest
}) {
  const [areaFocus, setAreaFocus] = useState(false);

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
        {rows ? (
          <NativeInput
            placeholder={placeholder ? placeholder : ''}
            keyboardType={type ? type : 'default'}
            onChangeText={onChange}
            onBlur={() => {
              setAreaFocus(false);
              typeof onBlur !== 'undefined' && onBlur();
            }}
            multiline
            value={value}
            onFocus={() => setAreaFocus(true)}
            selectionColor={
              error ? theme.colors.errorFocus : theme.colors.primary
            }
            numberOfLines={rows}
            underlineColor="transparent"
            secureTextEntry={!!security}
            style={[
              classes.customAreaInput({error, rows, areaFocus, modeInput}),
              inputStyle,
            ]}
            {...rest}
          />
        ) : (
          <TextInput
            mode={modeInput ? modeInput : 'flat'}
            placeholder={placeholder ? placeholder : ''}
            error={error}
            keyboardType={type ? type : 'default'}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            theme={{
              colors: {
                error: theme.colors.errorFocus,
                text: '#000000',
              },
              roundness: 5,
            }}
            underlineColor="transparent"
            dense={true}
            secureTextEntry={!!security}
            style={[
              classes.customInput({error, inputBackgroundColor, modeInput}),
              inputStyle,
            ]}
            {...rest}
          />
        )}
      </View>
      {error && (
        <HelperText type="error" visible={!!error} style={classes.errorText}>
          {helperText}
        </HelperText>
      )}
    </View>
  );
}

ViewTextInput.Icon = TextInput.Icon;
ViewTextInput.Affix = TextInput.Affix;

const classes = StyleSheet.create({
  root: {
    ...commonStyles.mTB_5,
    width: '100%',
  },
  labelContainer: {
    ...commonStyles.startEl,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputContainer: {},
  customAreaInput: ({error, rows, areaFocus, modeInput}) => {
    const defaultStyle = {
      textAlignVertical: 'top',
      backgroundColor: error ? theme.colors.error : '#ffffff',
      height: rows && Platform.OS === 'ios' ? rows * 25 : null,
      padding: 10,
      fontSize: 16,
      borderRadius: 5,
      marginTop: 3,
    };

    const outlinedStyle = {
      borderWidth: areaFocus ? 2 : 1,
      borderColor: areaFocus ? theme.colors.primary : 'gray',
      marginTop: 5,
    };

    return modeInput === 'outlined'
      ? Object.assign(defaultStyle, outlinedStyle)
      : defaultStyle;
  },
  customInput: ({error, inputBackgroundColor, modeInput}) => ({
    backgroundColor: error
      ? theme.colors.error
      : inputBackgroundColor
      ? inputBackgroundColor
      : '#ffffff',
    height: 40,
    padding: 0,
    borderRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginTop: modeInput === 'outlined' ? 0 : 3,
  }),
  errorText: {
    color: theme.colors.error,
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
