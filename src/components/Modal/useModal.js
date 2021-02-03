import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import DialogComponent from './ModalComponent';

const DESTROY_TIMEOUT = 100;

const useModal = () => {
  let modalElements = [];

  const getTopModalElementId = (modalId) => {
    let returnId = modalId;
    if (returnId !== 0) {
      returnId = modalId || modalElements.length - 1;
    }
    return returnId;
  };

  const currentModal = (modalId) => {
    let returnId = modalId;
    returnId = modalId || getTopModalElementId(modalId);
    return modalElements.find((e) => e.id === modalId);
  };

  const add = (props, callback, modalId) => {
    const dialog = new RootSiblings(
      (
        <DialogComponent
          {...props}
          modalId={modalId}
          onModalHide={(id) => {
            onDialogDismissed(props.onDismissed, id);
          }}
        />
      ),
      callback,
    );
    const modalElement = {
      id: modalId,
      element: dialog,
      props,
    };
    modalElements.push(modalElement);
  };

  const destroy = (modalId) => {
    let id = modalId;
    id = modalId || getTopModalElementId(modalId);
    const modal = modalElements.find((e) => e.id === modalId);
    setTimeout(() => {
      modal?.element.destroy();
      const arrFilter = modalElements.filter((e) => e.id !== modalId);
      modalElements = [...arrFilter];
    }, DESTROY_TIMEOUT);
  };

  const onDialogDismissed = (onDismissed, modalId) => {
    onDismissed?.();
    destroy(modalId);
  };

  const update = (props, callback, modalId) => {
    currentModal(modalId)?.element?.update(
      <DialogComponent
        {...currentModal(modalId)?.props}
        {...props}
        onDismiss={() => {
          onDialogDismissed(props.onDismissed);
        }}
      />,
      () => {
        callback?.(modalId);
      },
    );
  };

  const show = (props, callback, modalId) => {
    const id = modalId || modalElements.length;
    add(
      {
        ...props,
        isVisible: true,
      },
      callback,
      id,
    );
  };

  const dismiss = (modalId, callback) => {
    const id = modalId || getTopModalElementId(modalId);
    const props = currentModal(id)?.props;
    currentModal(id)?.element?.update(
      <DialogComponent
        {...props}
        isVisible={false}
        onModalHide={() => {
          onDialogDismissed(props.onDismissed);
        }}
      />,
      () => {
        callback?.(id);
      },
    );
  };

  const dismissAll = (callback) => {
    modalElements.forEach((modal) => {
      dismiss(modal.id, callback);
    });
  };

  return {
    getTopModalElementId,
    currentModal,
    add,
    destroy,
    onDialogDismissed,
    update,
    show,
    dismiss,
    dismissAll,
  };
};

export default useModal;
