import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scanner: null,
      BtnDisabled: true
    };
  }

  static navigationOptions = {
    title: 'Scan',
  }

  onSuccess(e) {
    this.props.navigation.navigate('Details', {boxId: e.data});
    this.setState({scanner: this.scanner, BtnDisabled: false});
  //  this.scanner.reactivate();
  }

  onPressReactivate() {
    this.state.scanner.reactivate();
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
          <Button
             color="#2E4761"
             title='Reactivate the scanner'
             onPress={this.onPressReactivate}
             disabled={this.state.BtnDisabled}
           />
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
  }
});

export default ScanScreen;
