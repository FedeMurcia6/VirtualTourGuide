import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView, Dimensions, ListItem} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {Marker}  from 'react-native-maps';
import Firebase from '../constants/firebase.js';




export default class LocationGet extends Component {
  state = {
    currentLocation: null,
    errorMessage: null,
    markers:[{title: 'a', latLng: {latitude: 1, longitude: 1,}}],
  };


  componentWillMount() {
    console.log('componentWillMount');
    var database = Firebase.database();
    var name = null;
    var latitud = null;
    var longitud = null;

    database.ref('poi/' + 'buenosairesobelisco').on('value', (snapshot) => {
      name = snapshot.val().name;
      latitud = snapshot.val().latitud;
      longitud = snapshot.val().longitud;
    });
    console.log(name);

    this.setState({
      markers: [{title: name, latLng: {latitude: latitud, longitude: longitud,}},...this.state.markers,]
    })

    for (var i = this.state.markers.length - 1; i >= 0; i--) {
      console.log("marker"+i+": " + this.state.markers[i].title+" - LatLong:"+this.state.markers[i].latLng.latitude +" - "+this.state.markers[i].latLng.longitude);
    }
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

  }

  _getLocationAsync = async () => {
    console.log('getLocAsync');
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({currentLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01522, longitudeDelta: 0.00821 }});
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }


    return (
      <ScrollView style={{flex:1}} >
        <View style={{flex:1, alignItems: 'center'}}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
        <View style={styles.container}>
          <MapView style={styles.mapStyle} region={this.state.currentLocation} showsUserLocation={true}>
            {this.state.markers.map((marker, index) => (
              <MapView.Marker 
                identifier={marker.title}
                coordinate={marker.latLng}
                title={marker.title}
              />
            ))}
          </MapView>
        </View>
      </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }, 
});