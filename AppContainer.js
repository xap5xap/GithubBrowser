import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Feed from './Feed';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TabBarIOS,
    ActivityIndicator
} from 'react-native';


export default class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0
        };

    }

    render() {
        return (
            <ScrollableTabView
                style={{ marginTop: 20, }}
                onChangeTab={(arg) => {
                    this.setState({ selectedTab: i })
                }}
                renderTabBar={() => <DefaultTabBar />}
            >
                <ScrollView tabLabel="Feed" style={styles.tabView}>
                    <View style={styles.card}>
                       <Text>Hola</Text>
                       <Feed></Feed>

                    </View>
                </ScrollView>
                <ScrollView tabLabel="Search" style={styles.tabView}>
                    <View style={styles.card}>
                        <Text>Friends</Text>
                    </View>
                </ScrollView>

            </ScrollableTabView>
        );
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
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});