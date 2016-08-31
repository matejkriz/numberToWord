import { setPlatform, toggleConnectionStatus } from '../device/actions';
import { bindActionCreators } from 'redux';
import React from 'react';
import { Alert, Navigator, NetInfo, Platform, View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
} from 'react-native-router-redux';
import MainPage from '../t9/Page.react';

const mapStateToProps = state => ({
  device: state.device,
  isConnected: state.device.isConnected,
  router: state.router,
});
const mapDispatchToProps = (dispatch) => ({
  setPlatform: (platform)=> {
    dispatch(setPlatform(platform));
  },
  toggleConnectionStatus: (connectionStatus)=> {
    dispatch(toggleConnectionStatus(connectionStatus));
  },
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
});

const defaultSchema = {
  hideNavBar: true
};

class App extends React.Component {

  static propTypes = {
    device: React.PropTypes.object.isRequired,
    setPlatform: React.PropTypes.func.isRequired,
    toggleConnectionStatus: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.warnOffline = this.warnOffline.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  warnOffline() {
    const {
      toggleConnectionStatus,
    } = this.props;
    toggleConnectionStatus(false);
    Alert.alert(
      'Device is offline!',
      'You need an internet connection.',
      [
        {text: 'OK'},
      ]
    );
  }

  handleConnectivityChange(isConnected) {
    const {
      toggleConnectionStatus,
    } = this.props;

    if(!isConnected || isConnected === 'none') {
      this.warnOffline();
    } else {
      toggleConnectionStatus(true);
    }
  }

  componentDidMount() {
    const {
      setPlatform,
    } = this.props;
    setPlatform(Platform.OS);
    NetInfo.addEventListener(
      'change',
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
        'change',
        this.handleConnectivityChange,
    );
  }

  render() {

    return (
      <Router {...this.props} initial='main'>
        <Schema name='default' {...defaultSchema} />

        <Route name='main' component={MainPage} type='reset'/>
      </Router>
    );
  }

}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
