import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import TakePictureScreen from './TakePictureScreen';

const Stack = createStackNavigator();

const StackScreen = ({navigation}) => (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
    <Stack.Screen
      name="Scan Item"
      component={BarcodeScannerScreen}
    />
    <Stack.Screen name="Take Picture" component={TakePictureScreen} />
  </Stack.Navigator>
);

export default StackScreen;
