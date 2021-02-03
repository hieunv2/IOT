import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_KEY} from 'navigation/preset';
import {defaultStackConfig} from './stack.config';

import SettingScreen from 'screens/Setting';

const settings = [
  {
    name: SCREENS_KEY.SETTINGS,
    component: SettingScreen,
    auth: false,
    options: {
      ...SettingScreen?.options,
    },
  },
];

const SettingStack = createStackNavigator();

const stackNavigatorProps = {
  ...defaultStackConfig,
  initialRouteName: SCREENS_KEY.SETTINGS,
};

export default function Setting() {
  return (
    <SettingStack.Navigator {...stackNavigatorProps}>
      {settings.map((setting) => (
        <SettingStack.Screen
          key={setting.name}
          name={setting.name}
          component={setting.component}
          options={setting.options}
        />
      ))}
    </SettingStack.Navigator>
  );
}
