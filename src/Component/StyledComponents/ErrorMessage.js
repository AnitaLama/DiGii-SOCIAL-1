import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Colors, fontWeight } from '../../Theme';

const ErrorStyles = styled.div`
  padding: 1.2rem;
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
`;

const ErroMessage = ({ error }) => (
  <ErrorStyles>
    <p>
      <strong>Error:</strong>
      {error.replace('Error: ', '')}
    </p>
  </ErrorStyles>
);

ErroMessage.defaultProps = {
  error: {}
};

ErroMessage.propTypes = {
  error: PropTypes.string
};

export default ErroMessage;
