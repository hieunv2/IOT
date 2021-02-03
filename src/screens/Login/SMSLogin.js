import React, {useState} from 'react';

import {commonStyles, theme} from 'common/theme';
import {StyleSheet, Image} from 'react-native';
import Button from 'components/Button';
import Kasv from 'components/KeyboardAwareScrollView';
import {TextInput, Subheading, Paragraph, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import OTP from 'screens/Login/OTPInput';
import * as Animatable from 'react-native-animatable';

import TextInputMask from 'react-native-text-input-mask';

// const phoneNumber = '384693524';

const SMS = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const [confirm, setConfirm] = useState();

  const loginPhone = async () => {
    const confirmation = await auth().signInWithPhoneNumber(
      '+84' + phoneNumber,
    );
    setConfirm(confirmation);
  };

  if (confirm) {
    return (
      <Animatable.View
        style={styles.otpView}
        animation="fadeInRight"
        duration={100}>
        <OTP confirm={confirm} navigation={navigation} />
      </Animatable.View>
    );
  }

  return (
    <Kasv contentContainerStyle={styles.container}>
      {/* <Image
        source={require('assets/images/Illustration.png')}
        style={styles.image}
      /> */}
      <Subheading>Nhập số điện thoại</Subheading>

      <TextInput
        left={
          <TextInput.Affix
            theme={{
              colors: {text: '#000000'},
            }}
            text="+84"
          />
        }
        value={phoneNumber}
        keyboardType="number-pad"
        underlineColor="transparent"
        style={styles.phoneInput}
        theme={{
          colors: {text: '#000000'},
        }}
        render={(props) => (
          <TextInputMask
            {...props}
            mask={'[000] [000] [000]'}
            onChangeText={(formatted, extracted) => {
              setPhoneNumber(extracted);
            }}
          />
        )}
      />

      <Button
        label={<Text style={commonStyles.fW_600}>Gửi tôi OTP</Text>}
        onPress={loginPhone}
        rootStyle={styles.btn}
      />

      <Button
        label={<Paragraph>Chọn phương thức đăng nhập khác</Paragraph>}
        mode="text"
      />
    </Kasv>
  );
};

SMS.options = {
  headerShown: false,
};

export default SMS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundCustom,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...commonStyles.mTB_30,
  },
  btn: {
    width: '80%',
  },
  phoneInput: {
    ...commonStyles.mTB_15,
    height: 50,
    width: '80%',
    fontSize: 20,
    paddingLeft: 1,
  },
  otpView: {
    flex: 1,
  },
});
