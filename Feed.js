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
        var ds = ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['A', 'B', 'C'])
        };

    }

    renderRow(rowdata) {
        return (
            <Text style={{ color: '#333' }}>
                {rowdata}
            </Text>
        );
    }
    render() {
        return (
            <View style={styles.container}>
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
    },

});
