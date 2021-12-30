// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef , Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { withTranslation } from 'react-i18next';
import styles from '../../Styles/style';

import Loader from '../Components/Loader';
class RegisterScreen extends Component {

  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();


    this.state = { userName: '' , userEmail:'' , userPassword:'',  loading:false , errortext : '' };
  
  
  }


  // const [
  //   isRegistraionSuccess,
  //   setIsRegistraionSuccess
  // ] = useState(false);



   handleSubmitButton = () => {
    
    this.setState({
      errortext:''
    })
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
   
    //Show Loader
    this.setState({
      loading:true
    })
    var dataToSend = {
      username:  this.state.userName,
      email:  this.state.userEmail,
      password:  this.state.userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://inl-booking.herokuapp.com/auth/signup', {
      method: 'POST',
      body: formBody,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        this.setState({
          loading:false
        })
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.success) {
          StorageService.storeUserSession(responseJson.token)
          this.props.navigation.replace('Home');
        } else {
          this.setState({
            errortext:responseJson.msg
          })
          
        }
      })
      .catch((error) => {
       this.setState({
         loading:false
       })
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../Images/drawerWhite.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render(){
    return (
      <View style={styles.mainBody}>
        <Loader loading={this.state.loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../Images/drawerWhite.png')}
              style={{
                width: '50%', 
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => this.setState({
                  UserName : UserName
                })}
                underlineColorAndroid="#f000"
                placeholder="Enter Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  this.emailInputRef.current && this.emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => this.setState({
                  userEmail : UserEmail
                })}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={this.emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this.passwordInputRef.current &&
                  this.passwordInputRef.current.focus()
                }
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
                underlineColorAndroid="#f000"
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                ref={this.passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                
                blurOnSubmit={false}
              />
            </View>
          
            {this.state.errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {this.text.errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
 
};
export default withTranslation()(RegisterScreen);

