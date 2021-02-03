/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AuthProvider, {createAuthContext} from 'common/AuthProvider';
import Toast from 'react-native-toast-message';
import {theme} from 'common/theme';
import Navigation from './navigation';
import {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    createAuthContext(null);
  });

  return (
    <SafeAreaProvider>
      <PaperProvider
        settings={{
          icon: (props) => <AwesomeIcon {...props} />,
        }}
        theme={theme}>
        <AuthProvider>
          <Navigation />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
