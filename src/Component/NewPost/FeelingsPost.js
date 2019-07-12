import React, { Component } from 'react';
import styled from '@emotion/styled';
import { PostWrapper } from './index';
import { Button } from '../StyledComponents';

const Input = styled.div`
  position: relative;
  textarea {
    position: absolute;
    background: transparent;
    outline: 0;
    border: 0;
    color: transparent;
    height: 150px;
  }
  .textContainer {
    position: relative;
  }
`;
class FeelingsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      username: props.username,
      postText: '',
      showPostButton: false,
      isFocused: false,
      showText: false
    };
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  handleTextChange = e => {
    const { value } = e.target;

    this.setState({ postText: value });
  };

  render() {
    const {
      username, postText, isFocused, showText
    } = this.state;

    const alteredText = postText;
    console.log('>>>', this.actualInput ? this.actualInput.innerText : '');

    return (
      <PostWrapper>
        <Input>
          <textarea
            // type="text"
            placeholder={` How are you feeling, ${username}?`}
            onChange={this.handleTextChange}
            onFocus={() => {
              this.setState({ isFocused: true });
            }}
            onBlur={() => {
              this.setState({ isFocused: false });
            }}
            value={postText}
            style={{
              border: '1px solid black'
            }}
          />
          <span className="textContainer" ref={r => (this.actualInput = r)}>
            {alteredText}
          </span>
          <p>{postText}</p>
        </Input>

        <div>
          <Button className="small rounded" onClick={this.submitTextPost}>
            Post
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

export default FeelingsPost;
