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
    ActivityIndicator,
    Image
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
        return (
            <View style={styles.row}>
                <Image source={{ uri: rowdata.actor.avatar_url }} style={{
                    height: 36,
                    width: 36,
                    borderRadius: 18
                }}></Image>
                <View style={{
                    paddingLeft: 20
                }}>
                    <Text style={{ backgroundColor: '#FFF' }}>{rowdata.created_at}</Text>
                    <Text style={{ backgroundColor: '#FFF' }}>{rowdata.actor.login}</Text>
                    <Text style={{ backgroundColor: '#FFF' }}>{rowdata.repo.name}</Text>
                </View>
            </View>
        );
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
        alignSelf: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    }

});
