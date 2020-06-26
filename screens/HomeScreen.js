import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../components/authContext.js';

const HomeScreen = ({navigation}) => {
  const {logOut} = React.useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.image}>
      <Animatable.View
        animation="fadeIn"
        style={{flex: 1, flexDirection: 'column'}}
        backgroundColor="rgba(35,47,58,.95)">
        <View
          style={{
            flex: 1,
            marginTop: 50,
            marginRight: 30,
          }}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => {
                logOut();
              }}>
              <View style={styles.logOut}>
                <Text style={styles.logOutText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <View styles={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Take Picture');
                }}>
                <Animatable.View style={styles.button} animation="slideInDown">
                  <FontAwesome name="camera" color="white" size={30} />
                  <Text style={styles.subTitle}>Take Picture</Text>
                </Animatable.View>
              </TouchableOpacity>
            </View>
            <View styles={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Scan Item');
                }}>
                <Animatable.View style={styles.button} animation="slideInUp">
                  <FontAwesome name="barcode" color="white" size={30} />
                  <Text style={styles.subTitle}>Scan Item</Text>
                </Animatable.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  logOut: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  subTitle: {
    color: 'white',
    textAlign: 'center',
  },
  logOutText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
