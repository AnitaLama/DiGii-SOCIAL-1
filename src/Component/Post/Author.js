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
    const { user, post } = data;
    const { firstName, lastName } = user;
    // const postedDate = new Date(Date.parse(createdAt));
    // let postDate = months[postedDate.getMonth()];
    // postDate += ` ${postedDate.getDate()}`;
    // postDate += ` at ${postedDate.getHours() % 12}:${postedDate.getMinutes()}`;
    // postDate += ` ${postedDate.getHours()}` > 12 ? 'pm' : 'am';
    return (
      <AuthorWrapper>
        <Avatar src={Images.stockImage} height={53} />
        <AuthorInfo>
          <Name>
            {firstName}
            {' '}
            {lastName}
          </Name>
          <Post>{post}</Post>
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
