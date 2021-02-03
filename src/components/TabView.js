import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {TabView as RNTabView} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

import Touchable from './Touchable';
//-------------------------------------

const TabView = ({routing, renderScene, index, setIndex}) => {
  const initialLayout = {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  };

  const [routes] = useState(routing);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <TabBarContainer>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 0,
                ),
              }),
            ),
            0,
            0,
          );

          return (
            <TabBarItem
              key={i}
              active={i === index}
              onPress={() => setIndex(i)}>
              <TabBarItemAnimatedText style={{color}}>
                {route.title}
              </TabBarItemAnimatedText>
            </TabBarItem>
          );
        })}
      </TabBarContainer>
    );
  };

  return (
    <RNTabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={(i) => setIndex(i)}
      initialLayout={initialLayout}
    />
  );
};

export default TabView;
//-------------------------------------
const TabBarContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px 16px;
`;
const TabBarItem = styled(Touchable)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  height: 54px;
  padding: 0px 16px;
  border-bottom-width: ${(props) => (props.active ? '2px' : '0px')};
  border-color: ${(props) => (props.active ? 'red' : 'black')};
`;
const TabBarItemAnimatedText = styled(Animated.Text)`
  font-size: 20px;
`;
