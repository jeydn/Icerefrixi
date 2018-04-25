import React from 'react';
import { Text, View, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan',
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello Icerefrixi!</Text>
      </View>
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
      title: params ? params.otherParam : 'Unnamed Box',
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
