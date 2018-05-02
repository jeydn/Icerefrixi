import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import { Badge } from 'react-native-elements';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import Data from '../ressources/Data.json';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

const noBoxSelected = "No box selected";

class DetailsScreen extends Component {
  props: {
    archiveItem: () => {},
  }
  constructor(props) {
    super(props);

    this.state = {
      boxId: null,
      data: null,
      btnDisabled: false,
    };

    this.setBoxParams = this.setBoxParams.bind(this);
    this.onPressArchive = this.onPressArchive.bind(this);
  }

  //Title includes name of box
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.boxId : noBoxSelected,
    }
  };

  setBoxParams(boxId){
    let data = null;
    const BreakException = {};

    try{
      this.props.boxes.forEach((box) => {
          if (box.Name === boxId) {
            data = Object.assign({}, box, {});
            throw BreakException;
          }
          //return box
        })
    }catch(e){
      if(e === BreakException){
        this.setState({boxId:boxId, data:data, btnDisabled:data.Archived});
      }
    }
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
/*
  static getDerivedStateFromProps(nextProps, prevState){
    const { params } = nextProps.navigation.state;
    var boxId =  params ? params.boxId : noBoxSelected;

    prevState.setBoxParams(boxId);
  }
*/
  onPressArchive(){
    this.props.navigation.navigate('Boxes');
    this.props.archiveItem(this.state.boxId);
    this.setBoxParams(this.state.boxId);
  }

  formatDate(timestamp){
    const date = new Date(timestamp);
    let minutes =  date.getMinutes();
    if(minutes === 0){
      minutes = "00";
    }

    return date.getHours() + ":" + minutes;
 }

  render() {
/*
<View style={styles.container}>
  <Button
     title='Archive this box'
     onPress={this.onPressArchive}
     disabled={this.state.BtnDisabled}
   />
</View>
*/
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
            data={this.state.data.Temp}
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
            <Text style={styles.badgeText}>{this.state.data.Openings}</Text>
          </Badge>
        </View>

        <View style={styles.container}>
          <Button
             color="#2E4761"
             title='Archive this box'
             onPress={this.onPressArchive}
             disabled={this.state.btnDisabled}
           />
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
  }
});

function mapStateToProps(state) {
    return {
        boxes: state.boxes,
    }
}
function mapDispatchToPros(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToPros)(DetailsScreen);
