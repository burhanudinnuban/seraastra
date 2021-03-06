import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {ButtonOutline, Gap, TextInputCustom} from '../../components';
import {display, reducer, user} from '../../constants';
import pages from '../../configs/styles/pages';
import {useDispatch} from 'react-redux';
import {ICRemoveRed} from '../../assets';
import {texts} from '../../configs/styles/texts';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const userData = user();

  function didLogin() {
    if (email === '') {
      Alert.alert('email tidak boleh kosong');
    } else if (password === '') {
      Alert.alert('password tidak boleh kosong');
    } else {
      if (userData.email === email && userData.password === password) {
        dispatch({type: reducer.ISLOGIN, value: true});
        navigation.navigate('MainApp');
      } else {
        Alert.alert('email atau password anda salah');
      }
    }
  }

  return (
    <View style={pages.center}>
      <Text allowFontScaling={false} style={texts.secondaryExtraBold}>
        Login
      </Text>
      <View style={{...pages.flexStartRow, ...pages.padding15}}>
        <Gap hp={display.hp(2)} />
        <View style={pages.row}>
          <Gap wp={display.wp(3)} />
          <Text allowFontScaling={false} style={texts.secondaryBold}>
            Email
          </Text>
        </View>
        <Gap hp={display.hp(1)} />
        <TextInputCustom
          value={email}
          onChangeText={e => setemail(e)}
          onPressIconRight={() => setemail('')}
          placeholder={'Type your email here...'}
          iconRight={
            email ? (
              <ICRemoveRed width={display.wp(7)} height={display.wp(7)} />
            ) : null
          }
        />
        <Gap hp={display.hp(2)} />
        <View style={pages.row}>
          <Gap wp={display.wp(3)} />
          <Text allowFontScaling={false} style={texts.secondaryBold}>
            Password
          </Text>
        </View>
        <Gap hp={display.hp(1)} />
        <TextInputCustom
          value={password}
          secureTextEntry={true}
          onChangeText={e => setpassword(e)}
          onPressIconRight={() => setpassword('')}
          placeholder={'Type your password here...'}
          iconRight={
            password ? (
              <ICRemoveRed width={display.wp(7)} height={display.wp(7)} />
            ) : null
          }
        />
      </View>
      <Gap hp={display.hp(2)} />
      <ButtonOutline
        onPress={didLogin}
        title={'Login'}
        width={display.wp(50)}
      />
    </View>
  );
};

export default Login;
