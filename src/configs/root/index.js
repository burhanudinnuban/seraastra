import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {BottomNavigator} from '../../components';
import {
  Login,
  OnBoarding,
  Splash,
  Movies,
  DetailMovie,
  Favourite,
} from '../../pages';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <BottomTab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <BottomTab.Screen name="Movies" component={Movies} />
      <BottomTab.Screen name="Favourite" component={Favourite} />
    </BottomTab.Navigator>
  );
};

const Root = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMovie"
        component={DetailMovie}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Root;
