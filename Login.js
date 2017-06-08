import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, Button, ActivityIndicator } from 'react-native';
import { AuthService } from './AuthService';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginPressed = this.onLoginPressed.bind(this);
        this.state = {
            username: '',
            password: '',
            showProgess: true
        }
    }
    render() {
        var errorCtrl = <View />;

        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>The username and password combination did not work</Text>
        }
        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>We experiencied an unexpected issue</Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./images/Octocat.png')}></Image>
                <Text style={styles.heading}>Github Browser</Text>
                <TextInput style={styles.input} placeholder="Github username" onChangeText={(text) => this.setState({ username: text })} />
                <TextInput style={styles.input} placeholder="Github password" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed}>
                    <Text style={styles.buttonText}>
                        Log in
                </Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicator
                    animating={this.state.showProgess}
                    style={styles.loader}
                    size="large"
                />

            </View>
        );
    }

    onLoginPressed() {
        this.setState({ showProgess: true });
        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgess: false
            }, results));
            if (results.success && this.props.onLogin) {
                this.props.onLogin();
            }
        });

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10

    },
    loader: {
        marginTop: 20
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        width: '100%'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    error: {
        color: 'red',
        padding: 10
    }
});