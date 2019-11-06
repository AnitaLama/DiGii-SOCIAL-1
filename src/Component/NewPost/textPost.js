import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextBoxWrapper,
  TextBoxContainer,
  Input,
  Username,
  Feeling
} from './style';
import { Avatar, FormTextArea, Button } from '../StyledComponents';
import { FeelingsList } from '../Functions';
import InputBox from './inputBox';

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
      handlePostButtonClick
    } = this.props;
    const { avatar, firstname, lastname } = user;
    const userFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);

    return (
      <TextBoxWrapper>
        <Avatar avatar={avatar} height={53} radius={30} />
        <TextBoxContainer>
          <Input>
            {feelingPost && this.showFeelingsData()}
            <InputBox
              placeholder={`What do you want to say, ${userFirstName}?`}
              onChange={handleTextPostChange}
              {...this.state}
            />
          </Input>
          <Button
            className="rounded"
            style={{
              height: '50px'
            }}
            onClick={handlePostButtonClick}
          >
            POST
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
