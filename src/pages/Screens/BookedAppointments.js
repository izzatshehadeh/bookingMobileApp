import React ,{Component} from 'react';
import {View, Text, SafeAreaView , Button , I18nManager ,  FlatList, ActivityIndicator ,  Modal, Pressable} from 'react-native';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import { ListItem, SearchBar , Avatar} from 'react-native-elements';

import styles from '../../Styles/style';
import BookedAppointmentList from '../Components/BookedAppointmentList';
import StorageService from '../../services/storage'
class BookedAppointments extends Component {


  constructor(props) {
    super(props);
    this.bookingData = props.route.params;
    
    this.state = {
      loading: false ,
      slots:[]
    };

  }

  componentDidMount() {
  
    this.props.navigation.setOptions({
      title: this.props.t('Home'),
      headerShown: true,
    });

    this.makeRemoteRequest();
  }


  makeRemoteRequest = async () => {
    
    const url = `https://inl-booking.herokuapp.com/services/userappointments`;
    this.setState({ loading: true });
    const auth = 'Bearer '+ await StorageService.retrieveUserSession();

    fetch(url , {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth, 
      }
    })
      .then(res => res.json())
      .then(res => {
      console.log(JSON.stringify(res));
       const apointments =  res.data.sort((a, b) => {
          let da = new Date(a.startTime),
              db = new Date(b.startTime);
              return da - db;
      });
        this.setState({
          slots: apointments,
      
          loading: false,
        });
        

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  render(){
  

      return (
        <SafeAreaView style={{flex: 1 , }}>
      
         
        {this.state.loading &&  
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View> 
        }
          { !this.state.loading &&      
            <View   style={{ flex: 2}} >
              <BookedAppointmentList params={this.state.slots} bookAppointment={this.bookAppointment} ></BookedAppointmentList>
            </View>
          }
        </SafeAreaView>
      )
  }
}
export default withTranslation()(BookedAppointments); ;