import React from 'react';
import {
  AsyncStorage,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { calcZones } from 'ftp-calc';

import { ZoneData } from './src/components';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watts: undefined,
      hr: undefined,
      inputWatts: undefined,
      inputHr: undefined,
    };
  }

  componentWillMount() {
    this._restoreData();
  }

  _clearData = () => {
    this.setState({
      hr: undefined,
      watts: undefined,
    });
  }

  _storeData = async () => {
    const { inputWatts, inputHr } = this.state;

    try {
      await AsyncStorage.setItem('watts', `${inputWatts}`);
      await AsyncStorage.setItem('hr', `${inputHr}`);
    } catch (e) {
      console.log('error saving', e);
    }
  }

  _restoreData = async () => {
    let watts, hr;

    try {
      const storedWatts = await AsyncStorage.getItem('watts');
      const storedHr = await AsyncStorage.getItem('hr');
      if (storedWatts !== null) {
        watts = storedWatts;
      }

      if (storedHr) {
        hr = storedHr;
      }

      this.setState({
        watts,
        hr,
        inputWatts: watts,
        inputHr: hr,
      });
    } catch (e) {
    }

  }

  _evaluateZoneData = () => {
    // dismiss keyboard
    Keyboard.dismiss();

    const { inputWatts, inputHr } = this.state;

    // TODO: validate numbers... are they NORMAL?
    this.setState({
      watts: inputWatts,
      hr: inputHr,
    });

    this._storeData();
  }

  _renderZoneData = (zones) => {
    const zoneRowsJSX = Object.keys(zones).map((key) => {
      return <ZoneData key={zones[key].name} data={zones[key]} />
    });

    return (
      <View style={styles.renderedZoneDataContainer}>
        {zoneRowsJSX}
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={styles.recalcButtonContainer}
            onPress={this._clearData}
          >
            <Text style={styles.recalcButtonText}>
              {'Recalculate zones'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderWelcome = () => {
    return (
      <View style={{ margin: 8 }}>
        <Text style={styles.welcomeHeader}>Calculate your Zones!</Text>
        <Text>This app will allow you calculate your FTP, your functional threshold power, used for determining efforts, etc... get a real readme.</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Your Average Watts"
          onChangeText={(text) => this.setState({ inputWatts: text })}
          value={this.state.inputWatts}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Your Max Heart Rate"
          onChangeText={(text) => this.setState({ inputHr: text })}
          value={this.state.inputHr}
        />
        <Button
          title="Calculate"
          onPress={() => this._evaluateZoneData()}
        />
      </View>
    );
  }

  render() {
    const { watts, hr } = this.state;
    let zones;

    if (watts) {
      zones = calcZones(watts, hr);
    }

    return (
      <View style={styles.container}>
        {
          zones
            ? this._renderZoneData(zones)
            : this._renderWelcome()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 16,
  },
  welcomeHeader: {
    fontSize: 24,
  },
  renderedZoneDataContainer: {
    flex: 1,
    width: '100%',
  },
  textInput: {
    borderColor: '#000',
    borderWidth: 1,
    height: 44,
    marginBottom: 8,
    marginTop: 8,
    padding: 8,
  },
  recalcButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recalcButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    height: 44,
    justifyContent: 'center',
  },
});
