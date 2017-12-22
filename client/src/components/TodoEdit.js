import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import { todoUpdate, todoSave, todoClear, todoDelete } from '../actions/index';
import { Card, CardSection, Button, Confirm } from './common';

class TodoEdit extends Component {

    state = { showModal: false };

    componentWillMount() {
        // takes each attribute from the todoItem and
        // updates the TodoFormReducer with them
        _.each(this.props.todo, (value, prop) => {
            this.props.todoUpdate({ prop, value });
        });
    }

    componentWillUnmount() {
        this.props.todoClear();
    }

    onSavePress() {
        const { name, done } = this.props;

        this.props.todoSave({ name, done, uid: this.props.todo.uid });
    }

    onAccept() {
        const { uid } = this.props.todo;
        this.props.todoDelete({ uid })
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        return(
            <Card>
                <TodoForm />

                <CardSection>
                    <Button onPress={this.onSavePress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={ () => this.setState({ showModal: !this.state.showModal }) }>
                        Delete Todo
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, done } = state.todoForm;

    return { name, done };
};

export default connect(mapStateToProps, {
    todoUpdate, todoSave, todoClear, todoDelete
})(TodoEdit);
