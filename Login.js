import React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableHighlight, Button } from 'react-native';

export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./images/Octocat.png')}></Image>
                <Text style={styles.heading}>Github Browser</Text>
                <TextInput style={styles.input} placeholder="Github username" />
                <TextInput style={styles.input} placeholder="Github password" secureTextEntry={true} />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>
                        Log in
                </Text>
                </TouchableHighlight>


            </View>
        );
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
        backgroundColor:'#48BBEC',
        alignSelf:'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize:22,
        color: '#FFF',
        alignSelf: 'center'
    }
});