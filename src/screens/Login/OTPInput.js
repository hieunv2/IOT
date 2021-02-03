/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';

import {commonStyles, theme} from 'common/theme';
import {StyleSheet, Image, View, Animated, Easing} from 'react-native';
import Button from 'components/Button';
import Kasv from 'components/KeyboardAwareScrollView';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {TextInput, Subheading, Paragraph, Text} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {useAuth} from 'common/AuthProvider';
import auth from '@react-native-firebase/auth';
// import {useAPI} from 'api/api';

const IconAnimate = Animated.createAnimatedComponent(AwesomeIcon);

const DELAY_TIME_OTP = 20;

const OTP = ({confirm, navigation}) => {
  const {updateUser} = useAuth();
  const [reSendDelay, setResendDelay] = useState(DELAY_TIME_OTP);
  const [code, setCode] = useState();

  async function confirmCode() {
    try {
      const res = await confirm.confirm(code);

      if (res) {
        auth().onAuthStateChanged((user) => {
          database()
            .ref('user')
            .on('value', function (snapshot) {
              // setDevice(snapshot.val());
              let data = [];
              if (snapshot.val().length > 0) {
                data = snapshot.val()?.filter((item, index) => {
                  return item?.phone === user?.phoneNumber;
                });
              }
              if (data.length > 0) {
                updateUser(data[0]);
              } else {
                navigation.navigate('REGISTER', {phone: user?.phoneNumber});
              }
            });
        });
      }
    } catch (error) {
      console.log(error);
      console.log('Invalid code.');
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (reSendDelay !== 0) {
  //       setResendDelay(reSendDelay - 1);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [reSendDelay]);

  const rotateZ = useRef(new Animated.Value(0)).current;
  const z = rotateZ.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const animateIcon = Animated.loop(
    Animated.timing(rotateZ, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
      easing: Easing.linear,
    }),
  );

  const reSend = () => {
    animateIcon.start();
    setResendDelay(DELAY_TIME_OTP);

    setTimeout(() => {
      rotateZ.stopAnimation();
    }, 2000);
  };

  return (
    <Kasv contentContainerStyle={styles.container}>
      <Image source={require('assets/images/OTP.png')} style={styles.image} />
      <Subheading>Nhập OTP</Subheading>

      <TextInput
        placeholder="000000"
        keyboardType="number-pad"
        underlineColor="transparent"
        style={styles.phoneInput}
        value={code}
        onChangeText={(value) => setCode(value)}
        theme={{
          colors: {text: '#000000'},
        }}
      />

      <Button
        label={<Text style={commonStyles.fW_600}>Đăng nhập</Text>}
        rootStyle={styles.w80}
        onPress={confirmCode}
      />

      <View style={[commonStyles.sbEl, styles.w80]}>
        <Button
          label={
            <Paragraph style={commonStyles.fW_600}>Đổi số điện thoại</Paragraph>
          }
          compact
          mode="text"
        />

        <View style={commonStyles.startEl}>
          <IconAnimate
            name="sync"
            size={12}
            color="#fff"
            solid
            style={{
              transform: [{rotateZ: z}],
              opacity: reSendDelay !== 0 ? 0.5 : 1,
            }}
          />
          <Button
            disabled={reSendDelay !== 0}
            label={
              <Paragraph
                style={{
                  opacity: reSendDelay !== 0 ? 0.5 : 1,
                }}>
                Gửi lại mã {reSendDelay !== 0 && `(${reSendDelay})`}
              </Paragraph>
            }
            mode="text"
            onPress={reSend}
            compact
          />
        </View>
      </View>
    </Kasv>
  );
};

OTP.options = {
  headerShown: false,
};

export default OTP;

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
  w80: {
    width: '80%',
  },
  phoneInput: {
    ...commonStyles.mTB_15,
    height: 50,
    width: '80%',
    fontSize: 20,
    paddingLeft: 1,
  },
});
