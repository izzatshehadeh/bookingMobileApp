'use strict';
import { StyleSheet , I18nManager } from 'react-native';


console.log("^^^^^^^" , I18nManager.isRTL)

module.exports = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  sectionWrapper: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
  },
  regularText: {
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
      },
      activityIndicator: {
        alignItems: 'center',
        height: 80,
      },
      SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
      },
      buttonStyle: {
        backgroundColor: '#2196F3',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#2196F3',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
      successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
      },
      mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#666',
        alignContent: 'center',
      },
     
      registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
      },
      
      dateText:{
        // alignSelf : I18nManager.isRTL ? 'right' : 'left',
         textAlign : I18nManager.isRTL ? 'right' : 'left',
         fontSize: 14,
        alignSelf: 'center',
        fontWeight: 'bold',
       },
      sideText:{
       // alignSelf : I18nManager.isRTL ? 'right' : 'left',
        textAlign : I18nManager.isRTL ? 'right' : 'left',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        //backgroundColor: "#F194FF",
      },
      buttonClose: {
        margin:10,
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      textInput: {
      
      },
});
