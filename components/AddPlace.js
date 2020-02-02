import React, { Component } from 'react';
import { Modal, TouchableWithoutFeedback, Text, StyleSheet, Platform, View, Picker, TextInput, TouchableOpacity, Button, Image, ScrollView} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import * as ImagePicker from 'expo-image-picker';
import Firebase from '../constants/firebase.js';
import 'firebase/storage';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



	class AddPlace extends Component {
		constructor(props) {
			super(props);
			this.state = {placeName: '', placeDesc: '', placeLat: '', placeLong: '', physicalWidth: '', image: null,};
      this.handleSubmit = this.handleSubmit.bind(this);
	  }

    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

    handleSubmit = async() => {
      /*var id= ''+this.state.placeLat+this.state.placeLong;*/
      var id = '-34.600978-58.383203';
      id = id.split('.').join('');
      Firebase.database().ref('poi/'+id).set({
        name: this.state.placeName,
        desc: this.state.placeDesc,
        latitud: Number(this.state.placeLat),
        longitud: Number(this.state.placeLong),
        realDimensions: Number(this.state.physicalWidth),
      })

      var storageRef = Firebase.storage().ref();
      const response = await fetch(this.state.image);
      const blob = await response.blob();
      var mountainImagesRef = storageRef.child('images/'+id+'.jpg');
      var uploadTask = mountainImagesRef.put(blob);
    }

      UNSAFE_componentWillMount() {
          this._getLocationAsync();
        
      }

      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ placeLat:location.coords.latitude, placeLong:location.coords.latitude });
      };


  	render() {
      let { image } = this.state;
    	return (
      <View style={{flex:1}}>  
      <ScrollView style={{flex:1}} >  
        <View contentContainerStyle={styles.container}>
        	<View style={styles.content}>
	          <View style={styles.inputContainer}>
	            <Text style={styles.textStyle}>
	            	Place Name
	            </Text>
	            <TextInput
	              placeholder={'Tower Bridge'}
	              style={styles.input}
	              onChangeText={placeName => this.setState({ placeName })}
	              value={this.state.placeName}
                inlineImageLeft='search_icon'
	            />
	          </View>
	          <View style={styles.inputContainer}>
	            <Text style={styles.textStyle}  accessibilityRole='checkbox'>
	            	Place Description
	            </Text>
	            <TextInput
	              placeholder={'Tower Bridge of Londond'}
	              style={styles.input}
	              onChangeText={placeDesc => this.setState({ placeDesc })}
	              value={this.state.placeDesc}
	            />
	          </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textStyle}>
                Place Location
              </Text>
              <View style={{flex:1, flexDirection:'row'}}>  
                <TextInput
                  style={[styles.inputLoc]}
                  value={this.state.placeLoc}
                  placeholder={'LAT'}
                  editable={false}
                  keyboardType='numeric'
                >{this.state.placeLat}</TextInput>
                <TextInput
                  style={[styles.inputLoc]}
                  value={this.state.placeLoc}
                  placeholder={'LONG'}
                  editable={false}
                  keyboardType='numeric'
                >{this.state.placeLong}</TextInput>
              </View>
            </View>
	          <View style={styles.imageContainer}>
	            	<Text style={styles.textStyle}>
	            		Place Image
	            	</Text>
                <View style={styles.button}>
                  <Button type="clear" title="Select Image " onPress={this._pickImage}  />
                </View>  
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                <Text style={styles.textStyle}  accessibilityRole='checkbox'>
                  Aproximate Real World Width (meters)
                </Text>
                <TextInput
                  placeholder={'10'}
                  style={styles.input}
                  onChangeText={physicalWidth => this.setState({ physicalWidth })}
                  value={this.state.physicalWidth}
                  keyboardType='numeric'
                />  
	          </View>
 
        	</View>
      	</View>
        </ScrollView>
          <View style={styles.buttonContainer2}>
          <Button title="Save" onPress={this.handleSubmit} style={{with:20}} />
        </View> 
    </View> 

    	);
    	}     
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex:1,
  },
  inputContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor: '#fbfbfb',
    paddingVertical: 5,
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,

  },
  imageContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems:'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 5,
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 200,
    paddingHorizontal: 8,

  },
  input: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 3,
    justifyContent: 'center',
    includeFontPadding: true,
  },
  inputLoc: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
    includeFontPadding: true,
    flex:1,
    marginLeft:15,
    marginRight:15
  },
  button: {
    marginBottom: 10,

  },
  textStyle: {flex:2,textAlign: 'center', height:40, justifyContent: 'center', includeFontPadding: true ,marginTop:10},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#ececec',
  },
   buttonContainer2: {
    justifyContent: 'center',
    flexDirection:'row',
    marginBottom: 10,
  },
  image: {
    flex:1,  
    width: 150, height: 150
  },
});

export default AddPlace;