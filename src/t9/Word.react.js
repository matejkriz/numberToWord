import * as t9Actions from './actions';
import { connect } from 'react-redux';
import React from 'react';

import {
  StyleSheet, Text, View
} from 'react-native';

class Word extends React.Component {

  static propTypes = {
    word: React.PropTypes.string.isRequired,
  };

  render() {
    const { word } = this.props;

    return (
      <View style={styles.rowContainer}>
        <Text style={[styles.title]}>
          {word}
        </Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  title: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 5,
  }
});

export default connect(state => ({}),t9Actions)(Word);
