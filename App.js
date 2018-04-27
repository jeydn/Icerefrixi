import React, { Component } from 'react';
import { Text, View, Button, AppRegistry, StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsScreen from './Screens/DetailsScreen.js';
import ScanScreen from './Screens/ScanScreen.js';
import BoxesScreen from './Screens/BoxesScreen.js';

const tab = TabNavigator(
 {
   Scan: { screen: ScanScreen },
   Boxes: { screen: BoxesScreen },
   Details: { screen: DetailsScreen },
 },
 {
   navigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, tintColor }) => {
       const { routeName } = navigation.state;
       let iconName;
       if (routeName === 'Scan') {
         iconName = `ios-qr-scanner${focused ? '' : '-outline'}`;
       } else if (routeName === 'Boxes') {
         iconName = `ios-cube${focused ? '' : '-outline'}`;
       } else if (routeName === 'Details') {
         iconName = `ios-list-box${focused ? '' : '-outline'}`;
       }

       return <Ionicons name={iconName} size={25} color={tintColor} />;
     },
   }),

   tabBarOptions: {
     activeTintColor: '#004880',
     inactiveTintColor: 'gray',
   },
   tabBarComponent: TabBarBottom,
   tabBarPosition: 'bottom',
   animationEnabled: false,
   swipeEnabled: true,
 }
);

//TabNavigator inside of StackNavigator
export default StackNavigator({
   MyTab: {
     screen: tab,
     navigationOptions: {
       headerStyle: {
        backgroundColor: '#2E4761',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
})
