import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class LoadingScreen extends Component {

    componentWillMount() {

        Actions.login({ type: 'replace' });

        // TODO
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         Actions.main({ type: 'replace' });
        //     }
        //     else {
        //         Actions.login({ type: 'replace' });
        //     }
        // });
    }

    render() {
        return (
            <View style={styles.splashContainerStyle}>
                <Text style={styles.splashTextStyle}>
                    Manager
                </Text>
            </View>
        );
    };
}

const styles = {
    splashContainerStyle: {
        flex: 1,
        backgroundColor: '#42f492',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashTextStyle: {
        fontSize: 50
    }
};

export default LoadingScreen;
