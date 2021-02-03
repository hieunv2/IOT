import React from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Text, Paragraph, HelperText} from 'react-native-paper';
import {theme, commonStyles} from 'common/theme';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default function ViewSelectInput({
  label,
  labelColor,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  inputStyle,
  valueList,
  placeholder,
  modeInput,
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
        <RNPickerSelect
          onValueChange={onChange}
          items={valueList}
          value={value}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <AwesomeIcon
                name="chevron-down"
                size={20}
                color={theme.colors.primary}
                solid
              />
            );
          }}
          placeholder={{
            label: 'Vui lòng chọn',
            value: '',
          }}
          style={{
            ...pickerSelectStyles(error, modeInput),
            iconContainer: {
              top: modeInput === 'outlined' ? 20 : 10,
              right: 10,
            },
          }}
          {...rest}
        />
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
  inputContainer: {
    width: '100%',
  },
  errorText: {
    color: theme.colors.error,
  },
  required: {
    color: theme.colors.require,
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500',
  },
});

const pickerSelectStyles = (error, modeInput) => {
  const outlinedStyle = {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
  };

  const inputIOS = {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    backgroundColor: error ? theme.colors.error : '#fff',
  };

  const inputAndroid = {
    fontSize: 16,
    paddingHorizontal: 10,
    // paddingVertical: 8,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    backgroundColor: error ? theme.colors.error : '#fff',
  };

  return StyleSheet.create({
    viewContainer: {
      width: '100%',
    },
    inputIOS:
      modeInput === 'outlined'
        ? Object.assign(inputIOS, outlinedStyle)
        : inputIOS,
    inputAndroid:
      modeInput === 'outlined'
        ? Object.assign(inputAndroid, outlinedStyle)
        : inputAndroid,
  });
};
