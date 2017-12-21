import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { todosFetch } from '../actions';
import ListItem from './ListItem';

class TodoList extends Component {

    componentWillMount() {
        this.props.todosFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ todos }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(todos);
    }

    renderRow(todo) {
        return <ListItem todo={todo} />
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    // map todos to an array
    const todos = _.map(state.todos, (val, uid) => {
        // { text: 'Blah blah blah', done: 'False', id: 'l376bjd' }
        return { ...val, uid };
    });

    return { todos };
};

export default connect(mapStateToProps, { todosFetch })(TodoList);