/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, PermissionsAndroid,TouchableHighlightm, TouchableOpacity,TouchableHighlight,View,CameraRoll, Image,TextInput, Button } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import CameraRollPicker from 'react-native-camera-roll-picker';
import DocumentScanner from 'react-native-documentscanner-android';
import OpenCV from './NativeModules/OpenCV';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    titleStyle: {
      textAlign: 'center'
    },
    title: 'Invoice Uploader',
  };
  constructor(){
    super()
    this.state = { text: '' };
  }
  render() {
    console.log("opencv is loading....",OpenCV);
     return (
      <View style={styles.container}>
        <Image source={require ('./images/logo1.png')}  style={{marginLeft: '6%', marginTop: '5%'}} />
        <Text style={styles.documentname}> Document Name</Text>
        <TextInput
        style={{height: '10%', width: '80%', borderColor: 'gray', borderWidth: 2, marginLeft: '6%',  padding: '1%', backgroundColor: 'white', color: 'black'}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <TouchableHighlight onPress={this.nextpage.bind(this)}>
          <Image source={require ('./images/cameraimg.png')}  style={styles.cameraimg}  />
        </TouchableHighlight>
      </View>
    );
  }
  nextpage = async function() {
    try {
      const granted =  PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can STORE the camera")
      } else {
        console.log("camera permission denied")
      }
  }catch(e){
    console.log(e)
  }

  try {
      const granted =  PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can write storage")
      } else {
        console.log("storage permission denied")
      }
  }catch(e){
    console.log(e)
  }
  this.props.navigation.navigate('Details', {itemId: 86,otherParam: this.state.text})
  };
 }

 class DetailsScreen extends React.Component {
  constructor(){
    super()
    this.state = { text: '' };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen')
    };
  }

  render() {
    const { navigation } = this.props;
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={styles.container}>
        <DocumentScanner
          style={styles.camera}
          contrast={12}
          noGrayScale={true}
          onPictureTaken={data => {
            console.log(data)
            this.props.navigation.navigate('Preview', {otherParam: data.path, nameDocument: otherParam })
          }}
          detectionCountBeforeCapture={1}
        />
      </View>
    )
  }
}

class PreviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('nameDocument', 'A Nested Details Screen')
    };
  }

  render() {
    const { navigation } = this.props;
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={styles.container}>
        <Image source={{uri: 'file://'+otherParam}} style={styles.preview}/>
        <View style={styles.subcontainer1}>
          <TouchableHighlight
            style ={{
                height: 50,
                width:110,
                borderRadius:10,
                padding: 10,
                marginLeft: '10%',
                backgroundColor: 'white',
                alignItems: 'center',
            }}
            onPress={this.savehomepage.bind(this)}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold',}}> Save </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style ={{
                height: 50,
                width:110,
                borderRadius:10,
                marginLeft: '20%',
                marginRight: '20%',
                backgroundColor: 'white',
                padding: 10,
                alignItems: 'center',
            }}
            onPress={this.homepage.bind(this)}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold',}}> Discard </Text>
          </TouchableHighlight>
          </View>
        </View>
      );
  }

  homepage = async function() {
    var RNFS = require('react-native-fs');
    const { navigation } = this.props;
    const file = navigation.getParam('otherParam', 'some default value');
    console.log(file);
    const filePath = file.split('///').pop()  // removes leading file:///

    RNFS.exists(filePath)
      .then((res) => {
        if (res) {
          RNFS.unlink(filePath)
            .then(() => console.log('FILE DELETED'))
        }
      })
      this.props.navigation.navigate('Home', {itemId: 89,otherParam: 'data'})
  };

  savehomepage = async function() {
    this.props.navigation.navigate('Home', {itemId: 89,otherParam: 'data'})
  };
}

 const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Preview: {
     screen: PreviewScreen,
   },
  },
  {
    initialRouteName: 'Home',
  }
 );


 const AppContainer = createAppContainer(RootStack);

 export default class App extends Component {
  render() {
    return <AppContainer />;
  }
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820'
  },
  subcontainer1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "115%",
  },

  documentname:  {
    marginLeft: '6%',
    marginTop: '3%',
    color: 'white',
    fontSize: 20,
   fontWeight: 'bold'
  },
  cameraimg: {
    marginLeft: '30%',
    marginTop: '40%',
    width: 100,
    height: 90,
    justifyContent: 'flex-end'
  },
  preview: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#000',
    width: '85%',
    height: '60%',
    margin: '10%',

  },
  camera: {
    flex: 1,
    height: '10%',
    width: '100%'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: '120%',
  },
 });
