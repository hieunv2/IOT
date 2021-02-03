import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';
import {commonStyles} from '@src/common/theme';

export default function Loading({bgColor}) {
  return (
    <View style={styles.root(bgColor)}>
      <LottieView
        source={require('../assets/lottie/25225-abstract-loader.json')}
        autoPlay
        speed={1}
      />
    </View>
  );
}

export const LoadMore = () => {
  return (
    <View style={styles.loadMoreContainer}>
      <LottieView
        source={require('../assets/lottie/4248-loading.json')}
        autoPlay
        speed={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: bgColor => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: bgColor ? bgColor : 'white',
  }),
  loadMoreContainer: {
    width: '100%',
    height: 30,
    ...commonStyles.mTB_15,
  },
});
