import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

import Data from '../ressources/Data.json';

class ScanScreen extends React.Component {
  props: {
    addItem: () => {},
  }

  constructor(props) {
    super(props);
    //TODO: Only for development
    //this.initSequence(); 
  }

  static navigationOptions = {
    title: 'Scan',
  }

  initSequence(){
    this.props.deleteAllItems();
    this.props.addItem({
          "Id": "S100033",
          "Name": "Shelton’s Cod Box",
          "Description": "Hello I'm Shelton and I caught a cod today.",
          "Temp": [{
              "Time": 1524830400000,
              "Temperature": 3
            },
            {
              "Time": 1524832200000,
              "Temperature": 6
            },
            {
              "Time": 1524834000000,
              "Temperature": 8
            },
            {
              "Time": 1524835800000,
              "Temperature": 10
            },
          ],
          "Openings": 3,
          "Archived": false,
          "LastUpdated": "1524830400000",
        });

  this.props.addItem({
        "Id": "M100203",
        "Name": "Rabia’s Salmon Box",
        "Description": "Hello I'm Rabia and I caught two salmons today.",
        "Temp": [{
            "Time": 1524830400000,
            "Temperature": 3
          },
          {
            "Time": 1524832200000,
            "Temperature": 10
          },
          {
            "Time": 1524834000000,
            "Temperature": 12
          },
          {
            "Time": 1524835800000,
            "Temperature": 20
          },
        ],
        "Openings": 10,
        "Archived": false,
        "LastUpdated": "1524830400000",
      });

  this.props.addItem(  {
        "Id": "B100001",
        "Name": "Magnús’ Shark Box",
        "Description": "Hello I'm Magnús and I caught a shark today.",
        "Temp": [{
            "Time": 1524830400000,
            "Temperature": 0
          },
          {
            "Time": 1524832200000,
            "Temperature": 2
          },
          {
            "Time": 1524834000000,
            "Temperature": 5
          },
          {
            "Time": 1524835800000,
            "Temperature": 6
          },
        ],
        "Openings": 1,
        "Archived": false,
        "LastUpdated": "1524830400000",
      });
  }

  onSuccess(e) {
    /*
    let item = null;
    this.props.addItem(item);
    */
    this.props.navigation.navigate('Details', {boxId: e.data});

  //  this.setState({BtnDisabled: false, reactivate: !this.state.reactivate});
  /*  alert(this.scanner);
    alert(JSON.stringify(this.scanner));
    this.setState({scanner: this.scanner, BtnDisabled: false});*/
  //  this.scanner.reactivate();
  }
/*
  onPressReactivate() {
    alert(JSON.stringify(this.state.scanner));
    this.state.scanner.reactivate();
  }

componentWillUpdate(){
  this.scanner.reactivate();
}
bottomContent={
  <Button
     color="#2E4761"
     title='Reactivate the scanner'
     onPress={this.onPressReactivate}
     disabled={this.state.BtnDisabled}
   />
}
*/
  render() {
    return (
      <QRCodeScanner
        ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Please scan QR code of the box.
          </Text>
        }
        reactivate={true}
        reactivateTimeout={1000}
      />
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
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
export default connect(mapStateToProps, mapDispatchToPros)(ScanScreen);
