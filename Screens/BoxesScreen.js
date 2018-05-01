
import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

class BoxesScreen extends Component {
    props: {
        list: []
    };

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
      title: 'Box List',
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

    colorPreview: {
        height: 20,
        width: 20,
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
