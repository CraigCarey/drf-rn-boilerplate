import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { todoUpdate } from '../actions';
import { CardSection, Input } from './common';
import CheckBox from './common/CheckBox';


class TodoForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label='Name'
                        placeholder='Enter todo text here...'
                        value={this.props.name}
                        onChangeText={ value => this.props.todoUpdate({ prop: 'name', value }) }
                    />
                </CardSection>

                <CardSection>
                    <CheckBox
                        label='Done'
                        isChecked={this.props.done}
                        color={'green'}
                        onClick={() => {
                            this.props.todoUpdate({ prop: 'done', value: !this.props.done });
                        }} />
                </CardSection>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, done } = state.todoForm;

    return { name, done };
};

export default connect(mapStateToProps, { todoUpdate })(TodoForm);
