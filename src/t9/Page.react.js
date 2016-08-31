import * as t9Actions from './actions';
import appStyles from '../app/styles';
import NavigationBar from 'react-native-navbar'
import NumberInput from './NumberInput.react';
import React from 'react';
import WordList from './WordList.react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
const dismissKeyboard = require('dismissKeyboard');

class Page extends React.Component {

  static propTypes = {
    number: React.PropTypes.string.isRequired,
    getWords: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onChangeText(inputText) {
    const { setNumber } = this.props;
    setNumber(inputText);
  }

  onSubmitEditing() {
    const { getWords, number } = this.props;
    if(!this.isEmpty)
      getWords(number);
  }

  render() {
    const {getWords, number} = this.props;
    this.isEmpty = number.length === 0;

    const rightButtonConfig = {
      title: 'Convert',
      tintColor: this.isEmpty ? 'gray' : '#0076FF',
      handler: () => {
        if(!this.isEmpty)
          getWords(number);
        },
    };

    const titleConfig = {
      title: 'T9',
    };

    return (
      <View style={appStyles.sceneView}>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          tintColor={'whitesmoke'}
        />
        <View style={appStyles.container}>
          <NumberInput
            value={number}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
          />
        </View>
        <View style={appStyles.mainView}>
          <WordList />
        </View>
      </View>
    );
  }

}

export default connect(state => ({
  number: state.t9.number
}), t9Actions)(Page);
