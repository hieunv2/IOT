import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, HelperText, Paragraph, Title} from 'react-native-paper';
import {theme, commonStyles} from '../common/theme';

export default function ViewLabel({
  label,
  alignLabel,
  variantLabel,
  labelContainerStyle,
  helperText,
  value,
  valueStyle,
  unit,
}) {
  return (
    <View style={classes.root}>
      <View style={classes.container}>
        <View
          style={
            labelContainerStyle ? labelContainerStyle : classes.labelContainer
          }>
          <Text style={classes.label}>{label}</Text>
        </View>
        <View style={classes.valueView}>
          {value ? (
            <Paragraph style={valueStyle ? valueStyle : classes.valueStyle}>
              {value}
            </Paragraph>
          ) : (
            <Paragraph style={classes.notValueStyle} />
          )}
        </View>
        {unit && (
          <View>
            <Text style={classes.unit}>{unit}</Text>
          </View>
        )}
      </View>

      {helperText && (
        <View>
          <HelperText
            type="error"
            visible={!!helperText}
            style={classes.helperText}>
            {helperText}
          </HelperText>
        </View>
      )}
    </View>
  );
}

const classes = StyleSheet.create({
  root: {
    ...commonStyles.pTB_5,
  },
  container: {
    ...commonStyles.startEl,
    flex: 1,
  },
  labelContainer: {
    ...commonStyles.rowDirection,
    alignItems: 'center',
    flex: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
  unitView: {
    display: 'flex',
    flex: 1,
  },
  valueView: {
    display: 'flex',
    flex: 3,
    ...commonStyles.rowDirection,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 5,
  },
  helperText: {
    color: theme.colors.background,
  },
  valueStyle: {
    display: 'flex',
  },
  notValueStyle: {
    color: theme.colors.error,
  },
});

//---------------------------------------------------------------------------------------------------------------------------------------------
export const LabelGreen = ({container, label, xs}) => (
  <View
    style={
      xs
        ? [labelGreenStyles.containerXs, container]
        : [labelGreenStyles.container, container]
    }>
    <Title style={xs ? labelGreenStyles.labelXs : labelGreenStyles.label}>
      {label}
    </Title>
  </View>
);

const labelGreenStyles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    ...commonStyles.mTB_5,
  },
  containerXs: {
    paddingLeft: 5,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.primary,
    ...commonStyles.mTB_5,
  },
  labelXs: {
    fontWeight: '800',
    fontSize: 14,
  },
  label: {
    fontWeight: '800',
  },
});
