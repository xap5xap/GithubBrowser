import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Login extends React.Component {
    render() {
        return (
            <View style={{ styles.container }}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
});