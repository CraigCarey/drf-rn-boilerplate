import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginWithStoredToken } from '../actions';


class LoadingScreen extends Component {

    componentWillMount() {

        AsyncStorage.getItem('@AuthStore:token')
            .then(auth_token => {
                // TODO: verify token still valid?
                if (!auth_token) {
                    throw Error();
                }

                this.props.loginWithStoredToken({auth_token});

                Actions.main({ type: 'replace' });
            })
            .catch(() => {
                Actions.login({ type: 'replace' });
            });
    }

    render() {
        return (
            <View style={styles.splashContainerStyle}>
                <Text style={styles.splashTextStyle}>
                    Todos
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

export default connect(null, { loginWithStoredToken })(LoadingScreen);
