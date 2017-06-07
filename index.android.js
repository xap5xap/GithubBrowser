import React, { Component } from 'react';
import AppContainer from './AppContainer';
import Login from './Login';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

var authService = require('./AuthService');

export default class GithubBrowser extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };

    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    authService.getAuthInfo((err, authInfo) => {
      console.log('authInfo', authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });

    });
  }

  render() {
    if (this.state.checkingAuth) {
      return (<View style={styles.container}>
        <ActivityIndicator animating={true} size="large" style={styles.loader}>
        </ActivityIndicator>
      </View>);
    }
    if (this.state.isLoggedIn) {
      return (
      <AppContainer/>
      );
    } else {
      return (<Login onLogin={this.onLogin} />);
    }
  }

  onLogin() {
    console.log('sucessful');
    this.setState({ isLoggedIn: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
