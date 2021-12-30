
import * as React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from './src/pages/Screens/LoginScreen';

import HomeScreen from './src/pages/Screens/HomeScreen';
import RegisterScreen from './src/pages/Screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/Screens/SplashScreen';
const Stack = createNativeStackNavigator();
import './src/i18n'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  ThemeProvider } from 'react-native-elements';
import BookingScreen  from './src/pages/Screens/BookingScreen'

import BookedAppointments from './src/pages/Screens/BookedAppointments'
class App extends React.Component {
  constructor(props) {
    super(props)
 }

 

  render(){
  return (
    <ThemeProvider>
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        <Stack.Screen name="Booking" component={BookingScreen} />
        
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BookedAppointments" component={BookedAppointments} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </ThemeProvider>
  );
  }
}

export default App;
