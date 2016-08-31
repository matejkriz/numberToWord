import appStyles from '../app/styles';
import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default class NumberInput extends React.Component {

  static propTypes = {
    onChangeText: React.PropTypes.func,
    onSubmitEditing: React.PropTypes.func,
    value: React.PropTypes.string.isRequired,
  };

  render() {
    const {onChangeText, onSubmitEditing, value} = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>
          Number:
        </Text>
        <TextInput
          style={[appStyles.padding, styles.input]}
          clearButtonMode={'always'}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
          keyboardType={'phone-pad'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginLeft: 15,
    borderBottomColor: '#C7C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    width: 70,
    color: '#C7C7CC',
    fontSize: 15,
  },
  input: {
    flex: 1,
    lineHeight: 30,
    marginRight: 15,
    fontSize: 15,
    backgroundColor: '#ffffff',
  },
});
