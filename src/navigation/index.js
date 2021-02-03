import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from 'common/AuthProvider';

import BottomTabs from './BottomTabs';
import NoAuth from './NoAuthStack';

const RootStack = createStackNavigator();

export default function Navigation() {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        {user ? (
          <RootStack.Screen name="BottomsTab" component={BottomTabs} />
        ) : (
          <RootStack.Screen name="NoAuth" component={NoAuth} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
