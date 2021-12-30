import React ,{Component} from 'react';
import {View, Text, SafeAreaView , Button , I18nManager ,  FlatList, ActivityIndicator ,  Modal, Pressable} from 'react-native';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import { ListItem, SearchBar , Avatar} from 'react-native-elements';

import styles from '../../Styles/style';

class StoreCard extends Component {

  render(){

    //console.log(JSON.stringify(this.props));
      return (
        
    <Pressable
        onPress={() => {
            this.props.params.callback(this.props.params)
        }}
      >
      <ListItem>
      <Avatar height={150} width={150} source={{ uri: this.props.params.img }} />
      <ListItem.Content>
        <ListItem.Title>
         {this.props.params.name}
        </ListItem.Title>
        <View style={styles.subtitleView}>
         
          <Text style={styles.ratingText}>{this.props.params.desc}</Text>
        </View>
      </ListItem.Content>
    </ListItem>
    </Pressable>
      )
  }
}
export default StoreCard;