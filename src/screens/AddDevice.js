import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';
import Input from 'components/ViewInput';
import Button from 'components/Button';
import Toast from 'react-native-toast-message';
import {useAuth} from 'common/AuthProvider';

const AddDevice = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState(route.params.email || '');
  const [phone, setPhone] = useState(route.params.phone || '');
  const {updateUser} = useAuth();
  const [length, setLength] = useState(0);

  useEffect(() => {
    database()
      .ref('user')
      .on('value', function (snapshot) {
        setLength(Object.keys(snapshot.val()).length);
      });
  }, []);

  const handleSubmit = () => {
    database()
      .ref(`user/${length}`)
      .set({
        gmail,
        phone,
        name,
        owner: ['1'],
      });
    Toast.show({
      text1: 'Đăng ký thành công',
    });
    updateUser({
      gmail,
      phone,
      name,
      owner: ['1'],
    });
  };

  return (
    <View>
      <Input
        label="Tên của bạn"
        placeholder="Nhập tên của bạn"
        value={name}
        onChange={(value) => setName(value)}
      />
      <Input
        label="Địa chỉ gmail"
        placeholder="Nhập địa chỉ gmail"
        value={gmail}
        onChange={(value) => setGmail(value)}
      />
      <Input
        type="phone-pad"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={(value) => setPhone(value)}
      />
      <Button label="Đăng ký" onPress={() => handleSubmit()} />
    </View>
  );
};

export default AddDevice;
