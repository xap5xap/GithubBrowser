import React, { Component } from 'react';

import Login from './Login';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    ActivityIndicator
} from 'react-native';


export default class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab:'feed'
        };

    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.welcome}>Tabs coming soon</Text>
        </View>);
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
  }
});