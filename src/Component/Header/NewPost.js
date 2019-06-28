import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FormTextArea } from '../StyledComponents';
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

const { snow, pencil, grey } = Colors.colors;

const NewPostWrapper = styled.div`
  background: ${snow};
  margin: 10px 0;
  padding: 10px;
  border-radius: 40px;
  ${boxShadow()}
`;
const NewPostContainer = styled.div`
  display: grid;
  // grid-template-columns: 95% 5%;
`;
const Icon = styled.span`
  margin: auto;
  cursor: pointer;
  img {
    height: 20.73px;
    margin-right: 6px;
  }
`;
const NewPostOptionContainer = styled.div`
  ${grid(6, '1fr')};
  padding: 0 15px;
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
  &:hover {
    span {
      ${fontWeight('bolder')};
      color: ${grey};
    }
  }

  @media (max-width: 840px) {
    ${flexCentering('column')};
    span:last-of-type {
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
      <Icon>
        <img src={icon} alt={`Digii-${icon}`} />
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
  svg {
    position: absolute;
    right: 10px;
    ${fontSize(22)};
    height: 100%;
  }
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
      // post: 'post'
    };
  }

  handleButtonClick = option => {
    // const { value } = option;
    // this.setState({ post: value });
  };

  render() {
    return (
      <NewPostWrapper>
        <NewPostContainer>
          <Input>
            <FormTextArea
              placeholder="What do you want to post?"
              style={{ margin: 0 }}
            />
            {/* <TiDelete /> */}
          </Input>
          {/* <Icon>
            <FiSend />
          </Icon> */}
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
