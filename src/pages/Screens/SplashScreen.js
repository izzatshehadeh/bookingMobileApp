// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect , Component} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import StorageService from '../../services/storage'
import styles from '../../Styles/style';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { animating: true };

this.loadPage()
  }

  async getUser(){
    this.setState({animating: false});
    var token =  await StorageService.retrieveUserSession();
    console.log("ON SPLASH")
    console.log(token)
    if(token !== "" && token != null){
      this.props.navigation.replace('Home')
    }else{
      this.props.navigation.replace('Login')
    }
  }
  loadPage(){
   setTimeout(() => {
    this.getUser()
     
   }, 500);
  }

  render() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/drawerWhite.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={this.state.animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  )
  }
};



export default SplashScreen;

