import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FiSend } from 'react-icons/fi';
import {
  TiLightbulb, TiImageOutline, TiImage, TiDelete
} from 'react-icons/ti';
import { FormInput } from '../StyledComponents';
import { grid } from '../../Theme';

const NewPostWrapper = styled.div`
  background: #e9e9e9;
  margin: 20px 0;
  padding: 10px;
  border-radius: 20px;
`;
const NewPostContainer = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
`;
const Icon = styled.span`
  margin: auto;
  font-size: 22px;
  cursor: pointer;
`;
const NewPostOptionsContainer = styled.div`
  ${grid(3, '1fr')};
`;
const NewPostOption = styled.div`
  margin: auto;
  padding: 2px 0;
  cursor: pointer;
  svg {
    margin-right: 6px;
  }
`;
const Input = styled.div`
  position: relative;
  input {
    width: 100%;
  }
  svg {
    position: absolute;
    right: 10px;
    font-size: 22px;
    height: 100%;
  }
`;
class NewPost extends Component {
  render() {
    return (
      <NewPostWrapper>
        <NewPostContainer>
          <Input>
            <FormInput placeholder="New post" />
            <TiDelete />
          </Input>
          <Icon>
            <FiSend />
          </Icon>
        </NewPostContainer>
        <NewPostOptionsContainer>
          <NewPostOption>
            <Icon>
              <TiImage />
            </Icon>
            <span>Add a picture / video</span>
          </NewPostOption>
          <NewPostOption>
            <Icon>
              <TiLightbulb />
            </Icon>
            <span>Add a feeling</span>
          </NewPostOption>
          <NewPostOption>
            <Icon>
              <TiImageOutline />
            </Icon>
            <span>Start a poll</span>
          </NewPostOption>
          <NewPostOption>
            <Icon>
              <TiImageOutline />
            </Icon>
            <span>Make a banner</span>
          </NewPostOption>
          <NewPostOption>
            <Icon>
              <TiImageOutline />
            </Icon>
            <span>Tag a friend</span>
          </NewPostOption>
          <NewPostOption>
            <Icon>
              <TiImageOutline />
            </Icon>
            <span>Use a GIF</span>
          </NewPostOption>
        </NewPostOptionsContainer>
      </NewPostWrapper>
    );
  }
}
export default NewPost;
