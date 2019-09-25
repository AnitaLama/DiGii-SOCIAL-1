import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorWrapper, ErrorStyles } from './style';

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
