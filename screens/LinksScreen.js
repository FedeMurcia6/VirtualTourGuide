import React from 'react';
import {  StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Button  } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LocationGet from '../components/LocationGet.js';
import {  StackNavigator,} from 'react-navigation';


export default class LinksScreen extends React.Component {
    render() {
      return (
          <ScrollView style={styles.scroll} >
            <View style={styles.buttonContainer} >
              <TouchableOpacity style={{flex:2, height:90,alignItems: 'center',justifyContent: 'center' }} onPress={()=> {
                this.props.navigation.navigate('Settings')
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
  buttonContainer: {
    flex:1,
    flexDirection:'row'
  },
  scroll: {
    flex:1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
