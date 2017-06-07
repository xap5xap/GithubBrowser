/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './Login';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GithubBrowser extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };

    this.onLogin = this.onLogin.bind(this);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>Logged in</Text>

      </View>);
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
