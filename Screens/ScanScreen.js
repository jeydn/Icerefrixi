import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Button, NativeModules, NativeEventEmitter, Platform,
PermissionsAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {ActionCreators} from "../actions/index";

import Data from '../ressources/Data.json';

import BleManager from 'react-native-ble-manager';
import conv from 'convert-string';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class ScanScreen extends React.Component {
  props: {
    addItem: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      animateActInd: false,
      boxId: null,
      scanning:false,
      uuid: null,
      data: {},
    }

    //ONLY DEVELOPMENT --> init localStorage
    this.initSequence();

    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.retrieveBLEData = this.retrieveBLEData.bind(this);
  }

  static navigationOptions = {
    title: 'Scan',
  }

  componentDidMount() {
    BleManager.start({showAlert: false});

    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
            //  alert("Permission is OK");
            } else {
              PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                //  alert("User accept");
                } else {
                //  alert("User refuse");
                }
              });
            }
      });
    }
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  retrieveBLEData(uuid){
    this.startScan();
    this.connectToDevice(uuid);
  }

  connectToDevice(uuid) {
    BleManager.connect(uuid).then(() => {
      this.setState({connected: true});
        BleManager.retrieveServices(uuid).then((peripheralInfo) => {
          var service = 'FFE0';
          var bakeCharacteristic = 'FFE1';
          var crustCharacteristic = uuid;

            BleManager.startNotification(uuid, service, bakeCharacteristic).then(() => {
              //Do nothing special
            }).catch((error) => {
              alert('Notification error', JSON.stringify(error));
            });
        });
    }).catch((error) => {
      alert('Connection error', JSON.stringify(error));
    });
  }

  disconnectFromDevice(uuid){
    BleManager.disconnect(uuid);
  }


  handleUpdateValueForCharacteristic(data) {
    const convertedData = conv.bytesToString(data.value);
    this.setState({ data: {
        "Time": new Date().getTime(),
        "Temperature": Math.round( convertedData )
      } });

      //Disconnect bluetooth device
      this.disconnectFromDevice(this.state.uuid);
      this.handleStopScan();

      this.props.addTemp(this.state.boxId, this.state.data);
      this.setState({ animateActInd: false });
      this.props.navigation.navigate('Details', {boxId: this.state.boxId});
    }

  handleStopScan() {
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then((results) => {
        this.setState({scanning:true});
      });
    }
  }


// ONLY RELEVANT FOR DEVELOPMENT --> Initialize local storage
  initSequence(){
    const todayTmp = new Date().getTime();

    this.props.deleteAllItems();
    this.props.addItem({
          "Id": "S100033",
          "Name": "Shelton’s Cod Box",
          "UUID": "395C84A0-005C-16E4-3D1F-1DC5033AB517",
          "Description": "Hello I'm Shelton and I caught a cod today.",
          "Temp": [{
              "Time": (todayTmp - 4*3600000),
              "Temperature": 3
            },
            {
              "Time": (todayTmp - 3*3600000),
              "Temperature": 7
            },
            {
              "Time": (todayTmp - 2*3600000), //Minus 30 minutes
              "Temperature": 13
            },
            {
              "Time": (todayTmp - 3600000),
              "Temperature": 18
            },
          ],
          "Openings": 3,
          "Archived": false,
          "LastUpdated": "1524830400000",
        });

  this.props.addItem({
        "Id": "M100203",
        "Name": "Rabia’s Salmon Box",
        "UUID": "395C84A0-XXXX-XXXX-XXXX-1DC5033AB517", //fake
        "Description": "Hello I'm Rabia and I caught two salmons today.",
        "Temp": [{
            "Time": (todayTmp - 4*3600000),
            "Temperature": 5
          },
          {
            "Time": (todayTmp - 3*3600000),
            "Temperature": 10
          },
          {
            "Time": (todayTmp - 2*3600000), //Minus 30 minutes
            "Temperature": 15
          },
          {
            "Time": (todayTmp - 3600000),
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
        "UUID": "395C84A0-YYYY-XXXX-XXXX-1DC5033AB517", //fake
        "Description": "Hello I'm Magnús and I caught a shark today.",
        "Temp": [{
            "Time": (todayTmp - 4*3600000),
            "Temperature": 0
          },
          {
            "Time": (todayTmp - 3*3600000),
            "Temperature": 2
          },
          {
            "Time": (todayTmp - 2*3600000), //Minus 30 minutes
            "Temperature": 5
          },
          {
            "Time": (todayTmp - 3600000),
            "Temperature": 8
          },
        ],
        "Openings": 1,
        "Archived": false,
        "LastUpdated": "1524830400000",
      });
  }

  onSuccess(e) {
    //Later UUID has to be scanned or it has to be searched for it.
    const boxId = e.data;
    if(boxId === "S100033"){
      var uuid = '395C84A0-005C-16E4-3D1F-1DC5033AB517'
      this.setState({ uuid: uuid, boxId: boxId, animateActInd: true });
      this.retrieveBLEData(uuid);
    }
}

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
        bottomContent={
           <ActivityIndicator size="large" animating={this.state.animateActInd}/>
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
