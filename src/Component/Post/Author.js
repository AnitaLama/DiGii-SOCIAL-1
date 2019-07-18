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
  ${fontFilson()};
  text-transform: capitalize;
  span.emoji {
    font-family: 'Segoe UI Emoji';
    color: ${Colors.colors.light};
    ${fontSize(14)};
    font-family: Lato;
    text-transform: none;
  }
`;

const Post = styled.div`
  ${fontSize(14)};
  color: ${grey};
`;

class Author extends Component {
  render() {
    const { data } = this.props;
    const { post_type, p_text } = data;
    const type = post_type.pt_title;
    const emoji = type === 'feeling' && FeelingsList.find(item => item.name === p_text);
    let firstname = '';
    let lastname = '';
    // console.log('data author', data);
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
            {type === 'feeling' && (
              <span>
                {' '}
                <span className="emoji">
                  {`- is feeling ${p_text} ${emoji.emoji}`}
                </span>
              </span>
            )}
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
