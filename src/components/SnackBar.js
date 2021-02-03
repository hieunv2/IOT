import React, {createContext, Fragment, useContext, useState} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import {theme} from '@src/common/theme';

const styles = {
  success: {backgroundColor: theme.colors.primary},
  error: {backgroundColor: theme.colors.error},
};

const SnackBarContext = createContext();

const defaultOptions = {
  duration: 2000,
  handleDismiss: () => {},
  action: {
    label: 'Undo',
    onPress: () => {},
  },
};

const Toast = ({visible, onDismiss, options}) => {
  console.log(111111111, options);
  const {duration, message, action, type} = options;
  return (
    <Snackbar
      style={[
        {
          position: 'absolute',
          bottom: 85,
        },
        styles[type],
      ]}
      duration={duration}
      visible={visible}
      onDismiss={onDismiss}
      action={action}>
      {message}
    </Snackbar>
  );
};

export default function SnackBarProvider(props) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  const onDismiss = () => {
    if (typeof options.handleDismiss === 'function') {
      options.handleDismiss();
    }
    setVisible(false);
  };

  const show = opts => {
    setOptions({...options, ...opts});
    setVisible(true);
  };

  return (
    <Fragment>
      <SnackBarContext.Provider value={{show}} {...props} />
      <Portal>
        <Toast visible={visible} onDismiss={onDismiss} options={options} />
      </Portal>
    </Fragment>
  );
}

export const useSnackBar = () => {
  const utils = useContext(SnackBarContext);
  return utils;
};
