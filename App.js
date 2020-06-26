import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootStackScreen from './screens/RootStackScreen';
import StackScreen from './screens/StackScreen'
import { AuthContext } from './components/authContext';
import AsyncStorage from '@react-native-community/async-storage'
import {StatusBar} from 'react-native'

const Stack = createStackNavigator();

const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const authContext = React.useMemo(() => ({
    logIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const phone = foundUser[0].phone;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: phone, token: userToken });
    },
    logOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }), []);

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
      <StatusBar barStyle="light-content" />
      { loginState.userToken !== null ?  <StackScreen/> : <RootStackScreen/> }
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;