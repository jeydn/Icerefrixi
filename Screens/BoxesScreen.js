import React, { Component } from 'react';
import  { Text, View, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

class BoxesScreen extends React.Component {
  static navigationOptions = {
    title: 'Box List',
  }

  props: {
       list: []
   };

   constructor(props) {
       super(props);
   }
   render() {
       return (
           <View style={styles.container}>
           </View>
       );
   }
 }

  /* componentDidMount() {
       this.props.navigation.setParams({deleteAllItems: this.props.deleteAllItems});
   }

   render() {
       return (
           <View style={styles.container}>
               <FlatList
                   data={this.props.list.map(i => {
                       return {key: i.color, ...i}
                   })}
                   renderItem={this.renderItem}
               />
           </View>
       );
   }

   renderItem({item}) {
       return (
           <View style={styles.listItem}>
               <Text style={{width: 80}}>{item.key}</Text>
               <View style={[styles.colorPreview, {backgroundColor: item.color}]}/>
           </View>
       )
   }

   static navigationOptions = ({ navigation }) => ({
               title: "All Colors",
               headerRight:
                   <TouchableOpacity onPress={() =>{navigation.state.params.deleteAllItems()}}>
                       <Ionicons
                           name={'ios-trash-outline'}
                           size={26}
                           style={{color: "red", marginRight: 10}}
                       />
                   </TouchableOpacity>
   })
}
*/
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default BoxesScreen;
