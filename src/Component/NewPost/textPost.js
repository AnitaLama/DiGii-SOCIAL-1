import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextBoxWrapper,
  TextBoxContainer,
  Input,
  Username,
  Feeling
} from './style';
import {
  Avatar, FormTextArea, Button, Loader
} from '../StyledComponents';
import { FeelingsList, TextAreaBox } from '../Functions';

class TextBox extends Component {
  showFeelingsData = () => {
    const { user, handleTextPostChange, feelingPost } = this.props;
    const { avatar, firstname, lastname } = user;

    const { emoji } = FeelingsList.find(
      feeling => feeling.name === feelingPost
    );
    return (
      <div>
        <Username>{`${firstname} ${lastname}`}</Username>
        {' is feeling - '}
        <Feeling>
          {`${feelingPost}`}
          {' '}
          {emoji}
        </Feeling>
      </div>
    );
  };

  render() {
    const {
      user,
      handleTextPostChange,
      feelingPost,
      handlePostButtonClick,
      post,
      postText
    } = this.props;
    const { posting } = post;
    const { avatar, firstname, lastname } = user;
    const userFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);

    return (
      <TextBoxWrapper>
        <Avatar avatar={avatar} height={53} radius={30} />
        <TextBoxContainer>
          <Input>
            {feelingPost && this.showFeelingsData()}
            <TextAreaBox
              value={postText || ''}
              placeholder={`What do you want to say, ${userFirstName}?`}
              onChange={handleTextPostChange}
              {...this.state}
              {...this.props}
            />
          </Input>
          <Button className="rounded" onClick={handlePostButtonClick}>
            {posting ? <Loader color="white" /> : 'POST'}
          </Button>
        </TextBoxContainer>
      </TextBoxWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  post: state.post
});

export default connect(mapStateToProps)(TextBox);
