import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {List, Text, Card, Title, Paragraph} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {SCREENS_KEY} from '../navigation/preset';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Touchable from 'components/Touchable';
import {Modalize} from 'react-native-modalize';
import Button from 'components/Button';
import Input from 'components/ViewInput';
import Toast from 'react-native-toast-message';
import {useAuth} from 'common/AuthProvider';
import {Searchbar} from 'react-native-paper';

//----------------------------------------------------------------

const Welcome = ({navigation}) => {
  const [device, setDevice] = useState([]);
  const modalizeRef = useRef(null);
  const [name, setName] = useState('');
  const [mac, setMac] = useState('');
  const [index, setIndex] = useState(0);
  const {user} = useAuth();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const readUserData = () => {
    database()
      .ref('user')
      .on('value', function (snapshot) {
        let data = [];
        if (snapshot.val().length > 0) {
          snapshot.val().map((item, index) => {
            if (item?.gmail === user?.gmail) {
              setIndex(index);
              data.push(item);
            }
          });
        }
        if (data.length > 0) {
          let res = data[0]?.owner || [];
          setDevice(res || []);
        }
      });
  };

  useEffect(() => {
    readUserData();
  }, []);

  const handleSubmit = () => {
    database().ref(`user/${index}/owner/${device.length}`).set({
      name,
      MAC: mac,
    });
    Toast.show({
      text1: 'Thêm thiết bị thành công',
    });
    readUserData();
    modalizeRef.current?.close();
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Modalize modalHeight={500} ref={modalizeRef}>
        <View style={{flex: 1}}>
          {/* <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          /> */}
          <View style={{height: 400, padding: 16}}>
            <Input
              label="Tên thiết bị"
              placeholder="Nhập tên thiết bị"
              value={name}
              onChange={(value) => setName(value)}
            />
            <Input
              label="Địa chỉ MAC"
              placeholder="Nhập địa chỉ MAC"
              value={mac}
              onChange={(value) => setMac(value)}
            />
          </View>
          <Button label="Lưu" onPress={() => handleSubmit()} />
        </View>
      </Modalize>
      <View style={styles.header}>
        <Text style={styles.title}>Thiết bị của tôi</Text>
        <Touchable onPress={onOpen}>
          <Icon name="plus" size={24} />
        </Touchable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {device?.map(
          (item) =>
            item?.MAC && (
              <View style={{width: '45%', marginTop: 20}}>
                <Touchable
                  onPress={() =>
                    navigation.navigate(SCREENS_KEY.INFO, {
                      device: item,
                    })
                  }>
                  <Card>
                    <Card.Content>
                      <Title>{item?.name}</Title>
                    </Card.Content>
                  </Card>
                </Touchable>
              </View>
            ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
});

//----------------------------------------------------------------

export default Welcome;
