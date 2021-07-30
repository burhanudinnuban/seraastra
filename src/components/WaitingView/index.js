import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import pages from '../../configs/styles/pages';
import {texts} from '../../configs/styles/texts';
import {colors} from '../../constants';

const WaitingView = () => {
  return (
    <View style={{...pages.centerAbsolute, ...pages.transparant}}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text allowFontScaling={false} style={texts.primaryExtraLargeBold}>
        Please wait...
      </Text>
    </View>
  );
};

export default WaitingView;
