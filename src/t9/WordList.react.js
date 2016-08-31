import * as t9Actions from './actions';
import appStyles from '../app/styles';
import Word from './Word.react';
import React from 'react';
import { connect } from 'react-redux';

import {
  ActivityIndicator, Image, ScrollView, StyleSheet, Text, View
} from 'react-native';

class WordList extends React.Component {

  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    wordList: React.PropTypes.object.isRequired,
  };

  render() {
    const {isFetching, wordList} = this.props;
    if (isFetching || !wordList.size) {
      return (
        <View style={appStyles.container}>
          <View style={styles.centered}>
            { isFetching &&
              <ActivityIndicator
                size="large"
              />
            }
            { !isFetching &&
              <Text>
                Empty list!
              </Text>
            }
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={appStyles.container}
      >
        {wordList.map(word =>
          <View key={word} style={[styles.row, wordList.first() === word && styles.firstRow]}>
            <Word
              word={word}
            />
          </View>
        )}
      </ScrollView>
    );
  }

}

export default connect(state => ({
  isFetching: state.t9.isFetching,
  wordList: state.t9.wordList,
}), t9Actions)(WordList);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 40
  },
  row: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 2,
    height: 45,
  },
  firstRow: {
    borderTopColor: '#f1f1f1',
    borderTopWidth: 2,
  },
});
