import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FeelingsList } from '../NewPost/index';
import {
  flex,
  Images,
  fontSize,
  fontWeight,
  fontFilson,
  Colors
} from '../../Theme';
import { Avatar } from '../StyledComponents';

// const { grey } = Colors.colors;

const AuthorWrapper = styled.div`
  ${flex()};
`;
const AuthorInfo = styled.div`
  margin: auto 0;
  padding: 0 10px;
`;
const Name = styled.div`
  ${fontWeight('bold')};
  ${fontFilson()};
  text-transform: capitalize;
  span.emoji {
    font-family: 'Segoe UI Emoji';
    font-family: Lato;
    color: ${Colors.colors.light};
    ${fontSize(14)};
    text-transform: none;
  }
`;

// const Post = styled.div`
//   ${fontSize(14)};
//   color: ${grey};
// `;
const TaggedList = styled.span`
  span {
    font-family: Lato;
    color: ${Colors.colors.light};
    ${fontSize(14)};
    text-transform: none;
    &::after {
      content: ', ';
    }
  }
  span:first-of-type {
    &::before {
      content: ' with - ';
    }
  }
  span:last-of-type {
    &::after {
      content: '';
    }
  }
`;
class Author extends Component {
  getExtraInfo = () => {
    const { data } = this.props;
    const { post_type, p_text, notifications } = data;
    const type = post_type.pt_title;
    const emoji = type === 'feeling' && FeelingsList.find(item => item.name === p_text);

    if (type === 'feeling') {
      return (
        <span className="emoji">
          {` - is feeling ${p_text} ${emoji.emoji}`}
        </span>
      );
    }
    if (type === 'tag') {
      return (
        <TaggedList>
          {notifications.map(item => {
            const { n_is_student, student, user } = item;
            if (n_is_student) {
              return <span>{student.st_username}</span>;
            }
            return <span>{user.u_name}</span>;
          })}
        </TaggedList>
      );
    }
  };

  render() {
    const { data } = this.props;
    const { post_type, p_text } = data;
    const type = post_type.pt_title;
    let firstname = '';
    let lastname = '';
    // post typet,po ypepost console.log('data author', data);
    if (data.p_isStudent) {
      const { student } = data;

      firstname = student.st_firstname;
      lastname = student.st_lastname;
    } else {
      const { user } = data;
      const { user_profile } = user;
      const { up_firstname, up_lastname } = user_profile;
      firstname = up_firstname;
      lastname = up_lastname;
    }
    return (
      <AuthorWrapper>
        <Avatar src={Images.stockImage} height={53} />
        <AuthorInfo>
          <Name>
            {firstname}
            {' '}
            {lastname}
            {' '}
            {this.getExtraInfo()}
          </Name>
          {' '}
          {/* <Post>{this.getContent()}</Post>
            <PostedDate>{postDate}</PostedDate> */}
        </AuthorInfo>
      </AuthorWrapper>
    );
  }
}
Author.propTypes = {
  data: PropTypes.object
};
export default Author;
