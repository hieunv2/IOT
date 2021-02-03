import React from 'react';

import {TABS_KEY} from 'navigation/preset';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {theme} from 'common/theme';
import InfoStack from './InfoStack';
import SettingStack from './SettingStack';
import AutoStack from './AutoStack';

const tabs = [
  {
    name: TABS_KEY.INFO,
    component: InfoStack,
    options: {
      tabBarIcon: ({color, size}) => (
        <Icon name="info" size={size} color={color} />
      ),
    },
  },
  {
    name: TABS_KEY.AUTO,
    component: AutoStack,
    options: {
      tabBarIcon: ({color, size}) => (
        <Icon name="autoprefixer" size={size} color={color} />
      ),
      headerShown: false,
    },
  },
  {
    name: TABS_KEY.SETTING,
    component: SettingStack,
    options: {
      tabBarIcon: ({color, size}) => (
        <Icon name="cog" size={size} color={color} />
      ),
    },
  },
];

const Tab = createBottomTabNavigator();

const tabNavigatorProps = {
  initialRouteName: TABS_KEY.CHILDREN,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: theme.colors.primary,
  },
};

export default function BottomTabs() {
  return (
    <Tab.Navigator {...tabNavigatorProps}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
}
