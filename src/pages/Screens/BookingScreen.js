import React ,{Component} from 'react';
import {View, Text, SafeAreaView , Button , I18nManager ,  FlatList, ActivityIndicator ,  Modal, Pressable} from 'react-native';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import { ListItem, SearchBar , Avatar} from 'react-native-elements';

import styles from '../../Styles/style';
import AppointmentsList from '../Components/AppointmentsList';
import StorageService from '../../services/storage'
class BookingScreen extends Component {


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


  makeRemoteRequest = () => {
    
    const url = `https://inl-booking.herokuapp.com/services/find`;
    this.setState({ loading: true });
    let data = {
      "text": this.bookingData.id
    }
    console.log( JSON.stringify(data))
    fetch(url , {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
      
       const apointments =  res.data.slots.sort((a, b) => {
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
  
  showToast = () => {
   // const { t } = this.props;
    Toast.show({
      type: 'success',
      text1:    "ssss ",
      text2:   "ssssssssssss",
    });
  }

  bookAppointment = async (id ) => {
    console.log("book appointment " + id)
    const url = `https://inl-booking.herokuapp.com/services/book`;
    this.setState({ loading: true });
    let data = {
      "id": id
    }
    const auth = 'Bearer '+ await StorageService.retrieveUserSession();

    fetch(url , {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth, 
      },
      
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
      
        console.log( JSON.stringify(res))
        this.showToast();
       if(res.success){
        

       }
        this.setState({
         
      
          loading: false,
        });
        setTimeout(() => {
          this.props.navigation.goBack()
        }, 4400);
      

      })
      .catch(error => {
        console.log(error)
        this.setState({ error, loading: false });
      });
  };

//   renderListItem = (data) => {
//     const id = data.item._id
//     const duration =   data.item.duration 
//     const status =   data.item.status 
//     const startTime =   data.item.startTime 
//     const javaScriptRelease = Date(startTime);
//    console.log(javaScriptRelease)
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//   //   var options = {
//   //     weekday: "short",
//   //     year: "numeric",
//   //     month: "2-digit",
//   //     day: "numeric"
//   // };
//  //   const day = javaScriptRelease.toLocaleDateString('ar', options)
//     const day =  new Date(javaScriptRelease).toLocaleDateString('ar', options);
//     console.log(day)
//     return (
// <Text>{startTime}</Text>
//       //  <StoreCard params={params}></StoreCard>
//     )
//   }


  render(){
   




      return (
        <SafeAreaView style={{flex: 1 , }}>
      
          <View  style={{flexDirection:'row',  alignItems:'center'}}>
            <View style={{ flex: 1  , paddingHorizontal:10 , paddingTop:10}}>
            <Avatar height={150} width={150} source={{ uri: this.bookingData.img }} />
            </View>
     
      <View style={{ flex: 2, alignItems: 'center',}}>
        <Text>
         {this.bookingData.name}
        </Text>
        <View >
          <Text >{this.bookingData.desc}</Text>
        </View>
        </View>
    </View>
        {this.state.loading &&  
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View> 
        }
          { !this.state.loading       &&      
            <View   style={{ flex: 2}} >
              <AppointmentsList params={this.state.slots} bookAppointment={this.bookAppointment} ></AppointmentsList>
            </View>
          }
        </SafeAreaView>
      )
  }
}
export default withTranslation()(BookingScreen); ;