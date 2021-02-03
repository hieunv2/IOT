import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_KEY} from 'navigation/preset';

// import {DEFAULT_CONFIG} from './Stack.config';

import Login from 'screens/Login';
import SMS from 'screens/Login/SMSLogin';
import Welcome from 'screens/Welcome';
import Register from 'screens/AddDevice';

const noAuth = [
  {
    name: SCREENS_KEY.LOGIN,
    component: Login,
    options: {
      ...Login?.options,
    },
  },
  {
    name: SCREENS_KEY.SMS,
    component: SMS,
    options: {
      ...SMS?.options,
    },
  },
  {
    name: SCREENS_KEY.WELCOME,
    component: Welcome,
    options: {
      ...Welcome?.options,
    },
  },
  {
    name: SCREENS_KEY.REGISTER,
    component: Register,
    options: {
      ...Register?.options,
    },
  },
];

const NoAuthStack = createStackNavigator();

const stackNavigatorProps = {
  initialRouteName: SCREENS_KEY.LOGIN,
};

export default function NoAuth() {
  return (
    <NoAuthStack.Navigator
      initialRouteName={SCREENS_KEY.LOGIN}
      {...stackNavigatorProps}>
      {noAuth.map((item) => (
        <NoAuthStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </NoAuthStack.Navigator>
  );
}
