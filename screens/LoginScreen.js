import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard, Alert, AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import Users from '../assets/userdata';
import {AuthContext} from '../components/authContext.js';


const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    phone: '',
    password: '',
  });

  const {logIn} = React.useContext(AuthContext);

  const [loginAutomatically, setLoginAutomatically] = useState(false);
  const toggleSwitch = () =>
    setLoginAutomatically((previousState) => !previousState);

  const loginClick = (phone, password) => {
    const userFound = Users.filter((item) => {
      return phone == item.phone && password == item.password;
    });
    
    if (data.phone.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Input Incorrect!',
        'Phone or password cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (userFound.length == 0) {
      Alert.alert('User Not Valid!', 'Phone or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    logIn(userFound);
  };

  const phoneTextChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        phone: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        phone: val,
        check_textInputChange: false,
      });
    }
  };

  const passwordChangeText = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
      });
    } else {
      setData({
        ...data,
        password: val,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.image}>
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Animatable.View
            animation="fadeIn"
            style={styles.container}
            backgroundColor="rgba(35,47,58,.95)">
              <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 40,
              }}>
                
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}></Image>
              <View>
                <Text style={styles.subtitle}>COURIER DIRECT</Text>
              </View>
            </View>
            <View style={{flex: 3}}>
              <View style={styles.action}>
                <View style={{width: 25}}>
                  <FontAwesome name="phone" color="black" size={20} />
                </View>
                <TextInput
                  placeholder="Phone"
                  placeholderTextColor="lightgrey"
                  keyboardType="phone-pad"
                  style={[
                    styles.textInput,
                    {
                      color: 'black',
                      borderLeftColor: 'lightgrey',
                      borderLeftWidth: 2,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => phoneTextChange(val)}
                  //need to add validation
                />
              </View>
              <View style={styles.action}>
                <View style={{width: 25}}>
                  <FontAwesome name="lock" color="black" size={20} />
                </View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="lightgrey"
                  secureTextEntry={true}
                  style={[
                    styles.textInput,
                    {
                      color: 'black',
                      borderLeftColor: 'lightgrey',
                      borderLeftWidth: 2
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => passwordChangeText(val)}
                  //need to add validation
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                  {/* This functionality doens't work yet */}
                <Text style={{color: 'white'}}>Login Automatically</Text>

                <Switch
                  trackColor={{true: '#00967d', false: 'white'}}
                  value={loginAutomatically}
                  onValueChange={toggleSwitch}
                  style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 15,
                  }}
                />
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    loginClick(data.phone, data.password);
                  }}>
                  <LinearGradient
                    colors={['#70797f', ['#70797f']]}
                    style={styles.signIn}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: 'white',
                        },
                      ]}>
                      Login
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  {/* This functionality doens't work yet */}
                  <Text style={{color: 'white'}}>Forgot Your Password</Text> 
                </View>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </Animatable.View>
        </TouchableWithoutFeedback>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  subtitle: {
    paddingLeft: 10,
    paddingTop: 5,
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 16,
    letterSpacing: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  action: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingLeft: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'black',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  signIn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
  },
});

export default LoginScreen;
