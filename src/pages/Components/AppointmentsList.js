import React ,{Component} from 'react';
import {View, Text, Alert  , SafeAreaView , Button , I18nManager ,  FlatList, ActivityIndicator ,  Modal, Pressable} from 'react-native';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import Moment from 'moment';
//import  'moment/locale/en-gb';
import 'moment/locale/ar';
import { Card} from 'react-native-elements';

import styles from '../../Styles/style';

class AppointmentsList extends Component {


  constructor(props) {
    super(props);
    Moment.locale(i18n.language);
    this.state = {
      loading: false ,
      slots:[]
    };


  }

   showConfirmDialog = (id) => {
    const { t } = this.props;
    return Alert.alert(

      t("book"),
     t("confirmBook"),
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            this.props.bookAppointment(id)
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  renderListItem = (data) => {
    const id = data.item._id
    const duration =   data.item.duration || "10"
    const startTime =   data.item.startTime 
    const { t } = this.props;
    return (
      <Card>
      <Card.Title>{Moment(startTime).calendar()}</Card.Title>
      <Card.Divider />
    
          <View  style={{ alignItems:'center'  , justifyContent: 'space-between' , flex:1,}}>
          <View  style={{flexDirection:'row',  alignItems:'center' , justifyContent:'center'}}>
      
            <Text style={styles.dateText}> {t('duration')} : </Text> 
            <Text style={styles.dateText}>{duration}</Text> 
            <Text style={styles.dateText}> {t('minutes')}  </Text> 
          </View>
          
          <Button style={ { padding:20 }}
            title={t("book")}
            onPress={() => {
              this.showConfirmDialog(id);
               
            }}
          />

          </View>
      
    </Card>
     
     
    )
  }


  render(){
   
  
//console.log(this.props.params)
    

      return (
    <FlatList
          data={this.props.params}
          renderItem={ this.renderListItem}
         
          keyExtractor={item => item._id}
        
        />
  
      )
  }
}
export default withTranslation()(AppointmentsList); ;