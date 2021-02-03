/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export function HeaderBackground({height}) {
  return (
    <View
      style={{
        backgroundColor: '#F68E81',
        height: height,
        overflow: 'hidden',
      }}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle1: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 350,
    height: 350,
    borderRadius: 175,
    marginStart: -119,
    marginTop: -165,
  },
  circle2: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 250,
    height: 250,
    borderRadius: 125,
    marginStart: width / 2 - 125,
    marginTop: 35,
    position: 'absolute',
  },
});
