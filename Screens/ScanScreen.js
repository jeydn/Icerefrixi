import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan',
  }
  onSuccess(e) {
    this.props.navigation.navigate('Details', {boxId: e.data});
  //  this.scanner.reactivate();

    //TODO: Fix problem that camera is active in the background
  //  setInterval(() => { this.scanner.reactivate() }, 5000);
  }

  componentWillUpdate() {
    this.scanner.reactivate();
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
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
});

export default ScanScreen;
