import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';
import { connect } from 'react-redux';
import PostActions from '../../Redux/PostRedux';
import PostTypeActions from '../../Redux/PostTypeRedux';
import { FormTextArea, Avatar } from '../StyledComponents';
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

const {
  snow, pencil, grey, blue
} = Colors.colors;

const NewPostWrapper = styled.div`
  background: ${snow};
  margin: 10px 0;
  padding: 20px;
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
    margin-right: 4px;
  }
`;
const NewPostOptionContainer = styled.div`
  ${grid(6, '1fr')};
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
      ${fontWeight('500')};
      color: ${grey};
    }
  }

  @media (max-width: 840px) {
    ${flexCentering('column')};
    span:last-of-type {
      text-align: center;
      ${fontSize(10)};
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
        <img src={icon} alt={`icon-${text}`} />
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
    ${fontSize(22)};
    right: 10px;
    top: 10px;
    color: ${blue};
  }
  display: flex;
  flex-direction: 'column';
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
      isPostButtonVisible: false,
      hasPost: false,
      postText: '',
      type: 'text'
    };
  }

  componentWillMount() {
    const { onListPostTypes } = this.props;
    onListPostTypes();
  }

  handleButtonClick = option => {
    const { text } = option;
    console.log(text);
    this.setState({ type: text });
  };

  showPostButton = () => {
    this.setState({ isPostButtonVisible: true });
  };

  hidePostButton = () => {
    this.setState({ isPostButtonVisible: false });
  };

  handlePostText = e => {
    const { value } = e.target;
    this.setState({ postText: value, hasPost: value.trim().length > 0 });
  };

  onSubmitPost = () => {
    const { postText, type } = this.state;
    const { postType, user, onPostSubmit } = this.props;
    const { postTypes } = postType;
    const selectedPostType = postTypes.find(
      item => item.pt_title === type.toLowerCase()
    );

    const post = {
      p_pt_id: selectedPostType.pt_id,
      p_body: postText,
      p_st_id: user.user.id
    };
    this.setState({ postText: '' });
    onPostSubmit(post);
  };

  render() {
    const { isPostButtonVisible, hasPost, postText } = this.state;
    const { user } = this.props;
    const { firstname } = user.user;
    const shouldShowPostButton = isPostButtonVisible || hasPost;
    return (
      <NewPostWrapper>
        <NewPostContainer>
          <Input>
            <Avatar src={Images.stockImage} height={53} radius={30} />
            <FormTextArea
              placeholder={`What do you want to post, ${firstname}?`}
              style={{ margin: 0 }}
              onFocus={this.showPostButton}
              onBlur={this.hidePostButton}
              onChange={this.handlePostText}
              value={postText}
            />
            {/* <TiDelete /> */}
            {shouldShowPostButton && <FiSend onClick={this.onSubmitPost} />}
          </Input>
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
NewPost.propTypes = {
  postType: PropTypes.object,
  user: PropTypes.object,
  onPostSubmit: PropTypes.func
};
const mapStateToProps = state => ({
  postType: state.postType,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onPostSubmit: value => dispatch(PostActions.onPostSubmit(value)),
  onListPostTypes: () => dispatch(PostTypeActions.onListPostTypes())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
