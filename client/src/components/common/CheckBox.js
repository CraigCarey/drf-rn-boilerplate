import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }
    static propTypes = {
        ...(ViewPropTypes || View.PropTypes),
        label: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        isChecked: false
    };

    onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        });
        this.props.onClick();
    }

    renderLabel() {
        if (!this.props.label)
            return null;

        return (
            <Text style={styles.labelStyle}>{this.props.label}</Text>
        );
    }

    renderImage() {
        var source = this.state.isChecked ? require('./img/ic_check_box.png') :
                                            require('./img/ic_check_box_outline_blank.png');

        return (
            <View style={styles.imageStyle}>
                <Image source={source} style={{tintColor: this.props.color}} />
            </View>
        );
    }

    render() {
        return (
            <TouchableHighlight
                style={[styles.buttonStyle, this.props.style]}
                onPress={()=>this.onClick()}
                underlayColor='transparent'
                disabled={this.props.disabled} >

                <View style={styles.containerStyle}>
                    {this.renderLabel()}
                    {this.renderImage()}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        height: 40
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    imageStyle: {
        flex: 2
    }
});
