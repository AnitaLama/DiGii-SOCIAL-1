import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Colors, fontWeight, boxShadow } from '../../Theme';

const ErrorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(52, 52, 52, 0.2);
  height: 100%;
  width: 100%;
`;

const ErrorStyles = styled.div`
  padding: 1.2rem;
  ${boxShadow()}
  background: white;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid ${Colors.colors.primary};
  p {
    margin: 0;
    ${fontWeight(100)}
  }
  strong {
    margin-right: 1rem;
  }
  width: ${props => `${props.width}%` || '100%'};
  margin: auto;
`;
const ErrorMessage = ({ error }) => (
  <ErrorStyles>
    <p>
      <strong>Error:</strong>
      {error.replace('Error: ', '')}
    </p>
  </ErrorStyles>
);

class ErrorAlertMessage extends Component {
  constructor() {
    super();
    this.state = { show: true };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  }

  render() {
    const { error } = this.props;
    const { show } = this.state;
    return (
      <ErrorWrapper
        style={{
          display: show ? 'block' : 'none'
        }}
      >
        <ErrorStyles width={50}>
          <p>
            <strong>Error:</strong>
            {error.replace('Error: ', '')}
          </p>
        </ErrorStyles>
      </ErrorWrapper>
    );
  }
}
ErrorAlertMessage.propTypes = {
  error: PropTypes.string
};
ErrorMessage.defaultProps = {
  error: {}
};

ErrorMessage.propTypes = {
  error: PropTypes.string
};

export { ErrorMessage, ErrorAlertMessage };
