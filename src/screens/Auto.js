import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';
import {List} from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';

const Auto = ({route, navigation}) => {
  const [recommend, setRecommend] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const readUserData = () => {
      database()
        .ref(`recommend`)
        .on('value', function (snapshot) {
          setRecommend(snapshot.val());
        });
    };
    readUserData();
  }, []);

  return (
    <View>
      <List.Section title="Gợi ý">
        {recommend.map((item) => (
          <Item item={item} />
        ))}
      </List.Section>
    </View>
  );
};

export default Auto;

const Item = ({item}) => {
  const [humi, setHumi] = useState(item?.humi || 0);
  const [temp, setTemp] = useState(item?.temp || 0);

  return (
    <List.Accordion title={item?.name || ''}>
      <View style={{paddingLeft: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Độ ẩm</Text>
          </View>
          <NumericInput value={humi} onChange={(value) => setHumi(value)} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Nhiệt độ</Text>
          </View>
          <NumericInput value={temp} onChange={(value) => setTemp(value)} />
        </View>
      </View>
    </List.Accordion>
  );
};
