import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const BasicFooter = styled(Footer)`
    width : 100%;
    min-height : 20vh;
    display : flex;
    justify-content : center;
    background-color : skyblue;
    
    div {
        min-width : 50vw;
        padding : 20px;
        
        p {
            line-height : 30px;
        }
    }
`;

export default BasicFooter;