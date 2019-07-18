import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Button, FormTextArea, Modal } from '../StyledComponents';
import 'emoji-mart/css/emoji-mart.css';
import { Colors } from '../../Theme';
import {
  FeelingsList, FilterKeyWords, warnings, PostWrapper
} from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const strikeCount = 3;

const Input = styled.div`
  position: relative;

  .textContainer {
    position: relative;
  }
  span.username,
  span.feeling {
    font-weight: bold;
  }
  span.emoji {
    font-family: 'Segoe UI Emoji';
  }
`;

const FeelingsDisplayWrapper = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  span {
    cursor: pointer;
    text-transform: capitalize;
    border: 1px solid ${Colors.colors.pencil};
    border-radius: 2px;
  }
  span.emoji {
    border: 0;
    font-family: 'Segoe UI Emoji';
  }
`;
class FeelingsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTypeId: props.postTypeId,
      username: props.username,
      feeling: null,
      postText: '',
      showPostButton: false,
      isFocused: false,
      showText: false,
      isModalVisible: false,
      alertMessage: null
    };
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  handleTextChange = e => {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    const { value } = e.target;
    if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
      console.log('show users');
    }
    const { strike } = this.props;
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      // alert('Please keep the length within 500 characters');
      this.setState({ postText: value, hasPost: value.trim().length > 0 });
    } else {
      const blacklistedWord = FilterKeyWords(value);
      console.log('here', blacklistedWord);
      if (blacklistedWord) {
        if (strike.strikes >= 10) {
          console.log('block the student');
          this.setState({ blockUser: true });
          // onBlockUser({ isStudent, id });
        } else {
          let index = strike.strikes < 10 && (strike.strikes % strikeCount) + 1;
          index -= 1;
          this.setState({
            isModalVisible: true,
            alertMessage: `${warnings[index]}`
          });
        }
        this.setState({ isBad: true, strikeType: blacklistedWord });
      } else {
        this.setState({
          isModalVisible: false,
          alertMessage: null
        });
      }
      this.setState({ postText: value });
    }
    // const { value } = e.target;
    // this.setState({ postText: value });
  };

  handleEmotionSelection = value => {
    this.setState({ feeling: value });
  };

  submitTextPost = () => {
    const { feeling, postText, postTypeId } = this.state;
    const { user, resetPostType, onPostSubmit } = this.props;
    const { isStudent, id } = user.user;

    const data = {
      p_pt_id: postTypeId,
      p_body: postText,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_text: feeling.name
    };
    onPostSubmit(data);
    resetPostType();
    this.setState({ selectedGif: null });
  };

  render() {
    const {
      username,
      postText,
      feeling,
      isModalVisible,
      alertMessage
    } = this.state;
    if (!feeling) {
      return (
        <PostWrapper>
          <FeelingsDisplayWrapper>
            {FeelingsList.map((item, i) => (
              <span
                onClick={() => {
                  this.handleEmotionSelection(item);
                }}
                key={item + i}
              >
                {item.name}
-
                <span className="emoji">{item.emoji}</span>
              </span>
            ))}
          </FeelingsDisplayWrapper>
        </PostWrapper>
      );
    }
    return (
      <PostWrapper>
        <Input>
          <div>
            <span className="username">{`${username}`}</span>
            {' '}
- is feeling
            <span className="feeling">{` ${feeling.name} `}</span>
            <span className="emoji">{` ${feeling.emoji} `}</span>
          </div>
          <FormTextArea
            // tme="feelingype="text"
            placeholder={` How are you feeling, ${username}?`}
            onChange={this.handleTextChange}
            onFocus={() => {
              this.setState({ isFocused: true });
            }}
            onBlur={() => {
              this.setState({ isFocused: false });
            }}
            value={postText}
          />
        </Input>

        <div>
          <Button className="small rounded" onClick={this.submitTextPost}>
            Post
          </Button>
        </div>
        {isModalVisible && (
          <Modal message={alertMessage} hideModal={this.hideModal} />
        )}
      </PostWrapper>
    );
  }
}

const mapStateToProps = state => ({
  postActivity: state.postActivity,
  user: state.user,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeelingsPost);
