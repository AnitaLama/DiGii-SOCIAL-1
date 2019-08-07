import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormTextArea, Loader } from '../StyledComponents';
import 'emoji-mart/css/emoji-mart.css';
import { Colors } from '../../Theme';
import { FeelingsList, PostWrapper, PostWrapperContainer } from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import Moderator from './Moderator';

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
    font-family: Segoe UI Emoji;
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
      feeling: null
    };
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false,
      alertMessage: null
    });
  };

  handleTextChange = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  handleEmotionSelection = value => {
    this.setState({ feeling: value });
  };

  submitTextPost = () => {
    const {
      submitPost,
      strike,
      user,
      onBlockUser,
      postText,
      onPostSubmit,
      showWarning,
      resetPostType,
      onGetStrikesCountOfAUser
    } = this.props;
    const { postTypeId, feeling } = this.state;
    const { isStudent, id } = user.user;
    const { strikes } = strike;
    const result = submitPost();
    onGetStrikesCountOfAUser({ isStudent, id });

    let isBad = 0;
    if (result) {
      if (strikes > 8 && isStudent) {
        // BLOCK THE USER
        onBlockUser({ isStudent, id });
      }
      showWarning(strikes, isStudent);
      isBad = 1;
    }
    const data = {
      p_pt_id: postTypeId,
      p_body: postText,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_is_bad: isBad,
      p_text: feeling.name,
      isBad,
      str_type: result,
      str_is_student: user.user.isStudent,
      str_actor_id: user.user.id
    };
    onPostSubmit(data);

    resetPostType();
  };

  onFocus = () => {
    const {
      user, disableFirstTimePosting, post, onFocus
    } = this.props;
    const { posts } = post;
    const { id, isFirstTimePosting } = user.user;
    const checkFirstTimePosting = onFocus(posts, id);

    if (checkFirstTimePosting && isFirstTimePosting) {
      disableFirstTimePosting();
    }
  };

  render() {
    const { username, postText, feeling } = this.state;
    const { post } = this.props;
    if (!feeling) {
      return (
        <PostWrapperContainer>
          <FeelingsDisplayWrapper>
            {/* -----DISPLAY ALL THE FEELINGS IN A GRID ---------*/}
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
        </PostWrapperContainer>
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
            value={postText}
            onFocus={this.onFocus}
          />
        </Input>

        <div>
          <Button className="small rounded" onClick={this.submitTextPost}>
            {!post.posting ? 'Post' : <Loader />}
          </Button>
        </div>
      </PostWrapper>
    );
  }
}

FeelingsPost.propTypes = {
  username: PropTypes.string,
  postTypeId: PropTypes.number,
  post: PropTypes.object,
  user: PropTypes.object,
  // post: PropTypes.object,
  strike: PropTypes.object,
  onPostSubmit: PropTypes.func,
  onGetStrikesCountOfAUser: PropTypes.func,
  // disableFirstTimePosting: PropTypes.func,
  onBlockUser: PropTypes.func,
  postText: PropTypes.string,
  showWarning: PropTypes.func,
  resetPostType: PropTypes.func,
  handlePostText: PropTypes.func,
  onFocus: PropTypes.func,
  disableFirstTimePosting: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  // disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default Moderator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FeelingsPost)
);
