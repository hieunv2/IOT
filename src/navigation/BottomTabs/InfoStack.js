import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_KEY} from 'navigation/preset';
import {defaultStackConfig} from './stack.config';

import InfoScreen from 'screens/TestScreen';
import Welcome from 'screens/Welcome';
import Edit from 'screens/Edit';

const infos = [
  {
    name: SCREENS_KEY.WELCOME,
    component: Welcome,
    auth: false,
    options: {
      ...Welcome?.options,
      headerShown: false,
    },
  },
  {
    name: SCREENS_KEY.INFO,
    component: InfoScreen,
    auth: false,
    options: {
      ...InfoScreen?.options,
      headerShown: false,
    },
  },
  {
    name: SCREENS_KEY.EDIT,
    component: Edit,
    auth: false,
    options: {
      ...Edit?.options,
      headerShown: false,
    },
  },
];

const InfoStack = createStackNavigator();

const stackNavigatorProps = {
  ...defaultStackConfig,
  initialRouteName: SCREENS_KEY.WELCOME,
};

export default function Info() {
  return (
    <InfoStack.Navigator
      // initialRouteName={SCREENS_KEY.REGISTER_CHILD}
      {...stackNavigatorProps}>
      {infos.map((info) => (
        <InfoStack.Screen
          key={info.name}
          name={info.name}
          component={info.component}
          options={info.options}
        />
      ))}
    </InfoStack.Navigator>
  );
}
