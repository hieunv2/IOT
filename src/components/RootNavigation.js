import * as React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';
import {HomeStackScreens, NoAuthStackScreens} from '@src/navigation';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function resetHome(...args) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: HomeStackScreens.USER_HOME}],
    }),
  );
}

export function setParams(params) {
  navigationRef.current?.dispatch(CommonActions.setParams(params));
}

export function getRoute() {
  return navigationRef.current?.getCurrentRoute();
}
