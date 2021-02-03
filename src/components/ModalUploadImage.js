import React, {useImperativeHandle, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {theme, commonStyles} from '@src/common/theme';
import {Portal, Divider, Title} from 'react-native-paper';
import {Modalize} from 'react-native-modalize';
import ViewButton from '@src/components/Button';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';

export const ModalPickerImage = React.memo(
  React.forwardRef(
    (
      {pickerImageFromLib, pickerImageFromCamera, flagImageFromLib = true},
      ref,
    ) => {
      const modalRef = useRef();
      const [emitValue, setEmitValue] = useState(null);

      useImperativeHandle(
        ref,
        () => ({
          show: () => modalRef.current?.open(),
          hide: () => modalRef.current?.close(),
          showEmitValue: values => {
            setEmitValue(values);
            modalRef.current?.open();
          },
        }),
        [modalRef],
      );

      return (
        <Portal>
          <Modalize adjustToContentHeight ref={modalRef}>
            <View style={modalPickerStyle.viewModal}>
              <Title style={modalPickerStyle.title}>画像を選択</Title>
              <Divider />
              {flagImageFromLib ? (
                <ViewButton
                  label="ライブラリー"
                  mode="text"
                  disabledRadius
                  disabledRootStyle
                  onPress={() => pickerImageFromLib(emitValue)}
                />
              ) : null}
              <Divider />
              <ViewButton
                label="カメラ"
                mode="text"
                disabledRadius
                disabledRootStyle
                onPress={() => pickerImageFromCamera(emitValue)}
              />
              <Divider />
              <ViewButton
                label="キャンセル"
                mode="text"
                disabledRootStyle
                disabledRadius
                labelStyle={modalPickerStyle.labelExit}
                onPress={() => ref.current?.hide()}
              />
            </View>
          </Modalize>
        </Portal>
      );
    },
  ),
);

const modalPickerStyle = StyleSheet.create({
  viewModal: {
    ...commonStyles.pLR_20,
    ...commonStyles.pTB_10,
  },
  title: {
    textAlign: 'center',
  },
  labelExit: {
    color: '#448aff',
  },
});

//----------------------------------------------------------------------------------------

const ViewImage = React.memo(({uri, index, onDelete, handleImagePress}) => {
  return (
    <TouchableOpacity onPress={() => handleImagePress(index)}>
      <View style={modalShowStyle.viewImg}>
        {onDelete && typeof onDelete === 'function' && (
          <TouchableOpacity
            style={modalShowStyle.delImg}
            onPress={() => onDelete(index)}>
            <Ionicons
              name="ios-close"
              color="red"
              size={25}
              style={modalShowStyle.iconDel}
            />
          </TouchableOpacity>
        )}
        <Image source={{uri: uri}} style={modalShowStyle.imgItem} />
      </View>
    </TouchableOpacity>
  );
});

export const ModalShowImage = React.memo(
  React.forwardRef(
    (
      {
        dataImages,
        onUploadPress,
        onDelete,
        title,
        labelUpload,
        uploadLoading = false,
      },
      ref,
    ) => {
      const modalRef = useRef();
      const [show, setShow] = useState(false);
      const [index, setIndex] = useState(0);

      useImperativeHandle(
        ref,
        () => ({
          show: () => modalRef.current?.open(),
          hide: () => modalRef.current?.close(),
        }),
        [modalRef],
      );

      const handleImagePress = idx => {
        setIndex(idx);
        setShow(true);
      };

      return (
        <>
          <Modal visible={show} transparent={true}>
            <ImageViewer
              imageUrls={dataImages.map(i => ({
                props: {
                  source: {uri: i.uri},
                },
                width: i.width,
                height: i.height,
                freeHeight: true,
              }))}
              index={index}
              onSwipeDown={() => {
                setShow(false);
              }}
              enableSwipeDown={true}
            />
          </Modal>
          <Portal>
            <Modalize adjustToContentHeight ref={modalRef}>
              <View style={modalPickerStyle.viewModal}>
                <View style={modalShowStyle.header}>
                  <Title style={modalShowStyle.title}>{title}</Title>
                  <Ionicons
                    name="ios-close"
                    color={'#448aff'}
                    size={30}
                    onPress={() => ref.current?.hide()}
                    style={modalPickerStyle.exitIcon}
                  />
                </View>
                <Divider />
                <View style={modalShowStyle.content}>
                  <FlatList
                    numColumns={3}
                    data={dataImages}
                    renderItem={({item, index}) => (
                      <ViewImage
                        uri={item.uri}
                        index={index}
                        onDelete={onDelete ? onDelete : null}
                        handleImagePress={handleImagePress}
                      />
                    )}
                    keyExtractor={item => item.uri}
                  />
                </View>
                <Divider />
                <ViewButton
                  label={labelUpload}
                  loading={uploadLoading}
                  mode="text"
                  disabledRootStyle
                  disabledRadius
                  labelStyle={modalShowStyle.labelUpload}
                  onPress={() => onUploadPress()}
                />
              </View>
            </Modalize>
          </Portal>
        </>
      );
    },
  ),
);

const modalShowStyle = StyleSheet.create({
  viewModal: {
    // ...commonStyles.pLR_20,
    ...commonStyles.pTB_10,
  },
  content: {
    minHeight: 500,
    backgroundColor: theme.colors.background,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  imgItem: {
    width: 100,
    height: 100,
  },
  viewImg: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    height: 110,
    width: 110,
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelUpload: {
    color: '#448aff',
  },
  exitIcon: {
    alignSelf: 'flex-end',
  },
  header: {
    ...commonStyles.rowDirection,
    justifyContent: 'space-between',
  },
  delImg: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 100,
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDel: {
    position: 'absolute',
    top: -2.5,
    right: 5,
  },
});
