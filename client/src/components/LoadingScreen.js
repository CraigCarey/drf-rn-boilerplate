import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class LoadingScreen extends Component {

    componentWillMount() {

        // TODO: persist
        console.log(this.props.auth_token);
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

const mapStateToProps = state => {

    const { auth_token } = state.auth;

    return { auth_token };
};

export default connect(mapStateToProps, {})(LoadingScreen);
