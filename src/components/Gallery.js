import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {theme, commonStyles} from '@src/common/theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import {t} from '@src/common/translate';

const ViewImage = React.memo(({uri, idx, onDelete, handleImagePress}) => {
  return (
    <TouchableOpacity onPress={() => handleImagePress(idx)}>
      <View style={classes.viewImg}>
        {onDelete && typeof onDelete === 'function' && (
          <TouchableOpacity
            style={classes.delImg}
            onPress={() => onDelete(idx)}>
            <Ionicons
              name="close-outline"
              color="red"
              size={25}
              style={classes.iconDel}
            />
          </TouchableOpacity>
        )}
        <Image source={{uri: uri}} style={classes.imgItem} />
      </View>
    </TouchableOpacity>
  );
});

const ViewGallery = ({
  data,
  onDelete,
  handleImagePress,
  onPressInit,
  textContent,
  initContent,
  styleContent,
}) => (
  <TouchableWithoutFeedback onPress={data.length ? null : onPressInit}>
    <View style={[classes.gallery, styleContent]}>
      {data.length ? (
        <ScrollView horizontal={true}>
          {data?.map((img, i) => (
            <ViewImage
              key={i}
              uri={img.uri}
              idx={i}
              handleImagePress={handleImagePress}
              onDelete={onDelete}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={classes.noImages}>
          {initContent ? (
            initContent
          ) : (
            <Text>{textContent ? textContent : t('no_images')}</Text>
          )}
        </View>
      )}
    </View>
  </TouchableWithoutFeedback>
);

const ViewSingleImage = ({
  data,
  onDelete,
  handleImagePress,
  onPressInit,
  textContent,
  initContent,
  styleContent,
  singleImageFull,
}) => (
  <TouchableWithoutFeedback
    onPress={Object.keys(data).length ? null : onPressInit}>
    <View style={[classes.gallery, styleContent]}>
      {Object.keys(data).length ? (
        <TouchableOpacity
          onPress={() => handleImagePress(0)}
          style={classes.singleImageWrap}>
          <View
            style={
              singleImageFull ? classes.singleImageFull : classes.singleImage
            }>
            {onDelete && typeof onDelete === 'function' && (
              <TouchableOpacity
                style={classes.delImg}
                onPress={() => onDelete(0)}>
                <Ionicons
                  name="close-outline"
                  color="red"
                  size={25}
                  style={classes.iconDel}
                />
              </TouchableOpacity>
            )}
            <Image source={{uri: data.uri}} style={classes.singleItemImage} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={classes.noImages}>
          {initContent ? (
            initContent
          ) : (
            <Text>{textContent ? textContent : t('no_images')}</Text>
          )}
        </View>
      )}
    </View>
  </TouchableWithoutFeedback>
);

function Gallery({
  dataImages,
  onDelete,
  onPressInit,
  textContent,
  initContent,
  styleContent,
  singleImage,
  singleImageFull,
}) {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  const handleImagePress = idx => {
    setIndex(idx);
    setShow(true);
  };

  return (
    <>
      <Modal visible={show} transparent={true}>
        <ImageViewer
          imageUrls={
            singleImage
              ? [
                  {
                    props: {
                      source: {uri: dataImages?.uri},
                    },
                    width: dataImages?.width,
                    height: dataImages?.height,
                    freeHeight: true,
                  },
                ]
              : dataImages
              ? dataImages.map(i => ({
                  props: {
                    source: {uri: i.uri},
                  },
                  width: i.width,
                  height: i.height,
                  freeHeight: true,
                }))
              : []
          }
          index={index}
          onSwipeDown={() => {
            setShow(false);
          }}
          enableSwipeDown={true}
        />
      </Modal>
      {singleImage ? (
        <ViewSingleImage
          data={dataImages}
          onDelete={onDelete}
          onPressInit={onPressInit}
          handleImagePress={handleImagePress}
          textContent={textContent}
          initContent={initContent}
          styleContent={styleContent}
          singleImageFull={singleImageFull}
        />
      ) : (
        <ViewGallery
          data={dataImages}
          onDelete={onDelete}
          onPressInit={onPressInit}
          handleImagePress={handleImagePress}
          textContent={textContent}
          initContent={initContent}
          styleContent={styleContent}
        />
      )}
    </>
  );
}

const classes = StyleSheet.create({
  gallery: {
    ...commonStyles.startEl,
    ...commonStyles.mTB_5,
    backgroundColor: 'white',
    height: 140,
    borderWidth: 1,
    borderColor: theme.colors.primary,
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
    borderWidth: 0.5,
    borderColor: '#999',
  },
  singleImageWrap: {
    width: '100%',
  },
  singleImage: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#999',
    // display: 'flex',
    // flex: 1,
    height: 110,
    padding: 5,
  },
  singleImageFull: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#999',
    display: 'flex',
    flex: 1,
  },
  singleItemImage: {
    width: '100%',
    height: '100%',
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
    borderWidth: 0.3,
  },
  iconDel: {
    position: 'absolute',
    top: -3.3,
    right: 2.7,
  },
  noImages: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default React.memo(Gallery);
