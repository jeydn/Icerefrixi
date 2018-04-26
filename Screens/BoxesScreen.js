import React, { Component } from 'react';
import { Text, View } from 'react-native';

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

export default BoxesScreen;
