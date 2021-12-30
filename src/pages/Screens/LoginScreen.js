// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {Component, useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  I18nManager
} from 'react-native';
//import {  translate } from '../translations/translateConstant'
import i18n from 'i18next';

import StorageService from '../../services/storage'

import styles from '../../Styles/style';
import Loader from '../Components/Loader';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTranslation } from 'react-i18next';


import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

class LoginScreen extends Component {


  constructor(props) {
    super(props);
    this.passwordInputRef = React.createRef();
    this.state = { userEmail: '' , userPassword:'' , loading:false , errortext : '' };
  
  
  }
  componentDidMount() {
 
  };


  handleSubmitPress = () => {
    this.state.errortext = '';
   
    if (!this.state.userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!this.state.userPassword) {
      alert('Please fill Password');
      return;
    }
    this.setState({loading:true});
    
    let dataToSend = {email: this.state.userEmail, password: this.state.userPassword};
  

    fetch('https://inl-booking.herokuapp.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading:false});
        console.log(responseJson);
        if (responseJson.success === true) {
          console.log(responseJson.data.email);
        
          StorageService.storeUserSession(responseJson.token)
          this.props.navigation.replace('Home');
        } else {
          this.setState({errortext:responseJson.message});
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        this.setState({loading:false});
        console.error(error);
      });
  };

  render() {
    const { t } = this.props;
    return(
    <View style={styles.mainBody}>

       
       
    <Loader loading={this.state.loading} />
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View>
        
        <KeyboardAvoidingView enabled>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require(
                  '../../Images/drawerWhite.png')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
               this.setState({
                 userEmail : UserEmail
               })
             
              }
              placeholder={t("email")}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                this.passwordInputRef.current &&
                this.passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                this.setState({
                  userPassword : UserPassword
                })
               
              }
              placeholder={t("password")}
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={this.passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          {this.state.errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {this.state.errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.handleSubmitPress}>
            <Text style={styles.buttonTextStyle}>{t("signin")}</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => 
            this.props. navigation.navigate('Register')
            }>
           {t("register")}
          </Text>
          <View style={styles.sectionWrapper}>
          <Button
            title=  {t("language")}
            onPress={() => {
              i18n
                .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                .then(() => {
                  I18nManager.forceRTL(i18n.language === 'ar');
                  RNRestart.Restart();
                });
            }}
          />
        </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  </View>)

  }
}

export default withTranslation()(LoginScreen);

