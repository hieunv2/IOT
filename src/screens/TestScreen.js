import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import database from '@react-native-firebase/database';
import {Card, Title, Paragraph} from 'react-native-paper';
import TabView from 'components/TabView';
import {LineChart} from 'react-native-chart-kit';
import {FAB} from 'react-native-paper';
import ViewDatePicker from 'components/ViewDatePicker';
import {isValid, format} from 'date-fns';

const TestScreen = ({route, navigation}) => {
  const {device} = route.params;
  const [res, setRes] = useState({});
  const [logs, setLogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [day, setDay] = useState('2021-01-25');
  const [humi, setHumi] = useState({
    12: 12,
  });
  const [temp, setTemp] = useState({
    12: 12,
  });
  const [light, setLight] = useState({
    12: 12,
  });

  useEffect(() => {
    const readUserData = () => {
      database()
        .ref(`response/${device?.MAC}`)
        .on('value', function (snapshot) {
          setRes(snapshot.val());
        });
    };
    readUserData();
  }, []);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ':' + rminutes;
  }

  useEffect(() => {
    const readUserData = () => {
      database()
        .ref(`${device?.MAC}`)
        .on('value', function (snapshot) {
          setLogs(snapshot.val());
          const res = snapshot.val()[day];
          let temp = {};
          let humi = {};
          let light = {};
          Object.keys(res).map((item) => {
            temp[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].temp,
            );
            humi[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].humi,
            );
            light[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].light,
            );
          });
          setHumi(humi);
          setLight(light);
          setTemp(temp);
        });
    };
    readUserData();
  }, []);

  useEffect(() => {
    const getData = () => {
      console.log('hr', logs);

      if (Object.keys(logs).length > 0) {
        const res = logs[day];
        if (res) {
          let temp = {};
          let humi = {};
          let light = {};
          Object.keys(res).map((item) => {
            temp[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].temp,
            );
            humi[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].humi,
            );
            light[timeConvert(Math.round(parseInt(item) / 300))] = Math.round(
              res[item].light,
            );
          });
          setHumi(humi);
          setLight(light);
          setTemp(temp);
        } else {
          alert('Không có lịch sử dữ liệu');
          setDay('2021-01-25');
        }
      }
    };
    getData();
  }, [day]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chi tiết</Text>
      </View>
      <View style={{flex: 1}}>
        <TabView
          routing={[
            {key: 'tab1', title: 'Độ ẩm'},
            {key: 'tab2', title: 'Nhiệt độ'},
            {key: 'tab3', title: 'Ánh sáng'},
          ]}
          renderScene={({route}) => {
            switch (route.key) {
              case 'tab1':
                return <Tab1 data={humi} />;
              case 'tab2':
                return <Tab2 data={temp} />;
              case 'tab3':
                return <Tab3 data={light} />;
            }
          }}
          index={index}
          setIndex={setIndex}
        />
        <ViewDatePicker
          label="Ngày hiển thị"
          modeInput="outlined"
          name="day"
          value={day}
          onChange={(value) => setDay(value)}
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <Card style={styles.item}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Chu kì lấy mẫu</Title>
              <Title>{`${res.period}s`}</Title>
            </Card.Content>
          </Card>
          <Card style={styles.item}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Trạng thái máy bơm</Title>
              <Title>{res.pump ? 'Đang hoạt động' : 'Đã tắt'}</Title>
            </Card.Content>
          </Card>
          <Card style={styles.item}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Trạng thái máy sưởi</Title>
              <Title>{res.heater ? 'Đang hoạt động' : 'Đã tắt'}</Title>
            </Card.Content>
          </Card>
          <Card style={styles.item}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Ánh sáng</Title>
              <Title>{res.light}</Title>
            </Card.Content>
          </Card>
          <Card style={styles.item}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Độ ẩm</Title>
              <Title>{res.humi}</Title>
            </Card.Content>
          </Card>
          <Card style={[styles.item, {marginBottom: 80}]}>
            <Card.Content
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>Nhiệt độ</Title>
              <Title>{res.temp}</Title>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
      <FAB
        style={styles.fab}
        icon="edit"
        onPress={() => navigation.navigate('EDIT', {device: device})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 16,
  },
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  item: {
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TestScreen;

const Tab1 = ({data}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: Object.keys(data).splice(0, 10),
          datasets: [
            {
              data: Object.values(data).splice(0, 10),
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={180}
        yAxisLabel={'%rh'}
        chartConfig={{
          decimalPlaces: 2,
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const Tab2 = ({data}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: Object.keys(data).splice(0, 10),
          datasets: [
            {
              data: Object.values(data).splice(0, 10),
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={180}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const Tab3 = ({data}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: Object.keys(data).splice(0, 10),
          datasets: [
            {
              data: Object.values(data).splice(0, 10),
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={180}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
