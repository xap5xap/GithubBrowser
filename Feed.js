import React from 'react';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TabBarIOS,
    ListView,
    ActivityIndicator
} from 'react-native';


export default class Feed extends React.Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            // dataSource: ds.cloneWithRows([{ actor: { login: '' } }]),
            dataSource: ds,
            showProgress: true
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        require('./AuthService').getAuthInfo((err, authInfo) => {
            var url = 'https://api.github.com/users/'
                + authInfo.user.login
                + '/received_events';

            fetch(url, {
                headers: authInfo.headers
            })
                .then(response => response.json())
                .then(responseData => {
                    var feedItems = responseData.filter(ev => {
                        return ev.type !== 'PushEvent'
                    });
                    console.log('feedItems', feedItems);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(feedItems),
                        showProgress: false
                    });
                    console.log('this.state.dataSource', this.state.dataSource);
                });
        });
    }

    renderRow(rowdata) {
        if (rowdata) {
            return (

                <Text style={{ color: '#333' }}>
                    {rowdata.actor.login}
                </Text>
            );
        }


    }

    render() {
        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" animating={true}></ActivityIndicator>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text>Results</Text>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        alignSelf: 'center'
    },

});
