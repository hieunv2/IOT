import React, {useEffect, useRef, Fragment} from 'react';

import {commonStyles} from 'common/theme';
import {
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Button from 'components/Button';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import {useAuth} from 'common/AuthProvider';

import {Paragraph, Text} from 'react-native-paper';

const POS_TOP_LOGO = (commonStyles.halfHeight * 40) / 2 / 100;

const Login = ({navigation}) => {
  const posTop = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const {updateUser} = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '634014721111-0cnm8qn4ibiadjrq53ulpi8a79pn4eai.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
  }, []);

  const signInWithGoogleSubmit = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        database()
          .ref('user')
          .on('value', function (snapshot) {
            // setDevice(snapshot.val());

            let data = [];
            if (Object.keys(snapshot.val()).length > 0) {
              data = Object.values(snapshot.val())?.filter((item, index) => {
                return item?.gmail === userInfo?.user?.email;
              });
            }

            if (data.length > 0) {
              updateUser(data[0]);
            } else {
              navigation.navigate('REGISTER', {email: userInfo?.user?.email});
            }
          });
      }

      // if (res?.access_token) {
      //   toast.show({
      //     message: 'Đăng nhập thành công',
      //   });
      //   await Auth.updateToken(res.access_token, isSignInOf);
      //   gotoPrimaryScreen(isSignInOf);
      // }
      // if (res?.error === 'unauthenticated') {
      //   await GoogleSignin.revokeAccess();
      //   await GoogleSignin.signOut();
      // }
    } catch (error) {
      console.log('1111', error);
    }
  };

  const loginPhone = async () => {
    // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // setConfirm(confirmation);
    // navigation.navigate('OTP', {
    //   confirm: confirmation,
    // });
    navigation.navigate('SMS');
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(posTop, {
        toValue: -POS_TOP_LOGO,
        duration: 800,
        useNativeDriver: false,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [posTop, opacity]);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background}>
        <Animated.View style={{opacity: opacity}}>
          {Platform.OS === 'ios' ? (
            <Fragment>
              <Button
                label={
                  <View style={styles.label}>
                    <View style={styles.icoContainer}>
                      <AwesomeIcon name="google" color="#EA4335" size={25} />
                    </View>

                    <Paragraph>
                      Đăng nhập bằng
                      <Text style={commonStyles.fW_600}> Gmail</Text>
                    </Paragraph>
                  </View>
                }
                color="white"
                contentStyle={styles.btn}
                onPress={signInWithGoogleSubmit}
              />

              <Button
                label={
                  <View style={styles.label}>
                    <View style={styles.icoContainer}>
                      <AwesomeIcon name="mobile" color="white" size={25} />
                    </View>

                    <Paragraph>
                      Đăng nhập bằng
                      <Text style={commonStyles.fW_600}> Điện thoại</Text>
                    </Paragraph>
                  </View>
                }
                onPress={loginPhone}
                contentStyle={styles.btn}
              />

              <Button
                label={<Paragraph>Đăng nhập sau</Paragraph>}
                mode="text"
                contentStyle={styles.btn}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Button
                label={
                  <Paragraph>
                    Đăng nhập bằng
                    <Text style={commonStyles.fW_600}> Facebook</Text>
                  </Paragraph>
                }
                icon={() => (
                  <AwesomeIcon name="facebook" size={20} color="#fff" />
                )}
                color="#1877f2"
                contentStyle={styles.btn}
                onPress={signInWithGoogleSubmit}
              />

              <Button
                label={
                  <Paragraph>
                    Đăng nhập bằng
                    <Text style={commonStyles.fW_600}> Điện thoại</Text>
                  </Paragraph>
                }
                icon={() => (
                  <AwesomeIcon name="mobile" size={20} color="#EA4335" />
                )}
                contentStyle={styles.btn}
                onPress={loginPhone}
              />

              <Button
                label={<Paragraph>Đăng nhập sau</Paragraph>}
                mode="text"
                contentStyle={styles.btn}
              />
            </Fragment>
          )}
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

Login.options = {
  headerShown: false,
  animationEnabled: false,
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CEEAD6',
  },
  logo: {},
  btn: {
    width: 300,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  icoContainer: {
    paddingRight: 20,
    marginRight: 20,
    borderRightWidth: 0.5,
    borderRightColor: '#FFFFFF',
  },
});
