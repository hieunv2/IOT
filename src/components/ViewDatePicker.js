/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Text,
  HelperText,
  Button,
  IconButton,
  Portal,
} from 'react-native-paper';
import {theme, commonStyles} from 'common/theme';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {isValid, format} from 'date-fns';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Một',
    'Hai',
    'Ba',
    'Bốn',
    'Năm',
    'Sáu',
    'Bảy',
    'Tám',
    'Chín',
    'Mười',
    'Mười một',
    'Mười hai',
  ],
  dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', '2', '3', '4', '5', '6', '7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

function DatePicker({
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
  descriptionLabel,
  containerInputStyle,
  wrapperStyle,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const [day, setDay] = useState(
    value ? value : format(new Date(), 'yyyy-MM-dd'),
  );

  const reset = () => {
    setDay(value ? value : format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <Fragment>
      <View style={[classes.root, wrapperStyle]}>
        <View style={classes.labelContainer}>
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
        <TouchableWithoutFeedback
          onPress={() => setShow(true)}
          style={classes.inputContainer(modeInput, show)}>
          <TextInput
            right={
              <TextInput.Icon
                name="calendar-alt"
                size={30}
                theme={{
                  colors: {
                    text: theme.colors.primary,
                  },
                }}
              />
            }
            theme={{
              colors: {
                error: theme.colors.errorFocus,
                text: '#000000',
              },
              roundness: 5,
            }}
            placeholder="dd/mm/yyyy"
            error={error}
            keyboardType={type ? type : 'default'}
            value={
              isValid(new Date(value))
                ? format(new Date(value), 'yyyy-MM-dd')
                : ''
            }
            dense={true}
            underlineColor="transparent"
            style={classes.customInput(error)}
            editable={false}
          />
        </TouchableWithoutFeedback>
        <HelperText type="error" visible={!!error} style={classes.errorText}>
          {helperText}
        </HelperText>
      </View>

      <Portal>
        <Modal
          animationIn="fadeInDown"
          animationOut="fadeOutDown"
          animationInTiming={400}
          hideModalContentWhileAnimating
          useNativeDriver
          isVisible={show}>
          <View style={classes.modalContainer}>
            <View>
              <View style={classes.calendarHeader}>
                <IconButton
                  icon="times"
                  color={theme.colors.errorFocus}
                  size={12}
                  onPress={() => {
                    reset();
                    setShow(!show);
                  }}
                />
              </View>

              <Calendar
                // current={isDate(value) ? value : new Date()}
                markedDates={{
                  [format(new Date(day), 'yyyy-MM-dd')]: {
                    selected: true,
                    marked: true,
                    selectedColor: theme.colors.primary,
                  },
                }}
                enableSwipeMonths={true}
                onDayPress={(daySelect) => {
                  console.log(1111, daySelect);
                  setDay(daySelect.dateString);
                }}
                theme={{
                  arrowColor: theme.colors.button,
                }}
              />

              <View style={classes.calendarFooter}>
                <Button
                  icon="check"
                  mode="text"
                  labelStyle={classes.labelCalendar}
                  onPress={() => {
                    onChange(day);
                    setShow(!show);
                  }}>
                  Đồng ý
                </Button>
                <Button
                  icon="times"
                  mode="text"
                  labelStyle={classes.labelCalendar}
                  theme={{
                    colors: {
                      primary: '#000',
                    },
                  }}
                  onPress={() => {
                    reset();
                    setShow(!show);
                  }}>
                  Huỷ bỏ
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </Fragment>
  );
}

export default React.memo(DatePicker);

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
  inputContainer: (modeInput, show) => ({
    marginTop: modeInput === 'outlined' ? 5 : 3,
    borderWidth: modeInput === 'outlined' ? 1 : 0,
    borderRadius: 5,
    borderColor: show ? theme.colors.primary : 'gray',
  }),
  customInput: (error) => ({
    backgroundColor: error ? theme.colors.error : '#fff',
    height: 40,
    padding: 0,
    borderRadius: 4,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  }),
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  calendarFooter: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.primary,
    justifyContent: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.primary,
  },
  labelCalendar: {
    fontSize: 12,
  },
});
