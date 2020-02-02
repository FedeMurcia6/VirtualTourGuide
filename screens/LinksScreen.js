import React from 'react';
import {  StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Button  } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LocationGet from '../components/LocationGet.js';
import {  StackNavigator,} from 'react-navigation';



export default function LinksScreen(props) {
  return (
      <ScrollView style={{flex:1}} >
        <View style={{flex:1,flexDirection:'row'}}>
          <TouchableOpacity style={{flex:2, height:90,alignItems: 'center',justifyContent: 'center' }} onPress={()=> {
            LinksScreen.navigation.navigate('Settings')
          }} >
            <Text> Add Place </Text>
             <Text> IMG </Text>
          </TouchableOpacity>
          <Button  style={{flex:2, height:90,alignItems: 'center',justifyContent: 'center' }} 
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <LocationGet/>
      </ScrollView> 
  );
}

  static navigationOptions = ({ navigation }) => {
      return {
      title: navigation.navigate ('Settings'),
    };
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
