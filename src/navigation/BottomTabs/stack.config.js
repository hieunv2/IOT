import React from 'react';
import {HeaderBackground} from '../../components/HeaderBackground';
import {theme} from 'common/theme';

export const defaultStackConfig = {
  screenOptions: {
    headerStyle: {
      height: theme.header.height,
    },
    headerBackground: () => <HeaderBackground height={theme.header.height} />,
  },
};
