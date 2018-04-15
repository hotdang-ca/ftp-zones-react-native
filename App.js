import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { calcZones } from 'ftp-calc';

const watts = 189;
const hr = 161;

export default class App extends React.Component {
  render() {
    const zones = calcZones(watts, hr);
    const { Zone1, Zone2, Zone3, Zone4, Zone5, Zone6 } = zones;

    return (
      <View style={styles.container}>
        <View style={styles.zone1} />
        <View style={styles.zone2} />
        <View style={styles.zone3} />
        <View style={styles.zone4} />
        <View style={styles.zone5} />
        <View style={styles.zone6} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zone1: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
  zone2: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
  zone3: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
  zone4: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
  zone5: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
  zone6: {
    flex: 1,
    backgroundColor: '#f00',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderWidth: 2,
    width: '100%',
  },
});
