import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, Button, ActivityIndicator } from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginPressed = this.onLoginPressed.bind(this);
        this.state = {
            username: '',
            password: '',
            showProgess: false
        }
    }
    render() {
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
                <ActivityIndicator
                    animating={this.state.showProgess}
                    style={styles.loader}
                    size="large"
                />

            </View>
        );
    }

    onLoginPressed() {
        console.log('Attemping to log with username ', this.state.username);
        this.setState({ showProgess: true });
        fetch('https://api.github.com/search/repositories?q=react')
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                console.log('results', results)
                this.setState({ showProgess: false });
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
    }
});