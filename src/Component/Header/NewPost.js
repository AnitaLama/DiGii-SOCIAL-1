import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FiSend } from 'react-icons/fi';
import {
  TiLightbulb, TiImageOutline, TiImage, TiDelete
} from 'react-icons/ti';
import PropTypes from 'prop-types';
import { FormInput } from '../StyledComponents';
import { grid, fontSize, flexCentering } from '../../Theme';

const NewPostWrapper = styled.div`
  background: #e9e9e9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
`;
const NewPostContainer = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
`;
const Icon = styled.span`
  margin: auto;
  ${fontSize(22)};
  cursor: pointer;
`;
const NewPostOptionContainer = styled.div`
  ${grid(3, '1fr')};
`;
const NewPostOptionContent = styled.div`
  margin: auto;
  padding: 2px 0;
  cursor: pointer;
  &:hover {
    svg {
      font-weight: 900;
    }
    span {
      font-weight: bolder;
    }
  }
  svg {
    margin-right: 6px;
  }
  span {
  }
  @media (max-width: 480px) {
    ${flexCentering('column')};
    span:last-child {
      text-align: center;
      ${fontSize(10)};
    }
    svg {
      margin: 0;
    }
  }
`;
const NewPostOption = ({ option, handleButtonClick }) => {
  const { icon, text } = option;
  return (
    <NewPostOptionContent
      onClick={() => {
        handleButtonClick(option);
      }}
    >
      <Icon>{icon}</Icon>
      <span>{text}</span>
    </NewPostOptionContent>
  );
};
const Input = styled.div`
  position: relative;
  input {
    width: 100%;
  }
  svg {
    position: absolute;
    right: 10px;
    ${fontSize(22)};
    height: 100%;
  }
`;

const options = [
  { text: 'Add a picture / video', icon: <TiImage />, value: 'image' },
  { text: 'Add a feeling', icon: <TiLightbulb />, value: 'feeling' },
  { text: 'Start a poll', icon: <TiImageOutline />, value: 'poll' },
  { text: 'Make a banner', icon: <TiImage />, value: 'banner' },
  { text: 'Tag a friend', icon: <TiImage />, value: 'tag' },
  { text: 'Use a GIF', icon: <TiImage />, value: 'gif' }
];

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      post: 'post'
    };
  }

  handleButtonClick = option => {
    console.log(option);
    const { value } = option;
    this.setState({ post: value });
  };

  render() {
    const { post } = this.state;
    return (
      <NewPostWrapper>
        <NewPostContainer>
          <Input>
            <FormInput placeholder={`New ${post}`} style={{ margin: 0 }} />
            <TiDelete />
          </Input>
          <Icon>
            <FiSend />
          </Icon>
        </NewPostContainer>
        <NewPostOptionContainer>
          {options.map(option => (
            <NewPostOption
              key={option.text}
              option={option}
              handleButtonClick={this.handleButtonClick}
            />
          ))}
        </NewPostOptionContainer>
      </NewPostWrapper>
    );
  }
}

NewPostOption.propTypes = {
  option: PropTypes.object,
  handleButtonClick: PropTypes.func
};
export default NewPost;
