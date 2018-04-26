import React, { Component } from 'react';
import { Text, View, Button, AppRegistry, StyleSheet, TouchableOpacity, Linking, } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan',
  }
  onSuccess(e) {
    this.props.navigation.navigate('Details', {boxId: e.data});
    this.forceUpdate();
  }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Please scan QR code of the box.
          </Text>
        }
      />
    );
  }
}

class BoxesScreen extends React.Component {
  static navigationOptions = {
    title: 'Boxes',
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>List of Boxes</Text>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  //Title includes name of box
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.boxId + ' Box' : 'Unnamed Box',
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Detail of Box</Text>
      </View>
    );
  }
}

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

       // You can return any component that you like here! We usually use an
       // icon component from react-native-vector-icons
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

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
});

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
