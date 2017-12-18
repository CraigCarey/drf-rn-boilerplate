import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, password2Changed, registerUser, clearAuthErrors } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {

    componentWillMount() {
        this.props.clearAuthErrors();
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onPassword2Change(text) {
        this.props.password2Changed(text);
    }

    onLoginButtonPress() {
        Actions.login({ type: 'replace' });
    }

    onRegisterButtonPress() {
        const { email, password, password2 } = this.props;

        this.props.registerUser({email, password, password2 });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={this.onRegisterButtonPress.bind(this)}>Register</Button>
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='email@email.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email} />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password} />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label='Confirm'
                        placeholder='confirm password'
                        onChangeText={this.onPassword2Change.bind(this)}
                        value={this.props.password2} />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.onLoginButtonPress.bind(this)}
                        buttonStyleOverrides={styles.loginButtonStyle}
                        textStyleOverrides={styles.loginButtonTextStyle}
                    >
                        Login
                    </Button>
                </CardSection>

            </Card>
        );
    };
}

const styles={
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    loginButtonStyle: {
        borderWidth: 0
    },
    loginButtonTextStyle: {
        color: 'green'
    }
};

const mapStateToProps = state => {

    const { email, password, password2, error, loading } = state.auth;

    return { email, password, password2, error, loading };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, password2Changed, registerUser, clearAuthErrors
})(RegisterForm);
