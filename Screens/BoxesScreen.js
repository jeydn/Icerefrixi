
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
                   style={styles.listView}
                   data={this.props.boxes.filter(box => {
                     if (box.Archived === false) {
                       return {key: box.Id, ...box}
                     }
                   })}
                   renderItem={this.renderItem}
                   keyExtractor={item => item.Id}
                 />

               <View style={styles.infoView}>
                 <Text style={styles.infoText}>Archived boxes</Text>
               </View>
               <FlatList
                 data={this.props.boxes.filter(box => {
                   if (box.Archived !== false) {
                     return {key: box.Id, ...box}
                   }
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
      backgroundColor: "#FFFFFF"
    },

    listItem: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        marginBottom: 5,
        elevation: 2,
        alignItems: "center",
        padding: 5
    },
    infoView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#EFEFF4",
      width: Dimensions.get('window').width,
    },
    infoText: {
      fontSize: 18,
      padding: 20,
      color: '#777'
    },
    listView: {
    //  backgroundColor: "#777",
    },
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
