import React, { Component } from 'react';
import { Text, View } from 'react-native';

class DetailsScreen extends Component {
  //Title includes name of box
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.boxId + ' Box' : 'No box selected',
    }
  };
  /*componentWillMount(){
      this.props.navigator.setStyle({
        tabBarHidden: true
      });
  }

  static navigatorStyle = {
      tabBarHidden: true,
    };

  this.props.navigator.setStyle({ navigation }) => {
    const { params } = navigation.state;

    return {
      tabBarHidden: params.boxId ? true : false,
    }
  };

  this.props.navigator.setStyle({
    tabBarHidden: true
  });*/

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Detail of Box</Text>
      </View>
    );
  }
}

export default DetailsScreen;
