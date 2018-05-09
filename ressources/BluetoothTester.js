import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState,
  Dimensions,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import conv from 'convert-string';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      scanning:false,
      connected: false,
      peripherals: new Map(),
      appState: ''
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
//    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.retrieveBLEData = this.retrieveBLEData.bind(this);
  }

  componentDidMount() {
  //  AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              alert("Permission is OK");
            } else {
              PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  alert("User accept");
                } else {
                  alert("User refuse");
                }
              });
            }
      });
    }

    this.retrieveBLEData();

  }

/*
  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      alert('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        alert('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }
*/
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  retrieveBLEData(){
    this.startScan();
    var uuid = '395C84A0-005C-16E4-3D1F-1DC5033AB517'
    this.connectToDevice(uuid);

/*    setTimeout(() => {
      this.disconnectFromDevice(uuid);
      this.handleStopScan();
    }, 10000);*/
  }

  connectToDevice(uuid) {
    BleManager.connect(uuid).then(() => {
      this.setState({connected: true});//, peripherals: {peripherals}});
      alert('Connected to ' + uuid);

    //  setTimeout(() => {
        BleManager.retrieveServices(uuid).then((peripheralInfo) => {
          alert(JSON.stringify(peripheralInfo));
          var service = 'FFE0';//'13333333-3333-3333-3333-333333333337';
          var bakeCharacteristic = 'FFE1';//'13333333-3333-3333-3333-333333330003';
          var crustCharacteristic = uuid;//'13333333-3333-3333-3333-333333330001';

        //  setTimeout(() => {
            BleManager.startNotification(uuid, service, bakeCharacteristic).then(() => {
            alert('Read: ' + JSON.stringify(peripheralInfo));

            }).catch((error) => {
              alert('Notification error', JSON.stringify(error));
            });
        //    }, 200);

        });
    //  }, 900);
    }).catch((error) => {
      alert('Connection error', error);
    });
  }

  disconnectFromDevice(uuid){
    BleManager.disconnect(uuid);
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    alert('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
  //  alert('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    alert('Data: ' + JSON.stringify(data.value));

    const convertedData = conv.bytesToString(data.value);
    alert(convertedData);
    alert('Data readable: ' + JSON.stringify(convertedData));
  //  alert('Data readable: ' + bin2string(data.value));
/*
    function bin2string(array){
      var result = "";
      for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
      }
      return result;
    }*/
  }



  handleStopScan() {
  //  alert('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
    //  this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
    //    alert('Scanning...');
        this.setState({scanning:true});
      });
    }
  }

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      alert(JSON.stringify(results));
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
    //  alert('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }

  test(peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          alert('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              alert('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                alert('Retrieved actual RSSI value', rssi);
              });
            });*/

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              alert(JSON.stringify(peripheralInfo));
              var uuid = '395C84A0-005C-16E4-3D1F-1DC5033AB517'
              //var uuid = '0000FFE1-0000-1000-8000-00805F9B34FB'
              var service = 'FFE0';//'13333333-3333-3333-3333-333333333337';
              var bakeCharacteristic = 'FFE1';//'13333333-3333-3333-3333-333333330003';
              var crustCharacteristic = uuid;//'13333333-3333-3333-3333-333333330001';

              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                  alert('Started notification on ' + JSON.stringify(peripheral.id));
                  setTimeout(() => {
                    BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                      alert('Writed NORMAL crust');
                      BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                        alert('Writed 351 temperature, the pizza should be BAKED');
                        /*
                        var PizzaBakeResult = {
                          HALF_BAKED: 0,
                          BAKED:      1,
                          CRISPY:     2,
                          BURNT:      3,
                          ON_FIRE:    4
                        };*/
                      });
                    });

                  }, 500);

                }).catch((error) => {
                  alert('Notification error', JSON.stringify(error));
                });
              }, 200);
            });

          }, 900);
        }).catch((error) => {
          alert('Connection error', error);
        });
      }
    }
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);


    return (
      <View style={styles.container}>
        <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.startScan() }>
          <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{marginTop: 0,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => this.retrieveConnected() }>
          <Text>Retrieve connected peripherals</Text>
        </TouchableHighlight>
        <ScrollView style={styles.scroll}>
          {(list.length == 0) &&
            <View style={{flex:1, margin: 20}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(item) => {
              const color = item.connected ? 'green' : '#fff';
              return (
                <TouchableHighlight onPress={() => this.test(item) }>
                  <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});
