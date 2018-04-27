import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import Data from '../Ressources/Data.json';

class DetailsScreen extends Component {
  static data = null;

  constructor(props) {
    super(props);
    this.state = {
      boxId: null,
      data: null,
      boxOpenings: null
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
      this.setState({boxId:boxId, data:Data[boxId], boxOpenings:Data[boxId].Openings});
    }else{
      //TODO: Just for devlopment
      this.setState({boxId:"S100033", data:Data["S100033"].Temp, boxOpenings:Data["S100033"].Openings});
    }
  }

  componentWillMount() {
    this.setBoxParams(this.title);
  }

  formatDate(timestamp){
      const date = new Date(timestamp);
      let minutes =  date.getMinutes();
      if(minutes === 0){
        minutes = "00";
      }

      return date.getHours() + ":" + minutes;
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
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Temperature inside the box</Text>
        </View>

        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: "#2E4761" },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.state.data}
            x="x"
            y="y"
          />
          <VictoryAxis
              tickFormat={(x) => this.formatDate(x)}
            />
        <VictoryAxis dependentAxis />
        </VictoryChart>

        <View style={styles.infoViewBadge}>
          <Text style={styles.infoText}>Box openings</Text>
          <Badge containerStyle={{ backgroundColor: '#2E4761', marginRight: 32}}>
            <Text style={styles.badgeText}>{this.state.boxOpenings}</Text>
          </Badge>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  infoView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EFEFF4",
    width: Dimensions.get('window').width,
  },
  infoText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  badgeText: {
    fontSize: 25,
    color: '#FFFFFF',
    padding: 15,
  },
  infoViewBadge: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EFEFF4",
    width: Dimensions.get('window').width,
  },
});

export default DetailsScreen;
