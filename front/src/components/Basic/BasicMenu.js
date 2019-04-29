import React, { Component } from 'React';
import { Menu } from 'semantic-ui-react';

class BasicMenu extends Component {

    render() {
        return (
            <Menu>
                {this.props.children}
            </Menu>
        );
    }
}

export default BasicMenu;