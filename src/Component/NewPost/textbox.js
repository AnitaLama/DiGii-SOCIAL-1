import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextBoxWrapper, TextBoxContainer, Input } from './style';
import { Avatar, FormTextArea, Button } from '../StyledComponents';

class TextBox extends Component {
  render() {
    const { user } = this.props;
    const { avatar, firstname } = user;
    const userFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    return (
      <TextBoxWrapper>
        <Avatar avatar={avatar} height={53} radius={30} />
        <TextBoxContainer>
          <Input>
            {' '}
            <FormTextArea
              placeholder={`What do you want to say, ${userFirstName}?`}
            />
          </Input>
          <Button
            className="rounded"
            style={{
              height: '50px'
            }}
          >
            POST
          </Button>
        </TextBoxContainer>
      </TextBoxWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});
export default connect(mapStateToProps)(TextBox);
