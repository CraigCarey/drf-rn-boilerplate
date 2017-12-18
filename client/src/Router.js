import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LoadingScreen from "./components/LoadingScreen";
import RegisterForm from "./components/RegisterForm";

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>

                <Scene key='auth'>
                    <Scene key='loading' component={LoadingScreen} title='Loading' hideNavBar='true' initial />
                    <Scene key='login' component={LoginForm} title='Login' />
                    <Scene key='register' component={RegisterForm} title='Register' />
                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;
