
import React, {Component} from "react";
import {FlatList, StyleSheet, Text, Dimensions, TouchableOpacity, View} from "react-native";
import {ListItem} from "react-native-elements";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

class BoxesScreen extends Component {

    constructor(props) {
        super(props);

        this.onPressListItem = this.onPressListItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    static navigationOptions = {
      title: 'Box List',
    }

    formatDate(timestamp){
      const date = new Date(timestamp);
      let minutes =  date.getMinutes();
      if(minutes === 0){
        minutes = "00";
      }

      return date.getHours() + ":" + minutes;
   }

   onPressListItem({item}) {
     this.props.navigation.navigate('Details', {boxId: item.Id});
   }

    render() {

        return (
            <View style={styles.container}>
              <View style={styles.infoView}>
                <Text style={styles.infoText}>Recently scanned boxes</Text>
              </View>
              <FlatList
                 data={this.props.boxes.map(obj => {
                     return {key: obj.Id, ...obj}
                 })}
                 renderItem={this.renderItem}
                 keyExtractor={item => item.Id}
               />

               <View style={styles.infoView}>
                 <Text style={styles.infoText}>Archived boxes</Text>
               </View>
               <FlatList
                  data={this.props.boxes.map(obj => {
                      return {key: obj.Id, ...obj}
                  })}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.Id}
                />

            </View>
        );
    }

    renderItem({item}) {
      return (
          <ListItem
            topDivider={true}
            title={item.Name}
            subtitle={`Box ID: ${item.Id}`}
            onPress={() => this.props.navigation.navigate('Details', {boxId: item.Id})}
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
