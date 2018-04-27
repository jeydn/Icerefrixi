import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import Data from '../Ressources/Data.json';
/*
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
*/

class DetailsScreen extends Component {
  static data = null;

  constructor(props) {
    super(props);
    this.state = {
      boxId: null,
      data: null
    };

    this.setBoxParams = this.setBoxParams.bind(this)
  }

  //Title includes name of box
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.boxId + ' Box' : 'No box selected',

    }
  };

  setBoxParams(boxId){
    if(boxId){
      this.setState({boxId:boxId, data:Data[boxId]});
    }else{
      this.setState({boxId:"S100033", data:Data["S100033"].Temp});
    }
    alert(JSON.stringify(Data["S100033"].Temp));
  }

  componentWillMount() {
    this.setBoxParams(this.title);
  }
  /*
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
  });

  <VictoryLine data={this.state.data}/>

  */

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: "#004880" },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.state.data}/>
        </VictoryChart>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default DetailsScreen;
