import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {Marker}  from 'react-native-maps';
import Firebase from '../constants/firebase.js';




export default class LocationGet extends Component {
  state = {
    currentLocation: null,
    errorMessage: null,
    markers:[],
  };

    render() {

    return (
        <View style={styles.container}>
          <MapView style={styles.mapStyle} region={this.state.currentLocation} showsUserLocation={true}>
            {this.state.markers.length>0}
              {this.state.markers.map((marker, index) => (
                <Marker key={marker.id}
                  identifier={marker.id}
                  coordinate={marker.latLng}
                  title={marker.title}
                  description={marker.desc}
                />
              ))}
          </MapView>
        </View>
    );
  }


  UNSAFE_componentWillMount () {
    /*var db = Firebase.firestore();
    let docRef = db.collection('pois').doc('1');
    let obelisco = docRef.set({
      name: 'Obelisco',
      desc: 'Obelisco de BA',
      latitude: -34.6036,
      longitude: -58.381527
    });
    console.log('guardo store');

    Firebase.database().ref('poi').push().set({
      name: 'Planetario',
      latitud:-34.575247,
      longitud: -58.417351
    })*/

/*    Firebase.database().ref('poi/-34603726-58381548').set({
        name: 'Obelisco',
        desc: 'Obelisco de buenos aires',
        latitud: -34.603726,
        longitud: -58.381548,
        realDimensions: 4,
      })*/

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    var database = Firebase.database();
    var newMarkers = [...this.state.markers];
    database.ref('poi').on('value', (pointsInterest) => {
      var keys = Object.keys(pointsInterest.val());
      for (var i =  0; i < keys.length;i++) {
        database.ref('poi/'+keys[i]).on('value', (places) => {
            //console.log('KEY/VALUE='+keys[i]+' / '+places.val().name);
            if(places!==null) {
              newMarkers=[...newMarkers, {id:places.key, desc:places.val().desc, title: places.val().name, latLng: {latitude: places.val().latitud, longitude: places.val().longitud,}}]
              
            }
        });
      }
      console.log('MARKERS LENGTH ='+newMarkers.length);
      this.setState({currentLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.02522, longitudeDelta: 0.01821 },
        markers: newMarkers});      
    });
  
  };

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