// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React ,{Component} from 'react';
import {View, Text,  I18nManager ,  FlatList, ActivityIndicator ,  Modal, Pressable} from 'react-native';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import FAB from 'react-native-fab';
import { SearchBar } from 'react-native-elements';

import styles from '../../Styles/style';
import StoreCard from '../Components/StoreCard';

import StorageService from '../../services/storage'

class HomeScreen extends Component {


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      modalVisible: false , 
      modalData : {}
    };
    this.arrayholder = [];


    
  }


  
  goToBookedAppointments = (data ) => {
    this.handleClose()
    this.props.navigation.navigate("BookedAppointments" , data);

  }
  goToBooking = (data ) => {

    this.props.navigation.navigate("Booking" , data);

  }



  componentDidMount() {
    this.makeRemoteRequest();
    this.props.navigation.setOptions({
      title: this.props.t('Home'),
      headerShown: false,
    });
  }

  makeRemoteRequest = () => {

    const url = `https://inl-booking.herokuapp.com/services/getallPopulated`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
      //  console.log(JSON.stringify( res ) )
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.data;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '99%',
          backgroundColor: '#CED0CE',
          marginLeft: '1%',
          opacity: 0.1
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.nameEn.toUpperCase()} ${item.nameAr.toUpperCase()} ${item.descriptionEn.toUpperCase()} ${item.descriptionAr.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    const { t } = this.props;
    console.log(t("home"))
   // console.log(i18n.language)
    return (
      <SearchBar style={styles.sideText}
        placeholder={t("search")}
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  handleClick = (params) => {
    this.goToBooking(params)
  }

  renderListItem = (data) => {
    const id = data.item._id
    const name =   i18n.language === 'en' ? data.item.nameEn : data.item.nameAr
    const desc =   i18n.language === 'ar' ? data.item.descriptionEn : data.item.descriptionAr
    const img = data.item.imageURL;
    i18n.language === 'ar' ? 'en' : 'ar'

    params  = {
      id  : id,
      name:name,
      desc:desc,
      img:img,
      callback: this.handleClick
    }
   
    return (
       <StoreCard params={params}></StoreCard>
    )
  }

  handleClose = () => {
    this.setState({modalVisible : false})
  }
  handleShow = () => {
    this.setState({modalVisible : true})
  }

  render() {
    const { t } = this.props;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }  }>
        
       

        <FlatList
          data={this.state.data}
          renderItem={ this.renderListItem}
         
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
         
          <FAB
          visible={this.state.fabIsVisible}
          onClickAction={()=>{this.setState({
            modalVisible : true
          })}}
         
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
          
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => 
                { i18n
                  .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                  .then(() => {
                    I18nManager.forceRTL(i18n.language === 'ar');
                    RNRestart.Restart();
                  })}
                }
              >
                <Text style={styles.textStyle}> {t("language")}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                 

                  StorageService.removeUserSession().then(()=>{
               
                  });
                  this.props.navigation.replace('Splash');
                }
              }
                
                
              >
                <Text style={styles.textStyle}>      {t("logout")}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  
                 this.goToBookedAppointments()
                }
                }
              >
                <Text style={styles.textStyle}>{t("mybookings")}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  
};

export default withTranslation()(HomeScreen);