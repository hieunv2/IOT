import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_KEY} from 'navigation/preset';
import {defaultStackConfig} from './stack.config';

import AutoScreen from 'screens/Auto';

const settings = [
  {
    name: SCREENS_KEY.AUTO,
    component: AutoScreen,
    auth: false,
    options: {
      ...AutoScreen?.options,
      headerShown: false,
    },
  },
];

const SettingStack = createStackNavigator();

const stackNavigatorProps = {
  ...defaultStackConfig,
  initialRouteName: SCREENS_KEY.AUTO,
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
