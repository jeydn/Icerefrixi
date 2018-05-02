
import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ListItem} from "react-native-elements";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

class BoxesScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
      title: 'Box List',
    }

    /*
    <FlatList
        data={this.props.boxes.map(obj => {
            return {key: obj.Name, ...obj}
        })}
        renderItem={this.renderItem}
    />

    `$"Box last updated: " ${item.LastUpdated}`
    */

    formatDate(timestamp){
      const date = new Date(timestamp);
      let minutes =  date.getMinutes();
      if(minutes === 0){
        minutes = "00";
      }

      return date.getHours() + ":" + minutes;
   }
   
    render() {

        return (
            <View style={styles.container}>
              <FlatList
                 data={this.props.boxes.map(obj => {
                     return {key: obj.Name, ...obj}
                 })}
                 renderItem={this.renderItem}
                 keyExtractor={item => item.Name}
               />

            </View>
        );
    }

    renderItem({item}) {
      return (
          <ListItem
            title={item.Name}
            subtitle={`Box last updated: ${item.LastUpdated}`}
          />
      )
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 5
    },

    listItem: {
        height: 35,
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 5,
        elevation: 2,
        alignItems: "center",
        padding: 5
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
export default connect(mapStateToProps, mapDispatchToPros)(BoxesScreen);
