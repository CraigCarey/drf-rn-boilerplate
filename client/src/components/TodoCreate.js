import React, { Component } from 'react';
import { connect } from 'react-redux';
import { todoUpdate, todoCreate, todoClear } from '../actions';
import { Card, CardSection, Button } from './common';
import TodoForm from './TodoForm';

class TodoCreate extends Component {

    onButtonPress() {
        const { name, done } = this.props;

        this.props.todoCreate({ name, done });
    }

    componentWillUnmount() {
        this.props.todoClear();
    }

    render() {
        return (
            <Card>
                <TodoForm { ...this.props } />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, done } = state.todoForm;

    return { name, done };
};

export default connect(mapStateToProps, {
    todoUpdate,
    todoCreate,
    todoClear
})(TodoCreate);
