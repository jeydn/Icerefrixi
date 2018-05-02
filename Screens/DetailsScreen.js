import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import Data from '../ressources/Data.json';

import { connect } from 'react-redux';

const noBoxSelected = "No box selected";

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxId: null,
      data: null,
      boxOpenings: null
    };

    this.setBoxParams = this.setBoxParams.bind(this);
  }

  //Title includes name of box
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.boxId : noBoxSelected,
    }
  };

  setBoxParams(boxId){
      let data;
      let BreakException = {};

      const boxes = Data.boxes;

      try{
        boxes.forEach((obj,boxId) => {
            if(obj.Name === boxId){
            data = obj;
            throw BreakException;
          }
        });
      }catch (e){
        //Do nothing
      }


      this.setState({boxId:boxId, data:data.Temp, boxOpenings:data.Openings});
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    var boxId =  params ? params.boxId : noBoxSelected;

    //TODO: ONLY FOR DEVELOPMENT! HAS TO BE DELETED
    if(boxId === noBoxSelected){
      boxId = "S100033"
    }
    this.setBoxParams(boxId);
  }

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
            x="Time"
            y="Temperature"
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
