import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Images = styled.img`
  height: ${props => `${props.height}px` || '56px'};
  border-radius: ${props => `${`${props.height}` / 2}px` || '28px'};
  margin-right: ${props => `${props.rightMargin}px` || '0'};
  margin-left: ${props => `${props.leftMargin}px` || '0'};
`;

const Avatar = props => {
  const { src } = props;
  return <Images src={src} {...props} />;
};
Avatar.propTypes = {
  src: PropTypes.string
};
export default Avatar;
