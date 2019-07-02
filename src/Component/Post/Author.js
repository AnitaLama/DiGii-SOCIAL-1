import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  flex,
  Images,
  fontSize,
  fontWeight,
  fontFilson,
  Colors
} from '../../Theme';
import { Avatar } from '../StyledComponents';

const { grey } = Colors.colors;

const AuthorWrapper = styled.div`
  ${flex()};
`;
const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  ${fontWeight('bold')};
  ${fontFilson()}
`;

const Post = styled.div`
  ${fontSize(14)};
  color: ${grey};
`;
class Author extends Component {
  render() {
    const { data } = this.props;
    const { student, p_body } = data;
    const firstname = student ? student.st_firstname : '';
    const lastname = student ? student.st_lastname : '';
    return (
      <AuthorWrapper>
        <Avatar src={Images.stockImage} height={53} />
        <AuthorInfo>
          <Name>
            {firstname}
            {' '}
            {lastname}
          </Name>
          <Post>{p_body}</Post>
          {/*  <PostedDate>{postDate}</PostedDate> */}
        </AuthorInfo>
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object
};
export default Author;
