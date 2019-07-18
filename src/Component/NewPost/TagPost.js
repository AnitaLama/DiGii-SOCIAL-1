import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { PostWrapper } from './index';
import { FormTextArea, Button } from '../StyledComponents';

function extractUsers(text) {
  return text.match(/(\s*@[a-zA-Z0-9_-]+\s*)/gi);
}

class TagPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      postTypeId: props.postTypeId,
      text: '',
      hasTaggedFriends: false
    };
  }

  tagFriends = e => {
    const { value } = e.target;
    const checkUsername = extractUsers(value);
    // const newArr = checkUsername && checkUsername.map(item => value.replace(item, ' '));
    console.log('>>>>', value, checkUsername);
    let tempValue = value;

    checkUsername
      && checkUsername.map(item => {
        item = item.replace(' ', '');
        tempValue = tempValue.replace(
          item,
          `<span  style="color:red">${item}</span>`
        );
      });
    this.setState({ text: tempValue });
  };

  onFocus = () => {
    const { text } = this.state;
    if (text === 'Tag your friends') {
      this.setState({ text: '' });
    }
  };

  finishedTagging = () => {
    this.setState({ hasTaggedFriends: true });
  };

  render() {
    const { username } = this.props;
    const { text, hasTaggedFriends } = this.state;
    if (hasTaggedFriends) {
      return (
        <PostWrapper>
          {text}
          <FormTextArea placeholder="Write something..." />
          <div>
            <Button className="rounded small" onClick={this.finishedTagging}>
              OK
            </Button>
          </div>
        </PostWrapper>
      );
    }
    return (
      <PostWrapper>
        {' '}
        <ContentEditable
          placeholder="Tag your friends"
          style={{ margin: 0, border: '1px solid red', height: '100px' }}
          onChange={this.tagFriends}
          onFocus={this.onFocus}
          html={text}
        />
        <div>
          <Button className="rounded small" onClick={this.finishedTagging}>
            OK
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

export default TagPost;
