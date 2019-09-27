import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <h2 className="footer-title">
            2019. 08. 31. 계약 종료.
          </h2>
          <p className="footer-text">
            copyright by enitsed.
          </p>
        </div>
      </footer>
    );
  }
}

const BasicFooter = styled(Footer)``;

export default BasicFooter;
