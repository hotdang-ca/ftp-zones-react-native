import React from 'react';
// import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

const ZONE_COLORS = {
  AR: '#00bfff', // deeper blue
  EN: '#0ff', // teal, light blue
  TE: '#32cd32', // green-ish
  TH: '#ff0', // yellow
  VO2max: '#ff8c00', // orange
};

export class ZoneData extends React.Component {
  _calculateBgColor = (zoneShortCode) => {
    return ZONE_COLORS[zoneShortCode] || '#f00';
  }

  render() {
    const { data } = this.props;

    const calculatedStyle = {
      ...styles.zoneContainer,
      backgroundColor: this._calculateBgColor(data.short),
    };

    return (
      <View style={calculatedStyle}>

        <View style={styles.shortNameContainer}>
          <Text style={styles.shortNameText}>{data.short}</Text>
        </View>

        <View style={styles.zoneDescriptionContainer}>
          <View>
            <Text style={styles.zoneNameText}>{data.name}</Text>
          </View>
          <View>
            <Text style={styles.zoneDescriptionText}>{data.desc}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statValuesContainer}>
            <View>
              <Text style={styles.statValue}>
                { data.avgPower && data.avgPower.low }
              </Text>
            </View>
            <View><Text style={styles.statLabel}>WATTS</Text></View>
            <View>
              <Text style={styles.statValue}>
                { data.avgPower && data.avgPower.high }
              </Text>
            </View>
          </View>

          <View style={styles.statValuesContainer}>
            <View>
              <Text style={styles.statValue}>
                { data.avgHr && data.avgHr.low || ' - '}
              </Text>
            </View>

            <View><Text style={styles.statLabel}>HR</Text></View>
            <View>
              <Text style={styles.statValue}>
                { data.avgHr && data.avgHr.high || ' - ' }
              </Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = {
  zoneContainer: {
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  shortNameContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'center',
    margin: 6,
    width: 60,
  },
  shortNameText: {
    color: '#303030',
    fontSize: 24,
    fontWeight: 'bold',
  },
  zoneDescriptionContainer: {
    height: '100%',
    justifyContent: 'center',
    padding: 6,
    width: '50%',
  },
  zoneNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  zoneDescriptionText: {
    fontSize: 9,
  },
  statsContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    margin: 6,
    width: '15%',
  },
  statLabel: {
    fontSize: 8,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValuesContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    height: '30%',
    justifyContent: 'space-around',
    width: '100%',
  },
};
