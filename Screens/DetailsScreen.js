import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements';
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import Data from '../ressources/Data.json';

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
      var data;
      alert("Data.Boxes = " +JSON.stringify(Data.Boxes));
      alert("data length = " + Data.Boxes.length);

      for (let j=0; j<2; j++){
        alert("I bims");
      }

      for (let i = 0; i < Data.Boxes.length; i++){
        alert("blubb");
        alert("boxId = " + JSON.stringify(boxId));
        alert("Name = " + JSON.stringify(Data.Boxes[i].Name));
        if(Data.Boxes[i].Name === boxId){
          alert(Data.Boxes[i].Name + " = "+ JSON.stringify(Data.Boxes[i]));
          data = Data.Boxes[i];
          break;
        }
      }

      alert(JSON.stringify(data));

      this.setState({boxId:boxId, data:data.Temp, boxOpenings:data.Openings});
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const boxId =  params ? params.boxId : noBoxSelected;
    this.setBoxParams(boxId);
  }


  /*
componentWillMount() {
  const { params } = this.props.navigation.state;
  const boxId =  params ? params.boxId : noBoxSelected;

  this.setBoxParams(boxId);
}


  componentWillMount() {
    /*alert(JSON.stringify(this.props.navigation));

    if(this.props.navigation.params){
      alert(JSON.stringify(this.props.navigation.params[0].boxId));
      aler("I bims");
      this.setBoxParams(this.props.navigation.params[0].boxId);
    }else{
      //TODO: Just for devlopment
     this.setState({boxId:"S100033", data:Data.Boxes[0].Temp, boxOpenings:Data.Boxes[0].Openings});
   }
     if(this.props.navigation.params){
     alert(JSON.stringify(this.props.navigation.params));
     this.setBoxParams(this.props.navigation.params["boxId"]);
   }
  }

  componentWillUpdate() {
    alert(JSON.stringify(this.props.navigation.params));
  //  alert(JSON.stringify(this.props.navigation.params.boxId));
    this.setBoxParams(this.props.navigation.params);
  }

  formatDate(timestamp){
      const date = new Date(timestamp);
      let minutes =  date.getMinutes();
      if(minutes === 0){
        minutes = "00";
      }

      return date.getHours() + ":" + minutes;
  }

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
  /*  const { params } = this.props.navigation.state;
    const boxId =  params ? params.boxId : noBoxSelected;
    this.setBoxParams(boxId);
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
