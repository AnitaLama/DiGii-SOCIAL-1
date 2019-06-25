import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { flex, Images, fontSize } from '../../Theme';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const AuthorWrapper = styled.div`
  ${flex()};
`;
const AuthorImage = styled.img`
  height: 40px;
  border-radius: 20px;
`;
const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  font-weight: bold;
`;
const PostedDate = styled.div`
  ${fontSize(12)};
`;

class Author extends Component {
  render() {
    const { data } = this.props;
    const { firstName, lastName, createdAt } = data;
    const postedDate = new Date(Date.parse(createdAt));
    let postDate = months[postedDate.getMonth()];
    postDate += ` ${postedDate.getDate()}`;
    postDate += ` at ${postedDate.getHours() % 12}:${postedDate.getMinutes()}`;
    postDate += ` ${postedDate.getHours()}` > 12 ? 'pm' : 'am';

    return (
      <AuthorWrapper>
        <AuthorImage src={Images.stockImage} />
        <AuthorInfo>
          <Name>
            {firstName}
            {' '}
            {lastName}
          </Name>
          <PostedDate>{postDate}</PostedDate>
        </AuthorInfo>
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object
};
export default Author;
