import {DefaultTheme} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';
// import {RFValue} from 'react-native-responsive-fontsize';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F17B6B',
    secondary: '#DCEDE2',
    backgroundCustom: '#F68E81',
    error: '#F0A69B',
    errorFocus: '#ba000d',
    text: 'black',
    button: '#E96F5F',
    require: '#f44336',
    active: '#d32f2f',
    materialPrimary: '#2196f3',
    money: '#FCCF00',
    inputLabel: '#000000',
  },
  header: {
    height: 80,
  },
};

export const commonStyles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  mTB_5: {
    marginTop: 5,
    marginBottom: 5,
  },
  mTB_10: {
    marginTop: 10,
    marginBottom: 10,
  },
  mTB_15: {
    marginTop: 15,
    marginBottom: 15,
  },
  mTB_20: {
    marginTop: 20,
    marginBottom: 20,
  },
  mTB_30: {
    marginTop: 30,
    marginBottom: 30,
  },
  pTB_5: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  pTB_10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  pTB_15: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  pTB_20: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  pTB_30: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  mLR_5: {
    marginLeft: 5,
    marginRight: 5,
  },
  mLR_10: {
    marginLeft: 10,
    marginRight: 10,
  },
  mLR_15: {
    marginLeft: 15,
    marginRight: 15,
  },
  mLR_20: {
    marginLeft: 20,
    marginRight: 20,
  },
  mLR_30: {
    marginLeft: 30,
    marginRight: 30,
  },
  pLR_5: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  pLR_10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  pLR_15: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  pLR_20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  pLR_30: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  startEl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sbEl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDirection: {
    display: 'flex',
    flexDirection: 'row',
  },
  fW_500: {
    fontWeight: '500',
  },
  fW_600: {
    fontWeight: '600',
  },
  fW_700: {
    fontWeight: '700',
  },
  fW_800: {
    fontWeight: '800',
  },
  viewData: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
  },
  subTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  tabBarIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  whiteLine: {
    backgroundColor: 'white',
    width: '110%',
    height: 18,
    position: 'absolute',
    bottom: 4,
    zIndex: -1,
    alignSelf: 'center',
    elevation: 1,
  },
  onTop: {
    elevation: 3,
    zIndex: 100,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.primary,
    position: 'absolute',
    left: -10,
    bottom: 15,
    transform: [{rotate: '-90deg'}],
  },
  chbItem: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  // fRS: (fontSize, screenStandard) => RFValue(fontSize, screenStandard),
  // fSRS: (fontSize, screenStandard) => ({
  //   fontSize: RFValue(fontSize, screenStandard),
  // }),
  w80: {
    width: '80%',
  },
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  halfWidth: Dimensions.get('window').width / 2,
  halfHeight: Dimensions.get('window').height / 2,
});
