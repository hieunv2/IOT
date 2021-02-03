import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';
import Button from 'components/Button';
import {useAuth} from 'common/AuthProvider';

const Settings = ({route, navigation}) => {
  const {user, clear} = useAuth();
  return (
    <View>
      <View style={{alignItems: 'center', height: 200, marginTop: 50}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Xin chào {user?.name}!
        </Text>
      </View>
      <View style={{width: '80%', alignSelf: 'center'}}>
        <Button label="Đăng xuất" onPress={() => clear()} />
      </View>
    </View>
  );
};

export default Settings;
