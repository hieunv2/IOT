import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import database from '@react-native-firebase/database';
import Touchable from 'components/Touchable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from 'components/ViewInput';
import ViewRadio from 'components/ViewRadio';
import NumericInput from 'react-native-numeric-input';
import Button from 'components/Button';
import Toast from 'react-native-toast-message';

const Edit = ({route, navigation}) => {
  const {device} = route.params;
  const [pump, setPump] = useState(0);
  const [heater, setHeater] = useState(0);
  const [name, setName] = useState(device?.name || '');
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    setName(device.name);
    const readUserData = () => {
      database()
        .ref(`control/${device?.MAC}`)
        .on('value', function (snapshot) {
          let res = snapshot.val();
          setPump(res.pump);
          setHeater(res.heater);
          setPeriod(res.period);
        });
    };
    readUserData();
  }, [device]);

  const handleSubmit = async () => {
    let form = {
      pump,
      heater,
      period,
    };
    let updates = {};
    updates[`control/${device.MAC}`] = form;
    console.log('updates', updates);
    database()
      .ref()
      .update(updates)
      .then(
        (res) =>
          Toast.show({
            text1: 'Cập nhật thành công',
          }),
        navigation.goBack(),
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Touchable onPress={() => navigation.goBack()}>
          <Icon size={20} name="chevron-left" />
        </Touchable>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Cài đặt thiết bị</Text>
        </View>
        <View />
      </View>
      <View style={{padding: 16}}>
        <Input
          label="Tên thiết bị"
          placeholder="Nhập tên thiết bị"
          value={name}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Chu kì lấy mẫu (s)
            </Text>
          </View>
          <NumericInput value={period} onChange={(value) => setPeriod(value)} />
        </View>
        <ViewRadio
          label="Máy bơm"
          name="pump"
          value={pump}
          radio_props={[
            {
              label: 'Bật',
              value: 1,
            },
            {
              label: 'Tắt',
              value: 0,
            },
          ]}
          onChange={(value) => setPump(value)}
        />
        <ViewRadio
          label="Máy sưởi"
          name="heater"
          value={heater}
          radio_props={[
            {
              label: 'Bật',
              value: 1,
            },
            {
              label: 'Tắt',
              value: 0,
            },
          ]}
          onChange={(value) => setHeater(value)}
        />
      </View>
      <View style={{padding: 10}}>
        <Button label="Lưu" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    height: 50,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Edit;
