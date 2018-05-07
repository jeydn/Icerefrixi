import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Button, ScrollView, ImageBackground } from 'react-native';
import { Badge } from 'react-native-elements';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryLabel } from "victory-native";
import Data from '../ressources/Data.json';
import Pic from '../ressources/ESP.jpg';
import { Icon } from 'react-native-elements';

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
          if (box.Id === boxId) {
            data = Object.assign({}, box, {});
            throw BreakException;
          }
          //return box
        })
    }catch(e){
      if(e === BreakException){
        return {boxId:boxId, data:data, btnDisabled:data.Archived };
        //this.setState({boxId:boxId, data:data, btnDisabled:data.Archived});
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const { params } = nextProps.navigation.state;
    var boxId =  params ? params.boxId : noBoxSelected;

    //TODO: ONLY FOR DEVELOPMENT! HAS TO BE DELETED
    if(boxId !== noBoxSelected){
      let data = null;
      const BreakException = {};

      try{
        nextProps.boxes.forEach((box) => {
            if (box.Id === boxId) {
              data = Object.assign({}, box, {});
              throw BreakException;
            }
            //return box
          })
      }catch(e){
        if(e === BreakException){
          return {boxId:boxId, data:data, btnDisabled:data.Archived};
          //this.setState({boxId:boxId, data:data, btnDisabled:data.Archived});
        }
      }
    }else{
      return {boxId:noBoxSelected, data:null, btnDisabled:false};
    }
  //  this.setBoxParams(boxId);
  }

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

 formatUpdatedDate(timestamp){
    const date = new Date(timestamp);
    return date.toLocaleDateString()
 }

  renderDetails(){
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={Pic} style={styles.image}>
            <Text style={styles.infoTextBold}>{this.state.data.Name}</Text>
          </ImageBackground>

          <View style={styles.aboutView}>
            <Text style={styles.aboutTitleText}>About the box</Text>
            <Text style={styles.aboutText}>Id: {this.state.data.Id}</Text>
            <Text style={styles.aboutText}>Last updated: {this.formatUpdatedDate(this.state.data.LastUpdated)}</Text>
            <Text style={styles.aboutText}>Description: {this.state.data.Description}</Text>
          </View>

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
                label="dddddd"
                axisLabelComponent={
                  <VictoryLabel
                      dy={20}
                      text="Time"/>}
              />
          <VictoryAxis dependentAxis
            label="dddddd"
            axisLabelComponent={
              <VictoryLabel
                  dy={-27}
                  text="Temperature"/>}
            />
          </VictoryChart>

          <View style={styles.infoViewBadge}>
            <Text style={styles.infoText}>Box openings</Text>
            <Badge containerStyle={{ backgroundColor: '#2E4761', marginRight: 15}}>
              <Text style={styles.badgeText}>{this.state.data.Openings}</Text>
            </Badge>
          </View>

          <View style={styles.container}>
            <Button
               style={styles.btnStyle}
               color="#2E4761"
               title='Archive this box'
               onPress={this.onPressArchive}
               disabled={this.state.btnDisabled}
             />
          </View>
        </View>
     </ScrollView>
   );
  }

  renderNoBoxSelected(){
    return (
      <View style={styles.containerNoBoxSelected}>
        <Icon name="ios-search"
              type="ionicon"
              color='#777'
              raised
              onPress={() => this.props.navigation.navigate('Scan')}/>
        <Text style={styles.infoTextNoBoxSelected}>No box is selected please scan a box or select a box from the list.</Text>
      </View>
    )
  }

  render() {
    if(this.state.boxId === noBoxSelected){
      return this.renderNoBoxSelected();
    }else{
      return this.renderDetails();
    }
  }
}

const styles = StyleSheet.create({
  containerNoBoxSelected: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoTextNoBoxSelected: {
    fontSize: 18,
    padding: 20,
    color: '#777'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  infoView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EFEFF4",
    width: Dimensions.get('window').width,
  },
  aboutView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#2E4761",
    width: Dimensions.get('window').width,
    padding: 20
  },
  btnStyle: {
    flex: 3,
    fontSize: 18,
    padding: 20,
    color: '#777'
  },
  infoText: {
    flex: 3,
    fontSize: 18,
    padding: 20,
    color: '#777'
  },
  infoTextBold: {
    fontWeight: 'bold',
    flex: 3,
    fontSize: 18,
    padding: 20,
    color: '#777'
  },
  aboutText: {
    fontSize: 15,
    color: '#FFFFFF',
    paddingTop: 0,
    paddingLeft: 20,
    padding: 7,
    backgroundColor: "#2E4761",
  },
  aboutTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 7,
    color: '#FFFFFF',
    backgroundColor: "#2E4761",
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF',
    padding: 10,
  },
  infoViewBadge: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#EFEFF4",
    width: Dimensions.get('window').width,
  },
  image:{
    width: Dimensions.get('window').width,
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20

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
