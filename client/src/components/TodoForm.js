import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { todoUpdate } from '../actions';
import { CardSection, Input } from './common';

class TodoForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label='name'
                        placeholder='Enter todo text here...'
                        value={this.props.name}
                        onChangeText={ value => this.props.todoUpdate({ prop: 'name', value }) }
                    />
                </CardSection>

                <CardSection>
                    {/* TODO: 'done' checkbox (material-design?*/}
                </CardSection>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name } = state.todoForm;

    return { name };
};

export default connect(mapStateToProps, { todoUpdate })(TodoForm);
