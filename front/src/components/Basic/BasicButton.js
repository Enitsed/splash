import React, { Component } from 'react';
import styled from 'styled-components';

class Button extends Component {
    render() {
        return <button className={ this.props.className } onClick={this.props.clickHandler}>{this.props.children}</button>
    }
}

const BasicButton = styled(Button)`
    color : red;
    border : 1px solid yellow;
    border-radius : 5px;
    margin : 5px;
    padding : 5px;
    text-align : middle;
    text-decoration : none;
`

export default BasicButton;