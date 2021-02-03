import React from 'react';
import Modal from 'react-native-modal';

const ModalComponent = (props) => {
  const {children} = props;
  return (
    <Modal {...props} backdropTransitionOutTiming={10}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
