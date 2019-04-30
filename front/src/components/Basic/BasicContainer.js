import React, { Component } from 'react';
import { Container, Breadcrumb, BreadcrumbSection, BreadcrumbDivider } from 'semantic-ui-react';
import styled from 'styled-components';

class CustomContainer extends Component {

    render() {
        return (
            <Container className={this.props.className}>
                <Breadcrumb>
                    <BreadcrumbSection link>Home</BreadcrumbSection>
                    <BreadcrumbDivider />
                    <BreadcrumbSection link>Main</BreadcrumbSection>
                    <BreadcrumbDivider />
                    <BreadcrumbSection active>Layout</BreadcrumbSection>
                    <BreadcrumbDivider />
                </Breadcrumb>
                <div className="contents">
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

const BasicContainer = styled(CustomContainer)`
    background-color: skyblue;
    min-height : 80vh;
    
    .breadcrumb {
        padding : 10px;
    }

    .contents {
        min-height : 70vh;
        display : flex;
        justify-content : center;
    }
`;

export default BasicContainer;