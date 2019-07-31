import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from '../StyledComponents';
import {
  grid,
  fontSize,
  flexCentering,
  Colors,
  Images,
  boxShadow,
  fontWeight,
  fontFilson
} from '../../Theme';

import { NewPostType, Container } from './index';

const { snow, pencil, grey } = Colors.colors;

const NewPostWrapper = styled.div`
  background: ${snow};
  margin: 10px 0;
  padding: 20px;
  border-radius: 40px;
  ${boxShadow()};
`;
const NewPostContainer = styled.div`
  display: grid;
`;
const Icon = styled.span`
  margin: auto;
  cursor: pointer;
  img {
    height: 20.73px;
    margin-right: 4px;
  }
`;
const NewPostOptionContainer = styled.div`
  ${grid(6, '1fr')};
`;
const NewPostOptionContent = styled.div`
  margin: auto;
  padding: 2px 0;
  cursor: pointer;
  ${flexCentering('row')};
  span {
    color: ${pencil};
    ${fontSize(12)};
    ${fontFilson()};
  }
  &.active,
  &:hover {
    span {
      ${fontWeight('500')};
      color: ${grey};
    }
  }

  @media (max-width: 840px) {
    ${flexCentering('column')};
    span:last-of-type {
      text-align: center;
      ${fontSize(10)};
    }
  }
`;
const NewPostOption = ({ option, handleButtonClick, selected }) => {
  const { icon, text } = option;
  const check = selected === text;
  return (
    <NewPostOptionContent
      onClick={() => {
        handleButtonClick(option);
      }}
      className={check && 'active'}
    >
      <Icon>
        <img src={icon} alt={`icon-${text}`} />
      </Icon>
      <span>{text}</span>
    </NewPostOptionContent>
  );
};
const Input = styled.div`
  position: relative;
  input {
    width: 100%;
  }

  display: flex;
  flex-direction: 'column';
`;

const options = [
  { text: 'PHOTO/VIDEO', icon: Images.digii5.Photo, value: 'image' },
  { text: 'BANNER', icon: Images.digii5.Banner, value: 'banner' },
  { text: 'FEELING', icon: Images.digii5.Feeling, value: 'feeling' },
  { text: 'TAG', icon: Images.digii5.Tag, value: 'tag' },
  { text: 'POLL', icon: Images.digii5.Poll, value: 'poll' },
  { text: 'GIF', icon: Images.digii5.GIF, value: 'gif' }
];

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      type: 'text',
      selectedGif: null
    };
  }

  resetPostType = () => {
    this.setState({ type: 'text' });
  };

  handleButtonClick = option => {
    const { text } = option;
    this.setState({ type: text });
  };

  postArea = () => {
    const { type, selectedGif } = this.state;
    return (
      <NewPostType
        type={type}
        selectedGif={selectedGif}
        resetPostType={this.resetPostType}
      />
    );
  };

  selectGif = value => {
    this.setState({ selectedGif: value });
  };

  render() {
    const { type } = this.state;
    const { post, user } = this.props;
    const { gif } = post;
    const { avatar } = user;
    // {avatar ? (
    //   <UserAvatar avatar={avatar} height={53} radius={30} />
    // ) : (
    //   <Avatar src={Images.stockImage} height={53} radius={30} />
    // )}
    return (
      <div>
        <NewPostWrapper>
          <Avatar avatar={avatar} height={53} radius={30} />
          <NewPostContainer>
            <Input>
              {this.postArea()}
              {/* <TiDelete /> */}
            </Input>
          </NewPostContainer>
          <NewPostOptionContainer>
            {options.map(option => (
              <NewPostOption
                key={option.text}
                option={option}
                handleButtonClick={this.handleButtonClick}
                selected={type}
              />
            ))}
          </NewPostOptionContainer>
        </NewPostWrapper>
        {gif.length > 0 && (
          <NewPostWrapper>
            <Container selectGif={this.selectGif} />
          </NewPostWrapper>
        )}
      </div>
    );
  }
}

NewPostOption.propTypes = {
  option: PropTypes.object,
  handleButtonClick: PropTypes.func,
  selected: PropTypes.string
};
NewPost.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object
};
const mapStateToProps = state => ({
  postType: state.postType,
  user: state.user.user,
  post: state.post,
  postActivity: state.postActivity
});
export default connect(mapStateToProps)(NewPost);
