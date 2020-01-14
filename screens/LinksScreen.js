import React from 'react';
import {  StyleSheet, Text, View, Dimensions, ScrollView  } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LocationGet from '../components/LocationGet.js';

export default function LinksScreen() {
  return (
    <ScrollView>
        <LocationGet/>
    </ScrollView>  
  );
}

LinksScreen.navigationOptions = {
  title: 'Maps',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
