import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class BasicButton extends Component {
    render() {
        return (
            <Button onClick={this.props.clickHandler}>
                {this.props.children}
            </Button>
        )
    }
}

export default BasicButton;